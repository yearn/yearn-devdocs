---
title: "YIP-12: Reducing the quorum for accepting proposal"
hide_title: true
sidebar_position: -12
---

# YIP-12: Reducing the quorum for accepting proposal

| Metadata | Details |
| --- | --- |
| YIP | 12 |
| Outcome | **Passed** |
| Authors | illlefr4u |
| Created | 2020-07-24 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-12-reducing-the-quorum-for-accepting-proposal/578) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-12.md) |

## Simple Summary



At the moment, it is difficult for the Yearn governance mechanism to achieve a quorum of 33%. For the control system to function, the threshold must be lowered so that at least some decisions can be made.

## Abstract



It is proposed to reduce the quorum threshold for accepting the proposal to 20%.
At the moment, no changes to the on-chain are necessary, since the quorum check is currently being carried out off-chain. Thus, it is enough to simply make a decision by onchain voting.

## Motivation



At the moment, it is difficult for the Yearn governance mechanism to achieve a quorum of 33%. We could observe this even with the important proposal 1, which could not reach the quorum.
This is due to both:

- general passivity and lack of motivation to participate in governance system;
- negative motivation to participate (lock of funds).

Thus, Yearn protocol is under the threat of forever remaining as it is, since all proposals may not reach the required quorum (with a high probability, the activity in voting will only decrease over time).

There are many different solutions, which I will describe below, and I propose to start discussing them in the topic, but it is critical now to make a simple decision that will allow the protocol to evolve, and the community to make decisions on the development of the protocol.
In my opinion, such a decision may be to reduce the quorum threshold to 20%, which I put up for voting.

Other ways to solve the quorum problem:

- you get rewards for staking only if you vote;
- delegation of votes (implementation will take some time);
- quorum should be not for ALL tokens, but for only those “escrowed” to be voting;
- should have a quorum schedule which after x amount of time with no proposal meeting quorum the threshold goes down 1%-2% for year1, 0.5%-1% for year 2, etc.

**FOR**: The threshold for accepting the proposal drops to 20%.

**AGAINST**: No change for threshold.

## Metadata

| Name                | Value                                      |
| ------------------- | ------------------------------------------ |
| Proposed by         | 0x74630370197b4c4795bFEeF6645ee14F8cf8997D |
| Total for votes     | 5291919.8701 (66.22%)                      |
| Total against votes | 2699427.0543 (33.77%)                      |
| Quorum              | 39.76% ✔                                   |
| Start block         | 10522307                                   |
| End block           | 10539587                                   |

Source: [yieldfarming.info YFI Governance Information](https://yieldfarming.info/yearn/vote/)
