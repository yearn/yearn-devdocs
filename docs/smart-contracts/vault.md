# Vault.vy
> vyper: `0.2.12`
> author: `yearn.finance`
> license: `GNU AGPLv3`


**Yearn Token Vault**





*Yearn Token Vault. Holds an underlying token, and allows users to interact with the Yearn ecosystem through Strategies connected to the Vault. Vaults are not limited to a single Strategy, they can have as many Strategies as can be designed (however the withdrawal queue is capped at 20.) Deposited funds are moved into the most impactful strategy that has not already reached its limit for assets under management, regardless of which Strategy a user's funds end up in, they receive their portion of yields generated across all Strategies. When a user withdraws, if there are no funds sitting undeployed in the Vault, the Vault withdraws funds from Strategies in the order of least impact. (Funds are taken from the Strategy that will disturb everyone's gains the least, then the next least, etc.) In order to achieve this, the withdrawal queue's order must be properly set and managed by the community (through governance). Vault Strategies are parameterized to pursue the highest risk-adjusted yield. There is an "Emergency Shutdown" mode. When the Vault is put into emergency shutdown, assets will be recalled from the Strategies as quickly as is practical (given on-chain conditions), minimizing loss. Deposits are halted, new Strategies may not be added, and each Strategy exits with the minimum possible damage to position, while opening up deposits to be withdrawn by users. There are no restrictions on withdrawals above what is expected under Normal Operation. For further details, please refer to the specification: https://github.com/iearn-finance/yearn-vaults/blob/main/SPECIFICATION.md*



## Events


{{< hint info >}}
**Transfer**

* `sender` : address, *indexed*
* `receiver` : address, *indexed*
* `value` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**Approval**

* `owner` : address, *indexed*
* `spender` : address, *indexed*
* `value` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyAdded**

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*
* `minDebtPerHarvest` : uint256, *notIndexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*
* `performanceFee` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
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
{{< /hint >}}

{{< hint info >}}
**UpdateGovernance**

* `governance` : address, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateManagement**

* `management` : address, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateRewards**

* `rewards` : address, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateDepositLimit**

* `depositLimit` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdatePerformanceFee**

* `performanceFee` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateManagementFee**

* `managementFee` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateGuardian**

* `guardian` : address, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**EmergencyShutdown**

* `active` : bool, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**UpdateWithdrawalQueue**

* `queue` : address[20], *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyUpdateDebtRatio**

* `strategy` : address, *indexed*
* `debtRatio` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyUpdateMinDebtPerHarvest**

* `strategy` : address, *indexed*
* `minDebtPerHarvest` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyUpdateMaxDebtPerHarvest**

* `strategy` : address, *indexed*
* `maxDebtPerHarvest` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyUpdatePerformanceFee**

* `strategy` : address, *indexed*
* `performanceFee` : uint256, *notIndexed*
{{< /hint >}}

{{< hint info >}}
**StrategyMigrated**

* `oldVersion` : address, *indexed*
* `newVersion` : address, *indexed*
{{< /hint >}}

{{< hint info >}}
**StrategyRevoked**

* `strategy` : address, *indexed*
{{< /hint >}}

{{< hint info >}}
**StrategyRemovedFromQueue**

* `strategy` : address, *indexed*
{{< /hint >}}

{{< hint info >}}
**StrategyAddedToQueue**

* `strategy` : address, *indexed*
{{< /hint >}}


## Methods

### initialize
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
    





### initialize
> type: `nonpayable function`
> 



*If `nameOverride` is not specified, the name will be &#39;yearn&#39; combined with the name of `token`. If `symbolOverride` is not specified, the symbol will be &#39;yv&#39; combined with the symbol of `token`. The token used by the vault should not change balances outside transfers and it must transfer the exact amount requested. Fee on transfer and rebasing are not supported.*


Arguments:
    
* `token`:  - *The token that may be deposited into this Vault.*
    
* `governance`:  - *The address authorized for governance interactions.*
    
* `rewards`:  - *The address to distribute rewards to.*
    
* `management`:  - *The address of the vault manager.*
    
* `nameOverride`:  - *Specify a custom Vault name. Leave empty for default choice.*
    
* `symbolOverride`:  - *Specify a custom Vault symbol name. Leave empty for default choice.*
    
* `guardian`:  - *The address authorized for guardian interactions. Defaults to caller.*
    





### initialize
> type: `nonpayable function`
> 



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
> type: `pure function`
> gas: `5946`


Used to track the deployed version of this contract. In practice you can use this version number to compare with Yearn&#39;s GitHub and determine which version of the source matches this deployed contract.    


*All strategies must have an `apiVersion()` that matches the Vault&#39;s `API_VERSION`.*



Returns:

* `_0` - API_VERSION which holds the current version of this contract.





### setName
> type: `nonpayable function`
> gas: `108344`


Used to change the value of `name`. This may only be called by governance.    



Arguments:
    
* `name`:  - *The new name to use.*
    





### setSymbol
> type: `nonpayable function`
> gas: `73194`


Used to change the value of `symbol`. This may only be called by governance.    



Arguments:
    
* `symbol`:  - *The new symbol to use.*
    





### setGovernance
> type: `nonpayable function`
> gas: `37665`


Nominate a new address to use as governance. The change does not go into effect immediately. This function sets a pending change, and the governance address is not updated until the proposed governance address has accepted the responsibility. This may only be called by the current governance address.    



Arguments:
    
* `governance`:  - *The address requested to take over Vault governance.*
    





### acceptGovernance
> type: `nonpayable function`
> gas: `38937`


Once a new governance address has been proposed using setGovernance(), this function may be called by the proposed address to accept the responsibility of taking over governance for this contract. This may only be called by the proposed governance address.    


*setGovernance() should be called by the existing governance address, prior to calling this function.*






### setManagement
> type: `nonpayable function`
> gas: `39075`


Changes the management address. Management is able to make some investment decisions adjusting parameters. This may only be called by governance.    



Arguments:
    
* `management`:  - *The address to use for managing.*
    





### setRewards
> type: `nonpayable function`
> gas: `39626`


Changes the rewards address. Any distributed rewards will cease flowing to the old address and begin flowing to this address once the change is in effect. This will not change any Strategy reports in progress, only new reports made after this change goes into effect. This may only be called by governance.    



Arguments:
    
* `rewards`:  - *The address to use for collecting rewards.*
    





### setLockedProfitDegradation
> type: `nonpayable function`
> gas: `37789`


Changes the locked profit degradation.    



Arguments:
    
* `degradation`:  - *The rate of degradation in percent per second scaled to 1e18.*
    





### setDepositLimit
> type: `nonpayable function`
> gas: `39065`


Changes the maximum amount of tokens that can be deposited in this Vault. Note, this is not how much may be deposited by a single depositor, but the maximum amount that may be deposited across all depositors. This may only be called by governance.    



Arguments:
    
* `limit`:  - *The new deposit limit to use.*
    





### setPerformanceFee
> type: `nonpayable function`
> gas: `39199`


Used to change the value of `performanceFee`. Should set this value below the maximum strategist performance fee. This may only be called by governance.    



Arguments:
    
* `fee`:  - *The new performance fee to use.*
    





### setManagementFee
> type: `nonpayable function`
> gas: `39229`


Used to change the value of `managementFee`. This may only be called by governance.    



Arguments:
    
* `fee`:  - *The new management fee to use.*
    





### setGuardian
> type: `nonpayable function`
> gas: `41773`


Used to change the address of `guardian`. This may only be called by governance or the existing guardian.    



Arguments:
    
* `guardian`:  - *The new guardian address to use.*
    





### setEmergencyShutdown
> type: `nonpayable function`
> gas: `41844`


Activates or deactivates Vault mode where all Strategies go into full withdrawal. During Emergency Shutdown: 1. No Users may deposit into the Vault (but may withdraw as usual.) 2. Governance may not add new Strategies. 3. Each Strategy must pay back their debt as quickly as reasonable to minimally affect their position. 4. Only Governance may undo Emergency Shutdown. See contract level note for further details. This may only be called by governance or the guardian.    



Arguments:
    
* `active`:  - *If true, the Vault goes into Emergency Shutdown. If false, the Vault goes back into Normal Operation.*
    





### setWithdrawalQueue
> type: `nonpayable function`
> gas: `1090134`


Updates the withdrawalQueue to match the addresses and order specified by `queue`. There can be fewer strategies than the maximum, as well as fewer than the total number of strategies active in the vault. `withdrawalQueue` will be updated in a gas-efficient manner, assuming the input is well- ordered with 0x0 only at the end. This may only be called by governance or management.    


*This is order sensitive, specify the addresses in the order in which funds should be withdrawn (so `queue`[0] is the first Strategy withdrawn from, `queue`[1] is the second, etc.) This means that the least impactful Strategy (the Strategy that will have its core positions impacted the least by having funds removed) should be at `queue`[0], then the next least impactful at `queue`[1], and so on.*


Arguments:
    
* `queue`:  - *The array of addresses to use as the new withdrawal queue. This is order sensitive.*
    





### transfer
> type: `nonpayable function`
> gas: `79308`


Transfers shares from the caller&#39;s address to `receiver`. This function will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0.    



Arguments:
    
* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*
    
* `amount`:  - *The quantity of shares to transfer.*
    


Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.





### transferFrom
> type: `nonpayable function`
> gas: `121671`


Transfers `amount` shares from `sender` to `receiver`. This operation will always return true, unless the user is attempting to transfer shares to this contract&#39;s address, or to 0x0. Unless the caller has given this contract unlimited approval, transfering shares will decrement the caller&#39;s `allowance` by `amount`.    



Arguments:
    
* `sender`:  - *The address shares are being transferred from.*
    
* `receiver`:  - *The address shares are being transferred to. Must not be this contract's address, must not be 0x0.*
    
* `amount`:  - *The quantity of shares to transfer.*
    


Returns:

* `_0` - True if transfer is sent to an address other than this contract's or 0x0, otherwise the transaction will fail.





### approve
> type: `nonpayable function`
> gas: `38241`



*Approve the passed address to spend the specified amount of tokens on behalf of `msg.sender`. Beware that changing an allowance with this method brings the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


Arguments:
    
* `spender`:  - *The address which will spend the funds.*
    
* `amount`:  - *The amount of tokens to be spent.*
    





### increaseAllowance
> type: `nonpayable function`
> gas: `42882`



*Increase the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


Arguments:
    
* `spender`:  - *The address which will spend the funds.*
    
* `amount`:  - *The amount of tokens to increase the allowance by.*
    





### decreaseAllowance
> type: `nonpayable function`
> gas: `42906`



*Decrease the allowance of the passed address to spend the total amount of tokens on behalf of msg.sender. This method mitigates the risk that someone may use both the old and the new allowance by unfortunate transaction ordering. See https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729*


Arguments:
    
* `spender`:  - *The address which will spend the funds.*
    
* `amount`:  - *The amount of tokens to decrease the allowance by.*
    





### permit
> type: `nonpayable function`
> gas: `91494`


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
> type: `view function`
> gas: `8698`


Returns the total quantity of all assets under control of this Vault, whether they&#39;re loaned out to a Strategy, or currently held in the Vault.    




Returns:

* `_0` - The total assets under control of this Vault.





### deposit
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
> type: `nonpayable function`
> 



*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*


Arguments:
    
* `_amount`:  - *The quantity of tokens to deposit, defaults to all.*
    
* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*
    


Returns:

* `_0` - The issued Vault shares.





### deposit
> type: `nonpayable function`
> 



