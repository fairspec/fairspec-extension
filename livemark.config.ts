import { defineConfig } from "livemark"
import packageJson from "./package.json" with { type: "json" }

const { origin, pathname } = new URL(packageJson.homepage)

export default defineConfig({
  site: origin,
  base: command => (command === "build" ? pathname : "/"),
  title: packageJson.title,
  description: packageJson.description,
  logo: "/logo.svg",
  favicon: "/logo.png",
  include: ["docs/**/*.md", "README.md", "CONTRIBUTING.md"],
  exclude: ["docs/profiles/**", "docs/schemas/**"],
  sections: [
    { title: "Docs", prefix: "/" },
    {
      title: "Changelog",
      prefix: "/changelog/",
      type: "changelog",
      source: packageJson.repository,
      version: true,
    },
  ],
  links: [
    {
      url: packageJson.repository,
      title: "GitHub",
      icon: "github",
    },
  ],
  patches: [
    {
      file: "README.md",
      article: {
        title: "Overview",
        icon: "book-open",
        path: "/overview/",
        order: 10,
      },
    },
    {
      file: "CONTRIBUTING.md",
      article: {
        title: "Contributing",
        description:
          "How to set up the extension locally, propose changes, and ship a release.",
        icon: "heart-handshake",
        path: "/overview/contributing/",
        order: 99,
      },
    },
  ],
})
