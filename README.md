# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), a modern static website generator.

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

This command generates static content into the `build` directory and can be served using any static contents hosting service.

## Deployment

```console
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push to the `gh-pages` branch.

## Versioning

To generate API docs and coin a new release, do the following.
```
npx vydoc -i ../yearn-vaults/contracts/ -o docs/smart-contracts -t ./templates/contract.ejs -c ~/.vvm/vyper-0.2.11
npx solidity-docgen --templates=templates -i ../yearn-vaults/contracts/ -o docs/smart-contracts
npm run docusaurus docs:version 1.0.0
```
