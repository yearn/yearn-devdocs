# VaultFactory.vy

**Yearn Vault Factory**

*This vault Factory can be used by anyone wishing to deploy their own ERC4626 compliant Yearn V3 Vault of the same API version. The factory clones new vaults from its specific `VAULT_ORIGINAL` immutable address set on creation of the factory. The deployments are done through create2 with a specific `salt` that is derived from a combination of the deployer's address, the underlying asset used, as well as the name and symbol specified. Meaning a deployer will not be able to deploy the exact same vault twice and will need to use different name and or symbols for vaults that use the same other parameters such as `asset`. The factory also holds the protocol fee configs for each vault and strategy of its specific `API_VERSION` that determine how much of the fees charged are designated "protocol fees" and sent to the designated `fee_recipient`. The protocol fees work through a revenue share system, where if the vault or strategy decides to charge X amount of total fees during a `report` the protocol fees are a percent of X. The protocol fees will be sent to the designated fee_recipient and then (X - protocol_fees) will be sent to the vault/strategy specific fee recipient.*

## Functions

### deploy_new_vault

```solidity
function deploy_new_vault(address,string,string,address,uint256)
```

Deploys a new clone of the original vault.

#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *asset* |  ** |  *The asset to be used for the vault.* |
|  *name* |  ** |  *The name of the new vault.* |
|  *symbol* |  ** |  *The symbol of the new vault.* |
|  *role_manager* |  ** |  *The address of the role manager.* |
|  *profit_max_unlock_time* |  ** |  *The time over which the profits will unlock.* |
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The address of the new vault.* |

### vault_original

```solidity
function vault_original()
```

Get the address of the vault to clone from
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The address of the original vault.* |

### apiVersion

```solidity
function apiVersion()
```

Get the API version of the factory.
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *The API version of the factory.* |

### protocol_fee_config

```solidity
function protocol_fee_config()
```

Called during vault and strategy reports to retrieve the protocol fee to charge and address to receive the fees.
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *vault* |  ** |  *Address of the vault that would be reporting.* |
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *Fee in bps* |
|  *Address of fee recipient* |

### protocol_fee_config

```solidity
function protocol_fee_config(address)
```
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *vault* |  ** |  *Address of the vault that would be reporting.* |
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *Fee in bps* |
|  *Address of fee recipient* |

### use_custom_protocol_fee

```solidity
function use_custom_protocol_fee(address)
```

If a custom protocol fee is used for a vault.
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *vault* |  ** |  *Address of the vault to check.* |
#### *Return Value*

| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  *If a custom protocol fee is used.* |

### set_protocol_fee_bps

```solidity
function set_protocol_fee_bps(uint16)
```

Set the protocol fee in basis points

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_protocol_fee_bps* |  ** |  *The new protocol fee in basis points* |

### set_protocol_fee_recipient

```solidity
function set_protocol_fee_recipient(address)
```

Set the protocol fee recipient

*Can never be set to 0 to avoid issuing fees to the 0 address.*
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_protocol_fee_recipient* |  ** |  *The new protocol fee recipient* |

### set_custom_protocol_fee_bps

```solidity
function set_custom_protocol_fee_bps(address,uint16)
```

Allows Governance to set custom protocol fees for a specific vault or strategy.

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *vault* |  ** |  *The address of the vault or strategy to customize.* |
|  *new_custom_protocol_fee* |  ** |  *The custom protocol fee in BPS.* |

### remove_custom_protocol_fee

```solidity
function remove_custom_protocol_fee(address)
```

Allows governance to remove a previously set custom protocol fee.
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *vault* |  ** |  *The address of the vault or strategy to remove the custom fee for.* |

### shutdown_factory

```solidity
function shutdown_factory()
```

To stop new deployments through this factory.

*A one time switch available for governance to stop new vaults from being deployed through the factory. NOTE: This will have no effect on any previously deployed vaults that deployed from this factory.*

### transferGovernance

```solidity
function transferGovernance(address)
```

Set the governance address
#### *Parameter*

| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  *new_governance* |  ** |  *The new governance address* |

### acceptGovernance

```solidity
function acceptGovernance()
```

Accept the governance address

## Events

**NewVault**

* `vault_address` : address, *indexed*
* `asset` : address, *indexed*

**UpdateProtocolFeeBps**

* `old_fee_bps` : uint16, *notIndexed*
* `new_fee_bps` : uint16, *notIndexed*

**UpdateProtocolFeeRecipient**

* `old_fee_recipient` : address, *indexed*
* `new_fee_recipient` : address, *indexed*

**UpdateCustomProtocolFee**

* `vault` : address, *indexed*
* `new_custom_protocol_fee` : uint16, *notIndexed*

**RemovedCustomProtocolFee**

* `vault` : address, *indexed*

**FactoryShutdown**

**GovernanceTransferred**

* `previousGovernance` : address, *indexed*
* `newGovernance` : address, *indexed*

**UpdatePendingGovernance**

* `newPendingGovernance` : address, *indexed*
