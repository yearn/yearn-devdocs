# Auctions

## Introduction

Yearn regularly holds permissionless Dutch auctions, most notably for V3 strategies and YFI buybacks. This process has been standardized to encourage integration by searchers.

### How it works
- Each `want` token has a dedicated auction contract. Many different `sell` tokens can be offered through distinct auctions through this contract, receiving the same asset in return. In other words, "Sell DAI for YFI" and "Sell WETH for YFI" can both supported through the same contract with WETH as the asset, but any one auction will only sell either DAI or WETH, never both.
- Tokens for sale accumulate either in their respective auction contracts directly, or in the contracts that rely on the auctions (and get transferred to the auction contract at the start of the auction).
- An auction can be initiated either once a sufficient `sell` amount accumulates, or upon a manual `kick()` call that is permissionless.
Auctions can last up to 24 hours and occur no more than once within some configurable interval, like weekly.
- The initial price is set high and decreases with time, halving every hour.
- Takers can `take()` the sell token on offer at the current price, providing asset to the contract in return.
- The auction concludes once all sell in the batch is sold or 24 hours elapse.
- Unsold sell carries over to the subsequent auction.

### Addresses

| Name                                             | Address                             |
|--------------------------------------------------|-------------------------------------|
| Auction factory                                  | [`0xE6aB098E8582178A76DC80d55ca304d1Dec11AD8`](https://etherscan.io/address/0xE6aB098E8582178A76DC80d55ca304d1Dec11AD8) |
| YFI buyback auctions                             | [`0x4349ed200029e6Cf38F1455B9dA88981F1806df3`](https://etherscan.io/address/0x4349ed200029e6Cf38F1455B9dA88981F1806df3) |


## Specification

### Events

#### AuctionEnabled
Emitted when an auction is enabled to tell parties to track it.

```
 - name: AuctionEnabled
   type: event
   
   inputs:
    - name: auctionId
      indexed: false
      type: bytes32
      
    - name: sell
      indexed: true
      type: address
      
    - name: want
      indexed: true
      type: address
      
    - name: auctionAddress
      indexed: true
      type: address
```

#### AuctionDisabled
Emitted when an Auction is disabled so it no longer needs to be tracked.

```
 - name: AuctionDisabled
   type: event
   
   inputs:
    - name: auctionId
      indexed: false
      type: bytes32
      
    - name: sell
      indexed: true
      type: address
      
    - name: want
      indexed: true
      type: address
      
    - name: auctionAddress
      indexed: true
      type: address
```

#### AuctionKicked
Emitted when a new auction is kicked off.

```
 - name: AuctionKicked
   type: event
   
   inputs:
    - name: auctionId
      indexed: true
      type: bytes32
      
    - name: sellAvailable
      indexed: false
      type: uint256
```

#### AuctionTaken
Emitted when some amount of sell is taken.

```
 - name: AuctionTaken
   type: event
   
   inputs:
    - name: auctionId
      indexed: true
      type: bytes32
      
    - name: amountTaken
      indexed: false
      type: uint256
      
    - name: amountLeft
      indexed: false
      type: uint256
```

### View methods

#### auctionLength
Get the time length of each auction.

```
 - name: auctionLength
   type: function
   stateMutability: view
   
   inputs: []
   
   outputs:
    - name: auctionLengthTime
      type: uint256
```

#### auctionCooldown
Get the minimum time inbetween auction kicks.

```
 - name: auctionCooldown
   type: function
   stateMutability: view
   
   inputs: []
   
   outputs:
    - name: auctionCooldownTime
      type: uint256
```

#### auctionInfo
Get all of the info for a specific auction.

```
 - name: auctionInfo
   type: function
   stateMutability: view
   
   inputs:
     - name: auctionId
       type: bytes32
       
    outputs:
     - name: sell
       type: address
       
     - name: want
       type: address
       
     - name: kicked
       type: uint256
       
     - name: available
       type: uint256
```

#### getAmountNeeded
Get the exact amount of `want` needed to buy `sell`. 

- Will return `0` if nothing to take.

```
- name: getAmountNeeded
  type: function
  stateMutability: view

  inputs: 
    - name: id
      type: bytes32
      
    - name: amoutToTake
      type: uint256
      
    - name: timestamp
      type: uint256
      default: block.timestamp
      
  outputs:
    - name: currentPrice
      type: uint256
```

#### price
Get the current price of `sell` in terms of `want`.

```
- name: price
  type: function
  stateMutability: view

  inputs: 
    - name: id
      type: bytes32
      
    - name: timestamp
      type: uint256
      default: block.timestamp
      
  outputs:
    - name: currentPrice
      type: uint256
```

#### kickable
Get the expected amount of `sell` that would be available if auction was kicked.

- Inclusive of anything left over unsold from the last auction
- May not be entirely accurate of the effect of an actual kick.

```
- name: kickable
  type: function
  stateMutability: view

  inputs: 
    - name: id
      type: bytes32
      
  outputs:
    - name: expectedAvailable
      type: uint256
```

### Write methods

#### kick
Kicks an auction.

```
 - name: kick
   type: function
   stateMutability: nonpayable
   
   inputs:
    - name: auctionId
      type: bytes32
      
    outputs:
     - name: amountAvailable
       type: uint256
```

#### take
Take some amount of `sell` for `want` at the current price.

```
 - name: take
   type: function
   stateMutability: nonpayable
   
   inputs:
    - name: auctionId
      type: bytes32
      
    - name: maxAmount
      type: uint256
      default: 2 ** 256 - 1
      
    - name: receiver
      type: address
      default: msg.sender
      
    - name: data
      type: bytes
      default: empty
```

**NOTE:**

If the optional 'data' parameter is supplied the auction will do a callback to the receiver address after sending the `sell` but before pulling the `want`.

The receiver will need to implement following function to receive the callback:

```
 - name: auctionTakeCallback 
   type: function
   stateMutability: nonpayable
   
   inputs:
    - name: auctionId
      type: bytes32
      
    - name: sender
      type: address
      
    - name: amountTaken
      type: uint256
      
    - name: amountNeeded
      type: uint256
      
    - name: data
      type: bytes
      default: empty
```
