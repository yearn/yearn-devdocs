---
title: "YIP-86: Resupply Bad Debt Repayment Loan"
hide_title: true
sidebar_position: -86
---

# YIP-86: Resupply Bad Debt Repayment Loan

| Metadata | Details |
| --- | --- |
| YIP | 86 |
| Outcome | **Passed** |
| Authors | dudesahn |
| Created | 2025-07-09 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-86-resupply-bad-debt-repayment-loan/14516) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xe2fc56f50b1c434ca2f80d07542b66b5ff035b22891c8d6ebb79afca62664d02) |
| Vote result | For: 571.39; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-86-resupply-bad-debt-repayment-loan/14516) |

## Summary

-   This proposal outlines a $1.13M loan agreement between Yearn and its sub-DAO, Resupply, to cover outstanding reUSD bad debt following a recent exploit.
-   Yearn agrees to forego its staking revenue throughout the duration of the loan.
-   The loan will be repaid in full, with 6% interest.

## Background

-   Following a [$10M hack](https://mirror.xyz/0x521CB9b35514E9c8a8a929C890bf1489F63B2C84/ygJ1kh6satW9l_NDBM47V87CfaQbn2q0tWy_rtp76OI), Resupply is seeking a loan from Yearn treasury to clear remaining bad debt and return the protocol to profitability.
-   Resupply has generated **$140k** in stablecoin revenue via Yearn’s permastaker since launching in March (approx. **$46k/mo**).
-   Yearn currently owns **11.58%** of the DAO via its staked RSUP.
-   Of the original $10M debt, a significant amount has already been eliminated:
    -   $6M was covered by Resupply’s Insurance Pool
    -   $1.4M [donated](https://etherscan.io/tx/0x18884d0a608f6431fb4d5efa308afc1920d0f09d9691e5e22e849de61719b626/advanced) by c2tp.eth
    -   $818k [donated](https://etherscan.io/tx/0x1c6c24cbe0d090a953dc1df7ecae8403f6d5b317e0127048f9aacf22e2e5336e/advanced) by Convex Finance
    -   $643k [donated](https://etherscan.io/tx/0x7225c1e2793368234c6f133924906e9bea336dabbc363c7513f886eaa812c55c/advanced) by Resupply treasury
-   The remaining **~$1.13M** of reUSD bad debt is to be offset via protocol revenue (Yearn and Convex permastakers)
-   In order to fully erase the bad debt from Resupply’s markets and help restore user confidence in reUSD solvency ASAP, we are proposing Yearn front this future revenue via a loan to be repaid over time, with interest.

## Specification

### Loan Terms

-   **Principal**: 1.13M crvUSD
-   **Interest**: 6% APR
-   **Total Repayment**: Principal + interest accrued on outstanding balance at 6% APR, 100% of repayment as crvUSD
-   Repayments will be tracked via smart contract and automatically sent back to Yearn’s treasury as yvcrvUSD-2

### Repayment Structure

-   Both Yearn and Convex agree to reclassify its permastaker revenue as loan repayments, and direct 100% of it as weekly payments toward loan repayments.
-   Repayments will be transferred on an automated basis from Yearn and Convex permastakers
-   These sources comprise **34.6% of total protocol revenue**
    -   Pre-hack: ~$31,446/week (~$1.64M/year)
-   The aim is to have a full repayment within one year. If after 4 months, repayment is off-track, Resupply team will commit to voting in favor of adding a new protocol-level weekly revenue split as an additional source of revenue to help speed up the repayment process.
-   As a part of this tracking, Resupply will provide monthly updates to Yearn DAO regarding repayment progress

**For**: Yes, provide the loan with these terms.

**Against**: No, do not provide the loan.

-   For
-   Against

0 voters
