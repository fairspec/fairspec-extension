import { readdir, writeFile } from "node:fs/promises"
import nodePath from "node:path"
import { execa } from "execa"
import { loadTableSchema, renderTableSchemaAsHtml } from "fairspec"
import { replaceInFile } from "replace-in-file"
import tasuku from "tasuku"
import packageJson from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const shell = execa({ stdout: ["inherit"], preferLocal: true, shell: true })

// Website

await tasuku("Updating Website", async () => {
  await replaceInFile({
    files: "docs/profiles/dataset.json",
    from: /const.*dataset\.json/g,
    to: match => match.replace(/\d+\.\d+\.\d+/, packageJson.version),
  })

  await replaceInFile({
    files: "docs/profiles/dataset.json",
    from: /schemas\/.*?\//g,
    to: `schemas/${packageJson.version}/`,
  })

  await shell`
  uvx
  jsonschema2md@1.7.0
  docs/profiles/dataset.json docs/specification/metadata.md
  `

  await replaceInFile({
    files: ["docs/specification/metadata.md"],
    from: /^#.*/,
    to: "---\ntitle: Metadata\npath: /specification/metadata/\norder: 1\n---",
  })

  for (const file of await readdir("docs/schemas")) {
    const basename = nodePath.basename(file, nodePath.extname(file))
    const tableSchema = await loadTableSchema(`docs/schemas/${file}`)
    const rendered = renderTableSchemaAsHtml(tableSchema, { frontmatter: true })
    const withPath = rendered.replace(
      /^---\n([\s\S]*?)\n---/,
      (_, body) => `---\n${body}\npath: /specification/data/${basename}/\n---`,
    )

    await writeFile(`docs/specification/data/${basename}.md`, withPath)
  }

  await shell`rm -rf .livemark/public/profiles/${packageJson.version}`
  await shell`rm -rf .livemark/public/schemas/${packageJson.version}`

  await shell`mkdir -p .livemark/public/profiles/${packageJson.version}`
  await shell`mkdir -p .livemark/public/schemas/${packageJson.version}`

  await shell`
  cp
  docs/profiles/*.json
  .livemark/public/profiles/${packageJson.version}
  `

  await shell`
  cp
  docs/schemas/*.json
  .livemark/public/schemas/${packageJson.version}
  `
})

// TypeScript

await tasuku("Updating TypeScript", async () => {
  await shell`
  jq
  '.allOf |= .[1:]'
  docs/profiles/dataset.json
  | json2ts
  --additionalProperties false
  > typescript/models/dataset.ts
  `

  await shell({ stdout: ["pipe"] })`
  ts-to-zod
  typescript/models/dataset.ts
  typescript/models/dataset.ts
  --skipValidation
  `

  await shell`
  sed -i -E
  's/([a-z])([a-zA-Z0-9]*)Schema\\b/\\u\\1\\2/g'
  typescript/models/dataset.ts
  `

  const typescriptIndex: string[] = ['export * from "./dataset.ts"']
  for (const file of await readdir("docs/schemas")) {
    const basename = nodePath.basename(file, nodePath.extname(file))
    typescriptIndex.push(`export * from "./${basename}.ts"`)

    await shell`
    cat
    docs/schemas/${file}
    | json2ts
    --additionalProperties false
    > typescript/models/${basename}.ts
    `

    await shell({ stdout: ["pipe"] })`
    ts-to-zod
    typescript/models/${basename}.ts
    typescript/models/${basename}.ts
    --skipValidation
    `

    await shell`
    sed -i -E
    's/([a-z])([a-zA-Z0-9]*)Schema\\b/\\u\\1\\2/g'
    typescript/models/${basename}.ts
    `
  }

  await shell`
  for file in typescript/models/*.ts;
  do grep -oP '^export const \\K[A-Z]\\w+' "$file" | while read name;
  do echo "export type $name = z.infer<typeof $name>"; done >> "$file"; done
  `

  await shell`
  sed -i
  '1s|.*|/* eslint-disable */ // DO NOT UPDATE this @generated file|g'
  typescript/models/*.ts
  `

  await writeFile(
    `typescript/models/index.ts`,
    `${typescriptIndex.join("\n")}\n`,
  )
})

// Python

await tasuku("Updating Python", async () => {
  await shell`
  jq
  '.allOf |= .[1:]'
  docs/profiles/dataset.json
  | uvx
  --from datamodel-code-generator@0.34.0
  datamodel-codegen
  --input-file-type jsonschema
  --output python/${packageJson.slug.replace("-", "_")}/models/dataset.py
  --output-model-type pydantic_v2.BaseModel
  --custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
  --use-generic-container-types
  --use-field-description
  --disable-timestamp
  `

  // It fixes a weird bug of schema -> schema_ conversion
  await replaceInFile({
    files: [`python/${packageJson.slug.replace("-", "_")}/models/dataset.py`],
    from: /schema_:/g,
    to: "schema:",
  })

  const pythonIndex: string[] = ["from .dataset import *"]
  for (const file of await readdir("docs/schemas")) {
    const name = nodePath.basename(file, nodePath.extname(file))
    pythonIndex.push(`from .${name} import *`)

    await shell`
    cat
    docs/schemas/${file}
    | uvx
    --from datamodel-code-generator@0.34.0
    datamodel-codegen
    --input-file-type jsonschema
    --output python/${packageJson.slug.replace("-", "_")}/models/${name}.py
    --output-model-type pydantic_v2.BaseModel
    --custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
    --use-generic-container-types
    --use-field-description
    --disable-timestamp
    `
  }

  await writeFile(
    `python/${packageJson.slug.replace("-", "_")}/models/__init__.py`,
    pythonIndex.join("\n"),
  )
})
