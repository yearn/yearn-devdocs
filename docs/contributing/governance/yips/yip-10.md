---
title: "YIP-10: Transitionary YFI Only Voting"
hide_title: true
sidebar_position: -10
---

# YIP-10: Transitionary YFI Only Voting

| Metadata | Details |
| --- | --- |
| YIP | 10 |
| Outcome | **Passed** |
| Authors | rewkang |
| Created | 2020-07-24 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-10-transitionary-yfi-only-voting/481) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-10.md) |

## Simple Summary



The current Yearn governance mechanism puts the protocol at risk of a hostile takeover. The best immediate course of action would be to temporarily transition the protocol to a new voting contract recently deployed by Andre.

## Abstract



Update the ygov.finance voting page to link to the new voting contract where only YFI can be staked.

Contract: [Etherscan](https://etherscan.io/address/0xad7e09665caa3404d9c6525d5997a10fc6c12cfe)

## Motivation



The current Yearn voting contract accepts BPT (Balancer Pool Tokens) from a pool consisting of 98% yCRV / 2% YFI. This creates a dynamic where large stablecoin holders hold a disproportionate amount of voting shares and thereby governance power, while those whom have a high proportion of YFI vs. stablecoin are underrepresented in governance. Governance should be dictated by those with the most vested long term interest of the protocol - YFI holders - irrespective of their portfolio composition. More importantly, the protocol is currently vulnerable to a hostile takeover of governance by stablecoin whales who could potentially pass a proposal to mint a large supply of YFI and disproportionately reward themselves (via favoring large stablecoin holders).

There are multiple different long term governance/voting approaches being debated, and it will take time to align on community consensus. While these are being analyzed/discussed, we should immediately transition to a temporary governance structure where only YFI can be used to vote in order to mitigate hostile takeover attacks.

The community can replace this temporary YFI only voting structure after passing a new YIP.

**FOR**: Governance moves to newly deployed YFI only voting contract.

**AGAINST**: No governance changes.

## Metadata

| Name                | Value                                      |
| ------------------- | ------------------------------------------ |
| Proposed by         | 0x09173487b272311Edda01F45f97911aEB6aBd602 |
| Total for votes     | 13641124.8956 (77.08%)                     |
| Total against votes | 4054142.5578 (22.91%)                      |
| Quorum              | 45.92% ✔                                   |
| Start block         | 10518707                                   |
| End block           | 10535987                                   |

Source: [yieldfarming.info YFI Governance Information](https://yieldfarming.info/yearn/vote/)
