---
title: "YIP-68: Rotate multisig signers"
hide_title: true
sidebar_position: -68
---

# YIP-68: Rotate multisig signers

| Metadata | Details |
| --- | --- |
| YIP | 68 |
| Outcome | **Passed** |
| Authors | banteg |
| Created | 2022-06-16 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-68-rotate-multisig-signers/12582) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:ybaby.eth/proposal/0xc5386b7237f6c90359c56ac6dcb942b99a56a4de8ca60d109f4b999716148734) |
| Vote result | Yes: 844.37; No: 0 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-68.md) |

## Summary

Replace the three least active multisig signers with new people. After an [open call](
https://twitter.com/bantg/status/1533222650838908928
) and careful consideration, we've selected three candidates: 0xngmi, monoloco, and lefteris.
 
## Motivation

The multisig has been effectively operating as 6 of 6-7 with two signers being inactive and another one too busy with his own project. We appreciate their service, but we got to a threshold where we need another rotation. Here are the signing rates over the last two months, since 2022-04-13 till 2022-06-13.

```
owner
klim       100.0
cp0x        99.0
banteg      98.0
daryl       91.0
mariano     88.0
leo         77.0
--- cut here ---
vsh         39.0
devops       6.0
ryan         2.0
```

## **Specification**

Replace vsh, devops, ryan with 0xngmi, monoloco, and lefteris.
