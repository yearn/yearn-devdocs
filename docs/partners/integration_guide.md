---
title: Integration Methods
---

Yearn offers two different types of integration: Wrapper and Delegated Deposit. Each method has its unique advantages and disadvantages, so it is essential to consider the requirements of your specific use case when selecting one. 

**Wrapper**
- Custodial, with yvTokens inside the wrapper contract 
- The user receives a custom token, with the ability to only use the partner’s contract to deposit, withdraw, etc
- Allows for custom integrations with complex logic
- Since tokens are held in the contract, we can track the balance at any given time

**Delegated Deposit**
- Non-custodial, with tokens sent to Yearn’s contracts 
- The user receives standard yvTokens, and can use Yearn’s website to interact with their funds
- Designed for UIs, wallets, and other more straightforward integrations
- The TVL is attributed until the user transfers the tokens to another address

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

See an example implementation of Delegated Deposit at [Partner Tracker V2](https://docs.yearn.finance/partners/partner-tracker-v2)