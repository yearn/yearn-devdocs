# RoleManager.sol

[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/Managers/RoleManager.sol)

**Inherits:**
[Governance2Step](./Governance2Step)

## State Variables

### _name_

```solidity
bytes32 internal constant _name_ = bytes32(abi.encodePacked("Yearn V3 Vault Role Manager"));
```

### DADDY

Position ID for "daddy".

```solidity
bytes32 public constant DADDY = keccak256("Daddy");
```

### BRAIN

Position ID for "brain".

```solidity
bytes32 public constant BRAIN = keccak256("Brain");
```

### KEEPER

Position ID for "keeper".

```solidity
bytes32 public constant KEEPER = keccak256("Keeper");
```

### SECURITY

Position ID for "security".

```solidity
bytes32 public constant SECURITY = keccak256("Security");
```

### REGISTRY

Position ID for the Registry.

```solidity
bytes32 public constant REGISTRY = keccak256("Registry");
```

### ACCOUNTANT

Position ID for the Accountant.

```solidity
bytes32 public constant ACCOUNTANT = keccak256("Accountant");
```

### DEBT_ALLOCATOR

Position ID for Debt Allocator

```solidity
bytes32 public constant DEBT_ALLOCATOR = keccak256("Debt Allocator");
```

### STRATEGY_MANAGER

Position ID for Strategy manager.

```solidity
bytes32 public constant STRATEGY_MANAGER = keccak256("Strategy Manager");
```

### ALLOCATOR_FACTORY

Position ID for the Allocator Factory.

```solidity
bytes32 public constant ALLOCATOR_FACTORY = keccak256("Allocator Factory");
```

### chad

Immutable address that the RoleManager position

```solidity
address public immutable chad;
```

### vaults

Array storing addresses of all managed vaults.

```solidity
address[] public vaults;
```

### defaultProfitMaxUnlock

Default time until profits are fully unlocked for new vaults.

```solidity
uint256 public defaultProfitMaxUnlock = 10 days;
```

### _positions

Mapping of position ID to position information.

```solidity
mapping(bytes32 => Position) internal _positions;
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

### onlyPositionHolder

Only allow either governance or the position holder to call.

```solidity
modifier onlyPositionHolder(bytes32 _positionId);
```

### _isPositionHolder

Check if the msg sender is governance or the specified position holder.

```solidity
function _isPositionHolder(bytes32 _positionId) internal view virtual;
```

### constructor

```solidity
constructor(
    address _governance,
    address _daddy,
    address _brain,
    address _security,
    address _keeper,
    address _strategyManager,
    address _registry
) Governance2Step(_governance);
```

### newVault

Creates a new endorsed vault with default profit max
unlock time and doesn't set the deposit limit.

```solidity
function newVault(address _asset, uint256 _category) external virtual onlyPositionHolder(DADDY) returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault Address of the newly created vault.|

### newVault

Creates a new endorsed vault with default profit max unlock time.

```solidity
function newVault(address _asset, uint256 _category, uint256 _depositLimit)
    external
    virtual
    onlyPositionHolder(DADDY)
    returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_depositLimit`|`uint256`|The deposit limit to start the vault with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault Address of the newly created vault.|

### newVault

Creates a new endorsed vault.

```solidity
function newVault(address _asset, uint256 _category, uint256 _depositLimit, uint256 _profitMaxUnlockTime)
    external
    virtual
    onlyPositionHolder(DADDY)
    returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_depositLimit`|`uint256`|The deposit limit to start the vault with.|
|`_profitMaxUnlockTime`|`uint256`|Time until profits are fully unlocked.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_vault Address of the newly created vault.|

### _newVault

Creates a new endorsed vault.

```solidity
function _newVault(address _asset, uint256 _category, uint256 _depositLimit, uint256 _profitMaxUnlockTime)
    internal
    virtual
    returns (address _vault);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_category`|`uint256`|Category of the vault.|
|`_depositLimit`|`uint256`|The deposit limit to start the vault with.|
|`_profitMaxUnlockTime`|`uint256`|Time until profits are fully unlocked.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the newly created vault.|

### _deployAllocator

_Deploys a debt allocator for the specified vault._

```solidity
function _deployAllocator(address _vault) internal virtual returns (address _debtAllocator);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_debtAllocator`|`address`|Address of the deployed debt allocator.|

### _sanctify

_Assigns roles to the newly added vault.
This will override any previously set roles for the holders. But not effect
the roles held by other addresses._

```solidity
function _sanctify(address _vault, address _debtAllocator) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to sanctify.|
|`_debtAllocator`|`address`|Address of the debt allocator for the vault.|

### _setRole

_Used internally to set the roles on a vault for a given position.
Will not set the roles if the position holder is address(0).
This does not check that the roles are !=0 because it is expected that
the holder will be set to 0 if the position is not being used._

```solidity
function _setRole(address _vault, Position memory _position) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault.|
|`_position`|`Position`|Holder address and roles to set.|

### _setAccountant

_Sets the accountant on the vault and adds the vault to the accountant.
This temporarily gives the `ACCOUNTANT_MANAGER` role to this contract._

```solidity
function _setAccountant(address _vault) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to set up the accountant for.|

### _setDepositLimit

_Used to set an initial deposit limit when a new vault is deployed.
Any further updates to the limit will need to be done by an address that
holds the `DEPOSIT_LIMIT_MANAGER` role._

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

_If not already endorsed this function will endorse the vault.
A new debt allocator will be deployed and configured._

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

_If not already endorsed this function will endorse the vault._

```solidity
function addNewVault(address _vault, uint256 _category, address _debtAllocator)
    public
    virtual
    onlyPositionHolder(DADDY);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to be added.|
