# veYFI

veYFI incorporates [YIP-56: Buyback and Build](https://gov.yearn.fi/t/yip-56-buyback-and-build/8929) funds into YFI tokenomics. Users can lock YFI tokens and receive veYFI, which allows them to boost vault rewards and vote on where bought-back YFI will be sent.

Contract Address: [`0x90c1f9220d90d3966fbee24045edd73e1d588ad5`](https://etherscan.io/address/0x90c1f9220d90d3966fbee24045edd73e1d588ad5)

## Specification

Governance Forum Thread: https://gov.yearn.fi/t/yip-65-evolving-yfi-tokenomics

## Overview

- Receives bought-back YFI as reward.
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
- Now that veYFI has been implemented, only veYFI is accepted voting power in Yearn Governance.

### dYFI as Gauges Reward

- [dYFI](#dyfi) is an ERC-20 token.
- Gauges pay dYFI that you can either sell for ETH or convert to YFI (by paying ETH, this ETH gets routed to buybacks immediately).
- Gives its bearer the right to redeem an equivalent amount of YFI in exchange for ETH.
- dYFI is burned upon redemption.
- The circulating supply of dYFI must not exceed the amount of YFI available to be redeemed as part of the tokenomics program.
- The amount of ETH required for redemption is at a discount to the current spot price of YFI/ETH.
- ETH received from dYFI redemption is redirected to automated YFI buybacks handled by an immutable smart contract.

### Vault Gauges + Voting

- Vault gauges allow vault depositors to stake their vault tokens and earn YFI rewards according to their veYFI weight.
- Weights decay as the remaining lock duration decreases and can be extended up to the max lock duration.
- Increased locking duration is rewarded with increased weight, so locking for 4 years gives 100% weight, locking for 2 years 50% weight, etc.
- YFI is allocated to gauges based on bi-monthly governance votes. Each gauge can get a different amount of bought-back YFI to emit.
- Based on their veYFI lock, users can boost their gauge rewards by up to 10x proportional to the number of vault tokens deposited, when they claim YFI rewards from gauges. The greater the amount of veYFI, the more vault deposits can be boosted for the user.
- The boost mechanism will calculate your earning weight by taking the smaller amount of two values, provided in the formula below: 
  - Gauge boost formula: `min(AmountDeposited, (AmountDeposited /10) + (TotalDepositedInTheGauge * VeYFIBalance / VeYFITotalSupply * 0.9))`
- A claim with boost under 100% will send the leftover tokens to veYFI holders.

### veYFI Reward Pool

- Users who lock veYFI can claim accumulated fees from the veYFI reward pool. The reward pool gets fees two ways: YFI from the veYFI early exit fee and the non-distributed gauge rewards due to a lack of full boost.
- You can claim from the veYFI reward pool two or three weeks (to be defined) from the Thursday after you lock.

## Benefits

- **Incorporates YFI buybacks.** The mandate of [YIP-56: Buyback and Build](https://gov.yearn.fi/t/yip-56-buyback-and-build/8929) is unchanged, the new design builds on top of and integrates the bought-back YFI.
- **Incentivizes a long-term view on Yearn.** Token holders are motivated to support the protocol over the long-term rather than to speculate on the short-term.
- **Makes vaults more competitive.** Additional YFI earned from vault gauges are effectively added yield for depositors in proportion to how dedicated they are in their support.
- **Motivates 3rd party protocols and DAOs to become YFI holders.** Yearn products are used as yield components of a broader DeFi stack, and integrated into wallets and protocols. With this design, they have incentives to direct rewards to vaults and products they use.
- **A seamless experience for integrators.** Participation is optional. This maintains the simplicity integrators have come to appreciate and makes it easy to reason about vault behavior. Only those who are motivated to do so can participate.

## Risks

- **Risk of governance attacks**, where one or several actors accumulate sizable positions of YFI and can control rewards and decisions of the protocol.
- **Risk of insufficient rewards to make locking attractive**, where vaults may not generate enough tokens for the Treasury to buy back enough YFI to motivate YFI holders to lock into veYFI. This has somewhat of a balancing effect: as demand for locking decreases so does the share of the rewards for those who lock. If it’s determined that the equilibrium does not lead to enough YFI being locked, additional YFI could be minted and rewarded to veYFI holders.
- **Risk of YFI liquidity drying up.** Currently YFI is traded on multiple centralized and decentralized exchanges. As demand for using YFI elsewhere grows, there may be a lack of YFI/ETH LP supply in liquidity pools and lack of interest in general YFI market-making, leading to YFI becoming more illiquid. In such an event, additional incentives may be required to ensure healthy liquidity for trading in and out of YFI. The Treasury may also explore owning some of this liquidity outright.

## dYFI

dYFI (previously specified as oYFI) is a token introduced as part of Yearn's veYFI tokenomics program. It is an ERC-20 token that allows its holder to buy back YFI at a discount. 

| Description        | Address                                                         |
|--------------------|-----------------------------------------------------------------|
| dYFI Address       | [`0x41252e8691e964f7de35156b68493bab6797a275`](https://etherscan.io/address/0x41252e8691e964f7de35156b68493bab6797a275) |
| dYFI Redemption    | [`0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a`](https://etherscan.io/address/0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a) |
| YFI Reward Pool    | [`0xb287a1964AEE422911c7b8409f5E5A273c1412fA`](https://etherscan.io/address/0xb287a1964AEE422911c7b8409f5E5A273c1412fA) |
| dYFI Reward Pool   | [`0x2391Fc8f5E417526338F5aa3968b1851C16D894E`](https://etherscan.io/address/0x2391Fc8f5E417526338F5aa3968b1851C16D894E) |

### Specification

- Governance Forum Thread: https://gov.yearn.fi/t/yip-73-activate-veyfi-rewards-with-oyfi-gauges

### Overview

- Implements the ERC-20 standard.
- Gives its bearer the right to redeem an equivalent YFI in exchange for ETH.
- dYFI is burned upon redemption.
- The circulating supply of dYFI must not exceed the amount of YFI available to be redeemed as part of the tokenomics program.
- The amount of ETH required for redemption is at a discount to the current spot price of YFI/ETH.
- Discount calculation is an approximation of the following formula:
  - discount = `c / (1 + a * e^k(s * x − 1))`, where:
    - **c** = `1`
    - **a** = `9.9999`
    - **k** = `4.6969`
    - **s** = `configurable scaling factor`
    - **x** = `veYFI_supply / YFI_supply`
- ETH received from dYFI redemption is redirected to automated YFI buybacks handled by an immutable smart contract, like the one already in production for DAI.

### Benefits

- **Rewards active protocol participants.** dYFI is rewarded to users who stake their vault tokens in gauges, thereby incentivizing active participation in the protocol.
- **Promotes YFI buybacks.** The ETH received from dYFI redemption is used for automated YFI buybacks.

### Risks

- **Risk of insufficient rewards to make locking attractive**, where vaults may not generate enough tokens for the Treasury to buy back enough YFI to motivate YFI holders to lock into veYFI. This has somewhat of a balancing effect: as demand for locking decreases so does the share of the rewards for those who lock. If it’s determined that the equilibrium does not lead to enough YFI being locked, additional YFI could be minted and rewarded to veYFI holders.
- **Risk of YFI liquidity drying up.** Currently YFI is traded on multiple centralized and decentralized exchanges. As demand for using YFI elsewhere grows, there may be a lack of YFI/ETH LP supply in liquidity pools and lack of interest in general YFI market-making, leading to YFI becoming more illiquid. In such an event, additional incentives may be required to ensure healthy liquidity exists for trading in and out of YFI. The Treasury may also explore owning some of this liquidity outright.
