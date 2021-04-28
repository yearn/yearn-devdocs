# Vault.vy


**Yearn Token Vault**





*Yearn Token Vault. Holds an underlying token, and allows users to interact with the Yearn ecosystem through Strategies connected to the Vault. Vaults are not limited to a single Strategy, they can have as many Strategies as can be designed (however the withdrawal queue is capped at 20.) Deposited funds are moved into the most impactful strategy that has not already reached its limit for assets under management, regardless of which Strategy a user's funds end up in, they receive their portion of yields generated across all Strategies. When a user withdraws, if there are no funds sitting undeployed in the Vault, the Vault withdraws funds from Strategies in the order of least impact. (Funds are taken from the Strategy that will disturb everyone's gains the least, then the next least, etc.) In order to achieve this, the withdrawal queue's order must be properly set and managed by the community (through governance). Vault Strategies are parameterized to pursue the highest risk-adjusted yield. There is an "Emergency Shutdown" mode. When the Vault is put into emergency shutdown, assets will be recalled from the Strategies as quickly as is practical (given on-chain conditions), minimizing loss. Deposits are halted, new Strategies may not be added, and each Strategy exits with the minimum possible damage to position, while opening up deposits to be withdrawn by users. There are no restrictions on withdrawals above what is expected under Normal Operation. For further details, please refer to the specification: https://github.com/iearn-finance/yearn-vaults/blob/master/SPECIFICATION.md*


## Functions



### initialize
```solidity
function initialize(address,address,address,string,string)
```


@notice Initializes the Vault, this is called only once, when the contract is deployed. The performance fee is set to 10% of yield, per Strategy. The management fee is set to 2%, per year. The initial deposit limit is set to 0 (deposits disabled); it must be updated after initialization.    


*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;y&#39; combined with the symbol of `token`.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into this Vault. * |
|  * governance * |  *  * |  * The address authorized for governance interactions. * |
|  * rewards * |  *  * |  * The address to distribute rewards to. * |
|  * nameOverride * |  *  * |  * Specify a custom Vault name. Leave empty for default choice. * |
|  * symbolOverride * |  *  * |  * Specify a custom Vault symbol name. Leave empty for default choice. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions. Defaults to caller. * |







### initialize
```solidity
function initialize(address,address,address,string,string,address)
```



*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;y&#39; combined with the symbol of `token`.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token that may be deposited into this Vault. * |
|  * governance * |  *  * |  * The address authorized for governance interactions. * |
|  * rewards * |  *  * |  * The address to distribute rewards to. * |
|  * nameOverride * |  *  * |  * Specify a custom Vault name. Leave empty for default choice. * |
|  * symbolOverride * |  *  * |  * Specify a custom Vault symbol name. Leave empty for default choice. * |
|  * guardian * |  *  * |  * The address authorized for guardian interactions. Defaults to caller. * |







### apiVersion
```solidity
function apiVersion()
```


@notice Used to track the deployed version of this contract. In practice you can use this version number to compare with Yearn&#39;s GitHub and determine which version of the source matches this deployed contract.    


*All strategies must have an `apiVersion()` that matches the Vault&#39;s `API_VERSION`.*



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * API_VERSION which holds the current version of this contract. * |






### setName
```solidity
function setName(string)
```


@notice Used to change the value of `name`. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * name * |  *  * |  * The new name to use. * |







### setSymbol
```solidity
function setSymbol(string)
```


@notice Used to change the value of `symbol`. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * symbol * |  *  * |  * The new symbol to use. * |







### setGovernance
```solidity
function setGovernance(address)
```


@notice Nominate a new address to use as governance. The change does not go into effect immediately. This function sets a pending change, and the governance address is not updated until the proposed governance address has accepted the responsibility. This may only be called by the current governance address.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * governance * |  *  * |  * The address requested to take over Vault governance. * |







### acceptGovernance
```solidity
function acceptGovernance()
```


@notice Once a new governance address has been proposed using setGovernance(), this function may be called by the proposed address to accept the responsibility of taking over governance for this contract. This may only be called by the proposed governance address.    


*setGovernance() should be called by the existing governance address, prior to calling this function.*







### setManagement
```solidity
function setManagement(address)
```


