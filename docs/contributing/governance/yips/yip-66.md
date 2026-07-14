---
title: "YIP-66: Streamlining contributor compensation"
hide_title: true
sidebar_position: -66
---

# YIP-66: Streamlining contributor compensation

| Metadata | Details |
| --- | --- |
| YIP | 66 |
| Outcome | **Passed** |
| Authors | 15 members of the Compensation group inc @0xJiji |
| Created | 2022-02-05 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-66-streamlining-contributor-compensation/12247) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:ybaby.eth/proposal/0x804d3765e70d6e4f0f0a225222dadd396cd328595d5fd097b732b36fdf8e6af6) |
| Vote result | Yes, I support this proposal: 476.03; No, I'm against this proposal: 1 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-66.md) |

## Summary

Builds on top of the recently adopted YFI Tokenomics program to simplify Yearn contributor compensation through the introduction of a yDiscount program. Migrates and retires the previous contributor vesting and strategist compensation schemes.

## Abstract

**If adopted**, this proposal seeks to streamline future Yearn contributor compensation through the following steps:
1. Establish that contributors moving forward should all be primarily compensated using the same baseline mechanism, consisting of payouts in stables.
1. As an extension to the baseline mechanism, introduce a new method of rewarding Yearn contributors with YFI tokens, yDiscount, where:
   * Contributors will be able to purchase discounted YFI up to their current monthly compensation level.
   * All the purchased YFI gets locked into veYFI immediately.
   * The discount ranges from 10-60% of current market price, determined by the duration of each contributor's veYFI lock.
3. Retire the use of YFI vesting contracts, and migrate existing contracts to the new mechanism, giving those with remaining vests two options to choose from, either:
   * Lock their entire remaining vesting YFI amount into veYFI for an equal or greater duration; or
   * Release them from their vesting contracts, taking a haircut on the YFI they receive, determined by the remaining duration of their vesting package. 
4. Retire Strategist performance fee sharing, and "buy out" existing Strategies in production from this system:
   * Each affected strategist receive a payout based on their net earnings from Strategies.
   * The payout is a multiple of their average historical monthly net earnings, paid out as locked veYFI.
   * The multiple ranges from 3-18 and is determined by the duration of their veYFI lock. 
   * Strategist total compensation (including migration) is expected to be  be more or less on the same level as before.
5. Instruct yBudget to set funds aside for a dedicated team budget for Strategists, to be used at their discretion, including to help onboard and retain new team members.

## Background
### An extension of YIP-65

