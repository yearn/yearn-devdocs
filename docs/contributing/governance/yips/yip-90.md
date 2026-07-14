---
title: "YIP-90: yETH Optimistic Recovery Plan"
hide_title: true
sidebar_position: -90
---

# YIP-90: yETH Optimistic Recovery Plan

| Metadata | Details |
| --- | --- |
| YIP | 90 |
| Outcome | **Passed** |
| Authors | 0xPickles |
| Created | 2025-12-12 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/yip-90-yeth-optimistic-recovery-plan/14573) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0xe76f57663ce9311eb830ef097812702cbbb55fccbb280d254cdfc1f2c11c261a) |
| Vote result | For: 627.75; Against: 140.2 |
| Source | [Source](https://gov.yearn.fi/t/yip-90-yeth-optimistic-recovery-plan/14573) |

_Author: 0xPickles_

## tl;dr

-   **Zero Principal Spend:** No Treasury principal is spent or distributed. Treasury principal is never impaired and remains fully owned by Yearn.
-   **Balance Sheet Neutral & Runway Safe:** Treasury deploys its **existing ETH holdings (currently ~1,600 ETH)** toward recovery. No new ETH is purchased, exposure remains unchanged, and funds remain fully unwindable via governance.
-   **Immediate Recovery Boost:** Treasury forfeits its own **~334 ETH ($1M)** recovery claim, instantly boosting the user recovery floor from ~25% to **~30.38%**.
-   **Shared Investment:** stYFI holders opt-in to contribute 10% of protocol revenue temporarily, accelerating recovery and increasing stYFI’s long-term value flow.
-   **Voluntary:** Users opt-in voluntarily and can exit at any time. Early exits reduce the liability and speed up recovery for those who stay.
-   **No Solvency Risk:** This proposal does not impact Yearn solvency risk.

## 1\. Summary

This proposal establishes a **voluntary, DAO-wide recovery mechanism** for users affected by the yETH exploit. It combines the strength of the **Yearn Treasury’s balance sheet** with the cashflow power of **stYFI token holders** to provide a credible path to 100% recovery without spending Treasury principal.

This represents a **Unified Framework** where every stakeholder contributes proportionally in the recovery:

1.  **The Treasury** provides the capital base (principal protected).
2.  **stYFI Holders** provide the revenue stream (accelerant).
3.  **Users** provide the time and patience.

### 1.1 Status

**Discussion**  
This proposal is in the discussion phase. As per YIP-55, it will remain here for at least 3 days with a non-binding forum poll. If sentiment is positive, it can move to Snapshot for a binding vote.

## 2\. Abstract

If adopted, this proposal will:

-   Authorize the deployment of the **yETH Recovery Vault**.
-   Allocate **the Treasury’s existing ETH holdings** (~1600 ETH) toward recovery, with the intent to match net user losses over time through yield, recovered assets, early exits, and protocol revenue redirection. The principal remains under yChad multisig custody.
-   Authorize the **forfeiture of the Treasury’s claim** on recovered assets (~334.7 ETH), redistributing it to users to boost the immediate recovery floor.
-   Implement a temporary **Protocol Revenue Redirection**: adjusting the revenue split to **80% stYFI / 10% Treasury / 10% Recovery** until the debt is paid.
-   Establish a **90-day opt-in process** for users to claim their recovery tokens.
-   Delegate strategy management to the **Yearn Curation / SAM team**.

## 3\. Background

On Ethereum block **23,914,086**, the yETH weighted stableswap pool was exploited due to a vulnerability in the invariant solver logic.[\[1\]](#references) With the rapid assistance and collaboration by the **Dinero** and **Plume** teams, Yearn contributors were able to successfully recover approximately **857 pxETH** (~25% of the total loss).

**YIP-72 §8**[\[2\]](#references) explicitly protects the protocol from being _required_ to reimburse users. This clause was designed for existential-scale scenarios where reimbursement would threaten the protocol’s survival. However, this incident is not existential. The scale of the net deficit is within Yearn’s capacity to address through a coordinated, DAO-wide response, without spending Treasury principal or drawing down Treasury assets.

While Yearn is not obligated to act, this proposal posits that **user trust is a strategic imperative**. Future growth relies on the market knowing that Yearn aligns with its depositors. Unlike an external downstream failure (e.g., an LST in yETH de-pegging or being hacked), this issue originated within the yETH protocol logic itself. Consistent with previous responses to the **yvDAI incident**[\[3\]](#references) and the **Resupply incident**[\[4\]](#references), this proposal offers a recovery path that supports our users, protecting the “security-first” premium of the brand, without crossing the line into a principal-spending bailout.

### 3.1 Loss Breakdown (Summary Table)

| Component | Amount (ETH) | Notes |
| --- | --- | --- |
| Total Exploit Loss | 3,157.401 | Based on post-mortem data |
| Recovered assets | 857.490 | Already secured |
| Treasury Forfeiture | 334.807 | Boosts user floor to ~30.38% |
| Total Net User Loss | 1,965.104 | Loss minus recovered assets and minus Treasury forfeiture |

## 4\. Strategic Rationale

### 4.1 Why this is NOT a Bailout

This is a **mechanism**, not a bailout. The Treasury does not distribute funds; it simply allows its capital to generate yield for users. The protocol offers the engine; users choose their recovery timeline.

-   **Users who want immediate certainty** can exit around 30.38% of their pre-hack position.
-   **Users who want full recovery** stay and earn yield over time, paying with Time and Opportunity Cost.
-   **Treasury pays** with Yield (opportunity cost), not Principal.
-   **Protocol gains** by converting a liability into fee-generating TVL.

### 4.2 Positive Game Theory Mechanics

This structure creates a “Dissolving Debt Pool” with a self-reinforcing flywheel:

-   Users can exit immediately with ~30.38% of assets.
-   When users exit, the total debt liability decreases, but the Treasury’s yield-bearing capital remains.
-   As a result, the _Capital-to-Debt ratio improves_, and the recovery timeline for remaining users accelerates.

This transforms a static deficit into a dynamic, self-healing system where rational early exits enhance the recovery prospects for those who stay.

### 4.3 Why Treasury Guardians Should Support This

This proposal **does not lock the runway**.

-   **Market Exposure Neutrality:** The Treasury is already long ETH in Yearn vaults. Whether these vault tokens sit in Treasury or in a controlled recovery vault, market exposure is identical.
-   **Liquidity Flexibility:** If Yearn ever faces operational or runway needs, governance can unwind the position or parts of it as needed and return Treasury capital. This ensures the deposit never becomes a hard commitment and cannot threaten protocol solvency.

### 4.4 Why stYFI Holders Should Support This

The temporary 10% redirection is a **capital investment** into Yearn’s trust premium, to directly increase future stYFI revenue.

-   **Capital Recirculation:** The 10% redirected revenue is recycled through Yearn strategies, generating performance fees that flow back to stYFI. stYFI holders temporarily give up yield to grow future revenue.
-   **Positive ROI:** This turns a reputational hit into a credibility boost. Depositors gain confidence that Yearn stands behind them, a signal to support future TVL growth.
-   **Temporary:** This redirection is **explicitly temporary and self-terminating**: once users are made whole (`SharePrice = 1.0`), the full 90% revenue share automatically reverts to stYFI.

### 4.5 Long-term Benefits to Yearn

1.  **Revenue Growth:** Restoring trust accelerates TVL recovery, increasing protocol revenue long-term.
2.  **Brand Premium:** Reinforces Yearn as a security-first protocol, justifying its premium position versus competitors.
3.  **Governance Defense:** Pre-empts potential governance proposals that could force less capital-efficient bailouts or recoveries.

### 4.6 Scope Definition

**Out of Scope:** This framework applies **only** to the yETH exploit. It does not create any precedent or expectation of recovery for prior or future incidents on unrelated products (e.g., external integrations). It should not be interpreted as a standing commitment for future incidents.

## 5\. Mechanics & Specification

### 5.0 Immediate Post-Approval Actions

To avoid unnecessary delays and begin recovery as early as possible, the following actions will occur immediately upon proposal approval:

1.  **Recovered Asset Withdrawal:** All recovered apxETH will be processed through the Beacon Chain withdrawal queue as soon as technically possible.
2.  **Treasury Earmarking:** The Treasury’s ETH allocation for recovery will be explicitly earmarked at approval, even prior to Recovery Vault deployment.
3.  **Early Yield Accrual:** Once withdrawn, recovered ETH and earmarked Treasury ETH may begin generating yield for the benefit of users under existing Treasury controls.
4.  **Vault Migration:** Once the yETH Recovery Vault is deployed, all earmarked assets will be migrated into the vault, preserving continuity of yield.

### 5.1 Treasury Allocation & Principal Protection

1.  **Capital Match:** The Treasury allocates its existing ETH holdings toward the recovery mechanism. At the time of proposal, this represents approximately ~1,600 ETH. No new ETH is purchased for this purpose.
2.  **Principal Preservation:** This allocation is a **deposit**, not a payment. The Treasury retains full claim to all allocated principal, under the ultimate control of the **yChad multisig**, until users are made whole or governance elects to unwind the position.
3.  **Liquidity Escape Hatch:** This allocation remains **callable**. If the DAO faces a liquidity crisis, a governance proposal may be passed to withdraw the Treasury’s principal.

### 5.2 Treasury Forfeiture (The Boost)

4.  **Claim Forfeiture:** The Treasury forfeits its claim on the recovered assets (~334.7 ETH).
5.  **Effect:** This effectively makes the Treasury the **First-Loss Tranche**, immediately boosting the user recovery floor to **~30.38%** (roughly **$1M** in value transferred). This incentivizes early exits.

### 5.3 Protocol Revenue Redirection

6.  **New Split:** The revenue split[\[5\]](#references) is temporarily adjusted to: **80% stYFI / 10% Treasury / 10% Recovery**.
7.  **Cadence:** The revenue redirection follows the existing YIP-88 accounting cadence. Revenues continue to accrue to the Treasury and are distributed once stYFI emissions are live, and continues to be in line with the stYFI distribution model thereafter.
8.  **Duration:** This split remains active until users are made whole (`SharePrice = 1.0`), at which point the 10% reverts to stYFI holders.
9.  **Yield Backstop:** For the purpose of the veYFI yield backstop calculations established in YIP-88[\[6\]](#references), the 10% revenue redirected to the Recovery Vault will be treated as revenue distributed to stYFI. This ensures stYFI holders do not lose eligibility for any future backstop adjustments while the temporary redirection is active.
10.  **Optionality:** Like the Treasury capital, this redirection can be modified or ceased via governance if protocol needs change.

### 5.4 Vault Logic & Exit

11.  **Tokenization:** Users receive a transferable **ERC-20 token**, representing their pro-rata share of the recovery, that can be bought and sold on AMMs.
12.  **Yield:** 100% of yield (from Treasury deposit, recovered funds, and redirected revenue) flows to recovery token holders. **The Recovery Vault itself charges no fees**; only underlying strategies charge their standard performance/management fees (which flow to stYFI).
13.  **User Exit:** Users remain in **full control**. They may burn their tokens at any time to withdraw their share of the underlying assets (`SharePrice * Amount`).
14.  **Treasury Exit:** The Treasury withdraws its principal once users are made whole (`SharePrice = 1.0`) or via the Escape Hatch.

### 5.5 Snapshot & Integrator Claims

15.  **Snapshot Block:** Eligibility is based on `yETH` and `st-yETH` balances at the block immediately preceding the exploit (`23914085`).
16.  **Holder-is-Owner:** Claims are attributed to the address holding the tokens at the snapshot. For integrators and lending markets, the protocol contract is treated as the owner; they are responsible for downstream distributions. This ensures Yearn does not mediate internal accounting among third-party lenders and borrowers; integrators must resolve these allocations according to their own governance.
17.  **Verification Window:** A review period (7 days) will allow integrators to coordinate appropriate claim addresses via making public Pull Requests to the snapshot repo before distribution begins.
18.  **Passthrough Expectations:** For integrator-held positions, the intent of this framework is that recovery value ultimately accrues to the underlying economic beneficiaries. Integrators claiming recovery tokens are therefore encouraged to publicly disclose their passthrough methodology and timelines, and to distribute recovery principal and accrued yield on a pro-rata basis according to their own governance and accounting processes. Yearn contributors do not adjudicate downstream claims but will make reasonable efforts to provide technical assistance and coordination to integrators implementing such distributions.

### 5.6 Opt-In Process

19.  **Claim Window:** A Merkle Distributor will be deployed with a **90-day claim window**.
20.  **Active Yield:** Unclaimed funds remain in the pool during the window and generate yield, benefitting active participants.
21.  **Late Claims:** Users claiming after the window must submit a manual request. They will receive their portion of the recovered **principal only** (no accrued yield).

### 5.7 Yield Strategy

22.  **Delegation:** The **Yearn Curation / SAM** team is authorized to manage the underlying yield strategies.
23.  **Mandate:** Provide the best risk-adjusted yield without exposing Treasury capital to excessive risk.
24.  **Transparency:** Strategy allocations and changes will be announced to contributors for monitoring.
25.  **Candidates:** Yearn-Curated Morpho vaults, yvWETH-1 (V3), or diversified ETH-native baskets.

## 6\. Financial Impact

This proposal requires **no expenditure of Treasury principal**. The costs are solely the opportunity cost of yield on the matched ETH and a temporary investment of stYFI revenue.

In exchange, the protocol resolves a major incident, preserves its reputation, and demonstrates a unified front where all stakeholders contribute to the solution.

## 7\. Vote

This poll is for non-binding sentiment gauging. The final, binding vote will occur on Snapshot.

### Non-binding signaling poll

Do you support the proposal as it is written?

-   Yes
-   No

0 voters

## References

1.  **Incident Disclosure:** [yearn-security/disclosures/2025-12-01.md at master · yearn/yearn-security · GitHub](https://github.com/yearn/yearn-security/blob/master/disclosures/2025-12-01.md)
2.  **YIP-72 §8:** [YIP-72: Launch yETH](https://gov.yearn.fi/t/yip-72-launch-yeth/13158#p-33602-h-8-use-at-own-risk-37)
3.  **yvDAI incident:** [yearn-security/disclosures/2021-02-04.md at master · yearn/yearn-security · GitHub](https://github.com/yearn/yearn-security/blob/master/disclosures/2021-02-04.md)
4.  **YIP-86:** [https://gov.yearn.fi/t/yip-86-resupply-bad-debt-repayment-loan/](https://gov.yearn.fi/t/yip-86-resupply-bad-debt-repayment-loan/)
5.  **YIP-88 Revenue split:** [YIP-88: Governance Overhaul: ⓶ stYFI](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/14552#p-35807-h-524-protocol-revenue-routing-14)
6.  **YIP-88 Yield backstop:** [YIP-88: Governance Overhaul: ⓶ stYFI](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/14552#p-35807-h-54-yield-backstop-19)

## Changelog

-   **Dec 11, 2025:** First draft
-   **Dec 13, 2025:** Added section 5.0, updated loss breakdown and treasury amounts
-   **Dec 15, 2025:** Added point 5.18, Passtrough Expectations
-   **Dec 16, 2026:** Assigned YIP-90
