



## Functions
### deployMinimal
```solidity
  function deployMinimal(
  ) external returns (address proxy, bytes returnData)
```




### _getRevertMsg
```solidity
  function _getRevertMsg(
    bytes _res
  ) internal returns (string)
```
This is needed in order to get the human-readable revert message from a call

Get the revert message from a call

#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`_res` | bytes | Response of the call

#### Return Values:
| Name                           | Type          | Description                                                                  |
| :----------------------------- | :------------ | :--------------------------------------------------------------------------- |
|`Revert`| bytes | message string
### slice
```solidity
  function slice(
  ) internal returns (bytes)
```




## Events
### ProxyCreated
```solidity
  event ProxyCreated(
  )
```



