# Cross-Chain Strategies

yvUSD deploys capital cross-chain through a pair of contracts: an **origin strategy** on Ethereum mainnet and a **remote strategy** on the destination chain. Two remote strategy implementations exist: a standard ERC-4626 variant (`CCTPRemoteStrategy`) and a HyperLiquid HLP variant (`HyperRemoteStrategy`).

## Architecture

![Cross-chain USDC deployment flow](/img/diagrams/yvusd/cross-chain.png)

### Origin strategy (`CCTPStrategy`)

`CCTPStrategy` is a standard Yearn V3 tokenized strategy deployed on Ethereum mainnet. It:

- Bridges USDC to the remote chain via Circle CCTP (`depositForBurn`)
- Tracks remote capital in a `remoteAssets` storage variable
- Receives accounting updates from the remote strategy via incoming CCTP messages (`handleReceiveFinalizedMessage`)
- Restricts deposits to a single `DEPOSITER` address (typically the yvUSD vault)
- Only exposes local USDC balance as immediately withdrawable — remote assets must be bridged back with a delay before they can be withdrawn

> **Withdrawal availability vs. total accounting**
>
> Only `balanceOfAsset()`, the amount of local USDC on mainnet, is immediately withdrawable from yvUSD. Remote capital on other chains is included in yvUSD's `totalAssets()` value, but must be bridged back before it can be redeemed.

## Discovering Destinations (Onchain)

The yvUSD vault does not store a list of destination-chain addresses. Instead, yvUSD allocates to **origin-chain strategies**, and each cross-chain strategy contains its own destination configuration as queryable public immutables.

Not all yvUSD strategies are cross-chain. The vault can also hold mainnet-only strategies (for example, Morpho-based looper strategies that deploy capital without bridging). Cross-chain strategies can be identified because a set of `REMOTE_*` public immutables that mainnet strategies do not have (and usually the strategy name on mainnet is CCTPStrategy).

To learn "where yvUSD is sending assets", you:

1. Enumerate the strategy addresses used by the yvUSD vault on Ethereum.
2. For each strategy, determine whether it is a cross-chain strategy.
3. For cross-chain strategies, read the destination configuration (`REMOTE_*` immutables).
4. (Optional) On the destination chain, read the remote strategy to learn where it deploys funds (for example, the target ERC-4626 vault).

### 1) Enumerate Origin Strategy Addresses

Onchain, the vault can only expose *arrays* of strategies via limited mechanisms (for example, the withdrawal `default_queue`, max length 10). For a complete and always-up-to-date list, you typically need to index events offchain.

Practical options:

- **Quick view (onchain call):** `VaultV3.get_default_queue()` returns the current default withdrawal queue (max 10 strategies).
- **Canonical list (offchain indexing):** index strategy add/remove events for the vault (or related periphery like a Debt Allocator / Role Manager) and maintain the active set.
- **Periphery:** if you have access to a Yearn Registry / Role Manager for the chain, use those helpers to retrieve vault/strategy configuration.

### 2) Identify Whether A Strategy Is Cross-Chain

Call `REMOTE_CHAIN_ID()` on the strategy contract. Cross-chain strategies (`CCTPStrategy`) expose this as a public immutable returning the destination EVM chain ID. Mainnet-only strategies do not implement this function and the call will revert.

A non-zero return value confirms the strategy is cross-chain and bridges assets to another chain. A revert (or a return value of `0`) indicates a mainnet-only strategy.

As a secondary check, `REMOTE_COUNTERPART()` returns the address of the paired remote strategy contract. A non-zero address further confirms the strategy is cross-chain.

### 3) Read Destination Configuration From The Strategy

For cross-chain strategies (origin side), the key queryable fields are:

- `REMOTE_ID()` (CCTP domain encoded as `bytes32`)
- `REMOTE_CHAIN_ID()` (EVM chain id)
- `REMOTE_COUNTERPART()` (remote strategy contract address on the destination chain)
- `DEPOSITER()` (address allowed to deposit into the strategy; typically the yvUSD vault)

This is the source of truth for where the origin strategy bridges to.

### 4) Read The Remote Strategy’s Deployment Target (Optional)

For the standard remote implementation (`CCTPRemoteStrategy`), the remote strategy deploys into an ERC-4626 vault that is stored as an immutable `vault` (see `BaseRemote4626`).

## Remote strategy (standard: `CCTPRemoteStrategy`)

Deployed on the destination chain. It:

