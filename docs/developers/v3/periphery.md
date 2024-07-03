# Periphery

Yearn V3 is built to be modular and customizable by anyone wishing to run their own vault. In order to do this the core code has been left as un-opinionated as possible while allowing it to be customized through the use of optional "Periphery" contracts or "modules".

This is a non-exhaustive list of the current periphery contracts developed or deployed in order to assist those wishing to deploy/manage their own V3 vaults.

For the most updated contracts visit:

Vault Periphery Repo: https://github.com/yearn/vault-periphery
TokenizedStrategy Periphery: https://github.com/yearn/tokenized-strategy-periphery

The deployed address of most periphery contracts or their corresponding factories can be found on chain from the Protocol Address provider: `0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B`

The Yearn specific periphery contracts can be retrieved from that chains [Role Manager](../addresses)

## Vault Periphery

The contracts in the 'Vault Periphery' are meant to be used alongside a V3 multi strategy vault in order to help add additional functionality.

### Release Registry

https://github.com/yearn/vault-periphery/blob/master/contracts/registry/ReleaseRegistry.sol

Yearn controlled registry to track any new versions of V3 released on that specific chain.

Each time a new Version of the [Vault Factory](https://github.com/yearn/yearn-vaults-v3/blob/master/contracts/VaultFactory.vy) is deployed it will get added to the Release Registry.

### Registry

https://github.com/yearn/vault-periphery/blob/master/contracts/registry/Registry.sol

Stores the endorsed multi strategy and single strategy vaults. Can also deploy new multi strategy vaults based on the most recent Vault Factory added to the Release Registry.

- `newEndorsedVault(...)` Deploy and endorse a new multi strategy vault.

Deploy a custom Registry using the [RegistryFactory](/vaults/smart-contracts/v3/periphery/RegistryFactory.md)

### Accountant

https://github.com/yearn/vault-periphery/tree/master/contracts/accountants

By default V3 multi strategy vaults have fees set to 0 and will need an `accountant` set to charge fees.

If set an accountant is called during each [`process_report`](https://github.com/yearn/yearn-vaults-v3/blob/9fbc614bbce9d7cbad42e284a15f0f43cf1a673f/contracts/VaultV3.vy#L1202) with the relevant information for the strategies report. The accountant can hold any logic desired to charge performance fees, management fees, issue refunds, perform healthchecks etc.

Some possible non-standard uses of an accountant could be:

- Auto compounding rewards back into the vault
- Setting up a Junior Tranche
- Tiered fees based on % returns or TVL

To deploy a generic account use the [Accountant Factory](/vaults/smart-contracts/v3/periphery/AccountantFactory) and then call [`set_accountant`](https://github.com/yearn/yearn-vaults-v3/blob/9fbc614bbce9d7cbad42e284a15f0f43cf1a673f/contracts/VaultV3.vy#L1342) on the vault.

### Debt Allocator

https://github.com/yearn/vault-periphery/tree/master/contracts/debtAllocators

To manager the allocation of debt between multiple strategies in a multi strategy vault some generic Debt Allocators have been developed. These contracts are meant to be given the `DEBT_MANAGER` and `REPORTING_MANAGER` roles for a specific vault and then monitored by a keeper to manage the allocations based on set 'target ratios'.

The owner of the Debt allocator can set multiple parameters that will dictate when a keeper should call the `update_debt` function on the allocator based on the return value of the `shouldUpdateDebt` view function.

- `targetDebtRatio` A percent (in basis points) for the allocator to target a specific strategy to have. EX: 5_000 == 50% of the vaults funds.
- `maxDebtRatio` The max percent (in basis points) for the allocator to allow a strategy to have.
- `minimumChange` The minimum amount in terms of the underlying asset to be moved to trigger a debt update.
- `maxAcceptableBaseFee` The maximum the block.basefee is allowed to be during debt updates to save gas.
- `maxDebtUpdateLoss` The value to to send as [`maxLoss`](/developers/v3/integrating_v3#maxloss) for a debt update. Default is 1 (0.01%).
- `keeper` Allow an address to call the `update_debt` function.
- `manager` Non-governance address that is allowed to update the strategies target and max debt ratios.

You can deploy a single generic Debt Allocator using the [Debt Allocator Factory](/developers/v3/overview#protocol-address-provider) for any V3 vault.

### Role Manager

https://github.com/yearn/vault-periphery/blob/master/contracts/Managers/RoleManager.sol

The Role Manager is used to hold the `role_manager` position in Yearns multi strategy vaults and make deployments simpler. All role configuration and periphery contracts are set up during the vaults deployment.

Yearn specific periphery contracts can also all be retrieved on chain from the Role Manager on that chain.

For Yearn specific implementation addresses check [Contract Addresses](../addresses)
