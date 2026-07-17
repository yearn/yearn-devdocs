---
title: "YIP-39: Add Curve sBTC Pool LP-Tokens yVault"
hide_title: true
sidebar_position: -39
---

# YIP-39: Add Curve sBTC Pool LP-Tokens yVault

| Metadata | Details |
| --- | --- |
| YIP | 39 |
| Outcome | **Passed** |
| Authors | az |
| Created | 08/23/2020 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/proposal-add-curve-sbtc-pool-lp-tokens-yvault/3251) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-39.md) |

## Simple Summary



Capture up to \$214b in AUM from BTC holders who want to passively grow their BTC holdings by using some voting power to increase sBTC pool CRV returns and create a Vault for sBTC Curve Pool LP-token holders who deposit renBTC / wBTC / sBTC in Curve Pool 6. This can generate significant goodwill from Bitcoin holders who may not be aware of other use cases for their holdings currently.

It’s the Curve sBTC pool which accepts renBTC / wBTC / sBTC which are all equally acceptable and gives the most potential rewards.
We only need to accept the LP-token which is a single token type given to depositors of any type of wrapped BTC.

## Abstract



Create a Grow Vault for sBTC Curve Pool LP-token depositors which functions almost identically to the yCRV and yYFI vault. Harvest CRV, sell it for more LP-tokens or renBTC which is then re-deposited to create, distribute and compound LP-token growth.

## Motivation



First big mover advantage. There is room to generate significant goodwill from bitcoin holders (\$214b in potential AUM) by using our voting power to kick % rewards increase toward the sBTC pool, and to create the first fully passive mechanism for BTC holders to increase their Bitcoin holdings. Right now only the most confident BTC holders are depositing and recycling / farming CRV. This can become a black hole for BTC deposits into Curve via renBTC and LP tokens into yVault for passive returns and governance fees.

## Specification



[1]

- Add a table row under the Grow Vault product, for LP-token holders who deposited funds into the Curve sBTC Pool named appropriately (don’t know what the LP token is called atm)
- When user deposits Curve sBTC LP-token, system stakes the LP-token to Curve DAO and farms CRV
- Upon receipt and sale of CRV on market, system buys either more LP-token if liquidity/pools are available, or buys renBTC or sBTC
- xBTC is then deposited back to the Curve sBTC pool, LP-tokens generated, shown in table for depositors as gains, and meanwhile LP-tokens are cycled back into Curve DAO to compound CRV generation

[2]

- Use some voting power to increase CRV return generation for BTC depositors to 50-70% to make it highly compelling for BTC holders
- Ensure the new yVault is communicated to the appropriate audiences as a viable alternative to holding a non functional pet rock with no other purpose currently.

**For:** Add Vault for sBTC Curve Pool.

**Against:** No change.
