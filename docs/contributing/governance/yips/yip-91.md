---
title: "YIP-91: yTranche"
hide_title: true
sidebar_position: -91
---

# YIP-91: yTranche

| Metadata | Details |
| --- | --- |
| YIP | 91 |
| Outcome | **Passed** |
| Authors | Vaults Team |
| Created | 2026-07-06 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-91-ytranche/14659) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:styfi.eth/proposal/0xa348d353b66f46c6957a938a42fbf860eaffc855cd9163d8042780f65ea72612) |
| Vote result | For: 1155.89; Against: 11.98; Abstain: 0 |
| Source | [Source](https://gov.yearn.fi/t/yip-91-ytranche/14659) |

_Authors: Vaults Team_

## Summary

This proposal seeks endorsement to deploy yTranche across three underlying’s (USD, ETH, and BTC) and asks the Yearn Treasury to seed each system with initial capital in each of the tranches.

yTranche is a generalized, CLO-inspired tranching framework purpose-built for the next generation of Yearn vaults. It lets Yearn run a small number of trusted multi-strategy V3 vaults, doing what Yearn does best, earning the best verifiable risk-adjusted onchain yield, while splitting and structuring that yield into distinct risk/return profiles for different users.

## Status

**Passed**  
This proposal followed the voting rules outlined in YIP-55: after at least 3 days of discussion with a non-binding forum poll to gauge sentiment, it was assigned a YIP number and moved to Snapshot for a binding vote by stYFI holders, where it passed.

## Abstract

**If adopted**, this proposal will:

-   Endorse the yTranche framework as a tranching layer over Yearn V3 vaults.
-   Authorize the deployment of three initial yTranche systems on USD, ETH, and BTC.
-   Specify the initial tranche configuration (targets and excess-profit shares) for each system.
-   Authorize the Yearn Treasury to seed each system with protocol-supplied capital, including explicit equity tranche deposits.
-   Confirm that fee flow and operational covenants match existing V3 vaults, with the Treasury additionally exposed to equity-tranche performance.

## Background

DeFi is changing, and Yearn needs to adapt in order to stay at the front of it.

yvUSD has shown product-market fit for Yearn’s new, more risk-on, multi-chain, multi-asset allocator vaults. But a one-size-fits-all vault will never be compelling to the entire market. There are different users with different risk profiles and different return expectations: protocols and conservative allocators that want a safe, protected, and predictable source of yield, and risk-on users willing to take on loss exposure in exchange for higher potential returns.

Running a tranching system on top of our vaults lets Yearn simplify the operational work of doing what we do best, earning the best risk-adjusted onchain yield, in a verifiable way, while structuring the resulting yield in compelling ways for distinct audiences. The same trusted, audited V3 vault sits underneath; yTranche only changes how the yield and risk on top of it are divided.

More of the market is demanding explicit, protocol-supplied first-loss capital and visible skin in the game. Yearn has always been the anchor depositor in its own vaults and new products, and has historically tried, wherever possible, to cover losses realized by those vaults. However, over time it has become clear that implicitly backstopping every product is neither sustainable nor desirable, it creates open-ended liability and misaligned expectations and Yearn has not been properly compensated for this implicit risk.

Launching these systems lets us do this explicitly, thereby giving depositors and the DAO a clearer expectation of how losses are handled if they arrive. The tranching system gives the Yearn treasury larger upside returns when the vaults perform well and demonstrate that we are willing to put our own capital on the line in a defined, transparent way. This is not feasible to do across dozens of vaults, which is why we are continuing the consolidation of our offerings into a few select primary choices.

yTranche is a generalizable system that sits on top of any ERC-4626 vault, and allows fully configurable parameterization for intended outcomes. Each tranche is configured with both a “target rate” and an “excess split” allowing for any mix and match of the two for traditional Senior/Junior setups as well as more custom ones as explained below by combining into fixed, levered and equity style vaults.

## Motivation

### Why tranching, and why now

-   **A small, focused vault set, many products.** Consolidating into a few primary vaults concentrates liquidity, audit surface, and operational attention, while tranching restores the product variety the market wants on top.
-   **Explicit skin in the game.** Protocol-supplied equity tranche converts Yearn’s historic implicit backstop into a defined, onchain commitment with levered upside. This improves DAO alignment and clarifies depositor risk assumptions.
-   **Reaching new audiences.** A protected, predictable fixed tranche is suitable for protocols and conservative allocators that cannot or will not sit in a raw risk-on vault. A levered/equity tranche serves users who want amplified exposure to the same underlying yield.
-   **Generalizability.** One framework spans USD, ETH, and BTC today and can extend to new underlying’s as the market evolves, without re-architecting the vault layer.

### Future possibilities

-   Additional yTranche systems on new underlying’s as demand emerges.
-   Use of fixed-tranche positions as predictable collateral or treasury instruments by integrating protocols.
-   Migration of protocol seed capital from fixed/levered tranches into equity as each system matures and third-party TVL grows.

### Risks

These new systems will take on more risk than Yearn’s earlier primary “1” style V3 vaults. They will operate in the same way as we currently see with yvUSD; with the tranching allowing the lowest risk versions to meet or exceed the “1” risk levels. As with everything at Yearn, this will be done in a targeted way and only where the returns justify the risk. Potential risks include:

-   The underlying vault realizes a loss large enough to consume the equity position and impair the other tranches.
-   A flaw in the tranching contracts or their configuration causes unintended waterfall behavior.
-   Demand for one or more tranches is weaker than expected, reducing the efficiency of the structure.
-   Protocol capital placed in equity tranche is, by design, the first to absorb losses and can be partially or fully lost.

## Specification

### 1\. System overview

Each yTranche system is a set of ERC-4626 tranche strategies sharing a single Yearn V3 multi-strategy vault. Users deposit into a tranche rather than the vault directly. A controller keeps the economic accounting, priority order, target accrual, profit sharing, loss absorption, and an optional reserve buffer. Profit and loss move through a waterfall: targets accrue to each tranche in priority order, surplus is shared after the targets are hit, and any losses are absorbed first by any protocol-supplied buffer and then most junior to senior.

[![image](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/1/152cff5e5df891410356949b0fdb4170c0c0b9bb_2_690x450.png)

image1440×940 55.2 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/1/152cff5e5df891410356949b0fdb4170c0c0b9bb.png "image")

The system comes with built-in rate limits, global risk and emergency controls, shared authorization parameterization, report health checks and other features making sure Yearn continues to stay at the front of security and risk controls.

The three initial systems share this same structure and differ only in their underlying assets and parameters.

### 2\. Tranche configuration — initial deployments

While the tranching system itself is generic enough to hold any n number of tranches with infinite configuration options, only three systems are proposed at launch, on USD, ETH, and BTC.

The USD and ETH systems have three tranches, a fixed tranche, a levered tranche, and an equity tranche.

The BTC system launches with two tranches, a fixed tranche and an equity tranche, where the equity tranche carries the full excess share.

Each senior “fixed” tranche is built to be atomically liquid for both deposits and withdrawals, to give those users the classic Yearn vault experience. Then, the lower-tiered tranches will come with their own configurable “cooldown” and “withdraw window” periods for withdrawals.

Expected starting parameters are:  

[![image](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/b/b55390396c2e881e0ea832e57bd709c21e9de6f2_2_690x276.png)

image1440×578 41.6 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/b/b55390396c2e881e0ea832e57bd709c21e9de6f2.png "image")

**NOTE: All parameters are configurable and will be adjusted as needed according to market conditions or needs.**

**Note: Due to lower overall yields BTC will only have two tranches to start.**

### 3\. Funding

This proposal asks the Yearn Treasury to seed each system, placing protocol capital explicitly into the tranches below.

| System | Equity | Levered | Fixed | Source |
| --- | --- | --- | --- | --- |
| USD | $500k | $250k | $250k | Reallocated from the Treasury’s existing yvUSD position (no new deposit) |
| ETH | $500k | $250k | $250k | yETH recovery vault (reuses already-deployed WETH) |
| BTC | $250k | n/a | $250k | BTC (some may need to be acquired) |

Notes on the ask:

-   **USD** is funded entirely by restructuring the Treasury’s existing yvUSD position into the three USD tranches. Net Treasury exposure is unchanged; the same dollars are simply moved from sitting directly in yvUSD into the yTranche-USD strategies, which themselves sit in the vault.
-   **ETH** is funded through new strategies on the yETH recovery vault. All DAO-owned ETH is currently in this vault earning yield for the yETH recovery. This reuses the already-deployed WETH, and because the recovery vault’s capital earns the structured (and presumably higher) returns of the ETH system, it should see better net returns, increasing the rate of recovery.
-   **BTC** is funded with net new BTC, a portion of which may need to be acquired. The equity tranche carries the 100% excess share and acts as the system’s first-loss layer.

While the system allows for a specific protocol-supplied reserve buffer, that is not what the funds described above will be used for. A reserve buffer would take on all of the risk of first loss capital but hold none of the upside. Rather, we request Yearn to be the anchor depositor in the equity buckets. And while the equity layer does take on losses first, it also participates in the upside of the vaults when gross returns exceed the required minimums for the target rates.

An example of expected returns of each tranche at different net vault returns.  

[![image](https://europe1.discourse-cdn.com/flex013/uploads/yearn/optimized/2X/1/100b9b64c6b8efd0a6ca5e89c8b6ed0fe981b0f1_2_690x380.png)

image1440×794 91.8 KB

](https://europe1.discourse-cdn.com/flex013/uploads/yearn/original/2X/1/100b9b64c6b8efd0a6ca5e89c8b6ed0fe981b0f1.png "image")

**Maturation path.** As each product matures and third-party TVL grows, the expectation is that the protocol’s fixed and levered positions can be rolled into the equity tranche, freeing fixed/levered capacity for newer, higher TVL and concentrating Yearn’s exposure where its skin-in-the-game and potential upside is most meaningful.

### 4\. Fee flow and protocol return mechanics

Covenants and fee flow for the tranching systems match all existing V3 vaults: new revenue earned from these vaults flow directly to the staked-YFI splits, exactly as today.

In addition, Yearn earns the returns of the equity tranche positions themselves. At times when the systems outperform their expected target rates, the equity portion captures outsized returns; when they underperform, it absorbs outsized losses. The net effect is that Yearn earns a normal vault-level management/performance fee and holds additional, asymmetric skin in the game through the equity position. This keeps the protocol motivated to pursue the best yields while discouraging moving too far out on the risk curve.

### 5\. Roles and governance

Role assignment matches the current Yearn V3 vault setups. The tranching systems use the same management, keeper, guardian/emergency, and treasury role structure already in place for V3, rather than introducing a new governance surface.

## Implementation

The tranching contracts are currently in audit. Once the audit is complete, the systems will be deployed and configured over the coming weeks to months. Upon this proposal’s approval, Yearn contributors are authorized to deploy the three systems and seed the tranches as specified above.

Yearn contributors will continue to monitor and adjust the configuration parameters as needed based on market demands.

## Use at Own Risk

yTranche systems take on defined, structured risk on top of Yearn V3 vaults. Protocol-supplied equity tranches are explicitly first-loss and may be partially or fully lost. Yearn contributors and YFI/stYFI token holders are not obligated to compensate users for any failure or loss of funds resulting from the use of these systems.

## Vote

### Non-binding signaling poll

Proceed with this proposal in its current form?

**For**: Proceed with deployment and funding.

**Against**: Do not proceed with funding and eployment

**Poll**:

-   For
-   Against

0 voters

## References

1.  yTranche implementation — [GitHub - Schlagonia/ytranche · GitHub](https://github.com/Schlagonia/ytranche)
