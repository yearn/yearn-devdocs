# Yield Accrual in V3 Strategies

This page describes how yield accrues and is accounted in Yearn V3. Yield can accrue continuously in external protocols, but it is only recognized in accounting when `report()` runs, with `tend()` available for maintenance between reports. For the broader system context, see [V3 Overview](/developers/v3/overview).

## Overview

1. Yield accrues off-chain or in external protocols. This changes the strategy's real holdings but not its recorded accounting.
2. `strategy.report()` is called by a keeper or management. The strategy harvests, computes a total asset value, and updates internal accounting.
3. `vault.process_report(strategy)` is called by the vault’s reporting manager. The vault reads the strategy’s ERC-4626 value and realizes gain or loss against its recorded debt, charging fees and locking profits at the vault level.

`tend()` fits between reports as a maintenance hook and does not change PPS or recorded profits until the next `report()`.

## Strategy accounting (Tokenized Strategy)

### `report()`

In `TokenizedStrategy.sol`, `report()`:

- Calls `BaseStrategy.harvestAndReport()` to harvest, reinvest, and return a trusted `totalAssets` snapshot.
- Compares the new `totalAssets` to the previous value to derive profit or loss.
- Applies performance fees (and [protocol fee](/developers/v3/protocol_fees) on those fees).
- Locks profit in shares so PPS doesn’t jump, then unlocks over `profitMaxUnlockTime`.
- Updates `totalAssets` and `lastReport`.

Profits do not exist in accounting until `report()` is run. Losses can be realized on `report()` or during `withdraw()`/`redeem()`.

Key code references:

- `TokenizedStrategy.sol` → `report()`
- `BaseStrategy.sol` → `harvestAndReport()`

### `tend()`

In `TokenizedStrategy.sol`, `tend()`:

- Requires a keeper or management role.
- Calls `BaseStrategy.tendThis(_totalIdle)`, passing the strategy’s current idle balance.
- Does not change `totalAssets`, PPS, or accounting.

This is meant for actions like harvesting rewards or repositioning that should not yet be realized as profit or loss. A later `report()` finalizes accounting. For implementation details, see the [Strategy Writing Guide](/developers/v3/strategy_writing_guide).

Key code references:

- `TokenizedStrategy.sol` → `tend()`
- `BaseStrategy.sol` → `tendThis()` and `_tend()`

## Vault accounting (Allocator Vault)

V3 vaults treat strategies as ERC-4626 positions. In `VaultV3.vy`, `process_report(strategy)`:

- Reads the vault’s strategy share balance and uses the strategy’s `convertToAssets()` to compute current position value.
- Compares that value to the vault’s recorded debt for the strategy to compute gain or loss.
- Invokes the accountant (if set) to calculate fees or refunds. See [Periphery Contracts](/developers/v3/periphery#accountant) for how the accountant is configured.
- Locks profit at the vault level using vault shares and `profit_max_unlock_time`.
- Updates per-strategy accounting (including `last_report`) and vault totals.

This means a strategy’s profit only becomes visible to vault depositors after `process_report()` is called, even if the strategy already reported.

Key code references:

- `VaultV3.vy` → `_process_report()`
- `VaultV3.vy` → `process_report()`

## Recommended cadence

- Report cadence should align with `profitMaxUnlockTime` (strategy) and `profit_max_unlock_time` (vault) so users see smooth, predictable unlocks.
- Call order in practice:
  1. `strategy.report()`
  2. `vault.process_report(strategy)`
- Use `tend()` when needed for maintenance that should not immediately affect PPS.

## Notes for strategists

- Only `report()` realizes profit. Losses can be realized on `report()` or during `withdraw()`/`redeem()`. Your `_harvestAndReport()` implementation defines what “realized” means for your strategy.
- `tend()` is for safety and efficiency, not accounting. Use it for rebalances, reward compounding, or moving idle funds when a full report would be premature. For more guidance, see the [Strategy Writing Guide](/developers/v3/strategy_writing_guide).
- ERC-4626 conversion accuracy matters because the vault uses `convertToAssets()` to determine gains or losses against debt.

## Implementation checklist

- Implement `_harvestAndReport()` to return a trusted, accurate total asset value.
- If you use `_tend()`, also implement `_tendTrigger()` and expect no accounting change until report.
- Ensure keepers call `report()` and `vault.process_report()` on a consistent schedule.
- Consider how profit locking interacts with your reporting frequency and strategy liquidity.
