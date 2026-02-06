# stYFI (Governance Staking)

Yearn governance staking is centered on **stYFI** and **stYFIx**:

- **stYFI**: stake YFI, earn rewards, and retain direct governance rights.
- **stYFIx**: a more passive option that delegates voting power (recommended if you do not want to manage governance actions directly).

## Where to use it

- **stYFI dashboard**: https://styfi.yearn.fi
- **Migration + Liquid Lockers dashboard**: https://veyfi.yearn.fi

## Stake (YFI → stYFI / stYFIx)

Staking is a two-step flow:

1. **Approve** YFI for the selected staking contract.
2. **Stake** YFI to mint `stYFI` or `stYFIx`.

The UI uses **exact-amount approvals** (not infinite approvals).

## Unstake and withdraw (14-day linear cooldown)

Unstaking starts a **14-day linear cooldown**:

- funds unlock linearly over time
- you can withdraw the **currently unlocked** amount at any point during the stream

If you add more to an active cooldown:

- the cooldown timer resets for the **entire cooldown position** (existing amount + new amount)
- any amount that was already withdrawable is **re-locked** (it is not auto-withdrawn)
- withdrawable resets to `0` immediately after the new cooldown starts
- the UI shows an in-context warning (with the exact withdrawable amount) before submission
- the action remains available (warn-and-confirm, not block-and-prevent)

## Rewards (claim `yvUSDC`)

Rewards are claimable from the stYFI dashboard and are paid in **`yvUSDC`** (a Yearn vault token).

Notes:

- stYFIx **does not auto-compound** in the current implementation.
- Rewards accrue separately and still need to be claimed.

## If you have legacy veYFI

If you held a legacy veYFI lock, you may be able to migrate it to the current system and activate a boost used by the dashboards.

See: [Migrate from veYFI](./migrating-from-veyfi).

## Contract addresses

Mainnet deployment addresses: [stYFI Contract Addresses](/developers/addresses/styfi-contracts).
