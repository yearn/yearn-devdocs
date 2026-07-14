---
title: "YIP-64: Adjust fees on non-stablecoin yVaults"
hide_title: true
sidebar_position: -64
---

# YIP-64: Adjust fees on non-stablecoin yVaults

| Metadata | Details |
| --- | --- |
| YIP | 64 |
| Outcome | **Rejected** |
| Authors | wavey, philbert, saltyfacu |
| Created | 2021-10-21 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-64-adjust-fees-on-non-stablecoin-yvaults/11716) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:ybaby.eth/proposal/0xfe7296601d199b89a8aa53f95d6243ef935d736bea2f13109979d8d5098017d2) |
| Vote result | For: 167.03; Against: 308 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-64.md) |

## Summary

Experiment with introducing a new fee structure for non-stablecoin* yVaults: 
- 25% performance (25% increase)
- 1% management (50% decrease)

Some of the expected implications are: 
- Improved profitability for yVaults with lower yields
- Reduced treasury income
- Unchanged incentive alignment for strategists 

**Stablecoin = fiat-pegged tokens*

## Motivation

In DeFi, stablecoins are often able to generate higher yields than crypto native assets. Since the heights of "DeFi Summer" yield has slowed down on the Ethereum mainnet, and it has become common for non-stablecoin crypto assets to return in the lower single-digit APRs.

#### Opportunity Cost of High Fees
The current 2% management fee is a flat rate taken from invested assets over the course of a year. Therefore, if a strategy is earning 2.5% APR or less (after combined mgmt + performance fees), users stand to realize no profit on harvest. Yearn tries to avoid deploying funds in these situations which are unprofitable to users. The downsides to this are:
- all farms which earn between 0% - 2.5% APR become non-viable strategies
- in these situations, treasury earns no fee income
- creates additional management burden on Yearn operations to actively monitor strategy APR and react when it dips too low.

Finding 2.5%+ APR farms for crypto assets like ETH and BTC is difficult, especially for the scale Yearn operates at. Lowering the management fees on these tokens will help improve APR while also creating access to new farms.

#### Maintain Protocol Revenue by Shifting to Performance fee
For lower performing vaults, performance fees are a more attractive option because . to anything below 100% will not result in users earning 0% (or less) on a harvest as fees are charged from profits rather than the initial deposit. This is a straight forward way to balance the reduction of the management fee.

#### More to come...
This proposal is viewed as a temporary measure to take action and collect data while further ideas for fee revisions are discussed by the community.

### **Data for claims**
The image below shows sample data for 2/20 versus the proposed 1/25 fee structure across a range of yield scenarios.

![](upload://b5JdzAbncnrNMq6VYvt2nl38mg4.png)
Source: [Fee Adjustment Calculator](https://docs.google.com/spreadsheets/d/1U66cFgymIW4Qdmo3lgCx5-lrMunBbLI_6cbxplWAE1U/edit?usp=sharing)

**Increasing profitability for yVaults with lower yield:**

The proposed fee structure change provides a very tangible benefit for low earning vaults, with diminishing results as APY increases. This is why it makes sense for the adjustment to be isolated to crypto native asset yVaults rather than all yVaults in general. When a vault is earning above 30% APY, this fee change actually reduces profit for users. 

**Reduce treasury income:** 

Adversely, the proposed fee change would have a greater impact on the treasury when applied to lower earning vaults. Still, percentage wise, the benefit to token holders greatly outweighs the loss of the treasury. 

Additionally, since the lower earning vaults aren’t bringing in as many fees as an equivalent TVL higher earning vault, the relative loss of treasury revenue will be negligable when compared to the benefits. 


## Specification

Adjustments to vault management and performance fees require transactions from the governance multisig (`ychad.eth`). If passed, the following should take effect.

**Non-stablecoin yVaults**

- 1% annualized management
    - Full amount allocated to Treasury
    - Applied only to invested funds
    - Collected on each harvest
- 25% performance fee
    - 15% allocated to Treasury
    - 10% allocated to the Strategist

**Stablecoin yVaults:** (unchanged)
