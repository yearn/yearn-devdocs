# Yearn Protocol Documentation Website

The Yearn Docs [website](https://docs.yearn.fi/) is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation and Setup

1. Fork the yearn-devdocs repository at https://github.com/yearn/yearn-devdocs

2. clone your forked repo locally. Replace `<yourUserName>` with your github user name

    ```bash
    git clone https://github.com/<yourUserName>/yearn-devdocs
    cd yearn-devdocs
    ```

### Install project dependencies

1. Install Node dependencies

    make sure you have the most recent lts node version installed

    ```bash
    nvm install --lts
    ```

    Then install node dependencies

    ```bash
    yarn
    ```

2. Install Python/Vyper dependencies for natspec docs generation (You can skip this step if you aren't working on smart contract documentation)

    This assumes you are using linux and will use the apt package manager.

    2a. update the apt package manager

    ```bash
    sudo apt update
    ```

    2b. Install Python 3

    ```bash
    sudo apt install python3
    ```

    2c. Verify the installation

    ```bash
    python3 --version
    ```

    2d. Create and initialize python virtual environment

    ```bash
    python3 -m venv venv
    source venv/bin/activate
    ```

    2e. install requirements

    ```bash
    python3 -m pip install -r requirements.txt
    ```

    2f. Install Foundry

    ``` bash
    curl -L https://foundry.paradigm.xyz | bash
    ```

    open a new terminal window and run

    ```bash
    foundryup
    ```

## Local Development

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

```bash
yarn start
```

## Build

This command generates static content into the `build` directory and can be served using any static content hosting service.

```bash
yarn build
```

## Deployment

There is a github actions script that builds and deploys the site when a pull request is merged to the `master` branch.

If you are using GitHub pages for hosting, this command is a convenient way to build the website and push it to the `gh-pages` branch.

```bash
GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

## Contribute

For detailed information on the contributing workflow, please see the [Contributing Documentation](CONTRIBUTING.md).

### Documentation Structure

We have 2 types of documentation: General documentation and Natspec documentation of smart contracts:

- General documentation is generated from markdown or HTML files and edited manually.
- Natspec documentation is automatically generated from another repository's code.

#### Non-versioned Documentation

This documentation is located in the `docs` folder and most content is either in the `getting-started` folder (User Docs), the `developers` folder (Dev Docs), or the `contributing` folder (DAO Docs).

#### Versioned Documentation

Versioning has changed. Because Yearn supports multiple products with their own versions, versioning is now done manually using folder structure (instead of native Docusaurus versioning) to keep things organized. There are folders for all versions of the smart contract [NatSpec](https://docs.soliditylang.org/en/latest/natspec-format.html) documentation in:

```
docs/developers/smart-contracts
├── V3
│   ├── Current contract 1
│   ├── Current contract 2
│   ├── Current contract n...
│   └── V3 Deprecated
│       ├── v3.x.x
│       │   ├── contract 1
│       │   ├── contract 2
│       │   └── contract n...
│       └── v3.x.x
│           ├── contract 1
│           ├── contract 2
│           └── contract n...
├── V2
│   ├── Current contract 1
│   ├── Current contract 2
│   ├── Current contract n...
│   └── V2 Deprecated
│       ├── v0.4.5
│       │   ├── contract 1
│       │   ├── contract 2
│       │   └── contract n...
│       └── v0.x.x
│           ├── contract 1
│           ├── contract 2
│           └── contract n...
```

### Generating V2 Versioned Documentation

#### Dependencies

- Clone the V2 vaults repository: [yearn/yearn-vaults](https://github.com/yearn/yearn-vaults) in the same folder where you cloned yearn-devdocs (not inside devdocs, but beside it)
- Run the yearn-vaults [installation](https://github.com/yearn/yearn-vaults#installation), you will need to have brownie installed to run it once so it installs the required dependencies.
- Check the vyper compiler version on the vaults repo ([here](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1)) and update the vyper version in the `requirements.txt` file in this repo.
- Make sure [Vault.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Vault.vy#L1) and [Registry.vy](https://github.com/yearn/yearn-vaults/blob/master/contracts/Registry.vy#L1) on `yearn-vaults` folder has the same compiler version on their first line. If not, bump the file with the lowest version to the current version the other uses.
- If any contract file in yearn-vaults uses a fixed compiler version (without leading `^`) you may have to add it so the `solc` compiler will run. Also, make sure `solc` version is up-to-date.
- If you get errors with global `solc` try to install it locally on the project with npm

#### Generate

To generate API documentation and coin a new release, do the following.

1. Create new folder in `docs/developers/smart-contracts/v2/deprecated` with the current version number (i.e. version-0.4.6)
2. Move existing docs into newly created folder. Leave the index.md file and update the vault version called out in it to the new version number.
3. Generate docs from contracts using vydoc or similar documentation creator.
4. lint and clean up docs
5. Move new generated docs into `docs/developers/smart-contracts/v2/`

:warning: Here are the old instructions to create vydoc documentation. They may need updating.

#### VyDoc

Generate docs with vydoc. Arguments are:
-i is where the smart contracts live
-o is where the generated documentation will be written
-t is the template used to generate the docs
-c is the compiler (make sure you have the correct vyper installed)

```bash
npx vydoc -i ../yearn-vaults/contracts/ -o ./natspec/temp -t ./natspec/contract.ejs -c $(which vyper)
```

```bash
npx solidity-docgen@0.5.17 --solc-module solc --templates=natspec --helpers=helpers/solidityHelpers.js -i ../yearn-vaults/contracts/ -o ./docs/developers/smart-contracts/v2
```

### Generating V3 Smart Contract Documentation

1. All necessary V3 github repos should be included as git submodules within this repo. They are located in the `natspec/lib` folder. If the repo folders are empty, you need to install the submodules:

```bash
git submodule update --init --recursive
```

For reference, these are the addresses for the different submodules:

- [yearn/yearn-vaults-v3](https://github.com/yearn/yearn-vaults-v3/tree/master)
- [yearn/vault-periphery](https://github.com/yearn/vault-periphery)
- [yearn/tokenized-strategy](https://github.com/yearn/tokenized-strategy/tree/master)
- [yearn/tokenized-strategy-periphery](https://github.com/yearn/tokenized-strategy-periphery/tree/master)
- [yearn/yearn-ERC4626-Router](https://github.com/yearn/Yearn-ERC4626-Router)
  
2. If you haven't already, create a python virtual environment and initialize.

```bash
python3 -m venv venv
source venv/bin/activate
```

3. If you haven't already, install the python requirements.

```bash
python3 -m pip install -r requirements.txt
```

4. If you havent already, install Forge.

``` bash
curl -L https://foundry.paradigm.xyz | bash
```

open a new terminal window and run

```bash
foundryup
```

then re-activate your venv

```bash
source venv/bin/activate
```

You should now be ready to generate some docs! To generate new documentation run the v3 documentation script. You will be prompted for a new version number.

```bash
yarn v3-docs
```

This should:

- Generate documentation for the contracts listed in the `v3-contracts` object in `smartContracts.json`.
- Move the existing "current" files into a new folder in `developers/smart-contracts/v3/deprecated` with the old version number.
- Add the new files to `developers/smart-contracts/v3`
- update the index.md file to reflect the new release version.

The script runs a markdown linter, so the output files should be pretty clean, but they still may need some manual adjustment. You may also still get build errors if there are characters in the natspec that MDX v3 doesn't like (like {} and <>). These will need to be removed manually or escaped out of using the `\` character. More info [here](https://docusaurus.io/docs/markdown-features/react#markdown-and-jsx-interoperability).

There will also probably be some broken links. These are usually from the forge doc build and will reference the structure of the forge doc output. Easiest way to find these is to do a search in VSCode. I search for `(/src/` with `developers/smart-contracts/v3/*` included and `developers/smart-contracts/v3/deprecated/*` excluded. The 2 main broken links will be:

- links to inherited contracts. If included in the markdown docs, you can re-link these to the included files. i.e. `[Governance](/src/utils/Governance.sol/contract.Governance.md)` -> `[Governance](Governance)`. If they aren't in the included files, either remove the link or link to the github.
- Links to sections in another file. These should be relinked to the correct file if in the directory, or to the github if not included.
- Links to other sections in the same file. These use the hash router and usually just need everything before the hash to be removed to work. i.e. `[redeem](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migrate)` -> `[redeem](#migrate)`

> **⚠️ Note to Maintainers**: Consider whether inherited contracts and interfaces that are linked in included files should be added to the included files list.

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
