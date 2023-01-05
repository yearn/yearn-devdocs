# Vault Factory

Yearn's brand new "Vault Factory" allows anyone to permissionlessly deploy an official Yearn Vault with ready-made yield strategies.

The easiest way to get started using the factory is through the User Interface:
- TODO_ADD_PRODUCTION_LINK ([example usage](#usage-with-ui))

The current version of the Vault Factory works with the following:

- [Curve LP Tokens](#Curve-LP-Tokens)
- Balancer LP Tokens (soon)

The Vault Factory is a massive step forward in automation which has enabled us to significantly reduce our cost of operations. As such, all vaults deployed using this new method will utilize the following fee structure:

- 0% management fee (previously 2%)
- 10% performance fee (previously 20%)

Performance fees for every type of yVault go straight to Yearn treasury ([ychad.eth](https://etherscan.io/address/0xfeb4acf3df3cdea7399794d0869ef76a6efaff52)) and are calculated only on top of harvest profits. The current fee structure for each yVault can be seen directly on the new [yearn.finance](https://yearn.finance/vaults) website by clicking on the vault.

![](https://i.imgur.com/0QIydKb.png)

Only one vault can be live for each token, so the Vault Factory will only deploy a new yVault if there is no vault for that token already deployed (excluding "legacy" vaults).

## Curve LP Tokens

The first Vault Factory deployed live on Ethereum is the Curve LP Token Vault Factory. This factory allows users to deploy yVaults for any Curve LP token that represents a Curve pool with an active gauge (allowing it to receive CRV emissions).

### Strategies

Factory-deployed yVaults for Curve LP tokens contain up to three ready-made yield strategies:

1. StrategyCurveBoostedFactory
2. StrategyConvexFactory
3. StrategyConvexFraxFactory

**StrategyCurveBoostedFactory** uses Yearn's veCRV balance (currently 45.1m) to give users the maximum 2.5x boost on their CRV rewards.

**StrategyConvexFactory** supplies any additional Curve LP tokens (beyond which would receive the maximum 2.5x boost via the Curve strategy) to Convex Finance to earn CRV rewards (boosted by Convex's veCRV balance) and CVX rewards.

**StrategyConvexFraxFactory** will only be added to the vault if the Curve LP token of the vault can be staked in Convex for Frax (currently available for over 20 Curve LPs). This ConvexFrax strategy will be used instead of the standard Convex strategy to earn additional FXS rewards (on top of the standard CRV and CVX rewards).

![](https://i.imgur.com/oJdwz6n.png)

In all three strategies, any earned tokens are regularly claimed, sold for more of the underlying Curve LP token, and then deposited back into the strategy to compound the yield.

### Contracts

- Ethereum Deploy Address: [0x21b1FC8A52f179757bf555346130bF27c0C2A17A](https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#writeContract)

The CurveGlobal contract provides a few main functions:

- `allDeployedVaults()`: returns an array of all the deployed vaults.
- `numVaults()`: returns the number of vaults deployed.
- `canCreateVaultPermissionlessly()`: takes in an address for a gauge and returns a boolean that indicates whether a vault can be created permissionlessly.
- `createNewVaultsAndStrategies()`: takes in an address for a gauge and a boolean that determines whether duplicate vaults are allowed, and creates a new vault and strategy.
- `latestDefaultOrAutomatedVaultFromGauge()`: takes in an address for a gauge and returns the latest default or automated vault from that gauge.

## Usage with UI

- TODO_ADD_PRODUCTION_LINK

1. Make sure your wallet is connected
![](https://i.imgur.com/SKF9VsE.png)

2. Chose a token to create a vault for
![](https://i.imgur.com/4xc5Biw.png)

3. Review details and click "Create Vault"
![](https://i.imgur.com/l7Z7oYm.png)

4. Sign the transaction and the vault will be created
![](https://i.imgur.com/v2DYa4T.png)

## Usage without UI

1. Open the contract at etherscan: [0x21b1FC8A52f179757bf555346130bF27c0C2A17A](https://etherscan.io/address/0x21b1FC8A52f179757bf555346130bF27c0C2A17A#writeContract)

2. Call `canCreateVaultPermissionlessly()` function to make sure that a vault does not already exist for the gauge you want to create

![](https://i.imgur.com/RBS2DIq.png)

3. Call `createNewVaultsAndStrategies()` to create a new permissionless vault.

![](https://i.imgur.com/2bMxjU0.png)

4. Now your new Yearn Vault will be deployed and you can sit back while it auto-compounds your rewards into more of your Curve lp position.
