---
title: "YIP-74: YFI Wintermute Loan & CRV Plans"
hide_title: true
sidebar_position: -74
---

# YIP-74: YFI Wintermute Loan & CRV Plans

| Metadata | Details |
| --- | --- |
| YIP | 74 |
| Outcome | **Rejected** |
| Authors | Callen Wintermute |
| Created | 2023-08-13 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-74-yfi-wintermute-loan-crv-plans/13581) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x3840d5b6daa3363933806c98335103c9086419b68513bd40f326f5cb0e07e9cf) |
| Vote result | For: 10.36; Against: 167.34 |
| Source | [Source](https://gov.yearn.fi/t/yip-74-yfi-wintermute-loan-crv-plans/13581) |

# (21/8/23) Updated Proposal:

Hi everyone,

thanks for all the feedback in both the forum and Discord. We’d like to reach a middle ground where both sides are relatively happy but ensure we can keep it as simple as possible.

It’s clear that the largest concern from the community is that the loan has no collateral from our side, which is fair considering the events that have happened over the past year.

So we propose this:

-   We retain the same initial plan as before - use up to 3M CRV to buy yCRV, deploy yCRV tokens to the yCRV-CRV pool and stake this on yearn.
    
-   Our CRV (whether that be yCRV, st-yCRV, lp-yCRV, vl-yCRV) will be held in a 3/4 or 4/6 multisig with wintermute folks and core yearn contributors. (No transaction can be made without at least one signature from a yearn member).
    
-   Yearn multisig operators agree to approve anything we do as long as it’s within the Yearn + CRV ecosystem (e.g., swapping to vl-yCRV).
    
-   We will extend our staking duration to 12 months to match the loan duration, however, after 6 months we have the option to return the YFI and receive our collateral back.
    

This keeps both parties’ commitments rather simple and we provide collateral for our loan.

We also want to reiterate that the loaned YFI will be used solely for our delta-neutral trading, we have no intent to sell it, and it will not be used in the YFI tokenomics ecosystem.

## Next Steps

We hope to gauge the community’s sentiment on our new proposal by adding a new poll that will run for 2 days. If the poll is relatively positive with the majority of votes being in favour of the new proposal, we will look to formalise this into a YIP and go to a Snapshot Vote.

If the majority of the community is against the proposal as indicated by the poll, unfortunately, we will not move to a Snapshot vote and we thank the community for engaging with us!

Updated Proposal Poll

-   For
-   Against

0 voters

* * *

* * *

# Old Proposal:

## Description

Hi Yearn Community!

Wintermute is excited to put forward this proposal which outlines the motivation, background and terms of a YFI loan to Wintermute Trading and further explains our long-term plans with respect to CRV on Yearn to the Yearn DAO.

Specifically, we are requesting approval of a YFI loan to Wintermute Trading and authorization of a transfer of 350 YFI ($2.18M) from the DAO’s treasury to Wintermute Trading for 12 months at a 0.10% interest rate to be paid in kind at the end of the loan term.

Separately, as part of Wintermute’s continued engagement on Yearn, Wintermute plans to utilise its funds of up to 3M CRV ($1.73M) to buy yCRV and subsequently add and deploy our assets to the yCRV-CRV Curve pool (lp-yCRV V2) on Yearn for a minimum of 6 months.

We believe that this should help rebalance the pool which currently sits at 69%/31% yCRV/CRV, improve the yCRV peg, and increase the pool’s liquidity.

## Motivation

The past 2 weeks have once again tested the resilience of DeFi off the back of a bug in specific versions of Vyper. Subsequently, CRV’s largest source of on-chain liquidity vanished due to the CRV/ETH Curve pool being drained. This once again raised alarm bells for the Aave community as the price of CRV went down and the probability of insolvency inched closer due to Michael’s large CRV position on Aave V2.

With little on-chain liquidity present and multiple loan positions to manage, a series of OTC trades were conducted with various parties across DeFi, including Wintermute Trading. We are now looking to deploy some of the CRV tokens on protocols where CRV is locked perpetually, including Yearn!

We strongly believe in the vision of a truly decentralized world and Yearn has played an extremely positive role in empowering and advancing this vision. Therefore, we’d love to proactively engage with the Yearn community and the DAO by utilising up to 3M ($1.73M) of our CRV to purchase yCRV, and then deploy a mixture of our assets to the yCRV-CRV liquidity pool on Curve which only has [$5.25M](https://curve.fi/#/ethereum/pools/factory-v2-280/deposit) in TVL.

**Wintermute’s Basic Background:**

Wintermute Trading is a leading crypto-native algorithmic trading firm, specializing in creating efficient markets across centralized and decentralized exchanges. Wintermute was founded in July 2017 by three Optiver veterans. Evgeny Gaevoy, founder and CEO, was previously head of ETFs (screen and OTC) at Optiver Europe, one of the largest ETF market-making desks. Since our inception, we have traded over $3T and expanded our presence across 80+ (de)centralized exchanges and various (non)EVM chains, continuously supporting the ecosystem for our partners and their communities.

Alongside our trading arm, Wintermute Ventures and Wintermute Governance support and work with leading crypto projects with the goal of truly adding value, enabling partnerships, and helping shape a positive outcome for the ecosystem. Importantly, we do not target large ownership stakes; decentralized ownership is an important prerequisite to transitioning to a robust future.

## Specification

**Wintermute’s plans:**

-   Borrowed YFI will be used exclusively for trading purposes. No farming, lending, voting, etc.
    
-   Use up to 3M CRV ($1.73M) to buy yCRV (depending on the ratio of yCRV-CRV in the liquidity pool).
    
-   Deploy yCRV tokens to the yCRV-CRV pool which we believe will help rebalance the pool and stake this on Yearn for a minimum of 6 months.
    
-   Has the optionality to swap the lp-yCRV to vl-yCRV for active participation in the Curve Wars.
    

**Our Ask:**

Wintermute Trading is requesting approval for a 12-month loan of 350 YFI ($2.18M) at a 0.10% interest rate from the DAO’s treasury.

**Loan Repayment:**

Wintermute Trading agrees to return the full 350 YFI loan amount and 0.10% interest paid in kind to the DAO’s treasury at the end of the 12-month period.

## Implementation

If approved by the Yearn DAO, 350 YFI will be sent from the DAO’s treasury to Wintermute’s address:

-   0xDBF5E9c5206d0dB70a90108bf936DA60221dC080

## Next Steps

Following community discussion and feedback after 7 days, we will look to initiate a Snapshot Vote with voting options:

1.  For - Approve and transfer a loan of 350 YFI to Wintermute Trading.
2.  Against - Reject the proposal.

## Previous Poll

-   For
-   Against

0 voters
