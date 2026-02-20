# yVaults v3 Contract Addresses

<AddressCheck contractType='v3'/>

:::info

Deployments are done using create2 factories and should be stable across all EVM chains the protocol has been deployed on.

If any of the core contracts have not been deployed on a specific chain it can be done permissionlessly using [this CLI tool](https://github.com/wavey0x/yearn-v3-deployer) or via the scripts in the relevant GitHub repo. If you have issues or questions, please reach out to a Yearn contributor for help.

:::

## Protocol Addresses

These are the deployed protocol contracts that can be used by anyone to create and manage yVaults. For Yearn implementation-specific contracts see [#Yearn Addresses](#yearn-specific-addresses)

All Protocol Specific contracts can be found by starting with the `ProtocolAddressProvider` contract as the top level directory and then the `ReleaseRegistry`. The `VaultFactory` and `TokenizedStrategy` contracts can be found in the Release Registry and the Vault Original can be found in the `VaultFactory`.

The Role Manager Factory provides the easiest way to deploy and manage your own V3 vaults. More information on that [here](../v3/vault_management.md#deployment).

| Name / ENS | Contract Address |
| ---------------- | ----------------- |
| **Protocol Address Provider** <br/> address-provider.v3.ychad.eth | <ContractAddress contractName={['topLevel', 'protocolAddressProvider']} /> |
| **Release Registry** <br/> release.registry.v3.ychad.eth | <ContractAddress contractName={['topLevel', 'releaseRegistry']} /> |
| **Role Manager Factory** <br/> | <ContractAddress contractName={['protocolPeriphery', 'roleManagerFactory']} /> |

## Core Contract Addresses

Core contracts are the base generic contracts that can be used by anyone who wants to build on v3 yVaults.

### Version 3.0.4

- Vault original: <ContractAddress contractName = {['releaseRegistry', '3.0.4','vaultOriginal']} />
- VaultFactory: <ContractAddress contractName = {['releaseRegistry', '3.0.4', 'factory']} />
- TokenizedStrategy: <ContractAddress contractName = {['releaseRegistry', '3.0.4','tokenizedStrategy']} />

### Version 3.0.3

- Vault original: <ContractAddress contractName = {['releaseRegistry', '3.0.3','vaultOriginal']} />
- VaultFactory: <ContractAddress contractName = {['releaseRegistry', '3.0.3', 'factory']} />
- TokenizedStrategy: <ContractAddress contractName = {['releaseRegistry', '3.0.3','tokenizedStrategy']} />

### Version 3.0.2

- Vault original: <ContractAddress contractName = {['releaseRegistry', '3.0.2','vaultOriginal']} />
- VaultFactory: <ContractAddress contractName = {['releaseRegistry', '3.0.2', 'factory']} />
- TokenizedStrategy: <ContractAddress contractName = {['releaseRegistry', '3.0.2','tokenizedStrategy']} />

### Version 3.0.1

- Vault ERC-5202 BluePrint: <ContractAddress contractName = {['releaseRegistry', '3.0.1','vaultOriginal']} />
- VaultFactory : <ContractAddress contractName = {['releaseRegistry', '3.0.1', 'factory']} />
- TokenizedStrategy : <ContractAddress contractName = {['releaseRegistry', '3.0.1','tokenizedStrategy']} />

### Periphery Contracts

All generic periphery contracts and factories can be retrieved on chain from the `AddressProvider` Contract:

| Name / ENS |  Periphery Contract Address |
| ---------------------- | ---------------------- |
| **Protocol Address Provider** <br/> address-provider.v3.ychad.eth |  <ContractAddress contractName = {['topLevel', 'protocolAddressProvider']} /> |
| **APR Oracle**   <br/> apr.oracle.v3.ychad.eth | <ContractAddress contractName = {['protocolPeriphery', 'aprOracle']} /> |
| **Common Report Trigger**  <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'commonReportTrigger']} /> |
| **4626 Router**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'router']} /> |
| **Accountant Factory**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'accountantFactory']} /> |
| **Debt Allocator Factory**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'debtAllocatorFactory']} /> |
| **Registry Factory**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'registryFactory']} /> |
| **Splitter Factory**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'splitterFactory']} /> |
| **Auction Factory**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'auctionFactory']} /> |
| **Keeper**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'keeper']} /> |
| **Base Fee Provider**   <br/>  | <ContractAddress contractName = {['protocolPeriphery', 'baseFeeProvider']} /> |

For a more complete list of all available periphery contracts visit the [Periphery](/developers/v3/periphery) section.

## Yearn Specific Addresses

Yearn Specific contracts and roles, as well as the most up to date V3 registry can be retrieved on chain from the Role Manager.

To find individual vaults, use the V3 Registry below or refer to https://yearn.fi/v3

### EVM Stable Addresses

These addresses are consistent across all EVM chains.

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Current V3 Registry** <br/> registry.v3.ychad.eth | <ContractAddress contractName = {['yearnV3ContractsStable', 'registry']} /> |
| **Legacy V3 Registry** <br/> | <ContractAddress contractName = {['yearnV3ContractsStable', 'legacyRegistry1']} /> |

### Ethereum Mainnet (1) Addresses

Ethereum-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/> role-manager.v3.ychad.eth | <ContractAddress contractName = {['yearnV3ContractsMainnet', 'roleManager']} /> |
| **Accountant** <br/> accountant.v3.ychad.eth | <ContractAddress contractName = {['yearnV3ContractsMainnet', 'accountant']} /> |

### Optimism (10) Addresses

Optimism-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/>   | <ContractAddress contractName = {['yearnV3ContractsOptimism', 'roleManager']} chainID={10}/>  |
| **Accountant** <br/>     | <ContractAddress contractName = {['yearnV3ContractsOptimism', 'accountant']} chainID={10} />   |

### Polygon (137) Addresses

Polygon-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/>   | <ContractAddress contractName = {['yearnV3ContractsPolygon', 'roleManager']} chainID={137} />   |
| **Accountant** <br/>     | <ContractAddress contractName = {['yearnV3ContractsPolygon', 'accountant']} chainID={137} />   |

### Base (8453) Addresses

Base-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/>   | <ContractAddress contractName = {['yearnV3ContractsBase', 'roleManager']} chainID={8453} />   |
| **Accountant** <br/>     | <ContractAddress contractName = {['yearnV3ContractsBase', 'accountant']} chainID={8453} />    |

### Arbitrum (42161) Addresses

Arbitrum-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/>   | <ContractAddress contractName = {['yearnV3ContractsArbitrum', 'roleManager']} chainID={42161} />   |
| **Accountant** <br/>     | <ContractAddress contractName = {['yearnV3ContractsArbitrum', 'accountant']} chainID={42161} />   |

### Katana (747474) Addresses

Katana-specific Yearn addresses

| Name / ENS | Contract Address |
| ----------------------   | ---------------------- |
| **Role Manager** <br/>   | <ContractAddress contractName = {['yearnV3ContractsKatana', 'roleManager']} chainID={747474}/>   |
| **Accountant** <br/>     | <ContractAddress contractName = {['yearnV3ContractsKatana', 'accountant']} chainID={747474}/>   |
