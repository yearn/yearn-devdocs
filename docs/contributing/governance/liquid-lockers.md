# Liquid Lockers (LLYFI)

The governance dashboards support a curated set of **liquid locker tokens** (LLYFI), such as:

- `sdYFI` (StakeDAO)
- `upYFI` (1UP)
- `coveYFI` (Cove)

You can manage them in the **veYFI / LLYFI dashboard**: https://veyfi.yearn.fi

## What you can do today

For each supported token, the dashboard provides:

- **Stake**: approve → deposit into that token’s depositor contract
- **Unstake**: start a **14‑day linear cooldown** and withdraw unlocked amounts over time
- **Trade**:
  - **Sell LLYFI → YFI** (exit): subject to an **exit fee** and limited by capacity and available YFI inventory
  - **Buy YFI → LLYFI** (enter): currently fee‑free, limited by available LLYFI inventory held by the redemption contract

## Cooldowns and partial withdrawals

LLYFI staking uses the same cooldown semantics as stYFI:

- starting an unstake begins a **14‑day linear stream**
- you can withdraw whenever an unlocked portion is available
- adding more to an existing cooldown resets the timer for the remaining stream (and auto‑withdraws anything currently unlocked first)

## Caps, inventory, and fees (trade)

Trade availability is constrained by protocol limits:

- exits (LLYFI → YFI) can be blocked by **per‑token capacity**, overall **YFI inventory**, or both
- the UI previews the current exit fee and disables the action when limits are hit

:::warning Price and liquidity
LLYFI tokens can trade above or below their notional backing and exits may not always be available in size. Always review the preview (fee + limits) before confirming a trade.
:::

## Contract addresses

Mainnet deployment addresses: [stYFI Contract Addresses](/developers/addresses/styfi-contracts).
