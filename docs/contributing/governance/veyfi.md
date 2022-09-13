# veYFI

veYFI incorporates [YIP-56: Buyback and Build](https://gov.yearn.finance/t/yip-56-buyback-and-build/8929) funds into YFI tokenomics: Users can lock YFI tokens and receive veYFI which allows them to boost vault rewards and vote on where bought-back YFI will be sent to.

## Specification

### veYFI

- Receives bought-back YFI as rewards
- Locking is similar to the ve-style program of Curve.
- YFI can be locked into veYFI, which is non-transferable.
- Lock duration can be decided on deposit: from 1 week to 4 years.
- A user must have a veYFI lock to continue to earn rewards. No lock leads to no boosting rewards. Maximum lock, continuously renewed, maximizes rewards.
- It’s possible to exit the lock early, in exchange for paying a penalty that gets allocated to the other veYFI holders.
- The penalty is up to 75% locked amount and decays overtime:
  - The total penalty is the minimum percentage between `75% locked amount` and `(time remaining / 4 years)`
  - So if your lock is more than 3 years you will pay 75%.
  - If your lock is 2 years you will pay 2/4 = 50%
  - Penalty Formula: `min(75%, lock_duration_left / 4 years * 100%)`
- Once veYFI is introduced, only veYFI is accepted voting power in Yearn Governance.

### Vault gauges + Voting

- Vault gauges allow vault depositors to stake their vault tokens and earn YFI rewards according to their veYFI weight.
- Increased locking duration is rewarded with increased weights, so locking for 4 years gives 100% weight, locking for 2 years 50% weight, etc.
- Weights decay as the remaining lock duration decreases, and can be extended up to the max lock duration.
- YFI is allocated to gauges based on bi-monthly governance votes. Each gauge can get a different amount of bought-back YFI to emit.
- Based on their veYFI lock, users can boost their gauge rewards by up to 10x proportional to the number of vault tokens deposited, when they claim YFI rewards from gauges. The greater the amount of veYFI, the more vault deposits can be boosted for the user.
- The boost mechanism will calculate your earning weight by taking the smaller amount of two values: The first value is the amount of liquidity you are providing. This amount is your maximum earning weight.
  - Gauge boost formula: `min(AmountDeposited, (AmountDeposited /10) + (TotalDepositedInTheGauge * VeYFIBalance / VeYFITotalSupply * 0.9))`
- A claim with boost under 100% will send the leftover tokens to veYFI holders.

### veYFI Reward Pool

- Users who lock veYFI can claim YFI from the veYFI exited early and the non-distributed gauge rewards due to the lack of boost.
- You will be able to start claiming from the veFYI reward pool two or three weeks from the Thursday after which you lock before you can claim.

### Diagram

![](https://raw.githubusercontent.com/yearn/YIPS/master/YIPS/assets/yip-65/03-gauges.svg)

## Benefits

- **Incorporates YFI buybacks.** The mandate of [YIP-56: Buyback and Build](https://gov.yearn.finance/t/yip-56-buyback-and-build/8929) is unchanged, the new design builds on top of and integrates the bought-back YFI.
- **It's a sustainable ecosystem.** The new design does not create a drain on Treasury assets. Instead, there are reinforcing flywheel effects where tokenomics rewards drive more TVL, that in turn drives more fees, which drives more YFI buybacks, which is then used to reinforce the tokenomics
- **Incentivizes a long-term view on Yearn.** Token holders are motivated to support the protocol over the long term rather than to speculate in the short term.
- **Disproportionately rewards those most loyal.** Weaker conviction holders effectively become diluted over time by the stronger conviction holders.
- **Limits rent-seeking benefits.** The design avoids holders being rewarded for nothing, and avoids letting the largest holders accumulate more at the expense of the smaller holders.
- **Makes vaults more competitive.** Additional YFI earned from vault gauges are effectively added yield for depositors in proportion to how dedicated they are in their support.
- **Motivates 3rd party protocols and DAOs to become YFI holders.** Yearn products are used as yield components of a broader DeFi stack, and integrated into wallets and protocols. With this design, they have incentives to direct rewards to vaults and products they are using.
- **A seamless experience for integrators.** Participation is optional. This maintains the simplicity integrators have come to appreciate and makes it easy to reason about vault behavior. Only those who are motivated to do so can participate.

## Risks

- **Risk of governance attacks**, where one or several actors accumulate sizable positions of YFI and can control rewards and decisions of the protocol. These risks exist today, and are mitigated somewhat by the limited supply of YFI and how the strong demand for YFI amongst Yearn contributors makes such attacks costly.
- **Risk of not enough rewards to make locking attractive**, where vaults may not generate enough tokens to the Treasury to buy back enough YFI to motivate YFI holders to lock into veYFI. This has somewhat of a balancing effect: as demand for locking decreases so does the share of the rewards for those who do lock. If it’s determined that the equilibrium does not lead to enough YFI being locked, additional YFI could be minted and rewarded to veYFI holders.
- **Risk of YFI liquidity drying up.** Currently YFI is traded on multiple centralized and decentralized exchanges. As demand for using YFI elsewhere grows, there may be a lack of YFI/ETH LP supply in liquidity pools and lack of interest in general YFI market-making, leading to YFI becoming more illiquid. In such an event, additional incentives may be required in order to ensure a healthy liquidity exists for trading in and out of YFI. The Treasury may also explore owning some of this liquidity outright.