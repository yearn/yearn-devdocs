<!-- markdownlint-disable MD024 MD034 MD036 -->

# TokenizedStrategy
[Git Source](https://github.com/yearn/tokenized-strategy/blob/8c8929f1878e8c5ad78aa0a6dabc877a890f68d9/src/TokenizedStrategy.sol)

**Title:**
Yearn Tokenized Strategy

**Author:**
yearn.finance




This TokenizedStrategy can be used by anyone wishing to easily build
and deploy their own custom ERC4626 compliant single strategy Vault.
The TokenizedStrategy contract is meant to be used as the proxy
implementation contract that will handle all logic, storage and
management for a custom strategy that inherits the `BaseStrategy`.
Any function calls to the strategy that are not defined within that
strategy will be forwarded through a delegateCall to this contract.
A strategist only needs to override a few simple functions that are
focused entirely on the strategy specific needs to easily and cheaply
deploy their own permissionless 4626 compliant vault.


## State Variables
### API_VERSION
API version this TokenizedStrategy implements.


```solidity
string internal constant API_VERSION = "3.1.0"
```


### ENTERED
Value to set the `entered` flag to during a call.


```solidity
uint8 internal constant ENTERED = 2
```


### NOT_ENTERED
Value to set the `entered` flag to at the end of the call.


```solidity
uint8 internal constant NOT_ENTERED = 1
```


### MAX_FEE
Maximum in Basis Points the Performance Fee can be set to.


```solidity
uint16 public constant MAX_FEE = 5_000
```


### MAX_BPS
Used for fee calculations.


```solidity
uint256 internal constant MAX_BPS = 10_000
```


### MAX_BPS_EXTENDED
Used for profit unlocking rate calculations.


```solidity
uint256 internal constant MAX_BPS_EXTENDED = 1_000_000_000_000
```


### DEAD_ADDRESS
Holder for dead shares minted against unsolicited initial assets.


```solidity
address internal constant DEAD_ADDRESS = 0x000000000000000000000000000000000000dEaD
```


### MINIMUM_SUPPLY
Supply floor below which accrued profit is minted to
\{DEAD_ADDRESS\} to block first-depositor inflation.


```solidity
uint256 internal constant MINIMUM_SUPPLY = 1e3
```


### BASE_STRATEGY_STORAGE
Custom storage slot that will be used to store the
`StrategyData` struct that holds each strategies
specific storage variables.
Any storage updates done by the TokenizedStrategy actually update
the storage of the calling contract. This variable points
to the specific location that will be used to store the
struct that holds all that data.
We use a custom string in order to get a random
storage slot that will allow for strategists to use any
amount of storage in their strategy without worrying
about collisions.


```solidity
bytes32 internal constant BASE_STRATEGY_STORAGE = bytes32(uint256(keccak256("yearn.base.strategy.storage")) - 1)
```


### FACTORY
Address of the previously deployed Vault factory that the


```solidity
address public immutable FACTORY
```


## Functions
### onlyManagement

Require that the call is coming from the strategies management.


```solidity
modifier onlyManagement() ;
```

### onlyKeepers

Require that the call is coming from either the strategies
management or the keeper.


```solidity
modifier onlyKeepers() ;
```

### onlyEmergencyAuthorized

Require that the call is coming from either the strategies
management or the emergencyAdmin.


```solidity
modifier onlyEmergencyAuthorized() ;
```

### nonReentrant

Prevents a contract from calling itself, directly or indirectly.
Placed over all state changing functions for increased safety.


```solidity
modifier nonReentrant() ;
```

### whenNotPaused

Require that the strategy is not paused.


```solidity
modifier whenNotPaused() ;
```

### requireManagement

Require a caller is `management`.

Is left public so that it can be used by the Strategy.
When the Strategy calls this the msg.sender would be the
address of the strategy so we need to specify the sender.


```solidity
function requireManagement(address _sender) public view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The original msg.sender.|


### requireKeeperOrManagement

Require a caller is the `keeper` or `management`.

Is left public so that it can be used by the Strategy.
When the Strategy calls this the msg.sender would be the
address of the strategy so we need to specify the sender.


```solidity
function requireKeeperOrManagement(address _sender) public view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The original msg.sender.|


### requireEmergencyAuthorized

Require a caller is the `management` or `emergencyAdmin`.

Is left public so that it can be used by the Strategy.
When the Strategy calls this the msg.sender would be the
address of the strategy so we need to specify the sender.


```solidity
function requireEmergencyAuthorized(address _sender) public view;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_sender`|`address`|The original msg.sender.|


### _strategyStorage

will return the actual storage slot where the strategy
specific `StrategyData` struct is stored for both read
and write operations.
This loads just the slot location, not the full struct
so it can be used in a gas efficient manner.


```solidity
function _strategyStorage() internal pure returns (StrategyData storage S);
```

### initialize

Used to initialize storage for a newly deployed strategy.

This should be called atomically whenever a new strategy is
deployed and can only be called once for each strategy.
This will set all the default storage that must be set for a
strategy to function. Any changes can be made post deployment
through external calls from `management`.
The function will also emit an event that off chain indexers can
look for to track any new deployments using this TokenizedStrategy.


```solidity
function initialize(
    address _asset,
    string memory _name,
    address _management,
    address _performanceFeeRecipient,
    address _keeper
) external;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_asset`|`address`|Address of the underlying asset.|
|`_name`|`string`|Name the strategy will use.|
|`_management`|`address`|Address to set as the strategies `management`.|
|`_performanceFeeRecipient`|`address`|Address to receive performance fees.|
|`_keeper`|`address`|Address to set as strategies `keeper`.|


### deposit

Mints `shares` of strategy shares to `receiver` by
depositing exactly `assets` of underlying tokens.


```solidity
function deposit(uint256 assets, address receiver) external whenNotPaused nonReentrant returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying to deposit in.|
|`receiver`|`address`|The address to receive the `shares`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The actual amount of shares issued.|


### mint

Mints exactly `shares` of strategy shares to
`receiver` by depositing `assets` of underlying tokens.


```solidity
function mint(uint256 shares, address receiver) external whenNotPaused nonReentrant returns (uint256 assets);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of strategy shares mint.|
|`receiver`|`address`|The address to receive the `shares`.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The actual amount of asset deposited.|


### withdraw

Withdraws exactly `assets` from `owners` shares and sends
the underlying tokens to `receiver`.

This will default to not allowing any loss to be taken.


```solidity
function withdraw(uint256 assets, address receiver, address owner) external returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying to withdraw.|
|`receiver`|`address`|The address to receive `assets`.|
|`owner`|`address`|The address whose shares are burnt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The actual amount of shares burnt.|


### withdraw

Withdraws `assets` from `owners` shares and sends
the underlying tokens to `receiver`.

This includes an added parameter to allow for losses.


```solidity
function withdraw(uint256 assets, address receiver, address owner, uint256 maxLoss)
    public
    whenNotPaused
    nonReentrant
    returns (uint256 shares);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying to withdraw.|
|`receiver`|`address`|The address to receive `assets`.|
|`owner`|`address`|The address whose shares are burnt.|
|`maxLoss`|`uint256`|The amount of acceptable loss in Basis points.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The actual amount of shares burnt.|


### redeem

Redeems exactly `shares` from `owner` and
sends `assets` of underlying tokens to `receiver`.

This will default to allowing any loss passed to be realized.


```solidity
function redeem(uint256 shares, address receiver, address owner) external returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burnt.|
|`receiver`|`address`|The address to receive `assets`.|
|`owner`|`address`|The address whose shares are burnt.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|assets The actual amount of underlying withdrawn.|


### redeem

Redeems exactly `shares` from `owner` and
sends `assets` of underlying tokens to `receiver`.

This includes an added parameter to allow for losses.


```solidity
function redeem(uint256 shares, address receiver, address owner, uint256 maxLoss)
    public
    whenNotPaused
    nonReentrant
    returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares burnt.|
|`receiver`|`address`|The address to receive `assets`.|
|`owner`|`address`|The address whose shares are burnt.|
|`maxLoss`|`uint256`|The amount of acceptable loss in Basis points.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The actual amount of underlying withdrawn.|


### totalAssets

Get the total amount of assets this strategy holds
under the current block-latched accounting estimate.
Normal write flows freeze this value after the first sync in a block.
A manual [report](#report) can refresh it again within that same block.

This reflects the *simulated* constant-accrual state, including
any pending profit or loss that has not yet been realized by a
state-changing accrual. [convertToShares](#converttoshares), [convertToAssets](#converttoassets) and all
preview functions use the same simulated state, while [totalSupply](#totalsupply)
only reflects realized ERC20 supply. The two views can therefore
appear inconsistent until the pending accrual is realized.


```solidity
function totalAssets() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. Total assets the strategy holds.|


### totalSupply

Get the current supply of the strategies shares.

This is the *realized* ERC20 supply (stored supply minus
unlocked strategy-held shares). It does not include fee shares
that would be minted for pending constant-accrual profit, nor the
locked-share burn simulated for pending losses. [totalAssets](#totalassets),
conversions and previews do reflect that simulated state, so
comparing this value against those views may show different
accounting assumptions until the pending accrual is realized.


```solidity
function totalSupply() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. Total amount of shares outstanding.|


### convertToShares

The amount of shares that the strategy would
exchange for the amount of assets provided, in an
ideal scenario where all the conditions are met.


```solidity
function convertToShares(uint256 assets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of underlying.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. Expected shares that `assets` represents.|


### convertToAssets

The amount of assets that the strategy would
exchange for the amount of shares provided, in an
ideal scenario where all the conditions are met.


```solidity
function convertToAssets(uint256 shares) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of the strategies shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. Expected amount of `asset` the shares represents.|


### previewDeposit

Allows an on-chain or off-chain user to simulate
the effects of their deposit at the current block, given
current on-chain conditions.

This will round down.


```solidity
function previewDeposit(uint256 assets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of `asset` to deposits.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. Expected shares that would be issued.|


### previewMint

Allows an on-chain or off-chain user to simulate
the effects of their mint at the current block, given
current on-chain conditions.

This is used instead of convertToAssets so that it can
round up for safer mints.


```solidity
function previewMint(uint256 shares) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares to mint.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The needed amount of `asset` for the mint.|


### previewWithdraw

Allows an on-chain or off-chain user to simulate
the effects of their withdrawal at the current block,
given current on-chain conditions.

This is used instead of convertToShares so that it can
round up for safer withdraws.


```solidity
function previewWithdraw(uint256 assets) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`assets`|`uint256`|The amount of `asset` that would be withdrawn.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of shares that would be burnt.|


### previewRedeem

Allows an on-chain or off-chain user to simulate
the effects of their redemption at the current block,
given current on-chain conditions.

This will round down.


```solidity
function previewRedeem(uint256 shares) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`shares`|`uint256`|The amount of shares that would be redeemed.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of `asset` that would be returned.|


### maxDeposit

Total number of underlying assets that can
be deposited into the strategy, where `receiver`
corresponds to the receiver of the shares of a [deposit](#deposit) call.


```solidity
function maxDeposit(address receiver) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address receiving the shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The max that `receiver` can deposit in `asset`.|


### maxMint

Total number of shares that can be minted to `receiver`
of a [mint](#mint) call.


```solidity
function maxMint(address receiver) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`receiver`|`address`|The address receiving the shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_maxMint The max that `receiver` can mint in shares.|


### maxWithdraw

Total number of underlying assets that can be
withdrawn from the strategy by `owner`, where `owner`
corresponds to the msg.sender of a [redeem](#redeem) call.


```solidity
function maxWithdraw(address owner) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_maxWithdraw Max amount of `asset` that can be withdrawn.|


### maxWithdraw

Variable `maxLoss` is ignored.

Accepts a `maxLoss` variable in order to match the multi
strategy vaults ABI.


```solidity
function maxWithdraw(
    address owner,
    uint256 /*maxLoss*/
)
    external
    view
    returns (uint256);
```

### maxRedeem

Total number of strategy shares that can be
redeemed from the strategy by `owner`, where `owner`
corresponds to the msg.sender of a [redeem](#redeem) call.


```solidity
function maxRedeem(address owner) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The owner of the shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|_maxRedeem Max amount of shares that can be redeemed.|


### maxRedeem

Variable `maxLoss` is ignored.

Accepts a `maxLoss` variable in order to match the multi
strategy vaults ABI.


```solidity
function maxRedeem(
    address owner,
    uint256 /*maxLoss*/
)
    external
    view
    returns (uint256);
```

### _totalAssets

Internal implementation of [totalAssets](#totalassets).


```solidity
function _totalAssets(StrategyData storage S) internal view returns (uint256);
```

### _totalSupply

We don't increase totalSupply until actual shares are minted.
This can cause disconnection between conversions done manually.

Internal implementation of [totalSupply](#totalsupply).


```solidity
function _totalSupply(StrategyData storage S) internal view returns (uint256);
```

### _simulatedTotals

Internal helper to simulate the supply/assets state under the current block latch.


```solidity
function _simulatedTotals(StrategyData storage S) internal view returns (uint256 supply, uint256 assets);
```

### _strategyTotalAssets

Internal helper to ask the strategy for its current total assets.


```solidity
function _strategyTotalAssets() internal view returns (uint256);
```

### _convertToSharesFromTotals

Converts using an explicit supply/assets snapshot.


```solidity
function _convertToSharesFromTotals(uint256 assets, uint256 supply, uint256 totalAssets_, Math.Rounding _rounding)
    internal
    pure
    returns (uint256);
```

### _convertToAssetsFromTotals

Converts using an explicit supply/assets snapshot.


```solidity
function _convertToAssetsFromTotals(uint256 shares, uint256 supply, uint256 totalAssets_, Math.Rounding _rounding)
    internal
    pure
    returns (uint256);
```

### _convertToShares

Internal implementation of [convertToShares](#converttoshares).


```solidity
function _convertToShares(StrategyData storage S, uint256 assets, Math.Rounding _rounding)
    internal
    view
    returns (uint256);
```

### _convertToAssets

Internal implementation of [convertToAssets](#converttoassets).


```solidity
function _convertToAssets(StrategyData storage S, uint256 shares, Math.Rounding _rounding)
    internal
    view
    returns (uint256);
```

### _maxDeposit

Internal implementation of [maxDeposit](#maxdeposit).


```solidity
function _maxDeposit(StrategyData storage S, address receiver) internal view returns (uint256);
```

### _maxMint

Internal implementation of [maxMint](#maxmint).


```solidity
function _maxMint(StrategyData storage S, address receiver) internal view returns (uint256 maxMint_);
```

### _maxWithdraw

Internal implementation of [maxWithdraw](#maxwithdraw).


```solidity
function _maxWithdraw(StrategyData storage S, address owner) internal view returns (uint256 maxWithdraw_);
```

### _maxRedeem

Internal implementation of [maxRedeem](#maxredeem).


```solidity
function _maxRedeem(StrategyData storage S, address owner) internal view returns (uint256 maxRedeem_);
```

### _deposit

Function to be called during [deposit](#deposit) and [mint](#mint).
This function handles all logic including transfers,
minting and accounting.
We do all external calls before updating any internal
values to prevent view reentrancy issues from the token
transfers or the _deployFunds() calls.


```solidity
function _deposit(StrategyData storage S, address receiver, uint256 assets, uint256 shares) internal;
```

### _withdraw

To be called during [redeem](#redeem) and [withdraw](#withdraw).
This will handle all logic, transfers and accounting
in order to service the withdraw request.
If we are not able to withdraw the full amount needed, it will
be counted as a loss and passed on to the user.


```solidity
function _withdraw(
    StrategyData storage S,
    address receiver,
    address owner,
    uint256 assets,
    uint256 shares,
    uint256 maxLoss
) internal returns (uint256);
```

### _accrue

Synchronize accounting using the strategy's current view estimate unless this block is already latched.


```solidity
function _accrue(StrategyData storage S) internal returns (uint256 profit, uint256 loss);
```

### _chargeFees

Mint fee shares for asset-based live accrual.


```solidity
function _chargeFees(StrategyData storage S, uint256 profit, uint256 newTotalAssets, bool useNewPps)
    internal
    returns (uint256 totalFees, uint256 protocolFees, uint256 totalFeeShares);
```

### _realizeLoss


```solidity
function _realizeLoss(StrategyData storage S, uint256 loss) internal;
```

### _lossBurnState

Returns the loss burn split between already-unlocked and still-locked shares.


```solidity
function _lossBurnState(StrategyData storage S, uint256 loss, uint256 supply, uint256 totalAssets_)
    internal
    view
    returns (uint256 lockedBurn, uint256 totalBurn);
```

### _syncUnlockScheduleAfterLoss

Re-seeds unlock accounting after `_accrue` burns buffer shares for a loss.


```solidity
function _syncUnlockScheduleAfterLoss(StrategyData storage S) internal;
```

### report

Function for keepers to call to harvest and record all
profits accrued.

This will account for any gains/losses since the last report
and charge fees accordingly.
Any profit over the fees charged will be immediately locked
so there is no change in PricePerShare. Then slowly unlocked
over the `maxProfitUnlockTime` each second based on the
calculated `profitUnlockingRate`.
In case of a loss it will first attempt to offset the loss
with any remaining locked shares from the last report in
order to reduce any negative impact to PPS.
Will then recalculate the new time to unlock profits over and the
rate based on a weighted average of any remaining time from the
last report and the new amount of shares to be locked.


```solidity
function report() external nonReentrant onlyKeepers returns (uint256 profit, uint256 loss);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`profit`|`uint256`|The notional amount of gain if any since the last report in terms of `asset`.|
|`loss`|`uint256`|The notional amount of loss if any since the last report in terms of `asset`.|


### unlockedShares

Get how many report-locked shares have unlocked.


```solidity
function unlockedShares() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The amount of shares that have unlocked.|


### _unlockedShares

To determine how many report-locked shares have unlocked.


```solidity
function _unlockedShares(StrategyData storage S) internal view returns (uint256 unlocked);
```

### tend

For a 'keeper' to 'tend' the strategy if a custom
tendTrigger() is implemented.

Both 'tendTrigger' and '_tend' will need to be overridden
for this to be used.
This will callback the internal '_tend' call in the BaseStrategy
with the total current amount available to the strategy to deploy.
This is a permissioned function so if desired it could
be used for illiquid or manipulatable strategies to compound
rewards, perform maintenance or deposit/withdraw funds.
This performs no accounting checkpoint itself. Under constant
accrual, any value change made by '_tend' is reflected in
[totalAssets](#totalassets), conversions and previews through simulation —
immediately within this block if no accrual has latched it yet
(see [totalAssets](#totalassets)), otherwise from the next block — and is
realized (fees charged, losses offset) by the next state-changing
accrual: any deposit, mint, withdraw, redeem, fee configuration
change, or report.
Any pre-existing pending profit or loss nets against the effects
of the tend before fees are assessed. This is intended: performance
fees are charged on the net result, not the gross.


```solidity
function tend() external nonReentrant onlyKeepers;
```

### shutdownStrategy

Used to shutdown the strategy preventing any further deposits.

Can only be called by the current `management` or `emergencyAdmin`.
This will stop any new [deposit](#deposit) or [mint](#mint) calls but will
not prevent [withdraw](#withdraw) or [redeem](#redeem). It will also still allow for
[tend](#tend) and [report](#report) so that management can report any last losses
in an emergency as well as provide any maintenance to allow for full
withdraw.
This is a one way switch and can never be set back once shutdown.


```solidity
function shutdownStrategy() external onlyEmergencyAuthorized;
```

### setPaused

Used to set the pause status for user facing 4626 functions.

Pausing can be called by the current `management` or `emergencyAdmin`.
Unpausing can only be called by the current `management`.
This will stop [deposit](#deposit), [mint](#mint), [withdraw](#withdraw) and [redeem](#redeem), but will
leave management functions live so the strategy can still be tended,
reported, configured, shutdown or manually withdrawn in an emergency.


```solidity
function setPaused(bool paused) external;
```

### emergencyWithdraw

To manually withdraw funds from the yield source after a
strategy has been shutdown.

This can only be called when the strategy is paused or shutdown.
This path deliberately performs no accrual so that the rescue flow
has no dependency on `strategyTotalAssets()`, which may revert or
be unreliable mid-emergency. Any profit or loss caused by the
unwind follows the same rules as [tend](#tend): it is reflected in
[totalAssets](#totalassets), conversions and previews through simulation and is
realized by the next state-changing accrual. Management can call
[report](#report) afterward if controlled realization is desired.
A strategist will need to override the \{_emergencyWithdraw\} function
in their strategy for this to work.


```solidity
function emergencyWithdraw(uint256 amount) external nonReentrant onlyEmergencyAuthorized;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`amount`|`uint256`|The amount of asset to attempt to free.|


### asset

Get the underlying asset for the strategy.


```solidity
function asset() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. The underlying asset.|


### apiVersion

Get the API version for this TokenizedStrategy.


```solidity
function apiVersion() external pure returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|. The API version for this TokenizedStrategy|


### management

Get the current address that controls the strategy.


```solidity
function management() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of management|


### pendingManagement

Get the current pending management address if any.


```solidity
function pendingManagement() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of pendingManagement|


### keeper

Get the current address that can call tend and report.


```solidity
function keeper() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of the keeper|


### emergencyAdmin

Get the current address that can shutdown and emergency withdraw.


```solidity
function emergencyAdmin() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of the emergencyAdmin|


### performanceFee

Get the current performance fee charged on profits.
denominated in Basis Points where 10_000 == 100%


```solidity
function performanceFee() external view returns (uint16);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint16`|. Current performance fee.|


### performanceFeeRecipient

Get the current address that receives the performance fees.


```solidity
function performanceFeeRecipient() external view returns (address);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`address`|. Address of performanceFeeRecipient|


### profitMaxUnlockTime

Gets the current time profits are set to unlock over.

Returns `type(uint256).max` when the packed value was clamped.


```solidity
function profitMaxUnlockTime() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The current profit max unlock time.|


### lastReport

The timestamp of the last report call.


```solidity
function lastReport() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The last report.|


### lastAccrual

The timestamp of the last accounting sync.


```solidity
function lastAccrual() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The last accrual.|


### lastTotalAssets

The last realized total assets baseline.


```solidity
function lastTotalAssets() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The last stored total assets.|


### fullProfitUnlockDate

Gets the timestamp at which all reported profits will be unlocked.


```solidity
function fullProfitUnlockDate() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The full profit unlocking timestamp.|


### profitUnlockingRate

The per second rate at which reported profits are unlocking.


```solidity
function profitUnlockingRate() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The current profit unlocking rate.|


### pricePerShare

Get the price per share.

This value offers limited precision. Integrations that require
exact precision should use convertToAssets or convertToShares instead.


```solidity
function pricePerShare() external view returns (uint256);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The price per share.|


### isShutdown

To check if the strategy has been shutdown.


```solidity
function isShutdown() external view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Whether or not the strategy is shutdown.|


### isPaused

To check if the strategy has been paused.


```solidity
function isPaused() external view returns (bool);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. Whether or not the strategy is paused.|


### setPendingManagement

Step one of two to set a new address to be in charge of the strategy.

Can only be called by the current `management`. The address is
set to pending management and will then have to call [acceptManagement](#acceptmanagement)
in order for the 'management' to officially change.
Cannot set `management` to address(0).


```solidity
function setPendingManagement(address _management) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_management`|`address`|New address to set `pendingManagement` to.|


### acceptManagement

Step two of two to set a new 'management' of the strategy.

Can only be called by the current `pendingManagement`.


```solidity
function acceptManagement() external;
```

### setKeeper

Sets a new address to be in charge of tend and reports.

Can only be called by the current `management`.


```solidity
function setKeeper(address _keeper) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_keeper`|`address`|New address to set `keeper` to.|


### setEmergencyAdmin

Sets a new address to be able to shutdown the strategy.

Can only be called by the current `management`.


```solidity
function setEmergencyAdmin(address _emergencyAdmin) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_emergencyAdmin`|`address`|New address to set `emergencyAdmin` to.|


### setPerformanceFee

Sets the performance fee to be charged on reported gains.

Can only be called by the current `management`.
Denominated in Basis Points. So 100% == 10_000.
Cannot set greater than to MAX_FEE.


```solidity
function setPerformanceFee(uint16 _performanceFee) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_performanceFee`|`uint16`|New performance fee.|


### setPerformanceFeeRecipient

Sets a new address to receive performance fees.

Can only be called by the current `management`.
Cannot set to address(0).


```solidity
function setPerformanceFeeRecipient(address _performanceFeeRecipient) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_performanceFeeRecipient`|`address`|New address to set `management` to.|


### setProfitMaxUnlockTime

Sets the time for profits to be unlocked over.

Can only be called by the current `management`.
NOTE: Setting to 0 will cause all currently locked profit
to be unlocked instantly and should be done with care.
`profitMaxUnlockTime` is packed as a `uint32`. Larger inputs are
clamped to `type(uint32).max`, and the getter exposes that sentinel
as `type(uint256).max`.


```solidity
function setProfitMaxUnlockTime(uint256 _profitMaxUnlockTime) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_profitMaxUnlockTime`|`uint256`|New `profitMaxUnlockTime`.|


### setName

Updates the name for the strategy.


```solidity
function setName(string calldata _name) external onlyManagement;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_name`|`string`|The new name for the strategy.|


### name

Returns the name of the token.


```solidity
function name() external view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|. The name the strategy is using for its token.|


### symbol

Returns the symbol of the strategies token.

Will be 'ys + asset symbol'.


```solidity
function symbol() external view returns (string memory);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`string`|. The symbol the strategy is using for its tokens.|


### decimals

Returns the number of decimals used to get its user representation.


```solidity
function decimals() external view returns (uint8);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint8`|. The decimals used for the strategy and `asset`.|


### balanceOf

Returns the current balance for a given '_account'.


```solidity
function balanceOf(address account) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`account`|`address`|the address to return the balance for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The current balance in y shares of the '_account'.|


### _balanceOf

Internal implementation of [balanceOf](#balanceof).


```solidity
function _balanceOf(StrategyData storage S, address account) internal view returns (uint256);
```

### transfer

Transfer '_amount` of shares from `msg.sender` to `to`.


Requirements:
- `from` cannot be the address of the strategy.
- `to` cannot be the zero address.
- `to` cannot be the address of the strategy.
- the caller must have a balance of at least `_amount`.


```solidity
function transfer(address to, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`to`|`address`|The address shares will be transferred to.|
|`amount`|`uint256`|The amount of shares to be transferred from sender.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. a boolean value indicating whether the operation succeeded.|


### allowance

Returns the remaining number of tokens that `spender` will be
allowed to spend on behalf of `owner` through [transferFrom](#transferfrom). This is
zero by default.
This value changes when [approve](#approve) or [transferFrom](#transferfrom) are called.


```solidity
function allowance(address owner, address spender) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`owner`|`address`|The address who owns the shares.|
|`spender`|`address`|The address who would be moving the owners shares.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. The remaining amount of shares of `owner` that could be moved by `spender`.|


### _allowance

Internal implementation of [allowance](#allowance).


```solidity
function _allowance(StrategyData storage S, address owner, address spender) internal view returns (uint256);
```

### approve

Sets `amount` as the allowance of `spender` over the caller's tokens.


NOTE: If `amount` is the maximum `uint256`, the allowance is not updated on
`transferFrom`. This is semantically equivalent to an infinite approval.
Requirements:
- `spender` cannot be the zero address.
IMPORTANT: Beware that changing an allowance with this method brings the risk
that someone may use both the old and the new allowance by unfortunate
transaction ordering. One possible solution to mitigate this race
condition is to first reduce the spender's allowance to 0 and set the
desired value afterwards:
https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
Emits an [Approval](#approval) event.


```solidity
function approve(address spender, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`spender`|`address`|the address to allow the shares to be moved by.|
|`amount`|`uint256`|the amount of shares to allow `spender` to move.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. a boolean value indicating whether the operation succeeded.|


### transferFrom

`amount` tokens from `from` to `to` using the
allowance mechanism. `amount` is then deducted from the caller's
allowance.


Emits an [Approval](#approval) event indicating the updated allowance. This is not
required by the EIP.
NOTE: Does not update the allowance if the current allowance
is the maximum `uint256`.
Requirements:
- `from` and `to` cannot be the zero address.
- `from` cannot be the address of the strategy.
- `to` cannot be the address of the strategy.
- `from` must have a balance of at least `amount`.
- the caller must have allowance for ``from``'s tokens of at least
`amount`.
Emits a [Transfer](#transfer) event.


```solidity
function transferFrom(address from, address to, uint256 amount) external returns (bool);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`from`|`address`|the address to be moving shares from.|
|`to`|`address`|the address to be moving shares to.|
|`amount`|`uint256`|the quantity of shares to move.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bool`|. a boolean value indicating whether the operation succeeded.|


### _transfer

Moves `amount` of tokens from `from` to `to`.
This internal function is equivalent to [transfer](#transfer), and can be used to
e.g. implement automatic token fees, slashing mechanisms, etc.
Emits a [Transfer](#transfer) event.
Requirements:
- `from` cannot be the zero address.
- `to` cannot be the zero address.
- `from` cannot be the strategies address.
- `to` cannot be the strategies address.
- `from` must have a balance of at least `amount`.


```solidity
function _transfer(StrategyData storage S, address from, address to, uint256 amount) internal;
```

### _mint

Creates `amount` tokens and assigns them to `account`, increasing
the total supply.
Emits a [Transfer](#transfer) event with `from` set to the zero address.
Requirements:
- `account` cannot be the zero address.


```solidity
function _mint(StrategyData storage S, address account, uint256 amount) internal;
```

### _burn

Destroys `amount` tokens from `account`, reducing the
total supply.
Emits a [Transfer](#transfer) event with `to` set to the zero address.
Requirements:
- `account` cannot be the zero address.
- `account` must have at least `amount` tokens.


```solidity
function _burn(StrategyData storage S, address account, uint256 amount) internal;
```

### _approve

Sets `amount` as the allowance of `spender` over the `owner` s tokens.
This internal function is equivalent to `approve`, and can be used to
e.g. set automatic allowances for certain subsystems, etc.
Emits an [Approval](#approval) event.
Requirements:
- `owner` cannot be the zero address.
- `spender` cannot be the zero address.


```solidity
function _approve(StrategyData storage S, address owner, address spender, uint256 amount) internal;
```

### _spendAllowance

Updates `owner` s allowance for `spender` based on spent `amount`.
Does not update the allowance amount in case of infinite allowance.
Revert if not enough allowance is available.
Might emit an [Approval](#approval) event.


```solidity
function _spendAllowance(StrategyData storage S, address owner, address spender, uint256 amount) internal;
```

### nonces

Returns the current nonce for `owner`. This value must be
included whenever a signature is generated for [permit](#permit).

Every successful call to [permit](#permit) increases ``owner``'s nonce by one. This
prevents a signature from being used multiple times.


```solidity
function nonces(address _owner) external view returns (uint256);
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_owner`|`address`|the address of the account to return the nonce for.|

**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`uint256`|. the current nonce for the account.|


### permit

Sets `value` as the allowance of `spender` over ``owner``'s tokens,
given ``owner``'s signed approval.

IMPORTANT: The same issues [IERC20-approve](https://github.com/yearn/tokenized-strategy/blob/8c8929f1878e8c5ad78aa0a6dabc877a890f68d9/src/test/handlers/StrategyHandler.sol) has related to transaction
ordering also apply here.
Emits an [Approval](#approval) event.
Requirements:
- `spender` cannot be the zero address.
- `deadline` must be a timestamp in the future.
- `v`, `r` and `s` must be a valid `secp256k1` signature from `owner`
over the EIP712-formatted function arguments.
- the signature must use ``owner``'s current nonce (see [nonces](#nonces)).
For more information on the signature format, see the
https://eips.ethereum.org/EIPS/eip-2612#specification[relevant EIP
section].


```solidity
function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)
    external;
```

### DOMAIN_SEPARATOR

Returns the domain separator used in the encoding of the signature
for [permit](#permit), as defined by \{EIP712\}.


```solidity
function DOMAIN_SEPARATOR() public view returns (bytes32);
```
**Returns**

|Name|Type|Description|
|----|----|-----------|
|`<none>`|`bytes32`|. The domain separator that will be used for any [permit](#permit) calls.|


### constructor

On contract creation we set `asset` for this contract to address(1).
This prevents it from ever being initialized in the future.


```solidity
constructor(address _factory) ;
```
**Parameters**

|Name|Type|Description|
|----|----|-----------|
|`_factory`|`address`|Address of the factory of the same version for protocol fees.|


## Events
### StrategyShutdown
Emitted when a strategy is shutdown.


```solidity
event StrategyShutdown();
```

### UpdatePaused
Emitted when a strategies paused status is updated.


```solidity
event UpdatePaused(bool paused);
```

### NewTokenizedStrategy
Emitted on the initialization of any new `strategy` that uses `asset`
with this specific `apiVersion`.


```solidity
event NewTokenizedStrategy(address indexed strategy, address indexed asset, string apiVersion);
```

### Reported
Emitted when the strategy reports `profit` or `loss` and
`performanceFees` and `protocolFees` are paid out.


```solidity
event Reported(uint256 profit, uint256 loss, uint256 protocolFees, uint256 performanceFees);
```

### Accrued
Emitted when the strategy accrues `profit` or `loss` outside of
an explicit report and `performanceFees` and `protocolFees` are paid out.


```solidity
event Accrued(uint256 profit, uint256 loss, uint256 protocolFees, uint256 performanceFees);
```

### UpdatePerformanceFeeRecipient
Emitted when the 'performanceFeeRecipient' address is
updated to 'newPerformanceFeeRecipient'.


```solidity
event UpdatePerformanceFeeRecipient(address indexed newPerformanceFeeRecipient);
```

### UpdateKeeper
Emitted when the 'keeper' address is updated to 'newKeeper'.


```solidity
event UpdateKeeper(address indexed newKeeper);
```

### UpdatePerformanceFee
Emitted when the 'performanceFee' is updated to 'newPerformanceFee'.


```solidity
event UpdatePerformanceFee(uint16 newPerformanceFee);
```

### UpdateManagement
Emitted when the 'management' address is updated to 'newManagement'.


```solidity
event UpdateManagement(address indexed newManagement);
```

### UpdateEmergencyAdmin
Emitted when the 'emergencyAdmin' address is updated to 'newEmergencyAdmin'.


```solidity
event UpdateEmergencyAdmin(address indexed newEmergencyAdmin);
```

### UpdateProfitMaxUnlockTime
Emitted when the 'profitMaxUnlockTime' is updated to 'newProfitMaxUnlockTime'.


```solidity
event UpdateProfitMaxUnlockTime(uint256 newProfitMaxUnlockTime);
```

### UpdatePendingManagement
Emitted when the 'pendingManagement' address is updated to 'newPendingManagement'.


```solidity
event UpdatePendingManagement(address indexed newPendingManagement);
```

### Approval
Emitted when the allowance of a `spender` for an `owner` is set by
a call to [approve](#approve). `value` is the new allowance.


```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

### Transfer
Emitted when `value` tokens are moved from one account (`from`) to
another (`to`).
Note that `value` may be zero.


```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

### Deposit
Emitted when the `caller` has exchanged `assets` for `shares`,
and transferred those `shares` to `owner`.


```solidity
event Deposit(address indexed caller, address indexed owner, uint256 assets, uint256 shares);
```

### Withdraw
Emitted when the `caller` has exchanged `owner`s `shares` for `assets`,
and transferred those `assets` to `receiver`.


```solidity
event Withdraw(
    address indexed caller, address indexed receiver, address indexed owner, uint256 assets, uint256 shares
);
```

## Structs
### StrategyData
The struct that will hold all the storage data for each strategy
that uses this implementation.
This replaces all state variables for a traditional contract. This
full struct will be initialized on the creation of the strategy
and continually updated and read from for the life of the contract.
We combine all the variables into one struct to limit the amount of
times the custom storage slots need to be loaded during complex functions.
Loading the corresponding storage slot for the struct does not
load any of the contents of the struct into memory. So the size
will not increase memory related gas usage.


```solidity
struct StrategyData {
    // The ERC20 compliant underlying asset that will be
    // used by the Strategy
    ERC20 asset;

    // These are the corresponding ERC20 variables needed for the
    // strategies token that is issued and burned on each deposit or withdraw.
    uint8 decimals; // The amount of decimals that `asset` and strategy use.
    string name; // The name of the token for the strategy.
    uint256 totalSupply; // The total amount of shares currently issued.
    mapping(address => uint256) nonces; // Mapping of nonces used for permit functions.
    mapping(address => uint256) balances; // Mapping to track current balances for each account that holds shares.
    mapping(address => mapping(address => uint256)) allowances; // Mapping to track the allowances for the strategies shares.

    // Last realized total assets. This is used as the accrual baseline during
    // write flows and to freeze view math during in-flight external callbacks.
    uint256 lastTotalAssets;

    // Variables for profit reporting and locking.
    // We use uint96 for timestamps to fit in the same slot as an address. That overflows in 2.5e+21 years.
    // I know Yearn moves slowly but surely V4 will be out by then.
    // If the timestamps ever overflow tell the cyborgs still using this code I'm sorry for being cheap.
    uint256 profitUnlockingRate; // The rate at which locked profit is unlocking.
    uint96 fullProfitUnlockDate; // The timestamp at which all locked shares will unlock.
    address keeper; // Address given permission to call {report} and {tend}.
    uint32 profitMaxUnlockTime;
    uint16 performanceFee; // The percent in basis points of profit that is charged as a fee.
    address performanceFeeRecipient; // The address to pay the `performanceFee` to.
    uint96 lastReport; // The last time a report updated the lock schedule.

    // Access management variables.
    address management; // Main address that can set all configurable variables.
    address pendingManagement; // Address that is pending to take over `management`.
    address emergencyAdmin; // Address to act in emergencies as well as `management`.

    // Strategy Status
    uint8 entered; // To prevent reentrancy. Use uint8 for gas savings.
    bool shutdown; // Bool that can be used to stop deposits into the strategy.
    bool paused; // Bool that can be used to stop user facing 4626 functions.

    uint72 lastAccrual; // The last time accounting synced.
}
```
