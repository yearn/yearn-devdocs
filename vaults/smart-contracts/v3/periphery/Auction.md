# Auction
[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/Auctions/Auction.sol)

**Inherits:**
[Governance](/Governance), ReentrancyGuard

**Author:**
yearn.fi

General use dutch auction contract for token sales.


## State Variables
### WAD

```solidity
uint256 internal constant WAD = 1e18;
```


### MINUTE_HALF_LIFE
Used for the price decay.


```solidity
uint256 internal constant MINUTE_HALF_LIFE = 0.988514020352896135_356867505 * 1e27;
```


### wantInfo
Struct to hold the info for `want`.


```solidity
TokenInfo internal wantInfo;
```


### hook_
Contract to call during write functions.


```solidity
Hook internal hook_;
```


### startingPrice
The amount to start the auction at.


```solidity
uint256 public startingPrice;
```


### auctionLength
The time that each auction lasts.


```solidity
uint256 public auctionLength;
```


### auctionCooldown
The minimum time to wait between auction 'kicks'.


```solidity
uint256 public auctionCooldown;
```


### auctions
Mapping from an auction ID to its struct.


```solidity
mapping(bytes32 => AuctionInfo) public auctions;
```


### enabledAuctions
Array of all the enabled auction for this contract.


```solidity
bytes32[] public enabledAuctions;
```


## Functions
### constructor


```solidity
constructor() Governance(msg.sender);
```

### initialize

Initializes the Auction contract with initial parameters.


```solidity
function initialize(
    address _want,
    address _hook,
    address _governance,
    uint256 _auctionLength,
    uint256 _auctionCooldown,
    uint256 _startingPrice
) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address this auction is selling to.|
|`_hook`|`address`|Address of the hook contract (optional).|
|`_governance`|`address`|Address of the contract governance.|
|`_auctionLength`|`uint256`|Duration of each auction in seconds.|
|`_auctionCooldown`|`uint256`|Cooldown period between auctions in seconds.|
|`_startingPrice`|`uint256`|Starting price for each auction.|


### want

Get the address of this auctions want token.


```solidity
function want() public view virtual returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. The want token.|


### hook

Get the address of the hook if any.


