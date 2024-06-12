
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
