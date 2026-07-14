---
title: "YIP-89: Proposal to Rotate Multisig Signers"
hide_title: true
sidebar_position: -89
---

# YIP-89: Proposal to Rotate Multisig Signers

| Metadata | Details |
| --- | --- |
| YIP | 89 |
| Outcome | **Passed** |
| Authors | wavey |
| Created | 2025-12-13 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-89-proposal-to-rotate-multisig-signers/14574) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x02ac9f5cc91ad090938195c37e17fd24941a668082b2b6b58f20e11e32d73003) |
| Vote result | For: 531.6; Against: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-89-proposal-to-rotate-multisig-signers/14574) |

# YIP-89: Proposal to Rotate Multisig Signers

## Summary

This proposal seeks to rotate a Yearn multisig signer by removing Daryl Lau and adding Omnifient as a replacement. As part of the signer onboarding process, 1 YFI will be transferred to the new signer.

* * *

## Motivation

The Yearn multisig is responsible for executing approved governance actions on behalf of the protocol, as outlined in the Yearn governance documentation:  
[https://docs.yearn.finance/governance/overview](https://docs.yearn.fi/developers/security/multisig)

Omnifient is a founding member of Katana and was previously part of the Polygon DeFi team and has worked with Yearn on multiple initiatives, including:

-   Launching the Katana pre-deposit vaults
-   Supporting the deployment of Yearn vaults on Katana

* * *

## Specification

If approved, the following actions will be taken by the Yearn multisig ([ychad.eth](https://etherscan.io/enslookup-search?search=ychad.eth)):

-   Remove Daryl Lau as a multisig signer `0x99BC02c239025E431D5741cC1DbA8CE77fc51CE3`
    
-   Add Omnifient as a multisig signer`0x70aF5a3368606c6557D2B3ce2EEC8796B914EAa3`
    
-   Transfer 1 YFI to the newly added signer
    

No changes to the multisig signing threshold or configuration are proposed.
