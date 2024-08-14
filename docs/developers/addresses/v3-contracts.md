# yVaults v3 Contract Addresses

## Core Contract Addresses

Core contracts are the base generic contracts that can be used by anyone who wants to build on v3 yVaults .

:::note

Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on.

If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.

:::

### Version 3.0.2

- Vault original : [`0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467`](https://etherscan.io/address/0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467#readContract)
- VaultFactory : [`0x444045c5C13C246e117eD36437303cac8E250aB0`](https://etherscan.io/address/0x444045c5C13C246e117eD36437303cac8E250aB0#readContract)
- TokenizedStrategy : [`0xBB51273D6c746910C7C06fe718f30c936170feD0`](https://etherscan.io/address/0xBB51273D6c746910C7C06fe718f30c936170feD0#readContract)

### Version 3.0.1

- Vault ERC-5202 BluePrint: [`0xDE992C652b266AE649FEC8048aFC35954Bee6145`](https://etherscan.io/address/0xDE992C652b266AE649FEC8048aFC35954Bee6145#readContract)
- VaultFactory: [`0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5`](https://etherscan.io/address/0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5#readContract)
- TokenizedStrategy: [`0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2`](https://etherscan.io/address/0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2#readContract)

## Periphery Contracts

A list of the deployed v3 yVault system contracts. To find individual vaults, use the [V3 Registry](https://etherscan.io/address/0xff31a1b020c868f6ea3f61eb953344920eeca3af#readContract) or refer to https://yearn.fi

### Protocol Address Provider

All generic periphery contracts and factories can be retrieved on chain from the Address Provider: [`0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B`](https://etherscan.io/address/0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B#readContract)

| Identity               | Address                                    |
| ---------------------- | ------------------------------------------ |
| V3 Registry            | [0xff31A1B020c868F6eA3f61Eb953344920EeCA3af](https://etherscan.com/address/0xff31A1B020c868F6eA3f61Eb953344920EeCA3af) |
| Release Registry       | [0x990089173D5d5287c344092Be0bB37950A67d17B](https://etherscan.com/address/0x990089173D5d5287c344092Be0bB37950A67d17B) |
| Report Trigger         | [0xD98C652f02E7B987e0C258a43BCa9999DF5078cF](https://etherscan.com/address/0xD98C652f02E7B987e0C258a43BCa9999DF5078cF) |
| APR Oracle             | [0x27aD2fFc74F74Ed27e1C0A19F1858dD0963277aE](https://etherscan.com/address/0x27aD2fFc74F74Ed27e1C0A19F1858dD0963277aE) |
| 4626 Router            | [0x1112dbCF805682e828606f74AB717abf4b4FD8DE](https://etherscan.com/address/0x1112dbCF805682e828606f74AB717abf4b4FD8DE) |
| Protocol Address Provider| [0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B](https://etherscan.com/address/0x1e9778aAD41Aa3E0884C276fB4C2D03C4036Aa0B) |

For more information on the periphery contracts visit the [Periphery](/developers/v3/periphery) section.
