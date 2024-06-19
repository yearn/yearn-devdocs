# Vault.vy
>
> vyper: `0.2.8`
> author: `yearn.fi`
> license: `GNU AGPLv3`

**Yearn Token Vault**

*Yearn Token Vault. Holds an underlying token, and allows users to interact with the Yearn ecosystem through Strategies connected to the Vault. Vaults are not limited to a single Strategy, they can have as many Strategies as can be designed (however the withdrawal queue is capped at 20.) Deposited funds are moved into the most impactful strategy that has not already reached its limit for assets under management, regardless of which Strategy a user's funds end up in, they receive their portion of yields generated across all Strategies. When a user withdraws, if there are no funds sitting undeployed in the Vault, the Vault withdraws funds from Strategies in the order of least impact. (Funds are taken from the Strategy that will disturb everyone's gains the least, then the next least, etc.) In order to achieve this, the withdrawal queue's order must be properly set and managed by the community (through governance). Vault Strategies are parameterized to pursue the highest risk-adjusted yield. There is an "Emergency Shutdown" mode. When the Vault is put into emergency shutdown, assets will be recalled from the Strategies as quickly as is practical (given on-chain conditions), minimizing loss. Deposits are halted, new Strategies may not be added, and each Strategy exits with the minimum possible damage to position, while opening up deposits to be withdrawn by users. There are no restrictions on withdrawals above what is expected under Normal Operation. For further details, please refer to the specification: https://github.com/iearn-finance/yearn-vaults/blob/master/SPECIFICATION.md*

## Events

**Transfer**

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `value` : uint256, *notIndexed*

**Approval**

* `owner` : address, *indexed*
* `spender` : address, *indexed*
* `value` : uint256, *notIndexed*

**StrategyAdded**

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*
* `rateLimit` : uint256, *notIndexed*
* `performanceFee` : uint256, *notIndexed*

**StrategyReported**

* `strategy` : address, *indexed*
* `gain` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*
* `totalGain` : uint256, *notIndexed*
* `totalLoss` : uint256, *notIndexed*
* `totalDebt` : uint256, *notIndexed*
* `debtAdded` : uint256, *notIndexed*
* `debtRatio` : uint256, *notIndexed*

**UpdateGovernance**

* `governance` : address, *notIndexed*

**UpdateManagement**

* `management` : address, *notIndexed*

**UpdateGuestList**

* `guestList` : address, *notIndexed*

**UpdateRewards**

* `rewards` : address, *notIndexed*

**UpdateDepositLimit**

* `depositLimit` : uint256, *notIndexed*

**UpdatePerformanceFee**

* `performanceFee` : uint256, *notIndexed*

**UpdateManagementFee**

* `managementFee` : uint256, *notIndexed*

**UpdateGuardian**

* `guardian` : address, *notIndexed*

**EmergencyShutdown**

* `active` : bool, *notIndexed*

**UpdateWithdrawalQueue**

* `queue` : address[20], *notIndexed*

**StrategyUpdateDebtRatio**

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*

**StrategyUpdateRateLimit**

* `strategy` : address, *indexed*
* `rateLimit` : uint256, *notIndexed*

**StrategyUpdatePerformanceFee**

* `strategy` : address, *indexed*
* `performanceFee` : uint256, *notIndexed*

**StrategyMigrated**

* `oldVersion` : address, *indexed*
* `newVersion` : address, *indexed*

**StrategyRevoked**

* `strategy` : address, *indexed*

**StrategyRemovedFromQueue**

* `strategy` : address, *indexed*

**StrategyAddedToQueue**

* `strategy` : address, *indexed*

## Methods

### initialize
>
> type: `nonpayable function`
>

Initializes the Vault, this is called only once, when the contract is deployed. The performance fee is set to 10% of yield, per Strategy. The management fee is set to 2%, per year. The initial deposit limit is set to 0 (deposits disabled); it must be updated after initialization.

*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;y&#39; combined with the symbol of `token`.*

Arguments:

* `token`:  - *The token that may be deposited into this Vault.*

* `governance`:  - *The address authorized for governance interactions.*

* `rewards`:  - *The address to distribute rewards to.*

* `nameOverride`:  - *Specify a custom Vault name. Leave empty for default choice.*

* `symbolOverride`:  - *Specify a custom Vault symbol name. Leave empty for default choice.*

* `guardian`:  - *The address authorized for guardian interactions. Defaults to caller.*

### initialize
>
> type: `nonpayable function`
>

*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;y&#39; combined with the symbol of `token`.*

Arguments:

* `token`:  - *The token that may be deposited into this Vault.*

* `governance`:  - *The address authorized for governance interactions.*

* `rewards`:  - *The address to distribute rewards to.*

* `nameOverride`:  - *Specify a custom Vault name. Leave empty for default choice.*

* `symbolOverride`:  - *Specify a custom Vault symbol name. Leave empty for default choice.*

* `guardian`:  - *The address authorized for guardian interactions. Defaults to caller.*

### apiVersion
>
> type: `pure function`
> gas: `4519`

Used to track the deployed version of this contract. In practice you can use this version number to compare with Yearn&#39;s GitHub and determine which version of the source matches this deployed contract.

*All strategies must have an `apiVersion()` that matches the Vault&#39;s `API_VERSION`.*

Returns:

* `_0` - API_VERSION which holds the current version of this contract.

### setName
>
> type: `nonpayable function`
> gas: `107017`

Used to change the value of `name`. This may only be called by governance.

Arguments:

* `name`:  - *The new name to use.*

### setSymbol
>
> type: `nonpayable function`
> gas: `71867`

Used to change the value of `symbol`. This may only be called by governance.

Arguments:

* `symbol`:  - *The new symbol to use.*

### setGovernance
>
> type: `nonpayable function`
> gas: `36338`

Nominate a new address to use as governance. The change does not go into effect immediately. This function sets a pending change, and the governance address is not updated until the proposed governance address has accepted the responsibility. This may only be called by the current governance address.

Arguments:

* `governance`:  - *The address requested to take over Vault governance.*

### acceptGovernance
>
> type: `nonpayable function`
> gas: `37610`

Once a new governance address has been proposed using setGovernance(), this function may be called by the proposed address to accept the responsibility of taking over governance for this contract. This may only be called by the proposed governance address.

*setGovernance() should be called by the existing governance address, prior to calling this function.*

### setManagement
>
> type: `nonpayable function`
> gas: `37748`

Changes the management address. Management is able to make some investment decisions adjusting parameters. This may only be called by governance.

Arguments:

* `management`:  - *The address to use for managing.*

### setGuestList
>
> type: `nonpayable function`
> gas: `37778`

Used to set or change `guestList`. A guest list is another contract that dictates who is allowed to participate in a Vault (and transfer shares). This may only be called by governance.

Arguments:

* `guestList`:  - *The address of the `GuestList` contract to use.*

### setRewards
>
> type: `nonpayable function`
> gas: `37808`

Changes the rewards address. Any distributed rewards will cease flowing to the old address and begin flowing to this address once the change is in effect. This will not change any Strategy reports in progress, only new reports made after this change goes into effect. This may only be called by governance.

Arguments:

* `rewards`:  - *The address to use for collecting rewards.*

### setDepositLimit
>
> type: `nonpayable function`
> gas: `37738`

Changes the maximum amount of tokens that can be deposited in this Vault. Note, this is not how much may be deposited by a single depositor, but the maximum amount that may be deposited across all depositors. This may only be called by governance.

Arguments:

* `limit`:  - *The new deposit limit to use.*

### setPerformanceFee
>
> type: `nonpayable function`
> gas: `37872`

Used to change the value of `performanceFee`. Should set this value below the maximum strategist performance fee. This may only be called by governance.

Arguments:

* `fee`:  - *The new performance fee to use.*

### setManagementFee
>
> type: `nonpayable function`
> gas: `37902`

Used to change the value of `managementFee`. This may only be called by governance.

Arguments:

* `fee`:  - *The new management fee to use.*

### setGuardian
>
> type: `nonpayable function`
> gas: `39146`

Used to change the address of `guardian`. This may only be called by governance or the existing guardian.

Arguments:

* `guardian`:  - *The new guardian address to use.*

### setEmergencyShutdown
>
> type: `nonpayable function`
> gas: `39217`

Activates or deactivates Vault mode where all Strategies go into full withdrawal. During Emergency Shutdown: 1. No Users may deposit into the Vault (but may withdraw as usual.) 2. Governance may not add new Strategies. 3. Each Strategy must pay back their debt as quickly as reasonable to minimally affect their position. 4. Only Governance may undo Emergency Shutdown. See contract level note for further details. This may only be called by governance or the guardian.

