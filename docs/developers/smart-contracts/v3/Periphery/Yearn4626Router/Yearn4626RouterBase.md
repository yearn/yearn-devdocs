<!-- markdownlint-disable MD024 MD036 -->
# Yearn4626RouterBase

[Git Source](https://github.com/yearn/Yearn-ERC4626-Router/blob/68165774ec8858b43db24620756402def14b7ec1/src/Yearn4626RouterBase.sol)

**Inherits:**
[IYearn4626RouterBase](https://github.com/yearn/Yearn-ERC4626-Router/blob/68165774ec8858b43db24620756402def14b7ec1/src/interfaces/IYearn4626RouterBase.sol), [SelfPermit](SelfPermit.md), [Multicall](Multicall.md), [PeripheryPayments](PeripheryPayments.md)

## Functions

### mint

mint `shares` from an ERC4626 vault.

*throws "!maxAmount" Error*

```solidity
function mint(IYearn4626 vault, uint256 shares, address to, uint256 maxAmountIn)
    public
    payable
    virtual
    override
    returns (uint256 amountIn);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to mint shares from.|
|`shares`|`uint256`|The amount of shares to mint from `vault`.|
|`to`|`address`|The destination of ownership shares.|
|`maxAmountIn`|`uint256`|The max amount of assets used to mint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountIn`|`uint256`|the amount of assets used to mint by `to`.|

### deposit

deposit `amount` to an ERC4626 vault.

*throws "!minShares" Error*

```solidity
function deposit(IYearn4626 vault, uint256 amount, address to, uint256 minSharesOut)
    public
    payable
    virtual
    override
    returns (uint256 sharesOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to deposit assets to.|
|`amount`|`uint256`|The amount of assets to deposit to `vault`.|
|`to`|`address`|The destination of ownership shares.|
|`minSharesOut`|`uint256`|The min amount of `vault` shares received by `to`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sharesOut`|`uint256`|the amount of shares received by `to`.|

### withdraw

withdraw `amount` from an ERC4626 vault.

*Uses the Yearn specific 'maxLoss' accounting.*

```solidity
function withdraw(IYearn4626 vault, uint256 amount, address to, uint256 maxLoss)
    public
    payable
    virtual
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to redeem shares from.|
|`amount`|`uint256`|The amount of assets to withdraw from vault.|
|`to`|`address`|The destination of assets.|
|`maxLoss`|`uint256`|The acceptable loss in Basis Points.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|sharesOut the amount of shares received by `to`.|

### withdrawDefault

withdraw `amount` from an ERC4626 vault.

*Uses the default 4626 syntax, throws !maxShares" Error.*

```solidity
function withdrawDefault(IYearn4626 vault, uint256 amount, address to, uint256 maxSharesOut)
    public
    payable
    virtual
    override
    returns (uint256 sharesOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to withdraw assets from.|
|`amount`|`uint256`|The amount of assets to withdraw from vault.|
|`to`|`address`|The destination of assets.|
|`maxSharesOut`|`uint256`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`sharesOut`|`uint256`|the amount of shares received by `to`.|

### redeem

redeem `shares` shares from an ERC4626 vault.

*Uses the Yearn specific 'maxLoss' accounting.*

```solidity
function redeem(IYearn4626 vault, uint256 shares, address to, uint256 maxLoss)
    public
    payable
    virtual
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to redeem shares from.|
|`shares`|`uint256`|The amount of shares to redeem from vault.|
|`to`|`address`|The destination of assets.|
|`maxLoss`|`uint256`|The acceptable loss in Basis Points.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|amountOut the amount of assets received by `to`.|

### redeemDefault

redeem `shares` shares from an ERC4626 vault.

*Uses the default 4626 syntax, throws "!minAmount" Error.*

```solidity
function redeemDefault(IYearn4626 vault, uint256 shares, address to, uint256 minAmountOut)
    public
    payable
    virtual
    override
    returns (uint256 amountOut);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`vault`|`IYearn4626`|The ERC4626 vault to redeem shares from.|
|`shares`|`uint256`|The amount of shares to redeem from vault.|
|`to`|`address`|The destination of assets.|
|`minAmountOut`|`uint256`|The min amount of assets received by `to`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`amountOut`|`uint256`|the amount of assets received by `to`.|
