---
title: "YIP-32: Remove YFI burning"
hide_title: true
sidebar_position: -32
---

# YIP-32: Remove YFI burning

| Metadata | Details |
| --- | --- |
| YIP | 32 |
| Outcome | **Passed** |
| Authors | alphastorm |
| Created | 2020-08-01 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-32-remove-yfi-burning/1907) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-32.md) |

## Simple Summary

Remove YFI burning from the protocol.

## Abstract

YFI represents a claim on Yearn protocol fees. To claim fees, YFI can either be burned or staked in the governance pool.

This YIP is to decide whether or not to keep the burning mechanism.

## Motivation

It makes no sense to burn because the price of YFI will always be higher than the claimable fee value. This is because YFI represents current assets in the fee pool plus future expected cashflows. Staking is just obviously better.

**FOR**: Remove YFI burning from the protocol.

**AGAINST**: No change (start burning YFI for fees).

## Metadata

| Name                | Value                                      |
| ------------------- | ------------------------------------------ |
| Proposed by         | 0x74630370197b4c4795bFEeF6645ee14F8cf8997D |
| Total for votes     | 3054.9983 (97.89%)                         |
| Total against votes | 65.8346 (2.10%)                            |
| Quorum              | 24.5% ✔                                    |
| Start block         | 10576777                                   |
| End block           | 10594057                                   |

Source: [yieldfarming.info YFI Governance Information](https://yieldfarming.info/yearn/vote/)