Arguments:

* `active`:  - *If true, the Vault goes into Emergency Shutdown. If false, the Vault goes back into Normal Operation.*

### setWithdrawalQueue
>
> type: `nonpayable function`
> gas: `763893`

Updates the withdrawalQueue to match the addresses and order specified by `queue`. There can be fewer strategies than the maximum, as well as fewer than the total number of strategies active in the vault. `withdrawalQueue` will be updated in a gas-efficient manner, assuming the input is well- ordered with 0x0 only at the end. This may only be called by governance or management.

*This is order sensitive, specify the addresses in the order in which funds should be withdrawn (so `queue`[0] is the first Strategy withdrawn from, `queue`[1] is the second, etc.) This means that the least impactful Strategy (the Strategy that will have its core positions impacted the least by having funds removed) should be at `queue`[0], then the next least impactful at `queue`[1], and so on.*

Arguments:

* `queue`:  - *The array of addresses to use as the new withdrawal queue. This is order sensitive.*

### transfer
>
> type: `nonpayable function`
> gas: `76733`

Transfers shares from the caller&#39;s address to `receiver`. This function will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0.

Arguments:

* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*

* `amount`:  - *The quantity of shares to transfer.*

Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.

### transferFrom
>
> type: `nonpayable function`
> gas: `116496`

Transfers `amount` shares from `sender` to `receiver`. This operation will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0. Unless the caller has given this contract unlimited approval, transfering shares will decrement the caller&#39;s `allowance` by `amount`.

Arguments:

* `sender`:  - *The address shares are being transferred from.*

* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*

* `amount`:  - *The quantity of shares to transfer.*

Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.

### approve
>
> type: `nonpayable function`
> gas: `38244`

*Approve the passed address to spend the specified amount of tokens on behalf of `msg.sender`. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to be spent.*

### increaseAllowance
>
> type: `nonpayable function`
> gas: `40285`

*Increase the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to increase the allowance by.*

### decreaseAllowance
>
> type: `nonpayable function`
> gas: `40309`

*Decrease the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to decrease the allowance by.*

### permit
>
> type: `nonpayable function`
> gas: `81237`

Approves spender by owner&#39;s signature to expend owner&#39;s tokens. See https://eips.ethereum.org/EIPS/eip-2612.

Arguments:

* `owner`:  - *The address which is a source of funds and has signed the Permit.*

* `spender`:  - *The address which is allowed to spend the funds.*

* `amount`:  - *The amount of tokens to be spent.*

* `expiry`:  - *The timestamp after which the Permit is no longer valid.*

* `signature`:  - *A valid secp256k1 signature of Permit by owner encoded as r, s, v.*

Returns:

* `_0` - True, if transaction completes successfully

### totalAssets
>
> type: `view function`
> gas: `4123`

Returns the total quantity of all assets under control of this Vault, whether they&#39;re loaned out to a Strategy, or currently held in the Vault.

Returns:

* `_0` - The total assets under control of this Vault.

### deposit
>
> type: `nonpayable function`
>

Deposits `_amount` `token`, issuing shares to `recipient`. If the Vault is in Emergency Shutdown, deposits will not be accepted and this call will fail.

*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*

Arguments:

* `_amount`:  - *The quantity of tokens to deposit, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

Returns:

* `_0` - The issued Vault shares.

### deposit
>
> type: `nonpayable function`
>

*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*

Arguments:

* `_amount`:  - *The quantity of tokens to deposit, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

Returns:

* `_0` - The issued Vault shares.

### deposit
>
> type: `nonpayable function`
>

*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*

Arguments:

* `_amount`:  - *The quantity of tokens to deposit, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

Returns:

* `_0` - The issued Vault shares.

### maxAvailableShares
>
> type: `view function`
> gas: `364171`

Determines the total quantity of shares this Vault can provide, factoring in assets currently residing in the Vault, as well as those deployed to strategies.

*Regarding how shares are calculated, see dev note on `deposit`. If you want to calculated the maximum a user could withdraw up to, you want to use this function.*

Returns:

* `_0` - The total quantity of shares this Vault can provide.

### withdraw
>
> type: `nonpayable function`
>

Withdraws the calling account&#39;s tokens from this Vault, redeeming amount `_shares` for an appropriate amount of tokens. See note on `setWithdrawalQueue` for further details of withdrawal ordering and behavior.

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0%.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0%.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0%.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0%.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### pricePerShare
>
> type: `view function`
> gas: `12412`

Gives the price for a single Vault share.

*See dev note on `withdraw`.*

Returns:

* `_0` - The value of a single share.

### addStrategy
>
> type: `nonpayable function`
> gas: `1450351`

Add a Strategy to the Vault. This may only be called by governance.

*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*

Arguments:

* `strategy`:  - *The address of the Strategy to add.*

