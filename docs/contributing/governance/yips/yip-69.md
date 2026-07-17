---
title: "YIP-69: Reduce and cap fees through yRates"
hide_title: true
sidebar_position: -69
---

# YIP-69: Reduce and cap fees through yRates

| Metadata | Details |
| --- | --- |
| YIP | 69 |
| Outcome | **Passed** |
| Authors | banteg, flashfish, jiji, jmonteer, newmickymousse, saltyfacu, wavey |
| Created | 2022-06-17 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-69-reduce-and-cap-fees-through-yrates/12588) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:ybaby.eth/proposal/0xe4c2c990eaf4bb4a7a8031c461f5db820bae08fd7b81441d56e8cc0378c44afe) |
| Vote result | Yes: 912.03; No: 0 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-69.md) |

## Summary

Establish a new yTeam, **yRates**, and transfer to it the "Set Fees" power, with the requirement that earned  fees must never exceed the yield earned by vault depositors.

### Status

**Discussion**
This proposal is currently in the discussion phase. As per our voting rules outlined in YIP-55, it will be in discussion for at least 3 days with a non-binding forum poll to gauge sentiment before it can be assigned a YIP number and move to Snapshot for a binding vote.

## Background

In the previous bull market, opportunities were readily available, and Yearn vaults could generate high yields. Since the height of DeFi Summer those yields have shrunk, and it is now common for many crypto assets to return in the lower single-digit APRs.

Yearn vaults never deploy funds unless vault depositors profit from this, as this would add unnecessary risk to depositor funds. 

In current low APR environments, this rule forces Yearn vaults to have large amounts of capital uninvested, earning no income for depositors or the Yearn treasury.

### Current state of fees

As per YIP-51[[1]](#references), the current fee structure is:
- 2% management fee
- 20% performance fee
 
Fees are automatically levied on deployed capital only, and is the primary income source for the Yearn treasury. It finances protocol expenses including grants, gas costs, infrastructure, YFI buybacks, and more.

If a vault strategy is earning 2.5% APR or less, depositors stand to realize no profit on harvest (after the current mgmt + performance fees), which means that funds do not get deployed to this strategy. In such a scenario, some of the implications are that:

-   All strategies which earn between 0.5% - 2.5% APR become non-viable.
-   Yearn treasury earns no fees.
-   Yearn vaults require additional monitoring to react to situations where APR dips too low capital needs to be unallocated.

### yTeams

* As per YIP-61[[2]](#references), yTeams...

   > ...are small, autonomous groups of yearn contributors empowered by YFI holders to act independently in the best interest of Yearn within a constrained domain of action and with enumerated, discrete decision-making powers.

   Examples of existing yTeams are yBudget, yOps, and yPeople, each having their own distinct domain and decision-making powers.
* "Set Fees" power is currently with YFI holders, as per YIP-61[[2]](#references).
* YFI holders have the power to ratify new yTeams.
* The yOps team has the power to ratify new signers for yTeams.

## Motivation

Efforts are underway to evolve protocol operations across several areas to improve performance during the bear market.[[3]](#references) As part of this, a dedicated team that is responsible for product fee structures and can react on short notice will allow vaults to stay competitive with higher yields that draw more TVL.

This benefits all stakeholders: vault depositors earn more yield, yearn treasury accrues more fees, and YFI holders see more capital allocated for YFI buybacks.

By establishing strict fee guidelines, yTeam powers become better restricted. Vault depositors also get an understanding of the worst case impact of fees.

### Future possibilities

* **A fee dashboard** to visualize current fee structures across vaults to depositors and improve transparency.
* Delegation to veYFI[[4]](#references) lockers to **dynamically adjust fees** of vaults.

## Specification

1. Ratify a new yTeam, **yRates**. yOps is tasked with ratifying initial signers and quorum, but it must consist of at least four individual signers. This does not imply increasing full time grants, signers can be taken from the existing contributor pool. 
2. **Transfer the "Set Fees" power to yRates** from YFI holders.
3. Enforce a strict condition that **Yearn fees must never exceed the yield paid out to its vault depositors**, instructing yRates team members in their work to optimize fees to benefit both vault depositors and the Yearn treasury.
4. Moving forward, **the published quarterly financial reports[[5]](#references) should include an update prepared by yRates** on past fee structures performance and the future outlook. These updates should not block the publication of the report.

## References

1. https://gov.yearn.fi/t/yip-51-set-vault-v2-fee-structure/
2. https://gov.yearn.fi/t/yip-61-governance-2-0/
3. https://medium.com/iearn/building-during-bera-2209f44746fa
4. https://github.com/yearn/yearn-pm/tree/master/financials/reports
5. https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/
