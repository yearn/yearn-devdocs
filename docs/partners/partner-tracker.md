# Yearn's Partner Tracker

Yearn's Partner Tracker is an implementation of [Delegated Deposit](https://docs.yearn.fi/partners/integration_guide#delegated-deposit):

- Contract Source Code: https://github.com/yearn/yearn-partner-tracker

| Network          | Deploy Address                                                                                                                   |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| Ethereum (1)     | [0x8ee392a4787397126C163Cb9844d7c447da419D8](https://etherscan.io/address/0x8ee392a4787397126C163Cb9844d7c447da419D8)            |
| Optimism (10)    | [0x7E08735690028cdF3D81e7165493F1C34065AbA2](https://optimistic.etherscan.io/address/0x7E08735690028cdF3D81e7165493F1C34065AbA2) |
| Fantom (250)     | [0x086865B2983320b36C42E48086DaDc786c9Ac73B](https://ftmscan.com/address/0x086865B2983320b36C42E48086DaDc786c9Ac73B)             |
| Arbitrum (42161) | [0x0e5b46E4b2a05fd53F5a4cD974eb98a9a613bcb7](https://arbiscan.io/address/0x0e5b46E4b2a05fd53F5a4cD974eb98a9a613bcb7)             |

## Functionality

The `deposit()` function is used to deposit funds into a vault. This function takes two parameters:

- `vault` - Address of the vault where the funds will be deposited.
- `partnerId` - Address of the partner who has referred the deposit.

When a user deposits funds into the vault, the contract will log the amount of funds that were deposited, allowing the user to keep track and monitor their total deposits.

The `ReferredBalanceIncreased()` event will be emitted when a partner's referred balance increases. This event will contain the following data:

- `partnerId` - Address of the partner who referred the deposit.
- `vault` - Address of the vault where the deposit was made.
- `depositer` - Address of the user who made the deposit.
- `amountAdded` - Amount of funds that were deposited.
- `totalDeposited` - Total amount of funds deposited by the user.

## Usage

To use the Yearn V2 Partner Tracker, users must first approve the contract by setting the allowance of their wallet to the contract address. Once the allowance is set, users can then call the `deposit()` function to deposit funds into a vault.

The amount of funds that are deposited can be specified, or the user can opt to deposit the entire balance of their wallet. In either case, the contract will record the amount of funds that were deposited and assign them to the partner who referred the deposit.

Once the deposit is complete, the `ReferredBalanceIncreased()` event will be emitted, which will indicate the amount of funds that were deposited, as well as the total amount that has been deposited by the user.

## Examples

### Deposit full balance for a token

Alice is a partner who has referred Bob to deposit some funds into the Vault A contract. Bob wants to deposit the full balance of a token he owns into Vault A. He can do this by calling the following function:

```
function deposit(address vault, address partnerId) external returns (uint256)
```

He specifies the address of Vault A as the `vault` argument, and the address of Alice as the `partnerId` argument.

### Deposit specific token amount

Bob wants to deposit a specific amount of tokens into Vault A, instead of the entire balance. He can do this by calling the following function:

```
function deposit(address vault, address partnerId, uint256 amount) external returns (uint256)
```

He specifies the address of Vault A as the vault argument, the address of Alice as the partnerId argument, and the amount of tokens he wants to deposit as the amount argument.

### Check balances tracked

Alice has referred multiple people to deposit into different vaults. The YearnPartnerTracker contract keeps track of the referred balance for each partner, vault, and depositor combination. Alice can check her referred balance for a particular vault and depositor by querying the following mapping:

```
mapping (address => mapping (address => mapping(address => uint256))) public referredBalance;
```

For example, to check Alice's referred balance for Vault A and Bob, Alice can call the following function:

```
function checkReferredBalance(address partnerId, address vault, address depositor) public view returns (uint256) {
    return referredBalance[partnerId][vault][depositor];
}
```

She specifies her own address as the `partnerId` argument, the address of `Vault A` as the `vault` argument, and the address of Bob as the `depositor` argument. This function returns the referred balance for Alice, Bob, and `Vault A`.

### Event emitted

When deposits happen, the `YearnPartnerTracker` contract emits the `ReferredBalanceIncreased` event. Partners and other interested parties can use this event to track changes to referred balances. The event contains the following information:

```
event ReferredBalanceIncreased(
    address indexed partnerId,
    address indexed vault,
    address indexed depositor,
    uint amountAdded,
    uint totalDeposited
);
```

The `partnerId` field contains the address of the partner who referred the deposit, the `vault` field contains the address of the vault where the deposit was made, the `depositor` field contains the address of the depositor, the `amountAdded` field contains the amount of yVault tokens received by the depositor, and the `totalDeposited` field contains the total amount of yVault tokens deposited by the depositor for this partner and vault combination.
