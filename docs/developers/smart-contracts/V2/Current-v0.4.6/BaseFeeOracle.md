

Interprets the base fee from our base fee provider
 contract to determine if a harvest is permissable.

Version 0.1.0

## Functions
### constructor
```solidity
  function constructor(
  ) public
```
Use this if our network hasn't implemented the base fee method yet



### isCurrentBaseFeeAcceptable
```solidity
  function isCurrentBaseFeeAcceptable(
  ) public returns (bool)
```
Returns whether we should allow harvests based on current base fee.



### setMaxAcceptableBaseFee
```solidity
  function setMaxAcceptableBaseFee(
    uint256 _maxAcceptableBaseFee
  ) external
```
Set the maximum base fee we want for our keepers to accept.
 Gwei is 1e9.

Throws if the caller is not authorized or gov.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_maxAcceptableBaseFee` | uint256 | The acceptable maximum price to pay in wei.

### setManualBaseFeeBool
```solidity
  function setManualBaseFeeBool(
    bool _manualBaseFeeBool
  ) external
```
If we don't have a provider, then manually determine if true or not.
 Useful in testing as well.

Throws if the caller is not authorized or gov.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_manualBaseFeeBool` | bool | Boolean to allow/block harvests if we don't
 have a provider set up.

### setAuthorized
```solidity
  function setAuthorized(
    address _target,
    bool _value
  ) external
```
Controls whether a non-gov address can adjust certain params.

Throws if the caller is not current governance.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_target` | address | The address to add/remove authorization for.
|`_value` | bool | Boolean to grant or revoke access.

### setPendingGovernance
```solidity
  function setPendingGovernance(
    address _governance
  ) external
```
Starts the 1st phase of the governance transfer.

Throws if the caller is not current governance.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_governance` | address | The next governance address

### acceptGovernance
```solidity
  function acceptGovernance(
  ) external
```
Completes the 2nd phase of the governance transfer.

Throws if the caller is not the pending caller.
 Emits a `NewGovernance` event.


### setBaseFeeProvider
```solidity
  function setBaseFeeProvider(
    address _baseFeeProvider
  ) external
```
Sets the address used to pull the current network base fee.

Throws if the caller is not current governance.

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_baseFeeProvider` | address | The network's baseFeeProvider address

### _onlyAuthorized
```solidity
  function _onlyAuthorized(
  ) internal
```




### _onlyGovernance
```solidity
  function _onlyGovernance(
  ) internal
```




## Events
### NewGovernance
```solidity
  event NewGovernance(
  )
```



### NewProvider
```solidity
  event NewProvider(
  )
```



### UpdatedMaxBaseFee
```solidity
  event UpdatedMaxBaseFee(
  )
```



### UpdatedManualBaseFee
```solidity
  event UpdatedManualBaseFee(
  )
```



### UpdatedAuthorization
```solidity
  event UpdatedAuthorization(
  )
```




