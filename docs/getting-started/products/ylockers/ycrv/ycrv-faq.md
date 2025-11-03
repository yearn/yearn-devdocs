# yCRV FAQ

<!-- markdownlint-disable MD001 -->
### When will yCRV launch?

Contracts are live, you can find relevant addresses [here](/developers/addresses/ycrv-contracts).

### Where can I buy yCRV?

yCRV can be purchased through the following platforms:

* If you already have CRV tokens, you can ZAP directly into yCRV using Yearn's yCRV zapper contract [**here**](https://yCRV.yearn.fi/app/get)
* [Curve Finance](https://curve.finance/#/ethereum/swap?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xfcc5c47be19d06bf83eb04298b026f81069ff65b) - The primary liquidity source for yCRV
* [CowSwap](https://swap.cow.fi/#/1/swap/ETH/YCRV) - DEX aggregators like CowSwap should also work well

### What is YBS and how is the new version of yCRV different from the old one?

YearnBoostedStaker (YBS) is a new contract from Yearn that allows yCRV holders to earn rewards in stable-coins (crvUSD). It is a new option that yCRV holders can choose from in addition to the traditional auto-compounding version of yCRV (yvyCRV). You can read more about how each option works [here](../overview.md#ylocker-products)

### Should I stake my yCRV directly or auto-compound it in the vault?

That's totally up to you and depends on your personal situation and preferences. Here are a few things to consider:

* **Max Boost:**
  * Direct stakers will need to wait four weeks before their yCRV is max boosted and earning the maximum staking APR displayed.
  * Vault depositors join a single shared boost position, but this is unlikely to reach the maximum and will adjust up and down as other users deposit and withdraw.
* **Rewards:**
  * Direct stakers receive their yield in stablecoins, making them less exposed to the price fluctuations of the underlying governance token and the yCRV peg.
  * Vault depositors are "all in" on yCRV.
* **Gas Fees:**
  * Direct stakers must manually claim their crvUSD stablecoin rewards. Although earned rewards automatically accumulate and earn interest, this requires at least one additional transaction and can be expensive, depending on gas pricing and network congestion.
  * Vault depositors have their crvUSD stablecoin rewards claimed, swapped and reinvested into the yv-yCRV vault each week. And Yearn covers the gas.
* **Composability:**
  * Direct stakers do not receive a receipt token in their wallet.
  * Vault depositors receive back a yv-yCRV token into their wallet which has the potential to be accepted as collateral across DeFi.

### Can yCRV users vote with their yCRV?

No. User voting is not part of the yLockers system, instead...

* Gauge voting is automated to optimize for the maximum weekly vote incentive yield.
* Governance voting is handled by a team of core contributors on behalf of veYFI holders.

### Why is the yCRV peg currently below 1:1?

It is normal for a yToken such as yCRV (or any liquid locker token) to trade at a discount to the governance token it is built upon. The strength of the peg is dependent on the supply and demand of each yToken.

Each yLocker has been designed to create an attractive yToken that offers value to users and provides incentives to attract liquidity. However, we cannot control the market price of our yTokens.

### What is yvcrvUSD?

yvcrvUSD is a Yearn V3 vault that allows the crvUSD yield earned by the YBS strategy to auto-compound. Instead of getting naked crvUSD, you receive autocompounding yvcrvUSD.

### What are the fees associated with yCRV?

When you stake yCRV, a 10% performance fee is applied. Yield accumulates in the receiver contract throughout the week. The yield is distributed once per week, at which point 10% is sent to the Yearn treasury.

### Where does the yield come from and how does it flow?

The yield for yCRV stakers comes from two main sources:

* Protocol Fees: Fees generated from the CRV protocol
* Vote incentives: Incentives provided for voting power

All these yields are claimed to the yCRV fee receiver

At the beginning of each week, the collected yield is converted to crvUSD (CRV Stablecoin), deposited into the yvcrvUSD-A vault, and then distributed to stakers. This process occurs once per week, and the yield is claimable at the start of the following week.

### How do I unwrap my yCRV?

Liquid locker tokens are not redeemable for the underlying locked tokens as they are continually max-locked into the underlying VE systems. But because they are liquid, they can be traded on decentralized exchanges, and bought and sold at market value.

### I still have yveCRV and/or yvBOOST. What do I do?

yveCRV and yvBOOST have been deprecated and no longer receive yield. There is a migration path available to users. yCRV can be minted 1:1 from yveCRV. yCRV can be minted `1 * pricePerShare` of yvBOOST at the time of migration. There is a migration zap available [here](https://ycrv.yearn.fi/app/get) to make this easy. If you are having trouble migrating, please come to the [discord](https://discord.gg/yearn) and ask for assistance.

### How are Curve DAO governance votes handled in this system?

The Yearn [governance multisig](https://etherscan.io/address/0xfeb4acf3df3cdea7399794d0869ef76a6efaff52) will retain the sole ability to cast votes in the Curve DAO. They will do so with close consultation with the [Crypto Risk Team](https://twitter.com/cryptorisksteam) and other Curve DAO stakeholders to ensure risk is properly assessed and all votes promote the long-term interests of the Curve DAO. While it is possible that the yCRV system can be upgraded to someday grant these voting rights to yCRV token holders (only if enforcing a sufficiently long lock time), there is no current plan to do so.
