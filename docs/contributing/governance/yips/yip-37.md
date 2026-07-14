---
title: "YIP-37: Participate in CRV governance and 2.5x CRV reward boost"
hide_title: true
sidebar_position: -37
---

# YIP-37: Participate in CRV governance and 2.5x CRV reward boost

| Metadata | Details |
| --- | --- |
| YIP | 37 |
| Outcome | **Passed** |
| Authors | andrecronje, banteg |
| Created | 2020-08-17 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/pre-crv-rewards-distribution-liquidation-or-boost/2481) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-37.md) |

## Summary

Use early LP rewards to enable YFI holders to participate in Curve DAO governance and vote-lock them for 4 years to boost yVault CRV generation by up to 2.5x.

## Abstract

All vested CRV tokens earned by StrategyYfii will be vote-locked to give YFI holders voting rights in Curve DAO and to boost the rewards earned by yCRV pool.

## Motivation

yVault currently holds 609,688 CRV with 1 year linear vesting. Starting August 28th, 2020, we can leverage these rewards to increase CRV generation and greatly incentivize capital inflow into Yearn.

## Specification

### Overview

Funnel all the vested CRV into 4 year vote lock and enable delegated voting with it with YFI.

### Rationale

Forum poll snapshot:

- 80% Participate in CRV governance and 2.5x boost
- 12% Distribute to YFI treasury and holders
- 8% Distribute to yVault LPs

### Technical Specification

- Total early LP CRV rewards collected: 609688.7992009243
  - 0x8816B2Fb982281c36E6c535B9e56B7a4417e68cF = 1606.9780365084564
  - 0xBE197E668D13746BB92E675dEa2868FF14dA0b73 = 39433.37196717059
  - 0x2De055fec2b826ed4A7478CeDDBefF82C1EdFA70 = 568648.4491972453
- Vesting: from 2020-08-13 to 2021-08-13
- Unlocked per day: 1670 CRV
