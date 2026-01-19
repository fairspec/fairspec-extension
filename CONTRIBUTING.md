---
title: Contributing
sidebar:
  order: 4
---

Here you can find the guidelines for contributing to the extension. We welcome any kind of contributions either by opening issues or by submitting pull requests.

## Prerequisites

- **Development**:
  - Node 24+ (with pnpm) - [How to Install](https://nodejs.org/en/download/current)
  - Python 3.12+ (with uv) - [How to Install](https://docs.astral.sh/uv/getting-started/installation)
- **Releasing**:
  - Configured a pending trusted publisher on [PyPI](https://pypi.org/manage/account/publishing/) matching the extension name (slug)
  - Created an access token on [NPM](https://www.npmjs.com/settings/roll/tokens), added to [Github](https://github.com/datisthq/extensiondp/settings/secrets/actions) as a repository secret `NPM_TOKEN`
  - In case you use it on GitHub, updated the publishing source in [the settings](https://github.com/datisthq/extensiondp/settings/pages) to `Github Actions`.

## Development

> [!NOTE]
> If you not familiar with the Git workflow, we recommend reading of how to [clone a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) and how to [create a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

### Getting Started

Start by cloning the repository or its fork, installing the dependencies, configuring the extension, and starting the site:

```bash
git clone https://github.com/datisthq/extensiondp.git
cd extensiondp
pnpm install
pnpm configure
pnpm start
```

### Managing the Project

- **`pnpm install`** - Install dependencies
- **`pnpm configure`** - Configure extension metadata (slug, title, description, etc.)
- **`pnpm generate`** - Generate TypeScript and Python SDKs from schemas
- **`pnpm format`** - Format the project files to consistent style
- **`pnpm start`** - Start the documentation site in development mode
- **`pnpm test`** - Verify project integrity

### Working on the Extension

The fiels you need to edit to update the extension:

- **extension/profile.json** - Edit the profile to model your data package
- **extension/schemas/** - Edit the schemas to model your data tables
- **extension/content/docs/index.mdx** - Edit the homepage
- **extension/content/docs/overview/** - Edit not generated documentation pages

The rest of the files are generic or generated and should not be edited directly unless you want a more granular control over the extension development.

### Generating SDKs

If you modify the profile or schemas, you need to generate the SDKs and commit the changes:

```bash
pnpm generate
git commit -am "My changes"
```

## Releasing

> [!NOTE]
> It is also possbile to commit directly to the `main` branch using conventional commits, but we recommend using pull requests for this purpose.

After your pull request is ready to be merged, you can release a new version of the extension by merging the pull request into the `main` branch:

1. Squash and merge the PR using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#summary).
2. In case you use it on GitHub, Github Actions will automatically create a new release, publish the extension to PyPI and NPM, and publish the documentation to GitHub Pages.
