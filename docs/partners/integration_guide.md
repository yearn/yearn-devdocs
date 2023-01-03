---
title: Integration Methods
---

Yearn provides three different methods of integration: Wrapper, Delegated Deposit, and Yearn V2 Partner Tracker. Each of these methods has different advantages and disadvantages, so it is important to consider the requirements of your particular use case when selecting an integration method:

Integration Method | Advantages | Disadvantages
----------------- | ---------- | -------------
[Wrapper](#wrapper) | Contributed TVLs are easily tracked with precision | Vault tokens are not fungible with other partner tokens or with Yearn's vanilla vault tokens, each vault requires its own wrapper, solution and testing are comparatively complex
[Delegated Deposit](#delegated-deposit) | User gets credited regular vanilla yearn vault tokens for a better user experience | Loss of TVL attributed if users transfer the vault tokens, simpler implementation and testing
[Yearn V2 Partner Tracker](#yearn-v2-partner-tracker) | Accurately tracks amount of deposits generated, emits events to track balance increases | Must approve contract before using, users must specify partnerId when making deposits

## Wrapper

Partners deploy the Wrapper contract for each vault utilized. 

1. User deposits into partner Wrapper
1. Wrapper deposits into Yearn Vault
1. Vault issues vault tokens to Wrapper
1. Wrapper issues wrapper tokens to User

Implications:

- Contributed TVLs are easily tracked with precision
- Vault tokens are not fungible with other partner tokens or with Yearn's vanilla vault tokens
- Each vault requires its own wrapper
- Solution and testing are comparatively complex

## Delegated Deposit

Partners deploy a routing contract for each vault utilized.

1. User deposits to the routing contract
1. Routing contract routes the deposit into the Yearn Vault
1. Vault issues vault tokens to the User

The v2 vault's deposit() function has a recipient parameter that defaults to msg.sender, but can also take any other address, effectively allowing a contract or EOA to delegate a deposit on behalf of another intended recipient. You can see the function #24 [here](https://etherscan.io/address/0x19D3364A399d251E894aC732651be8B0E4e85001#writeContract).

If funds are deposited using this delegated method from an address already known to Yearn, the TVL can be attributed to the address and profit will be shared based on that data. 

A single routing contract can handle multiple vaults, but can also be deployed on a per vault basis. The design is very flexible as long as a defined set of addresses is provided to keep track of the partner's contributed TVL.

Users will need to keep the issued vault token in the recipient address for TVL to be tracked. Tokens tend to stay in the end user's wallet, but this is an obvious tradeoff vs using the partner Wrapper. 

Implications:

- User gets credited regular vanilla yearn vault tokens for a better user experience
- Loss of TVL attributed if users transfer the vault tokens
- Simpler implementation and testing

## Yearn V2 Partner Tracker

Yearn V2 Partner Tracker was made to accurately track the amount of deposits a partner generates on top of yVaults, so they can be compensated accordingly. This contract makes use of the `VaultAPI` contract to track and manage deposits.

- Contract Source Code: https://github.com/yearn/yearn-partner-tracker

Yearn V2 Partner Tracker is deployed at the following addresses:

Network | Address
------- | -------
Ethereum (1) | [0x8ee392a4787397126C163Cb9844d7c447da419D8](https://etherscan.io/address/0x8ee392a4787397126C163Cb9844d7c447da419D8)
Optimism (10) | [0x7E08735690028cdF3D81e7165493F1C34065AbA2](https://optimistic.etherscan.io/address/0x7E08735690028cdF3D81e7165493F1C34065AbA2)
Fantom (250) | [0x086865B2983320b36C42E48086DaDc786c9Ac73B](https://ftmscan.com/address/0x086865B2983320b36C42E48086DaDc786c9Ac73B)
Arbitrum (42161) | [0x0e5b46E4b2a05fd53F5a4cD974eb98a9a613bcb7](https://arbiscan.io/address/0x0e5b46E4b2a05fd53F5a4cD974eb98a9a613bcb7) 

### Functionality

The `deposit()` function is used to deposit funds into a vault. The function takes two parameters: 

- `vault` - This is the address of the vault where the funds will be deposited. 
- `partnerId` - This is the address of the partner who has referred the deposit. 

When a user deposits funds into the vault, the contract will pull the specified amount from their wallet and assign it to the partner. The contract will also record the amount of funds that were deposited, allowing the user to track how much they have deposited in total.

The `ReferredBalanceIncreased()` event will be emitted when a partner's referred balance increases. This event will contain the following data: 

- `partnerId` - The address of the partner who referred the deposit. 
- `vault` - The address of the vault where the deposit was made. 
- `depositer` - The address of the user who made the deposit. 
- `amountAdded` - The amount of funds that were deposited. 
- `totalDeposited` - The total amount of funds deposited by the user. 

### Usage

To use the Yearn V2 Partner Tracker, users must first approve the contract by setting the allowance of their wallet to the contract address. Once the allowance is set, users can then call the `deposit()` function to deposit funds into a vault. 

The amount of funds that are deposited can be specified, or the user can opt to deposit the entire balance of their wallet. In either case, the contract will record the amount of funds that were deposited and assign them to the partner who referred the deposit. 

Once the deposit is complete, the `ReferredBalanceIncreased()` event will be emitted, which will indicate the amount of funds that were deposited, as well as the total amount that has been deposited by the user. 


### Examples

#### Deposit full balance for a token
Alice is a partner who has referred Bob to deposit some funds into the VaultA contract. Bob wants to deposit the full balance of a token he owns into VaultA. He can do this by calling the following function:

```
function deposit(address vault, address partnerId) external returns (uint256)
```

He specifies the address of VaultA as the `vault` argument, and the address of Alice as the `partnerId` argument.

#### Deposit specific token amount
Bob wants to deposit a specific amount of tokens into VaultA, instead of the entire balance. He can do this by calling the following function:

```
function deposit(address vault, address partnerId, uint256 amount) external returns (uint256)
```

He specifies the address of VaultA as the vault argument, the address of Alice as the partnerId argument, and the amount of tokens he wants to deposit as the amount argument.

#### Check balances tracked
Alice has referred multiple people to deposit into different vaults. The YearnPartnerTracker contract keeps track of the referred balance for each partner, vault, and depositor combination. Alice can check her referred balance for a particular vault and depositor by querying the following mapping:

```
mapping (address => mapping (address => mapping(address => uint256))) public referredBalance;
```

For example, to check Alice's referred balance for VaultA and Bob, Alice can call the following function:

```
function checkReferredBalance(address partnerId, address vault, address depositor) public view returns (uint256) {
    return referredBalance[partnerId][vault][depositor];
}
```


She specifies her own address as the `partnerId` argument, the address of `VaultA` as the `vault` argument, and the address of Bob as the `depositor` argument. This function returns the referred balance for Alice, Bob, and `VaultA`.

#### Event Emitted

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