@notice Changes the management address. Management is able to make some investment decisions adjusting parameters. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * management * |  *  * |  * The address to use for managing. * |







### setGuestList
```solidity
function setGuestList(address)
```


@notice Used to set or change `guestList`. A guest list is another contract that dictates who is allowed to participate in a Vault (and transfer shares). This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * guestList * |  *  * |  * The address of the `GuestList` contract to use. * |







### setRewards
```solidity
function setRewards(address)
```


@notice Changes the rewards address. Any distributed rewards will cease flowing to the old address and begin flowing to this address once the change is in effect. This will not change any Strategy reports in progress, only new reports made after this change goes into effect. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * rewards * |  *  * |  * The address to use for collecting rewards. * |







### setLockedProfitDegration
```solidity
function setLockedProfitDegration(uint256)
```


@notice Changes the locked profit degration.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * degration * |  *  * |  * The rate of degration in percent per second scaled to 1e18. * |







### setDepositLimit
```solidity
function setDepositLimit(uint256)
```


@notice Changes the maximum amount of tokens that can be deposited in this Vault. Note, this is not how much may be deposited by a single depositor, but the maximum amount that may be deposited across all depositors. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * limit * |  *  * |  * The new deposit limit to use. * |







### setPerformanceFee
```solidity
function setPerformanceFee(uint256)
```


@notice Used to change the value of `performanceFee`. Should set this value below the maximum strategist performance fee. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * fee * |  *  * |  * The new performance fee to use. * |







### setManagementFee
```solidity
function setManagementFee(uint256)
```


@notice Used to change the value of `managementFee`. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * fee * |  *  * |  * The new management fee to use. * |







### setGuardian
```solidity
function setGuardian(address)
```


@notice Used to change the address of `guardian`. This may only be called by governance or the existing guardian.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * guardian * |  *  * |  * The new guardian address to use. * |







### setEmergencyShutdown
```solidity
function setEmergencyShutdown(bool)
```


@notice Activates or deactivates Vault mode where all Strategies go into full withdrawal. During Emergency Shutdown: 1. No Users may deposit into the Vault (but may withdraw as usual.) 2. Governance may not add new Strategies. 3. Each Strategy must pay back their debt as quickly as reasonable to minimally affect their position. 4. Only Governance may undo Emergency Shutdown. See contract level note for further details. This may only be called by governance or the guardian.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * active * |  *  * |  * If true, the Vault goes into Emergency Shutdown. If false, the Vault goes back into Normal Operation. * |







### setWithdrawalQueue
```solidity
function setWithdrawalQueue(address[20])
```


@notice Updates the withdrawalQueue to match the addresses and order specified by `queue`. There can be fewer strategies than the maximum, as well as fewer than the total number of strategies active in the vault. `withdrawalQueue` will be updated in a gas-efficient manner, assuming the input is well- ordered with 0x0 only at the end. This may only be called by governance or management.    


*This is order sensitive, specify the addresses in the order in which funds should be withdrawn (so `queue`[0] is the first Strategy withdrawn from, `queue`[1] is the second, etc.) This means that the least impactful Strategy (the Strategy that will have its core positions impacted the least by having funds removed) should be at `queue`[0], then the next least impactful at `queue`[1], and so on.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * queue * |  *  * |  * The array of addresses to use as the new withdrawal queue. This is order sensitive. * |







### transfer
```solidity
function transfer(address,uint256)
```


@notice Transfers shares from the caller&#39;s address to `receiver`. This function will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * receiver * |  *  * |  * The address shares are being transferred to. Must not be this contract's address, must not be 0x0. * |
|  * amount * |  *  * |  * The quantity of shares to transfer. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail. * |






### transferFrom
```solidity
function transferFrom(address,address,uint256)
```


@notice Transfers `amount` shares from `sender` to `receiver`. This operation will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0. Unless the caller has given this contract unlimited approval, transfering shares will decrement the caller&#39;s `allowance` by `amount`.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * sender * |  *  * |  * The address shares are being transferred from. * |
|  * receiver * |  *  * |  * The address shares are being transferred to. Must not be this contract's address, must not be 0x0. * |
|  * amount * |  *  * |  * The quantity of shares to transfer. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail. * |






### approve
```solidity
function approve(address,uint256)
```



