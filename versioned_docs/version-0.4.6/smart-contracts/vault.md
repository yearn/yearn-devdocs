# Vault.vy
>
> vyper: `0.3.3`
> author: `yearn.fi`
> license: `GNU AGPLv3`

## Yearn Token Vault

*Yearn Token Vault. Holds an underlying token, and allows users to interact with the Yearn ecosystem through Strategies connected to the Vault. Vaults are not limited to a single Strategy, they can have as many Strategies as can be designed (however the withdrawal queue is capped at 20.) Deposited funds are moved into the most impactful strategy that has not already reached its limit for assets under management, regardless of which Strategy a user's funds end up in, they receive their portion of yields generated across all Strategies. When a user withdraws, if there are no funds sitting undeployed in the Vault, the Vault withdraws funds from Strategies in the order of least impact. (Funds are taken from the Strategy that will disturb everyone's gains the least, then the next least, etc.) In order to achieve this, the withdrawal queue's order must be properly set and managed by the community (through governance). Vault Strategies are parameterized to pursue the highest risk-adjusted yield. There is an "Emergency Shutdown" mode. When the Vault is put into emergency shutdown, assets will be recalled from the Strategies as quickly as is practical (given on-chain conditions), minimizing loss. Deposits are halted, new Strategies may not be added, and each Strategy exits with the minimum possible damage to position, while opening up deposits to be withdrawn by users. There are no restrictions on withdrawals above what is expected under Normal Operation. For further details, please refer to the specification: https://github.com/iearn-finance/yearn-vaults/blob/main/SPECIFICATION.md*

## Events

#### Transfer

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `value` : uint256, *notIndexed*

#### Approval

* `owner` : address, *indexed*
* `spender` : address, *indexed*
* `value` : uint256, *notIndexed*

#### Deposit

* `recipient` : address, *indexed*
* `shares` : uint256, *notIndexed*
* `amount` : uint256, *notIndexed*

#### Withdraw

* `recipient` : address, *indexed*
* `shares` : uint256, *notIndexed*
* `amount` : uint256, *notIndexed*

#### Sweep

* `token` : address, *indexed*
* `amount` : uint256, *notIndexed*

#### LockedProfitDegradationUpdated

* `value` : uint256, *notIndexed*

#### StrategyAdded

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*
* `minDebtPerHarvest` : uint256, *notIndexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*
* `performanceFee` : uint256, *notIndexed*

#### StrategyReported

* `strategy` : address, *indexed*
* `gain` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*
* `debtPaid` : uint256, *notIndexed*
* `totalGain` : uint256, *notIndexed*
* `totalLoss` : uint256, *notIndexed*
* `totalDebt` : uint256, *notIndexed*
* `debtAdded` : uint256, *notIndexed*
* `debtRatio` : uint256, *notIndexed*

#### FeeReport

* `management_fee` : uint256, *notIndexed*
* `performance_fee` : uint256, *notIndexed*
* `strategist_fee` : uint256, *notIndexed*
* `duration` : uint256, *notIndexed*

#### WithdrawFromStrategy

* `strategy` : address, *indexed*
* `totalDebt` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*

#### UpdateGovernance

* `governance` : address, *notIndexed*

#### UpdateManagement

* `management` : address, *notIndexed*

#### UpdateRewards

* `rewards` : address, *notIndexed*

#### UpdateDepositLimit

* `depositLimit` : uint256, *notIndexed*

#### UpdatePerformanceFee

* `performanceFee` : uint256, *notIndexed*

#### UpdateManagementFee

* `managementFee` : uint256, *notIndexed*

#### UpdateGuardian

* `guardian` : address, *notIndexed*

#### EmergencyShutdown

* `active` : bool, *notIndexed*

#### UpdateWithdrawalQueue

* `queue` : address[20], *notIndexed*

#### StrategyUpdateDebtRatio

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*

#### StrategyUpdateMinDebtPerHarvest

* `strategy` : address, *indexed*
* `minDebtPerHarvest` : uint256, *notIndexed*

#### StrategyUpdateMaxDebtPerHarvest

* `strategy` : address, *indexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*

#### StrategyUpdatePerformanceFee

* `strategy` : address, *indexed*
* `performanceFee` : uint256, *notIndexed*

#### StrategyMigrated

* `oldVersion` : address, *indexed*
* `newVersion` : address, *indexed*

#### StrategyRevoked

* `strategy` : address, *indexed*

#### StrategyRemovedFromQueue

* `strategy` : address, *indexed*

#### StrategyAddedToQueue

* `strategy` : address, *indexed*

#### NewPendingGovernance

* `pendingGovernance` : address, *indexed*

## Methods

### initialize
>
> type: `nonpayable function`
>

Initializes the Vault, this is called only once, when the contract is deployed. The performance fee is set to 10% of yield, per Strategy. The management fee is set to 2%, per year. The initial deposit limit is set to 0 (deposits disabled); it must be updated after initialization.

*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;yv&#39; combined with the symbol of `token`. The token used by the vault should not change balances outside transfers and it must transfer the exact amount requested. Fee on transfer and rebasing are not supported.*

Arguments:

* `token`:  - *The token that may be deposited into this Vault.*

* `governance`:  - *The address authorized for governance interactions.*

* `rewards`:  - *The address to distribute rewards to.*

* `management`:  - *The address of the vault manager.*

* `nameOverride`:  - *Specify a custom Vault name. Leave empty for default choice.*

* `symbolOverride`:  - *Specify a custom Vault symbol name. Leave empty for default choice.*

* `guardian`:  - *The address authorized for guardian interactions. Defaults to caller.*

### apiVersion
>
> type: `pure function`
>

Used to track the deployed version of this contract. In practice you can use this version number to compare with Yearn&#39;s GitHub and determine which version of the source matches this deployed contract.

*All strategies must have an `apiVersion()` that matches the Vault&#39;s `API_VERSION`.*

Returns:

* `_0` - API_VERSION which holds the current version of this contract.

### setName
>
> type: `nonpayable function`
>

Used to change the value of `name`. This may only be called by governance.

Arguments:

* `name`:  - *The new name to use.*

### setSymbol
>
> type: `nonpayable function`
>

Used to change the value of `symbol`. This may only be called by governance.

Arguments:

* `symbol`:  - *The new symbol to use.*

### setGovernance
>
> type: `nonpayable function`
>

Nominate a new address to use as governance. The change does not go into effect immediately. This function sets a pending change, and the governance address is not updated until the proposed governance address has accepted the responsibility. This may only be called by the current governance address.

Arguments:

* `governance`:  - *The address requested to take over Vault governance.*

### acceptGovernance
>
> type: `nonpayable function`
>

Once a new governance address has been proposed using setGovernance(), this function may be called by the proposed address to accept the responsibility of taking over governance for this contract. This may only be called by the proposed governance address.

*setGovernance() should be called by the existing governance address, prior to calling this function.*

### setManagement
>
> type: `nonpayable function`
>

Changes the management address. Management is able to make some investment decisions adjusting parameters. This may only be called by governance.

Arguments:

