---
title: "YIP-38: Distribute / Keep Balancer Rewards"
hide_title: true
sidebar_position: -38
---

# YIP-38: Distribute / Keep Balancer Rewards

| Metadata | Details |
| --- | --- |
| YIP | 38 |
| Outcome | **Passed** |
| Authors | milkyklim |
| Created | 08/18/2020 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-38-distribute-keep-balancer-rewards/2436) |
| Snapshot vote | Not recovered |
| Vote result | No Snapshot vote recovered. |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-38.md) |

## Simple Summary



Keep seized $BAL tokens as part of operational capital instead of distributing to old governance pool $BPT stakers.

## Abstract



~891 $BAL (~18500$) tokens were sent to one of the previous distribution pools. These tokens are seized and sitting in the multisig wallet now. We either have to distribute them or keep them for operational capital.

## Motivation



Since \$BALs belong to BPT stakers it is essential to decide what we should do with tokens.

However, the amount of $BAL seized is 3 times lower than protocol fees generated within a week (18k vs 60k). Therefore, I propose to keep $BALs in the multisig and count them towards operational capital, rather than writing a custom claim contract – this solution saves time and gas.

## Specification



### Overview



Largest staker should get ~31% (~5735$) of all $BAL tokens, see graph:

https://explore.duneanalytics.com/embed/query/7901/visualization/15749?api_key=8AAmxEmXrkxj56sw0hjDtrVbMN7jZtmsZ6SmZfFo 4

While this might sound impressive there are a bunch of small stakers eligible for less than 8$. Taking into account current gas prices, fact that people have to claim their $BAL themselves I argue that it is more reasonable to keep \$BAL as operational capital for the team.

Moreover, this proposal saves time as we skip writing a custom distribution contract.

### Rationale



Taking into account current gas prices, the fact that people have to claim their $BAL themselves I argue that it is more reasonable to keep $BAL as operational capital for the team.

**For:** Keep \$BAL for operational capital.

**Against:** Allow stakers to claim \$BAL.
