---
title: "YIP-85: Disable Protocol Fees on Yearn V3"
hide_title: true
sidebar_position: -85
---

# YIP-85: Disable Protocol Fees on Yearn V3

| Metadata | Details |
| --- | --- |
| YIP | 85 |
| Outcome | **Passed** |
| Authors | V3 Protocol Team |
| Created | 2025-05-05 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-85-disable-protocol-fees-on-yearn-v3/14484) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xa3223b388c484ea8a81b60bb88cda99f23d6d06b4b9798b4d0acafaa2207b686) |
| Vote result | Yes: 543.15; No: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-85-disable-protocol-fees-on-yearn-v3/14484) |

## Authors

V3 Protocol Team

## Summary

This proposal seeks approval from the Yearn community to disable all protocol-level fees within the Yearn V3 vault system across all deployed chains. This change aims to enhance growth, simplify the user experience, and foster greater adoption among third-party protocols.

## Abstract

The Yearn V3 system has seen encouraging adoption by partners, but the revenue generated from protocol-level fees has proven insignificant in terms of Yearn’s overall financial performance. These fees, while nominal, introduce unnecessary complexity, confusion, and friction, ultimately limiting the adoption and growth potential of Yearn’s infrastructure. Eliminating the protocol fees will simplify integration and incentivize more third-party protocols to leverage Yearn’s V3 infrastructure, thereby extending Yearn’s ecosystem and reinforcing its position as the preferred standard for ERC-4626 yield vaults.

## Motivation

The Yearn V3 vault system was developed with a vision of simplifying yield generation and providing a robust, standardized foundation (ERC-4626) for DeFi protocols. While usage metrics indicate a positive reception among partner protocols, the collected fees have had minimal impact on Yearn’s bottom line. Conversely, the existence of these fees has introduced:

-   Increased complexity in vault deployment and management.
-   User confusion around fee structures
-   Hesitancy from third-party protocols to fully integrate Yearn’s vaults due to perceived competitive disadvantages or increased operational complexity.
-   Those that have integrated have tended to use it in a way that avoids the protocol fee, with a few teams choosing to fork the code instead of use the official releases.

## Specification

If approved, Yearn’s protocol fee parameters for the V3 vault factories will be set to 0.

This action will not impact existing performance or management fees collected by individual vaults.

## Benefits

-   Reduces operational complexity for Yearn and integrating partners.
-   Clarifies and streamlines fee structures for end-users.
-   Increases competitiveness of Yearn’s V3 vault infrastructure.
-   Potentially expands Yearn’s ecosystem through increased adoption and usage of its technology.
-   Indirectly boosts Yearn’s brand visibility and establishes greater industry influence.

## Risks

-   Short-term reduction in nominal protocol fee revenues.
-   Possible perception that fee-free infrastructure is less sustainable, though mitigated by maintaining existing management and performance fees on Yearn-managed vaults.

## Voting

Voting will occur through the standard Yearn governance platform:

-   **Yes:** Approve proposal to set V3 protocol fees to 0% across all chains.
-   **No:** Reject proposal and maintain existing protocol fee structure.

-   For
-   Against

0 voters
