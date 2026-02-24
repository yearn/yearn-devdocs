export type ContractAddresses = {
  v3ContractAddresses: V3ContractAddresses
  yfiTokenContracts: YfiTokenContracts
  veYfiContracts: VeYfiContracts
  veYfiGaugeAddresses: GaugeAddressRecord
  yearnMultisigMembers: YearnMultisigMembers
}

export type V3ContractAddresses = {
  topLevel: V3TopLevelAddresses
  protocolPeriphery: V3ProtocolPeripheryAddresses
  releaseRegistry: V3ReleaseDataMap
  yearnV3: YearnV3Addresses
}

export type V3TopLevelAddresses = {
  v3ProtocolAddressProvider: `0x${string}`
  v3ReleaseRegistry: `0x${string}`
  v3RoleManager: `0x${string}`
}

export type V3ProtocolPeripheryAddresses = {
  router: `0x${string}` | undefined
  aprOracle: `0x${string}` | undefined
  commonReportTrigger: `0x${string}` | undefined
  roleManagerFactory: `0x${string}` | undefined
}

export type V3ReleaseDataMap = {
  latestRelease: string
  [releaseNumber: string]: V3ReleaseData | string
}
// contains array of:
export type V3ReleaseData = {
  vaultOriginal: string
  factory: string
  tokenizedStrategy: string
}

export type YearnV3Addresses = {
  yearnBrain: `0x${string}` | undefined
  yearnDaddy: `0x${string}` | undefined
  yearnAccountant: `0x${string}` | undefined
  yearnDebtAllocator: `0x${string}` | undefined
  yearnRegistry: `0x${string}` | undefined
}

export type YfiTokenContracts = {
  yfiAddress: `0x${string}` | string
  veYfiAddress: `0x${string}` | string
  dYfiAddress: `0x${string}` | string
}

export type VeYfiContracts = {
  yfiGaugeRegistry: `0x${string}` | string
  yfiGaugeController: `0x${string}` | string
  dyfiRedemptionAddress: `0x${string}` | string
  yfiRewardPool: `0x${string}` | string
  dYfyiRewardPool: `0x${string}` | string
}

export type GaugeAddressRecord = Record<string, string>
export type GaugeCheckRecord = Record<string, boolean>
export type MultisigAddressList = `0x${string}`[]

export type VeYfiGauge = {
  index: number
  symbol: string
  name: string
  address: `0x${string}` | string
  underlyingDecimals: number
  underlyingVaultAddress: `0x${string}` | string
}

export type YearnMultisigMembers = {
  multisigAddress: `0x${string}`
  docsMemberAddresses: MultisigAddressList
  onChainOwners: MultisigAddressList
  docsSourcePath: string
}

export type MultisigChecks = {
  docsMembersSectionParsed: boolean
  docsAddressesValid: boolean
  docsOwnerCountMatch: boolean
  docsUniqueOwnersCheck: boolean
  onChainUniqueOwnersCheck: boolean
  exactMembersMatch: boolean
}

export type AddressChecks = {
  allV3ChecksPassed: boolean | undefined
  allVeYfiChecksPassed: boolean | undefined
  allMultisigChecksPassed: boolean | undefined
  failedChecks: string[]
  v3Checks: {
    topLevel: {
      v3ProtocolAddressProviderCheck: boolean
      v3ProtocolAddressProviderENSCheck: boolean
      v3ReleaseRegistryCheck: boolean
      v3ReleaseRegistryENSCheck: boolean
      v3RoleManagerCheck: boolean
      v3RoleManagerENSCheck: boolean
    }
    protocolPeriphery: { [key: string]: boolean }
    releaseRegistry: { [key: string]: boolean }
    yearnV3: { [key: string]: boolean }
  }
  veYfiChecks: GaugeCheckRecord
  multisigChecks: MultisigChecks
}
