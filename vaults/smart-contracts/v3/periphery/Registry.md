# Registry
[Git Source](https://github.com/yearn/vault-periphery/blob/master/contracts/registry/Registry.sol)

**Inherits:**
[Governance](/Governance.md)

**Author:**
yearn.finance


Serves as an on chain registry to track any Yearn
vaults and strategies that a certain party wants to
endorse.
Can also be used to deploy new vaults of any specific
API version.


## State Variables
### releaseRegistry

```solidity
address public immutable releaseRegistry;
```


### MULTI_STRATEGY_TYPE

```solidity
uint256 public constant MULTI_STRATEGY_TYPE = 1;
```


### SINGLE_STRATEGY_TYPE

```solidity
uint256 public constant SINGLE_STRATEGY_TYPE = 2;
```


### name

```solidity
string public name;
```


### taggers

```solidity
mapping(address => bool) public taggers;
```


### endorsers

```solidity
mapping(address => bool) public endorsers;
```


### vaultInfo

```solidity
mapping(address => Info) public vaultInfo;
```


### assetIsUsed

```solidity
mapping(address => bool) public assetIsUsed;
```


### _endorsedVaults

```solidity
mapping(address => address[]) internal _endorsedVaults;
```


### assets

```solidity
address[] public assets;
```


## Functions
### onlyEndorsers

Can only be gov or an `endorser`.


```solidity
modifier onlyEndorsers();
```

### onlyTaggers

Can only be gov or a `tagger`.


```solidity
modifier onlyTaggers();
```

### _isEndorser

Check is gov or an `endorser`.


```solidity
function _isEndorser() internal view;
```

### _isTagger

Check is gov or a `tagger`.


```solidity
function _isTagger() internal view;
```

### constructor


```solidity
constructor(address _governance, string memory _name, address _releaseRegistry) Governance(_governance);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_governance`|`address`|Address to set as owner of the Registry.|
|`_name`|`string`|The custom string for this custom registry to be called.|
|`_releaseRegistry`|`address`|The Permissionless releaseRegistry to deploy vaults through.|


### numAssets

Returns the total number of assets being used as the underlying.


```solidity
function numAssets() external view virtual returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of assets.|


### getAssets

Get the full array of tokens being used.


```solidity
function getAssets() external view virtual returns (address[] memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|The full array of underlying tokens being used/.|


### numEndorsedVaults

The amount of endorsed vaults for a specific token.


```solidity
function numEndorsedVaults(address _asset) public view virtual returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|The amount of endorsed vaults.|


### getEndorsedVaults

Get the array of vaults endorsed for an `_asset`.


```solidity
function getEndorsedVaults(address _asset) external view virtual returns (address[] memory);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The underlying token used by the vaults.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address[]`|The endorsed vaults.|


### getAllEndorsedVaults

Get all endorsed vaults deployed using the Registry.

*This will return a nested array of all vaults deployed
separated by their underlying asset.
This is only meant for off chain viewing and should not be used during any
on chain tx's.*


```solidity
function getAllEndorsedVaults() external view virtual returns (address[][] memory allEndorsedVaults);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`allEndorsedVaults`|`address[][]`|A nested array containing all vaults.|


### isEndorsed

Check if a vault is endorsed in this registry.

*This will check if the `asset` variable in the struct has been
set for an easy external view check.*


```solidity
function isEndorsed(address _vault) external view virtual returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to check.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. The vaults endorsement status.|


### newEndorsedVault


Create and endorse a new multi strategy "Allocator"
vault and endorse it in this registry.

*
Throws if caller isn't `owner`.
Throws if no releases are registered yet.
Emits a `NewEndorsedVault` event.*


```solidity
function newEndorsedVault(
    address _asset,
    string memory _name,
    string memory _symbol,
    address _roleManager,
    uint256 _profitMaxUnlockTime
) public virtual returns (address _vault);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The asset that may be deposited into the new Vault.|
|`_name`|`string`|Specify a custom Vault name. .|
|`_symbol`|`string`|Specify a custom Vault symbol name.|
|`_roleManager`|`address`|The address authorized for guardian interactions in the new Vault.|
|`_profitMaxUnlockTime`|`uint256`|The time strategy profits will unlock over.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|address of the newly-deployed vault|


### newEndorsedVault


Create and endorse a new multi strategy "Allocator"
vault and endorse it in this registry.

*
Throws if caller isn't `owner`.
Throws if no releases are registered yet.
Emits a `NewEndorsedVault` event.*


```solidity
function newEndorsedVault(
    address _asset,
    string memory _name,
    string memory _symbol,
    address _roleManager,
    uint256 _profitMaxUnlockTime,
    uint256 _releaseDelta
) public virtual onlyEndorsers returns (address _vault);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The asset that may be deposited into the new Vault.|
|`_name`|`string`|Specify a custom Vault name. .|
|`_symbol`|`string`|Specify a custom Vault symbol name.|
|`_roleManager`|`address`|The address authorized for guardian interactions in the new Vault.|
|`_profitMaxUnlockTime`|`uint256`|The time strategy profits will unlock over.|
|`_releaseDelta`|`uint256`|The number of releases prior to the latest to use as a target. NOTE: Set to 0 for latest.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|address of the newly-deployed vault|


### endorseMultiStrategyVault

Endorse an already deployed multi strategy vault.

*To be used with default values for `_releaseDelta`, `_vaultType`
and `_deploymentTimestamp`.*


```solidity
function endorseMultiStrategyVault(address _vault) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to endorse.|


### endorseSingleStrategyVault

Endorse an already deployed Single Strategy vault.

*To be used with default values for `_releaseDelta`, `_vaultType`
and `_deploymentTimestamp`.*


```solidity
function endorseSingleStrategyVault(address _vault) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to endorse.|


### endorseVault


Adds an existing vault to the list of "endorsed" vaults for that asset.

*
Throws if caller isn't `owner`.
Throws if no releases are registered yet.
Throws if `vault`'s api version does not match the release specified.
Emits a `NewEndorsedVault` event.*


```solidity
function endorseVault(address _vault, uint256 _releaseDelta, uint256 _vaultType, uint256 _deploymentTimestamp)
    public
    virtual
    onlyEndorsers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|The vault that will be endorsed by the Registry.|
|`_releaseDelta`|`uint256`|Specify the number of releases prior to the latest to use as a target.|
|`_vaultType`|`uint256`|Type of vault to endorse.|
|`_deploymentTimestamp`|`uint256`|The timestamp of when the vault was deployed for FE use.|


### _registerVault

*Function used to register a newly deployed or added vault.
This well set all of the values for the vault in the `vaultInfo`
mapping as well as add the vault and the underlying asset to any
relevant arrays for tracking.*


```solidity
function _registerVault(
    address _vault,
    address _asset,
    uint256 _releaseTarget,
    uint256 _vaultType,
    uint256 _deploymentTimestamp
) internal virtual;
```

### tagVault

Tag a vault with a specific string.

*This is available to governance to tag any vault or strategy
on chain if desired to arbitrarily classify any vaults.
i.e. Certain ratings ("A") / Vault status ("Shutdown") etc.*


```solidity
function tagVault(address _vault, string memory _tag) external virtual onlyTaggers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault or strategy to tag.|
|`_tag`|`string`|The string to tag the vault or strategy with.|


### removeVault

Remove a `_vault`.

*Can be used as an efficient way to remove a vault
to not have to iterate over the full array.
NOTE: This will not remove the asset from the `assets` array
if it is no longer in use and will have to be done manually.*


```solidity
function removeVault(address _vault) external virtual onlyEndorsers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_vault`|`address`|Address of the vault to remove.|


### removeAsset

Removes a specific `_asset` at `_index` from `assets`.

*Can be used if an asset is no longer in use after a vault or
strategy has also been removed.*


```solidity
function removeAsset(address _asset, uint256 _index) external virtual onlyEndorsers;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|The asset to remove from the array.|
|`_index`|`uint256`|The index it sits at.|


### setEndorser

Set a new address to be able to endorse or remove an existing endorser.


```solidity
function setEndorser(address _account, bool _canEndorse) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address to set.|
|`_canEndorse`|`bool`|Bool if the `_account` can or cannot endorse.|


### setTagger

Set a new address to be able to tag a vault.


```solidity
function setTagger(address _account, bool _canTag) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_account`|`address`|The address to set.|
|`_canTag`|`bool`|Bool if the `_account` can or cannot tag.|


## Events
### NewEndorsedVault
Emitted when a new vault is deployed or added.


```solidity
event NewEndorsedVault(address indexed vault, address indexed asset, uint256 releaseVersion, uint256 vaultType);
```

### RemovedVault
Emitted when a vault is removed.


```solidity
event RemovedVault(address indexed vault, address indexed asset, uint256 releaseVersion, uint256 vaultType);
```

### VaultTagged
Emitted when a vault is tagged which a string.


```solidity
event VaultTagged(address indexed vault);
```

### UpdateTagger
Emitted when gov adds ore removes a `tagger`.


```solidity
event UpdateTagger(address indexed account, bool status);
```

### UpdateEndorser
Emitted when gov adds ore removes a `endorser`.


```solidity
event UpdateEndorser(address indexed account, bool status);
```

## Structs
### Info

```solidity
struct Info {
    address asset;
    uint96 releaseVersion;
    uint64 vaultType;
    uint128 deploymentTimestamp;
    uint64 index;
    string tag;
}
```