*Approve the passed address to spend the specified amount of tokens on behalf of `msg.sender`. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * spender * |  *  * |  * The address which will spend the funds. * |
|  * amount * |  *  * |  * The amount of tokens to be spent. * |







### increaseAllowance
```solidity
function increaseAllowance(address,uint256)
```



*Increase the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * spender * |  *  * |  * The address which will spend the funds. * |
|  * amount * |  *  * |  * The amount of tokens to increase the allowance by. * |







### decreaseAllowance
```solidity
function decreaseAllowance(address,uint256)
```



*Decrease the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * spender * |  *  * |  * The address which will spend the funds. * |
|  * amount * |  *  * |  * The amount of tokens to decrease the allowance by. * |







### permit
```solidity
function permit(address,address,uint256,uint256,bytes)
```


@notice Approves spender by owner&#39;s signature to expend owner&#39;s tokens. See https://eips.ethereum.org/EIPS/eip-2612.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * owner * |  *  * |  * The address which is a source of funds and has signed the Permit. * |
|  * spender * |  *  * |  * The address which is allowed to spend the funds. * |
|  * amount * |  *  * |  * The amount of tokens to be spent. * |
|  * expiry * |  *  * |  * The timestamp after which the Permit is no longer valid. * |
|  * signature * |  *  * |  * A valid secp256k1 signature of Permit by owner encoded as r, s, v. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * True, if transaction completes successfully * |






### totalAssets
```solidity
function totalAssets()
```


@notice Returns the total quantity of all assets under control of this Vault, whether they&#39;re loaned out to a Strategy, or currently held in the Vault.    




#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The total assets under control of this Vault. * |






### deposit
```solidity
function deposit()
```


@notice Deposits `_amount` `token`, issuing shares to `recipient`. If the Vault is in Emergency Shutdown, deposits will not be accepted and this call will fail.    


*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * _amount * |  *  * |  * The quantity of tokens to deposit, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The issued Vault shares. * |






### deposit
```solidity
function deposit(uint256)
```



*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * _amount * |  *  * |  * The quantity of tokens to deposit, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The issued Vault shares. * |






### deposit
```solidity
function deposit(uint256,address)
```



*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * _amount * |  *  * |  * The quantity of tokens to deposit, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The issued Vault shares. * |






### maxAvailableShares
```solidity
function maxAvailableShares()
```


@notice Determines the maximum quantity of shares this Vault can facilitate a withdrawal for, factoring in assets currently residing in the Vault, as well as those deployed to strategies on the Vault&#39;s balance sheet.    


*Regarding how shares are calculated, see dev note on `deposit`. If you want to calculated the maximum a user could withdraw up to, you want to use this function. Note that the amount provided by this function is the theoretical maximum possible from withdrawing, the real amount depends on the realized losses incurred during withdrawal.*



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The total quantity of shares this Vault can provide. * |






### withdraw
```solidity
function withdraw()
```


@notice Withdraws the calling account&#39;s tokens from this Vault, redeeming amount `_shares` for an appropriate amount of tokens. See note on `setWithdrawalQueue` for further details of withdrawal ordering and behavior.    


*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * maxShares * |  *  * |  * How many shares to try and redeem for tokens, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |
|  * maxLoss * |  *  * |  * The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens redeemed for `_shares`. * |






### withdraw
```solidity
function withdraw(uint256)
```



*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * maxShares * |  *  * |  * How many shares to try and redeem for tokens, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |
|  * maxLoss * |  *  * |  * The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens redeemed for `_shares`. * |






### withdraw
```solidity
function withdraw(uint256,address)
```



*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * maxShares * |  *  * |  * How many shares to try and redeem for tokens, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |
|  * maxLoss * |  *  * |  * The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens redeemed for `_shares`. * |






### withdraw
```solidity
function withdraw(uint256,address,uint256)
```



