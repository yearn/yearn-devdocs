# Guide to creating V3 "Tokenized Strategies"

## Overview

So you wanna be a Yearn strategist? Can you write 3 lines of code?

Well then, you came to the right place.

The strategy creation process has been simplified in V3 so that it is technically possible to write a Tokenized Strategy with only 3 lines of code. However, of course, most strategies will need more than that. This will guide you through the full strategy development process from getting your local repository set up, through deployment, automation, and all the way to cashing out those sweet strategist fees.

## Introduction

A strategy's job is to hold the actual logic that is responsible for generating yield on some underlying asset. It should hold the code to integrate with an external protocol and do any needed asset deployment, withdraw logic, reward selling, reinvesting Loan-to-Value maintenance, and other such logic to most efficiently generate the most yield possible from that particular source.

The biggest update to Yearn Version 3 yVaults from V2 was the introduction of "Tokenized Strategies". In V2, strategies were stand-alone contracts that were attached to one specific vault. That vault was the only one who could ever deposit or withdraw funds from the strategy and each had a trusted relationship with the other.

In V3 strategies are now, themselves, fully ERC-4626 compliant stand-alone vaults. Though their job remains the same (i.e. generate yield from one external source), strategies can now not only be connected to many different vaults at the same time but also be deposited directly into by an end user.

This increased functionality not only means strategies have a much larger potential market of depositors but also means anyone (including you) now have the ability to build, deploy, market, and maintain your own Yearn strategy without any need for an endorsement or permission from Yearn.

## Why?

- *Strategist Fees!* - V3 brings back the ability for developers of strategies to earn the fees generated from their strategy: meaning your earning potential is unlimited.
- *Codify Your Yield Farming* - Tokenized strategies make it super easy for anyone to codify their own yield-generating strategies. Want to keep your alpha private? No problem they come fully customizable to allow for you to be the only one allowed to deposit.
- *Simple 4626 Wrappers* - Tokenized strategies make a super easy and cheap way to give any previously deployed protocol a ERC-4626 interface. This opens up any protocol to easily integrate into the rapidly growing 4626 ecosystem (including Yearn Meta Vaults).

