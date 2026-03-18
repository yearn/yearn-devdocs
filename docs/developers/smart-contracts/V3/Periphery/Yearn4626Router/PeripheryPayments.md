<!-- markdownlint-disable MD024 MD034 MD036 -->
# PeripheryPayments

[Git Source](https://github.com/yearn/Yearn-ERC4626-Router/blob/68165774ec8858b43db24620756402def14b7ec1/src/external/PeripheryPayments.sol)

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
