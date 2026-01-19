import { readdir, writeFile } from "node:fs/promises"
import nodePath from "node:path"
import { intro, spinner } from "@clack/prompts"
import { execa } from "execa"
import { loadTableSchema, renderTableSchemaAsHtml } from "fairspec"
import pc from "picocolors"
import { replaceInFile } from "replace-in-file"
import metadata from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const $ = execa({ stdout: ["inherit", "pipe"], preferLocal: true })
const loader = spinner()

intro(pc.bold("Generating the extension"))

// Website

loader.start("Updating website")

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

await $`
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

$`rm -rf website/public/profiles/${metadata.version}`
$`rm -rf website/public/schemas/${metadata.version}`

$`mkdir -p website/public/profiles/${metadata.version}`
$`mkdir -p website/public/schemas/${metadata.version}`

$({
  shell: true,
})`cp website/profiles/*.json website/public/profiles/${metadata.version}`

$({
  shell: true,
})`cp website/schemas/*.json website/public/schemas/${metadata.version}`

loader.stop("Website updated!")

// TypeScript

loader.start("Updating TypeScript")

await $({ shell: true })`
jq
'.allOf |= .[1:]'
website/profiles/dataset.json
| json2ts
--additionalProperties false
--bannerComment '// biome-ignore-all format: DO NOT UPDATE this @generated file'
--no-style.semi
> sdk-ts/profile.ts
`

const typescriptIndex: string[] = []
for (const file of await readdir("extension/schemas")) {
  const name = basename(file, extname(file))
  typescriptIndex.push(`export * from "./${name}.ts"`)

  await $({ shell: true })`
  dpkit schema convert
  extension/schemas/${file}
  --to-format jsonschema
  | json2ts
  --additionalProperties false
  --bannerComment '// biome-ignore-all format: DO NOT UPDATE this @generated file'
  --no-style.semi
  > sdk-ts/schemas/${name}.ts
  `
}

await writeFile(
  `${root}/sdk-ts/schemas/index.ts`,
  `${typescriptIndex.join("\n")}\n`,
)

loader.stop("TypeScript updated!")

// Python

loader.start("Updating Python")

await $({ shell: true })`
jq
'.allOf |= .[1:]'
extension/profile.json
| uvx
--from datamodel-code-generator@0.34.0
datamodel-codegen
--input-file-type jsonschema
--output sdk-py/${metadata.slug}/profile.py
--output-model-type typing.TypedDict
--custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
--use-generic-container-types
--use-field-description
--disable-timestamp
`

// It fixes a weird bug of schema -> schema_ conversion
await replaceInFile({
  files: [`sdk-py/${metadata.slug}/profile.py`],
  from: /schema_:/g,
  to: "schema:",
})

const pythonIndex: string[] = []
for (const file of await readdir("extension/schemas")) {
  const name = basename(file, extname(file))
  pythonIndex.push(`from .${name} import *`)

  await $({ shell: true })`
  dpkit schema convert
  extension/schemas/${file}
  --to-format jsonschema
  --silent
  | uvx
  --from datamodel-code-generator@0.34.0
  datamodel-codegen
  --input-file-type jsonschema
  --output sdk-py/${metadata.slug}/schemas/${name}.py
  --output-model-type typing.TypedDict
  --custom-file-header '# ruff: noqa -- DO NOT UPDATE this @generated file'
  --use-generic-container-types
  --use-field-description
  --disable-timestamp
  `
}

await writeFile(
  `${root}/sdk-py/${metadata.slug}/schemas/__init__.py`,
  pythonIndex.join("\n"),
)

loader.stop("Python updated!")
