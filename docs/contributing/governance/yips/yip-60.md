---
title: "YIP-60: Airdrops to Yearn Vaults"
hide_title: true
sidebar_position: -60
---

# YIP-60: Airdrops to Yearn Vaults

| Metadata | Details |
| --- | --- |
| YIP | 60 |
| Outcome | **Passed** |
| Authors | lehnberg |
| Created | 2021-04-07 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-60-airdrops-to-yearn-vaults/10356) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:ybaby.eth/proposal/QmNqAqRKMFcoRjaRYAKCVETij6sjJ4S1293kbpYDMVvcjB) |
| Vote result | Yes, support: 1,046.98; No, oppose: 0.05 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-60.md) |

## Authors

[@lehnberg](https://gov.yearn.fi/u/lehnberg)

## Summary

Formalize how airdrops to Yearn vaults are handled: Tokens that are worth the effort, are sustainably claimed and donated to the affected vault as its `want` token in order to boost the returns of vault depositors.

This, in order to be aligned with what is the fundamental proposition for end users and third party integrators alike: Having a gas efficient, frictionless, set-it-and-forget-it way of earning compounding returns through Yearn's vaults.

## Background

The Ellipsis airdrop[[0]](https://gov.yearn.fi/t/yip-60-airdrops-to-yearn-vaults/10356#References) and the resulting eligibility for the yveCRV to receive tokens over the course of a year has resulted in Yearn governance discussions[[1]](https://gov.yearn.fi/t/yip-60-airdrops-to-yearn-vaults/10356#References) about how this should be handled.

While this is the first airdrop of its kind, it is unlikely to be the last. It would be beneficial to agree on a general approach that outlines how these situations are to be handled.

### Airdrop factors

- Cost to claim. Claiming airdrops can involve manual work, sometimes on different chains than Ethereum, for uncertain rewards.
- Time periods to claim. Claiming may at times be done in one go, and other times over multiple times, sometimes lasting as long as a year or more.
- Relationships and image. Acting in bad faith, i.e. "claiming & dumping" can lead to exclusion from future airdrops, bad publicity, and being labeled as an adversary rather than a partner.
- Tokenomics. Depending on the protocol design, there can be lucrative farming opportunities or heavy penalties to incentivize good actors in the airdrop protocol. Considering these can lead to better rewards.

## Motivation

The rationale for this proposal is motivated by the following objectives:

- Do right by the vault's depositors. In principle, airdrops belong to whoever holds the private key. Practically, many vault depositors expect to benefit from airdrop proceeds. Yearn should do right by them, which in turn does good for Yearn's reputation and attracts more users of its products.
- Set expectations straight. At the moment, it is unclear what will happen in airdrop situations. Vault depositors should have clarity about what they should expect to happen.
- Do not overload Yearn's resources. Yearn's vaults are different, and airdrops are different. Subjective judgement about which airdrop to claim, and what the best way for realising it, is unavoidably going to be required. Airdrops should not end up becoming an effective Denial-of-Service attack on Yearn teams and distract them from delivering on existing roadmaps and priorities.
- Keep it simple. Yearn is meant to make DeFi simple, and should try to live up to that. Depositing a token into a Yearn vault shouldn't come with expectations of potentially having to deal with the handling of other unrelated tokens, possibly even accessible from other blockchains.
- Keep it composable. Yearn vaults are being used by end users, defi protocols, businesses, and other intelligent life such as smart contracts and robots. They should benefit from airdrops automatically, without no additional effort, letting rewards compound. This avoids unexpected behaviour and edge cases, making Yearn's vaults easier to integrate with.

## Specification

1. A decision is made whether the effort to claim a specific airdrop is worth while given other current priorities.
1. Specific claiming, farming, and token exchange strategies are determined on a case by case basis, depending on prevailing airdrop terms and market conditions, with the objective to maximize risk-adjusted returns.
1. Returns are used to boost the returns of the affected vault for the benefit of its current depositors. This is done by converting the returns into `want` tokens, and donating them to the vault in question, boosting the returns of each current tokenholder as a result.
1. Decisions on the details of the above steps are left to be taken by the Operations, Engineering, and Finance teams with the instruction to meet these instructions as best as possible. Decisions can be overruled as usual through the existing Multi-sig and Governance processes. Both groups should be kept up to date on airdrop claims as they progress.
