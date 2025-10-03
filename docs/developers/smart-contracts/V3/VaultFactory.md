<!-- markdownlint-disable MD024 MD034 MD036 -->

# VaultFactory.vy

vyper: `0.3.7`
author: `yearn.finance`
license: `GNU AGPLv3`

## Yearn Vault Factory**

This vault Factory can be used by anyone wishing to deploy their own ERC4626 compliant Yearn V3 Vault of the same API version. The factory clones new vaults from its specific `VAULT_ORIGINAL` immutable address set on creation of the factory. The deployments are done through create2 with a specific `salt` that is derived from a combination of the deployer's address, the underlying asset used, as well as the name and symbol specified. Meaning a deployer will not be able to deploy the exact same vault twice and will need to use different name and or symbols for vaults that use the same other parameters such as `asset`. The factory also holds the protocol fee configs for each vault and strategy of its specific `API_VERSION` that determine how much of the fees charged are designated "protocol fees" and sent to the designated `fee_recipient`. The protocol fees work through a revenue share system, where if the vault or strategy decides to charge X amount of total fees during a `report` the protocol fees are a percent of X. The protocol fees will be sent to the designated fee_recipient and then (X - protocol_fees) will be sent to the vault/strategy specific fee recipient.

## Functions

### deploy_new_vault

Deploys a new clone of the original vault.

```solidity
function deploy_new_vault(address,string,string,address,uint256)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| asset | address | The asset to be used for the vault. |
| name | string | The name of the new vault. |
| symbol | string | The symbol of the new vault. |
| role_manager | address | The address of the role manager. |
| profit_max_unlock_time | uint256 | The time over which the profits will unlock. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | address | The address of the new vault. |

### vault_original

Get the address of the vault to clone from

```solidity
function vault_original()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | address | The address of the original vault. |

### apiVersion

Get the API version of the factory.

```solidity
function apiVersion()
```

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | string | The API version of the factory. |

### protocol_fee_config

Called during vault and strategy reports to retrieve the protocol fee to charge and address to receive the fees.

```solidity
function protocol_fee_config()
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| vault | unknown | Address of the vault that would be reporting. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint16 | Fee in bps |

| _output1 | address | Address of fee recipient |

### protocol_fee_config

```solidity
function protocol_fee_config(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| vault | address | Address of the vault that would be reporting. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | uint16 | Fee in bps |

| _output1 | address | Address of fee recipient |

### use_custom_protocol_fee

If a custom protocol fee is used for a vault.

```solidity
function use_custom_protocol_fee(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| vault | address | Address of the vault to check. |

#### Return Values

| Name | Type | Description |
|------|------|-------------|
| _output0 | bool | If a custom protocol fee is used. |

### set_protocol_fee_bps

Set the protocol fee in basis points

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

```solidity
function set_protocol_fee_bps(uint16)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_protocol_fee_bps | uint16 | The new protocol fee in basis points |

### set_protocol_fee_recipient

Set the protocol fee recipient

*Can never be set to 0 to avoid issuing fees to the 0 address.*

```solidity
function set_protocol_fee_recipient(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_protocol_fee_recipient | address | The new protocol fee recipient |

### set_custom_protocol_fee_bps

Allows Governance to set custom protocol fees for a specific vault or strategy.

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

```solidity
function set_custom_protocol_fee_bps(address,uint16)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| vault | address | The address of the vault or strategy to customize. |
| new_custom_protocol_fee | uint16 | The custom protocol fee in BPS. |

### remove_custom_protocol_fee

Allows governance to remove a previously set custom protocol fee.

```solidity
function remove_custom_protocol_fee(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| vault | address | The address of the vault or strategy to remove the custom fee for. |

### shutdown_factory

To stop new deployments through this factory.

*A one time switch available for governance to stop new vaults from being deployed through the factory. NOTE: This will have no effect on any previously deployed vaults that deployed from this factory.*

```solidity
function shutdown_factory()
```

### transferGovernance

Set the governance address

```solidity
function transferGovernance(address)
```

#### Parameters

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
| new_governance | address | The new governance address |

### acceptGovernance

Accept the governance address

```solidity
function acceptGovernance()
```

## Events

### NewVault

| Name | Type | Indexed? |
|------|------|----------|
| vault_address | address | Yes |
| asset | address | Yes |

### UpdateProtocolFeeBps

| Name | Type | Indexed? |
|------|------|----------|
| old_fee_bps | uint16 | No |
| new_fee_bps | uint16 | No |

### UpdateProtocolFeeRecipient

| Name | Type | Indexed? |
|------|------|----------|
| old_fee_recipient | address | Yes |
| new_fee_recipient | address | Yes |

### UpdateCustomProtocolFee

| Name | Type | Indexed? |
|------|------|----------|
| vault | address | Yes |
| new_custom_protocol_fee | uint16 | No |

### RemovedCustomProtocolFee

| Name | Type | Indexed? |
|------|------|----------|
| vault | address | Yes |

### FactoryShutdown

| Name | Type | Indexed? |
|------|------|----------|

### GovernanceTransferred

| Name | Type | Indexed? |
|------|------|----------|
| previousGovernance | address | Yes |
| newGovernance | address | Yes |

### UpdatePendingGovernance

| Name | Type | Indexed? |
|------|------|----------|
| newPendingGovernance | address | Yes |
