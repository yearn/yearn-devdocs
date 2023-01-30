# Vault Factory

Yearn's brand new "Vault Factory" allows anyone to permissionlessly deploy an official Yearn Vault with ready-made yield strategies.

The easiest way to get started using the factory is through the User Interface:
- https://yearn.finance/vaults/factory - [Tutorial](#create-with-ui)

The current version of the Vault Factory works with the following:

- [Curve LP Tokens](#Curve-LP-Tokens)
- Balancer LP Tokens (soon)

The Vault Factory is a massive step forward in automation. We're significantly reducing our operational costs for all vaults deployed with this new method. Here's the fee structure for them:

- 0% management fee (previously 2%)
- 10% performance fee (previously 20%)

Performance fees for every type of yVault go straight to Yearn treasury ([ychad.eth](https://etherscan.io/address/0xfeb4acf3df3cdea7399794d0869ef76a6efaff52)) and are calculated only on top of harvest profits. The current fee structure for each yVault can be seen directly on the new [yearn.finance](https://yearn.finance/vaults) website by clicking on the vault.

<img src="https://i.imgur.com/0QIydKb.png" width="500" />

Only one vault can be live for each token, so the Vault Factory will only deploy a new yVault if there is no vault for that token already deployed (excluding "legacy" vaults).

## Curve LP Tokens

The first Vault Factory deployed live on Ethereum is the Curve LP Token Vault Factory. This factory allows users to deploy yVaults for any Curve LP token that represents a Curve pool with an active gauge (allowing it to receive CRV emissions).

## Strategies

Factory-deployed yVaults for Curve LP tokens contain up to three ready-made yield strategies:

1. StrategyCurveBoostedFactory
2. StrategyConvexFactory
3. StrategyConvexFraxFactory

**StrategyCurveBoostedFactory** uses Yearn's veCRV balance (currently 45.1m) to give users the maximum 2.5x boost on their CRV rewards.

**StrategyConvexFactory** supplies any additional Curve LP tokens (beyond which would receive the maximum 2.5x boost via the Curve strategy) to Convex Finance to earn CRV rewards (boosted by Convex's veCRV balance) and CVX rewards.

**StrategyConvexFraxFactory** will only be added to the vault if the Curve LP token of the vault can be staked in Convex for Frax (currently available for over 20 Curve LPs). This ConvexFrax strategy will be used instead of the standard Convex strategy to earn additional FXS rewards (on top of the standard CRV and CVX rewards).

<img src="https://i.imgur.com/oJdwz6n.png" />

In all three strategies, any earned tokens are regularly claimed, sold for more of the underlying Curve LP token, and then deposited back into the strategy to compound the yield. 

## Harvests

With the introduction of factory vaults, there was one subtle but important modification made in the way harvests work which allows them to be performed permissionlessly (i.e. by anybody willing to pay transaction costs for it). In traditional strategies, token swap logic is hardcoded into the strategy itself which means that a harvest call atomically performs debt rebalances and swaps into realized profit in a single transaction. 

Now, with factory strategies, the swap logic is decoupled from the strategy and is performed in a separate transaction from the harvest. Swap transactions must remain permissioned in order to stay safe from MEV attacks. But as soon as swaps are complete, anybody can call harvest to recognize the profit that the swap created and airdropped into the strategy. Since harvest calls also invest tokens from the vault into the strategy, sometimes it may make sense to call harvest on a strategy even if there is no profit yet available from a prior swap. While harvests will be permissionless on this specific subset of vaults, Yearn will continue to use standard keeper automation to call harvests even if nobody else does.

Anyone can call harvest via the [harvestStrategy()](https://etherscan.io/address/0x256e6a486075fbadbb881516e9b6b507fd082b5d#writeContract) function (keeper.factory.ychad.eth). Simply put in the strategy address from the factory vault which you would like to call harvest on, and click write. 

### Determine Accumulated Rewards
This section will help you know how much rewards have accumulated, but calling harvest will **not** recognize profits unless they are sitting in the strategy's contract address. 

#### Curve Strategy
For curve strategies, you can view how much rewards have accumulated for that vault by using Curve.Fi's [dashboard](https://curve.fi/#/ethereum/dashboard) and putting in Yearn's Curve Voter Proxy address `0xF147b8125d2ef93FB6965Db97D6746952a133934` (curve-voter.ychad.eth). This will show you the dollar amount accumulated in the strategy for all factory vaults. 

#### Convex and Convex Frax Strategies
For Convex and Convex Frax you can view how much rewards have accumulated in USD by viewing claimableProfitInUsdc() on the strategy under the Read Contract tab.

## Contracts

- Ethereum Deploy Address: [0x21b1FC8A52f179757bf555346130bF27c0C2A17A](https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#writeContract)

The CurveGlobal contract provides a few main functions:

- `allDeployedVaults()`: returns an array of all the deployed vaults.
- `numVaults()`: returns the number of vaults deployed.
- `canCreateVaultPermissionlessly()`: takes in an address for a gauge and returns a boolean that indicates whether a vault can be created permissionlessly.
- `createNewVaultsAndStrategies()`: takes in an address for a gauge and a boolean that determines whether duplicate vaults are allowed, and creates a new vault and strategy.
- `latestDefaultOrAutomatedVaultFromGauge()`: takes in an address for a gauge and returns the latest default or automated vault from that gauge.

## Create with UI

- User Interface: https://yearn.finance/vaults/factory

Follow these steps to create a new vault with the UI:

1. Make sure your wallet is connected

<img src="https://i.imgur.com/EKqOla1.png" />

2. Chose a token to create a vault for

<img src="https://i.imgur.com/nIt8h8v.png" width="500" />

3. Review details and click "Create Vault"

<img src="https://i.imgur.com/l7Z7oYm.png" />

4. Sign the transaction and the vault will be created

<img src="https://i.imgur.com/uRhX2VB.png" width="280" />

## Create from Contract

1. Open the contract at etherscan: [0x21b1FC8A52f179757bf555346130bF27c0C2A17A](https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#writeContract)

2. Call `canCreateVaultPermissionlessly()` function to make sure that a vault does not already exist for the gauge you want to create

<img src="https://i.imgur.com/RBS2DIq.png" width="500" />

3. Call `createNewVaultsAndStrategies()` to create a new permissionless vault.

<img src="https://i.imgur.com/2bMxjU0.png" width="500" />

4. Now your new Yearn Vault will be deployed and you can sit back while it auto-compounds your rewards into more of your Curve lp position.
