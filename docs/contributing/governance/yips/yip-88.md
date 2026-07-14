---
title: "YIP-88: Governance Overhaul"
hide_title: true
sidebar_position: -88
---

# YIP-88: Governance Overhaul

| Metadata | Details |
| --- | --- |
| YIP | 88 |
| Outcome | **Passed** |
| Authors | 0xPickles, governance team contributors |
| Created | 2025-09-28 |
| Forum discussion | [View discussion 1](https://gov.yearn.fi/t/yip-88-governance-overhaul-dao-restructuring/14553), [View discussion 2](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/14552), [View discussion 3](https://gov.yearn.fi/t/yip-88-governance-overhaul-incentives/14551) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x9b3a40326411eea6c51ec389a802ed695de53961fa49f6d3525e256513d0a7f9) |
| Vote result | For: 631.46; Against: 0 |
| Source | [Source 1](https://gov.yearn.fi/t/yip-88-governance-overhaul-dao-restructuring/14553), [Source 2](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/14552), [Source 3](https://gov.yearn.fi/t/yip-88-governance-overhaul-incentives/14551) |

## ⓵ DAO Restructuring

_Authors: 0xPickles and the governance team contributors_

### 1\. Summary

This proposal outlines the operational and financial restructuring of the Yearn DAO to focus all efforts on revenue generation and on-chain accountability.

**IMPORTANT NOTE:** This proposal is the first of three interconnected parts of a single initiative designed to overhaul Yearn’s operations, tokenomics, and contributor incentives.

-   **Part I: Operations & DAO Restructuring (This Proposal)**
-   [Part II: stYFI Tokenomics & Migration](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/)
-   [Part III: Contributor & Team Incentives](https://gov.yearn.fi/t/yip-88-governance-overhaul-incentives/)

All three parts will be discussed in parallel on the forum but will be voted on as a single, all-or-nothing package in one Snapshot vote for **YIP-XX**. If the unified proposal passes, all three parts will be implemented. If it fails, none will be.

#### 1.1 Status

**Discussion**  
This proposal is in the discussion phase. As per YIP-55, it will remain here for at least 3 days with a non-binding forum poll. If sentiment is positive, it can move to Snapshot for a binding vote by veYFI holders on the combined three parts (see Summary above).

### 2\. Abstract

**If the complete YIP-XX initiative is adopted**, this part of the proposal will:

-   Reorganize Yearn contributors around revenue-earning teams, except for a minimal DAO operations team.
-   Require all teams to use on-chain revenue splitters for transparent accounting.
-   Mandate on-chain financial reporting to justify all future budget requests.

### 3\. Background

Yearn’s current operational framework is the product of a multi-year evolution aimed at increasing decentralization and contributor autonomy. The foundational shift occurred with the passage of **YIP-61: Governance 2.0**[\[1\]], which dissolved a centralized operational group in favor of empowering smaller, independent teams (yTeams).

Initially, budget approvals were handled by a dedicated **yBudget** team. Over time, this process evolved further to decentralize decision-making, leading to the current **yBudget II council process**. In this system, all yTeams vote on contributor budget requests (BRs), with revenue-generating teams wielding outsized influence proportional to the revenue they contribute.

This model proved highly effective at instilling fiscal discipline and reducing operational overhead. By giving revenue-generating teams a stronger voice, the DAO successfully aligned its spending with its earnings, leading to significant cost reductions over the past year, essentially cutting the budget in half.

| Metric | yBudget II Epoch 1 (May-Jul 2024) | yBudget II Epoch 5 (May-Jul 2025) | Change |
| --- | --- | --- | --- |
| **Total Contributor Expenses** | $1,740,000 | $858,000 | **\-50.7%** |
| **Average Monthly Expenses** | $580,000 | $286,000 | **\-50.7%** |

However, as the DAO has matured, this structure has presented a new set of second-order challenges that now impede our efficiency and focus:

-   **Organizational Misalignment:** The system has seen an increase of non-revenue-earning teams relative to revenue-earning ones. While these teams perform necessary functions, it gives greater influence to initiatives that do not directly impact the bottom line, diluting the focus on profitability.
-   **The Free-Rider & Attribution Problem:** It is difficult to measure and attribute the value created by non-revenue teams. This creates a potential “free-riding” effect by Revenue Teams, where they benefit from the efforts of non-revenue teams, without this being attributed to the right place. This makes it difficult to assess true net profitability of efforts.
-   **Coordination Inefficiency:** The proliferation of many small yTeams, often with overlapping contributors, makes cross-team coordination complex and inefficient. This fragmentation hinders our ability to execute large, cohesive strategic initiatives.

These challenges indicate that while the `yBudget II` process was a successful evolutionary step for instilling fiscal discipline, the next phase of Yearn’s growth requires a more streamlined, explicitly revenue-focused operational model. This proposal builds on the successes of the past while directly addressing its emergent limitations.

### 4\. Motivation

The primary driver for this proposal is to reorient the entire Yearn DAO towards sustainable **growth and operational excellence**. The idea is to create a transparent and accountable framework that directly supports the value accrual mechanisms detailed in Part II and justifies the incentive structures in Part III.

The motivation for this specific operational model is rooted in several key principles:

-   **Center the org around autonomous, revenue-generating units:** The fundamental principle of this reorg is that teams should be structured as self-sufficient units focused on generating revenue. Each team should encompass all critical functions (e.g., development, strategy, marketing) needed to operate its products. This “full-circle” structure is essential for enabling clear Profit & Loss (P&L) attribution, allowing the DAO to accurately track all earnings and costs associated with each team.
-   **Move accountability on-chain:** Moving from off-chain tracking and manual reporting to on-chain revenue splitters and automated tracking provides unimpeachable, data in real-time. This empowers the DAO to make objective, data-driven decisions about resource allocation, ensuring that we fund what works and that every team’s contribution to the bottom line is clear.
-   **Maintain a lean and accountable support system:** Certain core functions are necessary for the DAO to operate. By defining a minimal, well-scoped DAO Operations (DAO-ops) team, we ensure this essential back-office work is supported. Crucially, this team remains fully accountable to the DAO, which can regularly review and justify its scope and budget, preventing operational bloat.
-   **Establish guidelines:** The transition to this new operational model will have complexities. This YIP intentionally avoids micromanaging that process. Instead, it establishes the foundational ground rules and clear end-state goals, empowering the teams themselves to collaborate and forge the most effective paths to implementation.

#### 4.1 Alternatives Considered

In developing this proposal, we evaluated several alternative paths for restructuring the DAO. These were considered and rejected for the following reasons:

-   **Merge into a single “Mono-Team”:** We considered dissolving all yTeams and consolidating contributors into a single, hierarchical organization. This was rejected as it introduces significant centralization vectors, creates single points of failure in management, and runs counter to the decentralized, autonomous ethos of Yearn. If the management of a mono-team fails, the entire DAO fails with it.
-   **Splinter the DAO completely:** We also considered breaking up the DAO entirely, allowing individual teams or products to spin out as independent entities. This was rejected because it would be massively value-destructive. The Yearn brand carries immense weight, trust, and recognition in the ecosystem, these are assets that have been built over years. Throwing that away would be a disservice to the protocol and all YFI holders.

#### 4.2 Out of Scope

-   The specific tokenomics of stYFI and revenue distribution mechanics (covered in Part II).
-   The allocation of treasury YFI for contributor and team incentives (covered in Part III).

### 5\. Specification

The following numbered requirements will be implemented to execute the operational and financial restructuring of the DAO.

#### 5.1 General Principles

1.  **Revenue-Centric Model**: All Yearn teams, with the exception of the DAO Operations (DAO-ops) team, will be reorganized to focus on specific, measurable revenue-generating activities.
2.  **Team Autonomy**: Revenue-earning teams will operate with a high degree of independence and self-reliance. They are responsible for managing their own product strategy, operations, and budgets to achieve their goals.

#### 5.2 Team Structure & Transition

3.  **Transition Process**: Existing yTeams are required to self-organize, merge, and restructure into cohesive, revenue-generating teams.
4.  **Transition Deadline**: The current yBudget II epoch concludes on **October 31, 2025, 23:59:59 UTC**. After this date, no BRs from non-revenue-earning teams will be approved for funding.
5.  **Hard Cutoff**: Contributors not formally part of an approved revenue-earning team or the DAO-ops team by the transition deadline will no longer be funded on a recurring basis.
6.  **One-Off Project Funding**: Non-recurring (and potentially non-revenue earning) work may still be funded via a direct BR. Such proposals must be for a specific project with a defined scope and end date, and not for ongoing contributor roles.

#### 5.3 DAO Operations (DAO-ops) Team

7.  **Scope Definition**: A single, non-revenue team, DAO-ops, will be maintained with a minimal scope, limited to:
    -   Create and Maintain DAO smart contracts (governance, treasury, rate providers, auctions, YFI tokenomics, etc.).
    -   Build and Maintain DAO governance and reporting infrastructure (budgets, proposals, treasury, voting, etc.).
    -   Performing essential administration directly related to the above tasks, like tweaking parameters, kicking auctions, and optimizing performance of these systems.
8.  **Technical Focus**: The DAO-ops team mandate is strictly technical and administrative. It does not manage community, marketing, social media, or communications, nor does it influence the strategy of revenue-earning teams.
9.  **Budget Approval**: The DAO-ops team must submit a formal Budget Request (BR) for approval following the passage of this YIP to secure funding and commence its work, and will need to continue to submit BRs on an ongoing basis as any other team.

#### 5.4 Revenue & Financial Reporting

10.  **On-Chain Revenue Splitters**: All team-generated revenue must be sent to designated splitter contracts on Ethereum mainnet. Teams are responsible for bridging funds to Ethereum mainnet in order to send to splitter contracts.
11.  **Initial Routing**: Initially, all splitters will be configured to route 100% of incoming revenue to the Yearn Treasury. This will be updated per the routing rules in Part II.
12.  **Approved Revenue Tokens**: Revenue must be sent in a format pre-approved by the DAO-ops team (e.g., stablecoins, WETH).
13.  **Mandatory On-Chain Reporting**: All budget requests must be justified by on-chain financial reporting that tracks total revenue contributed versus total budget utilized for that team.
14.  **On-Chain Budget Requests**: All team budget requests will ultimately be submitted on-chain using a standardized format to be defined by the DAO-ops team.

#### 5.5 Budgeting Process & Governance

15.  **Proposing New Revenue Teams**: Any group may propose a new revenue-earning team, which must commit to the mandatory on-chain reporting framework.
16.  **Budget Request (BR) Cadence**: As already is in place, team BRs will continue to be approved for a maximum duration of **three months**.
17.  **Fund Streaming**: Approved budgets will by default be streamed using existing contracts. There will be an option to request up-front payment as part of the BR.
18.  **Safeguard Mechanism**: yChad, and subsequently the DAO, will retain the ability to halt fund streams in clear cases of underperformance, malicious activity, or misuse of funds.

##### 5.5.1 Discretionary & Fast-Track Funding

19.  **Establishment of a Discretionary Fund**: A dedicated, on-chain fund will be established for urgent, sensitive, or unforeseen expenses that cannot go through the standard public proposal process (e.g., critical security audits, stealth projects).
20.  **Initial Funding**: The fund will be initialized with **$250,000** worth of stablecoins from the Treasury.
21.  **Management and Delegation**: The fund will be managed by yChad, who has the discretion to delegate its management to another designated multi-sig (or the YBC as described in Part III).
22.  **Accountability via Top-Up**: The fund can only be replenished via a formal proposal to the DAO. Such proposals must be accompanied by a report justifying past expenditures and are subject to a DAO vote.

##### 5.5.2 Transition to On-Chain Governance

23.  **Interim Budget Governance**: Following the transition deadline, budget approvals for the new revenue teams, the DAO-ops team, and any other proposal will continue to be decided by the existing yBudget II council process.
24.  **Transition to on-chain governance**: The DAO-ops team is responsible for designing, proposing, and implementing the final on-chain governance system for budget approvals.
25.  **Checks and Balances**: The transition to this final system is not automatic. It will occur only when the DAO-ops team deploys the necessary contracts, and yChad provides the final, binding sign-off, acting as a crucial backstop to prevent a premature or flawed rollout. The DAO-ops team’s continued funding during the interim period is contingent on making demonstrable progress, as judged by the yBudget II council.
26.  **Final Governance Structure**: Once the on-chain system is active, the yBudget II council will be dissolved. All budget decisions will be made via binding votes by stYFI holders. The concept of “team influence” will cease to exist; voting power will derive solely from an individual’s or entity’s stYFI stake (see part II).

#### 5.6 Governance System Implementation

27.  **System Design Mandate**: The DAO-ops team is delegated with the final implementation of the governance system.
28.  **Core Design Philosophy**: The guiding principles for development must be **simplicity and security**. Contracts should be as simple and immutable as possible to minimize attack surface.
29.  **Modularity**: While individual components should be immutable, the overall system must be modular, allowing for specific components to be replaced or upgraded over time via governance.
30.  **stYFI Compatibility**: The voting system must be designed to natively support the specific mechanics of stYFI outlined in Part II (e.g., time-weighted voting).
31.  **Leverage, Don’t Replicate**: The DAO-ops team should avoid over-complicating the system. It should leverage principles from battle-tested frameworks (e.g., Aragon[\[2\]], Ajna[\[3\]], Curve[\[4\]], yETH[\[5\]]) where possible but is not expected to be 1:1 compatible, prioritizing a simple and secure implementation that meets the core requirements.
32.  **Flexible Cadence**: The specific timing of governance epochs and voting rounds is left to the implementation phase and can be iterated on over time.

### 6\. Vote

This poll is for non-binding sentiment gauging on this specific part of the initiative. The final, binding vote will occur on Snapshot for the entire YIP-XX package.

#### Non-binding signaling poll

Do you support Part I (Operations & DAO Restructuring) as a component of the full proposal?

-   Yes
-   No

0 voters

### 7\. References

1.  [YIP-61: Governance 2.0](https://gov.yearn.fi/t/yip-61-governance-2-0/10460)
2.  [Aragon VE Governance - Aragon Docs](https://docs.aragon.org/ve-governance/1.0.0/index.html)
3.  [Grants | Ajna Protocol](https://faqs.ajna.finance/faqs/grants)
4.  [Curve.finance](https://www.curve.finance/dao/ethereum/proposals)
5.  [yETH](https://yeth.yearn.fi/vote)

### 8\. Changelog

-   **Aug 21, 2025:** First draft circulated with Yearn contributors and the governance team for initial feedback.
-   **Sep 03, 2025:** Contributor feedback incorporated. Second draft circulated to key governance participants and liquid locker teams (StakeDAO, Cove, 1UP) for feedback.
-   **Sep 25, 2025:** Revisions made based on comprehensive feedback from key stakeholders.
-   **Sep 28, 2025:** Proposal published on the Yearn governance forum.

## ⓶ stYFI

_Authors: 0xPickles and the governance team contributors_

### 1\. Summary

This proposal introduces stYFI, a new liquid governance and revenue-sharing token designed to replace veYFI, capture 90% of protocol revenue for stakers, and provide a clear migration path for current YFI stakeholders.

**IMPORTANT NOTE:** This proposal is the second of three interconnected parts of a single initiative designed to overhaul Yearn’s operations, tokenomics, and contributor incentives.

-   [Part I: Operations & DAO Restructuring](https://gov.yearn.fi/t/yip-88-governance-overhaul-dao-restructuring/14553)
-   **Part II: stYFI Tokenomics & Migration (This Proposal)**
-   [Part III: Contributor & Team Incentives](https://gov.yearn.fi/t/yip-88-governance-overhaul-incentives/)

All three parts will be discussed in parallel on the forum but will be voted on as a single, all-or-nothing package in one Snapshot vote for **YIP-XX**. If the unified proposal passes, all three parts will be implemented. If it fails, none will be.

#### 1.1 Status

**Discussion**  
This proposal is in the discussion phase. As per YIP-55, it will remain here for at least 3 days with a non-binding forum poll. If sentiment is positive, it can move to Snapshot for a binding vote by veYFI holders on the combined three parts (see Summary above).

### 2\. Abstract

**If the complete YIP-XX initiative is adopted**, this part of the proposal will:

-   Introduce stYFI as the new governance token with liquid staking/unstaking.
-   Route 90% of future protocol revenue to stYFI stakers.
-   Sunset the veYFI system and provide an opt-in migration path for holders.
-   Establish a redemption facility for existing Liquid Locker tokens.
-   Implement a yield backstop to de-risk the transition for early participants.

### 3\. Background

The existing veYFI tokenomics model was the result of a series of ambitious proposals designed to secure Yearn’s long-term success. To understand the need for change, it’s essential to first understand the original vision and then contrast it with the practical reality of its performance and technical limitations.

#### 3.1 The Vision for veYFI

The foundation for the current system was laid by **YIP-65: Evolving YFI Tokenomics**[\[1\]], with subsequent proposals like YIP-73[\[2\]] and YIP-81[\[3\]] building upon it. The vision was to create a powerful economic engine with three primary goals:

1.  **Promote long-term alignment** by requiring users to lock YFI for up to four years.
2.  **Enable strategic capital incentives** via gauges to direct dYFI emissions and attract TVL.
3.  **Secure Governance and provide yield** from protocol revenue buybacks.

#### 3.2 The Reality & Technical Failure of veYFI

Despite its well-intentioned design, the veYFI system has failed to achieve its objectives and is built on a technically flawed foundation, making a migration a necessity.

-   **Critically Low Participation:** Only **~3.8%** of the YFI supply is locked[\[4\]], a figure that is in decline. This demonstrates a fundamental lack of interest in the model.
-   **Fragile Foundation:** A low lock rate leaves governance overly exposed to manipulation. Moving to on-chain governance under these conditions would amplify the risk rather than reduce it.
-   **Imminent End of Rewards:** The gauge system is not only ineffective, but its rewards are nearly exhausted. Of the YFI bought back for the program, only **~230 YFI** remains for future emissions after accounting for all outstanding dYFI redemptions[\[5\]]. The program is on a mathematically certain path to ending, with or without this proposal.
-   **Ineffective, Self-Referential Incentives:** Over the past 10 epochs, **69% of dYFI emissions were directed to YFI-related pools**[\[5\]], creating a closed loop rather than attracting new capital to core products.
-   **Excessive Complexity:** The interplay between YFI, veYFI, dYFI, and gauges has been a significant barrier to entry for the broader community.

Crucially, _“doing nothing”_ is not an option. While the most severe bugs in the immutable veYFI contract have been temporarily mitigated, they remain unfixable at the contract level and pose material risks going forward:

1.  **Loss of Rewards for Relocking Users**  
    This bug, which blocks future rewards for users who let their lock expire and then re-lock, has been patched at the front-end level to prevent it from occurring. But it still lives in the contract and represents a hard failure for our most loyal users should the safeguard ever fail or be bypassed.
    
2.  **Reward Misaccounting & Vote Weight Corruption**  
    This timestamp handling bug (`block.timestamp % WEEK`) could cause misaccounting of rewards, DoS in claims, and, most critically, corruption of veYFI balances, leading to incorrect voting weights. It has not yet been triggered because Ethereum block times remain constant. However, with renewed community discussions about reducing block times, the likelihood of activation is increasing.
    

**In short:** these bugs have been held at bay, not fixed. What was once dormant risk is becoming live risk. With potential protocol-level changes on Ethereum, we must act proactively now rather than wait for a forced crisis.

Because these contracts cannot be patched, any attempt to “top up” veYFI or extend its life would be reckless. The only responsible path forward is a migration to a new, secure system.

### 4\. Motivation

The motivation for stYFI is to establish a new engine for Yearn’s growth, guided by a philosophy of simplicity, powerful incentives, and clear alignment between all stakeholders. This proposal aims to create a superior user experience and increased participation in Yearn Governance.

-   **Simplicity and Accessibility:** stYFI is simple: stake YFI, receive stYFI, earn revenue. A 14-day cooldown replaces the four-year lock, encouraging broad participation.
-   **Powerful, Real-Yield Incentives:** stYFI earns a direct share of protocol revenue, paid in a high-quality, yield-bearing stablecoin (e.g., yvUSDC). This creates positive economic reflexivity: as YFI’s price falls, the stablecoin APR rises, creating a natural demand floor.
-   **Secure and Aligned Governance:** Time-weighted voting power protects against flash loan attacks without sacrificing liquidity, while APR boosts for voting incentivize active participation.
-   **A New Social Contract:** This proposal creates a new deal. 90% of future revenue goes to stYFI holders, empowering them. Contributors are funded from the existing treasury (Part III), approved by DAO voters, and making them accountable to the same.
-   **A Fair Transition for veYFI Holders:** The migration plan is designed to recognize the commitment of early veYFI adopters, offering them an upgrade to a superior system with tangible benefits like a reward boost. Those that used liquid locker protocols will additionally have an optional exit path via the redemption facility.

### 5\. Specification

The following numbered requirements will be implemented to introduce the stYFI token, define its mechanics, and manage the transition from the veYFI system.

#### 5.1 Implementation Priority

1.  **Top Priority for DAO-ops**: The design, development, and deployment of the stYFI system as described in this Part II is the top priority for the DAO-ops team following the approval of this YIP.

#### 5.2 stYFI: The New Governance & Yield Token

##### 5.2.1 Staking & Unstaking Mechanics

2.  **Staking**: Users stake YFI on a 1:1 basis to receive the stYFI token.
3.  **Unstaking Cooldown**: Initiating an unstake begins a **14-day cooldown period**. No rewards or voting power accrue to YFI in cooldown.
4.  **Linear Streaming**: During the cooldown, the underlying YFI is streamed linearly, becoming progressively available for the user to claim.
5.  **Cooldown Reset**: If a user initiates a new unstake while a previous is in progress, the 14-day timer resets for the _entire_ remaining unstaking balance.

##### 5.2.2 Governance Rights & Voting Power

6.  **Sole Governance Token**: stYFI is the sole token for participating in Yearn governance.
7.  **Time-Weighted Voting Power**: A staker’s voting power scales up over four phases of continuous staking. (Phase duration tbd.)
    
    | Phase | Voting Power Multiplier |
    | --- | --- |
    | 0 (initial stake) | 0% |
    | 1 | 25% |
    | 2 | 50% |
    | 3 | 75% |
    | 4+ | 100% |
    
8.  **Governance Epochs**: Governance will operate in epochs of a duration to be determined by the DAO-ops team, but these epochs **cannot be shorter than 14 days**.
9.  **Initial Platform**: Snapshot may be used for binding votes initially, until an on-chain system is deployed.

##### 5.2.3 Revenue Distribution & Yield Boost

10.  **Revenue Share**: stYFI holders are entitled to a share of Yearn’s protocol revenue.
11.  **Reward Asset**: Rewards will be paid out in a single, pre-determined Yearn vault token (e.g., yvUSDS). The specific vault may be changed at the discretion of the DAO-ops team’s multi-sig.
12.  **Provisional APR Boost:** To encourage governance participation, DAO-ops is authorized to design and implement a gas-efficient and robust mechanism that increases yield for stYFI holders who are active in governance voting. The specific mechanism is not fixed in this proposal and may vary based on feasibility and security considerations. A key constraint is that stYFI holders who do not participate in governance at all **cannot have their yield reduced by more than 60%** compared to those who do.

##### 5.2.4 Protocol Revenue Routing

13.  **Treasury/stYFI Split**: Revenue will be split with a default of **90%** to stYFI Stakers and **10%** to the DAO Treasury. This split is a DAO-configurable parameter.
14.  **Definition of Revenue for Splitting:** The revenue split applies exclusively to **protocol revenue** (e.g., vault fees). It **does not apply** to assets already held within the DAO Treasury.
15.  **Token Conversion**: Revenue tokens will be converted to the reward asset via Yearn’s existing automated and permissionless treasury auction system.

#### 5.3 veYFI Migration & Integration Plan

##### 5.3.1 veYFI Holder Integration

16.  **Snapshot:** A snapshot of all veYFI balances will be taken from Ethereum block **23460759**, falling around the time this proposal is published.
17.  **Opt-In Migration**: To be eligible for rewards in the new system, existing veYFI holders (both direct and via liquid lockers) must **actively migrate** via a dedicated contract. This ensures rewards are concentrated among engaged participants.
18.  **veYFI Reward Boost**: To reward their long-term commitment, migrating veYFI holders will receive a **decaying reward multiplier** on their stYFI yield.
     1.  A 4-year lock (at the time of snapshot) will begin with a **2x multiplier**.
     2.  The multiplier will decay linearly to 1x as the lock approaches its expiry date.
     3.  Governance voting power is not affected by the reward boost.
19.  **No Lock Extensions**: This program is only applicable to existing lock durations. Extending a lock will have no impact on rewards earned and will not result in any additional compensation, it only extends the period YFI is locked for the user in the old defunct system.
20.  **Forfeiture on Early Exit**: If a user breaks their veYFI lock early, they forfeit all rights under this program.
21.  **Action Required at Lock Expiry:** Once a veYFI lock reaches its natural expiry date, it will no longer be eligible for this program. The holder must then withdraw their YFI and stake it directly into the stYFI contract to continue participating in governance and earning revenue share.

##### 5.3.2 dYFI and Gauges

22.  **Gauge Shutdown**: All active dYFI gauges will be shut down.
23.  **dYFI Deprecation**: This proposal deprecates the dYFI token.
24.  **dYFI Redemptions**: dYFI will remain redeemable for YFI under existing rules.

##### 5.3.3 Liquid Locker Redemption Facility

25.  **Precondition**: A Liquid Locker protocol must **permanently disable the minting of new locker tokens** and **permanently disable lock extensions** to become eligible for the redemption facility.
26.  **Redemption Mechanism**: The Yearn Treasury will allocate **up to a maximum of 600 YFI** to facilitate a redemption mechanism, allowing users to swap their liquid locker tokens back to YFI, and vice versa, at will, with deep liquidity and no slippage.
27.  **Fee Structure**: The redemption fee starts at **10%** and decreases linearly to **0.25%** over a four-year period.
28.  **Two-way conversion:** The redemption facility will also allow swapping YFI back to a liquid locker token of a user’s choice, at **no fee**.
29.  **Facility Duration:** The redemption facility will remain open for each protocol until the final expiry date of its underlying veYFI lock (or 4 years, whatever is shorter).
30.  **Final Wind-Down**: Upon the final expiry of a liquid locker’s veYFI lock, the redemption facility will serve as the primary mechanism for the protocol to redeem any remaining underlying YFI and distribute it back to its token holders, facilitating an orderly wind-down.

#### 5.4 Yield Backstop

31.  **Establishment of a Yield Backstop**: To de-risk the transition, the DAO will establish a yield backstop program specifically for migrated veYFI holders.
32.  **Duration and Cap**: The program will run for **3 years** or until a total of **$5 million** equivalent in rewards have been distributed to stYFI in total, whichever comes first.
33.  **Top-Up Mechanism**: Top-ups are calculated annually. If the total protocol revenue distributed to stYFI in a given year is less than **$1.67 million** equivalent, the Treasury will cover the shortfall.
34.  **Top-Up Asset and Recipient**: The top-up will be paid in **YFI** and distributed exclusively to **migrated veYFI holders**, streamed linearly over the 3 months following the year-end calculation.

### 6\. Vote

This poll is for non-binding sentiment gauging on this specific part of the initiative. The final, binding vote will occur on Snapshot for the entire YIP-XX package.

#### Non-binding signaling poll

Do you support Part II (stYFI Tokenomics & Migration) as a component of the full proposal?

-   Yes
-   No

0 voters

### 7\. References

1.  [YIP-65: Evolving YFI Tokenomics](https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/11994)
2.  [\[YIP-73\] Activate veYFI rewards with oYFI Gauges](https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-oyfi-gauges/13414)
3.  [YIP-81: Prepare for Full On-Chain Governance](https://gov.yearn.fi/t/yip-81-prepare-for-full-on-chain-governance/14282)
4.  [Yearn Wars](https://www.defiwars.xyz/wars/yearn)
5.  [dYFI Gauge Voting - Google Sheets](https://docs.google.com/spreadsheets/d/12KXbdJDsH1I5L3P0kgwKdIBBpyYtdwiGc5EnoxYlWFI/edit?gid=0#gid=0)

### 8\. Changelog

-   **Aug 21, 2025:** First draft circulated with Yearn contributors and the governance team for initial feedback.
-   **Sep 03, 2025:** Contributor feedback incorporated. Second draft circulated to key governance participants and liquid locker teams (StakeDAO, Cove, 1UP) for feedback.
-   **Sep 25, 2025:** Revisions made based on comprehensive feedback from key stakeholders. Major changes include:
    -   Added in-depth details of veYFI contract flaws.
    -   Generalized voting APR boost design, delegated implementation to DAO-ops
    -   Added opt-in migration for veYFI holders.
    -   Added a 2x decaying reward multiplier for veYFI holders.
    -   Added a 3-year, $5M yield backstop for the stYFI program migration.
-   **Sep 28, 2025:**
    -   Proposal published on the Yearn governance forum.
    -   Added block cut off for snapshot.

## ⓷ Incentives

_Authors: 0xPickles and the governance team contributors_

### 1\. Summary

This proposal allocates a portion of treasury-held YFI to create powerful, long-term incentive programs for core contributors and revenue-generating teams, directly aligning their success with the protocol’s profitability.

**IMPORTANT NOTE:** This proposal is the third of three interconnected parts of a single initiative designed to overhaul Yearn’s operations, tokenomics, and contributor incentives.

-   [Part I: Operations & DAO Restructuring](https://gov.yearn.fi/t/yip-88-governance-overhaul-dao-restructuring/)
-   [Part II: stYFI Tokenomics & Migration](https://gov.yearn.fi/t/yip-88-governance-overhaul-styfi/14552)
-   **Part III: Contributor & Team Incentives (This Proposal)**

All three parts will be discussed in parallel on the forum but will be voted on as a single, all-or-nothing package in one Snapshot vote for **YIP-XX**. If the unified proposal passes, all three parts will be implemented. If it fails, none will be.

#### 1.1 Status

**Discussion**  
This proposal is in the discussion phase. As per YIP-55, it will remain here for at least 3 days with a non-binding forum poll. If sentiment is positive, it can move to Snapshot for a binding vote by veYFI holders on the combined three parts (see Summary above).

### 2\. Abstract

**If the complete YIP-XX initiative is adopted**, this part of the proposal will:

-   Formalize a plan to deploy the remaining ~1,700 YFI already approved for strategic contributor incentives, alongside the remainder (~230 YFI) of the bought back YFI previously used for veYFI incentives.
-   Launch a second season of core contributor vests with a transparent “Accountability Package”.
-   Create a capped performance bonus program rewarding teams for net profit generation.
-   Establish a long-term contributor retention pool, The Yearn Builder’s Collective.

### 3\. Background

To execute the ambitious revenue-focused strategy in Part I and maximize value for stYFI holders in Part II, Yearn must attract, retain, and motivate top-tier talent. This proposal outlines a transparent and accountable plan for deploying existing treasury assets to achieve that goal.

#### 3.1 A Tale of Two Treasury Assets

The YFI held by the Yearn Treasury comes from two distinct sources:

1.  **The YIP-57 Strategic Operations Mint (~1,700 YFI):** YIP-57, passed nearly five years ago, gave the DAO an explicit mandate to use this YFI for strategic purposes, with contributor retention being a primary example[\[1\]]. This proposal does not ask for new YFI; it provides a transparent framework for deploying this already-approved asset.
2.  **The veYFI Program Remainder (~230 YFI):** The veYFI rewards program was funded by market buybacks. After accounting for all outstanding dYFI redemptions (~780 YFI)[\[3\]], only **~230 YFI** remains[\[2\]]. With the program sunsetting, this proposal seeks to repurpose this small remainder for productive use in the new incentive system.

This YIP therefore formalizes a plan for a total of **~1,930 YFI** (~1,700 + ~230). Approximately **88% of this allocation already has a clear mandate** for contributor incentives. We are bringing this unified plan to the DAO for a vote to ensure full transparency and to create a holistic, performance-driven system for its use.

#### 3.2 The Current Model: Stable Payments with Limited Alignment

For the past several years, contributors have been compensated primarily in stablecoins, based on their peers’ assessment of long-term value creation. This ensures predictable compensation but limits the direct link between contributors and the protocol’s growth. The proposed change does not replace stable payments as the main form of compensation; instead, it introduces YFI as an additional alignment mechanism. Revenues will flow more directly to teams holding YFI, reducing reliance on centralized assessment while tying contributors more closely to protocol performance.

### 4\. Motivation

The incentive programs in this proposal are designed to make contributors aligned partners in the success of the protocol, creating a flywheel of alignment where contributor success directly translates to stYFI holder yield. Key motivations include:

-   **Responsible Treasury Management:** This proposal provides a clear, accountable, and DAO-approved plan for deploying fragmented treasury assets, turning passive holdings into an active catalyst for growth.
-   **Elevating Ownership:** The ownership mindset is already central to how Yearn contributors operate. YFI rewards linked to performance build on this strength and give it lasting impact.
-   **Retaining Critical Talent:** The Core Contributor Vests are a direct tool to retain Yearn’s top talent in a highly competitive market.
-   **Driving Profitability:** The Team Performance Bonus creates a direct, meritocratic link between a team’s financial contribution and their compensation, maximizing efficiency and revenue growth.
-   **Ensuring Long-Term Alignment:** The Yearn Builder’s Collective (YBC) creates a powerful incentive for contributors not just to earn YFI, but to _hold and stake it_ for the long term.

### 5\. Specification

The following numbered requirements will be implemented to create the contributor and team incentive programs.

#### 5.1 Implementation Priority

1.  **DAO-ops Responsibility**: The DAOps team is responsible for the design, deployment, and implementation of all contracts and processes necessary for this incentive program.
2.  **Implementation Timeline**: This work is the top priority for the DAO-ops team immediately following the successful launch of the stYFI system described in Part II.

#### 5.2 YFI Incentive Allocation

3.  **Total Incentive Pool**: A total of **~1,930 YFI** is allocated for these programs. This comprises ~1,700 YFI from the strategic operations mint (YIP-57) and ~230 YFI from the veYFI program remainder.
4.  **Program Allocation**: This pool will be allocated as follows:
    -   Up to **1,111 YFI** for Season 2 Core Contributor Vests.
    -   Up to **600 YFI** for the Liquid Locker Redemption Facility (Part II)
    -   The remainder, initially **200-400 YFI**, will seed the Performance Bonus Program.
5.  **Redemption Facility Wind-Down:** Upon the conclusion of the Liquid Locker Redemption Facility, any unused YFI from its allocation will be transferred to the Performance Bonus Program.

#### 5.3 Core Contributor Vests (Season 2)

6.  **Allocation**: A fixed maximum of up to **1,111 YFI** is allocated for a second season of vests.
7.  **Vesting Terms**: Vests will have a **3-year linear duration** with a **6-month cliff**, upholding the successful precedent set by YIP-57.
8.  **Clawback**: Unvested portions can be clawed back to the treasury, a function initially controlled by yChad.
9.  **Accountability Package**: To ensure transparency, the volunteer compensation committee **must** publish a document on the governance forum detailing the following _before_ any vests are distributed:
    -   A pre-set **minimum and maximum number of recipients**.
    -   Clear, pre-defined **vesting criteria**.
    -   Clear, pre-defined **vesting tiers** (e.g., amounts per tier).
10.  **Community Review**: The publication of the Accountability Package will serve as a final sense-check, allowing the community to provide feedback before yChad gives the final sign-off to deploy the vesting contracts.

#### 5.4 Performance Bonus Program

11.  **Mechanism**: Revenue-generating teams are rewarded quarterly with YFI based on the net profit they generate, defined as `Revenue Contributed - Budget Utilized`.
12.  **Bonus Calculation**: The YFI reward is calculated as `total_profit / bonus_yfi_price`.
13.  **Bonus YFI Price**: The effective price of YFI is adjusted based on Yearn’s global quarter-over-quarter revenue growth: `bonus_yfi_price = yfi_market_price * (1 - revenue_growth_rate)`.
14.  **Configurable Growth Rate Cap**: The `revenue_growth_rate` is capped (default +/- 25%, max +/- 80%) and is a DAO-configurable parameter.
15.  **Bonus Cap**: The total market value of a team’s quarterly YFI bonus, calculated at the time of distribution, **cannot exceed 50% of the net profit** the team generated during that quarter.
16.  **Universal Bonus Split**: All YFI rewards from this program are subject to a governance configurable split: **67%** (default) to the team and **33%** (default) to the Yearn Builder’s Collective (as stYFI).
17.  **Bonus YFI**: Bonus YFI is unrestricted and can be used at the team’s full discretion.

#### 5.5 Yearn Builder’s Collective (YBC)

18.  **Purpose**: A long-term incentive pool for all whitelisted contributors, funded by a portion of all team performance bonuses.
19.  **Initial Whitelist**: The initial whitelist of YBC members will consist of all Season 2 Vest recipients as well as any yChad signer who wish to participate.
20.  **Bootstrap Seeding**: To bootstrap the pool’s weighting system, each initial member will be granted **0.01 stYFI** upon opting into participate in the pool. The pool itself will be seeded with up to **200 stYFI**, from the Performance Bonus Program.
21.  **Permanent Staking**: All YFI in the pool is permanently staked as stYFI to earn a share of protocol revenue. The underlying YFI can only be withdrawn back to the treasury by yChad, but may eventually become permanently locked in the future if the program proves successful.
22.  **Weighting**: A contributor’s claim on the pool’s yield is determined by the amount of stYFI they personally hold in their whitelisted address. They are free to top up, subject to cooldown to prevent abuse.
23.  **Pool Governance**: The whitelist of eligible contributors is governed by the members themselves, voting with their stYFI-based weight.
24.  **Yearn Governance Participation**: The stYFI held by the pool will be actively used to vote on Yearn governance proposals.
25.  **Principle of Good Faith**: The pool operates on a system of trust, where a member’s influence is based on their personal, long-term stake in the ecosystem. Actions that undermine this principle, such as borrowing YFI from third parties to temporarily inflate one’s weight, are considered a serious breach of trust.
26.  **Expulsion Process**: To protect the integrity of the pool, members can vote to expel (blacklist) another member for demonstrating bad faith.
27.  **Voting Requirement**: A proposal to blacklist a member requires a **two-thirds (66.7%) qualified majority vote** of the participating pool members to pass.
28.  **Vote Exclusion**: The stYFI weight of the member subject to the expulsion vote **will not** be counted in the vote’s tally.
29.  **Consequences**: If a member is expelled, their address is permanently removed from the whitelist and they forfeit the right to claim any future yield from the pool.

#### 5.6 Contributor Delegation Vault, the new yvYFI

21.  **Purpose**: To provide a simple, gas-efficient way for all YFI holders to maximize their stYFI yield.
22.  **Functionality**: The vault will automatically stake YFI into stYFI and vote on all governance proposals to ensure its depositors receive the maximum APR boost.
23.  **Voting Direction**: Voting decisions for the vault will be directed by the weighted vote of the members of the Yearn Builder’s Collective.

### 6\. Vote

#### Non-binding signaling poll

Do you support Part III (Contributor & Team Incentives) as a component of the full proposal?

-   Yes
-   No

0 voters

### 7\. References

1.  [YIP-57: Funding Yearn's Future](https://gov.yearn.fi/t/yip-57-funding-yearns-future/9319)
2.  [https://dune.com/tobytiger/yfi-buyback](https://dune.com/tobytiger/yfi-buyback)
3.  [ERC-20 Token | Address: 0x41252e86...b6797a275 | Etherscan](https://etherscan.io/token/0x41252e8691e964f7de35156b68493bab6797a275)

### 8\. Changelog

-   **Aug 21, 2025:** First draft circulated with Yearn contributors and the governance team for initial feedback.
-   **Sep 03, 2025:** Contributor feedback incorporated. Second draft circulated to key governance participants and liquid locker teams (StakeDAO, Cove, 1UP) for feedback.
-   **Sep 25, 2025:** Revisions made based on comprehensive feedback from key stakeholders. Major changes include:
    -   Updated to clarify the total YFI allocation, reflecting a more accurate breakdown of treasury assets and pre-existing mandates under YIP-57.
    -   Capped the team performance bonus at 50% of net profit.
    -   Added an “Accountability Package” for contributor vests, requiring public disclosure of recipient numbers, tiers, and criteria.
-   **Sep 28, 2025:** Proposal published on the Yearn governance forum.