* `debtRatio`:  - *The ratio of the total assets in the `vault that the`strategy` can manage.*

* `rateLimit`:  - *Limit on the increase of debt per unit time since last harvest*

* `performanceFee`:  - *The fee the strategist will receive based on this Vault's performance.*

### updateStrategyDebtRatio
>
> type: `nonpayable function`
> gas: `115316`

Change the quantity of assets `strategy` may manage. This may be called by governance or management.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `debtRatio`:  - *The quantity of assets `strategy` may now manage.*

### updateStrategyRateLimit
>
> type: `nonpayable function`
> gas: `41467`

Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `rateLimit`:  - *Limit on the increase of debt per unit time since last harvest*

### updateStrategyPerformanceFee
>
> type: `nonpayable function`
> gas: `41344`

Change the fee the strategist will receive based on this Vault&#39;s performance. This may only be called by governance.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `performanceFee`:  - *The new fee the strategist will receive.*

### migrateStrategy
>
> type: `nonpayable function`
> gas: `1105801`

Migrates a Strategy, including all assets from `oldVersion` to `newVersion`. This may only be called by governance.

*Strategy must successfully migrate all capital and positions to new Strategy, or else this will upset the balance of the Vault. The new Strategy should be &#34;empty&#34; e.g. have no prior commitments to this Vault, otherwise it could have issues.*

Arguments:

* `oldVersion`:  - *The existing Strategy to migrate from.*

* `newVersion`:  - *The new Strategy to migrate to.*

### revokeStrategy
>
> type: `nonpayable function`
>

Revoke a Strategy, setting its debt limit to 0 and preventing any future deposits. This function should only be used in the scenario where the Strategy is being retired but no migration of the positions are possible, or in the extreme scenario that the Strategy needs to be put into &#34;Emergency Exit&#34; mode in order for it to exit as quickly as possible. The latter scenario could be for any reason that is considered &#34;critical&#34; that the Strategy exits its position as fast as possible, such as a sudden change in market conditions leading to losses, or an imminent failure in an external dependency. This may only be called by governance, the guardian, or the Strategy itself. Note that a Strategy will only revoke itself during emergency shutdown.

Arguments:

* `strategy`:  - *The Strategy to revoke.*

### revokeStrategy
>
> type: `nonpayable function`
>

Arguments:

* `strategy`:  - *The Strategy to revoke.*

### addStrategyToQueue
>
> type: `nonpayable function`
> gas: `1196920`

Adds `strategy` to `withdrawalQueue`. This may only be called by governance or management.

*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*

Arguments:

* `strategy`:  - *The Strategy to add.*

### removeStrategyFromQueue
>
> type: `nonpayable function`
> gas: `23091666`

Remove `strategy` from `withdrawalQueue`. This may only be called by governance or management.

*We don&#39;t do this with revokeStrategy because it should still be possible to withdraw from the Strategy if it&#39;s unwinding.*

Arguments:

* `strategy`:  - *The Strategy to remove.*

### debtOutstanding
>
> type: `view function`
>

Determines if `strategy` is past its debt limit and if any tokens should be withdrawn to the Vault.

Arguments:

* `strategy`:  - *The Strategy to check. Defaults to the caller.*

Returns:

* `_0` - The quantity of tokens to withdraw.

### debtOutstanding
>
> type: `view function`
>

Arguments:

* `strategy`:  - *The Strategy to check. Defaults to the caller.*

Returns:

* `_0` - The quantity of tokens to withdraw.

### creditAvailable
>
> type: `view function`
>

Amount of tokens in Vault a Strategy has access to as a credit line. This will check the Strategy&#39;s debt limit, as well as the tokens available in the Vault, and determine the maximum amount of tokens (if any) the Strategy may draw on. In the rare case the Vault is in emergency shutdown this will return 0.

Arguments:

* `strategy`:  - *The Strategy to check. Defaults to caller.*

Returns:

* `_0` - The quantity of tokens available for the Strategy to draw on.

### creditAvailable
>
> type: `view function`
>

Arguments:

* `strategy`:  - *The Strategy to check. Defaults to caller.*

Returns:

* `_0` - The quantity of tokens available for the Strategy to draw on.

### expectedReturn
>
> type: `view function`
>

Provide an accurate expected value for the return this `strategy` would provide to the Vault the next time `report()` is called (since the last time it was called).

Arguments:

* `strategy`:  - *The Strategy to determine the expected return for. Defaults to caller.*

Returns:

* `_0` - The anticipated amount `strategy` should make on its investment since its last report.

### expectedReturn
>
> type: `view function`
>

Arguments:

* `strategy`:  - *The Strategy to determine the expected return for. Defaults to caller.*

Returns:

* `_0` - The anticipated amount `strategy` should make on its investment since its last report.

### report
>
> type: `nonpayable function`
> gas: `937520`

Reports the amount of assets the calling Strategy has free (usually in terms of ROI). The performance fee is determined here, off of the strategy&#39;s profits (if any), and sent to governance. The strategist&#39;s fee is also determined here (off of profits), to be handled according to the strategist on the next harvest. This may only be called by a Strategy managed by this Vault.

*For approved strategies, this is the most efficient behavior. The Strategy reports back what it has free, then Vault &#34;decides&#34; whether to take some back or give it more. Note that the most it can take is `gain + _debtPayment`, and the most it can give is all of the remaining reserves. Anything outside of those bounds is abnormal behavior. All approved strategies must have increased diligence around calling this function, as abnormal behavior could become catastrophic.*

Arguments:

* `gain`:  - *Amount Strategy has realized as a gain on it's investment since its last report, and is free to be given back to Vault as earnings*

* `loss`:  - *Amount Strategy has realized as a loss on it's investment since its last report, and should be accounted for on the Vault's balance sheet*

* `_debtPayment`:  - *Amount Strategy has made available to cover outstanding debt*

Returns:

* `_0` - Amount of debt outstanding (if totalDebt > debtLimit or emergency shutdown).

### sweep
>
> type: `nonpayable function`
>

Removes tokens from this Vault that are not the type of token managed by this Vault. This may be used in case of accidentally sending the wrong kind of token to this Vault. Tokens will be sent to `governance`. This will fail if an attempt is made to sweep the tokens that this Vault manages. This may only be called by governance.

Arguments:

* `token`:  - *The token to transfer out of this vault.*

* `amount`:  - *The quantity or tokenId to transfer out.*

### sweep
>
> type: `nonpayable function`
>

Arguments:

* `token`:  - *The token to transfer out of this vault.*

* `amount`:  - *The quantity or tokenId to transfer out.*

## ABI

```json
[
  {
    "name": "Transfer",
    "inputs": [
      {
        "type": "address",
        "name": "sender",
        "indexed": true
      },
      {
        "type": "address",
        "name": "receiver",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "value",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Approval",
    "inputs": [
      {
        "type": "address",
        "name": "owner",
        "indexed": true
      },
      {
        "type": "address",
        "name": "spender",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "value",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyAdded",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "debtRatio",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "rateLimit",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "performanceFee",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyReported",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "gain",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "loss",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "totalGain",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "totalLoss",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "totalDebt",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "debtAdded",
        "indexed": false
      },
      {
        "type": "uint256",
        "name": "debtRatio",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateGovernance",
    "inputs": [
      {
        "type": "address",
        "name": "governance",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateManagement",
    "inputs": [
      {
        "type": "address",
        "name": "management",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateGuestList",
    "inputs": [
      {
        "type": "address",
        "name": "guestList",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateRewards",
    "inputs": [
      {
        "type": "address",
        "name": "rewards",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateDepositLimit",
    "inputs": [
      {
        "type": "uint256",
        "name": "depositLimit",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdatePerformanceFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "performanceFee",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateManagementFee",
    "inputs": [
      {
        "type": "uint256",
        "name": "managementFee",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateGuardian",
    "inputs": [
      {
        "type": "address",
        "name": "guardian",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "EmergencyShutdown",
    "inputs": [
      {
        "type": "bool",
        "name": "active",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateWithdrawalQueue",
    "inputs": [
      {
        "type": "address[20]",
        "name": "queue",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyUpdateDebtRatio",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "debtRatio",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyUpdateRateLimit",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "rateLimit",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyUpdatePerformanceFee",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      },
      {
        "type": "uint256",
        "name": "performanceFee",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyMigrated",
    "inputs": [
      {
        "type": "address",
        "name": "oldVersion",
        "indexed": true
      },
      {
        "type": "address",
        "name": "newVersion",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyRevoked",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyRemovedFromQueue",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyAddedToQueue",
    "inputs": [
      {
        "type": "address",
        "name": "strategy",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "initialize",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      },
      {
        "type": "address",
        "name": "governance"
      },
      {
        "type": "address",
        "name": "rewards"
      },
      {
        "type": "string",
        "name": "nameOverride"
      },
      {
        "type": "string",
        "name": "symbolOverride"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "initialize",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      },
      {
        "type": "address",
        "name": "governance"
      },
      {
        "type": "address",
        "name": "rewards"
      },
      {
        "type": "string",
        "name": "nameOverride"
      },
      {
        "type": "string",
        "name": "symbolOverride"
      },
      {
        "type": "address",
        "name": "guardian"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "apiVersion",
    "outputs": [
      {
        "type": "string",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "pure",
    "type": "function",
    "gas": 4519
  },
  {
    "name": "setName",
    "outputs": [],
    "inputs": [
      {
        "type": "string",
        "name": "name"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 107017
  },
  {
    "name": "setSymbol",
    "outputs": [],
    "inputs": [
      {
        "type": "string",
        "name": "symbol"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 71867
  },
  {
    "name": "setGovernance",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "governance"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 36338
  },
  {
    "name": "acceptGovernance",
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37610
  },
  {
    "name": "setManagement",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "management"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37748
  },
  {
    "name": "setGuestList",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "guestList"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37778
  },
  {
    "name": "setRewards",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "rewards"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37808
  },
  {
    "name": "setDepositLimit",
    "outputs": [],
    "inputs": [
      {
        "type": "uint256",
        "name": "limit"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37738
  },
  {
    "name": "setPerformanceFee",
    "outputs": [],
    "inputs": [
      {
        "type": "uint256",
        "name": "fee"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37872
  },
  {
    "name": "setManagementFee",
    "outputs": [],
    "inputs": [
      {
        "type": "uint256",
        "name": "fee"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 37902
  },
  {
    "name": "setGuardian",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "guardian"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 39146
  },
  {
    "name": "setEmergencyShutdown",
    "outputs": [],
    "inputs": [
      {
        "type": "bool",
        "name": "active"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 39217
  },
  {
    "name": "setWithdrawalQueue",
    "outputs": [],
    "inputs": [
      {
        "type": "address[20]",
        "name": "queue"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 763893
  },
  {
    "name": "transfer",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "receiver"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 76733
  },
  {
    "name": "transferFrom",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "sender"
      },
      {
        "type": "address",
        "name": "receiver"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 116496
  },
  {
    "name": "approve",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "spender"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 38244
  },
  {
    "name": "increaseAllowance",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "spender"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 40285
  },
  {
    "name": "decreaseAllowance",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "spender"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 40309
  },
  {
    "name": "permit",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "owner"
      },
      {
        "type": "address",
        "name": "spender"
      },
      {
        "type": "uint256",
        "name": "amount"
      },
      {
        "type": "uint256",
        "name": "expiry"
      },
      {
        "type": "bytes",
        "name": "signature"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 81237
  },
  {
    "name": "totalAssets",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 4123
  },
  {
    "name": "deposit",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "deposit",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "_amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "deposit",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "_amount"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "maxAvailableShares",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 364171
  },
  {
    "name": "withdraw",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "withdraw",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "maxShares"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "withdraw",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "maxShares"
      },
      {
        "type": "address",
        "name": "recipient"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "withdraw",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "maxShares"
      },
      {
        "type": "address",
        "name": "recipient"
      },
      {
        "type": "uint256",
        "name": "maxLoss"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "pricePerShare",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 12412
  },
  {
    "name": "addStrategy",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      },
      {
        "type": "uint256",
        "name": "debtRatio"
      },
      {
        "type": "uint256",
        "name": "rateLimit"
      },
      {
        "type": "uint256",
        "name": "performanceFee"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1450351
  },
  {
    "name": "updateStrategyDebtRatio",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      },
      {
        "type": "uint256",
        "name": "debtRatio"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 115316
  },
  {
    "name": "updateStrategyRateLimit",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      },
      {
        "type": "uint256",
        "name": "rateLimit"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 41467
  },
  {
    "name": "updateStrategyPerformanceFee",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      },
      {
        "type": "uint256",
        "name": "performanceFee"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 41344
  },
  {
    "name": "migrateStrategy",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "oldVersion"
      },
      {
        "type": "address",
        "name": "newVersion"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1105801
  },
  {
    "name": "revokeStrategy",
    "outputs": [],
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "revokeStrategy",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "addStrategyToQueue",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 1196920
  },
  {
    "name": "removeStrategyFromQueue",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 23091666
  },
  {
    "name": "debtOutstanding",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "debtOutstanding",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "creditAvailable",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "creditAvailable",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "availableDepositLimit",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 9808
  },
  {
    "name": "expectedReturn",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "expectedReturn",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "strategy"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "name": "report",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "gain"
      },
      {
        "type": "uint256",
        "name": "loss"
      },
      {
        "type": "uint256",
        "name": "_debtPayment"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function",
    "gas": 937520
  },
  {
    "name": "sweep",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "sweep",
    "outputs": [],
    "inputs": [
      {
        "type": "address",
        "name": "token"
      },
      {
        "type": "uint256",
        "name": "amount"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "name": "name",
    "outputs": [
      {
        "type": "string",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 9053
  },
  {
    "name": "symbol",
    "outputs": [
      {
        "type": "string",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 8106
  },
  {
    "name": "decimals",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2711
  },
  {
    "name": "balanceOf",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 2956
  },
  {
    "name": "allowance",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      },
      {
        "type": "address",
        "name": "arg1"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 3201
  },
  {
    "name": "totalSupply",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2801
  },
  {
    "name": "token",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2831
  },
  {
    "name": "governance",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2861
  },
  {
    "name": "management",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2891
  },
  {
    "name": "guardian",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2921
  },
  {
    "name": "guestList",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 2951
  },
  {
    "name": "strategies",
    "outputs": [
      {
        "type": "uint256",
        "name": "performanceFee"
      },
      {
        "type": "uint256",
        "name": "activation"
      },
      {
        "type": "uint256",
        "name": "debtRatio"
      },
      {
        "type": "uint256",
        "name": "rateLimit"
      },
      {
        "type": "uint256",
        "name": "lastReport"
      },
      {
        "type": "uint256",
        "name": "totalDebt"
      },
      {
        "type": "uint256",
        "name": "totalGain"
      },
      {
        "type": "uint256",
        "name": "totalLoss"
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 10322
  },
  {
    "name": "withdrawalQueue",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "uint256",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 3120
  },
  {
    "name": "emergencyShutdown",
    "outputs": [
      {
        "type": "bool",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3041
  },
  {
    "name": "depositLimit",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3071
  },
  {
    "name": "debtRatio",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3101
  },
  {
    "name": "totalDebt",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3131
  },
  {
    "name": "lastReport",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3161
  },
  {
    "name": "activation",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3191
  },
  {
    "name": "rewards",
    "outputs": [
      {
        "type": "address",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3221
  },
  {
    "name": "managementFee",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3251
  },
  {
    "name": "performanceFee",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3281
  },
  {
    "name": "nonces",
    "outputs": [
      {
        "type": "uint256",
        "name": ""
      }
    ],
    "inputs": [
      {
        "type": "address",
        "name": "arg0"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "gas": 3526
  },
  {
    "name": "DOMAIN_SEPARATOR",
    "outputs": [
      {
        "type": "bytes32",
        "name": ""
      }
    ],
    "inputs": [],
    "stateMutability": "view",
    "type": "function",
    "gas": 3341
  }
]
```

## Byte code

```bin
0x614c0c56341561000a57600080fd5b600436101561001857614c02565b600035601c526383b43589600051141561003657336102205261006c565b63a5b81fdf60005114156100645760a43560a01c1561005457600080fd5b602060a46102203760005061006c565b6000156106a5575b60043560a01c1561007c57600080fd5b60243560a01c1561008c57600080fd5b60443560a01c1561009c57600080fd5b60606064356004016101403760406064356004013511156100bc57600080fd5b60406084356004016101c03760206084356004013511156100dc57600080fd5b601354156100e957600080fd5b6004356006556000610280526102808051602082012090506101408051602082012090501415610230576000606061032060046395d89b416102c0526102dc6004355afa61013657600080fd5b603f3d1161014357600080fd5b60156103206103205101511061015857600080fd5b6000506103406014806020846103e001018260208501600060045af15050805182019150506007610380527f20795661756c74000000000000000000000000000000000000000000000000006103a0526103806007806020846103e001018260208501600060045af1505080518201915050806103e0526103e0905080600060c052602060c020602082510161012060006002818352015b8261012051602002111561020357610225565b61012051602002850151610120518501555b81516001018083528114156101f0575b50505050505061028b565b61014080600060c052602060c020602082510161012060006003818352015b8261012051602002111561026257610284565b61012051602002850151610120518501555b815160010180835281141561024f575b5050505050505b6000610280526102808051602082012090506101c080516020820120905014156103cc57600060026102c0527f79760000000000000000000000000000000000000000000000000000000000006102e0526102c06002806020846103e001018260208501600060045af1505080518201915050606061038060046395d89b416103205261033c6004355afa61031f57600080fd5b603f3d1161032c57600080fd5b60156103806103805101511061034157600080fd5b6000506103a06014806020846103e001018260208501600060045af1505080518201915050806103e0526103e0905080600160c052602060c020602082510161012060006002818352015b8261012051602002111561039f576103c1565b61012051602002850151610120518501555b815160010180835281141561038c575b505050505050610427565b6101c080600160c052602060c020602082510161012060006002818352015b826101205160200211156103fe57610420565b61012051602002850151610120518501555b81516001018083528114156103eb575b5050505050505b60206102a0600463313ce5676102405261025c6004355afa61044857600080fd5b601f3d1161045557600080fd5b6000506102a051600255602435600755602435610240527f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b876020610240a1602435600855602435610240527fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef4386020610240a1604435601455604435610240527fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d6020610240a16102205160095561022051610240527f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c6020610240a16103e86016556103e86102405261024051610260527f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb6020610260a160c860155560c86102405261024051610260527f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf6020610260a1426012554260135560007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f602082610620010152602081019050600b610500527f596561726e205661756c740000000000000000000000000000000000000000006105205261050080516020820120905060208261062001015260208101905060056105c0527f302e332e300000000000000000000000000000000000000000000000000000006105e0526105c0805160208201209050602082610620010152602081019050466020826106200101526020810190503060208261062001015260208101905080610620526106209050805160208201209050601855005b6325829410600051141561073e576005610140527f302e332e30000000000000000000000000000000000000000000000000000000610160526101408051602001806101e08284600060045af16106fb57600080fd5b50506101e0518061020001818260206001820306601f820103905003368237505060206101c05260406101e0510160206001820306601f82010390506101c0f350005b63c47f002760005114156107d657604a60043560040161014037602a60043560040135111561076c57600080fd5b600754331461077a57600080fd5b61014080600060c052602060c020602082510161012060006003818352015b826101205160200211156107ac576107ce565b61012051602002850151610120518501555b8151600101808352811415610799575b505050505050005b63b84c8246600051141561086e57603460043560040161014037601460043560040135111561080457600080fd5b600754331461081257600080fd5b61014080600160c052602060c020602082510161012060006002818352015b8261012051602002111561084457610866565b61012051602002850151610120518501555b8151600101808352811415610831575b505050505050005b63ab033ea960005114156108a25760043560a01c1561088c57600080fd5b600754331461089a57600080fd5b600435600a55005b63238efcbc60005114156108f057600a5433146108be57600080fd5b3360075533610140527f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b876020610140a1005b63d4a22bde60005114156109525760043560a01c1561090e57600080fd5b600754331461091c57600080fd5b600435600855600435610140527fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef4386020610140a1005b630b5b78eb60005114156109b45760043560a01c1561097057600080fd5b600754331461097e57600080fd5b600435600b55600435610140527f6d674c311329fb38bbc96dc33d2aad03b9bf9fcfdd8f5e5054fda291a5b3c1f86020610140a1005b63ec38a8626000511415610a165760043560a01c156109d257600080fd5b60075433146109e057600080fd5b600435601455600435610140527fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d6020610140a1005b63bdc8144b6000511415610a68576007543314610a3257600080fd5b600435600f55600435610140527fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd626020610140a1005b6370897b236000511415610acb576007543314610a8457600080fd5b6127106004351115610a9557600080fd5b600435601655600435610140527f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb6020610140a1005b63fe56e2326000511415610b2e576007543314610ae757600080fd5b6127106004351115610af857600080fd5b600435601555600435610140527f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf6020610140a1005b638a0dac4a6000511415610be25760043560a01c15610b4c57600080fd5b600954610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610b8b5760018352610b9c565b5b8151600101808352811415610b6f575b50505061014051610bac57600080fd5b600435600955600435610140527f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c6020610140a1005b6314c644026000511415610cb25760043560011c15610c0057600080fd5b60043515610c6d57600954610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610c475760018352610c58565b5b8151600101808352811415610c2b575b50505061014051610c6857600080fd5b610c7c565b6007543314610c7b57600080fd5b5b600435600e55600435610140527fba40372a3a724dca3c57156128ef1e896724b65b37a17f190b1ad5de68f3a4f36020610140a1005b63941484156000511415610efa576000610120525b610120516004013560a01c15610cdc57600080fd5b6020610120510161012052610280610120511015610cf957610cc7565b600854610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610d385760018352610d49565b5b8151600101808352811415610d1c575b50505061014051610d5957600080fd5b61014060006014818352015b60046101405160148110610d7857600080fd5b60200201351515610da6576101405160148110610d9457600080fd5b600d60c052602060c020015415610da9565b60005b15610db357610e36565b60006001600c60046101405160148110610dcc57600080fd5b602002013560e05260c052604060c02060c052602060c020015411610df057600080fd5b60046101405160148110610e0357600080fd5b60200201356101405160148110610e1957600080fd5b600d60c052602060c02001555b8151600101808352811415610d65575b50506004356101405260243561016052604435610180526064356101a0526084356101c05260a4356101e05260c4356102005260e43561022052610104356102405261012435610260526101443561028052610164356102a052610184356102c0526101a4356102e0526101c435610300526101e43561032052610204356103405261022435610360526102443561038052610264356103a0527f695ac3ac73f08f2002284ffe563cefe798ee2878a5e04219522e2e99eb89d168610280610140a1005b60001561100e575b6101a052610140526101605261018052306101e05260006102005260006101c0526101c061012060006002818352015b610120516020026101e00151610160511415610f515760018352610f62565b5b8151600101808352811415610f32575b5050506101c05115610f7357600080fd5b60036101405160e05260c052604060c02080546101805180821015610f9757600080fd5b8082039050905081555060036101605160e05260c052604060c020805461018051818183011015610fc757600080fd5b80820190509050815550610180516101c05261016051610140517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101c0a36101a051565b63a9059cbb60005114156110645760043560a01c1561102c57600080fd5b3361014052600435610160526024356101805261018051610160516101405160065801610f02565b600050600160005260206000f350005b6323b872dd600051141561119d5760043560a01c1561108257600080fd5b60243560a01c1561109257600080fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460043560e05260c052604060c0203360e05260c052604060c02054101561116357600460043560e05260c052604060c0203360e05260c052604060c020546044358082101561110357600080fd5b808203905090506101405261014051600460043560e05260c052604060c0203360e05260c052604060c020556101405161016052336004357f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610160a35b60043561014052602435610160526044356101805261018051610160516101405160065801610f02565b600050600160005260206000f350005b63095ea7b3600051141561121a5760043560a01c156111bb57600080fd5b60243560043360e05260c052604060c02060043560e05260c052604060c0205560243561014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f350005b633950935160005114156112cb5760043560a01c1561123857600080fd5b60043360e05260c052604060c02060043560e05260c052604060c020805460243581818301101561126857600080fd5b8082019050905081555060043360e05260c052604060c02060043560e05260c052604060c0205461014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f350005b63a457c2d7600051141561137a5760043560a01c156112e957600080fd5b60043360e05260c052604060c02060043560e05260c052604060c02080546024358082101561131757600080fd5b8082039050905081555060043360e05260c052604060c02060043560e05260c052604060c0205461014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f350005b639fd5a6cf600051141561177c5760043560a01c1561139857600080fd5b60243560a01c156113a857600080fd5b60616084356004016101403760416084356004013511156113c857600080fd5b6000600435186113d757600080fd5b60643515156113e75760016113ee565b4260643510155b5b6113f857600080fd5b601760043560e05260c052604060c020546101e05260006002610520527f19010000000000000000000000000000000000000000000000000000000000006105405261052060028060208461078001018260208501600060045af150508051820191505060185460208261078001015260208101905060007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c96020826106800101526020810190506004356020826106800101526020810190506024356020826106800101526020810190506044356020826106800101526020810190506101e05160208261068001015260208101905060643560208261068001015260208101905080610680526106809050805160208201209050602082610780010152602081019050806107805261078090508051602082012090506102005260006020602082066103000161014051828401111561155257600080fd5b6041806103208260206020880688030161014001600060045af150508181528090509050905080602001516000825180602090131561159057600080fd5b809190121561159e57600080fd5b806020036101000a8204905090509050610220526020602060208206610320016101405182840111156115d057600080fd5b6041806103408260206020880688030161014001600060045af150508181528090509050905080602001516000825180602090131561160e57600080fd5b809190121561161c57600080fd5b806020036101000a82049050905090506102405260406001602082066103400161014051828401111561164e57600080fd5b6041806103608260206020880688030161014001600060045af150508181528090509050905080602001516000825180602090131561168c57600080fd5b809190121561169a57600080fd5b806020036101000a8204905090509050610260526004356102005161028052610260516102a052610220516102c052610240516102e052602060c0608061028060015afa5060c051146116ec57600080fd5b604435600460043560e05260c052604060c02060243560e05260c052604060c020556101e051600181818301101561172357600080fd5b80820190509050601760043560e05260c052604060c02055604435610280526024356004357f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610280a3600160005260206000f350005b6000156117e9575b6101405260206101e060246370a0823161016052306101805261017c6006545afa6117ae57600080fd5b601f3d116117bb57600080fd5b6000506101e0516011548181830110156117d457600080fd5b80820190509050600052600051610140515650005b6301e1d11460005114156118135760065801611784565b610140526101405160005260206000f350005b600015611957575b61018052610140526101605260006101a0526005546101c05260006101c05111156118b657610160516101c051808202821582848304141761185c57600080fd5b809050905090506101405161016051610180516101a0516101c05160065801611784565b6101e0526101c0526101a0526101805261016052610140526101e05180806118a757600080fd5b8204905090506101a0526118bf565b610160516101a0525b6101c0516101a0518181830110156118d657600080fd5b8082019050905060055560036101405160e05260c052604060c02080546101a05181818301101561190657600080fd5b808201905090508155506101a0516101e0526101405160007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101e0a36101a051600052600051610180515650005b63d0e30db06000511415611994577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101405233610160526119f5565b63b6b55f2560005114156119b757336101605260206004610140376000506119f5565b636e553f6560005114156119ed57602060046101403760243560a01c156119dd57600080fd5b60206024610160376000506119f5565b600015611c33575b600e5415611a0257600080fd5b61014051610180527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610180511415611acc57600f5461014051610160516101805160065801611784565b6101a0526101805261016052610140526101a05180821015611a6e57600080fd5b80820390509050602061024060246370a082316101c052336101e0526101dc6006545afa611a9b57600080fd5b601f3d11611aa857600080fd5b6000506102405180821115611abd5780611abf565b815b9050905061018052611b1e565b600f5461014051610160516101805160065801611784565b6101a0526101805261016052610140526101a05161018051818183011015611b0b57600080fd5b808201905090501115611b1d57600080fd5b5b60006101805111611b2e57600080fd5b6000600b541815611b855760206102406044635ed7660e6101a052336101c052610180516101e0526101bc600b545afa611b6757600080fd5b601f3d11611b7457600080fd5b60005061024051611b8457600080fd5b5b6101405161016051610180516101a051610160516101c052610180516101e0526101e0516101c0516006580161181b565b610240526101a052610180526101605261014052610240516101a052602061028060646323b872dd6101c052336101e052306102005261018051610220526101dc60006006545af1611c0757600080fd5b601f3d11611c1457600080fd5b60005061028051611c2457600080fd5b6101a05160005260206000f350005b600015611ca5575b610160526101405261014051610140516101605160065801611784565b610180526101605261014052610180518082028215828483041417611c7c57600080fd5b809050905090506005548080611c9157600080fd5b820490509050600052600051610160515650005b600015611d5c575b61016052610140526000610140516101605160065801611784565b610180526101605261014052610180511115611d4b57610140516005548082028215828483041417611cf957600080fd5b8090509050905061014051610160516101805160065801611784565b6101a0526101805261016052610140526101a0518080611d3457600080fd5b820490509050600052600051610160515650611d5a565b60006000526000516101605156505b005b6375de29026000511415611ebe5760206101e060246370a0823161016052306101805261017c6006545afa611d9057600080fd5b601f3d11611d9d57600080fd5b6000506101e051610200526101405161016051610180516101a0516101c0516101e0516102005161020051610220526102205160065801611cad565b61028052610200526101e0526101c0526101a052610180526101605261014052610280516101405261018060006014818352015b61018051600d60c052602060c020015461016052610160511515611e3057611ead565b61014080516101405161016051610180516005600c6101605160e05260c052604060c02060c052602060c02001546101a0526101a05160065801611cad565b6102005261018052610160526101405261020051818183011015611e9257600080fd5b808201905090508152505b8151600101808352811415611e0d575b50506101405160005260206000f350005b633ccfd60b6000511415611f01577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610140523361016052600161018052611fab565b632e1a7d4d6000511415611f2a5733610160526001610180526020600461014037600050611fab565b62f714ce6000511415611f6557600161018052602060046101403760243560a01c15611f5557600080fd5b6020602461016037600050611fab565b63e63697c86000511415611fa357602060046101403760243560a01c15611f8b57600080fd5b60206024610160376020604461018037600050611fab565b600015612605575b62ffffff5415611fba57600080fd5b600162ffffff55610140516101a0527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101a05114156120085760033360e05260c052604060c020546101a0525b60033360e05260c052604060c020546101a051111561202657600080fd5b6101405161016051610180516101a0516101c0516101a0516101e0526101e05160065801611c3b565b610240526101c0526101a052610180526101605261014052610240516101c052602061026060246370a082316101e05230610200526101fc6006545afa61209557600080fd5b601f3d116120a257600080fd5b600050610260516101c0511115612428576000610280526102c060006014818352015b6102c051600d60c052602060c02001546102a0526102a05115156120e8576123cf565b602061036060246370a082316102e05230610300526102fc6006545afa61210e57600080fd5b601f3d1161211b57600080fd5b600050610360516101c051111515612132576123cf565b6101c051602061038060246370a0823161030052306103205261031c6006545afa61215c57600080fd5b601f3d1161216957600080fd5b600050610380518082101561217d57600080fd5b808203905090506102e0526102e0516005600c6102a05160e05260c052604060c02060c052602060c0200154808211156121b757806121b9565b815b905090506102e0526102e05115156121d0576123bf565b60206103a060246370a0823161032052306103405261033c6006545afa6121f657600080fd5b601f3d1161220357600080fd5b6000506103a0516103005260206103c06024632e1a7d4d610340526102e0516103605261035c60006102a0515af161223a57600080fd5b601f3d1161224757600080fd5b6000506103c0516103205260206103e060246370a0823161036052306103805261037c6006545afa61227857600080fd5b601f3d1161228557600080fd5b6000506103e051610300518082101561229d57600080fd5b80820390509050610340526000610320511115612332576101c0805161032051808210156122ca57600080fd5b808203905090508152506102808051610320518181830110156122ec57600080fd5b808201905090508152506007600c6102a05160e05260c052604060c02060c052602060c0200180546103205181818301101561232757600080fd5b808201905090508155505b6005600c6102a05160e05260c052604060c02060c052602060c020018054610340516103205181818301101561236757600080fd5b808201905090508082101561237b57600080fd5b808203905090508155506011805461034051610320518181830110156123a057600080fd5b80820190509050808210156123b457600080fd5b808203905090508155505b81516001018083528114156120c5575b5050610180516101c051610280518181830110156123ec57600080fd5b80820190509050808202821582848304141761240757600080fd5b809050905090506127108082049050905061028051111561242757600080fd5b5b602061026060246370a082316101e05230610200526101fc6006545afa61244e57600080fd5b601f3d1161245b57600080fd5b600050610260516101c051111561251c57602061030060246370a0823161028052306102a05261029c6006545afa61249257600080fd5b601f3d1161249f57600080fd5b600050610300516101c0526101405161016051610180516101a0516101c0516101e051610200516102205161024051610260516101c051610280526102805160065801611cad565b6102e052610260526102405261022052610200526101e0526101c0526101a0526101805261016052610140526102e0516101a0525b600580546101a0518082101561253157600080fd5b8082039050905081555060033360e05260c052604060c02080546101a0518082101561255c57600080fd5b808203905090508155506101a0516101e0526000337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101e0a36020610280604463a9059cbb6101e05261016051610200526101c051610220526101fc60006006545af16125cb57600080fd5b601f3d116125d857600080fd5b600050610280516125e857600080fd5b6101c051600052600062ffffff5560206000f350600062ffffff55005b6399530b06600051141561267957600554151561263f57604e6002541061262b57600080fd5b600254600a0a60005260206000f350612677565b604e6002541061264e57600080fd5b600254600a0a610140526101405160065801611c3b565b6101a0526101a05160005260206000f3505b005b600015612766575b6101405260006101605261018060006014818352015b61018051601481106126a857600080fd5b600d60c052602060c02001546101a0526101a05115156126e757610160805160018181830110156126d857600080fd5b8082019050905081525061274d565b600061016051111561274c576101a05161018051610160518082101561270c57600080fd5b808203905090506014811061272057600080fd5b600d60c052602060c02001556000610180516014811061273f57600080fd5b600d60c052602060c02001555b5b5b8151600101808352811415612697575b505061014051565b630dd21b6c600051141561298d5760043560a01c1561278457600080fd5b60006004351861279357600080fd5b600e54156127a057600080fd5b60075433146127ae57600080fd5b6127106010546024358181830110156127c657600080fd5b8082019050905011156127d857600080fd5b612710601654808210156127eb57600080fd5b80820390509050606435111561280057600080fd5b6001600c60043560e05260c052604060c02060c052602060c02001541561282657600080fd5b60206101a0600463fbfa77cf6101405261015c6004355afa61284757600080fd5b601f3d1161285457600080fd5b6000506101a051301461286657600080fd5b60206101a06004631f1fcd516101405261015c6004355afa61288757600080fd5b601f3d1161289457600080fd5b6000506101a051600654146128a857600080fd5b600c60043560e05260c052604060c02060c052602060c020606435815542600182015560243560028201556044356003820155426004820155600060058201556000600682015560006007820155506010805460243581818301101561290d57600080fd5b808201905090508155506024356101405260443561016052606435610180526004357f5ec27a4fa537fc86d0d17d84e0ee3172c9d253c78cc4ab5c69ee99c5f7084f516060610140a26013600d60c052602060c02001541561296e57600080fd5b6004356013600d60c052602060c020015560065801612681565b600050005b637c6a4f246000511415612aed5760043560a01c156129ab57600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156129ea57600183526129fb565b5b81516001018083528114156129ce575b50505061014051612a0b57600080fd5b60006001600c60043560e05260c052604060c02060c052602060c020015411612a3357600080fd5b601080546002600c60043560e05260c052604060c02060c052602060c020015480821015612a6057600080fd5b808203905090508155506024356002600c60043560e05260c052604060c02060c052602060c020015560108054602435818183011015612a9f57600080fd5b808201905090508155506127106010541115612aba57600080fd5b602435610140526004357fbda9398315c83ccef012bcaa318a2ff7b680f36429d36597bd4bc25ac11ead596020610140a2005b6362fdbc9f6000511415612be55760043560a01c15612b0b57600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415612b4a5760018352612b5b565b5b8151600101808352811415612b2e575b50505061014051612b6b57600080fd5b60006001600c60043560e05260c052604060c02060c052602060c020015411612b9357600080fd5b6024356003600c60043560e05260c052604060c02060c052602060c0200155602435610140526004357ffc0e145ae9ec0b117fcf52a2ac0fa309d2896e9ff19e6a789d1c20f425b243ea6020610140a2005b63d0194ed66000511415612cb05760043560a01c15612c0357600080fd5b6007543314612c1157600080fd5b61271060165480821015612c2457600080fd5b808203905090506024351115612c3957600080fd5b60006001600c60043560e05260c052604060c02060c052602060c020015411612c6157600080fd5b602435600c60043560e05260c052604060c02060c052602060c02055602435610140526004357fe57488a65fa53066d4c25bac90db47dda4e5de3025ac12bf76ff07211cf7f39e6020610140a2005b600015612d47575b6101605261014052601080546002600c6101405160e05260c052604060c02060c052602060c020015480821015612cee57600080fd5b8082039050905081555060006002600c6101405160e05260c052604060c02060c052602060c0200155610140517f4201c688d84c01154d321afa0c72f1bffe9eef53005c9de9d035074e71e9b32a60006000a261016051565b636cb56d1960005114156130385760043560a01c15612d6557600080fd5b60243560a01c15612d7557600080fd5b6007543314612d8357600080fd5b600060243518612d9257600080fd5b60006001600c60043560e05260c052604060c02060c052602060c020015411612dba57600080fd5b6001600c60243560e05260c052604060c02060c052602060c020015415612de057600080fd5b610140600c60043560e05260c052604060c0208060c052602060c02054825260018160c052602060c0200154826020015260028160c052602060c0200154826040015260038160c052602060c0200154826060015260048160c052602060c0200154826080015260058160c052602060c02001548260a0015260068160c052602060c02001548260c0015260078160c052602060c02001548260e0015250506101405161016051610180516101a0516101c0516101e0516102005161022051600435610240526102405160065801612cb8565b61022052610200526101e0526101c0526101a0526101805261016052610140526000506010805461018051818183011015612eed57600080fd5b8082019050905081555060006005600c60043560e05260c052604060c02060c052602060c0200155600c60243560e05260c052604060c02060c052602060c0206101405181554260018201556101805160028201556101a05160038201554260048201556101e05160058201556000600682015560006007820155506004353b612f7657600080fd5b60006000602463ce5494bb610240526024356102605261025c60006004355af1612f9f57600080fd5b6024356004357f100b69bb6b504e1252e36b375233158edee64d071b399e2f81473a695fd1b02160006000a361024060006014818352015b6004356102405160148110612feb57600080fd5b600d60c052602060c0200154141561302357602435610240516014811061301157600080fd5b600d60c052602060c020015560006000f35b5b8151600101808352811415612fd7575b5050005b63a0e4af9a6000511415613050573361014052613086565b63bb994d48600051141561307e5760043560a01c1561306e57600080fd5b6020600461014037600050613086565b600015613110575b61014051610180526007546101a0526009546101c05260006101605261016061012060006003818352015b6101205160200261018001513314156130cd57600183526130de565b5b81516001018083528114156130b1575b505050610160516130ee57600080fd5b6101405161014051610160526101605160065801612cb8565b61014052600050005b63f76e4caa60005114156132685760043560a01c1561312e57600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b61012051602002610160015133141561316d576001835261317e565b5b8151600101808352811415613151575b5050506101405161318e57600080fd5b60006001600c60043560e05260c052604060c02060c052602060c0200154116131b657600080fd5b6013600d60c052602060c0200154156131ce57600080fd5b61016060006014818352015b61016051600d60c052602060c02001546101405260043515156131fc5761321e565b600435610140511861320d57600080fd5b5b81516001018083528114156131da575b50506004356013600d60c052602060c020015560065801612681565b6000506004357fa8727d412c6fa1e2497d6d6f275e2d9fe4d9318d5b793632e60ad9d38ee8f1fa60006000a2005b63b22439f560005114156133945760043560a01c1561328657600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156132c557600183526132d6565b5b81516001018083528114156132a9575b505050610140516132e657600080fd5b61014060006014818352015b600435610140516014811061330657600080fd5b600d60c052602060c0200154141561337a576000610140516014811061332b57600080fd5b600d60c052602060c02001556101405160065801612681565b610140526000506004357f8e1ec3c16d6a67ea8effe2ac7adef9c2de0bc0dc47c49cdf18f6a8b0048085be60006000a260006000f35b5b81516001018083528114156132f2575b505060006000fd005b60001561349f575b61016052610140526002600c6101405160e05260c052604060c02060c052602060c020015461014051610160516101805160065801611784565b6101a0526101805261016052610140526101a05180820282158284830414176133fe57600080fd5b8090509050905061271080820490509050610180526005600c6101405160e05260c052604060c02060c052602060c02001546101a052600e5415613451576101a05160005260005161016051565061349d565b610180516101a05111151561347357600060005260005161016051565061349c565b6101a051610180518082101561348857600080fd5b808203905090506000526000516101605156505b5b005b63bf3759b560005114156134b75733610140526134ed565b63bdcf36bb60005114156134e55760043560a01c156134d557600080fd5b60206004610140376000506134ed565b60001561351d575b610140516101405161016052610160516006580161339c565b6101c052610140526101c05160005260206000f350005b6000156137c0575b6101605261014052600e54156135445760006000526000516101605156505b61014051610160516101805160065801611784565b6101a0526101805261016052610140526101a0516101805260105461018051808202821582848304141761358c57600080fd5b80905090509050612710808204905090506101a0526011546101c0526002600c6101405160e05260c052604060c02060c052602060c02001546101805180820282158284830414176135dd57600080fd5b80905090509050612710808204905090506101e0526005600c6101405160e05260c052604060c02060c052602060c0200154610200526003600c6101405160e05260c052604060c02060c052602060c0200154610220526004600c6101405160e05260c052604060c02060c052602060c020015461024052610200516101e05111151561366b576001613676565b6101c0516101a05111155b5b1561368b5760006000526000516101605156505b6101e05161020051808210156136a057600080fd5b8082039050905061026052610260516101a0516101c051808210156136c457600080fd5b80820390509050808211156136d957806136db565b815b90509050610260524261024051808210156136f557600080fd5b8082039050905061028052600061022051111561373057610280516102605161022051808061372357600080fd5b8204905090501015613733565b60005b15613760576102205161028051808202821582848304141761375457600080fd5b80905090509050610260525b61026051602061032060246370a082316102a052306102c0526102bc6006545afa61378a57600080fd5b601f3d1161379757600080fd5b60005061032051808211156137ac57806137ae565b815b90509050600052600051610160515650005b63112c1f9b60005114156137d857336101405261380e565b63d764801360005114156138065760043560a01c156137f657600080fd5b602060046101403760005061380e565b60001561383e575b6101405161014051610160526101605160065801613525565b6101c052610140526101c05160005260206000f350005b600015613931575b6101605261014052426004600c6101405160e05260c052604060c02060c052602060c02001548082101561387957600080fd5b80820390509050610180526000610180511115613920576006600c6101405160e05260c052604060c02060c052602060c02001546101805180820282158284830414176138c557600080fd5b80905090509050426001600c6101405160e05260c052604060c02060c052602060c0200154808210156138f757600080fd5b80820390509050808061390957600080fd5b82049050905060005260005161016051565061392f565b60006000526000516101605156505b005b63153c27c460005114156139a55760065801611784565b6101405261014051600f54111561399757600f546101405160065801611784565b6101605261014052610160518082101561398257600080fd5b8082039050905060005260206000f3506139a3565b600060005260206000f3505b005b63d3406abd60005114156139bd5733610140526139f3565b6333586b6760005114156139eb5760043560a01c156139db57600080fd5b60206004610140376000506139f3565b600015613a23575b6101405161014051610160526101605160065801613846565b6101c052610140526101c05160005260206000f350005b600015613bde575b6101805261014052610160526005600c6101405160e05260c052604060c02060c052602060c02001546101a052610160516101a0511015613a6b57600080fd5b6007600c6101405160e05260c052604060c02060c052602060c02001805461016051818183011015613a9c57600080fd5b808201905090508155506101a0516101605180821015613abb57600080fd5b808203905090506005600c6101405160e05260c052604060c02060c052602060c0200155601180546101605180821015613af457600080fd5b808203905090508155506002600c6101405160e05260c052604060c02060c052602060c02001546101c0526002600c6101405160e05260c052604060c02060c052602060c020018054610160516127108082028215828483041417613b5857600080fd5b809050905090506101405161016051610180516101a0516101c05160065801611784565b6101e0526101c0526101a0526101805261016052610140526101e0518080613ba357600080fd5b8204905090506101c05180821115613bbb5780613bbd565b815b9050905080821015613bce57600080fd5b8082039050905081555061018051565b600015613f06575b6101805261014052610160526101405161016051610180516101a05160065801611784565b6101c0526101a0526101805261016052610140526101c0514260125480821015613c3457600080fd5b808203905090508082028215828483041417613c4f57600080fd5b809050905090506015548082028215828483041417613c6d57600080fd5b80905090509050612710808204905090506301e187e0808204905090506101a05260006101c0526000610160511115613d325761016051600c6101405160e05260c052604060c02060c052602060c020548082028215828483041417613cd257600080fd5b80905090509050612710808204905090506101c0526101a08051610160516016548082028215828483041417613d0757600080fd5b8090509050905061271080820490509050818183011015613d2757600080fd5b808201905090508152505b6101a0516101c051818183011015613d4957600080fd5b808201905090506101e05260006101e0511115613f00576101405161016051610180516101a0516101c0516101e0516102005130610220526101e0516102405261024051610220516006580161181b565b6102a052610200526101e0526101c0526101a0526101805261016052610140526102a0516102005260006101c0511115613e78576101c051610200518082028215828483041417613dea57600080fd5b809050905090506101e0518080613e0057600080fd5b820490509050610220526101405161016051610180516101a0516101c0516101e051610200516102205130610240526101405161026052610220516102805261028051610260516102405160065801610f02565b61022052610200526101e0526101c0526101a0526101805261016052610140526000505b600060033060e05260c052604060c020541115613eff576101405161016051610180516101a0516101c0516101e0516102005130610220526014546102405260033060e05260c052604060c020546102605261026051610240516102205160065801610f02565b610200526101e0526101c0526101a0526101805261016052610140526000505b5b61018051565b63a1d9bafc60005114156143eb5760006001600c3360e05260c052604060c02060c052602060c020015411613f3a57600080fd5b600435604435818183011015613f4f57600080fd5b8082019050905060206101c060246370a0823161014052336101605261015c6006545afa613f7c57600080fd5b601f3d11613f8957600080fd5b6000506101c0511015613f9b57600080fd5b60006024351115613fc757336101405260243561016052610160516101405160065801613a2b565b6000505b336101405260043561016052610160516101405160065801613be6565b6000506006600c3360e05260c052604060c02060c052602060c02001805460043581818301101561401457600080fd5b80820190509050815550610140513361016052610160516006580161339c565b6101c052610140526101c051610140526044356101405180821115614059578061405b565b815b905090506101605260006101605111156140e5576005600c3360e05260c052604060c02060c052602060c020018054610160518082101561409b57600080fd5b808203905090508155506011805461016051808210156140ba57600080fd5b80820390509050815550610140805161016051808210156140da57600080fd5b808203905090508152505b610140516101605161018051336101a0526101a05160065801613525565b6102005261018052610160526101405261020051610180526000610180511115614181576005600c3360e05260c052604060c02060c052602060c0200180546101805181818301101561415557600080fd5b80820190509050815550601180546101805181818301101561417657600080fd5b808201905090508155505b6004356101605181818301101561419757600080fd5b808201905090506101a052610180516101a051101561421a576020610260604463a9059cbb6101c052336101e052610180516101a051808210156141da57600080fd5b80820390509050610200526101dc60006006545af16141f857600080fd5b601f3d1161420557600080fd5b6000506102605161421557600080fd5b614294565b610180516101a051111561429357602061028060646323b872dd6101c052336101e05230610200526101a051610180518082101561425757600080fd5b80820390509050610220526101dc60006006545af161427557600080fd5b601f3d1161428257600080fd5b6000506102805161429257600080fd5b5b5b426004600c3360e05260c052604060c02060c052602060c0200155426012556004356101c0526024356101e0526006600c3360e05260c052604060c02060c052602060c0200154610200526007600c3360e05260c052604060c02060c052602060c0200154610220526005600c3360e05260c052604060c02060c052602060c02001546102405261018051610260526002600c3360e05260c052604060c02060c052602060c020015461028052337f2fb611faf48b1d1b91edbba34cee10c6357adee410540e4a8f7a82b6b38673e460e06101c0a26002600c3360e05260c052604060c02060c052602060c02001541515614390576001614394565b600e545b5b156143db576020610220600463efbb5cb06101c0526101dc335afa6143b957600080fd5b601f3d116143c657600080fd5b6000506102205160005260206000f3506143e9565b6101405160005260206000f3505b005b60001561458e575b6101a05261014052610160526101805260006004610220527fa9059cbb000000000000000000000000000000000000000000000000000000006102405261022060048060208461028001018260208501600060045af15050805182019150506101605160208261028001015260208101905061018051602082610280010152602081019050806102805261028090508051602001806103208284600060045af161449c57600080fd5b505060206103e0610320516103406000610140515af16144bb57600080fd5b60203d808211156144cc57806144ce565b815b905090506103c0526103c08051602001806101c08284600060045af16144f357600080fd5b505060006101c0511115614588576101c080602001516000825180602090131561451c57600080fd5b809190121561452a57600080fd5b806020036101000a820490509050905015151515614587576308c379a0610220526020610240526010610260527f5472616e73666572206661696c656421000000000000000000000000000000006102805261026050606461023cfd5b5b6101a051565b6301681a6260005114156145c6577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610140526145ec565b636ea056a960005114156145e45760206024610140376000506145ec565b6000156146cc575b60043560a01c156145fc57600080fd5b600754331461460a57600080fd5b6006546004351861461a57600080fd5b61014051610160527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61016051141561468c57602061020060246370a0823161018052306101a05261019c6004355afa61467357600080fd5b601f3d1161468057600080fd5b60005061020051610160525b6101405161016051600435610180526007546101a052610160516101c0526101c0516101a05161018051600658016143f3565b6101605261014052600050005b6306fdde0360005114156147755760008060c052602060c020610180602082540161012060006003818352015b8261012051602002111561470c5761472e565b61012051850154610120516020028501525b81516001018083528114156146f9575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f350005b6395d89b41600051141561481e5760018060c052602060c020610180602082540161012060006002818352015b826101205160200211156147b5576147d7565b61012051850154610120516020028501525b81516001018083528114156147a2575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f350005b63313ce567600051141561483a5760025460005260206000f350005b6370a0823160005114156148745760043560a01c1561485857600080fd5b600360043560e05260c052604060c0205460005260206000f350005b63dd62ed3e60005114156148cc5760043560a01c1561489257600080fd5b60243560a01c156148a257600080fd5b600460043560e05260c052604060c02060243560e05260c052604060c0205460005260206000f350005b6318160ddd60005114156148e85760055460005260206000f350005b63fc0c546a60005114156149045760065460005260206000f350005b635aa6e67560005114156149205760075460005260206000f350005b6388a8d602600051141561493c5760085460005260206000f350005b63452a932060005114156149585760095460005260206000f350005b6346d55875600051141561497457600b5460005260206000f350005b6339ebf8236000511415614a7a5760043560a01c1561499257600080fd5b600c60043560e05260c052604060c0206101408080808460c052602060c0205481525050602081019050808060018560c052602060c020015481525050602081019050808060028560c052602060c020015481525050602081019050808060038560c052602060c020015481525050602081019050808060048560c052602060c020015481525050602081019050808060058560c052602060c020015481525050602081019050808060068560c052602060c020015481525050602081019050808060078560c052602060c0200154815250506101009050905060c05260c051610140f39050005b63c822adda6000511415614aaf5760043560148110614a9857600080fd5b600d60c052602060c020015460005260206000f350005b633403c2fc6000511415614acb57600e5460005260206000f350005b63ecf708586000511415614ae757600f5460005260206000f350005b63cea55f576000511415614b035760105460005260206000f350005b63fc7b9c186000511415614b1f5760115460005260206000f350005b63c3535b526000511415614b3b5760125460005260206000f350005b633629c8de6000511415614b575760135460005260206000f350005b639ec5a8946000511415614b735760145460005260206000f350005b63a6f7f5d66000511415614b8f5760155460005260206000f350005b63877887826000511415614bab5760165460005260206000f350005b637ecebe006000511415614be55760043560a01c15614bc957600080fd5b601760043560e05260c052604060c0205460005260206000f350005b633644e5156000511415614c015760185460005260206000f350005b5b60006000fd5b610004614c0c03610004600039610004614c0c036000f3
```