## Definitions
- [Strategy](https://github.com/yearn/tokenized-strategy) : A strategy or "Tokenized Strategy" in V3 refers to an ERC-4626 compliant contract that utilizes the [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol#L14-L26) pattern that either meta vaults or individual users can deposit directly into and receive shares in return. The strategy takes the underlying asset and deploys it in a single source in order to generate yield on that asset.
- Asset: Any ERC20-compliant token
- Shares: ERC20-compliant token that tracks the asset balance in the strategy for every depositer.
- [TokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol): The implementation contract that all strategies delegateCall to for the standard ERC4626 and profit locking functions.
- [BaseTokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/BaseTokenizedStrategy.sol): The abstract contract that a strategy should inherit from that handles all communication with the Tokenized Strategy contract.
- Strategist: The developer of a specific strategy.
- Depositor: Account that deposits the asset and holds Shares
- Vault: Or "Meta Vault" is an Yearn ERC4626 compliant Smart contract that receives assets from Depositors to then distribute them among the different Strategies added to the vault, managing accounting and asset distribution. 
- Management: The owner of the specific strategy that can set fees, profit unlocking time etc.
- Keeper: the address of a contract allowed to call report() and tend() on a strategy.
- Factory: The factory that all meta vaults of a specific API version are cloned from that also controls the protocol fee amount and recipient for a strategy.
- Performance Fee: The fee strategies charge during reports base on the yield earned since the last report.
- Performance Fee recipient: The address that receives the shares charged as performance fees.
- Protocol Fee: A fee on the fees charged by a strategists sent to the Yearn Treasury.
- Profit Max Unlock Time: Time in seconds over which reported profits will unlock over.
- `totalIdle` : The amount of loose asset that is sitting in a strategy.
- `totalDebt` : The amount of deployed funds that a strategy has control over.
- `report`: Called by management or keepers to accrue all profits or losses, charge fees and lock profit to be distributed.
- `tend`: Called by management or keepers between reports for any maintenence that should happen that doesn't require a full report.
- API Version: The version that a specific Strategy is using for its logic.

## Architecture

While the complete architecture of the Tokenized Strategy is out of the scope of this document you can read more about how it works [here](https://github.com/yearn/tokenized-strategy/blob/master/SPECIFICATION.md)

**TLDR**: V3 strategies use an immutable proxy pattern to outsource all of its complex, high risk and redundant code to one [TokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) implementation contract that is used by every strategy of a specific api version. To use this pattern you simply need to inherit the [BaseTokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/BaseTokenizedStrategy.sol) contract, that holds all of the logic to communicate with the implementation contract, and then just override a few simple functions with your specific strategy logic.

## Getting started

Yearn has base templates made to build off of built in both [Ape Worx](https://www.apeworx.io/), a python based development toolkit, and [Foundry](https://book.getfoundry.sh/).

1. Choose your development framework.
    - [Tokenized Strategy Foundry Mix](https://github.com/yearn/tokenized-strategy-foundry-mix)
    - [Tokenized Strategy Ape Mix](https://github.com/yearn/tokenized-strategy-ape-mix)
    
2. Set up local environment with selected mix. Each mix has detailed instructions in the "How To Start" section of the README, of specific requirements as well as cloning instructions and needed environment variables. 
4. Assure tests pass. Each mix comes with a small set of pre-written tests, to serve as examples and can be used to make sure your local repository is set up properly before adding your own logic.

## Strategy Writing

So you have your idea and local environment setup. Now its time to start writing your actual strategy. 

To create your Tokenized Strategy, you must override at least three functions outlined in the `Strategy.sol`. 

___

1. *_deployFunds(uint256 _amount)*
    **Purpose**: 
    - This function is called during every deposit into your strategy to give it the opportunity to deploy the underlying asset just deposited into the yield source. 
    
    **Parameters**: 
    - `_amount`: The total amount of underlying asset that is currently available for the strategy to deploy including the amount deposited and previously idle funds.
    
    **Returns**: NONE.
    
    **Good to Know**: 
    - This function is entirely permissionless, so anything such as swaps or lp movements can be sandwiched or otherwise manipulated.
    - This does not need to deploy the full `_amount` if the strategy doesn't want to.
    
    **Best Practice**: 
    - Use the `_amount` parameter passed in rather than relying on .balanceOf(address(this))
    
    **Example**:
        
        function _deployFunds(uint256 _amount) internal override {
            yieldSource.deposit(asset, _amount);
        }
        
2. *_freeFunds(uint256 _amount)*
    **Purpose**: 
    - This function is called during withdraws from your strategy if there is not enough idle asset to service the full withdraw. 
    
    **Parameters**: 
    - `_amount`: The amount of the underlying asset that needs to be pulled from the yield source.
    
    **Returns**: NONE.
    
    **Good to Know**: 
    - The amount of loose asset has already been accounted for. 
    - This function is also entirely permissionless, so anything such as swaps or lp values can be sandwiched or otherwise manipulated.
    
    **Best Practice**: 
    - Use the `_amount` parameter passed in rather than relying on .balanceOf(address(this)).
    - **Any difference between the `_amount` parameter and the actual amount withdrawn will count as a loss and be passed on to the withdrawer. It may be preferred to revert for temporary issues such as liquidity constraints rather than pass on a loss**.
    - If your strategy is illiquid or can not always service full withdraws, you can limit the amount by overriding `availableWithdrawLimt` which is outlined below.
    
    **Example**:
        
        function _freeFunds(uint256 _amount) internal override {
            yieldSource.withdraw(asset, _amount);
        }

3. *_harvestAndReport()*
    **Purpose**: 
    - Called during every report. This should harvest and sell any rewards, reinvest any proceeds, perform any position maintanence and return a full accounting of a trusted amount denominated in the underlying asset that the strategy holds.
    
    **Parameters**: NONE
    
    **Returns**: 
    - `_totalAssets`:  A trusted and accurate account for the total amount of 'asset' the strategy currently holds including loose funds.
    
    **Good to Know**:  
    - This can only be called by a permissioned address so if set up correctly can be trusted to be through a protected relay in order to perform swaps, lp movements etc.
    - It is safe to account for loose asset in this function since any profit reported is immediately locked and therefore is not subject to price per share manipulation.

    **Best Practice**: 
    - The returned value is used to account for all strategy profits, losses and fees so care should be taken when relying on oracle values, lp prices etc. that have the potential to be manipulated.
    - This can still be called after a strategy has been shutdown so you may want to check if the strategy is shutdown before performing certain functions like re-deploying loose funds.
    
    **Example**:
    
        function _harvestAndReport() internal override returns (uint256 _totalAssets) {
            // Only harvest and redeploy if strategy is not shutdown.
            if(!TokenizedStrategy.isShutdown()) {
                // Claim all rewards and sell to asset.
                _claminAndSellRewards();
                // Check how much loose asset we have from rewards.
                uint256 looseAsset = ERC20(asset).balanceOf(address(this));
                // Deposit the sold amount back into the yield source.
                yieldSource.deposit(asset, looseAsset);
            }
            
            // Return full balance no matter what.
            _totalAssets = yieldSource.balanceof(address(this)) + ERC20(asset).balanceOf(address(this));
        }
        
### Optional Functions
Simply overriding those three function will make your strategy a fully functional, permissionless, 4626 compliant stand alone vault. It can work entirely on its own or be integrated seemlessly into any Yearn V3 vault. 

While that may be all that's necessary for some of the most simple strategies it is likely that most strategists may want to add a bit more customization or complexity to their strategy. Their are five more optional functions that can be overriden by a strategist if desired to continue to build out their Tokenized Strategy.


1. *availableDeositLimit(address _owner)*
    **Purpose**:
    - This is called during any deposits and can be used to enforce any deposit limit or white list that the strategist desires.
    
    **Parameters**:
    - `_owner`: The address that would be receiving the shares minted during the deposit.
    
    **Returns**:
    - The limit if any that should be enforced on the deposit.
    
    **Good to Know**:
    - This will default to return uint256 max. 
    - This does not need to take into account any conversion rates from assets to shares. But should know that any limit under uint256 max may get converted to shares and should not be high enough to overflow  on multiplication.
    
    **Best Practices**:
    - Make sure to implement setter functions for any deposit limit or whitelist's that are enforced.
    
    **Example**:
    
        function availableDepositLimit(
            address _owner
        ) public view override returns (uint256) { 
            uint256 totalAssets = TokenizedStrategy.totalAssets();
            return totalAssets >= depositLimit ? 0 : depositLimit - totalAssets;
        }
    
1. *availableWithdrawLimit(address _owner)*
    **Purpose**:
    - This is called during every withdraw and can be used to enforce any witdhraw limit the strategist desires.
    
    **Parameters**:
    - `_owner`: The address that owns the shares that would be burnt for the underlying assets.
    
    **Returns**:
    - The limit if any that should be enforced on withdraws.
    
    **Good to Know**:
    - This does not need to take into account the balance of the _owner.
    - This can be more than the actual amount available to withdraw.
    - Defaults to max uint256.
    
    **Best Practices**:
    - This should be overridden for strategies that have illiquid, or sandwichable positions to prevent reporting incorrect losses on withdraws.
    - **This should never be lower than TokenizedStrategy.totalIdle()**.
    - This does not need to take into account any conversion rates from assets to shares. But should know that any limit under uint256 max may get converted to shares and should not be high enough to overflow  on multiplication.
    
    **Example**:
    
        function availableWithdrawLimit(
            address _owner
        ) public view override returns (uint256) {
            return TokenizedStrategy.totalIdle() + 
                ERC20(asset).balanceOf(address(yieldSource));
        }
        
    **Example #2**:
    
        function availableWithdrawLimit(
            address _owner
        ) public view override returns (uint256) {
            if(positionIsLocked) {
                return TokenizedStrategy.totalIdle();
            } else {
                return TokenizedStrategy.totalAssets();
            }
        }

1. *_tend(uint256 _totalIdle)*
    **Purpose**:
    - This would get called during a `tend` call and can be used if a strategy needs to perform any maintenance or other actions that don't require a full report. If used the strategy should also implement a `tendTrigger` that keepers can monitor to know when it should be called.
    
    **Parameters**:
    - `_totalIdle`: The amount of asset that is currently loose in the strategy.
    
    **Returns**: NONE
    
    **Good to Know**:
    - The strategies totalDebt and totalIdle amounts will be automatically updated after this completes based on the end state, but will keep the totalAssets the same as to not have any effect on PPS.
    
    **Best Practices**:
    - This can only be called by the keeper or management so should be from a trusted source.
    - Can be used to perform LTV adjustments on leveraged strategies.
    - Can be used to know a trusted relay has been used to deposit idle funds for a strategy that doesn't deploy funds during deposits.
    
    **Example**:
    
        function _tend(uint256 _totalIdle) internal override {
            if (currentLTV() < targetLTV()) {
                _leverUp(_totalIdle);
            } else if (currentLTV > warningLTV()) {
                _leverDown(_totalIdle);
            }
        }
    
1. *tendTrigger()*
    **Purpose**:
    - Should return whether or not a keeper should call `tend` on the strategy. This should be implemented if tend is needed to be used.
    
    **Parameters**: NONE.
    
    **Returns**:
    - Boolean representing if a keeper should call `tend`.
    
    **Good to Know**:
    - Default return value is false.
    
    **Best Practices**:
    - Can implement checks on the current base fee of the chain to assure the gas cost isn't to high.
    
    **Example**:
        
        function tendTrigger() public view override returns (bool) {
            if (currentLTV() > warningLTV()) {
                return true;
            } else if (currentLTV() < lowerBoundLTV()) {
                return isBaseFeeAcceptable() ? true : false;
            }
        }
    
1. *_emergencyWithdraw(uint256 _amount)*
    **Purpose**:
    - Allows management the option to manually pull funds from the yield source once a strategy has been shutdown.
    
    **Parameters**:
    - `_amount`: The specific amount to pull from the yield source
    
    **Returns**: NONE.
    
    **Good to Know**:
    - This can only be called once a strategy is shutdown.
    - The `_amount` can be more than is available to pull.
    - The totalDebt and totalIdle will be updated based on the end state after the emergencyWithdraw keeping totalAssets the same.
    
    **Best Practices**:
    - Keep the withdraw logic as simple as possible.
    - Check `_amount` against the available amount to withdraw.
    
    **Example**:
    
         function _emergencyWithdraw(uint256 _amount) internal override {
            _amount = min(_amount, yieldSource.balanceOf(address(this)));
            yieldSource.withdraw(asset, _amount);
        }



---
All other functionality, such as reward selling, upgradability, etc., is up to the strategist to determine what best fits their vision. Due to the ability of strategies to stand alone from a Vault, it is expected and encouraged for strategists to experiment with more complex, risky, or previously unfeasible Strategies.

### FYI
NOTE: The only default global variables from the BaseTokenizedStrategy that can be accessed from storage is `asset` and `TokenizedStrategy`. If other global variables are needed for your specific strategy, you can use the `TokenizedStrategy` variable to quickly retrieve any other needed variables within the strategy, such as totalAssets, totalDebt, isShutdown etc.

Example:

    require(!TokenizedStrategy.isShutdown(), "strategy is shutdown");


NOTE: It is impossible to write to a strategy's default global storage state internally post-deployment. You must make external calls from the `management` address to configure any of the desired variables.

To include permissioned functions such as extra setters, the two modifiers of `onlyManagement` and `onlyManagementAndKeepers` are available by default.


The symbol used for each tokenized Strategy is set automatically with a standardized approach based on the `asset`'s symbol. Strategists should use the `name` parameter in the constructor for a unique and descriptive name that encapsulates their specific Strategy.

## Periphery

To make Strategy writing as simple as possible, a suite of optional 'Periphery' helper contracts can be inherited by your Strategy to provide standardized and tested functionality for things like swaps. A complete list of the periphery contracts can be viewed here https://github.com/yearn/tokenized-strategy-periphery.


*All periphery contracts are optional, and strategists are free to choose if they wish to use them.

### [Swappers](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/swappers)

In order to make reward swapping as easy and standardized as possible there are multiple swapper contracts that can be inherited by a strategy to inherit pre-built and tested logic for whichever method of reward swapping is desired. This allows a strategist to only need to set a few global variables and then simply use the default syntax of `_swapFrom(tokenFrom, tokenTo, amountIn, minAmountOut)` to swap any tokens easily during `_harvestAndReport`.

### [APR Oracles](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/AprOracle)

In order for easy integration with Vaults, front ends, debt allocators etc. There is the option to create an [APR oracle](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/AprOracle/AprOracleBase.sol) contract for your specific strategy that should return the expected APR of the Strategy based on some given `debtChange`. 


### [HealthCheck](https://github.com/Schlagonia/tokenized-strategy-periphery/tree/master/src/HealthCheck)

In order to prevent automated reports from reporting losses/excessive profits that may not be accurate, a strategist can inherit and implement the [HealthCheck](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/HealthCheck/HealthCheck.sol) contract. Using this can assure that a keeper will not call a report that may incorrectly realize incorrect losses or excessive gains. It can cause the report to revert if the gain/loss is outside of the desired bounds and will require manual intervention to assure the strategy is reporting correctly.

NOTE: It is recommended to implement some checks in `_harvestAndReport` for leveraged or manipulatable strategies that could report incorrect losses due to unforeseen circumstances.

### [Report Triggers](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/ReportTrigger)

The expected behavior is that strategies report profits/losses on a set schedule based on their specific `profitMaxUnlockTime` that management can customize. If a custom trigger cycle is desired or extra checks should be added a strategist can create their own [customReportTrigger](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/ReportTrigger/CustomStrategyTriggerBase.sol) that can be added to the default contract for a specific strategy.

*More information on this can be found below in the "Reporting" section.

## Testing

Due to the nature of the BaseTokenizedStrategy utilizing an external contract for the majority of its logic, the default interface for any strategy will not allow proper testing of all functions. Testing of your Strategy should utilize the pre-built [IStrategyInterface](https://github.com/yearn/tokenized-strategy-foundry-mix/blob/master/src/interfaces/IStrategyInterface.sol) to cast any deployed strategy through for testing, as seen in the testing setups in each mix. You can add any external functions that you add for your specific strategy to this interface to be able to test all functions with one variable. 

Foundry Example:

    Strategy _strategy = new Strategy(asset, name);
    IStrategyInterface strategy =  IStrategyInterface(address(_strategy));

Ape Example:

    strategy = management.deploy(project.Strategy, asset, name)
    strategy =  project.IStrategyInterface.at(strategy.address)

Due to the permissionless nature of the tokenized Strategies, all tests are written without integration with any meta vault funding it. While those tests can be added, all V3 vaults utilize the ERC-4626 standard for deposit/withdraw and accounting, so they can be plugged in easily to any number of different vaults with the same `asset.`

## Deployment

For strategies that will be used with multiple different asset's it is recommended to build a factory, that can be deployed once and then all strategies can be deployed on chain using the factory. 

**Cloning is not recommended for Tokenized Strategies.**


#### Contract Verification

Once the Strategy is deployed and verified, you will need to verify the TokenizedStrategy functions as well. To do this, navigate to the /#code page on etherscan.

1. Click on the `More Options` drop-down menu. 
2. Click "is this a proxy?".
3. Click the "Verify" button.
4. Click "Save". 

This should add all of the external `TokenizedStrategy` functions to the contract interface on Etherscan.

## Operating Your strategy

Once deployed your strategy should be able to be interacted with as any other ERC-4626 vault.

In addition to the normal 4626 interface Tokenized Strategies come built in with some simple function for management to properly maintain the strategy.

### Reporting

The main operational procedure strategists need to take care of is the reporting of a strategy. Calling `report` on a strategy must be done by either the 'management' or 'keeper' address. 

Reporting causes the strategy to accrue rewards, record any gains or losses as well as charge and pay fees. It is needed in order for the depositers of a vault to earn yield as well as for the strategist to to earn fees.

It is recommended to build strategies on the assumption that reports will happen based on the strategies specific `profitMaxUnlockTime`. 

Since reports are the only time _harvestAndReport will be called any strategies that need more frequent checks or updates should override the _tend and tendTrigger functions for any needed mid-report maintenance.

#### Keepers

The easiest way to assure regular reports and tends on your strategy is to hook it up with a 3rd party keeper.

The recommended keeper network to use is the [Gelato Network](https://www.gelato.network/). 

### Setters

The strategy comes with some default variables that the management of a strategy has the ability to set and update.

1. Changing management: Changing the strategies management is a two step process. First the current management must call `setPendingManagment(address)` with the desired address to transfer the management to. Then that address must call `acceptManagement()` in order for the change to go into effect.
2. Keeper. The manager of a strategy can set a new address to be the keeper at any time with `setKeeper(address)`.
3. Performance Fee. Management can adjust the amount of the gain realized during a report that gets charged as a performance fee with `setPerformanceFee(uint16)`. 
    **Subject to min and max's.
4. Performance Fee Recipient. Can set the address that will receive the performance fees charged during a report with `setPerformanceFeeRecipient(address)`.
5. Profit Unlocking Period. Profits recorded during reports are slowly unlocked to depositers of a strategy over the strategy specific 'profitMaxUnlockTime'. This defaults to 10 days and can be changed at any time by the strategist with `setProfitMaxUnlockTime(uint256)`.


### Emergencies

There is two default emergency functions built in. First of which is `shutdownStrategy()`. This can only ever be called by the management and is non-reversible.

Once this is called it will stop any further deposit or mints but will have no effect on any other functionality including withdraw, redeem, report and tend. This is to allow management to continue potentially recording profits or losses and users to withdraw even post shutdown.

This can be used in an emergency or simply to retire a vault.

Once a strategy is shutdown management can also call `emergencyWithdraw(_amount)`. Which will tell the strategy to withdraw a specified `_amount` from the yield source and keep it as idle in the vault. This function will also do any needed updates to totalDebt and totalIdle, based on amounts withdrawn to assure withdraws continue to function properly.

All other emergency functionality is left up to the individual strategist.

## FAQ


- How do I get my strategy added to a Yearn vault?
- How do I get My strategy added to the Yearn UI?

## Other reading material

