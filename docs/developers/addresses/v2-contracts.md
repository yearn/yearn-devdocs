# yVaults v2 Contract Addresses

A list of the deployed v2 yVault system contracts. To find individual vaults, use the Registry contracts listed below or refer to https://yearn.fi

:::warning

These contracts are copies of the "core contracts". The multi-sigs can probably be removed (they will be kept in `core-contracts`), but we need confirmation which contracts should live here.
contracts that I believe may be removed are crossed out. This should be double checked though.

### Questions

Are `strategist multi-sigs` part of the v2 system or should those live in multi-sig land? What about the `core dev multi-sig`?

:::

## Ethereum Contracts

| Identity               | ENS                   | Address                                    |
| ---------------------- | --------------------- | ------------------------------------------ |
| V2 Registry            | v2.registry.ychad.eth | [0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804](https://etherscan.io/address/0x50c1a2eA0a861A967D9d0FFE2AE4012c2E053804) |
| Health Check           | health.ychad.eth      | [0xDDCea799fF1699e98EDF118e0629A974Df7DF012](https://etherscan.io/address/0xDDCea799fF1699e98EDF118e0629A974Df7DF012) |
| Role Manager           |                       | [0xb3bd6B2E61753C311EFbCF0111f75D29706D9a41](https://etherscan.com/address/0xb3bd6B2E61753C311EFbCF0111f75D29706D9a41)|
| Debt Allocator Factory |                       | [0xfCF8c7C43dedd567083B422d6770F23B78D15BDe](https://etherscan.com/address/0xfCF8c7C43dedd567083B422d6770F23B78D15BDe)|
| Accountant             |                       | [0x5A74Cb32D36f2f517DB6f7b0A0591e09b22cDE69](https://etherscan.com/address/0x5A74Cb32D36f2f517DB6f7b0A0591e09b22cDE69)|
| ~~Yearn multisig (daddy)~~ | ychad.eth             | [0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52](https://etherscan.io/address/0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52) |
| ~~Strategist multisig~~   | brain.ychad.eth       | [0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7](https://etherscan.io/address/0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7) |
| ~~Core Dev multisig~~     | dev.ychad.eth         | [0x846e211e8ba920B353FB717631C015cf04061Cc9](https://etherscan.io/address/0x846e211e8ba920B353FB717631C015cf04061Cc9) |
| ~~Treasury~~               | treasury.ychad.eth    | [0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde](https://etherscan.io/address/0x93A62dA5a14C80f265DAbC077fCEE437B1a0Efde) |
| ~~V3 Registry~~          |                       | [0xff31A1B020c868F6eA3f61Eb953344920EeCA3af](https://etherscan.com/address/0xff31A1B020c868F6eA3f61Eb953344920EeCA3af)|

## Polygon Contracts

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| ~~pChad Multisig~~       | [0xC4ad0000E223E398DC329235e6C497Db5470B626](https://polygonscan.com/address/0xC4ad0000E223E398DC329235e6C497Db5470B626) |
| ~~Strategist Multisig~~   | [0x16388000546eDed4D476bd2A4A374B5a16125Bc1](https://polygonscan.com/address/0x16388000546eDed4D476bd2A4A374B5a16125Bc1) |
| ~~V3 Registry~~         | [0xff31A1B020c868F6eA3f61Eb953344920EeCA3af](https://polygonscan.com/address/0xff31A1B020c868F6eA3f61Eb953344920EeCA3af) |

## Fantom Contracts

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| Registry               | [0x727fe1759430df13655ddb0731dE0D0FDE929b04](https://ftmscan.com/address/0x727fe1759430df13655ddb0731dE0D0FDE929b04) |
| Health Check           | [0xf13Cd6887C62B5beC145e30c38c4938c5E627fe0](https://ftmscan.com/address/0xf13Cd6887C62B5beC145e30c38c4938c5E627fe0) |
| ~~Strategist multisig~~   | [0x72a34AbafAB09b15E7191822A679f28E067C4a16](https://ftmscan.com/address/0x72a34AbafAB09b15E7191822A679f28E067C4a16) |
| ~~Governance multisig~~   | [0xC0E2830724C946a6748dDFE09753613cd38f6767](https://ftmscan.com/address/0xC0E2830724C946a6748dDFE09753613cd38f6767) |
| ~~Treasury~~            | [0x89716ad7edc3be3b35695789c475f3e7a3deb12a](https://ftmscan.com/address/0x89716ad7edc3be3b35695789c475f3e7a3deb12a) |

## Arbitrum Contracts

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| Registry               | [0x3199437193625DCcD6F9C9e98BDf93582200Eb1f](https://arbiscan.io/address/0x3199437193625DCcD6F9C9e98BDf93582200Eb1f) |
| Health Check           | [0x32059ccE723b4DD15dD5cb2a5187f814e6c470bC](https://arbiscan.io/address/0x32059ccE723b4DD15dD5cb2a5187f814e6c470bC) |
| ~~Strategist multisig~~   | [0x6346282DB8323A54E840c6C772B4399C9c655C0d](https://arbiscan.io/address/0x6346282DB8323A54E840c6C772B4399C9c655C0d) |
| ~~Governance multisig~~   | [0xb6bc033D34733329971B938fEf32faD7e98E56aD](https://arbiscan.io/address/0xb6bc033D34733329971B938fEf32faD7e98E56aD) |
| ~~Treasury~~           | [0x1DEb47dCC9a35AD454Bf7f0fCDb03c09792C08c1](https://arbiscan.io/address/0x1DEb47dCC9a35AD454Bf7f0fCDb03c09792C08c1) |
| ~~V3 Registry~~          | [0xff31A1B020c868F6eA3f61Eb953344920EeCA3af](https://polygonscan.com/address/0xff31A1B020c868F6eA3f61Eb953344920EeCA3af) |

## Optimism Contracts

> Registry is made up of 2 contracts: "Release Registry" and "Vault Registry"

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| Release Registry       | [0x81291ceb9bB265185A9D07b91B5b50Df94f005BF](https://optimistic.etherscan.io/address/0x81291ceb9bB265185A9D07b91B5b50Df94f005BF) |
| Vault Registry         | [0x79286Dd38C9017E5423073bAc11F53357Fc5C128](https://optimistic.etherscan.io/address/0x79286Dd38C9017E5423073bAc11F53357Fc5C128) |
| Health Check           | [0x3d8F58774611676fd196D26149C71a9142C45296](https://optimistic.etherscan.io/address/0x3d8F58774611676fd196D26149C71a9142C45296) |
| ~~Strategist multisig~~   | [0xea3a15df68fCdBE44Fdb0DB675B2b3A14a148b26](https://optimistic.etherscan.io/address/0xea3a15df68fCdBE44Fdb0DB675B2b3A14a148b26) |
| ~~Governance multisig~~   | [0xF5d9D6133b698cE29567a90Ab35CfB874204B3A7](https://optimistic.etherscan.io/address/0xF5d9D6133b698cE29567a90Ab35CfB874204B3A7) |
| ~~Treasury~~            | [0x84654e35E504452769757AAe5a8C7C6599cBf954](https://optimistic.etherscan.io/address/0x84654e35E504452769757AAe5a8C7C6599cBf954) |
