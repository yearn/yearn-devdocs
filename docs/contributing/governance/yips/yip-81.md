---
title: "YIP-81: Prepare for Full On-Chain Governance"
hide_title: true
sidebar_position: -81
---

# YIP-81: Prepare for Full On-Chain Governance

| Metadata | Details |
| --- | --- |
| YIP | 81 |
| Outcome | **Passed** |
| Authors | 0xPickles |
| Created | 2024-11-22 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-81-prepare-for-full-on-chain-governance/14282) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x6f3082db2cef3e0c254e569580d063cb14130a92d0bf1729bef342a386e419f2) |
| Vote result | For: 733.97; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-81-prepare-for-full-on-chain-governance/14282) |

## Summary

This proposal outlines the preparatory steps for implementing on-chain governance (OCG). By formalizing processes, parameters, and roles while governance is still off-chain, we aim to iterate and refine the system before its deployment.

### Status

**Discussion**  
This proposal is in the discussion phase. Following the voting rules in YIP-55, it will remain open for at least 3 days, accompanied by a non-binding forum poll to gauge sentiment. Afterward, it may be assigned a YIP number and progress to Snapshot for a binding vote by veYFI holders.

## Abstract

**If adopted,** this proposal will:

1.  Extend the veYFI system to cover all governance proposals, beyond gauge emissions and parameter changes.
2.  Formalize yChad’s role as protocol Guardian.
3.  Establish percentage-based voting requirements for Liquid Locker Protocols (LLPs).
4.  Enable optional extensions like veYFI delegation and budget requests.

The goal is to ensure a smooth transition to full OCG while addressing potential design flaws during this preparatory phase.

## Background

YIP-65 [\[1\]](#references) introduced the veYFI system for governance, and YIP-73 [\[2\]](#references) further formalized it with gauges, epochs, and a voting process. This proposal expands veYFI’s scope to include all governance proposals, facilitating the DAO’s move away from Snapshot voting.

### Out of Scope

-   Governance of yPools (e.g., yETH, yUSD), which remains with respective staked token holders.
-   Governance of yTeams, managed by their contributors.
-   No new tokens or airdrops are proposed.

## Motivation

Refining the governance system during the off-chain phase enables us to identify and address flaws, ensuring a robust foundation before the full OCG deployment.

### Future Possibilities

-   Directing protocol income dynamically during epochs via OCG.
-   Allocating YFI dynamically during epochs via OCG.
-   Appointing governance bodies or councils with specific powers.

### Risks

-   Design or implementation flaws causing unexpected behavior.
-   Low veYFI lock rates, voter apathy, and/or lack of attention/incentives leading to limited participation.
-   Domination by a single Liquid Locker Protocol, posing systemic risks.

## Specification

### 1\. tl;dr

1.  Apply YIP-73’s operational framework to all governance proposals, including Yearn Improvement Proposals (YIPs).
2.  Formalize yChad’s role as protocol Guardian.
3.  Enforce percentage-based voting for LLPs.
4.  Enable optional extensions where technically feasible.

### 2\. Apply YIP-73 Framework to All Governance Proposals

1.  Use the 2-week epoch pattern from YIP-73: proposals are submitted in the first half and voted on in the second half of a veYFI epoch.
2.  Require a minimum of 1 veYFI for proposal submission.
3.  Proposals pass with a simple majority (>50% of veYFI votes).
4.  Apply the quorum and vote decay parameters from YIP-73 to all proposals.
5.  Snapshot voting remains the venue for voting until OCG is active.

### 3\. Formalize Protocol Guardian Role

1.  yChad’s role as protocol Guardian is formalized and encoded in the protocol.
2.  The Guardian can nullify a proposal or governance decision but cannot make proposals.
3.  Guardian powers are implemented before OCG and persist after deployment.
4.  The Guardian role can be reassigned via a YIP vote.

### 4\. Liquid Locker Percentage-Based Voting

1.  Define LLPs as protocols that lock veYFI on behalf of users and aggregate dYFI boosts.
2.  Require LLPs to support percentage-based voting, ensuring user preferences are accurately reflected.
    -   Example: If an LLP’s users vote 55% FOR and 45% AGAINST, the LLP votes 55% FOR and 45% AGAINST.
3.  LLPs failing to comply may have their votes rescinded by the Guardian.

### 5\. Optional Extensions

#### 5.1 veYFI Delegation

-   Enable delegation of veYFI voting power to external addresses or smart contracts, similar to the mechanism already used via the Snapshot system.

#### 5.2 Budget Requests

1.  Allow budget requests and funding proposals to be submitted via veYFI governance.
2.  Ensure on-chain execution for approved proposals.
3.  Maintain Guardian oversight to rescind adopted requests.

### 6\. Implementation

1.  Changes take effect immediately where feasible.
2.  Features not supported by Snapshot remain disabled until OCG is live.
3.  Contributors are authorized to deploy necessary smart contracts post-design, development, and audits.

### 7\. Iterative Improvements

1.  Run the system as a public beta to identify friction points or flaws.
2.  Significant changes require additional YIPs for approval.
3.  veYFI voters can propose design adjustments through new proposals.

### 8\. Use at Own Risk

Yearn protocols are governed by veYFI holders, who make strategic decisions. Contributors are not liable for failures or losses resulting from veYFI or governance usage.

## Vote

### Non-binding signaling poll

Proceed with this proposal in its current form?

-   Yes
-   No

0 voters

## References

1.  [YIP-65: Evolving YFI Tokenomics](https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/11994)
2.  [YIP-73: Activate veYFI Rewards with dYFI Gauges](https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-dyfi-gauges/13414)

## Changelog

-   Initial draft
-   Assigning YIP#