* `management`:  - *The address to use for managing.*

### setRewards
>
> type: `nonpayable function`
>

Changes the rewards address. Any distributed rewards will cease flowing to the old address and begin flowing to this address once the change is in effect. This will not change any Strategy reports in progress, only new reports made after this change goes into effect. This may only be called by governance.

Arguments:

* `rewards`:  - *The address to use for collecting rewards.*

### setLockedProfitDegradation
>
> type: `nonpayable function`
>

Changes the locked profit degradation.

Arguments:

* `degradation`:  - *The rate of degradation in percent per second scaled to 1e18.*

### setDepositLimit
>
> type: `nonpayable function`
>

Changes the maximum amount of tokens that can be deposited in this Vault. Note, this is not how much may be deposited by a single depositor, but the maximum amount that may be deposited across all depositors. This may only be called by governance.

Arguments:

* `limit`:  - *The new deposit limit to use.*

### setPerformanceFee
>
> type: `nonpayable function`
>

Used to change the value of `performanceFee`. Should set this value below the maximum strategist performance fee. This may only be called by governance.

Arguments:

* `fee`:  - *The new performance fee to use.*

### setManagementFee
>
> type: `nonpayable function`
>

Used to change the value of `managementFee`. This may only be called by governance.

Arguments:

* `fee`:  - *The new management fee to use.*

### setGuardian
>
> type: `nonpayable function`
>

Used to change the address of `guardian`. This may only be called by governance or the existing guardian.

Arguments:

* `guardian`:  - *The new guardian address to use.*

### setEmergencyShutdown
>
> type: `nonpayable function`
>

Activates or deactivates Vault mode where all Strategies go into full withdrawal. During Emergency Shutdown: 1. No Users may deposit into the Vault (but may withdraw as usual.) 2. Governance may not add new Strategies. 3. Each Strategy must pay back their debt as quickly as reasonable to minimally affect their position. 4. Only Governance may undo Emergency Shutdown. See contract level note for further details. This may only be called by governance or the guardian.

Arguments:

* `active`:  - *If true, the Vault goes into Emergency Shutdown. If false, the Vault goes back into Normal Operation.*

### setWithdrawalQueue
>
> type: `nonpayable function`
>

Updates the withdrawalQueue to match the addresses and order specified by `queue`. There can be fewer strategies than the maximum, as well as fewer than the total number of strategies active in the vault. `withdrawalQueue` will be updated in a gas-efficient manner, assuming the input is well- ordered with 0x0 only at the end. This may only be called by governance or management.

*This is order sensitive, specify the addresses in the order in which funds should be withdrawn (so `queue`[0] is the first Strategy withdrawn from, `queue`[1] is the second, etc.) This means that the least impactful Strategy (the Strategy that will have its core positions impacted the least by having funds removed) should be at `queue`[0], then the next least impactful at `queue`[1], and so on.*

Arguments:

* `queue`:  - *The array of addresses to use as the new withdrawal queue. This is order sensitive.*

### transfer
>
> type: `nonpayable function`
>

Transfers shares from the caller&#39;s address to `receiver`. This function will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0.

Arguments:

* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*

* `amount`:  - *The quantity of shares to transfer.*

Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.

### transferFrom
>
> type: `nonpayable function`
>

Transfers `amount` shares from `sender` to `receiver`. This operation will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0. Unless the caller has given this contract unlimited approval, transferring shares will decrement the caller&#39;s `allowance` by `amount`.

Arguments:

* `sender`:  - *The address shares are being transferred from.*

* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*

* `amount`:  - *The quantity of shares to transfer.*

Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.

### approve
>
> type: `nonpayable function`
>

*Approve the passed address to spend the specified amount of tokens on behalf of `msg.sender`. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to be spent.*

### increaseAllowance
>
> type: `nonpayable function`
>

*Increase the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to increase the allowance by.*

### decreaseAllowance
>
> type: `nonpayable function`
>

*Decrease the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*

Arguments:

* `spender`:  - *The address which will spend the funds.*

* `amount`:  - *The amount of tokens to decrease the allowance by.*

### permit
>
> type: `nonpayable function`
>

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
>

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
>

Determines the maximum quantity of shares this Vault can facilitate a withdrawal for, factoring in assets currently residing in the Vault, as well as those deployed to strategies on the Vault&#39;s balance sheet.

*Regarding how shares are calculated, see dev note on `deposit`. If you want to calculated the maximum a user could withdraw up to, you want to use this function. Note that the amount provided by this function is the theoretical maximum possible from withdrawing, the real amount depends on the realized losses incurred during withdrawal.*

Returns:

* `_0` - The total quantity of shares this Vault can provide.

### withdraw
>
> type: `nonpayable function`
>

Withdraws the calling account&#39;s tokens from this Vault, redeeming amount `_shares` for an appropriate amount of tokens. See note on `setWithdrawalQueue` for further details of withdrawal ordering and behavior.

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.) In the situation where a large withdrawal happens, it can empty the vault balance and the strategies in the withdrawal queue. Strategies not in the withdrawal queue will have to be harvested to rebalance the funds and make the funds available again to withdraw.*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. If a loss is specified, up to that amount of shares may be burnt to cover losses on withdrawal.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.) In the situation where a large withdrawal happens, it can empty the vault balance and the strategies in the withdrawal queue. Strategies not in the withdrawal queue will have to be harvested to rebalance the funds and make the funds available again to withdraw.*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. If a loss is specified, up to that amount of shares may be burnt to cover losses on withdrawal.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.) In the situation where a large withdrawal happens, it can empty the vault balance and the strategies in the withdrawal queue. Strategies not in the withdrawal queue will have to be harvested to rebalance the funds and make the funds available again to withdraw.*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. If a loss is specified, up to that amount of shares may be burnt to cover losses on withdrawal.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### withdraw
>
> type: `nonpayable function`
>

*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.) In the situation where a large withdrawal happens, it can empty the vault balance and the strategies in the withdrawal queue. Strategies not in the withdrawal queue will have to be harvested to rebalance the funds and make the funds available again to withdraw.*

Arguments:

* `maxShares`:  - *How many shares to try and redeem for tokens, defaults to all.*

* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*

* `maxLoss`:  - *The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. If a loss is specified, up to that amount of shares may be burnt to cover losses on withdrawal.*

Returns:

* `_0` - The quantity of tokens redeemed for `_shares`.

### pricePerShare
>
> type: `view function`
>

Gives the price for a single Vault share.

*See dev note on `withdraw`.*

Returns:

* `_0` - The value of a single share.

### addStrategy
>
> type: `nonpayable function`
>

Add a Strategy to the Vault. This may only be called by governance.

*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*

Arguments:

* `strategy`:  - *The address of the Strategy to add.*

