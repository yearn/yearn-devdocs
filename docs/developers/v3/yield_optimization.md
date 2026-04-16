# Yield Optimization in V3 Vaults

Yearn vaults continuously reallocate assets to maximize yield for vault depositors. The mechanism that performs the optimization is DOA (Debt Allocation Optimizer), a Python + Solidity backend bot system. It periodically rebalances debt allocations across strategies in Yearn V3 vaults to maximize yield while respecting specific risk constraints.

Yearn V3 vaults deploy capital across multiple yield strategies. As market conditions shift, the optimal distribution of funds across those strategies changes. Manual rebalancing is slow, error-prone, and doesn't scale across hundreds of vaults on multiple networks.

## How It Works

The system has two layers: an **offchain optimizer** (Python) that determines the best allocations, and **onchain contracts** (Solidity) that apply those allocations safely.

### Offchain: Python Optimizer

The CLI connects to an EVM RPC and:

1. **Enumerates vaults** from the onchain Yearn V3 Registry
2. **Fetches strategy data** for each vault — current allocations, deposit/withdrawal limits, APR data from the onchain APR Oracle, and performance fees
3. **Computes optimal allocations** that maximize total vault yield subject to per-strategy and per-vault constraints
4. **Outputs results** as JSON (for onchain execution) or human-readable tables

Vaults are optimized concurrently using async IO.

### Onchain: Solidity Contracts

A Foundry script consumes the optimizer's JSON output and:

1. Verifies gas conditions are acceptable
2. Calls `DebtOptimizerApplicator.setStrategyDebtRatios()` for each vault with updated target ratios
3. The `DebtAllocator` stores new ratios and emits events. The `DebtAllocator` address is found on [the V3 contracts page](../addresses/v3-contracts).
4. Keepers monitor those events and trigger actual fund movements via the vault. The main keeper address used for DOA optimizations is [0x283132390ea87d6ecc20255b59ba94329ee17961](https://etherscan.io/address/0x283132390ea87d6ecc20255b59ba94329ee17961).

### Constraints

The optimizer respects a rich set of constraints configured per-vault:

- **Strategy bounds** — min/max allocation per strategy
- **Strategy groups** — e.g. "all Morpho strategies combined must stay under 50%"
- **Deposit/withdrawal limits** — onchain limits strategies report
- **Vault idle requirements** — minimum unallocated buffer
- **Maximum change limits** — caps how much any single rebalance can move
- **Minimum change thresholds** — filters out changes too small to justify gas

### Configuration

Per-network and per-vault configuration lives in `chain_values.py`:

- Registry and APR Oracle addresses per chain
- Per-vault strategy constraints, APR overrides, group definitions
- Supported networks: Ethereum, Arbitrum, Optimism, Polygon, Base, Gnosis, Fantom, Sonic, Berachain

## Architecture

```
  Python CLI (offchain)          Solidity (onchain)
 ┌──────────────────────┐    ┌──────────────────────────┐
 │ Registry → Vaults    │    │ Foundry Script           │
 │ APR Oracle → Yields  │───▶│   ↓                      │
 │ Constraints → Bounds │    │ DebtOptimizerApplicator  │
 │ Optimizer → Ratios   │    │   ↓                      │
 │ JSON output          │    │ DebtAllocator → Keepers  │
 └──────────────────────┘    │   ↓                      │
                             │ Vault fund movements     │
                             └──────────────────────────┘
```

## Stack

- **Python 3.12** — async Web3, typer, rich
- **Solidity 0.8.18** — Foundry, OpenZeppelin
- **Yearn V3 Periphery** — DebtAllocator, APR Oracle interfaces
- **Docker** — multi-stage build for CI/CD