- Receives USDC from the origin via CCTP and deposits it into a target ERC-4626 vault
- Reports total assets back to the origin by sending a CCTP *message* (no token transfer)
- Processes withdrawal requests by redeeming from the vault, bridging USDC back via CCTP, and sending an updated accounting message

## Accounting model

`remoteAssets` on the origin strategy on mainnet is updated in two situations:

1. **Outbound bridge** (`_deployFunds`): incremented immediately when USDC is bridged out
2. **Inbound message** (`handleReceiveFinalizedMessage`): overwritten with the value sent by the remote strategy's `report()` or `processWithdrawal()`

Because the inbound update depends on a CCTP message relay, `remoteAssets` can be stale between keeper cycles. A report or withdrawal from the remote always sends a fresh accounting message to resync.

## Keeper Operations

### Remote strategy keepers

| Function | Description |
|---|---|
| `report()` | Computes `totalAssets`, bridges the value as a CCTP message to the origin |
| `processWithdrawal(amount)` | Withdraws `amount` from the vault, bridges USDC back to origin, sends accounting message |
| `tend()` | Pushes idle local USDC into the vault |

### Origin strategy keepers

The origin strategy itself is a standard Yearn V3 tokenized strategy — its `report()` triggers the vault's normal accounting. The vault's debt allocator controls how much is allocated to each cross-chain strategy.

## Deployment

Origin and remote strategy addresses are pre-computed so each side can be configured with the other's address before either is deployed.

- **Origin** (`StrategyFactory.newStrategy()`): deployed with CREATE, nonce-based address prediction
- **Remote** (`RemoteStrategyFactory.deployRemoteStrategy()`): deployed with CREATE3, deterministic salt of `keccak256(vault, remoteDomain, remoteCounterpart)`

The factories are deployed at the same address on every chain.

---

## HyperLiquid HLP Variant

The HyperLiquid strategy uses the same origin-side `CCTPStrategy` on Ethereum mainnet, but replaces `CCTPRemoteStrategy` with `HyperRemoteStrategy` on HyperEVM. Instead of depositing into an ERC-4626 vault, capital is deployed into HyperCore's **HLP (HyperLiquidity Provider) vault**, which earns yield by providing liquidity to HyperLiquid's perpetual exchange.

### What is different

- The EVM↔Core bridge is asynchronous and uses HyperLiquid's native precompiles — it is not atomic
- The HLP vault enforces a **4-day lockup** on withdrawals
- Deposits and withdrawals are each a **2-step keeper process**
- `report()` does not auto-push idle funds (pushing to Core is async and would break accounting)

### Deposit flow (2 steps)

```
Step 1: pushFunds(amount)
  HyperEVM USDC → CoreDepositWallet → HyperCore spot account  [async]

Step 2: depositToVault(amount)
  HyperCore spot → perps account → HLP vault
```

Call `depositToVault` only after confirming funds have arrived in the spot account via `coreSpotBalance()`.

### Withdrawal flow (2 steps)

```
Step 1: withdrawFromVault(amount)
  HLP vault → HyperCore perps → spot account  [subject to 4-day lockup]

Step 2: processWithdrawal(amount)
  HyperCore spot → HyperEVM → CCTP bridge → Ethereum mainnet
  + sends accounting message to origin strategy
```

Call `processWithdrawal` only after the lockup has elapsed and funds are confirmed in `coreSpotBalance()`.

### View functions

| Function | Returns |
|---|---|
| `coreSpotBalance()` | USDC in HyperCore spot account (bridgeable to EVM) |
| `corePerpsBalance()` | USDC in HyperCore perps account |
| `vaultEquity()` | USDC value of position in the HLP vault |
| `valueOfDeployedAssets()` | Sum of vault equity + spot + perps (used in `totalAssets`) |

### HLP-specific risks

- **4-day lockup**: capital committed to HLP cannot be retrieved for at least 4 days after initiating a withdrawal
- **HyperLiquid exchange risk**: the HLP vault is exposed to losses from the HyperLiquid perpetual exchange, which are socialized across depositors
- **Async accounting**: `remoteAssets` on the mainnet strategy reflects the last relayed CCTP message; there is an inherent lag between on-Core state changes and mainnet accounting

## Links

<PrettyLink>[yvUSD developer docs index](/developers/yvusd)</PrettyLink>

<PrettyLink>[yvUSD contract addresses](/developers/addresses/yvusd-contracts)</PrettyLink>
