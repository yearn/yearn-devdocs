# Wallet and Portfolio Tracker Integration

Yearn and its ecosystem contain a number of different vaults and products that can be hard to keep up with. This guide will describe the best way to accurately and effectively find Yearn vaults and other products to keep your users in the know when it comes to their positions. This page will cover finding all of Yearn's vaults, determining accurate prices for them and how to show historical APYs.

## Overview

There are 2 ways to get Yearn Vault Data: Via the [Kong API](/developers/data-services/yearn-data/#kong) that Yearn provides or manually by querying the smart contracts used to deploy and register Vaults. We will start by looking at how to do this manually to give an overview of how the system works.

Yearn has a few versions of Vaults: [V1](/developers/v3/overview), [V2](/developers/v2/getting-started), and [V3](/developers/v1/introduction) and each will need to be queried slightly differently. We will start with V3.

## Getting V2 and V3 Vaults with Kong

Being able to get the vaults manually is great, but here at Yearn we like to make things easy. So we have a public endpoint for the Yearn-built [Kong](/developers/data-services/yearn-data/#kong) indexer that you can query for all V2 and V3 Yearn vaults (and you can also get other 4626 vaults with it!).

The public endpoint is: https://kong.yearn.farm/api/gql

As of writing there is no need for an API key and the API can be queried with standard graphQL libraries The example below use Apollo client, but the concept should be similar for all libraries. The above link is also an explorer to play around with the endpoint. The documentation is still under construction, but below you will get the basics.

```markdown title="Example Vault Query"
  query GetVaultData {
    vaults {
      address
      name
      chainId
      asset {
        name
        symbol
        decimals
        address
      }
      yearn
      v3
      meta {
        displayName
        displaySymbol
        description
        protocols
        token {
          category
          description
          displayName
          displaySymbol
          icon
          type
        }
      }
      apy {
        weeklyNet
      }
      pricePerShare
    }
  }
```

The above query will retrieve all vaults from Kong with the following fields for each:

- `address` (The vault address)
- `name` (The vault name)
- `chainId` (The chain ID the vault lives on)
- `asset` (The name, symbol, number of decimals, and address of the underlying asset the vault contains)
- `yearn` (A boolean value for whether the vault is endorsed or not)
- `v3` (A boolean value for whether the vault is a v3 vault or not)
- `meta` (Assorted metadata for the vault including descriptions of the vault and/or underlying tokens). This data exists for most Yearn deployed vaults but not all.
- `apy` (the current APY of the vault. There are other ways to get APY we will discuss below).
- `pricePerShare` (the current price per Vault Share)

The returned list of vaults will include all v2 and v3 vaults as well as many popular ERC4626 vaults deployed on ethereum and other L2s. If you want to limit your result to just endorsed vaults, you will need to filter the resulting object on the `yearn` boolean.

```js title="Example pseudo-code"
const filterYearnVaults = (vaults) =>
  vaults.filter((vault) => vault.yearn)

const data = Query(getVaultData)
const yearnVaults = data?.vaults ? filterYearnVaults(data.vaults) : undefined
```

There are lots more fields to query over so take a look around in the playground and pop into the Yearn discord if you have any questions.

## Getting V3 yVaults Manually

Below are the relevant factories and registries for V3 contracts. The most recent registry will always be located at registry.v3.ychad.eth. All deployments are done using Create2 factories so these addresses will be consistent across all EVM chains.

| Registry / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **VaultFactory 3.0.1** | <ContractAddress contractName = {['releaseRegistry', '3.0.1', 'factory']} /> |
| **VaultFactory 3.0.2** | <ContractAddress contractName = {['releaseRegistry', '3.0.2', 'factory']} /> |
| **VaultFactory 3.0.3** | <ContractAddress contractName = {['releaseRegistry', '3.0.3', 'factory']} /> |
| **VaultFactory 3.0.4** | <ContractAddress contractName = {['releaseRegistry', '3.0.4', 'factory']} /> |
| **V3 Registry** <br/> registry.v3.ychad.eth | <ContractAddress contractName = {['yearnV3Contracts', 'registry']} /> |
| **Legacy V3 Registry** <br/> | <ContractAddress contractName = {['yearnV3Contracts', 'legacyRegistry1']} /> |

A full list of yVault V3 contracts can be viewed [here](/developers/addresses/v3-contracts). The addresses on that page are stored in a `constants.ts` file located in the yearn DevDocs repo. You can find it [here](https://github.com/yearn/yearn-devdocs/blob/master/src/ethereum/constants.ts).

### Querying Factories

:::info

If you only want to get "official" or endorsed Yearn vaults then skip this section and just to the Querying Registries section below.

:::

Yearn's V3 Vault Factory contracts are deployed on many EVM chains and are permissionless so anyone can use them to create vaults. If you want to find all vaults that have been deployed, whether it was done by Yearn or not, you need to look at the Factory Vaults.

When a new vault is created with a factory, the factory emits a `NewVault` event to the logs that includes the vault address and the address of the underlying asset in the vault (i.e. usdc).

```solidity
NewVault (index_topic_1 address vault_address, index_topic_2 address asset)
```

Each new version of Vaults that are deployed will have its own factory, and each factory will have its own logs of events, so to get all of the deployed vaults you will need to iterate over all the factories.

### Querying Registries

Since V3 factories are permissionless, Yearn also deploys permissioned registry contracts that only Yearn governance can add to. These are the best place to find the official (endorsed) Yearn Vaults that are deployed by Yearn. As mentioned above, the most recent registry will resolve from registry.v3.ychad.eth. But you will need to query all the registries to get all the endorsed vaults.

To get the endorsed vaults you can either:

**A.** Search through the Events Log of the registry contract and save all `NewEndorsedVault` events. This data contains the vault address, the underlying asset address, the releaseVersion, and the Vault Type.

```solidity
NewEndorsedVault (index_topic_1 address vault, index_topic_2 address asset, uint256 releaseVersion, uint256 vaultType)
```

**B.** Or query the registry factory directly. To do that you need to:

1. Call the `getAssets()` function to get an array of underlying tokens with deployed vaults. This array will be used in the next step.
2. Loop through each entry in the array and call the `getEndorsedVaults()` function with the address value from the array as the argument to get an array of vaults for each underlying asset

```js title="Example pseudo-code"
const allVaultsFromRegistry = []
const assetArray = getAssets()
for (asset in assetArray) {
    const vaultsArray = getEndorsedVaults(asset)
    allVaultsFromRegistry.push(...vaultsArray)
}
```

Additional vault data can then be found by calling the respective read functions on the vault contracts (`name()`, `symbol()`, `decimals()`, `token()`, `pricePerShare()`, etc).

Like the factories, you will need to query all registry contracts to get all the endorsed vaults.

## Getting V2 yVaults Manually

Below are the relevant registries for V2 contracts.

| Registry / ENS | Chain (ID) | Contract Address |
|----------------|------------|------------------|
| Mainnet Factory Registry | 1 | 0xaF1f5e1c19cB68B30aAD73846eFfDf78a5863319 |
| Mainnet Legacy Registry 1 | 1 | 0xe15461b18ee31b7379019dc523231c57d1cbc18c |
| Mainnet Legacy Registry 2 | 1 | 0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804 |
| Optimism Legacy Registry | 10 | 0x1ba4eB0F44AB82541E56669e18972b0d6037dfE0 |
| Fantom Legacy Registry | 250 | 0x727fe1759430df13655ddb0731dE0D0FDE929b04 |
| Arbitrum Legacy Registry | 42161 | 0x3199437193625DCcD6F9C9e98BDf93582200Eb1f |

V2 works similarly to V3 in that there is a factory contract (called the Release Registry) where anyone can deploy a vault. There is also a registry contract that stores the endorsed Yearn vaults (called the factory registry on Mainnet).

Endorsed vaults can be queried directly from this contract. To do that you need to:

1. Call the `numTokens()` function to get the number of underlying tokens with deployed vaults. This will be used as the index for the next step.
2. Loop through each entry in the index and call the `tokens()` function with the index value as the argument to get the underlying token address at that index point.
3. For each underlying token address, call `numVaults()` with the address as the argument. This will be used as the index for the next step.
4. Loop through each entry in the new index and call the `vaults()` function with the underlying token address and index value as the arguments.

```js title="Example pseudo-code"
const allV2VaultsFromRegistry = []
const numTokens = numtokens()
for (i=0, i < numtokens-1, i++){
    const tknAddress = tokens(i) 
    const numberOfVaults = numVaults(tknAddress) 
    for (v=0, v < numberOfVaults-1, v++){
        const vaultAddress = vaults(tknAddress, v) 
        allVaultsFromRegistry.push(vaultAddress)
    }
}
```

Additional vault data can then be found by calling the respective read functions on the vault contracts (`name()`, `symbol()`, `decimals()`, `token()`, `pricePerShare()`, etc).

Like with V3, you will need to query all registry contracts to get all the endorsed vaults.

## Getting V1 Vaults

Unfortunately, Kong does not index V1 vaults (yet) as they have long ago been deprecated. That doesn't mean that there aren't still funds deposited in them that users may want to get out. Like V2 and V3, there is a registry for all v1 vaults:

| Registry / ENS | Contract Address |
| ----------------------   | ---------------------- |
| V1 vault registry <br/> registry.ychad.eth | https://etherscan.io/address/0x3eE41C098f9666ed2eA246f4D2558010e59d63A0 |

V1 was permissioned so all vaults are "endorsed". To get the vaults:

1. Call `getVaultsLength()` to get the number of vaults in the registry. This will be used as the index for the next step.
2. loop through each entry in the index and call the `getVault()` function with the index value as the argument

```js title="Example pseudo-code"
const allV1VaultsFromRegistry = []
const numVaults = getVaultsLength()
for (i=0, i < numtokens-1, i++){
  const vaultAddress = getVault(i)
  allV1VaultsFromRegistry.push(vaultAddress)
}
```

Additional vault data can then be found by calling the respective read functions on the vault contracts (`name()`, `symbol()`, `decimals()`, `getPricePerFullShare()`, etc).

## Vault Prices

Now that you have the vaults, you are going to need to price them. Yearn vaults use the standard ERC4626 vault share pattern where depositors receive a number of vault shares when they deposit that represent their share of the pool total. As yield is harvested and returned to the vault, the vault share values increase and the underlying value of tokens the user can withdraw also increases.

To get the value of a deposit into a vault, you need to multiply the number of vault shares held by the user (or contract) by the price per share. All Yearn vault contracts have a `pricePerShare()` read function that is denominated in the underlying asset and can be called to get the price per share.

1. Query `balanceOf()` with the user address.
2. Query `pricePerShare()` or get the value from your Kong query.
3. Query `decimals()` or get the value from your Kong query.
4. multiply the value returned from `balanceOf()` by the value returned from `pricePerShare()` and divide by 10 to the power of the value returned from `decimals()`.

```js
const shareBalance = balanceOf(userAddress)
const pricePerShare = pricePerShare()
const decimals = decimals()

const valueInUnderlying = (shareBalance * pricePerShare) / (10 ** decimals)
```

Boom, now you have vault prices and the value of your user's positions.

## Calculating APYs

Once again, the easiest way to get APY data is using Kong. The vault query in the [vaults section](#getting-v2-and-v3-vaults-with-kong) includes the APY from the last week. The other options are:

- `grossAPR`: current rate from the oracle?
- `net`: current rate from the on-chain interest rate oracle, converted to APY using an assumption on compounding from recent harvest frequency.
- `weeklyNet`: Same as net, but with average over the last 7 days.
- `monthlyNet`: Same as weeklyNet, but with average over the last 30 days.
- `inceptionNet`: Same as monthlyNet, but averaged over the entire dataset.

Kong can also serve historical APYs. To get those you will need to use a timeseries. Here is an [example](https://kong.yearn.farm/api/gql?explorerURLState=N4IgJg9gxgrgtgUwHYBcQC4QAIsEcYIBOAnlgIIAOxAigSQBQA6SOOAJADYCGARgh%2BiwBlFIQCWSAOYBCZqyxsuYMIQQBnNYJHipc1pzFwxKQQElUe9lAhwKEJMhPDREyXoCUWYJawpD6ojF1JhZ5LG4%2BAQUI-h8cJRV1TQUE1Q048MNjQQMjFAzrW3tHHMK7BwtQnE9vKtYoAAsuCVMwDNSkjJiOAptyxwyKQIg2upw-RAyANy4OAh8AXz0FkAAaEBnxXg51DBBvQj1GEA70jCxjgAYAD0uAdgAWAEYAZgeyACY7gA4HgDF-gA2QE8QFQBAAEUBADNAd9fgBOF7fD4IhGXP7Ql4fJ4AVmOq0Yh1Cx26x0Exy4VAAtDwAO5galgfgoLjUigUNQEolHEBlYoWc7HOkIBAAaw4xAAcgh8mseSSQBwsnLBE9LhqFSsFkA):

```markdown
  query ApyQuery(
    $label: String!
    $address: String
    $limit: Int
    $component: String
  ) {
    timeseries(
      label: $label
      address: $address
      limit: $limit
      component: $component
    ) {
      chainId
      address
      label
      component
      period
      time
      value
    }
  }
  ```

The above query will need to be made with variables passed into it

- address: the vault address as a string
- label: 'apy-bwd-delta-pps' is the label for APY queries.
- component?: this is APY time period mentioned above like 'weeklyNet'
- limit?: number of results to return (1000 is a good number)

The above query will give daily values for the `weeklyAPY` value for a chosen vault.

## Calculating APRs from on-chain APR Oracles

V3 vaults have an APR oracle that can be queried to get current APR values calculated from the yield unlocking on the contracts. As of writing, this contract is [0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92](https://etherscan.io/address/0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92). This can be manually checked by calling the `getAprOracle()` view function on the Protocol Address Provider: <ContractAddress contractName = {['topLevel', 'protocolAddressProvider']} />.

You can read more about the APR Oracle contracts [here](/developers/smart-contracts/V3/Periphery/AprOracle).

## Conclusion

You should now have a solid foundation for incorporating Yearn vaults into your wallet or portfolio tracker. Yearn is constantly building, so if you encounter any issues with the above, or are looking for additional support, come pop in to the `dev-open-chat` channel our [discord](https://discord.gg/yearn).
