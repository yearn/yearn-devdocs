<!-- markdownlint-disable MD024 MD034 MD036 -->

# Auction
[Git Source](https://github.com/yearn/tokenized-strategy-periphery/blob/dc7b9abc7268f9c863c11987fec897209570c5b8/src/Auctions/Auction.sol)

**Inherits:** Governance2Step, ReentrancyGuard

**Title:**
Auction

**Author:**
yearn.fi

General use dutch auction contract for token sales.


## State Variables
### WAD

```solidity
uint256 internal constant WAD = 1e18
```


### COW_SETTLEMENT

```solidity
address internal constant COW_SETTLEMENT = 0x9008D19f58AAbD9eD0D60971565AA8510560ab41
```


### VAULT_RELAYER

```solidity
address internal constant VAULT_RELAYER = 0xC92E8bdf79f0507f65a392b0ab4667716BFE0110
```


### AUCTION_LENGTH
The time that each auction lasts.


```solidity
uint256 internal constant AUCTION_LENGTH = 1 days
```


### wantInfo
Struct to hold the info for `want`.


```solidity
TokenInfo internal wantInfo
```


### governanceOnlyKick
Whether only governance can kick auctions.

Default is false.


```solidity
bool public governanceOnlyKick
```


### receiver
The address that will receive the funds in the auction.


```solidity
address public receiver
```


### minimumPrice
The minimum price for the auction, scaled to 1e18.

If the price per auction goes below this, the auction is considered inactive.

Default is 0 (i.e. no minimum).


```solidity
uint256 public minimumPrice
```


### startingPrice
The amount to start the auction at, scaled to 1e18.

This is a scaled "lot size" essentially to start the pricing in "want".
The kicked amount of _from is divided by this to get the per auction initial price.


```solidity
uint256 public startingPrice
```


### stepDuration
The time period for each price step in seconds.


```solidity
uint256 public stepDuration
```


### stepDecayRate
The decay rate per step in basis points (e.g., 50 for 0.5% decrease per step).


```solidity
uint256 public stepDecayRate
```


### auctions
Mapping from `from` token to its struct.


```solidity
mapping(address => AuctionInfo) public auctions
```


### enabledAuctions
Array of all the enabled auction for this contract.


```solidity
address[] public enabledAuctions
```


## Functions
### constructor


```solidity
constructor() Governance2Step(msg.sender);
```

### initialize

Initializes the Auction contract with initial parameters.


```solidity
function initialize(address _want, address _receiver, address _governance, uint256 _startingPrice) public virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_want`|`address`|Address this auction is selling to.|
|`_receiver`|`address`|Address that will receive the funds from the auction.|
|`_governance`|`address`|Address of the contract governance.|
|`_startingPrice`|`uint256`|Starting price for each auction, scaled to 1e18.|


### version


```solidity
function version() external pure returns (string memory);
```

### want

Get the address of this auctions want token.


```solidity
function want() public view virtual returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. The want token.|


### auctionLength


```solidity
function auctionLength() public view virtual returns (uint256);
```

### available

Get the available amount for the auction.


```solidity
function available(address _from) public view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The available amount for the auction.|


### kicked

Get the kicked timestamp for the auction.


```solidity
function kicked(address _from) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The kicked timestamp for the auction.|


### isActive

Check if the auction is active.


```solidity
function isActive(address _from) public view virtual returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Whether the auction is active.|


### getAllEnabledAuctions

Get all the enabled auctions.


```solidity
function getAllEnabledAuctions() external view virtual returns (address[] memory);
```

### kickable

Get the pending amount available for the next auction.

Defaults to the auctions balance of the from token if no hook.


```solidity
function kickable(address _from) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|uint256 The amount that can be kicked into the auction.|


### getAmountNeeded

Gets the amount of `want` needed to buy the available amount of `from`.


```solidity
function getAmountNeeded(address _from) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `want` needed to fulfill the take amount.|


### getAmountNeeded

Gets the amount of `want` needed to buy a specific amount of `from`.


```solidity
function getAmountNeeded(address _from, uint256 _amountToTake) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_amountToTake`|`uint256`|The amount of `from` to take in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `want` needed to fulfill the take amount.|


### getAmountNeeded

Gets the amount of `want` needed to buy a specific amount of `from` at a specific timestamp.


```solidity
function getAmountNeeded(address _from, uint256 _amountToTake, uint256 _timestamp)
    external
    view
    virtual
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_amountToTake`|`uint256`|The amount `from` to take in the auction.|
|`_timestamp`|`uint256`|The specific timestamp for calculating the amount needed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `want` needed to fulfill the take amount.|


### _getAmountNeeded

Return the amount of `want` needed to buy `_amountToTake`.


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
function price(address _from) external view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The price of the auction.|


### price

Gets the price of the auction at a specific timestamp.


```solidity
function price(address _from, uint256 _timestamp) public view virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_timestamp`|`uint256`|The specific timestamp for calculating the price.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The price of the auction.|


### _price

Internal function to calculate the scaled price based on auction parameters.


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


```solidity
function enable(address _from) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|


### disable

Disables an existing auction.

Only callable by governance.


```solidity
function disable(address _from) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token being sold.|


### disable

Disables an existing auction.

Only callable by governance.


```solidity
function disable(address _from, uint256 _index) public virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token being sold.|
|`_index`|`uint256`|The index the auctionId is at in the array.|


### isAnActiveAuction


```solidity
function isAnActiveAuction() public view returns (bool);
```

### setGovernanceOnlyKick

Sets whether only governance can kick auctions.


```solidity
function setGovernanceOnlyKick(bool _governanceOnlyKick) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_governanceOnlyKick`|`bool`|The new governance only kick setting.|


### setReceiver

Sets the receiver address for the auction funds.


```solidity
function setReceiver(address _receiver) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_receiver`|`address`|The new receiver address.|


### setMinimumPrice

Sets the minimum price for the auction.

If the price per auction goes below this, the auction is considered inactive.

Default is 0 (i.e. no minimum).


```solidity
function setMinimumPrice(uint256 _minimumPrice) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_minimumPrice`|`uint256`|The new minimum price per auction, scaled to 1e18.|


### setStartingPrice

Sets the starting price for the auction.

This is a scaled "lot size" essentially to start the pricing in "want".
The kicked amount of _from is divided by this to get the per auction initial price.


```solidity
function setStartingPrice(uint256 _startingPrice) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_startingPrice`|`uint256`|The new starting price for the auction, scaled to 1e18.|


### setStepDecayRate

Sets the step decay rate for the auction.

The decay rate is in basis points (e.g., 50 for 0.5% decay per step).


```solidity
function setStepDecayRate(uint256 _stepDecayRate) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_stepDecayRate`|`uint256`|The new decay rate per step in basis points (max 10000 = 100%).|


### setStepDuration

Sets the step duration for the auction.


```solidity
function setStepDuration(uint256 _stepDuration) external virtual onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_stepDuration`|`uint256`|The new step duration in seconds.|


### kick

Kicks off an auction, updating its status and making funds available for bidding.


```solidity
function kick(address _from) external virtual nonReentrant returns (uint256 _available);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_available`|`uint256`|The available amount for bidding on in the auction.|


### _kick


```solidity
function _kick(address _from) internal virtual returns (uint256 _available);
```

### take

Take the token being sold in a live auction.

Defaults to taking the full amount and sending to the msg sender.


```solidity
function take(address _from) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction with a specified maximum amount.

Will send the funds to the msg sender.


```solidity
function take(address _from, uint256 _maxAmount) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction.


```solidity
function take(address _from, uint256 _maxAmount, address _takerReceiver) external virtual returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|
|`_takerReceiver`|`address`|The address that will receive the fromToken.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_amountTaken The amount of fromToken taken in the auction.|


### take

Take the token being sold in a live auction.


```solidity
function take(address _from, uint256 _maxAmount, address _takerReceiver, bytes calldata _data)
    external
    virtual
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|
|`_maxAmount`|`uint256`|The maximum amount of fromToken to take in the auction.|
|`_takerReceiver`|`address`|The address that will receive the fromToken.|
|`_data`|`bytes`|The data signify the callback should be used and sent with it.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_amountTaken The amount of fromToken taken in the auction.|


### _take

Implements the take of the auction.


```solidity
function _take(address _from, uint256 _maxAmount, address _takerReceiver, bytes memory _data)
    internal
    virtual
    nonReentrant
    returns (uint256 _amountTaken);
```

### isValidSignature

Validates a COW order signature.


```solidity
function isValidSignature(bytes32 _hash, bytes calldata signature) external view returns (bytes4);
```

### forceKick

Forces the auction to be kicked.

Only callable by governance in replace of sweep settle and kick.


```solidity
function forceKick(address _from) external onlyGovernance;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|


### settle

Allows the auction to be stopped if the full amount is taken.


```solidity
function settle(address _from) external virtual;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_from`|`address`|The address of the token to be auctioned.|


### sweep


```solidity
function sweep(address _token) external virtual onlyGovernance;
```

## Events
### AuctionEnabled
Emitted when a new auction is enabled


```solidity
event AuctionEnabled(address indexed from, address indexed to);
```

### AuctionDisabled
Emitted when an auction is disabled.


```solidity
event AuctionDisabled(address indexed from, address indexed to);
```

### AuctionKicked
Emitted when auction has been kicked.


```solidity
event AuctionKicked(address indexed from, uint256 available);
```

### UpdatedReceiver
Emitted when the receiver is updated.


```solidity
event UpdatedReceiver(address indexed receiver);
```

### UpdatedMinimumPrice
Emitted when the minimum price is updated.


```solidity
event UpdatedMinimumPrice(uint256 indexed minimumPrice);
```

### UpdatedStartingPrice
Emitted when the starting price is updated.


```solidity
event UpdatedStartingPrice(uint256 indexed startingPrice);
```

### UpdatedStepDecayRate
Emitted when the step decay rate is updated.


```solidity
event UpdatedStepDecayRate(uint256 indexed stepDecayRate);
```

### UpdatedStepDuration
Emitted when the step duration is updated.


```solidity
event UpdatedStepDuration(uint256 indexed stepDuration);
```

### AuctionSettled
Emitted when the auction is settled.


```solidity
event AuctionSettled(address indexed from);
```

### AuctionSwept
Emitted when the auction is swept.


```solidity
event AuctionSwept(address indexed token, address indexed to);
```

## Structs
### TokenInfo
Store address and scaler in one slot.


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
    uint64 kicked;
    uint64 scaler;
    uint128 initialAvailable;
}
```
