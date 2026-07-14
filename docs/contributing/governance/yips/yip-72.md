---
title: "YIP-72: Launch yETH"
hide_title: true
sidebar_position: -72
---

# YIP-72: Launch yETH

| Metadata | Details |
| --- | --- |
| YIP | 72 |
| Outcome | **Passed** |
| Authors | 0xkorin, 0xPickles |
| Created | 2023-04-21 |
| Forum discussion | [View discussion](https://gov.yearn.fi/t/proposal-launch-yeth/13158) |
| Snapshot vote | [View vote](https://snapshot.org/#/s:veyfi.eth/proposal/0x8969cde98d5d8a7be745e442a3288ce0cf3b35bf99ab72265f66c96d117a0f78) |
| Vote result | For: 152.37; Against: 0 |
| Source | [Source](https://github.com/yearn/YIPS/blob/master/YIPS/yip-72.md) |

## Summary



Launch yETH - a permissionless and self-governing representation of a basket of ETH Liquid Staking Tokens (LSDs).

## Abstract



**If adopted**, this proposal seeks to:
* Ratify the Design Specification of yETH and endorse its deployment.
* Specify the bootstrapping and implementation process.
* Specify parameters and initial configurations.
* Specify functionality during normal operations.

## Background

Yearn ETH (yETH) is minted when users deposit into a basket of various ETH Liquid Staking Tokens (LSDs). yETH enables reclaiming the deposited value and, when staked, earning the associated Ethereum PoS staking rewards with a more blended risk/reward profile through diversification of LSDs.

With an ever-growing number of LSDs, each has different yield, risk, and decentralization profiles, as well as varying degrees of market liquidity. Diversifying and hedging staked ETH positions across these protocols to reduce the impact of one failing is challenging. Market pricing inefficiencies can lead to trading opportunities against the underlying backed ETH value of the protocol. Staked ETH in a standard liquidity pool is not ideal from a collateral perspective, as the pool is only ever as safe as the least safe LSD in it. Meanwhile, new LSDs may struggle to grow and attract enough usage and liquidity to be competitive against protocols with large market share.

yETH is conceived as a solution to these challenges. 

### yETH in a nutshell

* The protocol functions as a Curve-style stable asset pool containing a dynamic number of assets. Unlike a Curve pool, the pool composition can fluctuate only within predefined ranges - each asset has a target weight as a % of total pool assets and a band within which it can fluctuate. This helps protect yETH's function as collateral in severe depegging or slashing events.
* Users deposit LSDs or ETH into the pool and receive yETH. Users burn yETH to receive LSDs.
* 1 yETH corresponds to 1 ETH staked in the underlying LSDs and owned by the yETH pool.
* Vanilla yETH does not earn yield. Instead, users stake yETH as Staked yETH (st-yETH) to earn compounded yETH according to the earnings of LSDs and other protocol rewards.
* Users can swap assets with the yETH pool, paying a fee to st-yETH holders.
* st-yETH holders govern all aspects of the protocol. They decide which LSDs to include in yETH, set the target composition of the pool, and configure protocol parameters.
* LSD protocols can use yETH as a liquidity source for their protocol. They can reward st-yETH holders for whitelisting the protocol in the yETH pool, for increasing the protocol’s relative weight in the pool, or increasing uptake and usage of their LSD.

### Design Principles

The yETH protocol is designed to be:

* **Self-governing.** yETH token holders (via st-yETH) control the protocol in its entirety.
* **Immutable.** yETH is not upgradable. Improvements require deploying a new version.
* **Trust-minimized.** No third-party should be able to access funds or alter the state of the protocol. Users remain in control of their own funds.
* **Autonomous.** Critical operation of yETH should not rely on any third-party individuals, group, or entity.

### Out of scope

Yearn contributors and YFI/veYFI token holders are not involved in:

- ETH staking.
- Operating ETH validators, Consensus Layer clients, or Execution Layer clients.
- Evaluating LSD protocols for yETH inclusion.
- Setting asset weights or altering yETH protocol behavior.
- Yield and product performance. This is determined by the protocol's configuration, which is governed by its users.

## Motivation



### Use Case Examples

* As a **user**, I can hold yETH to potentially achieve a better risk-adjusted yield than any single individual LSD.
* As a **searcher**, I can arbitrage yETH when price imbalances arise to earn profits.
* As a **DeFi protocol**, I can accept yETH as collateral and enjoy greater guarantees around its value compared to any single individual LSD token.
* As an **LSD protocol**, I can incentivize my token's inclusion in yETH to increase demand and usage while raising awareness of my product.

### Future Possibilities

* Use yETH as collateral in other smart contract systems, including Yearn.
* Deploy yETH-related vaults and strategies.
* Allow third parties to optimize asset weights and allocation permissionlessly.
* Introduce new smart contract systems/protocols for various asset types.

### Risks

Some potential risks include:

* An LSD in yETH experiences severe depegging, failure, or exploitation.
* A critical flaw in yETH's design or implementation results in unintended behavior.
* Poor asset choices or incorrect protocol parameters by st-yETH voters lead to subpar performance and functionality.
* Unattractive yield due to increased competition in ETH staking, causing reduced demand.

### Alternatives Considered

- Creating a Yearn-themed ETH LSD: Rejected due to lack of perceived competitive advantage over existing protocols.
- Utilizing an existing pool design: Rejected as no existing designs allow stable assets to be swapped within bands while their composition is dynamically updated.
- Granting veYFI governance power: Rejected to prevent yETH from becoming reliant on third-party operation and functionality.

## Specification


### 1. Design Spec

1. Approve the yETH protocol specification described in `SPECIFICATION.md` [[#1]](#references).

### 2. Role Assignment

1. **Treasury:** Yearn Treasury or an autonomous splitter contract directed by yBudget.
3. **Management:** yChad, to execute st-yETH voters' decisions only. Replaced by a smart contract after successful launch.
3. **Guardian:** "yETH-guard", a Gnosis Safe with a 2-of-7 signing threshold, consisting of Yearn contributors to monitor the protocol and trigger Pause mode if needed. Guardian participation is done on a gratuitous, volunteer basis–no duty of care or ongoing monitoring is assumed or implied.

### 3. Normal Operation Requirements

#### 3.1 Epochs & Voting

1. The duration of an Epoch is four weeks.
2. Epochs start every Thursday at `00:00:00 UTC`, aligning with Curve's veCRV epochs.
3. One week before the start of a new epoch is the voting period.
4. At the start of the voting period, a snapshot of st-yETH holders' voting power is taken, and st-yETH holders vote using this snapshot.
5. st-yETH voting power increases asymptotically weekly.
6. Vote weight of st-yETH tokens resets upon transfer.
7. There are three types of governance proposals:
   1. **Weight Allocations:** The distribution of yETH asset weight based on voter preferences.
   1. **Whitelisting Proposals:** The selection of assets for yETH inclusion.
   1. **General Proposals:** Suggested parameter changes and other matters.
8. Each voting period has one Weight Allocation vote and may have one Whitelisting vote (if there is at least one LSD protocol applying for inclusion), and any number of General Proposals to vote on. 
9. General proposal submission occurs in a dedicated Yearn governance forum section.
10. Voting starts with Snapshot, transitioning to on-chain later.
11. No quorum requirements.
12. Fractional voting is permitted.
13. Votes are final and irreversible.
14. General proposals require a 2/3 qualified majority vote (66.66% in favor).
15. General proposals execute in submission order; later proposals override earlier ones.
16. No proposals are accepted during active voting periods.
17. At the start of each epoch, new assets are whitelisted, approved proposals are enacted, and weight votes are applied.
18. Yearn contributors may add proposal warning notes but are not required to. No proposal review process exists.

#### 3.2 Whitelisting

1. Whitelisting is the process of adding an asset to yETH's composition.
1. Only one new asset can be whitelisted per epoch.
1. The maximum number of assets in yETH is 32.
1. LSD protocols seeking whitelisting pay an application fee (in yETH) before the voting period starts.
1. The application fee is distributed to the POL Contract.
1. Application fees are used to seed whitelisted assets into yETH, gradually introducing them into the asset composition.
1. The yETH used for seeding is distributed by the POL Contract to st-yETH holders as yield.
1. During the voting period, st-yETH holders vote on asset inclusion (if any).
1. Voters may choose not to whitelist any assets, maintaining yETH's current composition.
1. The option with the most votes is chosen as the outcome.
1. LSD protocols may apply for whitelisting in multiple epochs, paying application fees for each attempt.
1. Whitelisted assets start with a target weight near 0%, gradually increasing to the Initial Weight parameter, adjusting other assets accordingly.
1. A Rate Provider contract must be deployed before the whitelisted asset's inclusion.

#### 3.3 Parameters

Default values of the parameters below can be changed by st-yETH token holders voting to pass General governance proposals:

| Parameter | Description | Configurable Range | Default |
|---|---|---|---|
| `t_half` | Time taken to accumulate half the voting weight | 7-365 days | 60 days (180 days to reach 75% voting power) |
| Weight to be voted on | Weight allocated to each whitelisted asset for voting on reallocation per epoch | 1-33% | 10% |
| Amplification parameter `A` | Same property as in a typical Curve pool, determines the sensitivity to pool imbalances | N/A | 450 |
| Tolerance range | Permissible deviation range of assets from their target weight (configurable per asset) | +/- 100% | +/- 5% for all assets |
| Application Fee | Fee to apply for whitelisting as an LSD protocol | 0-10 yETH | 1 yETH | 
| Initial Weight | Initial weight assigned to a whitelisted asset | 0.1-1.0% | 1.0% |
| Pool Swap Fee | Fee charged for swapping assets with the pool, paid to st-yETH holders | 0.00-1.00% | 0.03% |
| Protocol Fee | Performance fee paid to Yearn Treasury | 5-20% | 10% |

#### 3.4 Incentives

1. yETH natively supports LSD protocols offering rewards as an incentive for st-YETH holders to integrate and support their respective protocols.
2. Any asset can be offered as a reward for passing a specific outcome of a Governance proposal (Weight allocation, Whitelisting, or Governance proposal).
3. Both positive (vote in favor) and negative (vote against) incentives are accepted.
4. Inventives can be posted during the three-week interval between voting rounds.
5. Incentives are not accepted during active voting rounds.
6. If an outcome doesn't occur, the poster can claim their incentive after the voting round concludes.
7. If an outcome occurs, incentives are distributed to **all** st-yETH voters who participated, regardless of their vote. 
8. A 1% fee on successful incentive rewards is paid to Yearn Treasury.  

#### Figure 1. Normal Operation Timeline
```markdown
|--week1--|--week2--|--week3--|--week4--|--week5--|...
| epoch 0                               | epoch 2...
| incentives for vote 1       | vote 1  | incentives for vote 2...
                              x st-yETH snapshot for vote 1
                                        x update yETH according to vote 1 results
                                        x distribute vote 1 incentives
```


### 4. Minting Permissions

Only three smart contracts are allowed to mint yETH:
   1. The Pool, holding LSD assets and minting yETH at a 1:1 ratio to the ETH equivalent of these assets.
   2. The Bootstrapper, used to launch yETH, with minting enabled only for a limited time period.
   3. The POL contract, providing protocol-owned liquidity in pools.

### 5. Bootstrapping Requirements

#### 5.1 Whitelist
1. Duration: 3 weeks
2. To be included in yETH bootstrapping, LSD protocols must pay a 1 ETH non-refundable fee, which turns into yield for st-yETH users.
3. Protocols then fill out a form with basic screening questions.
4. Yearn contributors review responses, filtering out fraudulent applications without evaluating protocol quality. They may add warnings, but their absence shouldn't imply support.
5. Screened LSD protocols are whitelisted for the bootstrap phase.

#### 5.2 Incentives
1. Duration: 2 weeks, overlapping the final week of whitelisting.
2. Incentive reward requirements resemble Normal Operation but prioritize votes for whitelisted LSD protocols during bootstrap.

#### 5.3 Deposit
1. Duration: 2 weeks, concurrent with the incentive phase.
2. Future yETH users deposit ETH in the Bootstrapper contract, receiving 1:1 st-yETH.
3. The contract logs its yETH debt.
4. Bootstrap st-yETH is locked for 16 weeks, unless the yETH pool is 'killed'.
5. At the deposit phase end, Bootstrapper disables deposits and yETH minting.

#### 5.4 Vote
1. Duration: 1 week, following Incentives.
2. Voting resembles Normal Operation but focuses on selecting LSD protocols for yETH at launch.
3. The top 5 LSDs with the most votes are included.
4. No single LSD can exceed 45% of the total pool weight.
5. If fewer than 5 LSDs apply, protocols with votes are included, and pool weight is assigned based on vote share.
6. Included LSDs have tolerance ranges of +/- 5%.

#### 5.5 Launch
1. Duration: 2 weeks (approx)
2. Incentive rewards are given to st-yETH holders who participated in voting.
3. Rate Provider contracts are deployed for each approved LSD.
4. 90% of deposited ETH buys LSDs for the initial yETH composition, as determined by voters.
    1. LSD purchases occur via yChad, using CowSwap and the Yearn SeaSolver (when possible) for best execution.
    2. Bought LSDs enter the yETH pool, minting yETH.
    3. This yETH repays the bootstrapper's debt (up to 90%).
    4. Surplus LSDs from market discounts are distributed as yield to st-yETH holders.
5. The remaining 10% of deposited ETH serves as POL.
6. A yETH/ETH Curve Pool is deployed.
7. A yETH/ETH Curve Pool Gauge is requested.
8. If a Gauge is approved, a yETH/ETH Curve yVault is deployed from the Yearn Curve Vault Factory.

#### Figure 2. Bootstrap Timeline
```markdown
|--week1--|--week2--|--week3--|--week4--|--week5--|--week6--|--week7--|...
| Whitelist                   |
                    | Incentive         |
                    | Deposit           |
                                        | Vote    | 
                                                  | Launch
```


### 6. Protocol Owned Liquidity

#### 6.1 Initialization
1. Transfer 10% of ETH acquired during Bootstrapping to the POL contract.
2. The debt owed to Bootstrapper contract is repaid during POL operations or in case of a Full Redemption.

#### 6.2 yETH Minting and Usage
1. The POL contract can only mint yETH equivalent to its available ETH.
2. yETH minted for POL is exclusively used to provide liquidity in various protocols.
3. The POL contract burns yETH after providing liquidity.

#### 6.3 POL Modules
1. POL operations are managed via privileged function calls through POL Modules attached to the POL Contract.
2. Function calls are executed by a Gnosis Safe multi-sig managed by the yETH yTeam.
3. The POL Contract transfers minted yETH to POL Modules for operations.
4. Call capabilities are limited to predefined operations for ongoing POL management, prohibiting arbitrary actions.
5. The POL contract and POL Module contracts are immutable.
6. POL Module contracts can be attached and detached to the POL contract with st-yETH voter approval.
7. The POL contract can be replaced via governance proposal approved by st-yETH voters.
8. At launch, there will be a yETH/ETH Curve pool POL Module and a Full Redemption Module.

#### 6.4 Full Redemption Module
1. If yETH pool enters "Killed" state (via st-yETH vote), the POL contract accepts redemptions.
2. The POL contract unwraps LP positions and burns excess yETH.
3. Users can send yETH to the POL contract to redeem ETH.
4. Received yETH repays outstanding Bootstrapper debt.

#### 6.5 Excess Assets
1. Unused ETH from bootstrapping may be converted into LSD tokens and deposited into yETH, to improve yield for st-yETH holders.
1. Excess resulting from POL operations can be:
   1. Divested to st-yETH holders as extra yield.
   2. Reinvested into expanded POL operations, such as additional liquidity pools or protocols to increase yETH liquidity.

### 7. Implementation
1. After this proposal's approval, yETH begins the bootstrapping phase.
2. Yearn contributors are mandated to execute and deploy contracts according to the design specification in this section.
3. Once yETH is operational and functioning correctly, Yearn contributors are mandated to codify all operations on-chain using smart contracts, achieving full immutability.
4. The aim is to achieve full immutability within 90 days of yETH operation.

### 8. Use at Own Risk
yETH is designed to be governed by its token holders who decide on assets to onboard and configure the protocol. Yearn contributors and YFI token holders are not involved and will not compensate users for any critical failure or loss of funds resulting from yETH usage.

## References

1. https://hackmd.io/@0xkorin/BJDmRreMh

## Changelog
- _Apr 13:_ Original post
- _Apr 17:_ Explicitly permit POL to convert ETH position into yETH (6.5.1), Add changelog section
