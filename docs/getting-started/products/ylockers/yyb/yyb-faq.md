# yYB FAQ

## When did yYB launch?

The contracts are live. Week 0 began on Thursday, December 18th, 2025. You can find relevant addresses [here](/developers/addresses/yyb-contracts).

## Where can I buy yYB?

yYB can be purchased through the following platforms:

* If you already have YB tokens, you can ZAP directly into yYB using Yearn's yYB zapper contract [here](https://yyb.yearn.fi/app/get)
* [Curve Finance](https://www.curve.finance/dex/ethereum/swap/?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0x22222222aea0076fca927a3f44dc0b4fdf9479d6) - The primary liquidity source for yYB
* CoW Swap (coming soon) - DEX aggregators like CoW Swap should also work well

## Can I transfer my existing veYB to Yearn for yYB?

Yes. veYB positions are represented as NFTs and these positions can be transferred.

If you have an existing veYB position, you can convert your veYB to yYB at a 1:1 rate [here](https://yyb.yearn.fi/app/migrate), after completing these steps:

1. Clear votes - Remove gauge weight allocations
2. Max lock - Permalock your YB

## What is YBS?

YearnBoostedStaker (YBS) allows yYB holders to earn rewards in stablecoins (crvUSD) - compared to the auto-compounding version of yYB (yvyYB). You can read more about how each option works [here](/getting-started/products/ylockers/overview#ylocker-products).

## Should I stake my yYB directly or auto-compound it in the vault?

That's totally up to you and depends on your personal situation and preferences. Here are a few things to consider:

* Max Boost:
  * Direct stakers will need to wait four weeks before their yYB is max boosted and earning the maximum staking APR displayed.
  * Vault depositors join a single shared boost position that adjusts up and down as other users deposit and withdraw.
* Rewards:
  * Direct stakers receive their yield in stablecoins, making them less exposed to the price fluctuations of the YB governance token and the yYB peg.
  * Vault depositors are "all in" on yYB.
* Gas Fees:
  * Direct stakers must manually claim their crvUSD stablecoin rewards. Although earned rewards automatically accumulate and earn interest, this requires at least one additional transaction and can be expensive, depending on gas pricing and network congestion.
  * Vault depositors have their crvUSD stablecoin rewards claimed, swapped and reinvested into the yvyYB vault each week. And Yearn covers the gas.
* Composability:
  * Direct stakers do not receive a receipt token in their wallet.
  * Vault depositors receive back a yvyYB token into their wallet which has the potential to be accepted as collateral across DeFi.

## Can yYB users vote with their yYB?

No. User voting is not part of the yLockers system, instead...

* Gauge voting is automated to optimize for the maximum weekly vote incentive yield.
* Governance voting is handled by a team of core contributors on behalf of veYFI holders.

## What is yvcrvUSD-2?

yvcrvUSD-2 is a Yearn V3 vault that allows the crvUSD yield earned by the YBS strategy to auto-compound. Instead of getting naked crvUSD, you receive autocompounding yvcrvUSD.

## What are the fees associated with yYB?

> INFO
>
> For the first 13 weeks, Yearn are waiving all fees related to yYB. This means yYB users in YBS and yvyYB receive 100% of their share of Yearn veYB admin fees and vote incentives.
>
> yYB performance fees will begin to be charged starting Thursday 26th March 2026.

When you stake yYB, a 10% performance fee is applied. Yield accumulates in the receiver contract throughout the week. The yield is distributed once per week, at which point 10% is sent to the Yearn treasury.

## Where does the yield come from and how does it flow?

The yield for yYB stakers comes from two main sources:

* Protocol Fees: Fees generated from the Yield Basis protocol
* Vote incentives: Incentives provided for voting power

All these yields are claimed to the yYB fee receiver

At the beginning of each week, the collected yield is converted to crvUSD (Curve Stablecoin), deposited into the yvcrvUSD-2 vault, and then distributed to stakers. This process occurs once per week, and the yield is claimable at the start of the following week.

## How do I unwrap my yYB?

Liquid locker tokens are not redeemable for the underlying locked tokens as they are continually max-locked into the underlying VE systems. But because they are liquid, they can be traded on decentralized exchanges, and bought and sold at market value.

## How are Yield Basis DAO governance votes handled in this system?

The Yearn governance multisig will retain the sole ability to cast votes in the Yield Basis DAO. They will do so with close consultation with the Crypto Risk Team and other Yield Basis DAO stakeholders to ensure risk is properly assessed and all votes promote the long-term interests of the Yield Basis DAO. While it is possible that the yYB system can be upgraded to someday grant these voting rights to yYB token holders (only if enforcing a sufficiently long lock time), there is no current plan to do so.
