---
title: "YIP-73: Activate veYFI rewards with oYFI Gauges"
hide_title: true
sidebar_position: -73
---

# YIP-73: Activate veYFI rewards with oYFI Gauges

| Metadata | Details |
| --- | --- |
| YIP | 73 |
| Outcome | **Passed** |
| Authors | veYFI Secret Admirers working group |
| Created | 2023-06-27 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-oyfi-gauges/13414) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xcc2a5f2bad97b551a02230975def5640c6f582d64c3c42eecfb1c6c76eea3b28) |
| Vote result | For: 160.49; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-oyfi-gauges/13414) |

_Authors: The members of the “veYFI Secret Admirers” working group_

## Summary

Introduce the oYFI token for use in the veYFI gauges outlined in YIP-65, define processes, deployment, and the transition towards full immutability.

### Status

**Discussion**  
This proposal is currently in the discussion phase. As per our voting rules outlined in YIP-55, it will be in discussion for at least 3 days with a non-binding forum poll to gauge sentiment before it can be assigned a YIP number and move to Snapshot for a binding vote by veYFI holders.

## Abstract

**If approved**, this proposal will:

-   Introduce the oYFI token.
-   Assign oYFI as the reward token for vault gauges.
-   Establish the emission of oYFI rewards based on the veYFI lock rate.
-   Detail the launch specifications for veYFI rewards.
-   Define veYFI epochs and voting.
-   Set up guidelines for the eventual transition to full immutability.

## Background

### YFI Buybacks

