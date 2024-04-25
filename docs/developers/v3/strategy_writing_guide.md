# Guide to creating V3 "Tokenized Strategies"

## Overview

So you wanna be a Yearn strategist?

Can you write 3 lines of code?

Well, then you came to the right place.

The strategy creation process has been very simplified in V3, so it is technically possible to write a Tokenized Strategy with only 3 lines of code. However, most strategies will need more than that. This will guide you through the entire strategy development process from getting your local repo set up through deployment and automation to cashing out those sweet sweet strategist fees.

## Introduction

A strategy's job is to hold the logic responsible for generating yield on some underlying asset. It should hold the code to integrate with an external protocol and do any needed asset deployment, withdraw logic, reward selling, reinvesting LTV maintenance etc. to generate the most possible yield from that particular source most efficiently.

The most significant update to Yearn V3 from V2 was the introduction of "Tokenized Strategies". In V2 strategies were stand-alone contracts that were attached to one specific vault. That vault was the only one who could ever deposit or withdraw funds from the strategy and each had a trusted relationship with the other.

In V3 strategies are now fully ERC-4626-compliant stand-alone vaults. Though their job remains the same (i.e., generate yield from one external source), strategies can now be connected to many different vaults simultaneously and deposited directly into by an end user.

This increased functionality not only means strategies have a much larger potential market of depositors but also means anyone (including you) now can build, deploy, market, and maintain your own Yearn strategy without any need for an endorsement or permission from Yearn.

## Why?

- *Strategist Fees!* - V3 brings back the ability for developers of strategies to earn the fees generated from their strategy. Meaning your earning potential is unlimited.
- *Codify Your Yield Farming* - Tokenized strategies make it easy for anyone to codify their yield-generating strategies. Wanna keep your alpha private? No problem they come fully customizable to allow for you to be the only one allowed to deposit.
- *Simple 4626 Wrappers* - Tokenized Strategies make a super easy and cheap way to give any previously deployed protocol an ERC-4626 interface. This opens up any protocol to easily integrate into the rapidly growing 4626 ecosystem (including Yearn Allocator vaults).

## Definitions