|`_category`|`uint256`|Category associated with the vault.|
|`_debtAllocator`|`address`|Address of the debt allocator for the vault.|

### updateDebtAllocator

Update a `_vault`s debt allocator.

_This will deploy a new allocator using the current
allocator factory set._

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
function updateDebtAllocator(address _vault, address _debtAllocator) public virtual onlyPositionHolder(BRAIN);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update the allocator for.|
|`_debtAllocator`|`address`|Address of the new debt allocator.|

### updateKeeper

Update a `_vault`s keeper to a specified `_keeper`.

```solidity
function updateKeeper(address _vault, address _keeper) external virtual onlyPositionHolder(BRAIN);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to update the keeper for.|
|`_keeper`|`address`|Address of the new keeper.|

### removeVault

Removes a vault from the RoleManager.

_This will NOT un-endorse the vault from the registry._

```solidity
function removeVault(address _vault) external virtual onlyPositionHolder(BRAIN);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to be removed.|

### removeRoles

Removes a specific role(s) for a `_holder` from the `_vaults`.

_Can be used to remove one specific role or multiple._

```solidity
function removeRoles(address[] calldata _vaults, address _holder, uint256 _role) external virtual onlyGovernance;
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
function setPositionRoles(bytes32 _position, uint256 _newRoles) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_position`|`bytes32`|Identifier for the position.|
|`_newRoles`|`uint256`|New roles for the position.|

### setPositionHolder

Setter function for updating a positions holder.

```solidity
function setPositionHolder(bytes32 _position, address _newHolder) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_position`|`bytes32`|Identifier for the position.|
|`_newHolder`|`address`|New address for position.|

### setDefaultProfitMaxUnlock

Sets the default time until profits are fully unlocked for new vaults.

```solidity
function setDefaultProfitMaxUnlock(uint256 _newDefaultProfitMaxUnlock) external virtual onlyGovernance;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_newDefaultProfitMaxUnlock`|`uint256`|New value for defaultProfitMaxUnlock.|

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

_This will return address(0) if one has not been added or deployed._

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

### isVaultsRoleManager

Check if a vault is managed by this contract.

_This will check if the `asset` variable in the struct has been
set for an easy external view check.
Does not check the vaults `role_manager` position since that can be set
by anyone for a random vault._

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

_Will return address(0) if the vault is not managed by this contract._

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

_Will return 0 if the vault is not managed by this contract._

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

### getPosition

Get the address and roles given to a specific position.

```solidity
function getPosition(bytes32 _positionId) public view virtual returns (address, uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_positionId`|`bytes32`|The position identifier.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address that holds that position.|
|`<none>`|`uint256`|The roles given to the specified position.|

### getPositionHolder

Get the current address assigned to a specific position.

```solidity
function getPositionHolder(bytes32 _positionId) public view virtual returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_positionId`|`bytes32`|The position identifier.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The current address assigned to the specified position.|

### getPositionRoles

Get the current roles given to a specific position ID.

```solidity
function getPositionRoles(bytes32 _positionId) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_positionId`|`bytes32`|The position identifier.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The current roles given to the specified position ID.|

### getDaddy

Get the address assigned to the Daddy position.

```solidity
function getDaddy() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Daddy position.|

### getBrain

Get the address assigned to the Brain position.

```solidity
function getBrain() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Brain position.|

### getSecurity

Get the address assigned to the Security position.

```solidity
function getSecurity() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Security position.|

### getKeeper

Get the address assigned to the Keeper position.

```solidity
function getKeeper() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Keeper position.|

### getStrategyManager

Get the address assigned to the strategy manager.

```solidity
function getStrategyManager() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the strategy manager.|

### getAccountant

Get the address assigned to the accountant.

```solidity
function getAccountant() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the accountant.|

### getRegistry

Get the address assigned to the Registry.

```solidity
function getRegistry() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the Registry.|

### getDebtAllocator

Get the address assigned to be the debt allocator if any.

```solidity
function getDebtAllocator() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to be the debt allocator if any.|

### getAllocatorFactory

Get the address assigned to the allocator factory.

```solidity
function getAllocatorFactory() external view virtual returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|The address assigned to the allocator factory.|

### getDaddyRoles

Get the roles given to the Daddy position.

```solidity
function getDaddyRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Daddy position.|

### getBrainRoles

Get the roles given to the Brain position.

```solidity
function getBrainRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Brain position.|

### getSecurityRoles

Get the roles given to the Security position.

```solidity
function getSecurityRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the Security position.|

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

### getStrategyManagerRoles

Get the roles given to the strategy manager.

```solidity
function getStrategyManagerRoles() external view virtual returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The roles given to the strategy manager.|

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

### UpdatePositionHolder

Emitted when a new address is set for a position.

```solidity
event UpdatePositionHolder(bytes32 indexed position, address indexed newAddress);
```

### RemovedVault

Emitted when a vault is removed.

```solidity
event RemovedVault(address indexed vault);
```

### UpdatePositionRoles

Emitted when a new set of roles is set for a position

```solidity
event UpdatePositionRoles(bytes32 indexed position, uint256 newRoles);
```

### UpdateDefaultProfitMaxUnlock

Emitted when the defaultProfitMaxUnlock variable is updated.

```solidity
event UpdateDefaultProfitMaxUnlock(uint256 newDefaultProfitMaxUnlock);
```

## Errors

### AlreadyDeployed

Revert message for when a vault has already been deployed.

```solidity
error AlreadyDeployed(address _vault);
```

## Structs

### Position

Position struct

```solidity
struct Position {
    address holder;
    uint96 roles;
}
```

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