* `debtRatio`:  - *The share of the total assets in the `vault that the`strategy` has access to.*

* `minDebtPerHarvest`:  - *Lower limit on the increase of debt since last harvest*

* `maxDebtPerHarvest`:  - *Upper limit on the increase of debt since last harvest*

* `performanceFee`:  - *The fee the strategist will receive based on this Vault's performance.*

### updateStrategyDebtRatio
>
> type: `nonpayable function`
>

Change the quantity of assets `strategy` may manage. This may be called by governance or management.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `debtRatio`:  - *The quantity of assets `strategy` may now manage.*

### updateStrategyMinDebtPerHarvest
>
> type: `nonpayable function`
>

Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `minDebtPerHarvest`:  - *Lower limit on the increase of debt since last harvest*

### updateStrategyMaxDebtPerHarvest
>
> type: `nonpayable function`
>

Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `maxDebtPerHarvest`:  - *Upper limit on the increase of debt since last harvest*

### updateStrategyPerformanceFee
>
> type: `nonpayable function`
>

Change the fee the strategist will receive based on this Vault&#39;s performance. This may only be called by governance.

Arguments:

* `strategy`:  - *The Strategy to update.*

* `performanceFee`:  - *The new fee the strategist will receive.*

### migrateStrategy
>
> type: `nonpayable function`
>

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
>

Adds `strategy` to `withdrawalQueue`. This may only be called by governance or management.

*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*

Arguments:

* `strategy`:  - *The Strategy to add.*

### removeStrategyFromQueue
>
> type: `nonpayable function`
>

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
>

Reports the amount of assets the calling Strategy has free (usually in terms of ROI). The performance fee is determined here, off of the strategy&#39;s profits (if any), and sent to governance. The strategist&#39;s fee is also determined here (off of profits), to be handled according to the strategist on the next harvest. This may only be called by a Strategy managed by this Vault.

*For approved strategies, this is the most efficient behavior. The Strategy reports back what it has free, then Vault &#34;decides&#34; whether to take some back or give it more. Note that the most it can take is `gain + _debtPayment`, and the most it can give is all of the remaining reserves. Anything outside of those bounds is abnormal behavior. All approved strategies must have increased diligence around calling this function, as abnormal behavior could become catastrophic.*

Arguments:

* `gain`:  - *Amount Strategy has realized as a gain on it's investment since its last report, and is free to be given back to Vault as earnings*

* `loss`:  - *Amount Strategy has realized as a loss on it's investment since its last report, and should be accounted for on the Vault's balance sheet. The loss will reduce the debtRatio. The next time the strategy will harvest, it will pay back the debt in an attempt to adjust to the new debt limit.*

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
        "name": "sender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "receiver",
        "type": "address",
        "indexed": true
      },
      {
        "name": "value",
        "type": "uint256",
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
        "name": "owner",
        "type": "address",
        "indexed": true
      },
      {
        "name": "spender",
        "type": "address",
        "indexed": true
      },
      {
        "name": "value",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Deposit",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "indexed": true
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Withdraw",
    "inputs": [
      {
        "name": "recipient",
        "type": "address",
        "indexed": true
      },
      {
        "name": "shares",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Sweep",
    "inputs": [
      {
        "name": "token",
        "type": "address",
        "indexed": true
      },
      {
        "name": "amount",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "LockedProfitDegradationUpdated",
    "inputs": [
      {
        "name": "value",
        "type": "uint256",
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
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "debtRatio",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "minDebtPerHarvest",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "maxDebtPerHarvest",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "performanceFee",
        "type": "uint256",
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
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "gain",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "loss",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "debtPaid",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "totalGain",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "totalLoss",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "totalDebt",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "debtAdded",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "debtRatio",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "FeeReport",
    "inputs": [
      {
        "name": "management_fee",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "performance_fee",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "strategist_fee",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "duration",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "WithdrawFromStrategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "totalDebt",
        "type": "uint256",
        "indexed": false
      },
      {
        "name": "loss",
        "type": "uint256",
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
        "name": "governance",
        "type": "address",
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
        "name": "management",
        "type": "address",
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
        "name": "rewards",
        "type": "address",
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
        "name": "depositLimit",
        "type": "uint256",
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
        "name": "performanceFee",
        "type": "uint256",
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
        "name": "managementFee",
        "type": "uint256",
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
        "name": "guardian",
        "type": "address",
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
        "name": "active",
        "type": "bool",
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
        "name": "queue",
        "type": "address[20]",
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
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "debtRatio",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyUpdateMinDebtPerHarvest",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "minDebtPerHarvest",
        "type": "uint256",
        "indexed": false
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "StrategyUpdateMaxDebtPerHarvest",
    "inputs": [
      {
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "maxDebtPerHarvest",
        "type": "uint256",
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
        "name": "strategy",
        "type": "address",
        "indexed": true
      },
      {
        "name": "performanceFee",
        "type": "uint256",
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
        "name": "oldVersion",
        "type": "address",
        "indexed": true
      },
      {
        "name": "newVersion",
        "type": "address",
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
        "name": "strategy",
        "type": "address",
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
        "name": "strategy",
        "type": "address",
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
        "name": "strategy",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "NewPendingGovernance",
    "inputs": [
      {
        "name": "pendingGovernance",
        "type": "address",
        "indexed": true
      }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      },
      {
        "name": "rewards",
        "type": "address"
      },
      {
        "name": "nameOverride",
        "type": "string"
      },
      {
        "name": "symbolOverride",
        "type": "string"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      },
      {
        "name": "rewards",
        "type": "address"
      },
      {
        "name": "nameOverride",
        "type": "string"
      },
      {
        "name": "symbolOverride",
        "type": "string"
      },
      {
        "name": "guardian",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "initialize",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "governance",
        "type": "address"
      },
      {
        "name": "rewards",
        "type": "address"
      },
      {
        "name": "nameOverride",
        "type": "string"
      },
      {
        "name": "symbolOverride",
        "type": "string"
      },
      {
        "name": "guardian",
        "type": "address"
      },
      {
        "name": "management",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "pure",
    "type": "function",
    "name": "apiVersion",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "DOMAIN_SEPARATOR",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bytes32"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setName",
    "inputs": [
      {
        "name": "name",
        "type": "string"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setSymbol",
    "inputs": [
      {
        "name": "symbol",
        "type": "string"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setGovernance",
    "inputs": [
      {
        "name": "governance",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "acceptGovernance",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setManagement",
    "inputs": [
      {
        "name": "management",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setRewards",
    "inputs": [
      {
        "name": "rewards",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setLockedProfitDegradation",
    "inputs": [
      {
        "name": "degradation",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setDepositLimit",
    "inputs": [
      {
        "name": "limit",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setPerformanceFee",
    "inputs": [
      {
        "name": "fee",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setManagementFee",
    "inputs": [
      {
        "name": "fee",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setGuardian",
    "inputs": [
      {
        "name": "guardian",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setEmergencyShutdown",
    "inputs": [
      {
        "name": "active",
        "type": "bool"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "setWithdrawalQueue",
    "inputs": [
      {
        "name": "queue",
        "type": "address[20]"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transfer",
    "inputs": [
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "transferFrom",
    "inputs": [
      {
        "name": "sender",
        "type": "address"
      },
      {
        "name": "receiver",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "approve",
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "increaseAllowance",
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "decreaseAllowance",
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "permit",
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      },
      {
        "name": "expiry",
        "type": "uint256"
      },
      {
        "name": "signature",
        "type": "bytes"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalAssets",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deposit",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deposit",
    "inputs": [
      {
        "name": "_amount",
        "type": "uint256"
      },
      {
        "name": "recipient",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "maxAvailableShares",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "maxShares",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "maxShares",
        "type": "uint256"
      },
      {
        "name": "recipient",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "withdraw",
    "inputs": [
      {
        "name": "maxShares",
        "type": "uint256"
      },
      {
        "name": "recipient",
        "type": "address"
      },
      {
        "name": "maxLoss",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "pricePerShare",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "addStrategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "debtRatio",
        "type": "uint256"
      },
      {
        "name": "minDebtPerHarvest",
        "type": "uint256"
      },
      {
        "name": "maxDebtPerHarvest",
        "type": "uint256"
      },
      {
        "name": "performanceFee",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "updateStrategyDebtRatio",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "debtRatio",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "updateStrategyMinDebtPerHarvest",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "minDebtPerHarvest",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "updateStrategyMaxDebtPerHarvest",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "maxDebtPerHarvest",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "updateStrategyPerformanceFee",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      },
      {
        "name": "performanceFee",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "migrateStrategy",
    "inputs": [
      {
        "name": "oldVersion",
        "type": "address"
      },
      {
        "name": "newVersion",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "revokeStrategy",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "revokeStrategy",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "addStrategyToQueue",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "removeStrategyFromQueue",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "debtOutstanding",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "debtOutstanding",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "creditAvailable",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "creditAvailable",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "availableDepositLimit",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "expectedReturn",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "expectedReturn",
    "inputs": [
      {
        "name": "strategy",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "report",
    "inputs": [
      {
        "name": "gain",
        "type": "uint256"
      },
      {
        "name": "loss",
        "type": "uint256"
      },
      {
        "name": "_debtPayment",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "sweep",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "sweep",
    "inputs": [
      {
        "name": "token",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "name",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "symbol",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "decimals",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "balanceOf",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "allowance",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      },
      {
        "name": "arg1",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalSupply",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "token",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "governance",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "management",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "guardian",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "strategies",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          {
            "name": "performanceFee",
            "type": "uint256"
          },
          {
            "name": "activation",
            "type": "uint256"
          },
          {
            "name": "debtRatio",
            "type": "uint256"
          },
          {
            "name": "minDebtPerHarvest",
            "type": "uint256"
          },
          {
            "name": "maxDebtPerHarvest",
            "type": "uint256"
          },
          {
            "name": "lastReport",
            "type": "uint256"
          },
          {
            "name": "totalDebt",
            "type": "uint256"
          },
          {
            "name": "totalGain",
            "type": "uint256"
          },
          {
            "name": "totalLoss",
            "type": "uint256"
          }
        ]
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "withdrawalQueue",
    "inputs": [
      {
        "name": "arg0",
        "type": "uint256"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "emergencyShutdown",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "depositLimit",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "debtRatio",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalIdle",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "totalDebt",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "lastReport",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "activation",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "lockedProfit",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "lockedProfitDegradation",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "rewards",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "managementFee",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "performanceFee",
    "inputs": [],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "nonces",
    "inputs": [
      {
        "name": "arg0",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ]
  }
]
```

