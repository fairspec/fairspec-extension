import { readdir, writeFile } from "node:fs/promises"
import nodePath from "node:path"
import { execa } from "execa"
import { loadTableSchema, renderTableSchemaAsHtml } from "fairspec"
import { replaceInFile } from "replace-in-file"
import tasuku from "tasuku"
import metadata from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const shell = execa({ stdout: ["inherit"], preferLocal: true, shell: true })

// Website

await tasuku("Updating Website", async () => {
  await replaceInFile({
    files: "website/profiles/dataset.json",
    from: /profiles\/.*?\//g,
    to: `profiles/${metadata.version}/`,
  })

  await replaceInFile({
    files: "website/profiles/dataset.json",
    from: /schemas\/.*?\//g,
    to: `schemas/${metadata.version}/`,
  })

  await shell`
  uvx
  jsonschema2md@1.7.0
  website/profiles/dataset.json website/content/docs/specification/metadata.md
  `

  await replaceInFile({
    files: ["website/content/docs/specification/metadata.md"],
    from: /^#.*/,
    to: "---\ntitle: Metadata\n---",
  })

  for (const file of await readdir("website/schemas")) {
    const basename = nodePath.basename(file, nodePath.extname(file))
    const tableSchema = await loadTableSchema(`website/schemas/${file}`)

    await writeFile(
      `website/content/docs/specification/data/${basename}.md`,
      renderTableSchemaAsHtml(tableSchema, { frontmatter: true }),
    )
  }

  await shell`rm -rf website/public/profiles/${metadata.version}`
  await shell`rm -rf website/public/schemas/${metadata.version}`

  await shell`mkdir -p website/public/profiles/${metadata.version}`
  await shell`mkdir -p website/public/schemas/${metadata.version}`

  await shell`
  cp
  website/profiles/*.json
  website/public/profiles/${metadata.version}
  `

  await shell`
  cp
  website/schemas/*.json
  website/public/schemas/${metadata.version}
  `
})

// TypeScript

await tasuku("Updating TypeScript", async () => {
  await shell`
  jq
  '.allOf |= .[1:]'
  website/profiles/dataset.json
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
  for (const file of await readdir("website/schemas")) {
    const basename = nodePath.basename(file, nodePath.extname(file))
    typescriptIndex.push(`export * from "./${basename}.ts"`)

    await shell`
    cat
    website/schemas/${file}
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
  '1s|.*|// biome-ignore-all format: DO NOT UPDATE this @generated file|g'
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
  website/profiles/dataset.json
  | uvx
  --from datamodel-code-generator@0.34.0
  datamodel-codegen
  --input-file-type jsonschema
  --output python/${metadata.slug.replace("-", "_")}/models/dataset.py
  --output-model-type pydantic_v2.BaseModel
  --custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
  --use-generic-container-types
  --use-field-description
  --disable-timestamp
  `

  // It fixes a weird bug of schema -> schema_ conversion
  await replaceInFile({
    files: [`python/${metadata.slug.replace("-", "_")}/models/dataset.py`],
    from: /schema_:/g,
    to: "schema:",
  })

  const pythonIndex: string[] = ["from .dataset import *"]
  for (const file of await readdir("website/schemas")) {
    const name = nodePath.basename(file, nodePath.extname(file))
    pythonIndex.push(`from .${name} import *`)

    await shell`
    cat
    website/schemas/${file}
    | uvx
    --from datamodel-code-generator@0.34.0
    datamodel-codegen
    --input-file-type jsonschema
    --output python/${metadata.slug.replace("-", "_")}/models/${name}.py
    --output-model-type pydantic_v2.BaseModel
    --custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
    --use-generic-container-types
    --use-field-description
    --disable-timestamp
    `
  }

  await writeFile(
    `python/${metadata.slug.replace("-", "_")}/models/__init__.py`,
    pythonIndex.join("\n"),
  )
})
