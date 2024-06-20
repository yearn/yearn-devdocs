# BaseStrategy

[Git Source](https://github.com/yearn/tokenized-strategy/blob/v3.0.2-1/src/BaseStrategy.sol)

**Author:**
yearn.finance

BaseStrategy implements all of the required functionality to
seamlessly integrate with the `TokenizedStrategy` implementation contract
allowing anyone to easily build a fully permissionless ERC-4626 compliant
Vault by inheriting this contract and overriding three simple functions.
It utilizes an immutable proxy pattern that allows the BaseStrategy
to remain simple and small. All standard logic is held within the
`TokenizedStrategy` and is reused over any n strategies all using the
`fallback` function to delegatecall the implementation so that strategists
can only be concerned with writing their strategy specific code.
This contract should be inherited and the three main abstract methods
`_deployFunds`, `_freeFunds` and `_harvestAndReport` implemented to adapt
the Strategy to the particular needs it has to generate yield. There are
other optional methods that can be implemented to further customize
the strategy if desired.
All default storage for the strategy is controlled and updated by the
`TokenizedStrategy`. The implementation holds a storage struct that
contains all needed global variables in a manual storage slot. This
means strategists can feel free to implement their own custom storage
variables as they need with no concern of collisions. All global variables
can be viewed within the Strategy by a simple call using the
`TokenizedStrategy` variable. IE: TokenizedStrategy.globalVariable();.

## State Variables

### tokenizedStrategyAddress

*This is the address of the TokenizedStrategy implementation
contract that will be used by all strategies to handle the
accounting, logic, storage etc.
Any external calls to the that don't hit one of the functions
defined in this base or the strategy will end up being forwarded
through the fallback function, which will delegateCall this address.
This address should be the same for every strategy, never be adjusted
and always be checked before any integration with the Strategy.*

```solidity
address public constant tokenizedStrategyAddress = 0x2e234DAe75C793f67A35089C9d99245E1C58470b;
```

### asset

*Underlying asset the Strategy is earning yield on.
Stored here for cheap retrievals within the strategy.*

```solidity
ERC20 internal immutable asset;
```

### TokenizedStrategy

*This variable is set to address(this) during initialization of each strategy.
This can be used to retrieve storage data within the strategy
contract as if it were a linked library.
i.e. uint256 totalAssets = TokenizedStrategy.totalAssets()
Using address(this) will mean any calls using this variable will lead
to a call to itself. Which will hit the fallback function and
delegateCall that to the actual TokenizedStrategy.*

```solidity
ITokenizedStrategy internal immutable TokenizedStrategy;
```

## Functions

### onlySelf

*Used on TokenizedStrategy callback functions to make sure it is post
a delegateCall from this address to the TokenizedStrategy.*

```solidity
modifier onlySelf();
```

### onlyManagement

*Use to assure that the call is coming from the strategies management.*

```solidity
modifier onlyManagement();
```

### onlyKeepers

*Use to assure that the call is coming from either the strategies
management or the keeper.*

```solidity
modifier onlyKeepers();
```

### onlyEmergencyAuthorized

*Use to assure that the call is coming from either the strategies
management or the emergency admin.*

```solidity
modifier onlyEmergencyAuthorized();
```

### _onlySelf

*Require that the msg.sender is this address.*

```solidity
function _onlySelf() internal view;
```

### constructor

Used to initialize the strategy on deployment.
This will set the `TokenizedStrategy` variable for easy
internal view calls to the implementation. As well as
initializing the default storage variables based on the
parameters and using the deployer for the permissioned roles.

```solidity
constructor(address _asset, string memory _name);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_name`|`string`|Name the strategy will use.|

### _deployFunds

*Can deploy up to '_amount' of 'asset' in the yield source.
This function is called at the end of a `deposit` or `mint`
call. Meaning that unless a whitelist is implemented it will
be entirely permissionless and thus can be sandwiched or otherwise
manipulated.*

```solidity
function _deployFunds(uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of 'asset' that the strategy can attempt to deposit in the yield source.|

### _freeFunds

*Should attempt to free the '_amount' of 'asset'.
NOTE: The amount of 'asset' that is already loose has already
been accounted for.
This function is called during `withdraw` and `redeem` calls.
Meaning that unless a whitelist is implemented it will be
entirely permissionless and thus can be sandwiched or otherwise
manipulated.
Should not rely on asset.balanceOf(address(this)) calls other than
for diff accounting purposes.
Any difference between `_amount` and what is actually freed will be
counted as a loss and passed on to the withdrawer. This means
care should be taken in times of illiquidity. It may be better to revert
if withdraws are simply illiquid so not to realize incorrect losses.*

```solidity
function _freeFunds(uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`||

### _harvestAndReport

*Internal function to harvest all rewards, redeploy any idle
funds and return an accurate accounting of all funds currently
held by the Strategy.
This should do any needed harvesting, rewards selling, accrual,
redepositing etc. to get the most accurate view of current assets.
NOTE: All applicable assets including loose assets should be
accounted for in this function.
Care should be taken when relying on oracles or swap values rather
than actual amounts as all Strategy profit/loss accounting will
be done based on this returned value.
This can still be called post a shutdown, a strategist can check
`TokenizedStrategy.isShutdown()` to decide if funds should be
redeployed or simply realize any profits/losses.*

```solidity
function _harvestAndReport() internal virtual returns (uint256 _totalAssets);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`_totalAssets`|`uint256`|A trusted and accurate account for the total amount of 'asset' the strategy currently holds including idle funds.|

### _tend

*Optional function for strategist to override that can
be called in between reports.
If '_tend' is used tendTrigger() will also need to be overridden.
This call can only be called by a permissioned role so may be
through protected relays.
This can be used to harvest and compound rewards, deposit idle funds,
perform needed position maintenance or anything else that doesn't need
a full report for.
EX: A strategy that can not deposit funds without getting
sandwiched can use the tend when a certain threshold
of idle to totalAssets has been reached.
This will have no effect on PPS of the strategy till report() is called.*

```solidity
function _tend(uint256 _totalIdle) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalIdle`|`uint256`|The current amount of idle funds that are available to deploy.|

### _tendTrigger

*Optional trigger to override if tend() will be used by the strategy.
This must be implemented if the strategy hopes to invoke _tend().*

```solidity
function _tendTrigger() internal view virtual returns (bool);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Should return true if tend() should be called by keeper or false if not.|

### tendTrigger

Returns if tend() should be called by a keeper.

```solidity
function tendTrigger() external view virtual returns (bool, bytes memory);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Should return true if tend() should be called by keeper or false if not.|
|`<none>`|`bytes`|. Calldata for the tend call.|

### availableDepositLimit

Gets the max amount of `asset` that an address can deposit.

*Defaults to an unlimited amount for any address. But can
be overridden by strategists.
This function will be called before any deposit or mints to enforce
any limits desired by the strategist. This can be used for either a
traditional deposit limit or for implementing a whitelist etc.
EX:
if(isAllowed[_owner]) return super.availableDepositLimit(_owner);
This does not need to take into account any conversion rates
from shares to assets. But should know that any non max uint256
amounts may be converted to shares. So it is recommended to keep
custom amounts low enough as not to cause overflow when multiplied
by `totalSupply`.*

```solidity
function availableDepositLimit(address) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The available amount the `_owner` can deposit in terms of `asset`|

### availableWithdrawLimit

Gets the max amount of `asset` that can be withdrawn.

*Defaults to an unlimited amount for any address. But can
be overridden by strategists.
This function will be called before any withdraw or redeem to enforce
any limits desired by the strategist. This can be used for illiquid
or sandwichable strategies. It should never be lower than `totalIdle`.
EX:
return TokenIzedStrategy.totalIdle();
This does not need to take into account the `_owner`'s share balance
or conversion rates from shares to assets.*

```solidity
function availableWithdrawLimit(address) public view virtual returns (uint256);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`||

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The available amount that can be withdrawn in terms of `asset`|

### _emergencyWithdraw

*Optional function for a strategist to override that will
allow management to manually withdraw deployed funds from the
yield source if a strategy is shutdown.
This should attempt to free `_amount`, noting that `_amount` may
be more than is currently deployed.
NOTE: This will not realize any profits or losses. A separate
`report` will be needed in order to record any profit/loss. If
a report may need to be called after a shutdown it is important
to check if the strategy is shutdown during [_harvestAndReport](#_harvestandreport)
so that it does not simply re-deploy all funds that had been freed.

```markdown title="Example"
if(freeAsset > 0 && !TokenizedStrategy.isShutdown()) {
depositFunds...
}
```

*

```solidity
function _emergencyWithdraw(uint256 _amount) internal virtual;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of asset to attempt to free.|

### deployFunds

Can deploy up to '_amount' of 'asset' in yield source.

*Callback for the TokenizedStrategy to call during a `deposit`
or `mint` to tell the strategy it can deploy funds.
Since this can only be called after a `deposit` or `mint`
delegateCall to the TokenizedStrategy msg.sender == address(this).
Unless a whitelist is implemented this will be entirely permissionless
and thus can be sandwiched or otherwise manipulated.*

```solidity
function deployFunds(uint256 _amount) external virtual onlySelf;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of 'asset' that the strategy can attempt to deposit in the yield source.|

### freeFunds

Should attempt to free the '_amount' of 'asset'.

*Callback for the TokenizedStrategy to call during a withdraw
or redeem to free the needed funds to service the withdraw.
This can only be called after a 'withdraw' or 'redeem' delegateCall
to the TokenizedStrategy so msg.sender == address(this).*

```solidity
function freeFunds(uint256 _amount) external virtual onlySelf;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of 'asset' that the strategy should attempt to free up.|

### harvestAndReport

Returns the accurate amount of all funds currently
held by the Strategy.

*Callback for the TokenizedStrategy to call during a report to
get an accurate accounting of assets the strategy controls.
This can only be called after a report() delegateCall to the
TokenizedStrategy so msg.sender == address(this).*

```solidity
function harvestAndReport() external virtual onlySelf returns (uint256);
```

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. A trusted and accurate account for the total amount of 'asset' the strategy currently holds including idle funds.|

### tendThis

Will call the internal '_tend' when a keeper tends the strategy.

*Callback for the TokenizedStrategy to initiate a _tend call in the strategy.
This can only be called after a tend() delegateCall to the TokenizedStrategy
so msg.sender == address(this).
We name the function `tendThis` so that `tend` calls are forwarded to
the TokenizedStrategy.*

```solidity
function tendThis(uint256 _totalIdle) external virtual onlySelf;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_totalIdle`|`uint256`|The amount of current idle funds that can be deployed during the tend|

### shutdownWithdraw

Will call the internal '_emergencyWithdraw' function.

*Callback for the TokenizedStrategy during an emergency withdraw.
This can only be called after a emergencyWithdraw() delegateCall to
the TokenizedStrategy so msg.sender == address(this).
We name the function `shutdownWithdraw` so that `emergencyWithdraw`
calls are forwarded to the TokenizedStrategy.*

```solidity
function shutdownWithdraw(uint256 _amount) external virtual onlySelf;
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_amount`|`uint256`|The amount of asset to attempt to free.|

### _delegateCall

*Function used to delegate call the TokenizedStrategy with
certain `_calldata` and return any return values.
This is used to setup the initial storage of the strategy, and
can be used by strategist to forward any other call to the
TokenizedStrategy implementation.*

```solidity
function _delegateCall(bytes memory _calldata) internal returns (bytes memory);
```

**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_calldata`|`bytes`|The abi encoded calldata to use in delegatecall.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes`|. The return value if the call was successful in bytes.|

### fallback

*Execute a function on the TokenizedStrategy and return any value.
This fallback function will be executed when any of the standard functions
defined in the TokenizedStrategy are called since they wont be defined in
this contract.
It will delegatecall the TokenizedStrategy implementation with the exact
calldata and return any relevant values.*

```solidity
fallback() external;
```