*Measuring the value of shares is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On withdrawal, this means that shares are redeemed against the total amount that the deposited capital had &#34;realized&#34; since the point it was deposited, up until the point it was withdrawn. If that number were to be higher than the &#34;expected value&#34; at some future point, withdrawing shares via this method could entitle the depositor to *more* than the expected value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Under exceptional scenarios, this could cause earlier withdrawals to earn &#34;more&#34; of the underlying assets than Users might otherwise be entitled to, if the Vault&#39;s estimated value were otherwise measured through external means, accounting for whatever exceptional scenarios exist for the Vault (that aren&#39;t covered by the Vault&#39;s own design.)*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * maxShares * |  *  * |  * How many shares to try and redeem for tokens, defaults to all. * |
|  * recipient * |  *  * |  * The address to issue the shares in this Vault to. Defaults to the caller's address. * |
|  * maxLoss * |  *  * |  * The maximum acceptable loss to sustain on withdrawal. Defaults to 0.01%. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens redeemed for `_shares`. * |






### pricePerShare
```solidity
function pricePerShare()
```


@notice Gives the price for a single Vault share.    


*See dev note on `withdraw`.*



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The value of a single share. * |






### addStrategy
```solidity
function addStrategy(address,uint256,uint256,uint256,uint256)
```


@notice Add a Strategy to the Vault. This may only be called by governance.    


