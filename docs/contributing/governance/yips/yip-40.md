---
title: "YIP-40: Replace inactive multisig signers"
hide_title: true
sidebar_position: -40
---

# YIP-40: Replace inactive multisig signers

| Metadata | Details |
| --- | --- |
| YIP | 40 |
| Outcome | **Passed** |
| Authors | illlefr4u, banteg |
| Created | 2020-08-24 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/change-participants-of-the-multisig-wallet/2991) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-40.md) |

## Summary

With more responsibilty for the multisig signers, four of the least active signers have decided to give up their slots for more engaged participants. This proposal replaces the four signers with new ones chosen based on activity and merit.

## Abstract

Currently executing a multisig transaction can often take up to 24 hours. With Andre’s pace of work and a rapidly changing environment, this creates problems and an unnecessary time gap. Multisig participants must be responsible, but they must also be constantly inside the project and take the necessary actions for its rapid development.

## Motivation

Yearn needs a multisig which will quickly implement the decisions made, while not violating the security of the funds under the wallet's control.

## Specification

### Overview

The following signers have given up their spots:

- Michael (Curve.fi)
- Cooper Turley
- Calvin Liu
- Damir Bandalo

After careful consideration and voting, we suggest these four nominees:

- Joe Mahon (Substreight)
- Tarun Chitra (Gauntlet)
- Vasiliy Shapovalov (p2p.org)
- Mariano Conti (ex-MakerDAO)

### Rationale

We need a strong and responsive protocol multisig which can figure stuff out when some of the members are not immediately available. See also the dicussion links for activity stats and further rationale.

### Technical Specification

To execute the transition we don't need to change the threshold, just execute 8 sequential multisig transactions:

1. Add 0x6E83d6f57012D74e0F131753f8B5Ab557824507D (Vasily)
2. Remove 0xFe45baf0F18c207152A807c1b05926583CFE2e4b (Michael)
3. Add 0x6F2A8Ee9452ba7d336b3fba03caC27f7818AeAD6 (Mariano)
4. Remove 0x59171b87817C5F07157066Bd5284707A711229B3 (Cooper)
5. Add 0x07425B7a76a52dE36dFA313E13E9E3a8DBC476CF (Tarun)
6. Remove 0xb0325DbE7fA891436E83A094f9F12848c78e449b (Calvin)
7. Add 0x50B0C406a5C1fC492F84c3F3D4552391cF4672f2 (Substreight)
8. Remove 0xa83838221278f22ee5bAe3E523f34D42b066D67D (Damir)

## Discussion

https://gov.yearn.fi/t/change-participants-of-the-multisig-wallet/2991

https://gov.yearn.fi/t/nominate-yourself-for-the-foundation-model/3166
