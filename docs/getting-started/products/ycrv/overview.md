# Overview
yCRV is Yearn’s new liquid veCRV wrapper, redesigned from the ground up to give users ‘the best CRV yields in DeFi’.

By increasing simplicity and improving functionality, the new system offers significant enhancements over its predecessor tokens (yveCRV and yvBOOST).

The system is organized into a set of 4 tokens, each representing a different position a user within the ecosystem can elect to hold:


<p align="center">
  <img width="640" height="400" src="https://i.imgur.com/wz9BVxF.png"/>
</p>

## yCRV
yCRV is the ‘base token’ which, while having no native rewards, lets users easily enter into the other ecosystem tokens that do. Yearn’s UI will let users efficiently zap from any ecosystem token to any other. 

New yCRV can be minted in two ways:
1. Lock CRV (permanent 1-way lock)
2. Migrate from legacy tokens yveCRV or yvBOOST.

When holding yCRV, users can then choose to position into three different types of rewards:

- Staking Rewards (st-yCRV) - Receive admin fees and bribes from locked CRV.
- Liquidity Pool Rewards (lp-yCRV) - Deposit CRV/yCRV LP positions and receive autocompounded LP emissions.
- CRV Voting Power (vl-yCRV) - Vote on Curve gauge weights (not DAO proposals).

## Staked yCRV (st-yCRV)

Staked yCRV is designed to be the yield-optimized position for yCRV users. Source of yield comes from two primary places:

#### Admin Fees
Every week, veCRV holders earn weekly "admin fees" from Curve protocol. Staked yCRV is where 100% of admin fees earned by Yearn's veCRV position are sent and auto-compounded into more yCRV.

#### Bribes
Additionally, for all the yCRV within st-yCRV, 1 veCRV worth of vote power will be used to vote in favor of the Curve gauge which optimizes bribe revenue for st-yCRV users. Bribes (or misc. revenue) collected from these votes will be allocated as supplemental yield to st-yCRV users.

Under the hood, st-yCRV is yet another Yearn v2 vault, allowing users to sit back, relax and have their underlying token compounded by a strategy that sells 3CRV and some claimed bribes into yCRV.

## LP yCRV (lp-yCRV)

LP yCRV is fairly straightforward. This position is for users who provide liquidity to the new CRV/yCRV pool on Curve and deposit LPs into lp-yCRV.

Under the hood, it is yet another v2 Yearn vault with a strategy that deposits all CRV emissions generated back into the pool to grow the position.

Yearn will earmark 1 veCRV worth of voting power for every 1 yCRV in this position to vote in favor of yCRV Curve gauge - increasing CRV emissions to users.

## Vote Locked yCRV (vl-yCRV)

vl-yCRV is the position that users can enter which allows them to cast votes for Curve gauge weights.

It is the final piece of the yCRV system and is currently in the final stages of development, not yet ready for production.

In this position, users can vote for gauge weights only (no DAO votes). 

Users in this position will not earn weekly admin fees or bribes, and will be subject to a minimum 14-day lock (28-day maximum). Once the lock period is over, user is free to withdraw to yCRV if they choose and move freely within/without the yCRV ecosystem.

Read [more](https://docs.yearn.finance/getting-started/products/ycrv/vl-ycrv) about vl-yCRV

## Addresses (Ethereum)

| Name | Address |
| ---------------------- | ------------------------------------------ |
| yCrv | [`0xFCc5c47bE19d06BF83eB04298b026F81069ff65b`](https://etherscan.io/address/0xFCc5c47bE19d06BF83eB04298b026F81069ff65b) |
| st-yCRV (vault) | [`0x27B5739e22ad9033bcBf192059122d163b60349D`](https://etherscan.io/address/0x27B5739e22ad9033bcBf192059122d163b60349D) |
| lp-yCRV (vault) | [`0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e`](https://etherscan.io/address/0xc97232527B62eFb0D8ed38CF3EA103A6CcA4037e) |
| vl-yCRV | in audit |
| CRV/yCRV Curve Pool | [`0x453D92C7d4263201C69aACfaf589Ed14202d83a4`](https://etherscan.io/address/0x453D92C7d4263201C69aACfaf589Ed14202d83a4) |
| ZapYCRV.vy | [`0x01D7f32B6E463c96c00575fA97B8224326C6A6B9`](https://etherscan.io/address/0x01D7f32B6E463c96c00575fA97B8224326C6A6B9) |

# FAQ

Read yCRV FAQ [page](https://docs.yearn.finance/getting-started/products/ycrv/faq) for more information
