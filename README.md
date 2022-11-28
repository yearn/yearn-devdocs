# Yearn Protocol Documentation Website

The yearn devdocs [website](https://docs.yearn.finance/) is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

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

### Doc structure

Doc is split in two, the versioned doc and the non-versioned doc.
Doc is generated from markdown or HTML files.

For detailed information on the contributing workflow, please see the [Contributing doc](CONTRIBUTING.md).

#### Not versioned doc

In the `docs` folder:

- getting-started
- partners
- v1

#### Versioned doc

In `versioned_docs` you will find several versions of the vault doc that corresponds to a tagged release. In `docs/v2` you can find the latest version that corresponds to the changes on year-vault master is the documentation for the next/unreleased version.

Versioned doc should not be edited but generated directly from the vault codebase.

##### Generating Versioned Docs

**Dependencies**

- Clone [yearn/yearn-vaults](https://github.com/yearn/yearn-vaults) in the same folder where you cloned yearn-devdocs (not inside devdocs, but besides it)
- Run the yearn-vaults [installation](https://github.com/yearn/yearn-vaults#installation), you will need to have brownie installed to run it once so it installs the required dependencies.
- Check the vyper compiler version on the vaults repo ([here](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1)) and update the `~/.vvm/vyper-X.X.X` in the end of the first command below.
- Make sure [Vault.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1) and [Registry.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Registry.vy#L1) on `yearn-vaults` folder has the same compiler version on their first line. If not, bump the file with the lowest version to the current version the other uses.

**Generate:**

To generate API docs and coin a new release, do the following.
```
npx vydoc -i ../yearn-vaults/contracts/ -o docs/v2/smart-contracts -t ./templates/contract.ejs -c ~/.vvm/vyper-0.3.3
npx solidity-docgen --solc-module solc-0.8 --templates=templates --helpers=helpers/solidityHelpers.js -i ../yearn-vaults/contracts/ -o docs/v2/smart-contracts
npm run docusaurus docs:version 1.0.0
```
