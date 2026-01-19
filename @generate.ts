import { readdir, writeFile } from "node:fs/promises"
import { basename, extname, join } from "node:path"
import { intro, spinner } from "@clack/prompts"
import { execa } from "execa"
import pc from "picocolors"
import { replaceInFile } from "replace-in-file"
import metadata from "./package.json" with { type: "json" }

const loader = spinner()
const root = join(import.meta.dirname)

const $ = execa({
  cwd: root,
  stdout: ["inherit", "pipe"],
  //verbose: "short",
  preferLocal: true,
})

intro(pc.bold("Generating the extension"))

// Extension

loader.start("Updating extension")

await replaceInFile({
  files: "extension/profile.json",
  from: /extension.*profile/g,
  to: `extension/v${metadata.version}/profile`,
})

await replaceInFile({
  files: "extension/profile.json",
  from: /extension.*schemas/g,
  to: `extension/v${metadata.version}/schemas`,
})

await $`
uvx
jsonschema2md@1.7.0
extension/profile.json extension/content/docs/specification/metadata.md
`

await replaceInFile({
  files: ["extension/content/docs/specification/metadata.md"],
  from: /^#.*/,
  to: "---\ntitle: Metadata\n---",
})

for (const file of await readdir("extension/schemas")) {
  const name = basename(file, extname(file))

  await $({ shell: true })`
  dpkit schema convert
  extension/schemas/${file}
  --to-path extension/content/docs/specification/data/${name}.md
  --to-format html
  --frontmatter
  --silent
  `
}

$`rm -rf extension/public/extension/v${metadata.version}`
$`mkdir -p extension/public/extension/v${metadata.version}`
$`cp extension/profile.json extension/public/extension/v${metadata.version}`
$`cp -r extension/schemas extension/public/extension/v${metadata.version}`

loader.stop("Extension updated!")

// TypeScript

loader.start("Updating TypeScript")

await $({ shell: true })`
jq
'.allOf |= .[1:]'
extension/profile.json
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