- [Strategy](https://github.com/yearn/tokenized-strategy) : A strategy or "Tokenized Strategy" in V3 refers to an ERC-4626 compliant contract that utilizes the [TokenizedStrategy](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) pattern that either allocator vaults or individual users can deposit directly into and receive shares in return. The strategy takes the underlying asset and deploys it in a single source in order to generate yield on that asset.
- Vault: Or "Allocator Vault" is a Yearn ERC4626 compliant Smart contract that receives assets from Depositors to distribute among the different Strategies added to the vault, managing accounting and asset distribution.
- Asset: Any ERC20-compliant token
- Shares: ERC20-compliant token that tracks the asset balance in the strategy for every depositor.
- [TokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol): The implementation contract that all strategies delegateCall to for the standard ERC4626 and profit locking functions.
- [BaseStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/BaseStrategy.sol): The abstract contract that a strategy should inherit from that handles all communication with the Tokenized Strategy contract.
- Strategist: The developer of a specific strategy.
- Depositor: Account that deposits the asset and holds Shares
- Management: The owner of the specific strategy that can set fees, profit unlocking time etc.
- Emergency Admin: Address that can call emergency functions on the strategy.
- Keeper: the address of a contract allowed to call report() and tend() on a strategy.
- Factory: The factory that all Allocator Vaults of a specific API version are cloned from that also controls the protocol fee amount and recipient for a strategy.
- Performance Fee: The fee strategies charge during reports based on the yield earned since the last report.
- Performance Fee recipient: The address that receives the shares charged as performance fees.
- Protocol Fee: A fee on the fees charged by strategist sent to the Yearn Treasury.
- Profit Max Unlock Time: Time in seconds over which reported profits will unlock over.
- `report`: Called by management or keepers to accrue all profits or losses, charge fees, and lock profit to be distributed.
- `tend`: Called by management or keepers between reports for any maintenance that should happen that doesn't require a full report.
- API Version: The version that a specific Strategy is using for its logic.

## Architecture

While the complete architecture of the Tokenized Strategy is out of the scope of this document you can read more about how it works [here](https://github.com/yearn/tokenized-strategy/blob/master/SPECIFICATION.md)

**TLDR**: V3 strategies use an immutable proxy pattern to outsource all of its complex, high risk, and redundant code to one [TokenizedStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/TokenizedStrategy.sol) implementation contract that is used by every strategy of a specific API version. To use this pattern you simply need to inherit the [BaseStrategy.sol](https://github.com/yearn/tokenized-strategy/blob/master/src/BaseStrategy.sol) contract, that holds all of the logic to communicate with the implementation contract, and then just override a few simple functions with your specific strategy logic.

## Getting started

Yearn has base templates made to build off of built-in both [Ape Worx](https://www.apeworx.io/), a python-based development toolkit, and [Foundry](https://book.getfoundry.sh/).

1. Choose your development framework.
    - [Tokenized Strategy Foundry Mix](https://github.com/yearn/tokenized-strategy-foundry-mix)
    - [Tokenized Strategy Ape Mix](https://github.com/yearn/tokenized-strategy-ape-mix)

2. Set up the local environment with the selected mix. Each mix has detailed instructions in the "How To Start" section of the README, of specific requirements, cloning instructions, and needed environment variables.
4. Assure tests pass. Each mix comes with a small set of pre-written tests, to serve as examples and can be used to ensure your local repository is set up correctly before adding your logic.

## Strategy Writing

So you have your idea and local environment setup. Now its time to start writing your actual strategy.

To create your Tokenized Strategy, you must override at least three functions outlined in the `Strategy.sol`.

___

The only default global variables from the BaseStrategy that can be accessed from storage is `asset` and `TokenizedStrategy`.

If other global variables are needed for your specific strategy, you can use the `TokenizedStrategy` variable to quickly retrieve any other needed variables, such as `totalAssets`, `isShutdown` etc.

Example:

    require(!TokenizedStrategy.isShutdown(), "strategy is shutdown");
___

1. *_deployFunds(uint256 _amount)*
    **Purpose**:
    - This function is called during every deposit into your strategy to allow it to deploy the underlying asset deposited into the yield source.

    **Parameters**:
    - `_amount`: The total amount of underlying assets currently available for deployment, including the amount deposited and previously idle funds.

    **Returns**: NONE.

    **Good to Know**:
    - This function is permissionless, so swaps or LP movements can be sandwiched or manipulated.
    - This does not need to deploy the full `_amount` if the strategy doesn't want to.

    **Best Practice**:
    - Override `availableDepositLimit` with any needed checks like protocol deposit limits or current status. This will alleviate the need to check any of these things during `_deployFunds` since `availableDepositLimit` is called during every deposit to check for restrictions.

    **Example**:

        function _deployFunds(uint256 _amount) internal override \{
            yieldSource.deposit(address(asset), _amount);
        }

2. *_freeFunds(uint256 _amount)*
    **Purpose**:
    - This function is called during withdraws from your strategy if there is not sufficient idle asset to service the full withdrawal.

    **Parameters**:
    - `_amount`: The amount of the underlying asset that needs to be pulled from the yield source.

    **Returns**: NONE.

    **Good to Know**:
    - **The amount of loose assets has already been accounted for**.
    - This function is also entirely permissionless, so swaps or lp values can be sandwiched or otherwise manipulated.
    - Users have the ability to specify their own `maxLoss` on withdraws.

    **Best Practice**:
    - Use the `_amount` parameter passed in rather than relying on .balanceOf(address(this) since idle has already been accounted for.
    - **Any difference between the `_amount` parameter and the actual amount withdrawn will count as a loss and be passed on to the withdrawer.**
    - If your strategy is illiquid or can not always service full withdraws, you can limit the amount by overriding `availableWithdrawLimit` outlined below.

    **Example**:

    ```markdown
    function _freeFunds(uint256_amount) internal override {
        yieldSource.withdraw(address(asset), _amount);
    }
    ```

3. *_harvestAndReport()*
    **Purpose**:
    - Called during every report. This should harvest and sell any rewards, reinvest any proceeds, perform any position maintenance and return a full accounting of a trusted amount denominated in the underlying asset the strategy holds.

    **Parameters**: NONE

    **Returns**:
    - `_totalAssets`:  A trusted and accurate account for the total amount of 'asset' the strategy currently holds including loose funds.

    **Good to Know**:  
    - This can only be called by a permissioned address so if set up correctly, it can be trusted to perform swaps, LP movements etc.
    - This should account for both deployed and idle assets.

    **Best Practice**:
    - The returned value is used to account for all strategy profits, losses and fees so care should be taken when relying on oracle values, LP prices etc. that have the potential to be manipulated.
    - This can still be called after a strategy has been shut down so you may want to check if the strategy is shut down before performing certain functions like re-deploying loose funds.

    **Example**:

        function _harvestAndReport() internal override returns (uint256 _totalAssets) {
            // Only harvest and redeploy if the strategy is not shutdown.
            if(!TokenizedStrategy.isShutdown()) {
                // Claim all rewards and sell to asset.
                _claimAndSellRewards();
                
                // Check how much we can re-deploy into the yield source.
                uint256 toDeploy = Math.min(
                    asset.balanceOf(address(this)), 
                    availableDepositLimit(address(this))
                );
                
                // If greater than 0.
                if (toDeploy > 0) {
                    // Deposit the sold amount back into the yield source.
                    _deployFunds(toDeploy)
                }
            }
            
            // Return full balance no matter what.
            _totalAssets = yieldSource.balanceOf(address(this)) + asset.balanceOf(address(this));
        }

### Optional Functions

Simply overriding those three functions will make your strategy a fully functional, permissionless, 4626-compliant stand-alone vault. It can work independently or seamlessly into any Yearn V3 vault.

While that may be all that's necessary for some of the most straightforward strategies, most strategists may want to add more customization or complexity to their strategy. There are five more optional functions that can be overridden by a strategist if desired to continue to build out their Tokenized Strategy.

1. *availableDepositLimit(address _owner)*
    **Purpose**:
    - This is called during any deposits and can be used to enforce any deposit limit or white list that the strategist desires or that the underlying protocol uses.

    **Parameters**:
    - `_owner`: The address receiving the shares minted during the deposit.

    **Returns**:
    - The limit if any that should be enforced on the deposit.

    **Good to Know**:
    - This will default to return uint256 max.
    - This does not need to consider any conversion rates from assets to shares. But you should know that any limit under uint256 max may get converted to shares and should not be high enough to overflow  on multiplication.

    **Best Practices**:
    - Check all values for the protocol you are integrating with that may cause deposits to revert.
    - Make sure to implement setter functions for any deposit limit or whitelist that are enforced.

    **Example**:

        function availableDepositLimit(
            address _owner
        ) public view override returns (uint256) { 
            if (yieldSource.isPaused()) return 0;
            
            uint256 totalAssets = TokenizedStrategy.totalAssets();
            return totalAssets >= depositLimit ? 0 : depositLimit - totalAssets;
        }

1. *availableWithdrawLimit(address _owner)*
    **Purpose**:
    - This is called during every withdraw and can be used to enforce any withdraw limit the strategist desires.

    **Parameters**:
    - `_owner`: The address that owns the shares that would be burnt for the underlying assets.

    **Returns**:
    - The limit if any that should be enforced on withdraws.

    **Good to Know**:
    - This does not need to consider the balance of the _owner.
    - This can be more than the actual amount available to withdraw.
    - **Recommended use is to have the amount returned not be close to the actual strategies totalAssets to avoid rounding issues.**
    - Defaults to max uint256.

    **Best Practices**:
    - This should be overridden for strategies that have illiquid, or sandwichable positions to prevent reporting incorrect losses on withdraws.
    - This should also account for any restrictions the underlying protocol may encounter.
    - To just allow the idle funds to be withdrawn use `asset.balanceOf(address(this))`.
    - This does not need to consider conversion rates from assets to shares. But you should know that any limit under uint256 max may get converted to shares and should not be high enough to overflow  on multiplication.

    **Example #2**:

        function availableWithdrawLimit(
            address _owner
        ) public view override returns (uint256) {
            if(positionIsLocked || yieldSource.isPaused()) {
                return asset.balanceOf(address(this));
            }
            
            // Return both the loose balance and the current liqudity of the yield source.
            return asset.balanceOf(address(this)) + asset.balanceOf(address(yieldSource));
            
        }

1. *_tend(uint256 _totalIdle)*
    **Purpose**:
    - This would get called during a `tend` call and can be used if a strategy needs to perform any maintenance or other actions that don't require a full report. If used the strategy should also implement a `_tendTrigger` that keepers can monitor to know when it should be called.

    **Parameters**:
    - `_totalIdle`: The amount of asset currently loose in the strategy.

    **Returns**: NONE

    **Good to Know**:
    - The strategies `totalAssets` will be the exact before and after a tend as not to have any effect on PPS.

    **Best Practices**:
    - This can only be called by the keeper or management so it should be from a trusted source.
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

1. *_tendTrigger()*
    **Purpose**:
    - Should return whether or not a keeper should call `tend` on the strategy. This should be implemented if tend is needed to be used.

    **Parameters**: NONE.

    **Returns**:
    - Boolean representing if a keeper should call `tend`.

    **Good to Know**:
    - Default return value is false.

    **Best Practices**:
    - Can implement checks on the current base fee of the chain to ensure the gas cost isn't too high.

    **Example**:

        function _tendTrigger() public view override returns (bool) {
            if (currentLTV() > warningLTV()) {
                return true;
            } else if (currentLTV() < lowerBoundLTV()) {
                return isBaseFeeAcceptable() ? true : false;
            }
        }

1. *_emergencyWithdraw(uint256 _amount)*
    **Purpose**:
    - Allows management to manually pull funds from the yield source once a strategy has been shut down.

    **Parameters**:
    - `_amount`: The specific amount to pull from the yield source

    **Returns**: NONE.

    **Good to Know**:
    - This can only be called once a strategy is shut down.
    - The `_amount` can be more than is available to pull.
    - The totalAssets will be the same before and after this call.

    **Best Practices**:
    - Keep the withdrawal logic as simple as possible.
    - Check `_amount` against the available amount to withdraw.

    **Example**:

         function _emergencyWithdraw(uint256 _amount) internal override {
            _amount = min(_amount, yieldSource.balanceOf(address(this)));
            _freeFunds(_amount);
        }

---
All other functionality, such as reward selling, upgradability, etc., is up to the strategist to determine what best fits their vision. Due to the ability of strategies to stand alone from a Vault, it is expected and encouraged for strategists to experiment with more complex, risky, or previously unfeasible Strategies.

### FYI

The Tokenized Strategy contract manually track totalAssets. Meaning the only way to update the totalAssets for either profits or losses is through a `report` call.

**NOTE**: Writing to a strategy's default global storage state internally post-deployment is impossible. You must make external calls from the `management` address to configure any desired variables.

To include extra permissioned functions such as setters, there are modifiers for `onlyManagement`, `onlyKeepers` and `onlyEmergencyAuthorized` available by default.

The symbol used for each tokenized Strategy is set automatically with a standardized approach based on the `asset`'s symbol. Strategists should use the `name` parameter in the constructor for a unique and descriptive name that encapsulates their specific Strategy.

## Periphery

To make Strategy writing as simple as possible, a suite of optional 'Periphery' helper contracts can be inherited by your Strategy to provide standardized and tested functionality for things like swaps. A complete list of the periphery contracts can be viewed here <https://github.com/yearn/tokenized-strategy-periphery/tree/master/src>

*All periphery contracts are optional; strategists can choose if they wish to use them.

### [Swappers](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/swappers)

To make reward swapping as easy and standardized as possible, multiple swapper contracts can be inherited by a strategy to inherit pre-built and tested logic for whichever method of reward swapping is desired. This allows a strategist only to need to set a few global variables and then simply use the default syntax of `_swapFrom(tokenFrom, tokenTo, amountIn, minAmountOut)` to swap any tokens easily during `_harvestAndReport`.

### [APR Oracles](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/AprOracle)

For easy integration with Vaults, front ends, debt allocators, etc. There is the option to create an [APR oracle](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/AprOracle/AprOracleBase.sol) contract for your specific strategy that should return the expected APR of the Strategy based on some given `debtChange`.

### [HealthCheck](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/Bases/HealthCheck)

To prevent automated reports from reporting losses/excessive profits that may not be accurate, a strategist can inherit and implement the [HealthCheck](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/Bases/HealthCheck/BaseHealthCheck.sol) contract. This can ensure that a keeper will not call a report that may incorrectly realize incorrect losses or excessive gains. It can cause the report to revert if the gain/loss is outside of the desired bounds and will require manual intervention to ensure the strategy is reporting correctly.

**NOTE**: It is recommended to implement some checks in `_harvestAndReport` for leveraged or manipulatable strategies that could report incorrect losses due to unforeseen circumstances.

### [Report Triggers](https://github.com/yearn/tokenized-strategy-periphery/tree/master/src/ReportTrigger)

The expected behavior is that strategies report profits/losses on a schedule based on their specific `profitMaxUnlockTime` that management can customize. If a custom trigger cycle is desired or extra checks should be added a strategist can create their own [customReportTrigger](https://github.com/yearn/tokenized-strategy-periphery/blob/master/src/ReportTrigger/CustomStrategyTriggerBase.sol) that can be added to the default contract for a specific strategy.

*More information can be found below in the "Reporting" section.

## Testing

Due to the nature of the BaseStrategy utilizing an external contract for most of its logic, the default interface for any strategy will not allow proper testing of all functions. Testing of your Strategy should utilize the pre-built [IStrategyInterface](https://github.com/yearn/tokenized-strategy-foundry-mix/blob/master/src/interfaces/IStrategyInterface.sol) to cast any deployed strategy through for testing, as seen in the testing setups in each mix. You can add any external functions you add for your specific strategy to this interface to test all functions with one variable.

Foundry Example:

    Strategy _strategy = new Strategy(asset, name);
    IStrategyInterface strategy =  IStrategyInterface(address(_strategy));

Ape Example:

    strategy = management.deploy(project.Strategy, asset, name)
    strategy =  project.IStrategyInterface.at(strategy.address)

Due to the permissionless nature of the Tokenized Strategies, all tests are written without integration with any allocator vault funding it. While those tests can be added, all V3 vaults utilize the ERC-4626 standard for deposit/withdraw and accounting, so they can be plugged in easily to any number of different vaults with the same `asset.`

## Deployment

Building a factory that can be deployed once is recommended for strategies that will be used with multiple different assets. Then, all strategies can be deployed on the chain using the factory.

**Cloning is not recommended for Tokenized Strategies.**

#### Contract Verification

Once the Strategy is deployed and verified, you must also verify the TokenizedStrategy functions. To do this, navigate to the /#code page on Etherscan.

1. Click on the `More Options` drop-down menu.
2. Click "is this a proxy?".
3. Click the "Verify" button.
4. Click "Save".

This should add all of the external `TokenizedStrategy` functions to the contract interface on Etherscan.

## Operating Your strategy

Once deployed your strategy should be able to be interacted with as any other ERC-4626 vault.

In addition to the normal 4626 interface, Tokenized Strategies come built-in with some simple functions for management to properly maintain the strategy.

### Reporting

The main operational procedure strategists need to take care of is the reporting of a strategy. Calling `report` on a strategy must be done by either the 'management' or 'keeper' address.

Reporting causes the strategy to accrue rewards, and record any gains or losses, as well as charge and pay fees. It is needed for the depositors of a vault to earn yield and for the strategist to earn fees.

It is recommended to build strategies on the assumption that reports will happen based on the strategies specific `profitMaxUnlockTime`.

Since reports are the only time _harvestAndReport will be called any strategies that need more frequent checks or updates should override the_tend and tendTrigger functions for any needed mid-report maintenance.

#### Keepers

The easiest way to ensure regular reports and tends on your strategy is to hook it up with a 3rd party keeper.

The recommended keeper network is the [Gelato Network](https://www.gelato.network/).

### Setters

The strategy comes with some default variables that the management of a strategy can set and update.

1. Changing management: Changing the strategies management is a two-step process. First, the current management must call `setPendingManagement(address)` with the desired address to transfer the management to. Then, that address must call `acceptManagement()` for the change to go into effect.
2. Keeper. A strategy manager can set a new address to be the keeper at any time with `setKeeper(address)`.
3. Emergency Admin. This will default to address(0) and can be set by the management with `setEmergencyAdmin(address)`.
4. Performance Fee. Management can adjust the amount of the gain realized during a report that gets charged as a performance fee with `setPerformanceFee(uint16)`.
    **Subject to min and max.
4. Performance Fee Recipient. Set the address to receive the performance fees charged during a report with `setPerformanceFeeRecipient(address)`.
5. Profit Unlocking Period. Profits recorded during reports are slowly unlocked to depositors of a strategy over the strategy-specific 'profitMaxUnlockTime'. This defaults to 10 days and can be changed at any time by the strategist with `setProfitMaxUnlockTime(uint256)`.

### Emergencies

There are two default emergency functions built in. The first of which is `shutdownStrategy()`. This can only ever be called by the management or emergencyAdmin and is non-reversible.

Once this is called it will stop any further deposits or mints but will not affect any other functionality including withdraw, redeem, report and tend. This allows management to continue recording profits or losses and users to withdraw even post-shutdown.

This can be used in an emergency or simply to retire a vault.

Once a strategy is shut down management or the emergencyAdmin can also call `emergencyWithdraw(_amount)`, which will tell the strategy to withdraw a specified `_amount` from the yield source and keep it idle in the vault.

All other emergency functionality is left up to the individual strategist.