The total supply of YFI tokens is 36,666, which has been completely distributed. Following the adoption of YIP-56[\[1\]](#references), YFI tokens are bought back from the open market using earnings from yearn vaults. This process is automated, and as of this writing, about $23.7 million USD equivalent has been used to purchase 1,311 YFI, averaging a price of $18,100 per token.[\[2\]](#references)

### Tokenomics post YIP-65

YIP-65[\[3\]](#references) outlined a roadmap for the future of YFI tokenomics. Following this, veYFI was introduced[\[4\]](#references), enabling YFI tokens to be “vote escrowed” for up to four years. This token, veYFI, controls yearn governance. This proposal aims to activate section 2.3 of the YIP-65 spec, “Vault gauges + Voting”, using oYFI as a new type of reward token.

### Summary of the veYFI Tokenomics Program

Users can lock YFI as veYFI for up to four years to control yearn’s governance proportionally to the duration-weighted amount of their lock. They can exit this lock early, paying a penalty of up to 75% of their locked YFI, which is proportionally allocated to remaining veYFI lockers.

Tokenomics rewards are in the form of oYFI, a token that allows its holder to buy back YFI at a discount. The discount rate depends on the amount of veYFI currently locked in the protocol. Rewards are distributed over epochs, with the total rewards per epoch also determined by the amount of veYFI locked in the protocol.

In every epoch, veYFI voters allocate the distribution for the next epoch to oYFI gauges. Each gauge receives an amount of oYFI according to the votes received in the previous epoch. Yearn vault depositors stake their vault tokens into oYFI gauges to earn oYFI. The earned oYFI amount is determined by the user’s “boost”, their share of gauge TVL in relation to their share of veYFI. Users with boosts that is below the max forfeit some of their oYFI rewards to veYFI lockers.

In summary, gauge depositors earn oYFI according to their boost. veYFI holders earn YFI from users who exit their locks early, and oYFI from gauge depositors who do not hold max boost.

### Implementation

A working implementation is available in the yearn/veYFI repository[\[5\]](#references) and has been audited by ChainSecurity.[\[6\]](#references) Post-audit, a configurable scaling factor `s` has been added to oYFI, and `x` has been adjusted to avoid short duration locks biasing the formula.

### Out of Scope

-   This proposal **does not** involve minting new YFI tokens; rewards in this system consist solely of tokens purchased from the open market.
-   This proposal **does not** attempt to promote YFI as an attractive investment; its purpose is to redistribute governance power to the most active community members and protocol users.
-   This proposal **does not** aim to increase yearn treasury holdings; instead, it ensures bought back YFI is redistributed back to protocol users and YFI token holders.

## Motivation

This proposal continues Yearn’s implementation of YIP-65. Previously, the protocol was upgraded to enable YFI holders to vote-escrow their YFI and thus autonomously receive YFI rewards for committing to help govern the protocol (constantly increasing active governors’ relative share of governance power and kickstarting a decentralized governance flywheel).

With this YIP, YIP-65 continues by boosting the governance rewards of veYFI holders (governors) who also happen to be Vault depositors—this ensures that the most committed Yearn community members increase their governance power at an even faster rate, deepening the governance flywheel and helping maximize the protocol’s autonomy.

Approving this proposal won’t make you richer, but it will ensure that those most committed to governing and using the system will steadily increase their governance power, keeping Yearn on track to be a fully self-governing protocol.

### Epochs

Just like Curve Finance’s seminal veCRV design, veYFI uses epochs to redirect rewards frequently as determined by veYFI voters. This responsiveness allows the model to adapt to changing needs.

### veYFI Rewards Emission

The emission of bought back YFI is inspired by the Ethereum staking emission model.[\[7\]](#references) Instead of validators, the driving variable is the amount and duration of YFI locked in veYFI.

The rationale is to act as a dampening function on both extremes of the spectrum; as more YFI is locked, the rewards per veYFI can decrease. Similarly if less YFI is locked, the rewards per veYFI increase.

As there is no minting of new tokens, the emission model is conservative to ensure rewards last longer.

Through blank voting, veYFI holders have the power to postpone emission slated for an epoch into the future, in order to further conserve emission and extend the runway of the tokenomics program.

### veYFI Gauges and Boost Penalties

The rewards we emit are to gauges where yearn vault tokens are staked, ensuring that only genuine users of yearn protocols receive rewards.

However, we do want to discourage large depositors from monopolizing rewards unless they are actively involved in yearn governance.

This is achieved through a modified form of boost, pioneered by Curve Finance and Michael Egorov, where gauge depositors must hold veYFI in proportion to their share of deposits in a gauge to maximize their rewards. The difference is paid as penalties to veYFI holders.

### oYFI

To avoid rewarding predatory users who farm tokens only to sell them off, we propose oYFI, partially inspired by a design proposed by Andre Cronje for the K3PR protocol.[\[8\]](#references)

oYFI allows its holder to obtain bought back YFI at a discount from the current spot market price, with the discount rate varying based on the proportion of veYFI locked.

As more veYFI is locked, the discount decreases. When veYFI decreases, discount increases to attract more locking.

The proceeds are then routed towards more YFI buybacks, improving the sustainability and longevity of the program.

### Considerations

Refer to YIP-65 for additional related considerations.

#### Future Possibilities

-   Tokenomics program could be utilized as a “liquidity for hire” model where protocols remunerate yearn users to channel liquidity into their pools.
-   Introduction of incentive programs to drive specific results or emission votes.
-   Usage of epochs and voting process for passing YIPs and governance proposals that aren’t related to tokenomics.
-   Expansion of veYFI’s “useful work”, perhaps acting as emergency protocol backstops, parameter tuning, and operational management of vaults.
-   Adding more pathways for emissions and penalties to stimulate the effective governance of the yearn protocol suite.
-   Further enhancing the “skin in the game” for YFI token holders to ensure their actions and decisions deeply impact the performance of the yearn protocol suite.

#### Risks

-   A potential flaw in the tokenomics model design or implementation could lead to unexpected reward behavior or loss of funds.
-   The introduction of low-quality veYFI gauges may result in rewards being redirected there, leading to less benefit to the yearn protocol.
-   The tokenomics model may not attract enough Total Value Locked (TVL) to sustain future rewards with buybacks and may need to be reassessed at some point.
-   Changes to rewards and emission parameters made by veYFI voters could result in suboptimal behavior and performance.

#### Alternatives Considered

-   Rewarding unlocked YFI: This was avoided to mitigate the risk of disbursing YFI to users who are not interested in holding the token for governance purposes.
-   Directing rewards to veYFI lockers directly: This was avoided to ensure that rewards flow to active rather than passive protocol participants, i.e., users of yearn vaults.
-   Restricting third-party protocols from building on top of the tokenomics program: This was avoided in favor of creating a contract-friendly, permissionless block for others to build upon. We explicitly welcome additional third parties to build on top of the yearn suite of protocols.

## Specification

**Note:** The spec outlines the desirable end state. Some compromises may need to be made during the rollout before the final state is reached. Refer to Section 8 below.

### 0\. Definitions

-   YFI: Unlocked YFI token
-   veYFI: YFI token locked for a duration of up to 4 years (208 weeks), where `veYFI = YFI * lock_duration_as_share_of_max`. For example, 100 YFI locked for 1 week equals 100 x (1/208) ~= 0.48 veYFI. This operates as per the contract deployed[\[9\]](#references) with the passing of the proposal to activate veYFI.[\[4\]](#references)

### 1\. oYFI

1.  Is a token that implements the ERC-20 standard.
2.  Gives its bearer the right to redeem an equivalent of YFI, in exchange for ETH.
3.  oYFI is burned upon redemption.
4.  The circulating supply of oYFI must not exceed the amount of YFI that is available to be redeemed as part of the tokenomics program.
5.  The amount of ETH required for redemption is at a discount of the current spot price of YFI/ETH.
6.  Discount calculation is an approximation of the following formula:
    
    ```
    discount = c/(1 + a * e^k(s*x − 1)), where
    c = 1
    a = 9.9999
    k = 4.6969
    s = configurable scaling factor
    x = veYFI_supply / YFI_supply
    ```
    
7.  ETH received from oYFI redemption is redirected to automated YFI buybacks that are handled by an immutable smart contract, like the one already in production for DAI.[\[2\]](#references)

### 2\. Epochs

1.  veYFI epochs last for 14 days, commencing on Thursdays 00:00:00 UTC.
2.  Epochs are synced to coincide with Curve’s veCRV epochs and yETH’s epochs.

### 3\. Emission

1.  Rewards are paid as oYFI.
2.  These rewards are distributed to Gauges (see below) at the beginning of each epoch.
3.  The annual rewards emission is calculated as an approximation of the following formula:
    
    ```
    oYFI_emitted = c * sqrt(veYFI_supply), where
    c = configurable scaling factor
    ```
    

### 4\. Gauges

1.  A gauge is an ERC20 token and vault that implements the EIP4626 standard.
2.  Users deposit yearn vault tokens to earn oYFI rewards according to their boost.
3.  Boost ranges from 1-10x and determines a user’s share of rewards. Positions with less than a 10x max boost forfeit a share of their oYFI rewards. At best, a user with a 10x boost earns 100% of their rewards; at worst, a user with a 1x boost forfeits 90% of rewards.
4.  Forfeited oYFI are proportionally allocated to veYFI lockers as additional rewards.
5.  The earning weight (`current_boost/max_boost`) is calculated in the same way as in Curve[\[10\]](#references), when accounted for a 10x max boost instead of Curve’s 2.5x:
    
    ```
    weight = min(Gauge.balanceOf(user), 9/10 * Gauge.totalSupply * veYFI.balanceOf(user)/veYFI.totalSupply + Gauge.balanceOf(user)/10)
    ```
    

### 5\. Voting

1.  veYFI holders vote on gauge emission and governance proposals.
2.  Voting takes place in the second half of the epoch.
3.  To discourage last-minute voting, there is a linear decay of voting weight in the final 24 hours of the epoch, reaching 0% voting weight at the last block of the epoch.

#### 5.4 Gauge emission votes

1.  Gauge emission votes set the distribution of oYFI allocated in an epoch, determining which specific gauge should receive what portion of oYFI emissions.
2.  10% of an epoch’s total emission is allocated to specific gauges:

-   5% of total to encourage YFI/ETH liquidity
-   5% of total to encourage oYFI/ETH liquidity

3.  veYFI holders vote on the remainder 90% allocation.
4.  Voters can cast “blank” votes, which leads to this proportion of oYFI rewards being taken out of the epoch’s emission allocation.
5.  The blank vote oYFI can be burned, thereby extending the runway of the tokenomics program, or moved to the immediately next epoch’s emission allocation, thereby increasing rewards in the next epoch.
6.  The amount of oYFI burned vs moved is configurable by a parameter.
7.  Voters can cast many votes per epoch, but any gauge can only be voted on once in a single epoch.
8.  Votes reset at the start of a new epoch; there is no carry-over of votes between epochs.

#### 5.5 Governance proposals

1.  Governance proposals include, but are not limited to:

-   Adding new gauges
-   Removing existing gauges
-   Changing parameters

2.  Proposals can be submitted in the first half of the epoch.
3.  Proposal submission occurs in a dedicated Yearn governance forum section.
4.  Any address holding 1 veYFI or more is able to submit a governance proposal.
5.  Governance proposals pass by simple majority (>50% of the veYFI vote).
6.  There is a configurable quorum parameter, a minimum amount of veYFI that needs to vote in favor for a governance proposal to pass, regardless of the number of votes in support.

### Figure 1. Epoch Timeline Illustration

```
|------week-1------|-----week-2-----|------week-3------|-----week-4------|...
| epoch n                           | epoch n+1...
| proposals n+1    | vote n+1       | proposals n+2    | vote n+2...
                                  x vote power decay
                                    x distribute n+1 rewards to gauges
```

### 6\. Configurable parameters

These are the parameters that veYFI holders can adjust via governance proposals.

| Parameter | Description | Configurable Range | Default |
| --- | --- | --- | --- |
| Quorum | The minimum amount of veYFI needed to approve a governance proposal | 0-10\_000 veYFI | 10 veYFI |
| Blank Vote Burn | The percentage of oYFI from blank gauge emission votes that are burned instead of moving to the next epoch | 0%-100% (100% means all oYFI is burned; 0% means all oYFI transfers to the next epoch) | 50% |
| `s` | Scaling factor for oYFI discount | 1.00 - 12.00❉ | 10.00 |
| `c` | Scaling factor for oYFI emission | 4 - 64❉ | 12 |
| YFI Gauge | The gauge that gets at least 5% emission for YFI liquidity | `address` | YFI/ETH Curve LP yVault |
| oYFI Gauge | The gauge that gets at least 5% emission for oYFI liquidity | `address` | oYFI/ETH Curve LP yVault |

❉ _Change is applied with linear scaling over the course of an epoch to prevent front-running._

### 7\. Launch Steps

If this YIP is approved, the following steps will be taken to launch the programme:

1.  **Epoch 1 voting snapshot announcement:** One week in advance, a timestamp for the first Epoch’s vote is announced. This allows users to lock YFI into veYFI to participate.
2.  **Deploy oYFI.**
3.  **Seed oYFI/ETH:** Determine the value of oYFI (its YFI discount) based on the snapshot veYFI balance for Epoch 1. Mint $5k worth of oYFI and seed it with an equivalent amount of ETH in a Curve v2 pool.
4.  **Deploy initial gauges:** Launch the initial gauges (see below) as they become available.
5.  **Start epoch 1:** Seed gauges with oYFI and prepare for epoch 2 voting.
6.  **Apply for oYFI/ETH CRV gauge on Curve.** Attach strategy to oYFI/ETH Curve LP yVault if approved.

#### 7.7 Initial Gauges

1.  Gauges for the following tokens are pre-approved for deployment with this YIP:
    -   **YFI/ETH Curve LP yVault**
    -   **oYFI/ETH Curve LP yVault**
    -   **yCRV/CRV Curve LP yVault** (also known as “lp-yCRV”)
    -   **yBAL/BAL Balancer LP yVault** (also known as “lp-yBAL”)
    -   **yETH/ETH Curve LP yVault**. This gauge will be deployed once yETH has launched.
2.  With the deployment of yearn v3 vaults expected soon[\[11\]](#references), additional higher-margin and/or strategic veYFI gauges can be considered and green-lit for deployment with the passing of veYFI Governance Proposals.

#### 7.8 Parameters & Fine-Tuning

1.  The system launches with the default parameters above.
2.  During the first **6 epochs**, yChad can adjust the system, bypassing governance proposals for parameter changes, and circumventing gradual scaling of parameter changes.
3.  To bootstrap the oYFI discount curve, `s` starts at a steep `s=10`, with the explicit objective to decrease to `s=2` as the veYFI supply increases following the successful roll out of the programme.

### 8\. Towards a Fully Immutable System

1.  Initial voting takes place via Snapshot, with yChad implementing changes according to the passed proposals and gauge emission allocations. Some features, like voting decay before epoch expiry, may not be initially implemented.
2.  Initial emission is manual, with oYFI being minted and distributed to gauges.
3.  From the start, ETH from oYFI redemption is automatically used for YFI buybacks.
4.  The YIP instructs Yearn contributors to make the system fully immutable **before the end of the first 12 epochs**. This involves:
    -   Automating and making oYFI minting immutable as per the emission curve
    -   Ensuring oYFI supply is handled on-chain so it cannot be unbacked
    -   Automating on-chain gauge weight voting and gauge allocation
    -   Automating on-chain voting for governance proposal and parameter changes
    -   Minimizing yChad’s involvement or dependencies wherever possible.
5.  Significant changes to the programme before it is made immutable require approval through a new YIP.

### 9\. Incentives

1.  This YIP doesn’t cover incentives for veYFI voting, but such voting is strongly encouraged.
2.  If this YIP is approved, Yearn contributors are instructed to consider launching incentive programs for veYFI voting, either on-chain or off-chain. This could be for weight allocations, parameter changes, or general governance proposals. New YIPs are not required to launch such programs.
3.  Incentives should be posted during proposal submission periods, not voting periods.

### 10\. Use at Own Risk

Participation in the veYFI tokenomics program and Yearn governance is optional and not required to use or interact with the Yearn suite of protocols. Holding YFI or locking veYFI offers no financial gain—it’s a governance power redistribution program. Yearn contributors are not responsible for any loss from its use. No guarantees or assurances are provided, and if catastrophic events or security incidents occur, veYFI voters may determine the course of action.

## Non-binding Forum Poll

-   Yes, I support this proposal
-   No, I’m against this proposal

0 voters

## References

1.  [YIP-56: Buyback and Build](http://gov.yearn.fi/t/yip-56-buyback-and-build/8929)
2.  [https://buyback.yearn.finance/](https://buyback.yearn.finance/)
3.  [http://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/](http://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/)
4.  [http://gov.yearn.fi/t/proposal-activate-veyfi/](http://gov.yearn.fi/t/proposal-activate-veyfi/)
5.  [GitHub - yearn/veYFI: Voting YFI](https://github.com/yearn/veYFI)
6.  [https://chainsecurity.com/wp-content/uploads/2023/03/Yearn-Smart-Contract-Audit-oYfi-ChainSecurity.pdf](https://chainsecurity.com/wp-content/uploads/2023/03/Yearn-Smart-Contract-Audit-oYfi-ChainSecurity.pdf)
7.  [Upgrading Ethereum | 2.8.3 Issuance](https://eth2book.info/capella/part2/incentives/issuance/#overall-issuance)
8.  [https://andrecronje.medium.com/keep3r-redeemable-kp3r-rkp3r-c200fb8740ef](https://andrecronje.medium.com/keep3r-redeemable-kp3r-rkp3r-c200fb8740ef)
9.  [Yearn: YFI Token | Address: 0x0bc529c0...67f6ad93e | Etherscan](https://etherscan.io/address/0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e#code)
10.  [Boosting your CRV rewards - Curve Resources](https://resources.curve.fi/reward-gauges/boosting-your-crv-rewards#formula)
11.  [V3 Protocol Team · Issue #120 · yearn/budget · GitHub](https://github.com/yearn/budget/issues/120)
