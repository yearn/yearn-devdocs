# yPRISMA FAQ

The Prisma Wars are officially underway, which means full steam ahead for yPRISMA: Yearn's newest tokenized locker product.

Yearn has claimed its PRISMA airdrop as yPRISMA and is preparing to distribute these tokens to yCRV users and yPRISMA LPs. 

This post will outline exactly how that will work.

### What's happening with Yearn's veCRV Airdrop?

The roughly 280,000 yPRISMA tokens minted from Yearn's airdrop claim will be distributed across two simple staking contracts: yCRV and yPRISMA LPs.

If you are a user in the yCRV ecosystem you may migrate your position by withdrawing to vanilla yCRV and depositing it into the new staking contract on https://yprisma.yearn.fi to earn yPRISMA rewards.

## What do I do with yPRISMA?

The yPRISMA ecosystem aims to deliver a user experience similar to yCRV, which passes all protocol yield earned by Yearn's position along to users.

A staking contract is available on the yPRISMA [website](https://yprisma.yearn.fi/), allowing users to stake their yPRISMA to earn protocol fees and bribes.

## Can yPRISMA users vote in Primsa?

Weekly incentive voting is automated to optimize for the maximum weekly bribe yield.

There is active research on Prisma governance proposals to determine how to pass Yearn's voting power along to yPRISMA users.

## How can I buy yPRISMA?

You can purchase yPRISMA through the following platforms:

- **Curve LP**: The main liquidity pool for yPRISMA is available on Curve. You can swap for yPRISMA [here](https://curve.fi/#/ethereum/swap?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xe3668873d944e4a949da05fc8bde419eff543882).
- **CowSwap**: Another option for swapping is CowSwap, which you can access [here](https://swap.cow.fi/#/1/swap/ETH/YPRISMA).

## How do I mint yPRISMA directly?

To mint yPRISMA you must claim your emissions earned in PRISMA as yPRISMA.

All emissions in Prisma come as locked vePRISMA. Prisma allows protocols like Yearn to plug into the "claim rewards" function, so the user gets yPRISMA and vePRISMA goes to Yearn (which uses it to boost yPRISMA strategy in our staking [contract](https://yprisma.yearn.fi/)).

There is a complete guide on how to claim through Prisma [here](https://docs.yearn.fi/getting-started/products/ylockers/yprisma/overview#how-can-i-claim-my-emissions-as-yprisma)

vePRISMA is not tradeable, yPRISMA is tradeable, allowing you to avoid the 50% penalty associated with unlocking vePRISMA directly.

## What are the fees associated with yPRISMA?

When you stake yPRISMA, a performance fee is applied to the yield collected over the week. Here's how it works:

- Yield accumulates in the receiver contract throughout the week.
- The yield is distributed once per week, with 10% going to the Yearn treasury and the rest to the stakers.

## Where does the yield come from and how does it flow?

The yield for yPRISMA stakers comes from several sources:

- **Protocol Fees**: Fees generated from the Prisma protocol.
- **Bribes**: Incentives provided for voting power.
- **Boost Rental Fees**: Fees from users renting boost from Yearn's vePRISMA.

All these yields are claimed to the yPRISMA fee receiver at [`0x76DF88Aa8711822472Cb40Ed8c972A461A20ecdc`](https://etherscan.io/address/0x76DF88Aa8711822472Cb40Ed8c972A461A20ecdc).

At the beginning of each week, the collected yield is converted to mkUSD (Prisma Stablecoin), deposited into the yvmkUSD-A vault, and then distributed to stakers. This process occurs once per week, and the yield is streamed evenly over the entire week.

## What is yvmkUSD-A?

yvmkUSD-A is a Yearn v3 vault that allows yield to auto-compound. Currently, there is no active strategy for compounding, but a strategy is nearly completed and will undergo reviews soon.
