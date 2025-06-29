---
rpcCalls:  
  - name: 'dYFI Redemption'
    chain: '1'
    address: '0x4707C855323545223fA2bA4150A83950F6F53b6E'
    abiName: 'dyfiRedemptionABI'
    methods:  
      - 'discount'
      - 'get_latest_price'
      - name: 'eth_required'
        args: ['1000000000000000000']
---

# Comprehensive veYFI Guide

Yearn has implemented a sophisticated governance and rewards system centered around **veYFI** and **dYFI** tokens. This system is designed to empower active community members, incentivize long-term participation, and align the interests of YFI holders with the protocol's success. This document provides a comprehensive synthesis of the veYFI and dYFI mechanisms, incorporating detailed specifications and complexities for a thorough understanding.

---

## Table of Contents

1. [Introduction to veYFI](#introduction-to-veyfi)
2. [Locking YFI for veYFI](#locking-yfi-for-veyfi)
   - [Lock Duration and veYFI Balance](#lock-duration-and-veyfi-balance)
   - [veYFI Decay Over Time](#veyfi-decay-over-time)
   - [Early Exit Penalties](#early-exit-penalties)
3. [Benefits of veYFI](#benefits-of-veyfi)
   - [Governance Participation](#governance-participation)
   - [Yield Boosts on Vault Deposits](#yield-boosts-on-vault-deposits)
   - [Calculating Boost Levels](#calculating-boost-levels)
   - [Protocol Incentives](#protocol-incentives)
4. [Understanding dYFI](#understanding-dyfi)
   - [dYFI Redemption Mechanism](#dyfi-redemption-mechanism)
   - [Emission of dYFI Rewards](#emission-of-dyfi-rewards)
   - [Discount Calculation Formula](#discount-calculation-formula)
5. [Epochs and Voting](#epochs-and-voting)
   - [Epoch Timeline](#epoch-timeline)
   - [Gauge Emission Voting](#gauge-emission-voting)
   - [Governance Proposals](#governance-proposals)
6. [System Parameters and Governance Adjustments](#system-parameters-and-governance-adjustments)
   - [Adjustable Parameters](#adjustable-parameters)
7. [Liquid Lockers: An Alternative Option](#liquid-lockers-an-alternative-option)
8. [References](#references)

---

## Introduction to veYFI

**veYFI** (vote-escrowed YFI) is a time-locked version of Yearn's native governance token, **YFI**. By locking YFI tokens into veYFI, users gain enhanced governance power, yield boosts on their vault deposits, and access to additional protocol incentives. This system aligns users' interests with the long-term success of Yearn Finance by encouraging prolonged participation and active governance.

---

## Locking YFI for veYFI

### Lock Duration and veYFI Balance

- **Lock Period**: Users can lock their YFI tokens for any duration up to **4 years** (208 weeks). While it's technically possible to lock for longer (up to 10 years), any period beyond 4 years is purely for the convenience of not having to re-lock and does not confer additional veYFI or benefits. If you set the lock time to longer than 4 years, you can always reset it to 4 years so it starts decaying.
- **veYFI Calculation**: The amount of veYFI received is proportional to the lock duration:

  $$
  \text{veYFI} = \text{YFI} \times \left( \frac{\text{Lock Duration}}{4 \text{ years}} \right)
  $$

  - **Examples**:
    - Lock 1 YFI for 4 years → Receive 1 veYFI.
    - Lock 1 YFI for 2 years → Receive 0.5 veYFI.
    - Lock 1 YFI for 1 year → Receive 0.25 veYFI.

### veYFI Decay Over Time

- **Linear Decay**: From the moment YFI is locked, the veYFI balance begins to decay linearly to zero by the end of the lock period.
- **Impact on Benefits**: As veYFI balance decreases, so do the associated benefits:
  - **Voting Power**: Reduced influence in governance decisions.
  - **Yield Boosts**: Decreased boost levels on vault deposits.
  - **Rewards Rates**: Lower share of protocol incentives.
- **Counteracting Decay**: Users can extend their lock duration (re-lock) to maintain or increase their veYFI balance.

### Early Exit Penalties

- **Penalty Structure**: Exiting a lock before its expiry incurs a penalty, which is redistributed to remaining veYFI holders.
- **Penalty Calculation**:

  $$
  \text{Penalty} = \min\left( 75\% \times \text{Locked Amount}, \left( \frac{\text{Time Remaining}}{4 \text{ years}} \right) \times \text{Locked Amount} \right)
  $$

  - **Examples**:
    - 3 years remaining → Penalty: 75% of locked amount.
    - 2 years remaining → Penalty: 50% of locked amount.
    - 1 year remaining → Penalty: 25% of locked amount.

---

## Benefits of veYFI

### Governance Participation

- **Voting Rights**: veYFI is the sole governance token of Yearn Finance. Holders can vote on:
  - **Gauge Emission Allocations**: Deciding how dYFI rewards are distributed among vault gauges.
  - **Governance Proposals**: Submitting and voting on proposals affecting protocol parameters, adding/removing gauges, and other significant changes.
- **Epochs**: Governance operates in 14-day cycles called **epochs**, synchronized with Curve's veCRV epochs.
- **Voting Decay**: To prevent last-minute voting swings, voting power decays linearly during the last 24 hours of the voting period, reaching zero at epoch's end.

### Yield Boosts on Vault Deposits

- **Vault Gauges**: Specialized contracts where users can stake their Yearn vault tokens to earn dYFI rewards.
- **Boost Mechanism**:
  - **Boost Range**: From 1x (base level) to a maximum of 10x.
  - **Determined By**:
    - **User's veYFI Share**: Proportion of total veYFI supply held.
    - **User's Gauge Deposit Share**: Proportion of total deposits in a specific gauge.
  - **Maximizing Boost**: Achieved when a user's share of veYFI equals or exceeds their share of the gauge deposits.
- **Example**:
  - User holds 2% of veYFI supply and has 1% of total gauge deposits → Max boost achievable.

#### Calculating Boost Levels

```python title="Boost Calc"
# determine user share of veYFI
UserVeYFIShare =  VeYFIBalance / VeYFITotalSupply

# Determine boostable balance above 10% of deposit
BoostableBalance = 
(AmountDepositedInGauge /10) + (TotalDepositedInTheGauge * UserVeYFIShare  * 0.9)

# take the less of amount deposited in gauge and boostable balance
BoostedBalance = min(AmountDeposited, BoostableBalance)

# get the boost by multiplying by 10 and dividing by amount deposited in gauge.
Boost = 10 * BoostedBalance / AmountDepositedInGauge

```

- **Interpretation**:
  - Users with higher veYFI holdings relative to their gauge deposits achieve higher boosts, up to 10x.
  - Users without veYFI receive the base boost of 1x (10% of potential rewards).

#### Forfeited Rewards and Redistribution

- **Unused Boosts**: The difference between the maximum possible boost and the user's actual boost results in forfeited dYFI rewards.
- **Redistribution**: Forfeited rewards are proportionally allocated to veYFI holders, incentivizing governance participation.

### Protocol Incentives

- **Early Exit Penalties**: YFI paid to exit early is distributed among veYFI holders, providing an incentive to maintain locks.
- **Forfeited dYFI Rewards**: Users not achieving max boost forfeit a portion of their dYFI rewards, which are redistributed to veYFI holders.

---

## Understanding dYFI

**dYFI** is a reward token emitted by vault gauges. It provides a mechanism to redistribute bought-back YFI to active protocol participants while encouraging long-term engagement.

### dYFI Redemption Mechanism

- **Redemption for YFI**: dYFI holders can exchange their tokens for YFI at a discounted rate, paying in ETH.
- **Burning Mechanism**: dYFI is burned upon redemption, ensuring the circulating supply doesn't exceed available YFI for redemption.
- **ETH Proceeds**: ETH used in redemption is directed to automated YFI buybacks, enhancing the sustainability of the tokenomics program.

### Emission of dYFI Rewards

- **Emission Rate**: The amount of dYFI emitted per epoch is calculated using the formula:

  $$
  \text{Annual dYFI Emission} = c \times \sqrt{\text{veYFI Supply}}
  $$

  - **c**: Configurable scaling factor (default is 12).
- **Distribution**: dYFI is allocated to gauges based on veYFI holders' votes during the governance process.

### Discount Calculation Formula

- **Discount Rate**: The discount at which dYFI can be redeemed for YFI depends on the ratio of veYFI supply to total YFI supply.

  $$
  \text{Discount} = \frac{c}{1 + a \times e^{k(sx - 1)}}
  $$

  - **Variables**:
    - **c**: Constant (1).
    - **a**: Constant (approx. 10).
    - **k**: Constant (approx. 4.7).
    - **s**: Configurable scaling factor (default is 10).
    - **x**: Ratio of veYFI supply to total YFI supply $$\frac{\text{veYFI Supply}}{\text{YFI Supply}}$$.

  ![image](/img/charts/dyfi-redemption-chart.png)

- **Implications**:
  - **High veYFI Supply**: Lower discount, as more YFI is locked, indicating strong commitment.
  - **Low veYFI Supply**: Higher discount, incentivizing users to lock more YFI.

<br />

:::yearnData

- The current redemption discount is: <ContractData contractName='dYFI Redemption' methodName='discount' decimals={18} />
- Current Spot Price of YFI/ETH: <ContractData contractName='dYFI Redemption' methodName='get_latest_price' decimals={18} />
- ETH required to redeem 1 dYFI: <ContractData contractName='dYFI Redemption' methodName='eth_required' decimals={18} />

:::

---

## Epochs and Voting

Governance and reward distribution operate on a structured timeline.

### Epoch Timeline

- **Duration**: Each epoch lasts **14 days**.
- **Phases**:
  - **Week 1**: Proposal submission period.
  - **Week 2**: Voting period for gauge emissions and governance proposals.
- **Voting Decay**: Voting power decays linearly during the last 24 hours of the voting period to prevent manipulation.

### Gauge Emission Voting

- **Allocation of dYFI**:
  - **Total Emission**: Determined by the emission formula.
  - **Reserved Allocations**:
    - **5%** to YFI/ETH liquidity gauge.
    - **5%** to dYFI/ETH liquidity gauge.
  - **Remaining 90%**: Allocated based on veYFI holders' votes.
- **Blank Votes**:
  - **Option to Conserve Emission**: Voters can cast "blank" votes to reduce current epoch's emission.
  - **Outcome of Blank Votes**:
    - **Burned dYFI**: Permanently removes dYFI from circulation, extending the program's runway.
    - **Deferred Emission**: Carries over dYFI to the next epoch's allocation.
  - **Configurable Split**: The proportion of burned vs. deferred dYFI is adjustable through governance.

### Governance Proposals

- **Submission**:
  - Any address holding at least **1 veYFI** can submit proposals during the first week of an epoch.
  - Proposals are posted in the dedicated governance forum section.
- **Voting and Approval**:
  - Simple majority (>50% of votes) required for approval.
  - **Quorum Requirement**: A minimum amount of veYFI must participate in the vote for it to be valid. The default quorum is **10 veYFI** but is configurable.
- **Types of Proposals**:
  - Adding or removing gauges.
  - Adjusting system parameters.
  - Implementing significant protocol changes.

---

## System Parameters and Governance Adjustments

Certain aspects of the veYFI and dYFI system can be modified through governance to adapt to evolving needs.

### Adjustable Parameters

- **Quorum**: Minimum veYFI required for proposal approval (default: 10 veYFI).
- **Blank Vote Burn Percentage**: Proportion of dYFI from blank votes that is burned (default: 50%).
- **Scaling Factors**:
  - **s (Discount Scaling)**: Affects the dYFI discount curve (default: 10).
  - **c (Emission Scaling)**: Adjusts the emission rate of dYFI (default: 12).
- **Liquidity Gauges**:
  - Addresses of the YFI/ETH and dYFI/ETH liquidity gauges receiving reserved emissions.

---

## Liquid Lockers: An Alternative Option

For users who prefer not to manage individual locks and veYFI decay, **liquid lockers** offer a convenient alternative.

- **How They Work**:
  - Third-party services lock YFI on behalf of users and issue a transferable receipt token.
  - These tokens represent a claim on the locked YFI and can be traded or used to earn rewards.
- **Available Services**:
  - **1up**: [1up.tokyo/stake](https://1up.tokyo/stake)
  - **Cove**: [app.cove.finance/yfi/stake-yfi](https://boosties.cove.finance/yfi/stake-yfi)
  - **StakeDAO**: [stakedao.org/lockers/yfi](https://www.stakedao.org/lockers/yfi)
- **Considerations**:
  - Liquid locker tokens may not always maintain parity with YFI's value.
  - Users should evaluate the risks and benefits of using third-party services.

---

## References

### Relevant Governance Proposals

- **[YIP-56: Buyback and Build](https://gov.yearn.fi/t/yip-56-buyback-and-build/8929)**
- **[YIP-61: Governance 2.0](https://gov.yearn.fi/t/yip-61-governance-2-0/10460)**
- **[YIP-65: Evolving YFI Tokenomics](https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics/11994)**
- **[YIP-73: Activate veYFI Rewards](https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-oyfi-gauges/13414)**

### Snapshot Voting

- **[veYFI Snapshot Page](https://snapshot.org/#/veyfi.eth)**

### Contract Addresses

- **[Yearn veYFI Contract Addresses](/developers/addresses/veyfi-contract)**

### Audits

- **[veYFI StateMind Audit](https://github.com/yearn/yearn-security/blob/master/audits/202208_yAcademy_yearn-veyfi/yAcademy_-_yearn_veyfi_review.pdf)**
- **[veYFI yAcademy Audit](https://github.com/yearn/yearn-security/blob/master/audits/202208_yAcademy_yearn-veyfi/yAcademy_-_yearn_veyfi_review.pdf)**
- **[dYFI ChainSecurity Audit](https://old.chainsecurity.com/wp-content/uploads/2023/03/Yearn-Smart-Contract-Audit-oYfi-ChainSecurity.pdf)**

### Other Resources

- **[veCRV Explained](https://resources.curve.finance/vecrv/overview/)**

---

*This document is intended to provide a detailed understanding of the veYFI and dYFI mechanisms within Yearn Finance. Users are encouraged to participate actively in governance and stay informed about ongoing developments.*
