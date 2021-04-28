



## Functions
### apiVersion
```solidity
  function apiVersion(
  ) external returns (string)
```




### withdraw
```solidity
  function withdraw(
  ) external
```




### token
```solidity
  function token(
  ) external returns (address)
```




### strategies
```solidity
  function strategies(
  ) external returns (struct StrategyParams)
```




### creditAvailable
```solidity
  function creditAvailable(
  ) external returns (uint256)
```
View how much the Vault would increase this Strategy's borrow limit,
based on its present performance (since its last report). Can be used to
determine expectedReturn in your Strategy.



### debtOutstanding
```solidity
  function debtOutstanding(
  ) external returns (uint256)
```
View how much the Vault would like to pull back from the Strategy,
based on its present performance (since its last report). Can be used to
determine expectedReturn in your Strategy.



### expectedReturn
```solidity
  function expectedReturn(
  ) external returns (uint256)
```
View how much the Vault expect this Strategy to return at the current
block, based on its present performance (since its last report). Can be
used to determine expectedReturn in your Strategy.



### report
```solidity
  function report(
  ) external returns (uint256)
```
This is the main contact point where the Strategy interacts with the
Vault. It is critical that this call is handled as intended by the
Strategy. Therefore, this function will be called by BaseStrategy to
make sure the integration is correct.



### revokeStrategy
```solidity
  function revokeStrategy(
  ) external
```
This function should only be used in the scenario where the Strategy is
being retired but no migration of the positions are possible, or in the
extreme scenario that the Strategy needs to be put into "Emergency Exit"
mode in order for it to exit as quickly as possible. The latter scenario
could be for any reason that is considered "critical" that the Strategy
exits its position as fast as possible, such as a sudden change in
market conditions leading to losses, or an imminent failure in an
external dependency.



### governance
```solidity
  function governance(
  ) external returns (address)
```
View the governance address of the Vault to assert privileged functions
can only be called by governance. The Strategy serves the Vault, so it
is subject to governance defined by the Vault.



