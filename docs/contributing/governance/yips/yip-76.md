---
title: "YIP-76: Launch yPools"
hide_title: true
sidebar_position: -76
---

# YIP-76: Launch yPools

| Metadata | Details |
| --- | --- |
| YIP | 76 |
| Outcome | **Passed** |
| Authors | 0xkorin, 0xPickles, 0xValJohn |
| Created | 2024-02-16 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-76-launch-ypools/13926) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xa07123d5f6d3eb236969c798c024098be32231d2c3a205bd197200c955baa10c) |
| Vote result | For: 320.65; Against: 0; Abstain: 5.27 |
| Source | [Source](https://gov.yearn.fi/t/yip-76-launch-ypools/13926) |

_Authors: 0xkorin, 0xPickles, 0xValJohn_

## Summary

We propose using the design of the yETH protocol to create new, self-governing pools for various assets, called yPools. These pools will be permissionless and self-managed.

### Status

**Discussion**  
This proposal is currently in the discussion phase. As per our voting rules outlined in YIP-55, it will be in discussion for at least 3 days with a non-binding forum poll to gauge sentiment before it can be assigned a YIP number and move to Snapshot for a binding vote by veYFI holders.

## Abstract

**If adopted**, this proposal will:

-   Define the general functionality and design of yPools.
-   Outline how to bootstrap and deploy these pools.
-   Set initial parameters and configurations.
-   Describe how the pools will function under normal conditions.

## Background

YIP-72[\[1\]](#references) launched yETH, a self-governing pool representing a mix of ETH Liquid Staking Tokens. As of now, yETH has been running smoothly for six months, holding around $18.8m[\[2\]](#references) in TVL and operating without issues.

yETH offers a managed risk exposure to LSTs, controlled entirely by its users. We recommend reading YIP-72 fully to understand this proposal better.

This proposal suggests extending the yETH model to other yield-generating assets, benefiting from diversified exposure.

The core principles of yETH, which will apply to yPools, include:

-   **Self-governing.** yPools token holders (via the staked st- version) control the protocol in its entirety.
-   **Immutable.** yPools are not upgradable. Improvements require deploying a new version.
-   **Trust-minimized.** No third-party should be able to access funds or alter the state of the protocol. Users remain in control of their own funds.
-   **Autonomous.** Critical operation of yPools should not rely on third-party individuals, groups, or entities.

### Out of scope

-   Yearn contributors and YFI/veYFI token holders will not be involved in:
    -   Choosing assets for yPools or setting their weights. yPool users will make these decisions.
    -   The performance of yields and products. This is up to yPool users.
-   There are no plans for a related token or airdrop. Any future token launch would need approval from each yPool’s group of users.

## Motivation

### Use Case Examples

-   **User:** By owning a yPool token, you can aim for higher, risk-adjusted returns compared to individual assets in the pool.
-   **Searcher:** If a yPool token’s price becomes imbalanced, you search for profit opportunities through arbitrage.
-   **DeFi Protocol:** Accepting yPool tokens as collateral offers a more reliable value guarantee than individual assets.
-   **yPool Asset Protocol:** Promoting your token’s inclusion in yPools can boost demand and visibility for your project.

### yPool Asset Examples

-   Yearn re-staked Ether
-   Yearn Bitcoin
-   Yearn Dollar
-   Yearn Euro
-   Yearn Yen

### Future Possibilities

-   Utilizing yPool tokens as collateral in other smart contracts, including Yearn.
-   Creating Yearn vaults and strategies related to yPools.
-   Allow third parties to optimize asset weights and allocation permissionlessly.
-   Consolidating all pools under some unified protocol framework.

### Risks

Potential risks include:

-   An asset within a yPool severely depegs, fails, or faces an exploit.
-   A critical flaw in the design or implementation causes unexpected behavior.
-   Poor asset selection or protocol settings by yPool voters result in below-average performance.
-   Low yields leading to diminished interest in the pool.

## Specification

### 1\. tl;dr

1.  Follow yETH’s launch and operational blueprint closely.
2.  Adapt the audited yETH codebase with minimal changes.
3.  Deploy yPools with on-chain governance from the start.
4.  Run a bootstrap process for each new pool.
5.  Run yETH’s Protocol Owned Liquidity (POL) operations for each pool.

### 2\. General requirements

#### 2.1 Asset Guidelines

1.  To be considered for a yPool assets,
    1.  SHOULD:
        -   Generate real yield.
        -   Report yield on-chain regularly (the more frequent, the better).
        -   Ideally be redeemable for the underlying asset through the protocol directly, not just via AMMs.
        -   Be permissionless for holding and interaction.
        -   Be a non-Rebasing Token; Native rebasing tokens are not supported, instead a wrapped version must be used.
    2.  SHOULD NOT:
        -   Stem from private credit sources; Owing to a lack of transparency and a higher risk of default.
        -   Consist of Basket or Index Tokens; They represent composites of other assets.
2.  The underlying asset, i.e. the equivalent of what ETH is to yETH, is determined by the yPool team as they see appropriate.

#### 2.2 Airdrop & Points programs

1.  yPools may be eligible for airdrops, can accumulate points redeemable for tokens, or receive other similar types of rewards.
2.  Due to the immutable nature of the pool contract rewards typically cannot be claimed directly. Instead, the issuer must route them to an alternative recipient address.
3.  When this occurs, the yPool’s earned rewards will be accessible for redemption directly by st-yPool token holders based on time-weighted balances.
4.  Users wishing to auto-compound rewards, are recommended to use the yPool via a higher abstraction level, such as depositing into designated Yearn v3 vaults.

### 3\. yPool Requirements

#### 3.1 General Design

1.  yPool design adheres to the latest yETH specifications from the main yETH repository[\[#3\]](#references).
2.  yPool governance is on-chain from the outset, following the latest specifications and contracts from the yETH-periphery repository[\[#4\]](#references).
3.  Incorporate all post-launch governance modifications made to yETH by st-yETH voters into the new yPools.
4.  Continuously evaluate yETH and yPool contract improvements for potential inclusion.
5.  Apply process improvements to yPools as appropriate, aiming for consistency across all yPools.

#### 3.2 Role Assignment

1.  **Treasury:** Yearn Treasury or an autonomous splitter contract directed by yBudget.
2.  **Management:** On-chain governance contract with multiple roles.
3.  **Guardian:** A Gnosis Safe with a 2-of-7 signing threshold, consisting of Yearn contributors to monitor the protocol and trigger Pause mode if needed. Guardian participation is done on a gratuitous, volunteer basis–no duty of care or ongoing monitoring is assumed or implied.

#### 3.3 Normal Operation Requirements

##### 3.3.1 Epochs & Voting

1.  Epoch start times and durations can be adjusted by the yPools team, aiming to align with yETH unless a specific reason suggests otherwise.
2.  Voting mechanisms and asset weights follow the yETH model.

##### 3.3.2 Whitelisting

1.  Asset whitelisting for yPools mirrors the yETH process.
2.  The yPools team can adapt the process for the specific needs of each yPool.
3.  Whitelisting application fees are set based on the asset and may be waived.
4.  Only staked yPool token holders vote on asset inclusions.

##### 3.3.3 Parameter Pre-sets

Adjustments to the following parameters require governance proposals by staked yPool voters:

_Set by yPools = Set by the yPools team upon deployment._

| Parameter | Description | Configurable Range | Default |
| --- | --- | --- | --- |
| `t_half` | Time for half the voting weight to accumulate | 7-365 days | 60 days |
| Voting Weight Allocation | Allocation for each whitelisted asset per epoch | 1-33% | 10% |
| Amplification Parameter `A` | Influences pool sensitivity to imbalances | N/A | Set by yPools |
| Tolerance Range | Allowed deviation of asset weights | +/- 100% | Set by yPools |
| Application Fee | Fee for whitelisting as an LSD protocol | Set by yPools | Set by yPools |
| Initial Weight | Starting weight for a whitelisted asset | 0.1-1.0% | 1.0% |
| Pool Swap Fee | Fee for asset swaps, paid to st-yETH holders | 0.00-1.00% | Set by yPools |
| Protocol Fee | Yearn Treasury performance fee | 5-20% | 10% |

##### 3.3.4 Incentives

1.  Incentive structures are the same as yETH’s.
2.  No fees are charged on posted incentives.

#### 3.4 Minting Permissions

Only four smart contracts are allowed to mint any specific yPool asset:

1.  The Pool, holding LSD assets and minting the yPool asset against the deposited asset(s).
2.  The Bootstrapper, used to launch the yPool, with minting enabled only for a limited time period.
3.  The POL contract, providing protocol-owned liquidity in pools.
4.  The deposit facility, allowing minting of the yPool asset at 1:1 upon deposit of the underlying asset

#### 3.5 Bootstrapping Requirements

1.  Bootstrapping yPools follows yETH’s proven process.
2.  The yPools team has discretion to adjust the process based on the included asset, which could among other affect duration, fees, criteria, and weights.

#### 3.6 Protocol Owned Liquidity

1.  The approach is the same as yETH’s.
2.  The yPools team can modify this to better fit specific yPool liquidity needs.

### 4\. Implementation

Upon this proposal’s acceptance, the yPools team will proceed with deploying yPools and starting the bootstrapping phases as outlined above.

### 5\. Use at Own Risk

yPools are designed to be governed by their token holders who decide on assets to onboard and configure the protocol. Yearn contributors and YFI token holders are not involved and will not compensate users for any failure or loss of funds resulting from yPools usage.

## Vote

### Non-binding signaling poll

Proceed with this proposal in its current form?

-   Yes
-   No

0 voters

## References

1.  [https://gov.yearn.fi/t/yip-72-launch-yeth/](https://gov.yearn.fi/t/yip-72-launch-yeth/)
2.  [https://yeth.yearn.fi/](https://yeth.yearn.fi/)
3.  [GitHub - yearn/yETH · GitHub](https://github.com/yearn/yeth)
4.  [GitHub - yearn/yETH-periphery · GitHub](https://github.com/yearn/yeth-periphery)

## Changelog

-   Feb 16: First version
-   Feb 20: Reworking section 2 of spec, adding airdrops section