## Byte code

```bin
0x61411b61001863000000003961411b6000016300000000f3600436101561000d576131db565b60003560e01c34614116576383b4358981186100325733610140523361016052610080565b63a5b81fdf81186100565760a4358060a01c61411657610140523361016052610080565b63538baeab81186104cd5760a4358060a01c614116576101405260c4358060a01c61411657610160525b6004358060a01c614116576040526024358060a01c614116576060526044358060a01c6141165760805260643560040160408135116141165780358060a05260208201818160c0375050506084356004016020813511614116578035806101005260208201803561012052505050602a5461411657604051600a5560006101a0526101a080516020820120905060a05160c020186101f05760006395d89b416101c05260606101c060046101dc6040515afa610141573d600060003e3d6000fd5b60403d10614116576101c0516101c0016014815111614116578051806102405260208201805161026052505050610240805160208201836102e001815181525050808301925050506007610280527f20795661756c74000000000000000000000000000000000000000000000000006102a052610280805160208201836102e00181518152505080830192505050806102c0526102c0905080518060015560208201805160025550505061022c565b60a051806001556000602082601f01046002811161411657801561022857905b6020810260c001518160020155600101818118610210575b5050505b60006101a0526101a080516020820120905061010051610120201861032357600060026101c0527f79760000000000000000000000000000000000000000000000000000000000006101e0526101c0805160208201836102e001815181525050808301925050506395d89b41610200526060610200600461021c6040515afa6102ba573d600060003e3d6000fd5b60403d10614116576102005161020001601481511161411657805180610280526020820180516102a052505050610280805160208201836102e00181518152505080830192505050806102c0526102c09050805180600455602082018051600555505050610334565b610100518060045561012051600555505b63313ce5676101a05260206101a060046101bc6040515afa61035b573d600060003e3d6000fd5b60203d10614116576101a051610180526101805160065561010061018051101561411657606051600b557f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b876060516101a05260206101a0a161016051600c557fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef438610160516101a05260206101a0a1608051602d557fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d6080516101a05260206101a0a161014051600d557f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c610140516101a05260206101a0a16103e8602f557f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb6103e86101a05260206101a0a160c8602e557f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf60c86101a05260206101a0a14260295542602a556529d635a8e000602c55005b6325829410811861054d5760208060805260056040527f302e342e360000000000000000000000000000000000000000000000000000006060526040816080018151808252602083016020830181518152505050805180602083010181600003601f163682375050601f19601f8251602001011690509050810190506080f35b633644e515811861056a5760206105656103c06131e1565b6103c0f35b63c47f002781186105dc57600435600401604081351161411657803580604052602082018181606037505050600b54331861411657604051806001556000602082601f0104600281116141165780156105d757905b602081026060015181600201556001018181186105bf575b505050005b63b84c8246811861062157600435600401602081351161411657803580604052602082018035606052505050600b543318614116576040518060045560605160055550005b63ab033ea98118610674576004358060a01c61411657604052600b543318614116576040517f90ad4c550d25bd23af61db38d1ff8671b89edaaa0bca0fc36bac5084ecc120bd60006060a2604051600e55005b63238efcbc81186106b857600e5433186141165733600b557f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b873360405260206040a1005b63d4a22bde811861070e576004358060a01c61411657604052600b54331861411657604051600c557fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef43860405160605260206060a1005b63ec38a86281186107a9576004358060a01c61411657604052600b5433186141165760405130608052600060a052600060605260006002905b6020810260800151831861075f57600160605261076a565b600101818118610747575b5050606051905061411657604051602d557fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d60405160605260206060a1005b637a550365811861080257600b54331861411657670de0b6b3a76400006004351161411657600435602c557f056863905a721211fc4dda1d688efc8f120b4b689d2e41da8249cf6eff20069160043560405260206040a1005b63bdc8144b811861084a57600b543318614116576004356025557fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd6260043560405260206040a1005b6370897b23811861089d57600b543318614116576113886004351161411657600435602f557f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb60043560405260206040a1005b63fe56e23281186108f057600b543318614116576127106004351161411657600435602e557f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf60043560405260206040a1005b638a0dac4a8118610984576004358060a01c6141165760405233600d54608052600b5460a052600060605260006002905b60208102608001518318610939576001606052610944565b600101818118610921575b505060605190501561411657604051600d557f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c60405160605260206060a1005b6314c644028118610a2e576004358060011c614116576040526040516109b257600b543318614116576109fa565b33600d54608052600b5460a052600060605260006002905b602081026080015183186109e25760016060526109ed565b6001018181186109ca575b5050606051905015614116575b6040516024557fba40372a3a724dca3c57156128ef1e896724b65b37a17f190b1ad5de68f3a4f360405160605260206060a1005b63941484158118610e28576004358060a01c614116576040526024358060a01c614116576060526044358060a01c614116576080526064358060a01c6141165760a0526084358060a01c6141165760c05260a4358060a01c6141165760e05260c4358060a01c614116576101005260e4358060a01c6141165761012052610104358060a01c6141165761014052610124358060a01c6141165761016052610144358060a01c6141165761018052610164358060a01c614116576101a052610184358060a01c614116576101c0526101a4358060a01c614116576101e0526101c4358060a01c61411657610200526101e4358060a01c6141165761022052610204358060a01c6141165761024052610224358060a01c6141165761026052610244358060a01c6141165761028052610264358060a01c614116576102a05233600c546102e052600b546103005260006102c05260006002905b602081026102e001518318610ba05760016102c052610bab565b600101818118610b86575b50506102c05190501561411657610280366102c03760006014905b80610540526105405160148110156141165760100154602061054051601481101561411657026102c001526020610540516014811015614116570260400151610c2757602061054051601481101561411657026102c0015161411657610d62565b6000602061054051601481101561411657026102c0015114614116576000600f602061054051601481101561411657026040015160205260005260406000206001810190505411156141165760006105605260006014905b80610580526020610580516014811015614116570260400151610ca757600161056052610d27565b602061058051601481101561411657026102c00151602061054051601481101561411657026040015118610cdc576001610560525b610540516105805111610cee57610d1c565b6020610580516014811015614116570260400151602061054051601481101561411657026040015114614116575b600101818118610c7f575b505061056051156141165760206105405160148110156141165702604001516105405160148110156141165760100155600101818118610bc6575b50507f695ac3ac73f08f2002284ffe563cefe798ee2878a5e04219522e2e99eb89d16860405161054052606051610560526080516105805260a0516105a05260c0516105c05260e0516105e052610100516106005261012051610620526101405161064052610160516106605261018051610680526101a0516106a0526101c0516106c0526101e0516106e052610200516107005261022051610720526102405161074052610260516107605261028051610780526102a0516107a052610280610540a1005b63a9059cbb8118610e68576004358060a01c61411657610100523360405261010051606052602435608052610e5b613551565b6001610120526020610120f35b6323b872dd8118610f92576004358060a01c61411657610100526024358060a01c61411657610120527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6008610100516020526000526040600020803360205260005260406000209050541015610f69576008610100516020526000526040600020803360205260005260406000209050546044358082106141165780820390509050610140526101405160086101005160205260005260406000208033602052600052604060002090505533610100517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92561014051610160526020610160a35b6101005160405261012051606052604435608052610f85613551565b6001610140526020610140f35b63095ea7b38118611009576004358060a01c614116576040526024356008336020526000526040600020806040516020526000526040600020905055604051337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92560243560605260206060a3600160605260206060f35b633950935181186110b1576004358060a01c6141165760405260083360205260005260406000208060405160205260005260406000209050805460243581818301106141165780820190509050815550604051337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600833602052600052604060002080604051602052600052604060002090505460605260206060a3600160605260206060f35b63a457c2d78118611157576004358060a01c614116576040526008336020526000526040600020806040516020526000526040600020905080546024358082106141165780820390509050815550604051337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925600833602052600052604060002080604051602052600052604060002090505460605260206060a3600160605260206060f35b639fd5a6cf811861143f576004358060a01c614116576103c0526024358060a01c614116576103e052608435600401604181351161411657803580610400526020820181816104203750505060006103c051146141165742606435106141165760306103c0516020526000526040600020546104805260006002610760527f190100000000000000000000000000000000000000000000000000000000000061078052610760805160208201836109a001815181525050808301925050506112206107a06131e1565b6107a051816109a0015260208101905060007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c9816108c001526020810190506103c051816108c001526020810190506103e051816108c00152602081019050604435816108c0015260208101905061048051816108c00152602081019050606435816108c00152602081019050806108a0526108a09050805160208201209050816109a00152602081019050806109805261098090508051602082012090506104a0526104005160201161411657610420516105005260206104e0526104e0602081015181516020036008021c90506104c05261040051604011614116576104405161052052602061050052610500602081015181516020036008021c90506104e05261040051604111614116576104605161054052600161052052610520602081015181516020036008021c9050610500526103c0516104a0516105205261050051610540526104c051610560526104e0516105805260206000608061052060015afa50600051186141165760443560086103c0516020526000526040600020806103e05160205260005260406000209050556104805160018181830110614116578082019050905060306103c0516020526000526040600020556103e0516103c0517f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925604435610520526020610520a36001610520526020610520f35b6301e1d114811861145a5760206114566040613619565b6040f35b63d0e30db08118611494577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6102205233610240526114d2565b63b6b55f2581186114b0576004356102205233610240526114d2565b636e553f6581186116a957600435610220526024358060a01c61411657610240525b6000546141165760016000556024546141165761024051306102805260006102a05260016102605260006002905b602081026102800151831861151a57600061026052611525565b600101818118611500575b5050610260519050156141165761022051610260527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61026051186115d257602554611572610280613619565b6102805180821061411657808203905090506370a082316102a052336102c05260206102a060246102bc600a545afa6115b0573d600060003e3d6000fd5b60203d10614116576102a05180828118828410021890509050610260526115fe565b6025546115e0610280613619565b61028051610260518181830110614116578082019050905011614116575b6000610260511115614116576102405160c0526102605160e0526116236102a06136f7565b6102a05161028052600a5460405233606052306080526102605160a052611648613402565b6027546102605181818301106141165780820190509050602755610240517f90890809c654f11d6e72a28fa60149770a0d11ec6c92319d6ceb2bb0a4ea1a15610280516102a052610260516102c05260406102a0a260206102806000600055f35b6375de2902811861173f5760275460c0526116c561014061382f565b610140516101205260006014905b806010015461014052610140516116e957611736565b61012051600f6101405160205260005260406000206006810190505460c05261171361016061382f565b6101605181818301106141165780820190509050610120526001018181186116d3575b50506020610120f35b633ccfd60b811861177f577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101e05233610200526001610220526117f5565b632e1a7d4d81186117a1576004356101e05233610200526001610220526117f5565b62f714ce81186117cc576004356101e0526024358060a01c61411657610200526001610220526117f5565b63e63697c88118611c8b576004356101e0526024358060a01c6141165761020052604435610220525b6000546141165760016000556101e051610240526127106102205111614116577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610240511861185357600733602052600052604060002054610240525b6007336020526000526040600020546102405111614116576000610240511115614116576102405160c0526118896102806137e3565b61028051610260526027546102805261028051610260511115611ba15760006102a05260006014905b80601001546102c0526102c0516118c857611b0f565b6102805161026051116118da57611b0f565b610260516102805180821061411657808203905090506102e0526102e051600f6102c051602052600052604060002060068101905054808281188284100218905090506102e0526102e05161192e57611b04565b6370a082316103205230610340526020610320602461033c600a545afa61195a573d600060003e3d6000fd5b60203d10614116576103205161030052632e1a7d4d610340526102e051610360526020610340602461035c60006102c0515af161199c573d600060003e3d6000fd5b60203d106141165761034051610320526370a082316103605230610380526020610360602461037c600a545afa6119d8573d600060003e3d6000fd5b60203d10614116576103605161030051808210614116578082039050905061034052610280516103405181818301106141165780820190509050610280526000610320511115611a6e5761026051610320518082106141165780820390509050610260526102a05161032051818183011061411657808201905090506102a0526102c05160405261032051606052611a6e61388d565b600f6102c051602052600052604060002060068101905080546103405180821061411657808203905090508155506028546103405180821061411657808203905090506028556102c0517f06c03dc1e1399953729e53ec7181b6e753942e20fafe5b55917f5c34559ae69c600f6102c0516020526000526040600020600681019050546103605261032051610380526040610360a25b6001018181186118b2575b50506102805160275561028051610260511115611b5d576102805161026052610260516102a0518181830110614116578082019050905060c052611b546102c061382f565b6102c051610240525b61022051610260516102a051818183011061411657808201905090508082028215828483041417156141165790509050612710808204905090506102a05111614116575b600954610240518082106141165780820390509050600955600733602052600052604060002080546102405180821061411657808203905090508155506000337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef610240516102a05260206102a0a3602754610260518082106141165780820390509050602755600a546040526102005160605261026051608052611c446132c8565b610200517ff279e6a1f5e320cca91135676d9cb6e44ca8a08c0b88342bcdb1144f6511b568610240516102a052610260516102c05260406102a0a260206102606000600055f35b6399530b068118611cbc576020604e600654101561411657600654600a0a60c052611cb76101006137e3565b610100f35b6314b4e26e8118611e8c576004358060a01c6141165760a0526023546141165760245461411657600b54331861411657600060a0511461411657600f60a0516020526000526040600020600181019050546141165763fbfa77cf60c052602060c0600460dc60a0515afa611d35573d600060003e3d6000fd5b60203d106141165760c0518060a01c614116576101005261010051301861411657631f1fcd5160c052602060c0600460dc60a0515afa611d7a573d600060003e3d6000fd5b60203d106141165760c0518060a01c614116576101005261010051600a54186141165761271060265460243581818301106141165780820190509050116141165760643560443511614116576113886084351161411657600f60a051602052600052604060002060843581554260018201556024356002820155604435600382015560643560048201554260058201556000600682015560006007820155600060088201555060a0517f5a6abd2af9fe6c0554fa08649e2d86e4393ff19dc304d072d38d295c9291d4dc60243560c05260443560e0526064356101005260843561012052608060c0a26026546024358181830110614116578082019050905060265560a051602355611e8a6139c3565b005b637c6a4f248118611fe6576004358060a01c6141165760405233600c54608052600b5460a052600060605260006002905b60208102608001518318611ed5576001606052611ee0565b600101818118611ebd575b5050606051905015614116576000600f604051602052600052604060002060018101905054111561411657635641ec03606052602060606004607c6040515afa611f2f573d600060003e3d6000fd5b60203d10614116576060518060011c6141165760a05260a05161411657602654600f6040516020526000526040600020600281019050548082106141165780820390509050602655602435600f6040516020526000526040600020600281019050556026546024358181830110614116578082019050905060265561271060265411614116576040517fbda9398315c83ccef012bcaa318a2ff7b680f36429d36597bd4bc25ac11ead5960243560605260206060a2005b63e722befe81186120cf576004358060a01c6141165760405233600c54608052600b5460a052600060605260006002905b6020810260800151831861202f57600160605261203a565b600101818118612017575b5050606051905015614116576000600f604051602052600052604060002060018101905054111561411657602435600f6040516020526000526040600020600481019050541061411657602435600f6040516020526000526040600020600381019050556040517f0b728ad785976532c4aaadde09b1cba5f262a7090e83c62d2377bc405678b29c60243560605260206060a2005b634757a15681186121b8576004358060a01c6141165760405233600c54608052600b5460a052600060605260006002905b60208102608001518318612118576001606052612123565b600101818118612100575b5050606051905015614116576000600f604051602052600052604060002060018101905054111561411657602435600f6040516020526000526040600020600381019050541161411657602435600f6040516020526000526040600020600481019050556040517f1796a8e0760e2de5b72e7bf64fccb7666c48ceab94cb6cae7cb7eff4b6f641ab60243560605260206060a2005b63d0194ed68118612249576004358060a01c61411657604052600b5433186141165761138860243511614116576000600f604051602052600052604060002060018101905054111561411657602435600f6040516020526000526040600020556040517fe57488a65fa53066d4c25bac90db47dda4e5de3025ac12bf76ff07211cf7f39e60243560605260206060a2005b636cb56d198118612465576004358060a01c614116576060526024358060a01c61411657608052600b54331861411657600060805114614116576000600f606051602052600052604060002060018101905054111561411657600f60805160205260005260406000206001810190505461411657600f6060516020526000526040600020805460a052600181015460c052600281015460e05260038101546101005260048101546101205260058101546101405260068101546101605260078101546101805260088101546101a05250606051604052612327613a5a565b60265460e051818183011061411657808201905090506026556000600f606051602052600052604060002060068101905055600f608051602052600052604060002060a051815561014051600182015560e051600282015561010051600382015561012051600482015561014051600582015561016051600682015560006007820155600060088201555063ce5494bb6101c0526080516101e0526060513b15614116576000600060246101dc60006060515af16123ea573d600060003e3d6000fd5b6080516060517f100b69bb6b504e1252e36b375233158edee64d071b399e2f81473a695fd1b02160006101c0a360006014905b806101c0526060516101c0516014811015614116576010015418612456576080516101c051601481101561411657601001555050612463565b60010181811861241d5750505b005b63a0e4af9a81186124795733606052612493565b63bb994d48811861250e576004358060a01c614116576060525b3360605160a052600b5460c052600d5460e052600060805260006003905b6020810260a0015183186124c95760016080526124d4565b6001018181186124b1575b5050608051905015614116576000600f606051602052600052604060002060028101905054146141165760605160405261250c613a5a565b005b63f76e4caa8118612621576004358060a01c6141165760a05233600c5460e052600b5461010052600060c05260006002905b6020810260e00151831861255857600160c052612563565b600101818118612540575b505060c051905015614116576000600f60a051602052600052604060002060018101905054111561411657600060c05260006014905b806010015460e05260e0516125ad576125db565b60a05160e051146141165760c05160018181830110614116578082019050905060c052600101818118612599575b5050601460c05110156141165760a0516023556125f66139c3565b60a0517fa8727d412c6fa1e2497d6d6f275e2d9fe4d9318d5b793632e60ad9d38ee8f1fa600060e0a2005b63b22439f58118612702576004358060a01c6141165760a05233600c5460e052600b5461010052600060c05260006002905b6020810260e00151831861266b57600160c052612676565b600101818118612653575b505060c0519050156141165760006014905b8060c05260a05160c05160148110156141165760100154186126ee57600060c051601481101561411657601001556126be6139c3565b60a0517f8e1ec3c16d6a67ea8effe2ac7adef9c2de0bc0dc47c49cdf18f6a8b0048085be600060e0a25050612700565b60010181811861268857505060006000fd5b005b63bf3759b58118612716573360a052612730565b63bdcf36bb8118612746576004358060a01c6141165760a0525b602060a05160405261274260c0613ac9565b60c0f35b63112c1f9b811861275b573361016052612776565b63d7648013811861278f576004358060a01c61411657610160525b60206101605160405261278a610180613b9c565b610180f35b63153c27c481186127ed576127a46040613619565b604051602554116127c1576000604052602060406127eb566127eb565b6025546127ce6060613619565b6060518082106141165780820390509050608052602060806127eb565bf35b63d3406abd811861280257336101805261281d565b6333586b678118612836576004358060a01c61411657610180525b6020610180516040526128316101a0613d34565b6101a0f35b63a1d9bafc8118612c9d576000600f33602052600052604060002060018101905054111561411657600435604435818183011061411657808201905090506370a082316102c052336102e05260206102c060246102dc600a545afa6128a0573d600060003e3d6000fd5b60203d10614116576102c0511061411657600060243511156128ce57336040526024356060526128ce61388d565b3361016052600435610180526128e56102e0613e4e565b6102e0516102c052600f33602052600052604060002060078101905080546004358181830110614116578082019050905081555033604052612928610300613b9c565b610300516102e0523360405261293f610320613ac9565b610320516103005260443561030051808281188284100218905090506103205260006103205111156129c957600f336020526000526040600020600681019050805461032051808210614116578082039050905081555060285461032051808210614116578082039050905060285561030051610320518082106141165780820390509050610300525b60006102e0511115612a1d57600f33602052600052604060002060068101905080546102e051818183011061411657808201905090508155506028546102e051818183011061411657808201905090506028555b6004356103205181818301106141165780820190509050610340526102e0516103405110612ab2576102e051610340511115612b0757602754610340516102e051808210614116578082039050905081818301106141165780820190509050602755600a546040523360605230608052610340516102e051808210614116578082039050905060a052612b0761340256612b07565b6027546102e0516103405180821061411657808203905090508082106141165780820390509050602755600a54604052336060526102e051610340518082106141165780820390509050608052612b076132c8565b612b12610380613634565b61038051600435818183011061411657808201905090506102c0518082106141165780820390509050610360526024356103605111612b55576000602b55612b6e565b610360516024358082106141165780820390509050602b555b42600f3360205260005260406000206005810190505542602955337f67f96d2854a335a4cadb49f84fd3ca6f990744ddb3feceeb4b349d2d53d32ad36040600461038037610320516103c052600f336020526000526040600020600781019050546103e052600f3360205260005260406000206008810190505461040052600f33602052600052604060002060068101905054610420526102e05161044052600f3360205260005260406000206002810190505461046052610100610380a2600f3360205260005260406000206002810190505415612c4f57602454612c52565b60015b612c64576020610300612c9b56612c9b565b602063efbb5cb0610380526020610380600461039c335afa612c8b573d600060003e3d6000fd5b60203d1061411657610380612c9b565bf35b6301681a628118612cd2577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61020052612ce5565b636ea056a98118612e1857602435610200525b6004358060a01c614116576101e052600b5433186141165761020051610220527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6102205118612d6d576370a082316102405230610260526020610240602461025c6101e0515afa612d5c573d600060003e3d6000fd5b60203d106141165761024051610220525b600a546101e05118612dc7576370a082316102405230610260526020610240602461025c600a545afa612da5573d600060003e3d6000fd5b60203d1061411657610240516027548082106141165780820390509050610220525b6101e0517fab2246061d7b0dd3631d037e3f6da75782ae489eeb9f6af878a4b25df9b07c7761022051610240526020610240a26101e051604052600b5460605261022051608052612e166132c8565b005b6306fdde038118612e955760208060405280604001600154808252602082016000602083601f010460028111614116578015612e6757905b806002015460208202840152600101818118612e50575b50505050805180602083010181600003601f163682375050601f19601f825160200101169050810190506040f35b6395d89b418118612ee557602080604052806040016004548082526020820160055481525050805180602083010181600003601f163682375050601f19601f825160200101169050810190506040f35b63313ce5678118612efc5760065460405260206040f35b6370a082318118612f2f576004358060a01c61411657604052600760405160205260005260406000205460605260206060f35b63dd62ed3e8118612f81576004358060a01c614116576040526024358060a01c614116576060526008604051602052600052604060002080606051602052600052604060002090505460805260206080f35b6318160ddd8118612f985760095460405260206040f35b63fc0c546a8118612faf57600a5460405260206040f35b635aa6e6758118612fc657600b5460405260206040f35b6388a8d6028118612fdd57600c5460405260206040f35b63452a93208118612ff457600d5460405260206040f35b6339ebf823811861306e576004358060a01c61411657604052600f604051602052600052604060002080546060526001810154608052600281015460a052600381015460c052600481015460e052600581015461010052600681015461012052600781015461014052600881015461016052506101206060f35b63c822adda8118613092576004356014811015614116576010015460405260206040f35b633403c2fc81186130a95760245460405260206040f35b63ecf7085881186130c05760255460405260206040f35b63cea55f5781186130d75760265460405260206040f35b639aa7df9481186130ee5760275460405260206040f35b63fc7b9c1881186131055760285460405260206040f35b63c3535b52811861311c5760295460405260206040f35b633629c8de811861313357602a5460405260206040f35b6344b81396811861314a57602b5460405260206040f35b6342232716811861316157602c5460405260206040f35b639ec5a894811861317857602d5460405260206040f35b63a6f7f5d6811861318f57602e5460405260206040f35b638778878281186131a657602f5460405260206040f35b637ecebe0081186131d9576004358060a01c61411657604052603060405160205260005260406000205460605260206060f35b505b60006000fd5b60007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f816103200152602081019050600b610240527f596561726e205661756c740000000000000000000000000000000000000000006102605261024080516020820120905081610320015260208101905060056102c0527f302e342e360000000000000000000000000000000000000000000000000000006102e0526102c0805160208201209050816103200152602081019050468161032001526020810190503081610320015260208101905080610300526103009050805160208201209050815250565b6000600460e0527fa9059cbb000000000000000000000000000000000000000000000000000000006101005260e08051602082018361014001815181525050808301925050506060518161014001526020810190506080518161014001526020810190508061012052610120505060206101c06101205161014060006040515af1613358573d600060003e3d6000fd5b6101a060203d80821161336b578161336d565b805b90509050815280518060a05260208201805160c052505050600060a05111156134005760c05160a0516020036008021c61340057601060e0527f5472616e73666572206661696c656421000000000000000000000000000000006101005260e05060e051806101000181600003601f1636823750506308c379a060a052602060c052601f19601f60e051011660440160bcfd5b565b60006004610100527f23b872dd000000000000000000000000000000000000000000000000000000006101205261010080516020820183610160018151815250508083019250505060605181610160015260208101905060805181610160015260208101905060a0518161016001526020810190508061014052610140505060206102006101405161016060006040515af16134a3573d600060003e3d6000fd5b6101e060203d8082116134b657816134b8565b805b90509050815280518060c05260208201805160e052505050600060c051111561354f5760e05160c0516020036008021c61354f576010610100527f5472616e73666572206661696c65642100000000000000000000000000000000610120526101005061010051806101200181600003601f1636823750506308c379a060c052602060e052601f19601f61010051011660440160dcfd5b565b6060513060c052600060e052600160a05260006002905b6020810260c00151831861358057600060a05261358b565b600101818118613568575b505060a051905015614116576007604051602052600052604060002080546080518082106141165780820390509050815550600760605160205260005260406000208054608051818183011061411657808201905090508155506060516040517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60805160a052602060a0a3565b60275460285481818301106141165780820190509050815250565b426029548082106141165780820390509050602c548082028215828483041417156141165790509050604052670de0b6b3a76400006040511061367f5760008152506136c8566136c8565b602b546060526060516040516060518082028215828483041417156141165790509050670de0b6b3a76400008082049050905080821061411657808203905090508152506136c8565b565b6136d46080613619565b6080516136e160a0613634565b60a0518082106141165780820390509050815250565b600061010052600954610120526000610120511161371b5760e05161010052613757565b60e0516101205180820282158284830414171561411657905090506137416101406136ca565b6101405180801561411657820490509050610100525b6000610100511461411657610120516101005181818301106141165780820190509050600955600760c05160205260005260406000208054610100518181830110614116578082019050905081555060c05160007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef61010051610140526020610140a361010051815250565b6009546137f55760c05181525061382d565b60c05161380260e06136ca565b60e0518082028215828483041417156141165790509050600954808015614116578204905090508152505b565b61383a6101006136ca565b6101005160e052600060e0511161385957600081525061388b5661388b565b60c051600954808202821582848304141715614116579050905060e0518080156141165782049050905081525061388b565b565b600f604051602052600052604060002060068101905054608052606051608051106141165760006026541461395157606051602654808202821582848304141715614116579050905060285480801561411657820490509050600f6040516020526000526040600020600281019050548082811882841002189050905060a052600f6040516020526000526040600020600281019050805460a051808210614116578082039050905081555060265460a05180821061411657808203905090506026555b600f60405160205260005260406000206008810190508054606051818183011061411657808201905090508155506080516060518082106141165780820390509050600f6040516020526000526040600020600681019050556028546060518082106141165780820390509050602855565b600060405260006014905b806060526060516014811015614116576010015460805260805115613a335760006040511115613a4c57608051606051604051808210614116578082039050905060148110156141165760100155600060605160148110156141165760100155613a4c565b6040516001818183011061411657808201905090506040525b6001018181186139ce575050565b602654600f60405160205260005260406000206002810190505480821061411657808203905090506026556000600f6040516020526000526040600020600281019050556040517f4201c688d84c01154d321afa0c72f1bffe9eef53005c9de9d035074e71e9b32a60006060a2565b602654613aef57600f604051602052600052604060002060068101905054815250613b9a565b600f604051602052600052604060002060028101905054613b106080613619565b608051808202821582848304141715614116579050905061271080820490509050606052600f604051602052600052604060002060068101905054608052602454613b8f576060516080511115613b81576080516060518082106141165780820390509050815250613b9a56613b9a565b6000815250613b9a56613b9a565b608051815250613b9a565b565b60245415613bae576000815250613d32565b613bb86080613619565b60805160605260265460605180820282158284830414171561411657905090506127108082049050905060805260285460a052600f60405160205260005260406000206002810190505460605180820282158284830414171561411657905090506127108082049050905060c052600f60405160205260005260406000206006810190505460e052600f60405160205260005260406000206003810190505461010052600f6040516020526000526040600020600481019050546101205260e05160c0511115613c8f5760a0516080511115613c92565b60015b15613ca1576000815250613d32565b60c05160e0518082106141165780820390509050610140526101405160805160a05180821061411657808203905090508082811882841002189050905061014052610140516027548082811882841002189050905061014052610100516101405110613d2857610140516101205180828118828410021890509050815250613d3256613d32565b6000815250613d32565b565b600f604051602052600052604060002060058101905054606052426060518082106141165780820390509050608052606051600f604051602052600052604060002060018101905054808210614116578082039050905060a052600060805111613d9f576000613df4565b600060a05111613db0576000613df4565b6322f3e2d4610120526020610120600461013c6040515afa613dd7573d600060003e3d6000fd5b60203d1061411657610120518060011c6141165761016052610160515b613e06576000815250613e4c56613e4c565b600f604051602052600052604060002060078101905054608051808202821582848304141715614116579050905060a05180801561411657820490509050815250613e4c565b565b42600f6101605160205260005260406000206001810190505418613e76576000815250614114565b42600f6101605160205260005260406000206005810190505480821061411657808203905090506101a05260006101a051146141165761018051613ebe576000815250614114565b600f61016051602052600052604060002060068101905054638e6350e26101e05260206101e060046101fc610160515afa613efe573d600060003e3d6000fd5b60203d10614116576101e05180821061411657808203905090506101a0518082028215828483041417156141165790509050602e548082028215828483041417156141165790509050612710808204905090506301e18558808204905090506101c05261018051600f610160516020526000526040600020548082028215828483041417156141165790509050612710808204905090506101e05261018051602f5480820282158284830414171561411657905090506127108082049050905061020052610200516101e051818183011061411657808201905090506101c0518181830110614116578082019050905061022052610180516102205111156140095761018051610220525b60006102205111156140c5573060c0526102205160e05261402b6102606136f7565b610260516102405260006101e051111561408a576101e05161024051808202821582848304141715614116579050905061022051808015614116578204905090506102605230604052610160516060526102605160805261408a613551565b600060073060205260005260406000205411156140c55730604052602d546060526007306020526000526040600020546080526140c5613551565b7f5c971a56b919bc03cfcc69b3500de2c9400b81ff5977e541c5075e04348756f56101c0516102405261020051610260526101e051610280526101a0516102a0526080610240a1610220518152505b565b600080fd
```
