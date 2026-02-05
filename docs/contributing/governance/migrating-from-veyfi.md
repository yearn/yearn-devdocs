# Migrate from veYFI

This page covers the **legacy veYFI → current system** migration flow as implemented in the Yearn governance dashboards today.

## Where to migrate

Use the **veYFI / LLYFI dashboard**: https://veyfi.yearn.fi

## Who will see a migration action

You’ll only see a **Migrate** call‑to‑action if all of the following are true:

- your wallet has a non‑zero **legacy veYFI** position
- your address is eligible to migrate (snapshot‑verified)
- you have not migrated previously

If you don’t see the migration card, it usually means you’re not eligible or you don’t have a legacy lock on the connected address.

## What happens after migration

After you migrate, the dashboard switches from an action state to an informational state showing:

- your legacy lock’s **unlock date**
- the **current boost multiplier** (between **1.0× and 2.0×**)
- an estimate of your **effective stYFI APR** (base stYFI APR × boost)

:::note Managing your legacy lock
The migration UI does **not** manage lock extensions or other lock mechanics. Use https://legacy-veyfi.yearn.fi for legacy lock management.
:::

## Liquid lockers (LLYFI) after migration

The same dashboard is also where you manage supported **LLYFI** tokens (staking, cooldown/withdraw, and buy/sell to/from YFI when available).

See: [Liquid Lockers (LLYFI)](./liquid-lockers).

## Contract addresses

Mainnet deployment addresses: [stYFI Contract Addresses](/developers/addresses/styfi-contracts).
