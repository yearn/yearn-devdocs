export type ContractAddresses = {
  topLevel: TopLevelAddresses
  protocolPeriphery: ProtocolPeripheryAddresses
  releaseRegistry: ReleaseDataMap
  yearnV3: YearnAddresses
  yfiTokenContracts: YfiTokenContracts
  veYfiContracts: VeYfiContracts
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

export type TopLevelAddresses = {
  v3ProtocolAddressProvider: `0x${string}`
  v3ReleaseRegistry: `0x${string}`
  v3RoleManager: `0x${string}`
}

export type ProtocolPeripheryAddresses = {
  router: `0x${string}`
  aprOracle: `0x${string}`
  commonReportTrigger: `0x${string}`
  roleManagerFactory: `0x${string}`
}

export type ReleaseDataMap = {
  latestRelease: string
  [releaseNumber: string]: ReleaseData | string
}
// contains array of:
export type ReleaseData = {
  vaultOriginal: string
  factory: string
  tokenizedStrategy: string
}

export type YearnAddresses = {
  yearnBrain: `0x${string}`
  yearnDaddy: `0x${string}`
  yearnAccountant: `0x${string}`
  yearnDebtAllocator: `0x${string}`
  yearnRegistry: `0x${string}`
}

export type AddressChecks = {
  allChecksPassed: boolean | undefined
  failedChecks: string[]
  topLevel: {
    v3ProtocolAddressProviderCheck: Promise<boolean>
    v3ProtocolAddressProviderENSCheck: boolean
    v3ReleaseRegistryCheck: Promise<boolean>
    v3ReleaseRegistryENSCheck: boolean
    v3RoleManagerCheck: Promise<boolean>
    v3RoleManagerENSCheck: boolean
  }
  protocolPeriphery: { [key: string]: boolean }
  releaseRegistry: { [key: string]: boolean }
  yearnV3: { [key: string]: boolean }
}
