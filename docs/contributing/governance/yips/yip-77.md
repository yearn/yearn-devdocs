---
title: "YIP-77: Launch new yLockers Staking"
hide_title: true
sidebar_position: -77
---

# YIP-77: Launch new yLockers Staking

| Metadata | Details |
| --- | --- |
| YIP | 77 |
| Outcome | **Passed** |
| Authors | wavey |
| Created | 2024-02-26 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-77-launch-new-ylockers-staking/13944) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xe79fb2ef4f21ef1e9cc30dd1522c9751c74b631c4782bccbbeb25185d4ddae1d) |
| Vote result | For: 254.86; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-77-launch-new-ylockers-staking/13944) |

# \[Proposal\] Launch new yLockers Staking

## Overview

This proposal aims to implement a new staking experience for Yearn liquid locker users, including yCRV, yPRISMA, and any future Yearn liquid locker tokens (hereinafter collectively referred to as “yLocker tokens”).

The design offers users the choice to earn yield in stablecoins and enhance their earning potential within the system the longer they stake, all without imposing lock-ups or penalties.

## Abstract

If adopted, this proposal will trigger Yearn to complete development on contracts, a custom-built UI for yLockers users, and begin the deployment of the new staking system described below. As such, the following steps will be taken:

1.  Establish a new staking system based on the novel `YearnBoostedStaker` contract and an accompanying yield distribution contract.
2.  Submit the contracts for a final audit.
3.  Launch new staking setup for yPRISMA immediately.
4.  Enable staking-time weighted rewards distribution to users. This mechanism is described in more detail below.
5.  Enable users’ ability to self-elect their reward allocations. Specifically, users will have an ability to select between any mix of the two available rewards tokens: the respective yLocker token, and its ecosystem’s primary stablecoin, wrapped in a Yearn auto-compounding vault.
6.  After 5 weeks of production operation, launch same new staking setup for yCRV.

These changes will not deprecate st-yCRV nor (future) st-yPRISMA products. They will continue operating as autocompounding vaults, but with new strategies designed to farm the new staking contracts. Users should consider the following actions depending on their personal goals:

-   For users who prefer to continue passively auto-compounding yLocker tokens, no action is required.
-   Users who wish to take advantage of the new staking features should plan to withdraw and stake their yCRV or yPRISMA directly.

## Background

Yearns liquid locker products (a.k.a. “yLockers”) serve as a convenient means by which users may choose to gain exposure to various veToken governance systems while keeping their position entirely liquid.

Today, Yearn has two main yLocker products: yCRV and yPRISMA. Both allow users to earn any protocol-generated revenue by depositing their yLocker tokens into a vault contract which receives yield from Yearn’s overall position.

yLockers are designed with a goal of being easy to understand, and enforce no lock-ups nor penalties.

Given the competitive landscape for similar locker products, it is important that yLockers evolve to meet new market demands.

## Motivation

The motivation for this change is to address a number of popular use cases that the current yCRV product cannot serve. Specifically:

1.  **Allow users to claim yield as stablecoins**  
    Though Yearn has seen significant adoption of the st-yCRV autocompounding product (current TVL ~47M yCRV), there is clear market demand for preserving user optionality to earn their veToken yield in the form of stablecoins. We’ve seen a similar model employed with great success by [Convex Finance](https://docs.convexfinance.com/convexfinance/guides/depositing/crv). At time of writing, the market on Convex is currently pricing in a >20% premium for receiving yield as stablecoins vs governance tokens.
    
2.  **Introduce mechanism for enhanced incentives based on staking time**  
    The mechanic for staking-time weights allows the yLocker protocol to allocate higher yield, and other incentives to users who commit to longer staking times. This has the effect of incentivizing longer-term stakers by giving them a larger share of total weekly rewards.
    

## Design

#### YearnBoostedStaker

-   Users can deposit and withdraw full balance at any time with no lock-ups and no penalties.
-   Each depositor maintains a _**weight**_ which is a function of their staking amount and duration
-   A user’s _**weight**_ increases on a once-weekly schedule. Once on initial deposit, and again each until the maximum amount of growth weeks is reached.
-   Users may make partial withdrawals. If user has amounts actively growing in different weeks, the withdrawal is made from the least-weighted amounts first.
-   Each staking uses may also set an **election**. This value can be anywhere between 0% - 100% to express their preference for yLocker token yield vs. stablecoin yield (where 0% indicates all yield as yLocker tokens, 100% as all yield as stablecoins, and 50% as a relative split between the two).
-   The contract produces the following data:
    -   user election: user’s yield preference
    -   user weight: user’s time-weighted score
    -   user balance: sum of user deposited tokens
    -   global weight: total time-weighted score of all users
    -   total supply: sum of deposited tokens

Each of these values can be consumed by any other contract within the system (yield distributors, voting, etc.) and even by integrators to generate weight-based reward distributions.

Let’s demonstrate an example of how weights work. In this example…

-   YearnBoostedStaker is deployed with `maxGrowthWeeks = 4`
-   A user deposits 100 yLocker tokens

| week | balance | weight | boost multiplier |
| --- | --- | --- | --- |
| 0 _(deposit week)_ | 100 | 50 | 0.5x boost |
| 1 | 100 | 100 | 1x boost |
| 2 | 100 | 150 | 1.5x boost |
| 3 | 100 | 200 | 2x boost |
| 4 _(final growth week)_ | 100 | 250 | 2.5x boost |
| 5 _…n_ | 100 | 250 | 2.5x boost |

To keep it simple, the example above does not address what happens when a user makes a deposit or withdraw while weight growth is still in progress. If a user deposits 100 tokens every week for 4 weeks, they will then have 4 independent weight groups traveling through the system.

A withdraw will always retrieve tokens from the most recent (least weighted) deposit, leaving the higher weight tokens to continue along.

A user’s total weight is equal to the sum of each of their deposit’s weight. And the total system weight is the sum of all user weight.

#### Yield Processing and Distribution

Yield will be distributed on a weekly basis in the form of exactly two tokens:

1.  Target yLocker token
2.  Target vault-wrapped stablecoin.

It is important to note that raw yield (captured from protocol fees, bribes, etc.) will still arrive in an assortment of different tokens. These tokens are classified and converted into their respective target tokens.

Determining the yield classifications, and therefore weekly amounts is simple:

-   All yield collected during the week from core protocol fee revenue (i.e. core fee distributor contracts) will go into the stablecoin bucket.
-   All yield that arrives from bribes or other outside sources will go into the yLocker token bucket to be converted to the yLocker token.

As yield arives throughout the week, it will be converted to target tokens and deposited directly into the Yearn yield distributor contract according to its classification.

If, for example, a user elects for 100% of their yield in stablecoins, and the stablecoin bucket had $50,000 deposited for the week, that user will earn their entire weekly distribution as a portion of that $50,000. The exact portion depends on that user’s weight relative to the election-adjusted weight of all other users in the system.

#### Yield Claiming

A custom yield distribution contract is required to govern distribution according to the weights and weekly rhythms as `YearnBoostedStaker` (week transitions occur every Thursday morning at 00:00 UTC).

-   A user’s yield accrues week over week, and **is never lost if unclaimed**.
-   Yield tokens received by Yearn’s position will be deposited over the course of the week.
-   Deposited yield tokens are not claimable in the current week but become claimable as soon as the week flips.
-   Stablecoin yield will be claimed directly to a user’s wallet.
-   Optionally, users may elect to have their governance tokens “auto-staked” to the staking contract.
-   At launch, claimaints who choose to “auto-stake” will have that claimed amount allocated directly into the maximum boosted position. This serves as a way to build upon one’s weight in the system while also being gas efficient.

## Specification

#### Configuration

-   Deploy `YearnBoostedStaker` with a `MAX_STAKE_GROWTH_WEEKS` of 4.
-   Deploy Yield Distributor contract with auto-staking configured to deposit claimed yTokens back into the staker at max boost.
-   Migrate the current st-yCRV strategy to a new strategy to farm rewards from the new staking system. Vault token remains the same.
-   Deploy st-yPRISMA vault and strategy to auto-compound the new staker.

#### Fees

-   A 10% performance fee will be charged at the time of weekly yield deposits.

#### Next Steps and Cut-over details

-   Acquire consensus for this proposal
-   Following deployments, an announcement will be made to cue users to migrate.
-   As users (optionally) migrate from st-yCRV to direct staking, there will be no weight-earning advantage won by any individual depositors as long as they migrate on the first week. I.e. Every staker’s weight (including st-yCRV strategy) begins at 0.5x boost, and therefore their relative system weight is still maximized.

## Vote

#### Non-binding signaling poll.

Proceed with this proposal in its current form?

-   Yes
-   No

0 voters
