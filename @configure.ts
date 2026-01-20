import { rename } from "node:fs/promises"
import { join } from "node:path"
import { intro, isCancel, outro, spinner, text } from "@clack/prompts"
import { remark } from "remark"
import { replaceInFile } from "replace-in-file"
import TOML from "smol-toml"
import packageJson from "./package.json" with { type: "json" }

process.chdir(import.meta.dirname)
const loader = spinner()

intro("Configuring the extension...")

const inputSlug = await text({
  message: "Provide a slug for your extension",
  placeholder: "fairspec-extension",
  initialValue: packageJson.slug,
  validate(value) {
    if (value.length === 0) return "Title is required!"
    return undefined
  },
})

const inputTitle = await text({
  message: "Provide a title for your extension",
  placeholder: "Fairspec Extension",
  initialValue: packageJson.title,
  validate(value) {
    if (value.length === 0) return "Title is required!"
    return undefined
  },
})

const inputDescription = await text({
  message: "Provide a description for your extension",
  placeholder: "A data package extension for...",
  initialValue: packageJson.description,
  validate(value) {
    if (value.length === 0) return "Description is required!"
    return undefined
  },
})

const inputRepository = await text({
  message: "Provide a repository URL for your extension",
  placeholder: "https://github.com/fairspec/fairspec-extension",
  initialValue: packageJson.repository,
  validate(value) {
    if (value.length === 0) return "Repository is required!"
    return undefined
  },
})

const inputHomepage = await text({
  message: "Provide a homepage URL for your extension",
  placeholder: "https://fairspec.github.io/fairspec-extension/",
  initialValue: packageJson.homepage,
  validate(value) {
    if (value.length === 0) return "Homepage is required!"
    return undefined
  },
})

const inputAuthor = await text({
  message: "Provide an extension author",
  placeholder: "Evgeny Karev",
  initialValue: packageJson.author,
  validate(value) {
    if (value.length === 0) return "Author is required!"
    return undefined
  },
})

const slug = isCancel(inputSlug) ? packageJson.slug : inputSlug
const title = isCancel(inputTitle) ? packageJson.title : inputTitle
const description = isCancel(inputDescription)
  ? packageJson.description
  : inputDescription
const repository = isCancel(inputRepository)
  ? packageJson.repository
  : inputRepository
const homepage = isCancel(inputHomepage) ? packageJson.homepage : inputHomepage
const author = isCancel(inputAuthor) ? packageJson.author : inputAuthor

if (title || description || repository) {
  loader.start("Updating the extension...")

  await replaceInFile({
    files: [
      "python/README.md",
      "typescript/README.md",
      "website/README.md",
      "README.md",
    ],
    processor: source => {
      const tree = remark().parse(source)

      for (const node of tree.children) {
        if (title) {
          if (node.type === "heading" && node.depth === 1) {
            node.children = [{ type: "text", value: title }]
            break
          }
        }
      }

      for (const node of tree.children) {
        if (description) {
          if (node.type === "paragraph") {
            const textNode = node.children[0]
            if (textNode?.type === "text") {
              const value = textNode.value.trim()
              if (!value.startsWith("[") && !value.startsWith("<")) {
                node.children = [{ type: "text", value: description }]
                break
              }
            }
          }
        }
      }

      return remark().stringify(tree)
    },
  })

  await replaceInFile({
    files: ["LICENSE.md"],
    processor: source => {
      const tree = remark().parse(source)

      for (const node of tree.children) {
        if (author) {
          if (node.type === "paragraph") {
            const value = `Copyright © ${new Date().getFullYear()} ${author}`
            node.children = [{ type: "text", value }]
            break
          }
        }
      }

      return remark().stringify(tree)
    },
  })

  await replaceInFile({
    files: ["typescript/package.json", "website/package.json", "package.json"],
    processor: (source, file) => {
      const data = JSON.parse(source) as any

      if (file.includes("typescript")) {
        if (slug) data.name = slug
      }

      if (slug) data.slug = slug
      if (title) data.title = title
      if (description) data.description = description
      if (repository) data.repository = repository
      if (homepage) data.homepage = homepage
      if (author) data.author = author

      const target = JSON.stringify(data, null, 2)
      return target
    },
  })

  await replaceInFile({
    files: ["python/pyproject.toml"],
    processor: source => {
      const data = TOML.parse(source) as any

      if (slug) data.project.name = slug
      if (slug) data.project.slug = slug
      if (title) data.project.title = title
      if (description) data.project.description = description
      if (repository) data.project.urls = { repository, homepage }
      if (author) data.project.authors = [{ name: author }]

      const target = TOML.stringify(data)
      return target
    },
  })

  // Rename the Python package directory
  const sdkPath = "python"
  const oldPath = join(sdkPath, packageJson.slug.replace("-", "_"))
  const newPath = join(sdkPath, slug.replace("-", "_"))
  await rename(oldPath, newPath)

  loader.stop("Extension is updated!")
}

outro("All done! Now you can review and commit the changes")
