<!-- markdownlint-disable MD024 MD034 MD036 -->
# AuctionFactory

[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/c0dfe4a563a45efb72718547e840429b3a6092e6/src/Auctions/AuctionFactory.sol)

**Inherits:** ClonableCreate2

**Title:**
AuctionFactory

Deploy a new Auction.

## State Variables

### DEFAULT_STARTING_PRICE

The amount to start the auction with.

```solidity
uint256 public constant DEFAULT_STARTING_PRICE = 1_000_000
```

### auctions

Full array of all auctions deployed through this factory.

```solidity
address[] public auctions
```

## Functions

### constructor

```solidity
constructor() ;
```

### version

```solidity
function version() external pure returns (string memory);
```

### createNewAuction

Creates a new auction contract.

```solidity
function createNewAuction(address _want) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address of the token users will bid with.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAuction Address of the newly created auction contract.|

### createNewAuction

Creates a new auction contract.

```solidity
function createNewAuction(address _want, address _receiver) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address of the token users will bid with.|
|`_receiver`|`address`|Address that will receive the funds in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAuction Address of the newly created auction contract.|

### createNewAuction

Creates a new auction contract.

```solidity
function createNewAuction(address _want, address _receiver, address _governance) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address of the token users will bid with.|
|`_receiver`|`address`|Address that will receive the funds in the auction.|
|`_governance`|`address`|Address allowed to enable and disable auctions.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAuction Address of the newly created auction contract.|

### createNewAuction

Creates a new auction contract.

```solidity
function createNewAuction(address _want, address _receiver, address _governance, uint256 _startingPrice)
    external
    returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address of the token users will bid with.|
|`_receiver`|`address`|Address that will receive the funds in the auction.|
|`_governance`|`address`|Address allowed to enable and disable auctions.|
|`_startingPrice`|`uint256`|Starting price for the auction (no decimals). NOTE: The starting price should be without decimals (1k == 1_000).|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAuction Address of the newly created auction contract.|

### createNewAuction

Creates a new auction contract.

```solidity
function createNewAuction(
    address _want,
    address _receiver,
    address _governance,
    uint256 _startingPrice,
    bytes32 _salt
) external returns (address);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address of the token users will bid with.|
|`_receiver`|`address`|Address that will receive the funds in the auction.|
|`_governance`|`address`|Address allowed to enable and disable auctions.|
|`_startingPrice`|`uint256`|Starting price for the auction (no decimals).|
|`_salt`|`bytes32`|The salt to use for deterministic deployment.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|_newAuction Address of the newly created auction contract.|

### _createNewAuction

Deploys and initializes a new Auction

```solidity
function _createNewAuction(
    address _want,
    address _receiver,
    address _governance,
    uint256 _startingPrice,
    bytes32 _salt
) internal returns (address _newAuction);
```

### getAllAuctions

Get the full list of auctions deployed through this factory.

```solidity
function getAllAuctions() external view returns (address[] memory);
```

### numberOfAuctions

Get the total number of auctions deployed through this factory.

```solidity
function numberOfAuctions() external view returns (uint256);
```

## Events

### DeployedNewAuction

```solidity
event DeployedNewAuction(address indexed auction, address indexed want);
```
