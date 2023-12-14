# Hacking on Yearn

This page is for the hackers and buidlers who are currently building, or planning to build, something cool with Yearn Finance. This guide details all the info you need to start hacking!

## Core Tools

- [Solidity](https://docs.soliditylang.org/en/v0.8.6/index.html)
- [Brownie](https://eth-brownie.readthedocs.io/en/stable/)
- [ethers.js](https://docs.ethers.io/v5/)
- [Web3.js](https://web3js.readthedocs.io/en/v1.4.0/)
- [Ganache](https://trufflesuite.com/ganache/)
- [Foundry](https://github.com/nicolasgarcia214/damn-vulnerable-defi-foundry)

## Yearn Vaults & Smart Contract Integrations

Yearn’s core product is the Vault (also known as yVault) — a set-it-and-forget-it yield aggregator running on top of DeFi’s yield-generating protocols like Compound, Aave, Curve, and Convex.

### Getting Started

#### Starter Kit

Here's an example of integrating V2 vaults and ERC-4626.

https://github.com/storming0x/ystarter-foundry-kit

What you'll find:

- Basic example Solidity Smart Contracts for integrating with Yearn Vaults for both V2 and ERC4626 interfaces.
- ERC4626 adapter to wrap yearn vaults.
- Example Contracts
- Sample test suite.

#### Yearn Vaults

[This repository](https://github.com/yearn/yearn-vaults#readme) includes the set of smart contracts that are used for the Yearn Vaults. It contains the requirements, code, deployment scripts, and tests necessary for the core protocol, including an inheritable template strategy for use with Solidity-based strategies that interact with Yearn Vaults. These contracts are used to create a simple way to generate high risk-adjusted returns for depositors of various assets via best-in-class lending protocols, liquidity pools, and community-made yield farming strategies on Ethereum.

## Testing

### Introduction

You can test Yearn vaults without spending cryptoassets on the available testnet for each network.

To get started, head to the yearn testnet client which is available at: https://hack.yearn.fi/

Make sure to switch your wallet provider to the appropriate testnet network in order to use the protocol testnet without incurring costs on the mainnet network.

Testnet networks are different environments from mainnet and simulate real use cases for development, testing or production. The assets on a testnet are not “real,” meaning that they cannot be withdrawn to your wallet for any real economic value.

Testing is possible through Ethereum Rinkeby  

#### Steps

- Deploy your vault with your own token
- Mint your own tokens
- Hack!

### What do I need for testing?

When accessing each testnet, you will need to use its own native asset token.

#### Steps to test

- Go to https://hack.yearn.fi/
- Switch to the testnet you wish to utilize over your wallet provider
- Make sure to have the native asset for the specific network
- Get some tokens from the test client faucet (Ethereum Rinkeby https://faucet.rinkeby.io/)

Make sure to select the correct market in the top right corner. You can find this on the left side of the address. Select the token you need and submit the faucet transaction but be mindful to make sure that you have certain amount of the native asset of the testnet you wish to transact on.

#### How do I select a supported testnet?

First, be sure to check if your wallet provider allows you to switch to testnet.  Some providers, such as the Metamask extension, display the network selection on top of the menu over the extension and, in the case of mobile Metamask, above the wallet section. It’s important to always do your research for compatible wallets with compatible networks.

#### Additional Resources

- Workshop: Building and Integrating with Yearn Vaults: <https://www.youtube.com/watch?v=urC35PMbpJ4>
--> Learn how to leverage the power of Yearn by creating a money-making integration on top of v2 vaults by taking advantage of the brand new EIP-4626: Tokenized Vault Standard! This workshop will guide you through creating a B2B/business router for yearn v2 vaults, which complies with the new EIP-4626. You'll be able to choose from multiple fee strategies for your users to maximize your profit.

- Smart Contract parameters: <https://docs.yearn.fi/vaults/smart-contracts/vault>
- <https://hackmd.io/t8HlcedLQeCu2l7RG-5Vbw?view>
- <https://twitter.com/storming0x/status/1436851219864059906?s=20>

## Front-end Integrations

Yearn uses a JavaScript SDK for formatting protocol data and generating transactions for reading/writing protocol data. Yearn SDK integrates several components, both on-chain and off-chain.

[The repository here](https://github.com/turtlemoji/yearn-sdk-examples) contains a live preview and example usage of the Yearn SDK. Explore this codebase to learn how to start interacting with the Yearn protocol in your own app.

[Kong](https://kong-one.vercel.app/) [[github](https://github.com/murderteeth/kong)] is a backend data API designed for yearn-related front-ends, now indexing data across all chains where yearn is deployed.

## Strategy Development

A Yearn Strategy is a set of smart contracts that implement different farming strategies that utilize the deposited assets to generate the best yields for users.

The implementation of the strategies moves assets from one farming application to another one with higher interest. This will mostly be done automatically, which automatically monitors and tracks the best farming applications with high yield and low risks.

Rewards/profits generated by strategies are regularly updated, harvested, swapped for the original vault asset, and deposited again for compound farming. Each vault has a unique strategy and the strategy will be improved constantly based on the observations of our AI-based monitoring engines.

By having a strategy, users only need to deposit single assets and let the strategies generate profits from the funds. Yearn automates the whole compounding process, making it as close to optimal as possible.

- <https://github.com/yearn/brownie-strategy-mix>

- Forking a Strategy Locally: <https://github.com/yearn/yearn-vaults/blob/main/CONTRIBUTING.md>

## Data Analysis

Yearn aims to provide more insights into our products to our customers and partners through analyzing the on-chain and off-chain data. Given that all Yearn protocol data is publicly stored on-chain, there are lots of insights to be gained from analyzing these transactions.

Two common tools for on-chain data analysis are:

1. **Dune Analytics**- Query contract data and generate dashboards with SQL

- [Current Dashboards](https://dune.com/projects/yearn )
    Here's a list of all the new things you can query for:
  - harvests
  - deployments
  - transactions
  - contract_tokens
  - contract_strategy
  - v2_deployments

  Fiddle with them all at <https://dune.com/queries/625814>

2. **The Graph**- Query contract data with GQL using the Yearn subgraphs

  The Graph is a decentralized protocol for indexing and querying data from blockchains, starting with Ethereum. It is an easier way to retrieve specific data from the blockchain, within the ethos of web3, with the advantages of decentralization and reliability.

  GraphQL is the underlying query language used in The Graph.

  What is the difference between standard RESTFUL API calls and GraphQL calls? The difference is that traditional APIs require the developers to create specific endpoints for users that return specific data. If the user requires more information, they may need to make multiple API calls, sometimes hundreds of API calls, to get the information they require. With The Graph (which uses GraphQL), only one call is needed to a subgraph, as long as the developer has created a flexible schema.

- <https://thegraph.com/hosted-service/subgraph/rareweasel/yearn-vaults-v2-mainnet>
- <https://api.thegraph.com/subgraphs/name/rareweasel/yearn-vaults-v2-mainnet/graphql>

### Some of the research questions that we are interested in

- Screening profitable liquidity pools for our strategies

- Assessing the impact of TVL on the impermanent loss
- Screening the volume of various pools
- Providing risk metrics to our vaults
- Price volatility of the underlying token
- Addressing the protocol risks
- Optimizing our strategies according to the change in gas fees
- Decide on when to deleverage and trade the governance tokens
- Decide on when to harvest
- Predicting impermanent loss for Uniswap V3 pools
- Portfolio construction across yearn products
More details on these topics can be seen in our issues tab.

#### Data Sources

[**Yearn SDK**](https://github.com/yearn/yearn-sdk) [[Docs](https://yearn.github.io/yearn-sdk/)]
<https://docs.yearn.fi/vaults/yearn-sdk/yearn-stack>
If you are not sure about which service you should first look into, Yearn SDK can provide you with addresses of contracts and endpoints of yearn’s services.

[**Yearn API**](https://github.com/yearn/yearn-caching-api) [[Docs](https://docs.yearn.fi/vaults/yearn-api)]
Yearn API can provide non-user specific metadata, including the tvl of vaults, apys, fees, and strategy metadata through REST API, without the need to make web3 calls.

[**Yearn Vision**](https://yearn.vision)
Yearn Vision is the Grafana dashboard of the hosted version of [Yearn Exporter](https://github.com/yearn/yearn-exporter). You can download the historical metrics related to our vaults and strategies as json or csv files through the dashboard. For instructions on downloading, please see [Downloading query results as csv](https://grafana.com/docs/grafana/latest/explore/explore-inspector/#download-raw-query-results-as-csv).

## Inspiration

Common use-cases for vaults include:

- Using Vaults as collateral for lending/borrowing
- Using Vaults to generate yield with user funds

*In both cases, the protocol integrating with yearn is rewarded with performance fees taken from the vault’s overall profits, the more total volume that a partner contributes to a vault, the bigger share of the profit they receive.*

Hundreds of protocols have built exciting functionalities using Yearn’s integration methods. These include:

- Alchemix provides self-repaying loans using vault yields
- Abracadabra provided the first yVault leveraging system that allows users to take loans and keep the yield rolling
- QiDao provides 0% interest loans if you use yVaults as collateral

Here are some ideas on what you can build:

1. Use the Vaults as collateral to borrow money and probably get some leverage. (e.g. Abracadabra)
2. Build a product that allows you to use yield to do cool stuff:
donate yield to an NGO
invest the yield in more risky stuff or directional bets
paying bills and subscriptions
3. Create a metavault on top of multiple vaults. One idea that comes to my mind is having a USD metavault that deposits into multiple dollar-pegged vaults based on some strategy and abstracts the complexity from the user.
4. Build a UI that accepts deposits and allows you to move assets across chains.
5. Use the vaults as a place to earn interest on funds that are not currently actively being used by the user.

## Examples

[**Skew You**](https://github.com/Tburm/tracer-vault): Users can borrow against their options collateral, unlocking a whole new world of capital efficiency.

[**Possum**](https://github.com/Possum-ONE): Fixed-income product that can turn every farm into two fix/variable pools. Based on the game model, fixed pool users can have guaranteed APY while the variable user gets higher APY with higher risk.

[**Bowtie**](https://github.com/ShayanJa/bowtie_finance): Allows users to borrow against their options collateral.

Additionally, doing a GitHub search for Yearn functionality you are interested in implementing is a good way to find working code examples.

## Expectations

Here are some guidelines on how to maximize your chances of 'winning':

- Have your code well documented on Github.
- Have a front end!
- If you created a contract, deploy them to a testnet and ensure your front end properly interacts with them.
- Implement something interesting with your Yearn integration. Simply calling deposit() will not help your submission stand out!

## Resources

Yearn GitHub Organization: <https://github.com/yearn/>

Yearn V2 Documentation: <https://github.com/yearn/yearn-vaults>
