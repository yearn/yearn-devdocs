---
title: Integration Methods
---

We propose two methods of integration, each used for different purposes. If you think of a more ideal integration method, we are open to accepting it.

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