*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The address of the Strategy to add. * |
|  * debtRatio * |  *  * |  * The share of the total assets in the `vault that the `strategy` has access to. * |
|  * minDebtPerHarvest * |  *  * |  * Lower limit on the increase of debt since last harvest * |
|  * maxDebtPerHarvest * |  *  * |  * Upper limit on the increase of debt since last harvest * |
|  * performanceFee * |  *  * |  * The fee the strategist will receive based on this Vault's performance. * |







### updateStrategyDebtRatio
```solidity
function updateStrategyDebtRatio(address,uint256)
```


@notice Change the quantity of assets `strategy` may manage. This may be called by governance or management.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to update. * |
|  * debtRatio * |  *  * |  * The quantity of assets `strategy` may now manage. * |







### updateStrategyMinDebtPerHarvest
```solidity
function updateStrategyMinDebtPerHarvest(address,uint256)
```


@notice Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to update. * |
|  * minDebtPerHarvest * |  *  * |  * Lower limit on the increase of debt since last harvest * |







### updateStrategyMaxDebtPerHarvest
```solidity
function updateStrategyMaxDebtPerHarvest(address,uint256)
```


@notice Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to update. * |
|  * maxDebtPerHarvest * |  *  * |  * Upper limit on the increase of debt since last harvest * |







### updateStrategyPerformanceFee
```solidity
function updateStrategyPerformanceFee(address,uint256)
```


@notice Change the fee the strategist will receive based on this Vault&#39;s performance. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to update. * |
|  * performanceFee * |  *  * |  * The new fee the strategist will receive. * |







### migrateStrategy
```solidity
function migrateStrategy(address,address)
```


@notice Migrates a Strategy, including all assets from `oldVersion` to `newVersion`. This may only be called by governance.    


*Strategy must successfully migrate all capital and positions to new Strategy, or else this will upset the balance of the Vault. The new Strategy should be &#34;empty&#34; e.g. have no prior commitments to this Vault, otherwise it could have issues.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * oldVersion * |  *  * |  * The existing Strategy to migrate from. * |
|  * newVersion * |  *  * |  * The new Strategy to migrate to. * |







### revokeStrategy
```solidity
function revokeStrategy()
```


@notice Revoke a Strategy, setting its debt limit to 0 and preventing any future deposits. This function should only be used in the scenario where the Strategy is being retired but no migration of the positions are possible, or in the extreme scenario that the Strategy needs to be put into &#34;Emergency Exit&#34; mode in order for it to exit as quickly as possible. The latter scenario could be for any reason that is considered &#34;critical&#34; that the Strategy exits its position as fast as possible, such as a sudden change in market conditions leading to losses, or an imminent failure in an external dependency. This may only be called by governance, the guardian, or the Strategy itself. Note that a Strategy will only revoke itself during emergency shutdown.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to revoke. * |







### revokeStrategy
```solidity
function revokeStrategy(address)
```




#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to revoke. * |







### addStrategyToQueue
```solidity
function addStrategyToQueue(address)
```


@notice Adds `strategy` to `withdrawalQueue`. This may only be called by governance or management.    


*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to add. * |







### removeStrategyFromQueue
```solidity
function removeStrategyFromQueue(address)
```


@notice Remove `strategy` from `withdrawalQueue`. This may only be called by governance or management.    


*We don&#39;t do this with revokeStrategy because it should still be possible to withdraw from the Strategy if it&#39;s unwinding.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to remove. * |







### debtOutstanding
```solidity
function debtOutstanding()
```


@notice Determines if `strategy` is past its debt limit and if any tokens should be withdrawn to the Vault.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to check. Defaults to the caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens to withdraw. * |






### debtOutstanding
```solidity
function debtOutstanding(address)
```




#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to check. Defaults to the caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens to withdraw. * |






### creditAvailable
```solidity
function creditAvailable()
```


@notice Amount of tokens in Vault a Strategy has access to as a credit line. This will check the Strategy&#39;s debt limit, as well as the tokens available in the Vault, and determine the maximum amount of tokens (if any) the Strategy may draw on. In the rare case the Vault is in emergency shutdown this will return 0.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to check. Defaults to caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens available for the Strategy to draw on. * |






### creditAvailable
```solidity
function creditAvailable(address)
```




#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to check. Defaults to caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The quantity of tokens available for the Strategy to draw on. * |






### expectedReturn
```solidity
function expectedReturn()
```


@notice Provide an accurate expected value for the return this `strategy` would provide to the Vault the next time `report()` is called (since the last time it was called).    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to determine the expected return for. Defaults to caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The anticipated amount `strategy` should make on its investment since its last report. * |






### expectedReturn
```solidity
function expectedReturn(address)
```




#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * strategy * |  *  * |  * The Strategy to determine the expected return for. Defaults to caller. * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * The anticipated amount `strategy` should make on its investment since its last report. * |






### report
```solidity
function report(uint256,uint256,uint256)
```


@notice Reports the amount of assets the calling Strategy has free (usually in terms of ROI). The performance fee is determined here, off of the strategy&#39;s profits (if any), and sent to governance. The strategist&#39;s fee is also determined here (off of profits), to be handled according to the strategist on the next harvest. This may only be called by a Strategy managed by this Vault.    


*For approved strategies, this is the most efficient behavior. The Strategy reports back what it has free, then Vault &#34;decides&#34; whether to take some back or give it more. Note that the most it can take is `gain + _debtPayment`, and the most it can give is all of the remaining reserves. Anything outside of those bounds is abnormal behavior. All approved strategies must have increased diligence around calling this function, as abnormal behavior could become catastrophic.*


#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * gain * |  *  * |  * Amount Strategy has realized as a gain on it's investment since its last report, and is free to be given back to Vault as earnings * |
|  * loss * |  *  * |  * Amount Strategy has realized as a loss on it's investment since its last report, and should be accounted for on the Vault's balance sheet * |
|  * _debtPayment * |  *  * |  * Amount Strategy has made available to cover outstanding debt * |



#### Return Values:
| Description                                                                  |
| :--------------------------------------------------------------------------- |
|  * Amount of debt outstanding (if totalDebt > debtLimit or emergency shutdown). * |






### sweep
```solidity
function sweep(address)
```


@notice Removes tokens from this Vault that are not the type of token managed by this Vault. This may be used in case of accidentally sending the wrong kind of token to this Vault. Tokens will be sent to `governance`. This will fail if an attempt is made to sweep the tokens that this Vault manages. This may only be called by governance.    



#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token to transfer out of this vault. * |
|  * amount * |  *  * |  * The quantity or tokenId to transfer out. * |







### sweep
```solidity
function sweep(address,uint256)
```




#### Parameters:
| Name                           | Type          | Description                                    |
| :----------------------------- | :------------ | :--------------------------------------------- |
|  * token * |  *  * |  * The token to transfer out of this vault. * |
|  * amount * |  *  * |  * The quantity or tokenId to transfer out. * |









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
* `minDebtPerHarvest` : uint256, *notIndexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*
* `performanceFee` : uint256, *notIndexed*

**StrategyReported**

* `strategy` : address, *indexed*
* `gain` : uint256, *notIndexed*
* `loss` : uint256, *notIndexed*
* `debtPaid` : uint256, *notIndexed*
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

**StrategyUpdateMinDebtPerHarvest**

* `strategy` : address, *indexed*
* `minDebtPerHarvest` : uint256, *notIndexed*

**StrategyUpdateMaxDebtPerHarvest**

* `strategy` : address, *indexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*

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

