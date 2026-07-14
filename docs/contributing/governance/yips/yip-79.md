---
title: "YIP-79: Multisig Compensation and Rotation"
hide_title: true
sidebar_position: -79
---

# YIP-79: Multisig Compensation and Rotation

| Metadata | Details |
| --- | --- |
| YIP | 79 |
| Outcome | **Passed** |
| Authors | wavey |
| Created | 2024-09-26 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-79-multisig-compensation-and-rotation/14179) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xc7ded2863a10154b6b520921af4ada48d64d74e5b7989f98cdf073542b2e4411) |
| Vote result | For: 456.54; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-79-multisig-compensation-and-rotation/14179) |

### Proposal to rotate multisig signers and provide compensation

## Overview

Yearn’s main multisig, [ychad.eth](https://etherscan.io/address/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52), is a 6 of 9 multisig which has key powers within the protocol including ownership over the treasury. For more information, including the current list of signers, please refer to [the docs](https://docs.yearn.fi/developers/security/multisig).

This proposal aims to:

-   outline a YFI compensation plan for signers
-   rotate 3 multisig signers

## Compensation

Currently, ychad.eth signers earn no compensation. If passed, this proposal will:

-   retroactively reward all current signers (including outgoing, excluding incoming) 1 YFI each to compensate for past efforts.
-   reward all on-going signers (including incoming, excluding outgoing) with 1 YFI.

In summary, all signers who are part of both the past and present state will receive a transfer of 2 YFI. Signers who were part of only past or future state will receive a transfer of 1 YFI.

## Signer Rotation

A transaction to rotate the first two signers will be queued to execute immediately upon passage of this proposal. Due to prior commitments, the final seat will be rotated at the start of December of this year.

replace the following outgoing signers:

|  |  |
| --- | --- |
| cp0x | `0x74630370197b4c4795bFEeF6645ee14F8cf8997D` |
| milkyklim | `0x0Cec743b8CE4Ef8802cAc0e5df18a180ed8402A7` |
| \*\*banteg | `0x7A1057E6e9093DA9C1D4C1D049609B6889fC4c67` |

with the following incoming signers:

|  |  |
| --- | --- |
| cryptoharry (Inverse Finance) | `0x962228a90eaC69238c7D1F216d80037e61eA9255` |
| michwill (Curve Finance) | `0xFe45baf0F18c207152A807c1b05926583CFE2e4b` |
| \*\*tapir (Yearn Finance) | `0x700F1a984C962b447CcDb95c4c2D8074C65098a3` |

\*\* _To be executed in December_

## Poll

-   Yes - in favor
-   No - not in favor

0 voters
