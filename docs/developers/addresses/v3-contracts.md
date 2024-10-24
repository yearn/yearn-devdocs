# yVaults v3 Contract Addresses

:::note

Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on.

If a contract has not been deployed on a specific chain it can be done permissionlessly using the scripts in the relevant GitHub repo. Or reach out to a Yearn contributor for help.

:::

## Protocol Addresses

These are the deployed protocol contracts that can be used by anyone to create and manage yVaults. For Yearn implementation-specific contracts see [#Yearn Addresses](#yearn-specific-addresses)

All Protocol Specific contracts can be found by starting with the `ProtocolAddressProvider` contract as the top level directory and then the `ReleaseRegistry`. The `VaultFactory` and `TokenizedStrategy` contracts can be found in the Release Registry and the Vault Original can be found in the `VaultFactory`.

| Contract Name   |  Contract Address |
| ----------------------   | ------------------------------------------ |
| Protocol Address Provider   |  [0x775F09d6f3c8D2182DFA8bce8628acf51105653c](https://etherscan.io/address/0x775F09d6f3c8D2182DFA8bce8628acf51105653c) |
| Release Registry            | [0x0377b4daDDA86C89A0091772B79ba67d0E5F7198](https://etherscan.io/address/0x0377b4daDDA86C89A0091772B79ba67d0E5F7198) |

### Core Contract Addresses

Core contracts are the base generic contracts that can be used by anyone who wants to build on v3 yVaults.

### Version 3.0.3

- Vault original : [`0xcA78AF7443f3F8FA0148b746Cb18FF67383CDF3f`](https://etherscan.io/address/0xcA78AF7443f3F8FA0148b746Cb18FF67383CDF3f#readContract)
- VaultFactory : [`0x5577EdcB8A856582297CdBbB07055E6a6E38eb5f`](https://etherscan.io/address/0x5577EdcB8A856582297CdBbB07055E6a6E38eb5f#readContract)
- TokenizedStrategy : [`0x254A93feff3BEeF9cA004E913bB5443754e8aB19`](https://etherscan.io/address/0x254A93feff3BEeF9cA004E913bB5443754e8aB19#readContract)

### Version 3.0.2

- Vault original : [`0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467`](https://etherscan.io/address/0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467#readContract)
- VaultFactory : [`0x444045c5C13C246e117eD36437303cac8E250aB0`](https://etherscan.io/address/0x444045c5C13C246e117eD36437303cac8E250aB0#readContract)
- TokenizedStrategy : [`0xBB51273D6c746910C7C06fe718f30c936170feD0`](https://etherscan.io/address/0xBB51273D6c746910C7C06fe718f30c936170feD0#readContract)

### Version 3.0.1

- Vault ERC-5202 BluePrint: [`0xDE992C652b266AE649FEC8048aFC35954Bee6145`](https://etherscan.io/address/0xDE992C652b266AE649FEC8048aFC35954Bee6145#readContract)
- VaultFactory: [`0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5`](https://etherscan.io/address/0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5#readContract)
- TokenizedStrategy: [`0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2`](https://etherscan.io/address/0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2#readContract)

### Periphery Contracts

All generic periphery contracts and factories can be retrieved on chain from the `AddressProvider` Contract:

| Periphery Contract Name   |  Periphery Contract Address |
| ----------------------   | ------------------------------------------ |
| Protocol Address Provider|  [0x775F09d6f3c8D2182DFA8bce8628acf51105653c](https://etherscan.io/address/0x775F09d6f3c8D2182DFA8bce8628acf51105653c) |
| Debt Allocator Factory   | [0x03D43dF6FF894C848fC6F1A0a7E8a539Ef9A4C18](https://etherscan.io/address/0x03D43dF6FF894C848fC6F1A0a7E8a539Ef9A4C18) |
| Report Trigger           | [0xA045D4dAeA28BA7Bfe234c96eAa03daFae85A147](https://etherscan.io/address/0xA045D4dAeA28BA7Bfe234c96eAa03daFae85A147) |
| APR Oracle               | [0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92](https://etherscan.io/address/0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92) |
| 4626 Router              | [0x1112dbCF805682e828606f74AB717abf4b4FD8DE](https://etherscan.io/address/0x1112dbCF805682e828606f74AB717abf4b4FD8DE) |

For more information on the periphery contracts visit the [Periphery](/developers/v3/periphery) section.

## Yearn Specific Addresses

Yearn Specific contracts and roles can be retrieved on chain from the Role Manager

To find individual vaults, use the V3 Registry below or refer to https://yearn.fi

| Contract Name | Contract Address |
| ----------------------   | ------------------------------------------ |
| Role Manager             | [0xb3bd6B2E61753C311EFbCF0111f75D29706D9a41](https://etherscan.io/address/0xb3bd6B2E61753C311EFbCF0111f75D29706D9a41) |
| V3 Registry              | [0xff31A1B020c868F6eA3f61Eb953344920EeCA3af](https://etherscan.io/address/0xff31A1B020c868F6eA3f61Eb953344920EeCA3af) |
|                       |                           |
| Accountant               | [0x5A74Cb32D36f2f517DB6f7b0A0591e09b22cDE69](https://etherscan.io/address/0x5A74Cb32D36f2f517DB6f7b0A0591e09b22cDE69) |
| Keeper                  | [0x52605BbF54845f520a3E94792d019f62407db2f8](https://etherscan.io/address/0x52605BbF54845f520a3E94792d019f62407db2f8) |
