



## Functions
### constructor
```solidity
  function constructor(
  ) public
```




### _getChainId
```solidity
  function _getChainId(
  ) internal returns (uint256)
```




### setAffiliate
```solidity
  function setAffiliate(
  ) external
```




### acceptAffiliate
```solidity
  function acceptAffiliate(
  ) external
```




### _shareValue
```solidity
  function _shareValue(
  ) internal returns (uint256)
```




### pricePerShare
```solidity
  function pricePerShare(
  ) external returns (uint256)
```




### _sharesForValue
```solidity
  function _sharesForValue(
  ) internal returns (uint256)
```




### deposit
```solidity
  function deposit(
  ) external returns (uint256)
```




### deposit
```solidity
  function deposit(
  ) public returns (uint256 deposited)
```




### withdraw
```solidity
  function withdraw(
  ) external returns (uint256)
```




### withdraw
```solidity
  function withdraw(
  ) public returns (uint256)
```




### migrate
```solidity
  function migrate(
  ) external returns (uint256)
```




### migrate
```solidity
  function migrate(
  ) external returns (uint256)
```




### migrate
```solidity
  function migrate(
  ) external returns (uint256)
```




### permit
```solidity
  function permit(
    address owner,
    address spender,
    uint256 amount,
    uint256 deadline,
    uint8 v,
    bytes32 r,
    bytes32 s
  ) external
```
Triggers an approval from owner to spends


#### Parameters:
| Name | Type | Description                                                          |
| :--- | :--- | :------------------------------------------------------------------- |
|`owner` | address | The address to approve from
|`spender` | address | The address to be approved
|`amount` | uint256 | The number of tokens that are approved (2^256-1 means infinite)
|`deadline` | uint256 | The time at which to expire the signature
|`v` | uint8 | The recovery byte of the signature
|`r` | bytes32 | Half of the ECDSA signature pair
|`s` | bytes32 | Half of the ECDSA signature pair

