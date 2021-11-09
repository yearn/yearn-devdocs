# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

[yearn-devdocs](https://yearn.github.io/yearn-devdocs/)

## Installation

```console
yarn install
```

## Local Development

```console
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```console
yarn build
```

This command generates static content into the `build` directory and can be served using any static content hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push it to the `gh-pages` branch.

## Contribute

## Doc structure

Doc is split in two, the versioned doc and the non-versioned doc.
Doc is generated from markdown or HTML files.

For detailed information on the contributing workflow, please see the [Contributing doc](CONTRIBUTING.md).

### Not versioned doc

In the `docs` folder:

- getting-started
- partners
- v1

### Versioned doc

In `versioned_docs` you will find several versions of the vault doc that corresponds to a tagged release. In `docs/v2` you can find the latest version that corresponds to the changes on year-vault master is the documentation for the next/unreleased version.

Versioned doc should not be edited but generated directly from the vault codebase.

#### Generating Versioned doc

To generate API docs and coin a new release, do the following.
```
npx vydoc -i ../yearn-vaults/contracts/ -o docs/v2/smart-contracts -t ./templates/contract.ejs -c ~/.vvm/vyper-0.2.11
npx solidity-docgen --templates=templates --helpers=helpers/solidityHelpers.js -i ../yearn-vaults/contracts/ -o docs/v2/smart-contracts
npm run docusaurus docs:version 1.0.0
```
