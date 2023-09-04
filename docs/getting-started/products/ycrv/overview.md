# Overview

![](https://i.imgur.com/ni42qE6.png)

## What is yCRV

yCRV is Yearn's new and improved veCRV wrapper system designed to tokenize the different benefits of Yearn's veCRV position. This system is composed of a [`base-token`](#base-token) called yCRV as well as 3 derivative tokens called [`activated tokens`](#activated-tokens).

### Base-token

yCRV is the base-token, which carries no native rewards, but lets users easily enter into the other 'activated' tokens that do.

New yCRV can be minted in two ways:

- Lock CRV to Yearn's veCRV position (permanent 1-way lock).

_or_

- Migrate from legacy tokens [yveCRV and yvBOOST](#how-yvecrv-and-veboost-functionality-was-migrated-to-ycrv).

Both operations mint yCRV to the user at a 1:1 rate. Users migrating from yvBOOST can use the zap at [y.finance](https://y.finance) to efficiently unwrap their tokens to yveCRV and migrates to yCRV in a single step. Of course, users can also choose to purchase yCRV from the new Curve factory pool [here](https://curve.fi/factory/192).

### 'Activated'-tokens

Yearn passes all benefits of its veCRV position on to yCRV users who hold one of its **activated-tokens:**

- [**st-yCRV (Staking Rewards):**](#staked-ycrv) [yVault](https://medium.com/iearn/yearn-finance-explained-what-are-vaults-and-strategies-96970560432) that receives admin fees and bribes from locked CRV.
- [**lp-yCRV (Liquidity Pool Rewards):**](#lpd-ycrvcrv) yVault for CRV/yCRV LP tokens, autocompounds emissions and fees.

> Note: a third activated token, vl-yCRV, was planned but not rolled out due to a lack of demand.

![image](https://github.com/yearn/yearn-devdocs/assets/7863230/b0988ee4-4160-4680-9cee-fe6a6ef5b138)

## Staked yCRV

![](https://i.imgur.com/IgpIhKN.png)

Staked yCRV is designed to be a 'set and forget' yield-optimized position for yCRV users. The source of yield comes from two primary places:

- **Admin Fees:** Every week, veCRV holders earn weekly "admin fees" from Curve protocol. Staked yCRV is where 100% of admin fees earned by Yearn's veCRV position are sent and auto-compounded into more yCRV.
- **Bribes:** For all the yCRV within st-yCRV, 1 veCRV worth of vote power will be used to vote in favor of the Curve gauge which optimizes bribe revenue for st-yCRV users. Bribes (or misc. revenue) collected from these votes will be allocated as supplemental yield to st-yCRV users.

Under the hood, st-yCRV is a Yearn v2 vault, allowing users to sit back, relax and have their underlying token compounded by a strategy that sells 3CRV and some claimed bribes into yCRV.

## LP'd yCRV/CRV

![](https://i.imgur.com/3JNhzWR.png)

Liquidity Pool'd yCRV provides liquidity to the new CRV/yCRV pool on Curve, and lp-yCRV holders receive this LP fees and emissions. When you zap to this token, under the hood, you are entering an LP position in the yCRV/CRV pool and depositing the LP tokens into the lp-yCRV yVault.

This is also a Yearn v2 vault with a strategy that deposits all CRV emissions generated back into the pool to grow the position. Like st-yCRV this is designed to be a set and forget token that auto harvests and auto compound rewards.

Yearn will mark 1 veCRV worth of voting power for every 1 yCRV in this position to vote in favor of yCRV Curve gauge - increasing CRV emissions to users.

## How yveCRV and yvBOOST functionality was migrated to yCRV

yveCRV and yvBOOST are being deprecated, and there is a migration path available to users. The functionality of both was integrated into [st-yCRV](#staked-ycrv) so if you are looking for the same benefits check the [guide](https://docs.yearn.fi/getting-started/products/ycrv/guide) on how to migrate from the legacy tokens using yearn's UI

![](https://i.imgur.com/Htl3AgP.png)

## Addresses

- **yCRV:** [0xFCc5c47bE19d06BF83eB04298b026F81069ff65b](https://etherscan.io/token/0xFCc5c47bE19d06BF83eB04298b026F81069ff65b)
- **st-yCRV (vault):** [0x27B5739e22ad9033bcBf192059122d163b60349D](https://etherscan.io/token/0x27B5739e22ad9033bcBf192059122d163b60349D)
- **lp-yCRV (vault):** [0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e](https://etherscan.io/token/0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e)
- **CRV/yCRV Curve Pool:** [0x453D92C7d4263201C69aACfaf589Ed14202d83a4](https://etherscan.io/token/0x453D92C7d4263201C69aACfaf589Ed14202d83a4)
- **ZapYCRV.vy :** [0x01D7f32B6E463c96c00575fA97B8224326C6A6B9](https://etherscan.io/token/0x01D7f32B6E463c96c00575fA97B8224326C6A6B9)
- **yCRV Interface:** http://y.finance/

## Read more

- [yCRV Interface Guide](https://docs.yearn.fi/getting-started/products/ycrv/guide)
- [yCRV FAQ](https://docs.yearn.fi/getting-started/products/ycrv/faq)
