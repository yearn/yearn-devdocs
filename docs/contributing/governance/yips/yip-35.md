---
title: "YIP-35: Distribute Donations vs Purchase YFI"
hide_title: true
sidebar_position: -35
---

# YIP-35: Distribute Donations vs Purchase YFI

| Metadata | Details |
| --- | --- |
| YIP | 35 |
| Outcome | **Passed** |
| Authors | andrecronje, milkyklim |
| Created | 2020-08-10 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/distribution-donations-vs-purchasing-yfi/2244) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-35.md) |

## Simple Summary

Allow donors who donated to claim back donations or leave them to be used to purchase YFI.

## Abstract

While I am very appreciative of the donations, the [article](https://decrypt.co/37995/exclusive-yfi-andre-cronje-broke-quitting-defi) was a gross misrepresentation of our discussion. I am not in financial detriment, I do have debt, but I have assets in crypto to offset my fiat debt. I am simply not interested to swap my crypto to fiat, since I value my crypto more than fiat.

As such, I propose a small system, whereby donors can claim back their donations, should they wish. If however they do not claim it back by x date, then the funds (currently \$150,000) will be used to market buy YFI. I wish to use this YFI as a governance vote and we can also use it to incentivize other events or requirements.

## Motivation

Having spoken to donors, its a mix of “use it for the protocol” vs “it is an insult to return it”, so I wanted to come up with a new solution that benefits all participants.

**FOR**: Build the claim back and purchase system.

**AGAINST**: Return the donations.

## Specification

I will implement a simplistic contract that allows donors to reclaim, should they not wish to do so, after maturity date, YFI will be purchased and staked in governance.

## Metadata

| Name                | Value                                      |
| ------------------- | ------------------------------------------ |
| Proposed by         | 0x74630370197b4c4795bFEeF6645ee14F8cf8997D |
| Total for votes     | 1644.3648 (93.59%)                         |
| Total against votes | 112.4983 (6.40%)                           |
| Quorum              | 37.43% ✔                                   |
| Start block         | 10633099                                   |
| End block           | 10650379                                   |

Source: [yieldfarming.info YFI Governance Information](https://yieldfarming.info/yearn/vote/)
