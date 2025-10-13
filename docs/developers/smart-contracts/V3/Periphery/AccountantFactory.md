<!-- markdownlint-disable MD024 MD034 MD036 -->
# AccountantFactory

[Git Source](https://github.com/yearn/vault-periphery/blob/516f95edcd36e28b714b52408c05009b430900e3/src/accountants/AccountantFactory.sol)

A factory contract for deploying Accountant contracts

## State Variables

### defaultConfig

```solidity
Accountant.Fee public defaultConfig;
```

## Functions

### constructor

*Constructor initializes the default configuration*

```solidity
constructor();
```

### newAccountant

*Deploys a new Accountant contract with default configuration*

```solidity
function newAccountant() external returns (address);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAccountant The address of the newly deployed Accountant contract|

### newAccountant

*Deploys a new Accountant contract with specified fee manager and recipient*

```solidity
function newAccountant(address feeManager, address feeRecipient) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeManager`|`address`|The address to receive management and performance fees|
|`feeRecipient`|`address`|The address to receive refund fees|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAccountant The address of the newly deployed Accountant contract|

### newAccountant

*Deploys a new Accountant contract with specified fee configurations*

```solidity
function newAccountant(
    uint16 defaultManagement,
    uint16 defaultPerformance,
    uint16 defaultRefund,
    uint16 defaultMaxFee,
    uint16 defaultMaxGain,
    uint16 defaultMaxLoss
) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`defaultManagement`|`uint16`|Default management fee|
|`defaultPerformance`|`uint16`|Default performance fee|
|`defaultRefund`|`uint16`|Default refund ratio|
|`defaultMaxFee`|`uint16`|Default maximum fee|
|`defaultMaxGain`|`uint16`|Default maximum gain|
|`defaultMaxLoss`|`uint16`|Default maximum loss|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAccountant The address of the newly deployed Accountant contract|

### newAccountant

*Deploys a new Accountant contract with specified fee configurations and addresses*

```solidity
function newAccountant(
    address feeManager,
    address feeRecipient,
    uint16 defaultManagement,
    uint16 defaultPerformance,
    uint16 defaultRefund,
    uint16 defaultMaxFee,
    uint16 defaultMaxGain,
    uint16 defaultMaxLoss
) public returns (address _newAccountant);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`feeManager`|`address`|The address to receive management and performance fees|
|`feeRecipient`|`address`|The address to receive refund fees|
|`defaultManagement`|`uint16`|Default management fee|
|`defaultPerformance`|`uint16`|Default performance fee|
|`defaultRefund`|`uint16`|Default refund ratio|
|`defaultMaxFee`|`uint16`|Default maximum fee|
|`defaultMaxGain`|`uint16`|Default maximum gain|
|`defaultMaxLoss`|`uint16`|Default maximum loss|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_newAccountant`|`address`|The address of the newly deployed Accountant contract|

## Events

### NewAccountant

```solidity
event NewAccountant(address indexed newAccountant);
```
