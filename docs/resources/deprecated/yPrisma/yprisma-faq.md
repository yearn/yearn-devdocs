# yPRISMA FAQ

<!-- markdownlint-disable MD001 -->
### Where can I buy yPRISMA?

yPRISMA can be purchased through the following platforms:

* If you already have PRISMA tokens, you can ZAP directly into yPRISMA using Yearn's yPRISMA zapper contract [**here**](https://yprisma.yearn.fi/app/get)
* [Curve Finance](https://curve.finance/#/ethereum/swap?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xe3668873d944e4a949da05fc8bde419eff543882) - The primary liquidity source for yPRISMA
* [CowSwap](https://swap.cow.fi/#/1/swap/ETH/YPRISMA) - DEX aggregators like CowSwap should also work well

### Should I stake my yPRISMA directly or auto-compound it in the vault?

That's totally up to you and depends on your personal situation and preferences. Here are a few things to consider:

* **Max Boost:**
  * Direct stakers will need to wait four weeks before their yPRISMA is max boosted and earning the maximum staking APR displayed.
  * Vault depositors join a single shared boost position, but this is unlikely to reach the maximum and will adjust up and down as other users deposit and withdraw.
* **Rewards:**
  * Direct stakers receive their yield in stablecoins, making them less exposed to the price fluctuations of the underlying governance token and the yPRISMA peg.
  * Vault depositors are "all in" on yPRISMA.
* **Gas Fees:**
  * Direct stakers must manually claim their mkUSD stablecoin rewards. Although earned rewards automatically accumulate and earn interest, this requires at least one additional transaction and can be expensive, depending on gas pricing and network congestion.
  * Vault depositors have their mkUSD stablecoin rewards claimed, swapped and reinvested into the yv-yPRISMA vault each week. And Yearn covers the gas.
* **Composability:**
  * Direct stakers do not receive a receipt token in their wallet.
  * Vault depositors receive back a yv-yPRISMA token into their wallet which has the potential to be accepted as collateral across DeFi.

### Can yPRISMA users vote with their yPRISMA?

No. User voting is not part of the yLockers system, instead...

* Gauge voting is automated to optimize for the maximum weekly vote incentive yield.
* Governance voting is handled by a team of core contributors on behalf of veYFI holders.

### Why is the yPRISMA peg currently below 1:1?

It is normal for a yToken such as yPRISMA (or any liquid locker token) to trade at a discount to the governance token it is built upon. The strength of the peg is dependent on the supply and demand of each yToken.

Each yLocker has been designed to create an attractive yToken that offers value to users and provides incentives to attract liquidity. However, we cannot control the market price of our yTokens.

### What is yvmkUSD-A?

yvmkUSD-A is a Yearn V3 vault that allows yield to auto-compound. Currently, there is no active strategy for compounding, but a strategy is nearly completed and will undergo reviews soon.

### What are the fees associated with yPRISMA?

When you stake yPRISMA, a 10% performance fee is applied. Yield accumulates in the receiver contract throughout the week. The yield is distributed once per week, at which point 10% is sent to the Yearn treasury.

### Where does the yield come from and how does it flow?

The yield for yPRISMA stakers comes from two main sources:

* Protocol Fees: Fees generated from the Prisma protocol
* Vote incentives: Incentives provided for voting power

All these yields are claimed to the yPRISMA fee receiver at 0x76DF88Aa8711822472Cb40Ed8c972A461A20ecdc

At the beginning of each week, the collected yield is converted to mkUSD (Prisma Stablecoin), deposited into the yvmkUSD-A vault, and then distributed to stakers. This process occurs once per week, and the yield is claimable at the start of the following week.

## Converting native Prisma farming rewards to yPRISMA

If you use Prisma Finance directly, the Rewards are paid in locked vePRISMA. You can accept these rewards as vePRISMA or as yPRISMA.

### Why would I claim my Prisma protocol emissions as yPRISMA?

There are several key reasons to claim your emissions as yPRISMA instead of locking yourself.

1. When minting yPRISMA, you get to utilize Yearn's boost, which is among the highest of total Prisma accounts.
1. yPRISMA is minted 1:1 against your max locked claim amount.
1. yPRISMA is fully transferrable and can be swaped on DEXes like Curve, or staked for benefits in the ecosystem.

### How can I claim my Prisma protocol emissions as yPRISMA?

1. Browse to https://app.prismafinance.com/rewards
1. Select "Lock All"

   <img src="https://i.imgur.com/FKpkwcG.png" alt="Liquid Lockers" width="300" />

1. In the modal, choose "Liquid Lockers"

    <img src="https://i.imgur.com/tVEGdkI.png" alt="Liquid Lockers" width="500" />

1. Tick the checkbox for Yearn's `yprisma.eth` delegator and press "Confirm".

    <img src="https://i.imgur.com/NVvfVUG.png" alt="Liquid Lockers" width="700" />

When the transaction is complete, congratulations! You now have yPRISMA tokens in your wallet!
