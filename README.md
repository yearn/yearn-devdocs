# Yearn Protocol Documentation Website

The yearn devdocs [website](https://docs.yearn.fi/) is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

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

### Documentation Structure

We have 2 types of documentation: versioned documentation and non-versioned documentation:

- Versioned documentation is automatically generated from another repository's code.
- Non-versioned documentation is generated from markdown or HTML files and edited manually.

For detailed information on the contributing workflow, please see the [Contributing Documentation](CONTRIBUTING.md).

#### Non-versioned Documentation

In the `docs` folder:

- getting-started
- partners
- v1

#### Versioned Documentation

Versioning has changed. Because Yearn supports multiple products with their own versions, versioning is now done manually using folder structure to keep things organized. There are folders for all versions of the smart contract natspec documentation in:

```

docs/developers/smart-contracts
                    |---- V3 Current (v3.x.x)
                    |           |--- contract 1 
                    |           |--- contract 2
                    |           |--- contract n... 
                    |           
                    |---- V3 Deprecated 
                    |           |--- v3.x.x
                    |           |     |--- contract 1 
                    |           |     |--- contract 2
                    |           |     |--- contract n... 
                    |           |--- v3.x.x
                    |                |--- contract 1 
                    |                |--- contract 2
                    |                |--- contract n... 
                    |           
                    |---- V2 Current (v0.4.6)
                    |           |--- contract 1 
                    |           |--- contract 2
                    |           |--- contract n... 
                    |           
                    |---- V2 Deprecated 
                    |           |--- v0.4.5
                    |           |     |--- contract 1 
                    |           |     |--- contract 2
                    |           |     |--- contract n... 
                    |           |--- v0.x.x
                    |                |--- contract 1 
                    |                |--- contract 2
                    |                |--- contract n... 

```

### Generating V2 Versioned Documentation

#### Dependencies

- Clone [yearn/yearn-vaults](https://github.com/yearn/yearn-vaults) in the same folder where you cloned yearn-devdocs (not inside devdocs, but besides it)
- Run the yearn-vaults [installation](https://github.com/yearn/yearn-vaults#installation), you will need to have brownie installed to run it once so it installs the required dependencies.
- Check the vyper compiler version on the vaults repo ([here](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1)) and update the `~/.vvm/vyper-X.X.X` in the end of the first command below.
- Make sure [Vault.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1) and [Registry.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Registry.vy#L1) on `yearn-vaults` folder has the same compiler version on their first line. If not, bump the file with the lowest version to the current version the other uses.
- If any contract file in yearn-vaults uses a fixed compiler version (without leading `^`) you may have to add it so the `solc` compiler will run. Also, make sure `solc` version is up-to-date.
- If you get errors with global `solc` try to install it locally on the project with npm

**Generate:**

To generate API documentation and coin a new release, do the following.

1. Generate docs from contracts using vydoc or similar documentation creator.
2. Create new "current" folder in "docs/developers/smart-contracts/v2/current-<newVersion#>"
3. Copy new docs into newly created folder.
4. rename and move deprecated docs folder into deprecated folder

:warning: Here are the old instructions to create vydoc documentation. They may need updating.

```

npx vydoc -i ../yearn-vaults/contracts/ -o ./vaults/smart-contracts -t ./templates/contract.ejs -c ~/.vvm/vyper-0.3.3
npx solidity-docgen@0.5.17 --solc-module solc --templates=templates --helpers=helpers/solidityHelpers.js -i ../yearn-vaults/contracts/ -o ./docs/developers/smart-contracts/V2
npm run docusaurus docs:version 0.4.5
```

If you are developing in Solidity and Foundry you can use `[forge-doc](https://book.getfoundry.sh/reference/forge/forge-doc)`
