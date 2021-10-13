



## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### setRegistry
```solidity
  function setRegistry(
    address _registry
  ) external
```
Used to update the yearn registry.


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_registry` | address | The new _registry address.

### bestVault
```solidity
  function bestVault(
  ) public returns (contract VaultAPI)
```
Used to get the most revent vault for the token using the registry.



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`An`|  | instance of a VaultAPI
### allVaults
```solidity
  function allVaults(
  ) public returns (contract VaultAPI[])
```
Used to get all vaults from the registery for the token



#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`An`|  | array containing instances of VaultAPI
### _updateVaultCache
```solidity
  function _updateVaultCache(
  ) internal
```




### totalVaultBalance
```solidity
  function totalVaultBalance(
  ) public returns (uint256 balance)
```
Used to get the balance of an account accross all the vaults for a token.

@dev will be used to get the wrapper balance using totalVaultBalance(address(this)).

@param account The address of the account.

@return balance of token for the account accross all the vaults.



### totalAssets
```solidity
  function totalAssets(
  ) public returns (uint256 assets)
```
Used to get the TVL on the underlying vaults.

@return assets the sum of all the assets managed by the underlying vaults.



### _deposit
```solidity
  function _deposit(
  ) internal returns (uint256 deposited)
```




### _withdraw
```solidity
  function _withdraw(
  ) internal returns (uint256 withdrawn)
```




### _migrate
```solidity
  function _migrate(
  ) internal returns (uint256)
```




### _migrate
```solidity
  function _migrate(
  ) internal returns (uint256)
```




### _migrate
```solidity
  function _migrate(
  ) internal returns (uint256 migrated)
```





