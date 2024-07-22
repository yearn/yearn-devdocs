# VaultFactory.vy

[Git Source](https://github.com/yearn/yearn-vaults-v3/blob/v3.0.2-1/contracts/VaultFactory.vy)

> vyper: `0.3.7`
> author: `yearn.finance`
> license: `GNU AGPLv3`

**Yearn Vault Factory**

*This vault Factory can be used by anyone wishing to deploy their own ERC4626 compliant Yearn V3 Vault of the same API version. The factory clones new vaults from its specific `VAULT_ORIGINAL` immutable address set on creation of the factory. The deployments are done through create2 with a specific `salt` that is derived from a combination of the deployer's address, the underlying asset used, as well as the name and symbol specified. Meaning a deployer will not be able to deploy the exact same vault twice and will need to use different name and or symbols for vaults that use the same other parameters such as `asset`. The factory also holds the protocol fee configs for each vault and strategy of its specific `API_VERSION` that determine how much of the fees charged are designated "protocol fees" and sent to the designated `fee_recipient`. The protocol fees work through a revenue share system, where if the vault or strategy decides to charge X amount of total fees during a `report` the protocol fees are a percent of X. The protocol fees will be sent to the designated fee_recipient and then (X - protocol_fees) will be sent to the vault/strategy specific fee recipient.*

## Events

### NewVault

* `vault_address` : address, *indexed*
* `asset` : address, *indexed*

### UpdateProtocolFeeBps

* `old_fee_bps` : uint16, *notIndexed*
* `new_fee_bps` : uint16, *notIndexed*

### UpdateProtocolFeeRecipient

* `old_fee_recipient` : address, *indexed*
* `new_fee_recipient` : address, *indexed*

### UpdateCustomProtocolFee

* `vault` : address, *indexed*
* `new_custom_protocol_fee` : uint16, *notIndexed*

### RemovedCustomProtocolFee

* `vault` : address, *indexed*

### FactoryShutdown

### UpdateGovernance

* `governance` : address, *indexed*

### NewPendingGovernance

* `pending_governance` : address, *indexed*

## Methods

### deploy_new_vault
>
> type: `nonpayable function`
>

Deploys a new clone of the original vault.

Arguments:

* `asset`:  - *The asset to be used for the vault.*

* `name`:  - *The name of the new vault.*

* `symbol`:  - *The symbol of the new vault.*

* `role_manager`:  - *The address of the role manager.*

* `profit_max_unlock_time`:  - *The time over which the profits will unlock.*

Returns:

* `_0` - The address of the new vault.

### vault_original
>
> type: `view function`
>

Get the address of the vault to clone from

Returns:

* `_0` - The address of the original vault.

### apiVersion
>
> type: `view function`
>

Get the API version of the factory.

Returns:

* `_0` - The API version of the factory.

### protocol_fee_config
>
> type: `view function`
>

Called during vault and strategy reports to retrieve the protocol fee to charge and address to receive the fees.

Arguments:

* `vault`:  - *Address of the vault that would be reporting.*

Returns:

* `_0` - The protocol fee config for the msg sender.

### set_protocol_fee_bps
>
> type: `nonpayable function`
>

Set the protocol fee in basis points

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

Arguments:

* `new_protocol_fee_bps`:  - *The new protocol fee in basis points*

### set_protocol_fee_recipient
>
> type: `nonpayable function`
>

Set the protocol fee recipient

*Can never be set to 0 to avoid issuing fees to the 0 address.*

Arguments:

* `new_protocol_fee_recipient`:  - *The new protocol fee recipient*

### set_custom_protocol_fee_bps
>
> type: `nonpayable function`
>

Allows Governance to set custom protocol fees for a specific vault or strategy.

*Must be below the max allowed fee, and a default fee_recipient must be set so we don&#39;t issue fees to the 0 address.*

Arguments:

* `vault`:  - *The address of the vault or strategy to customize.*

* `new_custom_protocol_fee`:  - *The custom protocol fee in BPS.*

### remove_custom_protocol_fee
>
> type: `nonpayable function`
>

Allows governance to remove a previously set custom protocol fee.

Arguments:

* `vault`:  - *The address of the vault or strategy to remove the custom fee for.*

### shutdown_factory
>
> type: `nonpayable function`
>

To stop new deployments through this factory.

*A one time switch available for governance to stop new vaults from being deployed through the factory. NOTE: This will have no effect on any previously deployed vaults that deployed from this factory.*

### set_governance
>
> type: `nonpayable function`
>

Set the governance address

Arguments:

* `new_governance`:  - *The new governance address*

### accept_governance
>
> type: `nonpayable function`
>

Accept the governance address
