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

Versioning has changed. Because Yearn supports multiple products with their own versions, versioning is now done manually using folder structure to keep things organized. There are folders for all versions of the smart contract [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html) documentation in:

```

docs/developers/smart-contracts
                    |---- V3 (Current) 
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
                    |---- V2 (Current) 
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

- Clone the V2 vaults repository: [yearn/yearn-vaults](https://github.com/yearn/yearn-vaults) in the same folder where you cloned yearn-devdocs (not inside devdocs, but beside it)
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

npx vydoc -i ../yearn-vaults/contracts/ -o ./vaults/smart-contracts -t ./natspec/contract.ejs -c ~/.vvm/vyper-0.3.3
npx solidity-docgen@0.5.17 --solc-module solc --templates=natspec --helpers=helpers/solidityHelpers.js -i ../yearn-vaults/contracts/ -o ./docs/developers/smart-contracts/v2
npm run docusaurus docs:version 0.4.5
```

If you are developing in Solidity and Foundry you can use `[forge-doc](https://book.getfoundry.sh/reference/forge/forge-doc)`

### Generating V3 Smart Contract Documentation

- Clone and install relevant repos outside of the devdocs project folder. Ideally these folders live at the same level as the devdocs folder.

  - [yearn/yearn-vaults-v3](https://github.com/yearn/yearn-vaults-v3/tree/master)
  - [yearn/vault-periphery](https://github.com/yearn/vault-periphery)
  - [yearn/tokenized-strategy](https://github.com/yearn/tokenized-strategy/tree/master)
  - [yearn/tokenized-strategy-periphery](https://github.com/yearn/tokenized-strategy-periphery/tree/master)
  - [yearn/yearn-ERC4626-Router](https://github.com/yearn/Yearn-ERC4626-Router)
  
  ``` title="Folder Structure"
    |---- Parent Directory 
              |--- DevDocs Folder 
              |--- yearn-vaults-v3 Folder 
              |--- vault-periphery Folder
              |--- tokenized-strategy Folder
              |--- tokenized-strategy-periphery Folder
              |--- yearn-ERC4626-Router Folder
  ```

- create virtual environment and initialize

- install correct python and vyper

### script outline

prompt for new version number.

get names of existing v3 files in current `docs/developers/smart-contracts/V3` directory:

create a new folder for the old version docs in `docs/developers/smart-contracts/V3/deprecated/` with the old version number (i.e. `version-3.0.1`) and copy current files into it.

``` bash
mkdir docs/developers/smart-contracts/V3/deprecated/version-#.#.#
rsync -av --remove-source-files --exclude 'deprecated' --exclude 'index.md' docs/developers/smart-contracts/V3/ docs/developers/smart-contracts/V3/deprecated/version-#.#.#/
```

---

rewrite index.md file in current file with new version number.

```markdown
# V3 yVault Smart Contracts

:::info

**Current v3 yVault API version is ${version-number}**

older versions will be located in the "deprecated" Folder if they exist.

:::

<!-- mdx code block -->
import DocCardList from '@theme/DocCardList';

<DocCardList />
<!-- mdx code block -->
```

---

create vyper docs
NOTE: your vyper version must match the smart contracts's version.
NOTE: your solc version must match the smart contract's version. run `solc-select use <version> --always-install`

```bash
npx vydoc \
  -i ../yearn-vaults-v3/contracts/ \
  -o ./docs/developers/smart-contracts/v3/ \
  -t ./natspec/contract.ejs \
  -vc $(which vyper) \
  -sc $(which solc)
```

```bash
npx vydoc \
  -i ../yearn-vaults-v3/contracts/ \
  -o ./natspec/temp \
  -t ./natspec/contract.ejs \
  -c $(which vyper) 
```

Some cleanup will be required. The easiest way to do this is (in VSCode) to hover over on items flagged by the [markdownlint plugin](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) and select "quick fix" and then "fix all supported markdownlint violations in the document".

You may still get build errors if there are characters in the natspec that MDX v3 doesn't like (like {} and <>). These will need to be removed manually or escaped out of using the '\' character. More info [here](https://docusaurus.io/docs/markdown-features/react#markdown-and-jsx-interoperability)

### Custom Elements

#### Detail Element

This is a Detail element that contains other text inside. If you format the summary section as shown it renders markdown correctly.

```
<details className="customDetails">

  <summary>
  
  ## Title Here
  
  </summary>

### Subtitles as needed

content here

</details>
```

There is also a "customFaqDetails" css class that removes the borders.

#### PrettyLink

The PrettyLink element makes your links into button-like elements with subtle animation and yearn styling. These links will fill the full width of the markdown document. Can be used with naked links or with markdown style links.

```
<PrettyLink>[your link name](your-link-url)</PrettyLink>
```

#### Yearn Admonition

There is a custom informational Yearn-styled admonition that can be used like any other admonition.

```
:::yearn-info[title-goes-here]

text content

:::
```
