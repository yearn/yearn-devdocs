---
title: "YIP-42: Add RenBTC to yVaults"
hide_title: true
sidebar_position: -42
---

# YIP-42: Add RenBTC to yVaults

| Metadata | Details |
| --- | --- |
| YIP | 42 |
| Outcome | **Rejected** |
| Authors | zu-ctrl |
| Created | 08/26/2020 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/proposal-yrenbtc-delegated-vault/3470) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-42.md) |

## Simple Summary



Add RenBTC as a volatile asset to be used as collateral in delegated yVaults.

## Abstract



Add RenBTC as a volatile asset to be used as collateral in delegated yVaults.

## Motivation



wBTC has pretty good growth rates as seen on DeFi Pulse but as a custodial solution is hampered by trust-based systems which BTC holders do not by and large feel comfortable with.

RenBTC is a tokenized representation of BTC on the Ethereum blockchain. It is an ERC20, and backed 1:1 with real BTC locked in RenVM, a decentralized custodian. It is redeemable at any time for real BTC.

When Curve created an opportunity for RenBTC to generate returns, the RenVM TVL growth chart exploded. This is a clear signal that when the right solution is available, there is a LOT of BTC waiting on the sidelines to jump into farming yield on ETH. Let’s be there for them.

Refer to thread with an overwhelming majority FOR the BTC strategic focus. This is a vote to approve the current Strategy Smart contract to go live and start generating returns for RenBTC depositors without forcing them to figure out Curve deposits.

## Specification



The strategy linked to above models the current yYFI yVault strategy of farming CREAM and generating returns in more CREAM. We will require a new row in the yVault to accept RenBTC deposits.

> Strategy 1:

- Add a new Vault row in Table for yRenBTC Vault
- User deposits RenBTC start farming CREAM the same way as yYFI Vault, and deliver returns for depositors as RenBTC.

**For:** Yes! Add yRenBTC Vault Strategy 1 - StrategyCreamRENBTC

**Against:** No change.