*Measuring quantity of shares to issues is based on the total outstanding debt that this contract has (&#34;expected value&#34;) instead of the total balance sheet it has (&#34;estimated value&#34;) has important security considerations, and is done intentionally. If this value were measured against external systems, it could be purposely manipulated by an attacker to withdraw more assets than they otherwise should be able to claim by redeeming their shares. On deposit, this means that shares are issued against the total amount that the deposited capital can be given in service of the debt that Strategies assume. If that number were to be lower than the &#34;expected value&#34; at some future point, depositing shares via this method could entitle the depositor to *less* than the deposited value once the &#34;realized value&#34; is updated from further reports by the Strategies to the Vaults. Care should be taken by integrators to account for this discrepancy, by using the view-only methods of this contract (both off-chain and on-chain) to determine if depositing into the Vault is a &#34;good idea&#34;.*


Arguments:
    
* `_amount`:  - *The quantity of tokens to deposit, defaults to all.*
    
* `recipient`:  - *The address to issue the shares in this Vault to. Defaults to the caller's address.*
    


Returns:

* `_0` - The issued Vault shares.





### maxAvailableShares
> type: `view function`
> gas: `1576655`


Determines the maximum quantity of shares this Vault can facilitate a withdrawal for, factoring in assets currently residing in the Vault, as well as those deployed to strategies on the Vault&#39;s balance sheet.    


*Regarding how shares are calculated, see dev note on `deposit`. If you want to calculated the maximum a user could withdraw up to, you want to use this function. Note that the amount provided by this function is the theoretical maximum possible from withdrawing, the real amount depends on the realized losses incurred during withdrawal.*



Returns:

* `_0` - The total quantity of shares this Vault can provide.





### withdraw
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
> type: `view function`
> gas: `77734`


Gives the price for a single Vault share.    


*See dev note on `withdraw`.*



Returns:

* `_0` - The value of a single share.





### addStrategy
> type: `nonpayable function`
> gas: `1523989`


Add a Strategy to the Vault. This may only be called by governance.    


*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*


Arguments:
    
* `strategy`:  - *The address of the Strategy to add.*
    
* `debtRatio`:  - *The share of the total assets in the `vault that the `strategy` has access to.*
    
* `minDebtPerHarvest`:  - *Lower limit on the increase of debt since last harvest*
    
* `maxDebtPerHarvest`:  - *Upper limit on the increase of debt since last harvest*
    
* `performanceFee`:  - *The fee the strategist will receive based on this Vault's performance.*
    





### updateStrategyDebtRatio
> type: `nonpayable function`
> gas: `124263`


Change the quantity of assets `strategy` may manage. This may be called by governance or management.    



Arguments:
    
* `strategy`:  - *The Strategy to update.*
    
* `debtRatio`:  - *The quantity of assets `strategy` may now manage.*
    





### updateStrategyMinDebtPerHarvest
> type: `nonpayable function`
> gas: `47611`


Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.    



Arguments:
    
* `strategy`:  - *The Strategy to update.*
    
* `minDebtPerHarvest`:  - *Lower limit on the increase of debt since last harvest*
    





### updateStrategyMaxDebtPerHarvest
> type: `nonpayable function`
> gas: `47641`


Change the quantity assets per block this Vault may deposit to or withdraw from `strategy`. This may only be called by governance or management.    



Arguments:
    
* `strategy`:  - *The Strategy to update.*
    
* `maxDebtPerHarvest`:  - *Upper limit on the increase of debt since last harvest*
    





### updateStrategyPerformanceFee
> type: `nonpayable function`
> gas: `42854`


Change the fee the strategist will receive based on this Vault&#39;s performance. This may only be called by governance.    



Arguments:
    
* `strategy`:  - *The Strategy to update.*
    
* `performanceFee`:  - *The new fee the strategist will receive.*
    





### migrateStrategy
> type: `nonpayable function`
> gas: `1190208`


Migrates a Strategy, including all assets from `oldVersion` to `newVersion`. This may only be called by governance.    


*Strategy must successfully migrate all capital and positions to new Strategy, or else this will upset the balance of the Vault. The new Strategy should be &#34;empty&#34; e.g. have no prior commitments to this Vault, otherwise it could have issues.*


Arguments:
    
* `oldVersion`:  - *The existing Strategy to migrate from.*
    
* `newVersion`:  - *The new Strategy to migrate to.*
    





### revokeStrategy
> type: `nonpayable function`
> 


Revoke a Strategy, setting its debt limit to 0 and preventing any future deposits. This function should only be used in the scenario where the Strategy is being retired but no migration of the positions are possible, or in the extreme scenario that the Strategy needs to be put into &#34;Emergency Exit&#34; mode in order for it to exit as quickly as possible. The latter scenario could be for any reason that is considered &#34;critical&#34; that the Strategy exits its position as fast as possible, such as a sudden change in market conditions leading to losses, or an imminent failure in an external dependency. This may only be called by governance, the guardian, or the Strategy itself. Note that a Strategy will only revoke itself during emergency shutdown.    



Arguments:
    
* `strategy`:  - *The Strategy to revoke.*
    





### revokeStrategy
> type: `nonpayable function`
> 




Arguments:
    
* `strategy`:  - *The Strategy to revoke.*
    





### addStrategyToQueue
> type: `nonpayable function`
> gas: `1255644`


Adds `strategy` to `withdrawalQueue`. This may only be called by governance or management.    


*The Strategy will be appended to `withdrawalQueue`, call `setWithdrawalQueue` to change the order.*


Arguments:
    
* `strategy`:  - *The Strategy to add.*
    





### removeStrategyFromQueue
> type: `nonpayable function`
> gas: `23636673`


Remove `strategy` from `withdrawalQueue`. This may only be called by governance or management.    


*We don&#39;t do this with revokeStrategy because it should still be possible to withdraw from the Strategy if it&#39;s unwinding.*


Arguments:
    
* `strategy`:  - *The Strategy to remove.*
    





### debtOutstanding
> type: `view function`
> 


Determines if `strategy` is past its debt limit and if any tokens should be withdrawn to the Vault.    



Arguments:
    
* `strategy`:  - *The Strategy to check. Defaults to the caller.*
    


Returns:

* `_0` - The quantity of tokens to withdraw.





### debtOutstanding
> type: `view function`
> 




Arguments:
    
* `strategy`:  - *The Strategy to check. Defaults to the caller.*
    


Returns:

* `_0` - The quantity of tokens to withdraw.





### creditAvailable
> type: `view function`
> 


Amount of tokens in Vault a Strategy has access to as a credit line. This will check the Strategy&#39;s debt limit, as well as the tokens available in the Vault, and determine the maximum amount of tokens (if any) the Strategy may draw on. In the rare case the Vault is in emergency shutdown this will return 0.    



Arguments:
    
* `strategy`:  - *The Strategy to check. Defaults to caller.*
    


Returns:

* `_0` - The quantity of tokens available for the Strategy to draw on.





### creditAvailable
> type: `view function`
> 




Arguments:
    
* `strategy`:  - *The Strategy to check. Defaults to caller.*
    


Returns:

* `_0` - The quantity of tokens available for the Strategy to draw on.





### expectedReturn
> type: `view function`
> 


Provide an accurate expected value for the return this `strategy` would provide to the Vault the next time `report()` is called (since the last time it was called).    



Arguments:
    
* `strategy`:  - *The Strategy to determine the expected return for. Defaults to caller.*
    


Returns:

* `_0` - The anticipated amount `strategy` should make on its investment since its last report.





### expectedReturn
> type: `view function`
> 




Arguments:
    
* `strategy`:  - *The Strategy to determine the expected return for. Defaults to caller.*
    


Returns:

* `_0` - The anticipated amount `strategy` should make on its investment since its last report.





### report
> type: `nonpayable function`
> gas: `1239256`


Reports the amount of assets the calling Strategy has free (usually in terms of ROI). The performance fee is determined here, off of the strategy&#39;s profits (if any), and sent to governance. The strategist&#39;s fee is also determined here (off of profits), to be handled according to the strategist on the next harvest. This may only be called by a Strategy managed by this Vault.    


*For approved strategies, this is the most efficient behavior. The Strategy reports back what it has free, then Vault &#34;decides&#34; whether to take some back or give it more. Note that the most it can take is `gain + _debtPayment`, and the most it can give is all of the remaining reserves. Anything outside of those bounds is abnormal behavior. All approved strategies must have increased diligence around calling this function, as abnormal behavior could become catastrophic.*


Arguments:
    
* `gain`:  - *Amount Strategy has realized as a gain on it's investment since its last report, and is free to be given back to Vault as earnings*
    
* `loss`:  - *Amount Strategy has realized as a loss on it's investment since its last report, and should be accounted for on the Vault's balance sheet. The loss will reduce the debtRatio. The next time the strategy will harvest, it will pay back the debt in an attempt to adjust to the new debt limit.*
    
* `_debtPayment`:  - *Amount Strategy has made available to cover outstanding debt*
    


Returns:

* `_0` - Amount of debt outstanding (if totalDebt > debtLimit or emergency shutdown).





### sweep
> type: `nonpayable function`
> 


Removes tokens from this Vault that are not the type of token managed by this Vault. This may be used in case of accidentally sending the wrong kind of token to this Vault. Tokens will be sent to `governance`. This will fail if an attempt is made to sweep the tokens that this Vault manages. This may only be called by governance.    



Arguments:
    
* `token`:  - *The token to transfer out of this vault.*
    
* `amount`:  - *The quantity or tokenId to transfer out.*
    





### sweep
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
    ],
    "gas": 5946
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
    "outputs": [],
    "gas": 108344
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
    "outputs": [],
    "gas": 73194
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
    "outputs": [],
    "gas": 37665
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "acceptGovernance",
    "inputs": [],
    "outputs": [],
    "gas": 38937
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
    "outputs": [],
    "gas": 39075
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
    "outputs": [],
    "gas": 39626
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
    "outputs": [],
    "gas": 37789
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
    "outputs": [],
    "gas": 39065
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
    "outputs": [],
    "gas": 39199
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
    "outputs": [],
    "gas": 39229
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
    "outputs": [],
    "gas": 41773
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
    "outputs": [],
    "gas": 41844
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
    "outputs": [],
    "gas": 1090134
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
    ],
    "gas": 79308
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
    ],
    "gas": 121671
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
    ],
    "gas": 38241
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
    ],
    "gas": 42882
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
    ],
    "gas": 42906
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
    ],
    "gas": 91494
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
    ],
    "gas": 8698
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
    ],
    "gas": 1576655
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
    ],
    "gas": 77734
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
    "outputs": [],
    "gas": 1523989
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
    "outputs": [],
    "gas": 124263
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
    "outputs": [],
    "gas": 47611
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
    "outputs": [],
    "gas": 47641
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
    "outputs": [],
    "gas": 42854
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
    "outputs": [],
    "gas": 1190208
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
    "outputs": [],
    "gas": 1255644
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
    "outputs": [],
    "gas": 23636673
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
    ],
    "gas": 21381
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
    ],
    "gas": 1239256
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
    ],
    "gas": 13920
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
    ],
    "gas": 11673
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
    ],
    "gas": 3678
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
    ],
    "gas": 3923
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
    ],
    "gas": 4168
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
    ],
    "gas": 3768
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
    ],
    "gas": 3798
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
    ],
    "gas": 3828
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
    ],
    "gas": 3858
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
    ],
    "gas": 3888
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
    ],
    "gas": 22641
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
    ],
    "gas": 4057
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
    ],
    "gas": 3978
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
    ],
    "gas": 4008
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
    ],
    "gas": 4038
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
    ],
    "gas": 4068
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
    ],
    "gas": 4098
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
    ],
    "gas": 4128
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
    ],
    "gas": 4158
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
    ],
    "gas": 4188
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
    ],
    "gas": 4218
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
    ],
    "gas": 4248
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
    ],
    "gas": 4278
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
    ],
    "gas": 4523
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
    ],
    "gas": 4338
  }
]
```

## Byte code
```bin
0x6152d056600436101561000d57613eb3565b600035601c52600051341561002157600080fd5b6383b4358981141561003c57336102205233610240526100b6565b63a5b81fdf81141561006d57336102405260a43560a01c1561005d57600080fd5b602060a4610220376000506100b6565b63538baeab8114156100b15760a43560a01c1561008957600080fd5b602060a46102203760c43560a01c156100a157600080fd5b602060c4610240376000506100b6565b610714565b60043560a01c156100c657600080fd5b60243560a01c156100d657600080fd5b60443560a01c156100e657600080fd5b606060643560040161014037604060643560040135111561010657600080fd5b60406084356004016101c037602060843560040135111561012657600080fd5b6012541561013357600080fd5b60043560065560006102a0526102a0805160208201209050610140805160208201209050141561027a576000606061034060046395d89b416102e0526102fc6004355afa61018057600080fd5b603f3d1161018d57600080fd5b6015610340610340510151106101a257600080fd5b60005061036060148060208461040001018260208501600060045af150508051820191505060076103a0527f20795661756c74000000000000000000000000000000000000000000000000006103c0526103a060078060208461040001018260208501600060045af15050805182019150508061040052610400905080600060c052602060c020602082510161012060006002818352015b8261012051602002111561024d5761026f565b61012051602002850151610120518501555b815160010180835281141561023a575b5050505050506102d5565b61014080600060c052602060c020602082510161012060006003818352015b826101205160200211156102ac576102ce565b61012051602002850151610120518501555b8151600101808352811415610299575b5050505050505b60006102a0526102a08051602082012090506101c0805160208201209050141561041657600060026102e0527f7976000000000000000000000000000000000000000000000000000000000000610300526102e060028060208461040001018260208501600060045af150508051820191505060606103a060046395d89b416103405261035c6004355afa61036957600080fd5b603f3d1161037657600080fd5b60156103a06103a05101511061038b57600080fd5b6000506103c060148060208461040001018260208501600060045af15050805182019150508061040052610400905080600160c052602060c020602082510161012060006002818352015b826101205160200211156103e95761040b565b61012051602002850151610120518501555b81516001018083528114156103d6575b505050505050610471565b6101c080600160c052602060c020602082510161012060006002818352015b826101205160200211156104485761046a565b61012051602002850151610120518501555b8151600101808352811415610435575b5050505050505b60206102e0600463313ce5676102805261029c6004355afa61049257600080fd5b601f3d1161049f57600080fd5b6000506102e051610260526102605160025561010061026051106104c257600080fd5b602435600755602435610280527f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b876020610280a16102405160085561024051610280527fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef4386020610280a1604435601555604435610280527fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d6020610280a16102205160095561022051610280527f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c6020610280a16103e86017556103e861028052610280516102a0527f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb60206102a0a160c860165560c861028052610280516102a0527f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf60206102a0a142601155426012556529d635a8e00060145560007f8b73c3c69bb8fe3d512ecc4cf759cc79239f7b179b0ffacaa9a75d522b39400f602082610660010152602081019050600b610540527f596561726e205661756c74000000000000000000000000000000000000000000610560526105408051602082012090506020826106600101526020810190506005610600527f302e342e3300000000000000000000000000000000000000000000000000000061062052610600805160208201209050602082610660010152602081019050466020826106600101526020810190503060208261066001015260208101905080610660526106609050805160208201209050601955005b63258294108114156107a9576005610140527f302e342e33000000000000000000000000000000000000000000000000000000610160526101408051602001806101e08284600060045af161076857600080fd5b50506101e0518061020001818260206001820306601f820103905003368237505060206101c05260406101e0510160206001820306601f82010390506101c0f35b63c47f002781141561083f57604a60043560040161014037602a6004356004013511156107d557600080fd5b60075433146107e357600080fd5b61014080600060c052602060c020602082510161012060006003818352015b8261012051602002111561081557610837565b61012051602002850151610120518501555b8151600101808352811415610802575b505050505050005b63b84c82468114156108d557603460043560040161014037601460043560040135111561086b57600080fd5b600754331461087957600080fd5b61014080600160c052602060c020602082510161012060006002818352015b826101205160200211156108ab576108cd565b61012051602002850151610120518501555b8151600101808352811415610898575b505050505050005b63ab033ea98114156109075760043560a01c156108f157600080fd5b60075433146108ff57600080fd5b600435600a55005b63238efcbc81141561095357600a54331461092157600080fd5b3360075533610140527f8d55d160c0009eb3d739442df0a3ca089ed64378bfac017e7ddad463f9815b876020610140a1005b63d4a22bde8114156109b35760043560a01c1561096f57600080fd5b600754331461097d57600080fd5b600435600855600435610140527fff54978127edd34aec0f9061fb3b155fbe0ededdfa881ee3e0d541d3a1eef4386020610140a1005b63ec38a862811415610a725760043560a01c156109cf57600080fd5b60075433146109dd57600080fd5b306101605260006101805260006101405261014061012060006002818352015b6101205160200261016001516004351415610a1b5760018352610a2b565b81516001018083528114156109fd575b5050506101405115610a3c57600080fd5b600435601555600435610140527fdf3c41a916aecbf42361a147f8348c242662c3ce20ecef30e826b80642477a3d6020610140a1005b637a550365811415610aab576007543314610a8c57600080fd5b670de0b6b3a76400006004351115610aa357600080fd5b600435601455005b63bdc8144b811415610afb576007543314610ac557600080fd5b600435600e55600435610140527fae565aab888bca5e19e25a13db7b0c9144305bf55cb0f3f4d724f730e5acdd626020610140a1005b6370897b23811415610b5c576007543314610b1557600080fd5b6113886004351115610b2657600080fd5b600435601755600435610140527f0810a1c261ca2c0cd86a0152c51c43ba9dc329639d2349f98140891b2ea798eb6020610140a1005b63fe56e232811415610bbd576007543314610b7657600080fd5b6127106004351115610b8757600080fd5b600435601655600435610140527f7a7883b0074f96e2c7fab65eb25abf624c488761a5db889e3bb84855dcc6daaf6020610140a1005b638a0dac4a811415610c6e5760043560a01c15610bd957600080fd5b600954610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610c185760018352610c28565b8151600101808352811415610bfc575b50505061014051610c3857600080fd5b600435600955600435610140527f837b9ad138a0a1839a9637afce5306a5c13e23eb63365686843a5319a243609c6020610140a1005b6314c64402811415610d3a5760043560011c15610c8a57600080fd5b60043515610cf657600954610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610cd15760018352610ce1565b8151600101808352811415610cb5575b50505061014051610cf157600080fd5b610d04565b6007543314610d0457600080fd5b600435600d55600435610140527fba40372a3a724dca3c57156128ef1e896724b65b37a17f190b1ad5de68f3a4f36020610140a1005b63941484158114156110c0576000610120525b610120516004013560a01c15610d6257600080fd5b6020610120510161012052610280610120511015610d7f57610d4d565b600854610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415610dbe5760018352610dce565b8151600101808352811415610da2575b50505061014051610dde57600080fd5b61028036610140376103c060006014818352015b6103c05160148110610e0357600080fd5b600c60c052602060c02001546101406103c05160148110610e2357600080fd5b602002015260046103c05160148110610e3b57600080fd5b60200201351515610e6e576101406103c05160148110610e5a57600080fd5b602002015115610e6957600080fd5b610ffc565b60006101406103c05160148110610e8457600080fd5b602002015118610e9357600080fd5b60006001600b60046103c05160148110610eac57600080fd5b602002013560e05260c052604060c02060c052602060c020015411610ed057600080fd5b60006103e05261040060006014818352015b60046104005160148110610ef557600080fd5b60200201351515610f0b5760016103e052610fa7565b6101406104005160148110610f1f57600080fd5b602002015160046103c05160148110610f3757600080fd5b60200201351415610f495760016103e0525b6103c05161040051111515610f5d57610f97565b60046104005160148110610f7057600080fd5b602002013560046103c05160148110610f8857600080fd5b602002013518610f9757600080fd5b8151600101808352811415610ee2575b50506103e051610fb657600080fd5b60046103c05160148110610fc957600080fd5b60200201356103c05160148110610fdf57600080fd5b600c60c052602060c02001555b8151600101808352811415610df2575b50506004356103c0526024356103e05260443561040052606435610420526084356104405260a4356104605260c4356104805260e4356104a052610104356104c052610124356104e0526101443561050052610164356105205261018435610540526101a435610560526101c435610580526101e4356105a052610204356105c052610224356105e052610244356106005261026435610620527f695ac3ac73f08f2002284ffe563cefe798ee2878a5e04219522e2e99eb89d1686102806103c0a1005b63a9059cbb8114156111125760043560a01c156110dc57600080fd5b3361014052600435610160526024356101805261018051610160516101405160065801614204565b600050600160005260206000f35b6323b872dd8114156112475760043560a01c1561112e57600080fd5b60243560a01c1561113e57600080fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460043560e05260c052604060c0203360e05260c052604060c02054101561120f57600460043560e05260c052604060c0203360e05260c052604060c02054604435808210156111af57600080fd5b808203905090506101405261014051600460043560e05260c052604060c0203360e05260c052604060c020556101405161016052336004357f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610160a35b60043561014052602435610160526044356101805261018051610160516101405160065801614204565b600050600160005260206000f35b63095ea7b38114156112c05760043560a01c1561126357600080fd5b60243560043360e05260c052604060c02060043560e05260c052604060c0205560243561014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f35b633950935181141561136d5760043560a01c156112dc57600080fd5b60043360e05260c052604060c02060043560e05260c052604060c020805460243581818301101561130c57600080fd5b8082019050905081555060043360e05260c052604060c02060043560e05260c052604060c0205461014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f35b63a457c2d78114156114185760043560a01c1561138957600080fd5b60043360e05260c052604060c02060043560e05260c052604060c0208054602435808210156113b757600080fd5b8082039050905081555060043360e05260c052604060c02060043560e05260c052604060c0205461014052600435337f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610140a3600160005260206000f35b639fd5a6cf8114156118155760043560a01c1561143457600080fd5b60243560a01c1561144457600080fd5b606160843560040161014037604160843560040135111561146457600080fd5b60006004351861147357600080fd5b606435151561148357600161148a565b4260643510155b61149357600080fd5b601860043560e05260c052604060c020546101e05260006002610520527f19010000000000000000000000000000000000000000000000000000000000006105405261052060028060208461078001018260208501600060045af150508051820191505060195460208261078001015260208101905060007f6e71edae12b1b97f4d1f60370fef10105fa2faae0126114a169c64845d6126c96020826106800101526020810190506004356020826106800101526020810190506024356020826106800101526020810190506044356020826106800101526020810190506101e0516020826106800101526020810190506064356020826106800101526020810190508061068052610680905080516020820120905060208261078001015260208101905080610780526107809050805160208201209050610200526000602060208206610300016101405182840111156115ed57600080fd5b6041806103208260206020880688030161014001600060045af150508181528090509050905080602001516000825180602090131561162b57600080fd5b809190121561163957600080fd5b806020036101000a82049050905090506102205260206020602082066103200161014051828401111561166b57600080fd5b6041806103408260206020880688030161014001600060045af15050818152809050905090508060200151600082518060209013156116a957600080fd5b80919012156116b757600080fd5b806020036101000a8204905090509050610240526040600160208206610340016101405182840111156116e957600080fd5b6041806103608260206020880688030161014001600060045af150508181528090509050905080602001516000825180602090131561172757600080fd5b809190121561173557600080fd5b806020036101000a8204905090509050610260526004356102005161028052610260516102a052610220516102c052610240516102e052602060c0608061028060015afa5060c0511461178757600080fd5b604435600460043560e05260c052604060c02060243560e05260c052604060c020556101e05160018181830110156117be57600080fd5b80820190509050601860043560e05260c052604060c02055604435610280526024356004357f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b9256020610280a3600160005260206000f35b6301e1d11481141561183b576006580161430f565b610140526101405160005260206000f35b63d0e30db0811415611876577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101405233610160526118d0565b63b6b55f2581141561189757336101605260206004610140376000506118d0565b636e553f658114156118cb57602060046101403760243560a01c156118bb57600080fd5b60206024610160376000506118d0565b611b2e565b601a54156118dd57600080fd5b6001601a55600d54156118ef57600080fd5b306101a05260006101c05260006101805261018061012060006002818352015b610120516020026101a0015161016051141561192e576001835261193e565b815160010180835281141561190f575b505050610180511561194f57600080fd5b61014051610180527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610180511415611a1957600e546101405161016051610180516006580161430f565b6101a0526101805261016052610140526101a051808210156119bb57600080fd5b80820390509050602061024060246370a082316101c052336101e0526101dc6006545afa6119e857600080fd5b601f3d116119f557600080fd5b6000506102405180821115611a0a5780611a0c565b815b9050905061018052611a6a565b600e546101405161016051610180516006580161430f565b6101a0526101805261016052610140526101a05161018051818183011015611a5857600080fd5b808201905090501115611a6a57600080fd5b60006101805111611a7a57600080fd5b6101405161016051610180516101a051610160516101c052610180516101e0526101e0516101c05160065801614493565b610240526101a052610180526101605261014052610240516101a0526101405161016051610180516101a0516006546101c052336101e0523061020052610180516102205261022051610200516101e0516101c05160065801614053565b6101a0526101805261016052610140526000506101a0516000526000601a5560206000f35b6375de2902811415611c8c5760206101e060246370a0823161016052306101805261017c6006545afa611b6057600080fd5b601f3d11611b6d57600080fd5b6000506101e051610200526101405161016051610180516101a0516101c0516101e051610200516102005161022052610220516006580161465e565b61028052610200526101e0526101c0526101a052610180526101605261014052610280516101405261018060006014818352015b61018051600c60c052602060c020015461016052610160511515611c0057611c7d565b61014080516101405161016051610180516006600b6101605160e05260c052604060c02060c052602060c02001546101a0526101a0516006580161465e565b6102005261018052610160526101405261020051818183011015611c6257600080fd5b808201905090508152505b8151600101808352811415611bdd575b50506101405160005260206000f35b633ccfd60b811415611ccd577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610140523361016052600161018052611d6e565b632e1a7d4d811415611cf45733610160526001610180526020600461014037600050611d6e565b62f714ce811415611d2d57600161018052602060046101403760243560a01c15611d1d57600080fd5b6020602461016037600050611d6e565b63e63697c8811415611d6957602060046101403760243560a01c15611d5157600080fd5b60206024610160376020604461018037600050611d6e565b61237b565b601a5415611d7b57600080fd5b6001601a55610140516101a052612710610180511115611d9a57600080fd5b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff6101a0511415611dd95760033360e05260c052604060c020546101a0525b60033360e05260c052604060c020546101a0511115611df757600080fd5b60006101a05111611e0757600080fd5b6101405161016051610180516101a0516101c0516101a0516101e0526101e051600658016145dd565b610240526101c0526101a052610180526101605261014052610240516101c052602061026060246370a082316101e05230610200526101fc6006545afa611e7657600080fd5b601f3d11611e8357600080fd5b600050610260516101c0511115612296576000610280526102c060006014818352015b6102c051600c60c052602060c02001546102a0526102a0511515611ec95761214e565b602061038060246370a0823161030052306103205261031c6006545afa611eef57600080fd5b601f3d11611efc57600080fd5b600050610380516102e0526102e0516101c051111515611f1b5761214e565b6101c0516102e05180821015611f3057600080fd5b8082039050905061030052610300516006600b6102a05160e05260c052604060c02060c052602060c020015480821115611f6a5780611f6c565b815b9050905061030052610300511515611f835761213e565b60206103c06024632e1a7d4d61034052610300516103605261035c60006102a0515af1611faf57600080fd5b601f3d11611fbc57600080fd5b6000506103c0516103205260206103e060246370a0823161036052306103805261037c6006545afa611fed57600080fd5b601f3d11611ffa57600080fd5b6000506103e0516102e0518082101561201257600080fd5b808203905090506103405260006103205111156120e5576101c08051610320518082101561203f57600080fd5b8082039050905081525061028080516103205181818301101561206157600080fd5b80820190509050815250610140610360525b6103605151602061036051016103605261036061036051101561209557612073565b6102a05161038052610320516103a0526103a05161038051600658016146f6565b610340610360525b61036051526020610360510361036052610140610360511015156120e1576120be565b6000505b6006600b6102a05160e05260c052604060c02060c052602060c020018054610340518082101561211457600080fd5b8082039050905081555060108054610340518082101561213357600080fd5b808203905090508155505b8151600101808352811415611ea6575b5050602061034060246370a082316102c052306102e0526102dc6006545afa61217657600080fd5b601f3d1161218357600080fd5b600050610340516102a0526102a0516101c0511115612240576102a0516101c0526101405161016051610180516101a0516101c0516101e05161020051610220516102405161026051610280516102a0516101c051610280518181830110156121eb57600080fd5b808201905090506102c0526102c0516006580161465e565b610320526102a05261028052610260526102405261022052610200526101e0526101c0526101a052610180526101605261014052610320516101a0525b610180516101c0516102805181818301101561225b57600080fd5b80820190509050808202821582848304141761227657600080fd5b809050905090506127108082049050905061028051111561229657600080fd5b600580546101a051808210156122ab57600080fd5b8082039050905081555060033360e05260c052604060c02080546101a051808210156122d657600080fd5b808203905090508155506101a0516101e0526000337fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101e0a36101405161016051610180516101a0516101c0516006546101e05261016051610200526101c0516102205261022051610200516101e05160065801613eb9565b6101c0526101a0526101805261016052610140526000506101c0516000526000601a5560206000f35b6399530b068114156123be57604e6002541061239657600080fd5b600254600a0a6101405261014051600658016145dd565b6101a0526101a05160005260206000f35b6314b4e26e8114156125ec5760043560a01c156123da57600080fd5b6013600c60c052602060c0200154156123f257600080fd5b600d54156123ff57600080fd5b600754331461240d57600080fd5b60006004351861241c57600080fd5b6001600b60043560e05260c052604060c02060c052602060c02001541561244257600080fd5b60206101a0600463fbfa77cf6101405261015c6004355afa61246357600080fd5b601f3d1161247057600080fd5b6000506101a051301461248257600080fd5b60206101a06004631f1fcd516101405261015c6004355afa6124a357600080fd5b601f3d116124b057600080fd5b6000506101a051600654146124c457600080fd5b612710600f546024358181830110156124dc57600080fd5b8082019050905011156124ee57600080fd5b60643560443511156124ff57600080fd5b611388608435111561251057600080fd5b600b60043560e05260c052604060c02060c052602060c0206084358155426001820155602435600282015560443560038201556064356004820155426005820155600060068201556000600782015560006008820155506024356101405260443561016052606435610180526084356101a0526004357f5a6abd2af9fe6c0554fa08649e2d86e4393ff19dc304d072d38d295c9291d4dc6080610140a2600f80546024358181830110156125c357600080fd5b808201905090508155506004356013600c60c052602060c02001556006580161489e565b600050005b637c6a4f248114156127495760043560a01c1561260857600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156126475760018352612657565b815160010180835281141561262b575b5050506101405161266757600080fd5b60006001600b60043560e05260c052604060c02060c052602060c02001541161268f57600080fd5b600f80546002600b60043560e05260c052604060c02060c052602060c0200154808210156126bc57600080fd5b808203905090508155506024356002600b60043560e05260c052604060c02060c052602060c0200155600f80546024358181830110156126fb57600080fd5b80820190509050815550612710600f54111561271657600080fd5b602435610140526004357fbda9398315c83ccef012bcaa318a2ff7b680f36429d36597bd4bc25ac11ead596020610140a2005b63e722befe8114156128685760043560a01c1561276557600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156127a457600183526127b4565b8151600101808352811415612788575b505050610140516127c457600080fd5b60006001600b60043560e05260c052604060c02060c052602060c0200154116127ec57600080fd5b6024356004600b60043560e05260c052604060c02060c052602060c0200154101561281657600080fd5b6024356003600b60043560e05260c052604060c02060c052602060c0200155602435610140526004357f0b728ad785976532c4aaadde09b1cba5f262a7090e83c62d2377bc405678b29c6020610140a2005b634757a1568114156129875760043560a01c1561288457600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156128c357600183526128d3565b81516001018083528114156128a7575b505050610140516128e357600080fd5b60006001600b60043560e05260c052604060c02060c052602060c02001541161290b57600080fd5b6024356003600b60043560e05260c052604060c02060c052602060c0200154111561293557600080fd5b6024356004600b60043560e05260c052604060c02060c052602060c0200155602435610140526004357f1796a8e0760e2de5b72e7bf64fccb7666c48ceab94cb6cae7cb7eff4b6f641ab6020610140a2005b63d0194ed6811415612a395760043560a01c156129a357600080fd5b60075433146129b157600080fd5b61138860243511156129c257600080fd5b60006001600b60043560e05260c052604060c02060c052602060c0200154116129ea57600080fd5b602435600b60043560e05260c052604060c02060c052602060c02055602435610140526004357fe57488a65fa53066d4c25bac90db47dda4e5de3025ac12bf76ff07211cf7f39e6020610140a2005b636cb56d19811415612d515760043560a01c15612a5557600080fd5b60243560a01c15612a6557600080fd5b6007543314612a7357600080fd5b600060243518612a8257600080fd5b60006001600b60043560e05260c052604060c02060c052602060c020015411612aaa57600080fd5b6001600b60243560e05260c052604060c02060c052602060c020015415612ad057600080fd5b610140600b60043560e05260c052604060c0208060c052602060c02054825260018160c052602060c0200154826020015260028160c052602060c0200154826040015260038160c052602060c0200154826060015260048160c052602060c0200154826080015260058160c052602060c02001548260a0015260068160c052602060c02001548260c0015260078160c052602060c02001548260e0015260088160c052602060c020015482610100015250506101405161016051610180516101a0516101c0516101e051610200516102205161024051600435610260526102605160065801614981565b6102405261022052610200526101e0526101c0526101a052610180526101605261014052600050600f805461018051818183011015612bf857600080fd5b8082019050905081555060006006600b60043560e05260c052604060c02060c052602060c0200155600b60243560e05260c052604060c02060c052602060c0206101405181556101e05160018201556101805160028201556101a05160038201556101c05160048201556101e05160058201556102005160068201556000600782015560006008820155506004353b612c9057600080fd5b60006000602463ce5494bb610260526024356102805261027c60006004355af1612cb957600080fd5b6024356004357f100b69bb6b504e1252e36b375233158edee64d071b399e2f81473a695fd1b02160006000a361026060006014818352015b6004356102605160148110612d0557600080fd5b600c60c052602060c02001541415612d3d576024356102605160148110612d2b57600080fd5b600c60c052602060c020015560006000f35b8151600101808352811415612cf1575b5050005b63a0e4af9a811415612d67573361014052612d98565b63bb994d48811415612d935760043560a01c15612d8357600080fd5b6020600461014037600050612d98565b612e4a565b61014051610180526007546101a0526009546101c05260006101605261016061012060006003818352015b610120516020026101800151331415612ddf5760018352612def565b8151600101808352811415612dc3575b50505061016051612dff57600080fd5b60006002600b6101405160e05260c052604060c02060c052602060c020015418612e2857600080fd5b6101405161014051610160526101605160065801614981565b61014052600050005b63f76e4caa811415612fc65760043560a01c15612e6657600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b610120516020026101600151331415612ea55760018352612eb5565b8151600101808352811415612e89575b50505061014051612ec557600080fd5b60006001600b60043560e05260c052604060c02060c052602060c020015411612eed57600080fd5b60006101405261018060006014818352015b61018051600c60c052602060c020015461016052610160511515612f2257612f64565b6004356101605118612f3357600080fd5b61014080516001818183011015612f4957600080fd5b808201905090508152505b8151600101808352811415612eff575b505060146101405110612f7657600080fd5b6004356013600c60c052602060c0200155610140516006580161489e565b610140526000506004357fa8727d412c6fa1e2497d6d6f275e2d9fe4d9318d5b793632e60ad9d38ee8f1fa60006000a2005b63b22439f58114156130ed5760043560a01c15612fe257600080fd5b600854610160526007546101805260006101405261014061012060006002818352015b6101205160200261016001513314156130215760018352613031565b8151600101808352811415613005575b5050506101405161304157600080fd5b61014060006014818352015b600435610140516014811061306157600080fd5b600c60c052602060c020015414156130d5576000610140516014811061308657600080fd5b600c60c052602060c0200155610140516006580161489e565b610140526000506004357f8e1ec3c16d6a67ea8effe2ac7adef9c2de0bc0dc47c49cdf18f6a8b0048085be60006000a260006000f35b815160010180835281141561304d575b505060006000fd5b63bf3759b5811415613103573361014052613134565b63bdcf36bb81141561312f5760043560a01c1561311f57600080fd5b6020600461014037600050613134565b613162565b6101405161014051610160526101605160065801614a10565b6101c052610140526101c05160005260206000f35b63112c1f9b8114156131785733610140526131a9565b63d76480138114156131a45760043560a01c1561319457600080fd5b60206004610140376000506131a9565b6131d7565b6101405161014051610160526101605160065801614b41565b6101c052610140526101c05160005260206000f35b63153c27c4811415613247576006580161430f565b6101405261014051600e54111561323a57600e54610140516006580161430f565b6101605261014052610160518082101561322657600080fd5b8082039050905060005260206000f3613245565b600060005260206000f35b005b63d3406abd81141561325d57336101405261328e565b6333586b678114156132895760043560a01c1561327957600080fd5b602060046101403760005061328e565b6132bc565b6101405161014051610160526101605160065801614d9c565b6101c052610140526101c05160005260206000f35b63a1d9bafc8114156138755760006001600b3360e05260c052604060c02060c052602060c0200154116132ee57600080fd5b60043560443581818301101561330357600080fd5b8082019050905060206101c060246370a0823161014052336101605261015c6006545afa61333057600080fd5b601f3d1161333d57600080fd5b6000506101c051101561334f57600080fd5b6000602435111561337b573361014052602435610160526101605161014051600658016146f6565b6000505b61014051336101605260043561018052610180516101605160065801614eef565b6101e052610140526101e051610140526007600b3360e05260c052604060c02060c052602060c0200180546004358181830110156133d957600080fd5b80820190509050815550610140516101605133610180526101805160065801614b41565b6101e05261016052610140526101e05161016052610140516101605161018051336101a0526101a05160065801614a10565b610200526101805261016052610140526102005161018052604435610180518082111561345c578061345e565b815b905090506101a05260006101a05111156134e8576006600b3360e05260c052604060c02060c052602060c0200180546101a0518082101561349e57600080fd5b80820390509050815550601080546101a051808210156134bd57600080fd5b8082039050905081555061018080516101a051808210156134dd57600080fd5b808203905090508152505b600061016051111561354e576006600b3360e05260c052604060c02060c052602060c0200180546101605181818301101561352257600080fd5b80820190509050815550601080546101605181818301101561354357600080fd5b808201905090508155505b6004356101a05181818301101561356457600080fd5b808201905090506101c052610160516101c05110156135ee576101405161016051610180516101a0516101c0516006546101e0523361020052610160516101c051808210156135b257600080fd5b808203905090506102205261022051610200516101e05160065801613eb9565b6101c0526101a052610180526101605261014052600050613672565b610160516101c0511115613672576101405161016051610180516101a0516101c0516006546101e052336102005230610220526101c051610160518082101561363657600080fd5b80820390509050610240526102405161022051610200516101e05160065801614053565b6101c0526101a0526101805261016052610140526000505b6101405161016051610180516101a0516101c0516101e05160065801614372565b610200526101e0526101c0526101a052610180526101605261014052610200516004358181830110156136c557600080fd5b8082019050905061014051808210156136dd57600080fd5b808203905090506101e0526024356101e0511115613718576101e0516024358082101561370957600080fd5b8082039050905060135561371e565b60006013555b426005600b3360e05260c052604060c02060c052602060c02001554260115560406004610200376101a051610240526007600b3360e05260c052604060c02060c052602060c0200154610260526008600b3360e05260c052604060c02060c052602060c0200154610280526006600b3360e05260c052604060c02060c052602060c02001546102a052610160516102c0526002600b3360e05260c052604060c02060c052602060c02001546102e052337f67f96d2854a335a4cadb49f84fd3ca6f990744ddb3feceeb4b349d2d53d32ad3610100610200a26002600b3360e05260c052604060c02060c052602060c0200154151561381d576001613821565b600d545b15613866576020610260600463efbb5cb06102005261021c335afa61384557600080fd5b601f3d1161385257600080fd5b6000506102605160005260206000f3613873565b6101805160005260206000f35b005b6301681a628114156138ab577fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff610140526138cc565b636ea056a98114156138c75760206024610140376000506138cc565b6139ac565b60043560a01c156138dc57600080fd5b60075433146138ea57600080fd5b600654600435186138fa57600080fd5b61014051610160527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff61016051141561396c57602061020060246370a0823161018052306101a05261019c6004355afa61395357600080fd5b601f3d1161396057600080fd5b60005061020051610160525b6101405161016051600435610180526007546101a052610160516101c0526101c0516101a0516101805160065801613eb9565b6101605261014052600050005b6306fdde03811415613a515760008060c052602060c020610180602082540161012060006003818352015b826101205160200211156139ea57613a0c565b61012051850154610120516020028501525b81516001018083528114156139d7575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f35b6395d89b41811415613af65760018060c052602060c020610180602082540161012060006002818352015b82610120516020021115613a8f57613ab1565b61012051850154610120516020028501525b8151600101808352811415613a7c575b50505050505061018051806101a001818260206001820306601f82010390500336823750506020610160526040610180510160206001820306601f8201039050610160f35b63313ce567811415613b0e5760025460005260206000f35b6370a08231811415613b445760043560a01c15613b2a57600080fd5b600360043560e05260c052604060c0205460005260206000f35b63dd62ed3e811415613b985760043560a01c15613b6057600080fd5b60243560a01c15613b7057600080fd5b600460043560e05260c052604060c02060243560e05260c052604060c0205460005260206000f35b6318160ddd811415613bb05760055460005260206000f35b63fc0c546a811415613bc85760065460005260206000f35b635aa6e675811415613be05760075460005260206000f35b6388a8d602811415613bf85760085460005260206000f35b63452a9320811415613c105760095460005260206000f35b6339ebf823811415613d2a5760043560a01c15613c2c57600080fd5b600b60043560e05260c052604060c0206101408080808460c052602060c0205481525050602081019050808060018560c052602060c020015481525050602081019050808060028560c052602060c020015481525050602081019050808060038560c052602060c020015481525050602081019050808060048560c052602060c020015481525050602081019050808060058560c052602060c020015481525050602081019050808060068560c052602060c020015481525050602081019050808060078560c052602060c020015481525050602081019050808060088560c052602060c0200154815250506101209050905060c05260c051610140f35b63c822adda811415613d5b5760043560148110613d4657600080fd5b600c60c052602060c020015460005260206000f35b633403c2fc811415613d7357600d5460005260206000f35b63ecf70858811415613d8b57600e5460005260206000f35b63cea55f57811415613da357600f5460005260206000f35b63fc7b9c18811415613dbb5760105460005260206000f35b63c3535b52811415613dd35760115460005260206000f35b633629c8de811415613deb5760125460005260206000f35b6344b81396811415613e035760135460005260206000f35b6342232716811415613e1b5760145460005260206000f35b639ec5a894811415613e335760155460005260206000f35b63a6f7f5d6811415613e4b5760165460005260206000f35b6387788782811415613e635760175460005260206000f35b637ecebe00811415613e995760043560a01c15613e7f57600080fd5b601860043560e05260c052604060c0205460005260206000f35b633644e515811415613eb15760195460005260206000f35b505b60006000fd5b6101a05261014052610160526101805260006004610220527fa9059cbb000000000000000000000000000000000000000000000000000000006102405261022060048060208461028001018260208501600060045af15050805182019150506101605160208261028001015260208101905061018051602082610280010152602081019050806102805261028090508051602001806103208284600060045af1613f6257600080fd5b505060206103e0610320516103406000610140515af1613f8157600080fd5b60203d80821115613f925780613f94565b815b905090506103c0526103c08051602001806101c08284600060045af1613fb957600080fd5b505060006101c051111561404d576101c0806020015160008251806020901315613fe257600080fd5b8091901215613ff057600080fd5b806020036101000a82049050905090501515151561404d576308c379a0610220526020610240526010610260527f5472616e73666572206661696c656421000000000000000000000000000000006102805261026050606461023cfd5b6101a051565b6101c0526101405261016052610180526101a05260006004610240527f23b872dd00000000000000000000000000000000000000000000000000000000610260526102406004806020846102a001018260208501600060045af1505080518201915050610160516020826102a0010152602081019050610180516020826102a00101526020810190506101a0516020826102a0010152602081019050806102a0526102a090508051602001806103608284600060045af161411357600080fd5b50506020610440610360516103806000610140515af161413257600080fd5b60203d808211156141435780614145565b815b90509050610420526104208051602001806101e08284600060045af161416a57600080fd5b505060006101e05111156141fe576101e080602001516000825180602090131561419357600080fd5b80919012156141a157600080fd5b806020036101000a8204905090509050151515156141fe576308c379a0610240526020610260526010610280527f5472616e73666572206661696c656421000000000000000000000000000000006102a05261028050606461025cfd5b6101c051565b6101a052610140526101605261018052306101e05260006102005260006101c0526101c061012060006002818352015b610120516020026101e001516101605114156142535760018352614263565b8151600101808352811415614234575b5050506101c0511561427457600080fd5b60036101405160e05260c052604060c0208054610180518082101561429857600080fd5b8082039050905081555060036101605160e05260c052604060c0208054610180518181830110156142c857600080fd5b80820190509050815550610180516101c05261016051610140517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101c0a36101a051565b6101405260206101e060246370a0823161016052306101805261017c6006545afa61433957600080fd5b601f3d1161434657600080fd5b6000506101e05160105481818301101561435f57600080fd5b8082019050905060005260005161014051565b61014052426011548082101561438757600080fd5b8082039050905060145480820282158284830414176143a557600080fd5b8090509050905061016052670de0b6b3a7640000610160511015614425576013546101805261018051610160516101805180820282158284830414176143ea57600080fd5b80905090509050670de0b6b3a7640000808204905090508082101561440e57600080fd5b808203905090506000526000516101405156614433565b600060005260005161014051565b005b61014052610140516006580161430f565b610160526101405261016051610140516101605160065801614372565b610180526101605261014052610180518082101561448057600080fd5b8082039050905060005260005161014051565b61018052610140526101605260006101a0526005546101c05260006101c051111561452e57610160516101c05180820282158284830414176144d457600080fd5b809050905090506101405161016051610180516101a0516101c05160065801614435565b6101e0526101c0526101a0526101805261016052610140526101e051808061451f57600080fd5b8204905090506101a052614537565b610160516101a0525b60006101a0511861454757600080fd5b6101c0516101a05181818301101561455e57600080fd5b8082019050905060055560036101405160e05260c052604060c02080546101a05181818301101561458e57600080fd5b808201905090508155506101a0516101e0526101405160007fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef60206101e0a36101a05160005260005161018051565b610160526101405260055415156145fe576101405160005260005161016051565b61014051610140516101605160065801614435565b61018052610160526101405261018051808202821582848304141761463757600080fd5b80905090509050600554808061464c57600080fd5b82049050905060005260005161016051565b610160526101405261014051610160516101805160065801614435565b6101a0526101805261016052610140526101a0516101805260006101805111156146e6576101405160055480820282158284830414176146ba57600080fd5b809050905090506101805180806146d057600080fd5b82049050905060005260005161016051566146f4565b600060005260005161016051565b005b6101805261014052610160526006600b6101405160e05260c052604060c02060c052602060c02001546101a052610160516101a051101561473657600080fd5b6000600f5418156148055761016051600f54808202821582848304141761475c57600080fd5b80905090509050601054808061477157600080fd5b8204905090506002600b6101405160e05260c052604060c02060c052602060c0200154808211156147a257806147a4565b815b905090506101c0526002600b6101405160e05260c052604060c02060c052602060c0200180546101c051808210156147db57600080fd5b80820390509050815550600f80546101c051808210156147fa57600080fd5b808203905090508155505b6008600b6101405160e05260c052604060c02060c052602060c0200180546101605181818301101561483657600080fd5b808201905090508155506101a051610160518082101561485557600080fd5b808203905090506006600b6101405160e05260c052604060c02060c052602060c020015560108054610160518082101561488e57600080fd5b8082039050905081555061018051565b6101405260006101605261018060006014818352015b61018051601481106148c557600080fd5b600c60c052602060c02001546101a0526101a051151561490457610160805160018181830110156148f557600080fd5b80820190509050815250614969565b6000610160511115614969576101a05161018051610160518082101561492957600080fd5b808203905090506014811061493d57600080fd5b600c60c052602060c02001556000610180516014811061495c57600080fd5b600c60c052602060c02001555b81516001018083528114156148b4575b505061014051565b6101605261014052600f80546002600b6101405160e05260c052604060c02060c052602060c0200154808210156149b757600080fd5b8082039050905081555060006002600b6101405160e05260c052604060c02060c052602060c0200155610140517f4201c688d84c01154d321afa0c72f1bffe9eef53005c9de9d035074e71e9b32a60006000a261016051565b6101605261014052600f541515614a4a576006600b6101405160e05260c052604060c02060c052602060c020015460005260005161016051565b6002600b6101405160e05260c052604060c02060c052602060c02001546101405161016051610180516006580161430f565b6101a0526101805261016052610140526101a0518082028215828483041417614aa457600080fd5b8090509050905061271080820490509050610180526006600b6101405160e05260c052604060c02060c052602060c02001546101a052600d5415614af6576101a0516000526000516101605156614b3f565b610180516101a051111515614b175760006000526000516101605156614b3f565b6101a0516101805180821015614b2c57600080fd5b8082039050905060005260005161016051565b005b6101605261014052600d5415614b5f57600060005260005161016051565b6101405161016051610180516006580161430f565b6101a0526101805261016052610140526101a05161018052600f54610180518082028215828483041417614ba757600080fd5b80905090509050612710808204905090506101a0526010546101c0526002600b6101405160e05260c052604060c02060c052602060c0200154610180518082028215828483041417614bf857600080fd5b80905090509050612710808204905090506101e0526006600b6101405160e05260c052604060c02060c052602060c0200154610200526003600b6101405160e05260c052604060c02060c052602060c0200154610220526004600b6101405160e05260c052604060c02060c052602060c020015461024052610200516101e051111515614c86576001614c91565b6101c0516101a05111155b15614ca457600060005260005161016051565b6101e0516102005180821015614cb957600080fd5b8082039050905061026052610260516101a0516101c05180821015614cdd57600080fd5b8082039050905080821115614cf25780614cf4565b815b905090506102605261026051602061030060246370a0823161028052306102a05261029c6006545afa614d2657600080fd5b601f3d11614d3357600080fd5b6000506103005180821115614d485780614d4a565b815b905090506102605261022051610260511015614d725760006000526000516101605156614d9a565b610260516102405180821115614d885780614d8a565b815b9050905060005260005161016051565b005b61016052610140526005600b6101405160e05260c052604060c02060c052602060c020015461018052426101805180821015614dd757600080fd5b808203905090506101a052610180516001600b6101405160e05260c052604060c02060c052602060c020015480821015614e1057600080fd5b808203905090506101c05260006101a0511115614e765760006101c0511115614e6e5760206102c060046322f3e2d46102605261027c610140515afa614e5557600080fd5b601f3d11614e6257600080fd5b6000506102c051614e71565b60005b614e79565b60005b15614edf576007600b6101405160e05260c052604060c02060c052602060c02001546101a0518082028215828483041417614eb357600080fd5b809050905090506101c0518080614ec957600080fd5b8204905090506000526000516101605156614eed565b600060005260005161016051565b005b610180526101405261016052426005600b6101405160e05260c052604060c02060c052602060c020015480821015614f2657600080fd5b808203905090506101a05260006101a05118614f4157600080fd5b610160511515614f5957600060005260005161018051565b6006600b6101405160e05260c052604060c02060c052602060c020015460206102406004638e6350e26101e0526101fc610140515afa614f9857600080fd5b601f3d11614fa557600080fd5b6000506102405180821015614fb957600080fd5b808203905090506101a0518082028215828483041417614fd857600080fd5b809050905090506016548082028215828483041417614ff657600080fd5b80905090509050612710808204905090506301e18558808204905090506101c05261016051600b6101405160e05260c052604060c02060c052602060c02054808202821582848304141761504957600080fd5b80905090509050612710808204905090506101e05261016051601754808202821582848304141761507957600080fd5b809050905090506127108082049050905061020052610200516101e0518181830110156150a557600080fd5b808201905090506101c0518181830110156150bf57600080fd5b8082019050905061022052610160516102205111156150e15761016051610220525b60006102205111156152bc576101405161016051610180516101a0516101c0516101e05161020051610220516102405130610260526102205161028052610280516102605160065801614493565b6102e0526102405261022052610200526101e0526101c0526101a0526101805261016052610140526102e0516102405260006101e0511115615225576101e05161024051808202821582848304141761518757600080fd5b8090509050905061022051808061519d57600080fd5b820490509050610260526101405161016051610180516101a0516101c0516101e051610200516102205161024051610260513061028052610140516102a052610260516102c0526102c0516102a0516102805160065801614204565b610260526102405261022052610200526101e0526101c0526101a0526101805261016052610140526000505b600060033060e05260c052604060c0205411156152bc576101405161016051610180516101a0516101c0516101e05161020051610220516102405130610260526015546102805260033060e05260c052604060c020546102a0526102a051610280516102605160065801614204565b6102405261022052610200526101e0526101c0526101a0526101805261016052610140526000505b6102205160005260005161018051565b6100046152d0036100046000396100046152d0036000f3
```