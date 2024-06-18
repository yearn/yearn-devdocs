# Yearn4626Router

[Git Source](https://github.com/yearn/Yearn-ERC4626-Router/blob/master/src/Yearn4626Router.sol)

Router that is meant to be used with Yearn V3 vaults and strategies
for deposits, withdraws and migrations.
The router was developed from the original router by FEI protocol
https://github.com/fei-protocol/ERC4626
The router is designed to be used with permit and multicall for the
optimal experience.
NOTE: It is important to never leave tokens in the router at the
end of a call, otherwise they can be swept by anyone.

## State Variables

### _name

```solidity
bytes32 private immutable _name;
```

## Functions

### constructor

```solidity
constructor(string memory _name_, IWETH9 weth) PeripheryPayments(weth);
```

### name

```solidity
function name() external view returns (string memory);
```

### depositToVault

deposit `amount` to an ERC4626 vault.

*throws "!minShares" Error.*

```solidity
function depositToVault(IYearn4626 vault, uint256 amount, address to, uint256 minSharesOut)
    public
    payable
    override
    returns (uint256);
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
|`<none>`|`uint256`|. the amount of shares received by `to`.|

### depositToVault

See [depositToVault](#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to`.*

```solidity
function depositToVault(IYearn4626 vault, uint256 amount, uint256 minSharesOut) external payable returns (uint256);
```

### depositToVault

See [depositToVault](#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to` and their full
balance of msg.sender as `amount`.*

```solidity
function depositToVault(IYearn4626 vault, uint256 minSharesOut) external payable returns (uint256);
```

### depositToVault

See [depositToVault](#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to`, their full balance
of msg.sender as `amount` and 1 Basis point for `maxLoss`.
NOTE: The slippage tollerance is only useful if `previewDeposit`
cannot be manipulated for the `vault`.*

```solidity
function depositToVault(IYearn4626 vault) external payable returns (uint256);
```

### redeem

See [redeem](./Yearn4626RouterBase.md#redeem) in IYearn4626RouterBase.

*Uses msg.sender as `receiver`.*

```solidity
function redeem(IYearn4626 vault, uint256 shares, uint256 maxLoss) external payable returns (uint256);
```

### redeem

See [redeem](./Yearn4626RouterBase.md#redeem) in IYearn4626RouterBase.

*Uses msg.sender as `receiver` and their full balance as `shares`.*

```solidity
function redeem(IYearn4626 vault, uint256 maxLoss) external payable returns (uint256);
```

### redeem

See [redeem](./Yearn4626RouterBase.md#redeem) in IYearn4626RouterBase.

*Uses msg.sender as `receiver`, their full balance as `shares`
and 1 Basis Point for `maxLoss`.*

```solidity
function redeem(IYearn4626 vault) external payable returns (uint256);
```

### migrate

will redeem `shares` from one vault and deposit amountOut to a different ERC4626 vault.

*throws "!minAmount", "!minShares" Errors.*

```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault, uint256 shares, address to, uint256 minSharesOut)
    public
    payable
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromVault`|`IYearn4626`|The ERC4626 vault to redeem shares from.|
|`toVault`|`IYearn4626`|The ERC4626 vault to deposit assets to.|
|`shares`|`uint256`|The amount of shares to redeem from fromVault.|
|`to`|`address`|The destination of ownership shares.|
|`minSharesOut`|`uint256`|The min amount of toVault shares received by `to`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. the amount of shares received by `to`.|

### migrate

See [migrate](#migrate) in IYearn4626Router.

*Uses msg.sender as `to`.*

```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault, uint256 shares, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrate

See [migrate](#migrate) in IYearn4626Router.

*Uses msg.sender as `to` and their full balance for `shares`.*

```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault, uint256 minSharesOut) external payable returns (uint256);
```

### migrate

See [migrate](#migrate) in IYearn4626Router.

*Uses msg.sender as `to`, their full balance for `shares` and no `minamountOut`.
NOTE: Using this will enforce no slippage checks and should be used with care.*

```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault) external payable returns (uint256);
```

### migrateFromV2

migrate from Yearn V2 vault to a V3 vault'.

*throws "!minAmount", "!minShares" Errors.*

```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault, uint256 shares, address to, uint256 minSharesOut)
    public
    payable
    override
    returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`fromVault`|`IYearnV2`|The Yearn V2 vault to withdraw from.|
|`toVault`|`IYearn4626`|The Yearn V3 vault to deposit assets to.|
|`shares`|`uint256`|The amount of V2 shares to redeem form 'fromVault'.|
|`to`|`address`|The destination of ownership shares|
|`minSharesOut`|`uint256`|The min amount of 'toVault' shares to be received by 'to'.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The actual amount of 'toVault' shares received by 'to'.|

### migrateFromV2

See [migrateFromV2](#migratefromv2) in IYearn4626Router.

*Uses msg.sender as `to`.*

```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault, uint256 shares, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrateFromV2

See [migrateFromV2](#migratefromv2) in IYearn4626Router.

*Uses msg.sender as `to` and their full balance as `shares`.*

```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrateFromV2

See [migrate](#migrate) in IYearn4626Router.

*Uses msg.sender as `to`, their full balance for `shares` and no `minamountOut`.
NOTE: Using this will enforce no slippage checks and should be used with care.*

```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault) external payable returns (uint256 sharesOut);
```
