# Overview

:::info

The new Ylockers ecosystem is rolling out on May 9th, 2024 with the launch of the *YearnBoostedStaker* (YBS) contract and a new V3 Auto-Compounder vault. These new contracts will be available for yPRISMA initially and then be rolled out for yCRV a month later on June 6th. Before June 6th, yCRV will continue to operate with the existing st-yCRV and lp-yCRV V2 vaults.

:::

yLockers are a category of assets built by Yearn designed to tokenize locked governance positions in external DeFi protocols. This asset type is often called a "Liquid Locker".

To achieve this, Yearn has deployed a system of smart contracts that allows users to permissionlessly max-lock their governance tokens to a central Yearn in exchange for a yLocker token (e.g., yCRV, yPRISMA, etc.) at a rate of 1:1.

The benefit of doing this is to provide the end user with a fully transferrable and liquid token that can still receive a share of governance benefits like yield or voting power depending on the protocol. No longer is there a need to lock up your asset value for up to 4 full years!

> **⚠️ Important**: Liquid locker tokens are not redeemable for the underlying locked tokens. This is not possible. But because they are liquid, they can be traded on decentralized exchanges, and bought and sold at market value.

## yLocker Products

* [yPrisma](../ylockers/yprisma/overview)
* [yCRV](../ylockers/ycrv/overview)

## Earning Yield with yLockers

Within the yLockers ecosystem, there are two distinct ways to earn yield:

1. Deposit your yLocker tokens into YBS (earn stablecoins)
2. Deposit your yLocker tokens into the V3 Auto-Compounder (earn yLocker tokens)

___

### Option 1: Deposit yLocker Tokens into YBS

Each week, Yearn's yLockers earn revenue from protocol fees and bribes. This revenue is converted into ecosystem stablecoins (mkUSD for yPrisma or crvUSD for yCRV) and distributed to yLocker stakers at the start of the week via the `YearnBoostedStaker`(YBS), a new contract which was launched in Spring 2024 following the passing of [YIP-77](https://snapshot.org/#/veyfi.eth/proposal/0xe79fb2ef4f21ef1e9cc30dd1522c9751c74b631c4782bccbbeb25185d4ddae1d).

To begin earning your share, all you need to do is stake your respective yLocker tokens in the staking contract. Take a look at the interface guides for your desired yLocker to get started. Want to learn how it all works under the hood? Read on Anon!

### Weights and Boosts

The longer you stake, the greater your boost! Yearn's yLocker staking contract incentivizes long-term users by boosting their yield (up to a maximum of 2.5x).

You'll reach max boost and achieve the maximum staking APR less than four weeks after depositing your yLocker tokens.

To calculate your boost, the staking contract maintains a weight for every deposit (which is a function of the amount of yLocker tokens you have staked and the duration since it was staked).

Your stake weight starts at 50 points with your initial deposit, and increases by 50 points each week (at 00:00:00 UTC, Thursday) until the maximum weight is reached after 4 weeks.

**Let’s demonstrate with an example of how the weights work**

In this example…

* YearnBoostedStaker is deployed with maxGrowthWeeks = 4
* You stake 100 yLocker tokens

On deposit, your initial weight will be 50. At 00:00:00 UTC the following Thursday, your weight will increase to 100, then 150, then 200, and finally 250 (on the fourth Thursday following your deposit).

| week             | balance | weight | boost |
| ---------------- | ------- | ------ | ----- |
| 0 (deposit week) | 100     | 50     | 0.5x  |
| 1                | 100        | 100       | 1.0x      |
| 2                | 100        | 150       | 1.5x      |
| 3                | 100        | 200       | 2.0x      |
| 4 (final growth week)               | 100        | 250       | 2.5x      |
| 5 ...n                 | 100        | 250       | 2.5x      |

To keep it simple, the example above does not address what happens if you make a withdrawal or a second deposit. If, for example, you deposit 100 Ylocker tokens every week for four weeks, you will then have four independent weight groups travelling through the system.

A withdraw will always retrieve yLocker tokens from your most recent (least weighted) deposit, leaving the higher weighted yLocker tokens to continue along.

Your total weight is equal to the sum of each of your deposit’s weight. And the total system weight is the sum of all user weight.

### Rewards and Claiming

Each week, Yearn claims its share of protocol fees and vote-maximized bribes. These are swapped for ecosystem stablecoins, wrapped as a yield-bearing Yearn V3 vault token, and deposited directly into the reward distributor contract.

yLocker stakers are entitled to the following rewards:

* 100% of their share of protocol fees
* 90% of their share of gauge votes will be used to earn vote-maximized bribes
  * *(the other 10% votes to support yLocker token liquidity)*

Your rewards accrue week over week and are never lost if unclaimed. In fact, they begin earning you additional stablecoin yield from the moment we receive them! When claimed, Yearn V3 vault tokens will be received directly to your wallet.

To reward early adopters, yLocker stakers may receive additional rewards during the launch phase.

> ⚠️ **Important:** Yearn vaults can use multiple strategies to generate yield and may be exposed to more than one DeFi protocol. For more information on the various layers of smart contract risk involved, please refer to our [risk documentation](https://docs.yearn.fi/resources/risks/protocol-risks).

### Fees

Every yLocker charges a 10% performance fee on the total revenue it receives each week.

### Unstaking

You're free to unstake your yLocker tokens at any time with no lock-ups or penalties.

You can also make partial withdrawals. If you have multiple amounts actively growing in different weeks, the withdrawal is made from the least-weighted amounts first.

___

### Option 2: Deposit your yLocker tokens into the V3 Auto-Compounder

Too busy to deal with staking, weights, and manual claims? Just want more yLocker tokens and the highest APYs? Then the simple yLocker auto-compounding vaults are for you!

These are Yearn V3 vaults (more info [here](https://docs.yearn.fi/getting-started/products/yvaults/v3)) that have the capability to use multiple strategies to increase the yield on your yLocker tokens. However, in practice, it only requires one simple strategy to farm the `YearnBoostedStaker` staking contract.

Once a week, the vault claims its boosted share of stablecoins from the yLocker staker contract, swaps it for more yLocker tokens, and deposits it back into the staker. On top of that, the Auto-Compounder vault is whitelisted, allowing it to earn max boost immediately on all reinvested yLocker tokens.

The vault charges a 10% performance fee.

## Deployment Addresses

* YearnBoostedStaker: TBC
