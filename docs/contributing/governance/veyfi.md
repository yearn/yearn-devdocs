---
rpcCalls:  
  - name: 'dYFI Redemption'
    chain: '1'
    address: '0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a'
    abi: 'dyfiRedemptionABI'
    methods:  
      - 'discount'
      - 'get_latest_price'
      - name: 'eth_required'
        args: ['1000000000000000000']
---

# Specification

veYFI incorporates [YIP-56: Buyback and Build](https://gov.yearn.fi/t/yip-56-buyback-and-build/8929) funds into YFI tokenomics. Users can lock YFI tokens and receive veYFI, which allows them to boost vault rewards and vote on where bought-back YFI will be sent.

## veYFI Overview

- Locking is similar to the ve-style program of Curve.
- YFI can be locked into veYFI, which is non-transferable.
- Lock duration can be decided on deposit: from 1 week to 4 years.
  - You can actually lock up to 10 years, but anything above 4 years doesn’t give you more veYFI. This way you don't have to relock every week. If you set it to longer than 4 years, you can always reset it to 4 years so it starts decaying.
- A user must have a veYFI lock earn boosted rewards. No lock leads to no boosted rewards. A Maximum lock, continuously renewed, maximizes rewards.
  - Just like with Curve, even without a veYFI lock, you can still deposit into a vault and stake the vault token into a gauge which will give you the base boost. With the minimum boost, you get to keep 10% of the dYFI you farm. The other 90% goes to veYFI lockers.
- It’s possible to exit the lock early, in exchange for paying a penalty that gets allocated to the other veYFI holders.
- The penalty is up to 75% locked amount and decays over time:
  - The total penalty is the minimum percentage between `75% locked amount` and `(time remaining / 4 years)`
  - So if your lock is over 3 years you will pay 75%.
  - If your lock is 2 years you will pay 2/4 = 50%
  - Penalty Formula: `min(75%, lock_duration_left / 4 years * 100%)`
- veYFI holders are eligible to receive a share of the early exit penalties.
- veYFI holders are eligible to receive a share of gauge dYFI rewards from unused boosts.
- Now that veYFI has been implemented, only veYFI is accepted voting power in Yearn Governance.

## dYFI as Gauges Reward

- dYFI is an ERC-20 token.
- Gauges emit dYFI that users can either sell for ETH or convert to YFI at a cost.
- Gives its bearer the right to redeem an equivalent amount of YFI in exchange for ETH.
- dYFI is burned upon redemption.
- The circulating supply of dYFI must not exceed the amount of YFI available to be redeemed as part of the tokenomics program.
- The amount of ETH required for redemption is at a discount to the current spot price of YFI/ETH.
- ETH received from dYFI redemption is redirected to automated YFI buybacks handled by an immutable smart contract that runs Dutch auctions.

- Discount calculation is a function of the veYFI and YFI supply with the following formula:
  - discount = `c / (1 + a * e^k(s * x − 1))`, where:
    - **c** = `1`
    - **a** = `10`
    - **k** = `4.7`
    - **s** = `configurable scaling factor` (currently set to 10)
    - **x** = `veYFI_supply / YFI_supply`
    <br />

  :::yearn[Current On-Chain Values]

  - The current redemption discount is: <ContractData contract='dYFI Redemption' methodName='discount' decimals={18} />
  - Current Spot Price of YFI/ETH: <ContractData contract='dYFI Redemption' methodName='get_latest_price' decimals={18} />
  - ETH required to redeem 1 dYFI: <ContractData contract='dYFI Redemption' methodName='eth_required' decimals={18} />

  :::
  
![image](/img/charts/dyfi-redemption-chart.png)

## Vault Gauges + Voting

- Vault gauges allow vault depositors to stake their vault tokens and earn dYFI rewards according to their veYFI weight.
- Weights decay as the remaining lock duration decreases and can be extended up to the max lock duration.
- Increased locking duration is rewarded with increased weight, so locking for 4 years gives 100% weight, locking for 2 years 50% weight, etc.
- dYFI is allocated to gauges based on bi-monthly governance votes. Each gauge can get a different amount dYFI to emit.
- Users can boost their gauge rewards by up to 10x.
  - This boost amount is proportional to the user's share of the vault and their share of total veYFI.
  - A 10x boost is achieved when a user owns an equal or higher share of veYFI (`yourVeYFIBalance/veYFITotalSupply`) than they own of the gauge deposits (`yourGaugeDeposit/totalDepositedInGauge`).
  - The greater your share of total veYFI, the more vault deposits can be boosted for the user.
  - This applies across multiple gauges. You can max boost 1% of all gauges with 1% of the veYFI supply.
- A claim with boost under 100% will send the leftover tokens to veYFI holders.
- The boost mechanism math works as follows:

```python title="Boost Calc"
# determine user share of veYFI
UserVeYFIShare =  VeYFIBalance / VeYFITotalSupply

# Determine boostable balance above 10% of deposit
BoostableBalance = (AmountDepositedInGauge /10) + (TotalDepositedInTheGauge * UserVeYFIShare  * 0.9)

# take the less of amount deposited in gauge and boostable balance
BoostedBalance = min(AmountDeposited, BoostableBalance)

# get the boost by multiplying by 10 and dividing by amount deposited in gauge.
Boost = 10 * BoostedBalance / AmountDepositedInGauge

```

## veYFI Reward Pool

- Users who lock YFI for veYFI can claim accumulated fees from the veYFI reward pool. The reward pool gets fees two ways: YFI from the veYFI early exit fee and the non-distributed gauge rewards due to a lack of full boost.

## Additional Info

- [Contract Addresses](../../developers/addresses/veyfi-contracts)
- Governance Forum Thread: https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics
