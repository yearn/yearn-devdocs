# yPRISMA FAQ

## How can I buy yPRISMA?

You can purchase yPRISMA through the following platforms:

- **Curve LP**: The main liquidity pool for yPRISMA is available on Curve. You can swap for yPRISMA [here](https://curve.fi/#/ethereum/swap?from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xe3668873d944e4a949da05fc8bde419eff543882).
- **CowSwap**: Another option for swapping is CowSwap, which you can access [here](https://swap.cow.fi/#/1/swap/ETH/YPRISMA).

## How do I mint yPRISMA directly?

To mint yPRISMA you must claim your emissions, earned from staked LP tokens in PRISMA, as yPRISMA.

All emissions in Prisma come as locked vePRISMA. Prisma allows protocols like Yearn to plug into the "claim rewards" function, so the user gets yPRISMA and vePRISMA goes to Yearn (which uses it to boost yPRISMA strategy in our staking [contract](https://yprisma.yearn.fi/)).

Here's the process to mint yPRISMA:

1. Stake LP tokens from Curve and Convex at https://app.prismafinance.com/earn
2. Claim emission rewards as yPRISMA to mint it.

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
