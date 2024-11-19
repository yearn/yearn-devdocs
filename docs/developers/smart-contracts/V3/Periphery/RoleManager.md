<!-- markdownlint-disable MD024 MD034 MD036 -->
# RoleManager

[Git Source](https://github.com/yearn/vault-periphery/blob/516f95edcd36e28b714b52408c05009b430900e3/src/managers/RoleManager.sol)

**Inherits:** Positions

## State Variables

### PENDING_GOVERNANCE

Position ID for "Pending Governance".

```solidity
bytes32 public constant PENDING_GOVERNANCE = keccak256("Pending Governance");
```

### GOVERNANCE

Position ID for "Governance".

```solidity
bytes32 public constant GOVERNANCE = keccak256("Governance");
```

### MANAGEMENT

Position ID for "Brain".

```solidity
bytes32 public constant MANAGEMENT = keccak256("Management");
```

### KEEPER

Position ID for "Keeper".

```solidity
bytes32 public constant KEEPER = keccak256("Keeper");
```

### REGISTRY

Position ID for the "Registry".

```solidity
bytes32 public constant REGISTRY = keccak256("Registry");
```

### ACCOUNTANT

Position ID for the "Accountant".

```solidity
bytes32 public constant ACCOUNTANT = keccak256("Accountant");
```

### DEBT_ALLOCATOR

Position ID for the "Debt Allocator".

```solidity
bytes32 public constant DEBT_ALLOCATOR = keccak256("Debt Allocator");
```

### chad

Immutable address that the `role_manager` position

```solidity
address public chad;
```

### vaults

Array storing addresses of all managed vaults.

```solidity
address[] public vaults;
```

### projectName

```solidity
string internal projectName;
```

### defaultProfitMaxUnlockTime

Default time until profits are fully unlocked for new vaults.

```solidity
uint256 public defaultProfitMaxUnlockTime;
```

### vaultConfig

Mapping of vault addresses to its config.

```solidity
mapping(address => VaultConfig) public vaultConfig;
```

### _assetToVault

Mapping of underlying asset, api version and category to vault.

```solidity
mapping(address => mapping(string => mapping(uint256 => address))) internal _assetToVault;
```

## Functions

### constructor

```solidity
constructor();
```

### initialize

```solidity
function initialize(
    string calldata _projectName,
    address _governance,
    address _management,
    address _keeper,
    address _registry,
    address _accountant,
    address _debtAllocator
) external;
```

### newVault

Creates a new endorsed vault with default profit max unlock time.

```solidity
function newVault(address _asset, uint256 _category, string calldata _name, string calldata _symbol)
    external
    virtual
    onlyPositionHolder(GOVERNANCE)
    returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_name`|`string`|Name of the vault.|
|`_symbol`|`string`|Symbol of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault Address of the newly created vault.|

### newVault

Creates a new endorsed vault with default profit max unlock time.

```solidity
function newVault(
    address _asset,
    uint256 _category,
    string calldata _name,
    string calldata _symbol,
    uint256 _depositLimit
) external virtual onlyPositionHolder(GOVERNANCE) returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_name`|`string`|Name of the vault.|
|`_symbol`|`string`|Symbol of the vault.|
|`_depositLimit`|`uint256`|The deposit limit to start the vault with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault Address of the newly created vault.|

### _newVault

Creates a new endorsed vault.

```solidity
function _newVault(address _asset, uint256 _category, string memory _name, string memory _symbol, uint256 _depositLimit)
    internal
    virtual
    returns (address _vault);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_name`|`string`|Name of the vault.|
|`_symbol`|`string`|Symbol of the vault.|
|`_depositLimit`|`uint256`|The deposit limit to start the vault with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the newly created vault.|

### _sanctify

*Assigns roles to the newly added vault.
This will override any previously set roles for the holders. But not effect
the roles held by other addresses.*

```solidity
function _sanctify(address _vault, address _debtAllocator) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to sanctify.|
|`_debtAllocator`|`address`|Address of the debt allocator for the vault.|

### _setRole

*Used internally to set the roles on a vault for a given position.
Will not set the roles if the position holder is address(0).
This does not check that the roles are !=0 because it is expected that
the holder will be set to 0 if the position is not being used.*

```solidity
function _setRole(address _vault, Position memory _position) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|
|`_position`|`Position`|Holder address and roles to set.|

### _setAccountant

*Sets the accountant on the vault and adds the vault to the accountant.
This temporarily gives the `ACCOUNTANT_MANAGER` role to this contract.*

```solidity
function _setAccountant(address _vault) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to set up the accountant for.|

### _setDepositLimit

*Used to set an initial deposit limit when a new vault is deployed.
Any further updates to the limit will need to be done by an address that
holds the `DEPOSIT_LIMIT_MANAGER` role.*

```solidity
function _setDepositLimit(address _vault, uint256 _depositLimit) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the newly deployed vault.|
|`_depositLimit`|`uint256`|The deposit limit to set.|

### addNewVault

Adds a new vault to the RoleManager with the specified category.

*If not already endorsed this function will endorse the vault.
A new debt allocator will be deployed and configured.*

```solidity
function addNewVault(address _vault, uint256 _category) external virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to be added.|
|`_category`|`uint256`|Category associated with the vault.|

### addNewVault

Adds a new vault to the RoleManager with the specified category and debt allocator.

*If not already endorsed this function will endorse the vault.*

```solidity
function addNewVault(address _vault, uint256 _category, address _debtAllocator)
    public
    virtual
    onlyPositionHolder(GOVERNANCE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to be added.|
|`_category`|`uint256`|Category associated with the vault.|
|`_debtAllocator`|`address`|Address of the debt allocator for the vault.|

### updateDebtAllocator

Update a `_vault`s debt allocator.

*This will use the default Debt Allocator currently set.*

```solidity
function updateDebtAllocator(address _vault) external virtual returns (address _newDebtAllocator);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update the allocator for.|

### updateDebtAllocator

Update a `_vault`s debt allocator to a specified `_debtAllocator`.

```solidity
function updateDebtAllocator(address _vault, address _debtAllocator) public virtual onlyPositionHolder(MANAGEMENT);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update the allocator for.|
|`_debtAllocator`|`address`|Address of the new debt allocator.|

### updateKeeper

Update a `_vault`s keeper to a specified `_keeper`.

```solidity
function updateKeeper(address _vault, address _keeper) external virtual onlyPositionHolder(MANAGEMENT);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update the keeper for.|
|`_keeper`|`address`|Address of the new keeper.|

### updateVaultName

```solidity
function updateVaultName(address _vault, string calldata _name) external onlyPositionHolder(GOVERNANCE);
```

### updateVaultSymbol

```solidity
function updateVaultSymbol(address _vault, string calldata _symbol) external onlyPositionHolder(GOVERNANCE);
```

### removeVault

Removes a vault from the RoleManager.

*This will NOT un-endorse the vault from the registry.*

```solidity
function removeVault(address _vault) external virtual onlyPositionHolder(MANAGEMENT);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to be removed.|

### removeRoles

Removes a specific role(s) for a `_holder` from the `_vaults`.

*Can be used to remove one specific role or multiple.*

```solidity
function removeRoles(address[] calldata _vaults, address _holder, uint256 _role)
    external
    virtual
    onlyPositionHolder(GOVERNANCE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vaults`|`address[]`|Array of vaults to adjust.|
|`_holder`|`address`|Address who's having a role removed.|
|`_role`|`uint256`|The role or roles to remove from the `_holder`.|

### setPositionRoles

Setter function for updating a positions roles.

```solidity
function setPositionRoles(bytes32 _position, uint256 _newRoles) external virtual onlyPositionHolder(GOVERNANCE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_position`|`bytes32`|Identifier for the position.|
|`_newRoles`|`uint256`|New roles for the position.|

### setPositionHolder

Setter function for updating a positions holder.

*Updating `Governance` requires setting `PENDING_GOVERNANCE`
and then the pending address calling [acceptGovernance](/src/managers/RoleManager.sol/contract.RoleManager.md#acceptgovernance).*

```solidity
function setPositionHolder(bytes32 _position, address _newHolder) external virtual onlyPositionHolder(GOVERNANCE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_position`|`bytes32`|Identifier for the position.|
|`_newHolder`|`address`|New address for position.|

### setDefaultProfitMaxUnlockTime

Sets the default time until profits are fully unlocked for new vaults.

```solidity
function setDefaultProfitMaxUnlockTime(uint256 _newDefaultProfitMaxUnlockTime)
    external
    virtual
    onlyPositionHolder(GOVERNANCE);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newDefaultProfitMaxUnlockTime`|`uint256`|New value for defaultProfitMaxUnlockTime.|

### acceptGovernance

Accept the Governance role.

*Caller must be the Pending Governance.*

```solidity
function acceptGovernance() external virtual onlyPositionHolder(PENDING_GOVERNANCE);
```

### name

Get the name of this contract.

```solidity
function name() external view virtual returns (string memory);
```

### getAllVaults

Get all vaults that this role manager controls..

```solidity
function getAllVaults() external view virtual returns (address[] memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|The full array of vault addresses.|

### getVault

Get the vault for a specific asset, api and category.

*This will return address(0) if one has not been added or deployed.*

```solidity
function getVault(address _asset, string memory _apiVersion, uint256 _category)
    external
    view
    virtual
    returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The underlying asset used.|
|`_apiVersion`|`string`|The version of the vault.|
|`_category`|`uint256`|The category of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The vault for the specified `_asset`, `_apiVersion` and `_category`.|

### latestVault

Get the latest vault for a specific asset.

*This will default to using category 1.*

```solidity
function latestVault(address _asset) external view virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The underlying asset used.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault latest vault for the specified `_asset` if any.|

### latestVault

Get the latest vault for a specific asset.

```solidity
function latestVault(address _asset, uint256 _category) public view virtual returns (address _vault);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The underlying asset used.|
|`_category`|`uint256`|The category of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|latest vault for the specified `_asset` if any.|

### isVaultsRoleManager

Check if a vault is managed by this contract.

*This will check if the `asset` variable in the struct has been
set for an easy external view check.
Does not check the vaults `role_manager` position since that can be set
by anyone for a random vault.*

```solidity
function isVaultsRoleManager(address _vault) external view virtual returns (bool);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. The vaults role manager status.|

### getDebtAllocator

Get the debt allocator for a specific vault.

*Will return address(0) if the vault is not managed by this contract.*

```solidity
function getDebtAllocator(address _vault) external view virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of the debt allocator if any.|

### getCategory

Get the category for a specific vault.

*Will return 0 if the vault is not managed by this contract.*

```solidity
function getCategory(address _vault) external view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The category of the vault if any.|

### getGovernance

Get the address assigned to the Governance position.

```solidity
function getGovernance() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Governance position.|

### getPendingGovernance

Get the address assigned to the Pending Governance position.

```solidity
function getPendingGovernance() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Pending Governance position.|

### getManagement

Get the address assigned to the Management position.

```solidity
function getManagement() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Management position.|

### getKeeper

Get the address assigned to the Keeper position.

```solidity
function getKeeper() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Keeper position.|

### getRegistry

Get the address assigned to the Registry.

```solidity
function getRegistry() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Registry.|

### getAccountant

Get the address assigned to the accountant.

```solidity
function getAccountant() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the accountant.|

### getDebtAllocator

Get the address assigned to be the debt allocator if any.

```solidity
function getDebtAllocator() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to be the debt allocator if any.|

### getGovernanceRoles

Get the roles given to the Governance position.

```solidity
function getGovernanceRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Governance position.|

### getManagementRoles

Get the roles given to the Management position.

```solidity
function getManagementRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Management position.|

### getKeeperRoles

Get the roles given to the Keeper position.

```solidity
function getKeeperRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Keeper position.|

### getDebtAllocatorRoles

Get the roles given to the debt allocators.

```solidity
function getDebtAllocatorRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the debt allocators.|

## Events

### AddedNewVault

Emitted when a new vault has been deployed or added.

```solidity
event AddedNewVault(address indexed vault, address indexed debtAllocator, uint256 category);
```

### UpdateDebtAllocator

Emitted when a vaults debt allocator is updated.

```solidity
event UpdateDebtAllocator(address indexed vault, address indexed debtAllocator);
```

### RemovedVault

Emitted when a vault is removed.

```solidity
event RemovedVault(address indexed vault);
```

### UpdateDefaultProfitMaxUnlockTime

Emitted when the defaultProfitMaxUnlockTime variable is updated.

```solidity
event UpdateDefaultProfitMaxUnlockTime(uint256 newDefaultProfitMaxUnlockTime);
```

## Errors

### AlreadyDeployed

Revert message for when a vault has already been deployed.

```solidity
error AlreadyDeployed(address _vault);
```

## Structs

### VaultConfig

Config that holds all vault info.

```solidity
struct VaultConfig {
    address asset;
    uint256 category;
    address debtAllocator;
    uint256 index;
}
```
