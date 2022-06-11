# veYFI

> This product is not deployed yet and is still under construction! You can follow development at https://github.com/yearn/veYFI

veYFI incorporates [YIP-56: Buyback and Build](https://gov.yearn.finance/t/yip-56-buyback-and-build/8929) funds into YFI tokenomics: Users can lock YFI tokens and receive veYFI which allows them to boost vault rewards and vote on where bought-back YFI will be sent to.

### Table-of-Content
- [Specification](#specification)
- [Benefits](#benefits)
- [Risks](#risks)

## Specification

### veYFI

- Receives bought-back YFI as rewards
- Locking similar to the ve-style program of Curve.
- YFI can be locked up to 4 years into veYFI, which is non-transferable.
- The maximum lock duration is still tbd, but will be in the range of min 1 year, max 4 years.
- Locking duration gives the same linear weights, so if max duration is 4 years, this is 100%, and 2 years = 50% etc.
- Weights decay as the remaining lock duration decreases, and can be extended up to the max lock duration.
- A user must have a veYFI lock in order to continue to earn rewards. No lock leads to no rewards. Maximum lock, continuously renewed, maximizes rewards.
- It’s possible to exit the lock early, in exchange for paying a penalty that gets allocated to the other veYFI holders.
- Penalty size may be fixed (i.e. 50%), or may be depending on the remaining lock duration.
- Once veYFI is introduced, only veYFI is accepted voting power in Yearn Governance.

### Vault gauges + Voting

- Vault gauges allow vault depositors to stake their vault tokens and earn YFI rewards according to their veYFI weight.
- YFI is allocated to gauges based on weekly governance votes. Each gauge can get a different amount of bought back YFI to emit.
- Based on their veYFI lock, users can boost their rewards of up to 2.5x proportional to the amount of vault tokens deposited, when they claim YFI rewards from gauges. The greater the amount of veYFI, the more vault deposits can be boosted for the user.
- Inspired by Andre Cronje’s [initial design of Fixed Forex](https://andrecronje.medium.com/fair-launches-decentralized-collaboration-and-fixed-forex-ab327a2e4fc4), in order for gauge rewards to be claimed, the user must have a veYFI lock. Depending on their lock duration, they are entitled to a different share of gauge rewards:
  - if max lock = 4 years, and user is locked for 4 years, they are entitled to 100% of their rewards
  - if user is locked for 2 years = 50% of rewards
  - if user has no lock = 0% of their rewards
  - The difference is paid as penalty to veYFI holders, as an additional source of yield.

### Diagram

![](https://raw.githubusercontent.com/yearn/YIPS/master/YIPS/assets/yip-65/03-gauges.svg)

## Benefits

- **Incorporates YFI buybacks.** The mandate of [YIP-56: Buyback and Build](https://gov.yearn.finance/t/yip-56-buyback-and-build/8929) is unchanged, the new design builds on top of and integrates the bought back YFI.
- **It's a sustainable ecosystem.** The new design does not create a drain on Treasury assets. Instead, there are reinforcing flywheel effects where tokenomics rewards drive more TVL, that in turn drive more fees, that in turn drive more YFI buybacks, that is then used to reinforce the tokenomics.
- **Incentivizes a **long-term** view on** Yearn.** Token holders are motivated to support the protocol over the long-term rather than to speculate in the short-term.
- **Disproportionately rewards those most loyal.** Weaker conviction holders effectively become diluted over time by the stronger conviction holders.
- **Limits rent-seeking benefits.** Over time as the components are introduced, the design avoids holders being rewarded for nothing. Or letting the largest holders accumulate more at the expense of the smaller holders.
- **Makes vaults more competitive.** Additional YFI earned from vault gauges are effectively added yield for depositors in proportion to how dedicated they are in their support.
- **Motivates 3rd party protocols and DAOs to become YFI holders.** Yearn products are used as yield components of a broader DeFi stack, and integrated in wallets and protocols. With this design, they have incentives to direct rewards to vaults and products they are using.
- **A seamless experience for integrators.** Participation is optional. This maintains the simplicity integrators have come to appreciate and makes it easy to reason about vault behavior. Only those who are motivated to do so can participate.

## Risks

- **Risk of governance attacks**, where one or several actors accumulate sizable positions of YFI and can control rewards and decisions of the protocol. These risks exist today, and are mitigated somewhat by the limited supply of YFI and how the strong demand for YFI amongst Yearn contributors makes such attacks costly.
- **Risk of not enough rewards to make locking attractive**, where vaults may not generate enough tokens to the Treasury to buy back enough YFI to motivate YFI holders to lock into veYFI. This has somewhat of a balancing effect, where as demand for locking decreases, so does the share of the rewards for those who actually do lock. If it’s determined that the equilibrium does not lead to enough YFI being locked, additional YFI could be minted and rewarded to veYFI holders as previously mentioned in “Future possibilities”.
- **Risk of YFI liquidity drying up.** Currently YFI is traded on multiple centralized and decentralized exchanges. As demand for using YFI elsewhere grows, there may be a lack of YFI/ETH LP supply in liquidity pools and lack of interest in general YFI market-making, leading to YFI becoming more illiquid. In such an event, additional incentives may be required in order to ensure a healthy liquidity exists for trading in and out of YFI. The Treasury may also explore owning some of this liquidity outright.