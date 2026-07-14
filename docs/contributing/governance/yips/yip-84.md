---
title: "YIP-84: Proposal to rotate multisig signer"
hide_title: true
sidebar_position: -84
---

# YIP-84: Proposal to rotate multisig signer

| Metadata | Details |
| --- | --- |
| YIP | 84 |
| Outcome | **Passed** |
| Authors | wavey |
| Created | 2025-04-13 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-84-proposal-to-rotate-multisig-signer/14469) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xeecd2a9ca79f9b22071d79d436a7e5ccc56593eb4c3bc8ef1b57c8389809a101) |
| Vote result | For: 318.69; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-84-proposal-to-rotate-multisig-signer/14469) |

## Overview

If enacted, this proposal replaces multisig signer Monoloco with new signer Ephy and transfers 1 YFI to Ephy as compensation. Additionally, it will update active signer Lumberg’s address to reflect a routine personal key rotation.

## Background

Yearn’s main multisig, [ychad.eth](https://etherscan.io/address/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52), is a 6 of 9 multisig which has key powers within the protocol. For more information, including the current list of signers, please refer to [the docs](https://docs.yearn.fi/developers/security/multisig).

As established in [YIP-79](https://gov.yearn.fi/t/yip-79-multisig-compensation-and-rotation/14179), signers who rotate on to the multisig shall receive 1 YFI compensation.

This rotation was initiated at the request of Monoloco, who has stepped back from active involvement in DeFi. We extend our gratitude to him for his contributions and dedicated service.

The proposed incoming signer is **Ephy**, Dewiz.xyz co-founder, a well-regarded contributor in the [Maker / Sky](https://forum.sky.money/u/0x3phemeralsoul/summary) ecosystem and a former MakerDAO Core Unit contributor. You can find more about Ephy on [X](https://x.com/0x3phemeralsoul) and [GitHub](https://github.com/0x3phemeralsoul).

## Specification

1.  Replace the following signer:
    -   outgoing: `0x1496546f89fc1605880e556c9a1d6c5e2409fb0a` (Monoloco)
    -   incoming: `0x5Db9926c93085a92F14A85daBF6FF27b07362Cae` (Ephy)
2.  Transfer 1 YFI from ychad.eth to Ephy’s signer address.
3.  Rotate Lumberg’s key:
    -   outgoing: `0x7321ED86B0Eb914b789D6A4CcBDd3bB10f367153` (Lumberg old)
    -   incoming: `0xeA6c0837fef621E77329f85820F503cA09f2B3a9` (Lumberg new)

## Poll

-   Yes - in favor
-   No - not in favor

0 voters
