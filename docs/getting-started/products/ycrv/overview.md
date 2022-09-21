# Overview
yCRV is the new and improved liquid veCRV wrapper from Yearn. The yCRV system aims to advance both the simplicity and functionality of its predecessor tokens, yveCRV and yvBOOST. 

The system is organized into a set of 4 tokens, each representing a different position a user within the ecosystem can elect to hold:

<p align="center">
  <img width="410" height="400" src="https://i.imgur.com/dOyMPk3.png"/>
</p>

## yCRV
yCRV is the "base token" that has no native rewards, but serves as a starting point for users in the system from which they can enter token positions (vaults) which do. Yearn will supply a handy zap contract that allows users to efficiently move into their preferred position in a single transaction.

New yCRV can be minted in two ways:
1. Lock CRV (permanant 1-way lock)
2. Migration from yveCRV (or yvBOOST via our zap)

When holding yCRV users can then choose to position into three different types of rewards:

- Staking Rewards (st-yCRV) - Receives admin fees and bribes from CRV locked
- Liquidity Pool Rewards (lp-yCRV) - Deposit CRV/yCRV LP positions and receive autocompounded LP emissions
- CRV Voting Power (vl-yCRV) - Vote in Curve governance proposals

## Staked yCRV (st-yCRV)

Staked yCRV is designed to be the yield optimized position for yCRV users. Source of yield comes from two primary places:

#### Admin Fees
Every week, veCRV holders earn weekly "admin fees" from Curve protocol. Staked yCRV is where 100% of admin fees earned by Yearn's veCRV position are sent and auto-compounded into more yCRV. 

#### Bribes
Additionally, for all the yCRV within st-yCRV, 1 veCRV worth of vote power will be used to vote in favor of the Curve gauge which optimizes bribe revenue for st-yCRV users. Bribes (or misc. revenue) collected from these votes will be allocated as supplemental yield to st-yCRV users.

Under the hood, st-yCRV is yet another Yearn v2 vault, allowing users to sit back, relax and have their underlying token compounded by a strategy that sells 3CRV and some claimed bribes into yCRV.

## LP yCRV (lp-yCRV)

LP yCRV is fairly straightforward. This position is for users who provide liquidity to the new CRV/yCRV pool on Curve and deposit LPs into lp-yCRV.

Under the hood, it is yet another v2 Yearn vault with a strategy that deposits all CRV emissions generated back into the pool to grow the position.

Yearn will earmark 1 veCRV worth of voting power for every 1 yCRV in this position to vote in favor of yCRV Curve gauge - increasing CRV emissions to users.

# Vote Locked yCRV (vl-yCRV)

vl-yCRV is the position that users can enter which allows them to cast votes for Curve gauge weights.

It is the final piece of the yCRV system and is currently in the final stages of development, not yet ready for production.

In this position, users can vote for gauge weights only (no DAO votes). 

Users in this position will not earn weekly admin fees or bribes, and will be subject to a minimum 14-day lock (21-day maximum). Once the lock period is over, user is free to withdraw to yCRV if they choose and move freely within/without the yCRV ecosystem.

Read [more](https://docs.yearn.finance/getting-started/products/ycrv/vl-crv) about vl-yCRV