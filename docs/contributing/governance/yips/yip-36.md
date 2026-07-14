---
title: "YIP-36: System rewards as operational capital"
hide_title: true
sidebar_position: -36
---

# YIP-36: System rewards as operational capital

| Metadata | Details |
| --- | --- |
| YIP | 36 |
| Outcome | **Passed** |
| Authors | andrecronje, iTo, jchi18, banteg |
| Created | 2020-08-10 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/system-rewards-as-operational-capital/1974) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-36.md) |

## Simple Summary

Assign system rewards as operational capital for expenditures instead of streaming them to governance.

## Abstract

Cover operational expenses with no immediate issuance of YFI required.

## Motivation

The YFI community is currently working with Delphi and Gauntlet to develop an economic model and inflation schedule. Until this process is complete, the project lacks the funds for any operational expenses including, but not exclusive to, security audits, deployment costs, consulting expenses, and compensations.

But with the state of the market, the system rewards are adequately sufficient to cover operational expenses. The YIP proposes that the system rewards are directed to the multisig instead of streamed to governance stakers. This allows the multisig to cover operational expenses without minting additional YFI.

**FOR:** Use system rewards for operational expenses with \$500k treasury cap and surplus distributed to governance stakers.

**AGAINST:** Keep streaming rewards to governance stakers.

## Specification

100% of rewards collected by the system are directed to multisig treasury.

Treasury should maintain a buffer of 500,000 USD equivalent, with further rewards distributed to YFI staked in the governance pool.

All surplus rewards are directed to the governance pool.

## Metadata

| Name                | Value                                      |
| ------------------- | ------------------------------------------ |
| Proposed by         | 0x24394A4758DBdCf6fcbC14dc35af64Ac0D9a450A |
| Total for votes     | 2002.4442 (94.51%)                         |
| Total against votes | 116.1982 (5.48%)                           |
| Quorum              | 45.11% ✔                                   |
| Start block         | 10633194                                   |
| End block           | 10650474                                   |

Source: [yieldfarming.info YFI Governance Information](https://yieldfarming.info/yearn/vote/)
