---
title: Partnership
---

We propose two options:

## 1/ WRAPPER

User makes a deposit into your Wrapper,
Wrapper deposits into Yearn Vault,
Vault issues vault tokens to Wrapper,
Wrapper issues wrapper tokens to User.

See the templeate available on Github with tests[0]

Implications:
- your contributed TVLs are easily tracked with precision.
- your vault tokens are not fungible with other partner tokens or with yearn's vanilla vault tokens.
- each vault requires its own wrapper.
- solution and testing is comparatively complex.

## 2/ DELEGATED DEPOSIT

User makes a deposit via your routing contract,
Routing contract routes the deposit into the Yearn Vault,
Vault issues vault tokens to User.

The v2 vault's deposit() function has a recipient parameter which defaults to msg.sender, but can also take any other address, effectively allowing a contract or EOA to delegate a deposit on behalf of another intended recipient.[1]

If you deposit funds using this delegated method, from an address already known to Yearn, we can attribute the TVL to you and pay you profit share based on this.

You deploy a simple routing contract which deposits your user's funds into the yearn vault in question via this address, which acts as your unique identifier. One single contract could handle all routing for you, or you could do one routing contract per vault. You can tailor the design to your needs, as long as Yearn can use a defined set of addresses that source the deposits, which you provide to us to keep track of your contributed share of TVL.

There is one catch: If your user transfers the vault token away from the original recipient address, we won't track it anymore and TVL will no longer be attributed to you. We believe that a strong majortity of users will not be moving vault tokens around, tokens tend to stay in the end user's wallet until funds are withdrawn from the vault.

Implications:
- user gets credited regular vanilla yearn vault tokens for a better user expereince
- loss of TVL attributed if users transfers the vault tokens  
- simpler implementation and testing

[0] https://github.com/yearn/brownie-wrapper-mix

[1] See live example for yDAI, #24: https://etherscan.io/address/0x19D3364A399d251E894aC732651be8B0E4e85001#writeContract