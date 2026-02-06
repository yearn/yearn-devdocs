# stYFI (Governance Staking)

Yearn’s current governance staking UX is built around **stYFI** (and **stYFIx**).

- **stYFI**: stake YFI to earn rewards and keep direct governance rights.
- **stYFIx**: a “set-and-forget” option that delegates voting power (recommended if you don’t want to manage governance actions yourself).

## Where to use it

- **stYFI dashboard**: https://styfi.yearn.fi
- **Migration + Liquid Lockers dashboard**: https://veyfi.yearn.fi

## Stake (YFI → stYFI / stYFIx)

Staking is a two‑step flow:

1. **Approve** YFI for the contract you’re using.
2. **Stake** YFI to mint `stYFI` or `stYFIx`.

The interface uses **exact‑amount approvals** (not infinite approvals).

## Unstake and withdraw (14‑day linear cooldown)

Unstaking starts a **14‑day linear cooldown**:

- funds unlock gradually during the stream
- you can withdraw the **currently unlocked** portion without waiting for the full 14 days

If you add more to an active cooldown:

- any currently‑unlocked amount is **auto‑withdrawn** first (so it can’t be re‑locked), and
- the cooldown timer **resets** for the remaining streaming amount

The UI will warn you before you confirm a reset.

## Rewards (claim `yvUSDC`)

Rewards are claimable from the stYFI dashboard and are paid in **`yvUSDC`** (a Yearn vault token).

Notes:

- stYFIx **does not auto‑compound** in the current implementation.
- Rewards accrue separately and still need to be claimed.

## If you have legacy veYFI

If you held a legacy veYFI lock, you may be able to migrate it to the current system and activate a boost used by the dashboards.

See: [Migrate from veYFI](./migrating-from-veyfi).

## Contract addresses

Mainnet deployment addresses: [stYFI Contract Addresses](/developers/addresses/styfi-contracts).
