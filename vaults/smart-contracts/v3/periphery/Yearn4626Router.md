# Yearn4626Router
[Git Source](https://github.com/yearn/Yearn-ERC4626-Router/blob/68165774ec8858b43db24620756402def14b7ec1/src/Yearn4626Router.sol)


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

See [depositToVault](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to`.*


```solidity
function depositToVault(IYearn4626 vault, uint256 amount, uint256 minSharesOut) external payable returns (uint256);
```

### depositToVault

See [depositToVault](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to` and their full
balance of msg.sender as `amount`.*


```solidity
function depositToVault(IYearn4626 vault, uint256 minSharesOut) external payable returns (uint256);
```

### depositToVault

See [depositToVault](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#deposittovault) in IYearn4626Router.

*Uses msg.sender as the default for `to`, their full balance
of msg.sender as `amount` and 1 Basis point for `maxLoss`.
NOTE: The slippage tollerance is only useful if `previewDeposit`
cannot be manipulated for the `vault`.*


```solidity
function depositToVault(IYearn4626 vault) external payable returns (uint256);
```

### redeem

See [redeem](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#redeem) in IYearn4626RouterBase.

*Uses msg.sender as `receiver`.*


```solidity
function redeem(IYearn4626 vault, uint256 shares, uint256 maxLoss) external payable returns (uint256);
```

### redeem

See [redeem](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#redeem) in IYearn4626RouterBase.

*Uses msg.sender as `receiver` and their full balance as `shares`.*


```solidity
function redeem(IYearn4626 vault, uint256 maxLoss) external payable returns (uint256);
```

### redeem

See [redeem](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#redeem) in IYearn4626RouterBase.

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

See [migrate](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migrate) in IYearn4626Router.

*Uses msg.sender as `to`.*


```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault, uint256 shares, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrate

See [migrate](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migrate) in IYearn4626Router.

*Uses msg.sender as `to` and their full balance for `shares`.*


```solidity
function migrate(IYearn4626 fromVault, IYearn4626 toVault, uint256 minSharesOut) external payable returns (uint256);
```

### migrate

See [migrate](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migrate) in IYearn4626Router.

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

See [migrateFromV2](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migratefromv2) in IYearn4626Router.

*Uses msg.sender as `to`.*


```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault, uint256 shares, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrateFromV2

See [migrateFromV2](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migratefromv2) in IYearn4626Router.

*Uses msg.sender as `to` and their full balance as `shares`.*


```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault, uint256 minSharesOut)
    external
    payable
    returns (uint256);
```

### migrateFromV2

See [migrate](/src/Yearn4626Router.sol/contract.Yearn4626Router.md#migrate) in IYearn4626Router.

*Uses msg.sender as `to`, their full balance for `shares` and no `minamountOut`.
NOTE: Using this will enforce no slippage checks and should be used with care.*


```solidity
function migrateFromV2(IYearnV2 fromVault, IYearn4626 toVault) external payable returns (uint256 sharesOut);
```

# Yearn4626RouterBase

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


# SelfPermit

Functionality to call permit on any EIP-2612-compliant token for use in the route

*These functions are expected to be embedded in multicalls to allow EOAs to approve a contract and call a function
that requires an approval in a single transaction.*


## Functions
### selfPermit

Permits this contract to spend a given token from `msg.sender`

*The `owner` is always msg.sender and the `spender` is always address(this).*


```solidity
function selfPermit(address token, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    public
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token spent|
|`value`|`uint256`|The amount that can be spent of token|
|`deadline`|`uint256`|A timestamp, the current blocktime must be less than or equal to this timestamp|
|`v`|`uint8`|Must produce valid secp256k1 signature from the holder along with `r` and `s`|
|`r`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `v` and `s`|
|`s`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `r` and `v`|


### selfPermitIfNecessary

Permits this contract to spend a given token from `msg.sender`

*The `owner` is always msg.sender and the `spender` is always address(this).
Can be used instead of #selfPermit to prevent calls from failing due to a frontrun of a call to #selfPermit*


```solidity
function selfPermitIfNecessary(address token, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token spent|
|`value`|`uint256`|The amount that can be spent of token|
|`deadline`|`uint256`|A timestamp, the current blocktime must be less than or equal to this timestamp|
|`v`|`uint8`|Must produce valid secp256k1 signature from the holder along with `r` and `s`|
|`r`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `v` and `s`|
|`s`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `r` and `v`|


### selfPermitAllowed

Permits this contract to spend the sender's tokens for permit signatures that have the `allowed` parameter

*The `owner` is always msg.sender and the `spender` is always address(this)*


```solidity
function selfPermitAllowed(address token, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)
    public
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token spent|
|`nonce`|`uint256`|The current nonce of the owner|
|`expiry`|`uint256`|The timestamp at which the permit is no longer valid|
|`v`|`uint8`|Must produce valid secp256k1 signature from the holder along with `r` and `s`|
|`r`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `v` and `s`|
|`s`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `r` and `v`|


### selfPermitAllowedIfNecessary

Permits this contract to spend the sender's tokens for permit signatures that have the `allowed` parameter

*The `owner` is always msg.sender and the `spender` is always address(this)
Can be used instead of #selfPermitAllowed to prevent calls from failing due to a frontrun of a call to #selfPermitAllowed.*


```solidity
function selfPermitAllowedIfNecessary(address token, uint256 nonce, uint256 expiry, uint8 v, bytes32 r, bytes32 s)
    external
    payable
    override;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`token`|`address`|The address of the token spent|
|`nonce`|`uint256`|The current nonce of the owner|
|`expiry`|`uint256`|The timestamp at which the permit is no longer valid|
|`v`|`uint8`|Must produce valid secp256k1 signature from the holder along with `r` and `s`|
|`r`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `v` and `s`|
|`s`|`bytes32`|Must produce valid secp256k1 signature from the holder along with `r` and `v`|


# PeripheryPayments

Immutable state used by periphery contracts
Largely Forked from https://github.com/Uniswap/v3-periphery/blob/main/contracts/base/PeripheryPayments.sol
Changes:
no interface
no inheritdoc
add immutable WETH9 in constructor instead of PeripheryImmutableState
receive from any address
Solmate interfaces and transfer lib
casting
add approve, wrapWETH9 and pullToken


## State Variables
### WETH9

```solidity
IWETH9 public immutable WETH9;
```


## Functions
### constructor


```solidity
constructor(IWETH9 _WETH9);
```

### receive


```solidity
receive() external payable;
```

### approve


```solidity
function approve(ERC20 token, address to, uint256 amount) public payable;
```

### unwrapWETH9


```solidity
function unwrapWETH9(uint256 amountMinimum, address recipient) public payable;
```

### wrapWETH9


```solidity
function wrapWETH9() public payable;
```

### pullToken


```solidity
function pullToken(ERC20 token, uint256 amount, address recipient) public payable;
```

### sweepToken


```solidity
function sweepToken(ERC20 token, uint256 amountMinimum, address recipient) public payable;
```

### refundETH


```solidity
function refundETH() external payable;
```

# Multicall

Enables calling multiple methods in a single call to the contract


## Functions
### multicall

Call multiple functions in the current contract and return the data from all of them if they all succeed

*The `msg.value` should not be trusted for any method callable from multicall.*


```solidity
function multicall(bytes[] calldata data) public payable override returns (bytes[] memory results);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`data`|`bytes[]`|The encoded function data for each of the calls to make to this contract|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`results`|`bytes[]`|The results from each of the calls passed in via data|