This proposal picks up one of the future possibilities outlined in YIP-65: Evolving YFI Tokenomics[[1]](#references) where a future time-locking mechanism of YFI is integrated with how contributors get rewarded. While it is not required, it is recommended that the reader first familiarize themselves with the concepts of YIP-65 in order to better understand this proposal.

### Out of scope

The following topics were intentionally not covered by this proposal:

* **Coordinape & one-time grants.** Coordinape[[2]](#references) is used as a mechanism to distribute rewards for smaller and/or less regular contributions. Occassionaly one-time grants are also being paid by Treasury. These mechanisms are not covered by this proposal and remain as is.
* **Contributor compensation specifics.** This is not a proposal about who should get how much, or how this is decided. For the sake of this proposal, it is simply assumed that there is some group of contributors getting some compensation, which is allocated in some pre-determined way.

### The evolution of compensation

* **Strategists get 10% performance fee.** 
YIP-52: Make Strategist Skin in Game Partner for Make Benefit of Glorious Brain of Yearn[[3]](#references) makes a distinction of "Strategists", the group of individual contributors that write autonomous investment strategies to be attached to vaults, and considers them separate from the rest of the contributors. 

   With the passing of YIP-52, the 20% performance fee from vaults and strategies is split equally between Treasury and Strategists, with the intention that this is going to be the only compensation for the latter:

   > **Survival of the fittest.** Strategists should “eat what they kill”, rewarding only the most ambitious and best performing, filtering out the rest.

   Regular protocol contributors are being paid in stables from Treasury, income which is formalized by the establishment of the Operations Fund with the passing of YIP-54.[[4]](#references)

* **The mint introduces vesting YFI to new and existing contributors.** The Treasury receives 6,666 YFI with the passing of YIP-57: Funding Yearn's Future[[5]](#references), and a mandate to allocate ~1/3rd of those to existing contributor vesting packages. Four strategists also receives vesting packages at this point[[6]](#references), in recognition of their service, and in an early contradiction to the "eat what you kill" spirit of YIP-52.
   
   The Yearn treasury explicitly has a right of first refusal to buy back YFI from team members, and selling tokens is explicitly frowned upon and strongly advised against.

* **Governance 2.0 and beyond.** From the passing of YIP-61: Governance 2.0[[7]](#references), the yPeople team is responsible for making final compensation and onboarding decisions, guided by the advice of other contributors, and with the backing of a budget allocation from yBudget / Treasury. Newcomers joining full time tend to get rewarded with stablecoins and YFI vesting packages. Strategists earn the 10% performance fee, and as they get onboarded to become regular contributors, they also earn YFI vesting packages. 

### Key Learnings

* **Strategists are a part of Yearn.** They are not outsiders, they are a fundamental part of the Yearn community.
* **Strategists work as a team.** They do not work as single individuals following the "you eat what you kill" logic, they work in groups and as a team of teams, some of the most sovereign and well functioning within the Yearn community. They have established profit sharing amongst themselves, strategy committees, and a "Strategist Multisig" pool in which strategists donate 5% of their earnings to spend on various initiatives. 
* **Performance is a team job.** While Strategists write profitable strategies, they are not alone responsible for vault performance. Protocol developers write vault upgrades, Security reviewers audit both vaults and strategies, the Web teams maintain the front-end, yMechanics protect against MEV and improves harvesting margins, the Growth team promotes the product, and the Partnership team helps integrators bring TVL, while banteg keeps the morale up across the board with exquisitely curated hentai. To name a few. It's a team effort that makes Yearn into what it is. 
* **Contributors work fluidly across teams and roles.** Contributing to Yearn comes with a lot of freedom, and trying to "assign" a contributor a role or a particular team or identity is more odd than helpful. One contributor can have many roles at the same time: They might be a Strategist, but also work in the Web team, while taking onboarding decisions in yPeople.
* **Legacy compensation packages cloud forward looking compensation.** The first vesting packages were awarded to long time contributors that contributed Yearn in the very early days, with no expectation of compensation. These are naturally greater than the packages awarded to new joiners today. Contributors still get anchored to the legacy packages.
* **The "No YFI dumping" rule is unfair and strikes unevenly.** Some contributors are forced to sell YFI to pay for their taxes, others are not. YFI is fairly liquid, selling these quantities does not impact the markets. And even if it did, it's not  clear that it would be a net negative for Yearn: If a contributor dumps their YFI making the YFI price drop, it creates a buying opportunity for Treasury buybacks.
* **YFI price volatility makes vesting unfair.** Joining when the YFI/USD $60k or $30k gives you at completely different perspective on vesting amounts. It is extremely difficult to account for this fairly when onboarding new contributors and avoid some from feeling short changed.
* **Complexity and effort does not scale with TVL.** The 10% performance fee to Strategists was a wild success. So much that our TVL and Yearn community grew and evolved. Yearn is completely different at $5bn TVL than it was at $500m TVL.
* **Unclear what happens once the vesting expires.** The vesting packages are for 3 years, with the olders having ~1.5 years left to vest. It's undetermined what will happen once these expire.


### Snapshot of current state
#### Vesting packages

As of Jan 06 2022 there were **35** active vesting packages, with a total of **1689.91 YFI** remaining to vest. See below chart for a breakdown of duration.

![image alt](https://svgshare.com/i/dLp.svg)

#### Strategists performance share

In Q4 2021, contributing Strategists earned $5,142,137 in performance fees net.

From this, they donated 5%, or $257,107 to a Strategy Multi-sig treasury that gives grants to newcomers and strategists who do not have a strategy in production. 

There are in total eight strategists who are considered full-time contributors with strategies active in production.

These eight received on average ~$203,543/month in Q4.

```
Q4 2021 10% perf fee share, net     = $ 5,142,137
less 5% sms donation                -     257,107
per full time strategist                      / 8
per month                                     / 3
-------------------------------------------------
avg strategist $/month              = $   203,543
```
 
## Motivation
### Benefits

The following are some of the ways how the new compensation process is expected to improve over the previous state:

* All contributors come under one single system
* Historical vesting packages and strategist comps are removed from the compensation equation, making only recent contributions relevant 
* YFI allocation is handled by the contributors themselves, reducing process and decision complexity, and improving decentralization of decision making
* Allows all contributors to align themselves to YFI according to their own preferences
* Directly ties into the veYFI tokenomics design
* Removes the need for a "no YFI dumping rule"
* Supports contributors working in many different roles and teams at the same time
* Can run autonomously for an indefinite period, there's no expiry date on the design

### Expected financial impact
#### yDiscount

* Generates revenue for Treasury that can be spent on more YFI buybacks
* Depletes treasury of YFI from the mint, at the rate contributors decide to spend their earnings on buying YFI. 

#### Vesting migration

The impact can be said to be somewhere inbetween the two extremes of possible outcomes:

* **If all choose to migrate and lock for at least as long as their current vesting package**, then the impact on Treasury funds is 0.
* **If all choose to take the haircut**, then the Treasury would stand to save 394.6 YFI in returns from the vesting packages, using the Jan 06 data provided above, or ~23% of what's remaining in the active vesting packages.

In other words, migrating the vesting contracts will result in immediate savings of 0-394.6 YFI. The saved YFI can subsequently be used in the yDiscount program.

#### Strategist performance fee migration

Similarly, if we as per above assume eight strategists that earn on average $200k/mo net, the impact of retiring the perfomance fee sharing can be measured against the possible extreme outcomes of their choices.

```
Total net strategy earnings = 8 strategists x $200k/mo = $1.6m/mo
```

veYFI_lock | Combined Monthly Multiple | Amount to lock in veYFI (USD) |
|---|---:|---:|
| All lock min: 6 months or less | 3 | $4.8m |
| All lock for 1 year | 9 | $14.4m | 
| All lock max: 4 years | 18 | $28.8m |

In other words, buying out strategists from the 10% performance fee arrangements is likely to result in YFI in the range of ~$5-25m to be locked into veYFI. In addition, at current performance, Treasury will be earning an additional ~$5.1m per quarter from increased performance fees. This will in turn be partially offset by an increase in the costs of compensation as the eight strategists now come to earn in the same system as all the others contributors. Strategist total compensation (including migration) is expected to be  be more or less on the same level as before.

### Mechanics of the design

Both the migration of vesting packages and the performance fee sharing, as well as the yDiscount program creates a trade-off for contributors that can be expressed as: 

_The longer you lock YFI as veYFI, the more rewards you earn._

This by design allows each contributor to lock veYFI in whatever duration they feel suitable, and acts as a proxy to their long term conviction of Yearn's future. Those with the longest time preference, benefit the most. In turn, since each contributor can only have one veYFI lock in the address where they receive compensation, they will need to continuously extend the lock in order to earn the same benefit. This in turn creates a trade-off where:

_If you want to exit veYFI, you will earn less and less until your lock period expires._

This suggests that while the migration and the yDiscount program as proposed may offer seemingly generous rewards at a first glance, the impact of time-locking (and the required constant extension of the lock in order to continue earning the same rewards) should not be underestimated.  

### Future possibilities

* Simple, self-governing compensation mechanics can be used to make onboarding and offboarding more autonomous, reducing the decision making burden

### Risks

* **Individual contributor tax position may become negatively affected.** This is highly dependent on the tax jurisdiction of contributors and their personal tax situation. All contributors are advised to seek relevant tax advice to meet their individual needs and circumstances.
* **Migration offers may be too generous.** By design, this proposal errs on the side of being more generous towards contributors than less. The reason for this is simple: Yearn's most valuable assets are its group of contributors. The current onboarding climate in web3 is extremely competitive. Saving a couple of YFI for the Treasury is simply not worth while if it risks alienating key contributors in the process.
* **The migration process is one way.** Once vesting contracts and strategists payments have been migrated, resulting payments cannot be clawed back. There is no return.  
* **Existing contributors may leave.** Further to the previous point, once the migration has happened, it's possible that current contributors decide to leave as they now have less to lose in doing so. To be clear, this is not considered a likely outcome, it is the opinion of the authors of this proposal that those who contribute frequently to Yearn today do so primarily out of a high degree of conviction. Nevertheless, this is by design considered an acceptable risk, and may be a net positive if it was to materialize: The migration creates a natural moment of opportunity for those that are less motivated to contribute to Yearn to exit. This in turn creates opportunity for others to step up and fill their shoes. By ensuring that only those with true conviction remain, this could be a chance to make Yearn's culture stronger.
* **Onboarding of new strategists may be negatively affected.** Currently the 10% performance fee acts as a form of marketing tool to draw attention and attract new talent to write strategies for Yearn vaults. Whilst the strategists would still be compensated, this marketing tool may be lost and this may adversely affect onboarding. On the other hand, the way it is advertised today might also be considered “false advertising”, as it’s hardly a “set it and forget it” type of task that earns passive income. Instead it’s a complex effort to maintain a Yearn strategy and vault in production, requiring more resources than its single author, and as committees have shown, rewards end up being shared among several either way. There is currently no strategy live at Yearn that is the result of a solo effort. Part time strategists would be able to contribute and be compensated as they are today, through grants from the Strategist's multi-sig.

### Alternatives considered

* Rather than YFI discounts when purchasing, instead offer bonus YFI when contributors make veYFI deposits. This however means it's hard to track where this YFI comes from and opens up for this to be gamed.
* Traditional options model detached from the YFI Tokenomics program.

## Specification
### 0. The below goes into effect with veYFI

* This entire proposal is blocked by the introduction of `veYFI`, as outlined in YIP-65 (phase 2 and onwards).
* None of these changes go into effect before veYFI has been released to production.
* Once veYFI has been released, these changes may be implemented at the discretion of Yearn's community of contributors. 

### 1. Contributor compensation is streamlined to one single process that is equal to all 

* All frequent and regularly contributing members are paid the same way.
* Compensation is in stablecoins, or equivalent.
* Spending on compensation remains at the discretion of yBudget/Treasury as per Governance 2.0.
* Individual contributor compensation remains at the discretion of yPeople as per Governance 2.0.
* This excludes occasional part-time grants and funding via Coordinape, which have their own separate procesess.

### 2. Contributors are rewarded with YFI tokens through yDiscount 

* All contributors being compensated as per the previous point have the option to purchase YFI through a new yDiscount program.
* Contributors can purchase YFI at discounts to current YFI market price, _subject to their current veYFI lock_. The longer the ve-YFI lock, the greater the discount.
* YFI purchased through this program are immediately locked into veYFI according to the duration of their lock.
* Contributors are only eligible to purchase YFI _up to 100% of the compensation amount they received that month_, once the discount has been factored in.
* Once feasible, the intention is to have these operations occuring on chain each month with contributors directly interacting with smart contracts. Until then, manual off-chain calculations are used.
* Contributors are only allowed to participate with one ethereum wallet address in the program, which can only have one single ve-YFI lock at any time. 
* Changing a participating wallet address is only permitted in exceptional circumstances and requires yPeople approval.
* The YFI minted with YIP-57 is used to finance this program, and once this has been depleted, yBudget will allocate YFI from treasury buybacks.
* Funds received from contributors participating in yDiscount is used for more YFI buybacks.
* yBudget has the power to pause the yDiscount program at their discretion.

#### ve-lock Discount

```
# yfi_discount: discount (%) of purchased YFI
# ve_lock: current weeks locked in veYFI
yfi_discount = 0.00245 * ve_lock + 0.0902
```

So if the coming veYFI implementation is with the following parameters:
```
min_lock_duration = 1 month, or 4 weeks
max_lock_duration = 4 years, or 208 weeks
```

Then the discount table would look as follows:

| % of max lock | duration | `ve_lock` | `yfi_discount` |
|---:|---|---:|---:|
|1.92% | 1 month |4 | 10% |
| 11.5% |6 months | 24 | 14.9% |
|25% | 1 year | 52 | 21.8% |
| 50% | 2 years | 104 | 34.5% |
|100% | 4 years | 208 | 60% |

#### YFI for purchase

```
# yfi_allowed: total YFI allowed to purchase this month
# comp: contributor compensation in stables this month
# yfi_price: current YFI price in stables
yfi_allowed = comp / (1 - yfi_discount) * yfi_price
```

#### Example

Alice is a contributor earning 3,000 DAI this month. The current price of YFI is 100,000 DAI. She has just extended her ve-lock to be 48% of max, or 99.84 weeks of 208 max possible (`ve_lock=99.84`). She therefore is entitled to purchase YFI at 33.4% discount (`yfi_discount=0.334`).

At the current price, factoring in the discount, Alice is entitled to purchase up to 0.04504504 YFI this way.

Alice decides to spend 1500 DAI to purchase 0.02252252 YFI this month, which immediately becomes locked into veYFI according to her existing lock.

### 3. Retire & Migrate YFI vesting contracts

1. Vesting contracts are no longer offered to contributors by default, and are only to be used in exceptional circumstances. Instead, yDiscount is the default method of YFI compensation.
1. Existing YFI vesting contract are migrated and closed down, with recipients having the choice of one of two options:
   1. **Full migration into veYFI.** If the contributor sets a veYFI lock that is equal or longer than their existing vesting package, 100% of their remaining vest is locked into veYFI.
      
      _Example: Bob has 1.5 years remaining to vest 9.731 YFI. Bob creates a veYFI lock of 2 years. The full 9.731 YFI is locked on his behalf into his veYFI lock._
   3. **Exit vesting package with a haircut.** For every 1 week remaining of a vesting package, the recipient takes a 0.25% haircut, and is paid out the remaining in unlocked YFI that they can do whatever they please with.
      
      _Example: Carol has 98.321 weeks left to vest 18.821 YFI. She takes a 24.58% haircut (`98.321 x 0.25`) and is paid out 14.19 YFI._  

### 4. Retire Strategist performance fee sharing and buy out existing Strategies

1. Strategy authors are no longer offered the 10% performance fee share for new strategies that get deployed to Production, instead Treasury receives the full 2% management fee and 20% performance fee.
1. Strategists are compensated the same way as any other contributor: stablecoins + yOption system.
1. Strategies already in Production and earning 10% performance fee are "bought out" using the following scheme:
   * Earn `x` times previously averaged monthly earnings from the strategy, paid out as veYFI, where `x` depends on the veYFI lock: 
        ```
        # buy_out: total amount of YFI to be locked in the strategist's veYFI
        # net_earnings: strategist's average monthly earnings the past 6 months
        # x: multiple, depending on strategist's excisting veYFI lock
        # YFI_price: current YFI price in stables
        buy_out = (net_earnings * x) / yfi_price
        ```

        | % of max lock | duration | `ve_lock` | `x` |
        |---:|---|---:|---:|
        | < 12.5% | no lock or < 6 months | < 26 | 3 |
        | 12.5% |6 months | 26 | 6 |
        |25% | 1 year | 52 | 9 |
        | 50% | 2 years | 104 | 12 |
        |100% | 4 years | 208 | 18 |
        
       In other words, if a Strategist creates a veYFI lock for four years, they receive 18 months of their averaged earnings paid out as veYFI locked for four years.

   * Average monthly earnings is calculated as an average of the past six months, and is done with the help of each individual strategist, where __net earnings__ is calculated. Net earnings would include earnings from other strategies, committees, or strategists, and exclude payments made to committees, or strategists.

   _Example: David is a strategist with 2 strategies in Production and is also member of a committee. He donates 5% of his earnings to the Strategist Multisig. Looking back over the last 6 months, David's net earnings was on average $45,500/month. David creates a veYFI lock of 2 years. YFI/USD is $35,000. David receives 15.6 veYFI that are locked for 2 years._

### 5. Establish a dedicated team budget for Strategists

1. As a replacement for the donations to the Strategist Multisig, yBudget are instructed to set funds aside for a dedicated team budget for Strategists.
2. This can go to the existing Strategist Multisig wallet, no changes to signers are required.
3. Funds are to be used at the discretion of the Strategists, including to help onboard and retain new team members, but also any other activity that is not in conflict with Yearn spending policies. 

## Changelog

* Feb 01 2022: Rename yOptions to yDiscount, add another identified risk
* Feb 02: Make edits and clarifications as per feedback below

## References

1. https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/11994#future-possibilities-11
1. https://coordinape.com/
1. https://gov.yearn.fi/t/yip-52-make-strategist-skin-in-game-partner-for-make-benefit-of-glorious-brain-of-yearn/7856
1. https://gov.yearn.fi/t/yip-54-formalize-operations-funding/7956
1. https://gov.yearn.fi/t/yip-57-funding-yearns-future/9319
1. https://gov.yearn.fi/t/yearn-retention-packages/9698
1. https://gov.yearn.fi/t/yip-61-governance-2-0/10460
