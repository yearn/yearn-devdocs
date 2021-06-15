---
title: Integration Methods
---

We propose two different integration methods for different use cases. You can use the one that fits you better.

## Wrapper

User deposits your Wrapper,
Wrapper deposits into Yearn Vault,
Vault issues vault tokens to Wrapper,
Wrapper issues wrapper tokens to User.

See the template available on [Github](https://github.com/yearn/brownie-wrapper-mix) with tests

Implications:

- your contributed TVLs are easily tracked with precision.
- your vault tokens are not fungible with other partner tokens or with yearn's vanilla vault tokens.
- each vault requires its own wrapper.
- solution and testing are comparatively complex.

## Delegated Deposit

User deposits your routing contract,
Routing contract routes the deposit into the Yearn Vault,
Vault issues vault tokens to the User.

The v2 vault's deposit() function has a recipient parameter that defaults to msg.sender, but can also take any other address, effectively allowing a contract or EOA to delegate a deposit on behalf of another intended recipient. You can see the function #24 [here](https://etherscan.io/address/0x19D3364A399d251E894aC732651be8B0E4e85001#writeContract).

If you deposit funds using this delegated method, from an address already known to Yearn, we can attribute the TVL to you and pay you a profit share based on this.

You deploy a simple routing contract which deposits your user's funds into the yearn vault in question via this address, which acts as your unique identifier. One single contract could handle all routing for you, or you could do one routing contract per vault. You can tailor the design to your needs, as long as Yearn can use a defined set of addresses that source the deposits, which you provide to us to keep track of your contributed share of TVL.

There is one catch: If your user transfers the vault token away from the original recipient address, we won't track it anymore and TVL will no longer be attributed to you. We believe that a strong majority of users will not be moving vault tokens around, tokens tend to stay in the end user's wallet until funds are withdrawn from the vault.

Implications:

- user gets credited regular vanilla yearn vault tokens for a better user experience
- loss of TVL attributed if users transfer the vault tokens  
- simpler implementation and testing