```solidity
function hook() external view virtual returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. The hook.|


### getHookFlags

Get the current status of which hooks are being used.


```solidity
function getHookFlags() external view virtual returns (bool, bool, bool, bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. If the kickable hook is used.|
|`<none>`|`bool`|. If the kick hook is used.|
|`<none>`|`bool`|. If the preTake hook is used.|
|`<none>`|`bool`|. If the postTake hook is used.|


### numberOfEnabledAuctions

Get the length of the enabled auctions array.


```solidity
function numberOfEnabledAuctions() external view virtual returns (uint256);
```

### getAuctionId

Get the unique auction identifier.


```solidity
function getAuctionId(address _from) public view virtual returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to sell.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|bytes32 A unique auction identifier.|


### auctionInfo

Retrieves information about a specific auction.


```solidity
function auctionInfo(bytes32 _auctionId)
    public
    view
    virtual
    returns (address _from, address _to, uint256 _kicked, uint256 _available);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to sell.|
|`_to`|`address`|The address of the token to buy.|
|`_kicked`|`uint256`|The timestamp of the last kick.|
|`_available`|`uint256`|The current available amount for the auction.|


### kickable

Get the pending amount available for the next auction.

*Defaults to the auctions balance of the from token if no hook.*


```solidity
function kickable(bytes32 _auctionId) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount that can be kicked into the auction.|


### getAmountNeeded

Gets the amount of `want` needed to buy a specific amount of `from`.


```solidity
function getAmountNeeded(bytes32 _auctionId, uint256 _amountToTake) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_amountToTake`|`uint256`|The amount of `from` to take in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `want` needed to fulfill the take amount.|


### getAmountNeeded

Gets the amount of `want` needed to buy a specific amount of `from` at a specific timestamp.


```solidity
function getAmountNeeded(bytes32 _auctionId, uint256 _amountToTake, uint256 _timestamp)
    external
    view
    virtual
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_amountToTake`|`uint256`|The amount `from` to take in the auction.|
|`_timestamp`|`uint256`|The specific timestamp for calculating the amount needed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `want` needed to fulfill the take amount.|


### _getAmountNeeded

*Return the amount of `want` needed to buy `_amountToTake`.*


```solidity
function _getAmountNeeded(AuctionInfo memory _auction, uint256 _amountToTake, uint256 _timestamp)
    internal
    view
    virtual
    returns (uint256);
```

### price

Gets the price of the auction at the current timestamp.


```solidity
function price(bytes32 _auctionId) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The price of the auction.|


### price

Gets the price of the auction at a specific timestamp.


```solidity
function price(bytes32 _auctionId, uint256 _timestamp) public view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_timestamp`|`uint256`|The specific timestamp for calculating the price.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The price of the auction.|


### _price

*Internal function to calculate the scaled price based on auction parameters.*


```solidity
function _price(uint256 _kicked, uint256 _available, uint256 _timestamp) internal view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_kicked`|`uint256`|The timestamp the auction was kicked.|
|`_available`|`uint256`|The initial available amount scaled 1e18.|
|`_timestamp`|`uint256`|The specific timestamp for calculating the price.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The calculated price scaled to 1e18.|


### enable

Enables a new auction.

*Uses governance as the receiver.*


```solidity
function enable(address _from) external virtual returns (bytes32);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|. The unique identifier of the enabled auction.|


### enable

Enables a new auction.


```solidity
function enable(address _from, address _receiver) public virtual onlyGovernance returns (bytes32 _auctionId);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_receiver`|`address`|The address that will receive the funds in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the enabled auction.|


### disable

Disables an existing auction.

*Only callable by governance.*


```solidity
function disable(address _from) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token being sold.|


### disable

Disables an existing auction.

*Only callable by governance.*


```solidity
function disable(address _from, uint256 _index) public virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token being sold.|
|`_index`|`uint256`|The index the auctionId is at in the array.|


### setHookFlags

Set the flags to be used with hook.


```solidity
function setHookFlags(bool _kickable, bool _kick, bool _preTake, bool _postTake) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_kickable`|`bool`|If the kickable hook should be used.|
|`_kick`|`bool`|If the kick hook should be used.|
|`_preTake`|`bool`|If the preTake hook should be used.|
|`_postTake`|`bool`|If the postTake should be used.|


### kick

Kicks off an auction, updating its status and making funds available for bidding.


```solidity
function kick(bytes32 _auctionId) external virtual nonReentrant returns (uint256 available);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`available`|`uint256`|The available amount for bidding on in the auction.|


### take

Take the token being sold in a live auction.

*Defaults to taking the full amount and sending to the msg sender.*


```solidity
function take(bytes32 _auctionId) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction with a specified maximum amount.

*Uses the sender's address as the receiver.*


```solidity
function take(bytes32 _auctionId, uint256 _maxAmount) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction.


```solidity
function take(bytes32 _auctionId, uint256 _maxAmount, address _receiver) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|
|`_receiver`|`address`|The address that will receive the fromToken.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_amountTaken The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction.


```solidity
function take(bytes32 _auctionId, uint256 _maxAmount, address _receiver, bytes calldata _data)
    external
    virtual
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_auctionId`|`bytes32`|The unique identifier of the auction.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|
|`_receiver`|`address`|The address that will receive the fromToken.|
|`_data`|`bytes`|The data signify the callback should be used and sent with it.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_amountTaken The amount of fromToken taken in the auction.|


### _take

*Implements the take of the auction.*


```solidity
function _take(bytes32 _auctionId, uint256 _maxAmount, address _receiver, bytes memory _data)
    internal
    virtual
    nonReentrant
    returns (uint256 _amountTaken);
```

## Events
### AuctionEnabled
Emitted when a new auction is enabled


```solidity
event AuctionEnabled(bytes32 auctionId, address indexed from, address indexed to, address indexed auctionAddress);
```

### AuctionDisabled
Emitted when an auction is disabled.


```solidity
event AuctionDisabled(bytes32 auctionId, address indexed from, address indexed to, address indexed auctionAddress);
```

### AuctionKicked
Emitted when auction has been kicked.


```solidity
event AuctionKicked(bytes32 auctionId, uint256 available);
```

### AuctionTaken
Emitted when any amount of an active auction was taken.


```solidity
event AuctionTaken(bytes32 auctionId, uint256 amountTaken, uint256 amountLeft);
```

## Structs
### TokenInfo
*Store address and scaler in one slot.*


```solidity
struct TokenInfo {
    address tokenAddress;
    uint96 scaler;
}
```

### AuctionInfo
Store all the auction specific information.


```solidity
struct AuctionInfo {
    TokenInfo fromInfo;
    uint96 kicked;
    address receiver;
    uint128 initialAvailable;
    uint128 currentAvailable;
}
```

### Hook
Store the hook address and each flag in one slot.


```solidity
struct Hook {
    address hook;
    bool kickable;
    bool kick;
    bool preTake;
    bool postTake;
}
```

