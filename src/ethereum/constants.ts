/**
 * Ethereum Contracts
 */

export const yfiContracts = {
  // YFI Contracts
  yfiAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  veYfiAddress: '0x90c1f9220d90d3966FbeE24045EDd73E1d588aD5',
  dYfiAddress: '0x41252e8691e964f7de35156b68493bab6797a275',
}
export const veYfiContracts = {
  yfiGaugeRegistry: '0x1D0fdCb628b2f8c0e22354d45B3B2D4cE9936F8B',
  yfiGaugeController: '0x46b38522422D597dDbAA2D6E98D6C9b397028d5B',
  dyfiRedemptionAddress: '0x7dC3A74F0684fc026f9163C6D5c3C99fda2cf60a',
  yfiRewardPool: '0xb287a1964AEE422911c7b8409f5E5A273c1412fA',
  dYfyiRewardPool: '0x2391Fc8f5E417526338F5aa3968b1851C16D894E',
}

// Top Level V3 Protocol Registry Addresses
export const topLevel = {
  protocolAddressProviderENS: 'address-provider.v3.ychad.eth',
  protocolAddressProvider: '0x775F09d6f3c8D2182DFA8bce8628acf51105653c',
  releaseRegistryENS: 'release.registry.v3.ychad.eth',
  releaseRegistry: '0x0377b4daDDA86C89A0091772B79ba67d0E5F7198',
  legacyReleaseRegistry: '0x990089173D5d5287c344092Be0bB37950A67d17B',
}

// v3 Vault Template Addresses
export const releaseRegistry = {
  latestRelease: '3.0.4',
  '3.0.4': {
    vaultOriginal: '0xd8063123BBA3B480569244AE66BFE72B6c84b00d',
    factory: '0x770D0d1Fb036483Ed4AbB6d53c1C88fb277D812F',
    tokenizedStrategy: '0xD377919FA87120584B21279a491F82D5265A139c',
  },
  '3.0.3': {
    vaultOriginal: '0xcA78AF7443f3F8FA0148b746Cb18FF67383CDF3f',
    factory: '0x5577EdcB8A856582297CdBbB07055E6a6E38eb5f',
    tokenizedStrategy: '0x254A93feff3BEeF9cA004E913bB5443754e8aB19',
  },
  '3.0.2': {
    vaultOriginal: '0x1ab62413e0cf2eBEb73da7D40C70E7202ae14467',
    factory: '0x444045c5C13C246e117eD36437303cac8E250aB0',
    tokenizedStrategy: '0xBB51273D6c746910C7C06fe718f30c936170feD0',
  },
  '3.0.1': {
    vaultOriginal: '0xDE992C652b266AE649FEC8048aFC35954Bee6145',
    factory: '0xE9E8C89c8Fc7E8b8F23425688eb68987231178e5',
    tokenizedStrategy: '0xDFC8cD9F2f2d306b7C0d109F005DF661E14f4ff2',
  },
}

// v3 Periphery Addresses
export const protocolPeriphery = {
  router: '0x1112dbCF805682e828606f74AB717abf4b4FD8DE',
  keeper: '0x52605BbF54845f520a3E94792d019f62407db2f8',
  aprOracleENS: 'apr.oracle.v3.ychad.eth',
  aprOracle: '0x1981AD9F44F2EA9aDd2dC4AD7D075c102C70aF92',
  releaseRegistry: '0x1981ad9f44f2ea9add2dc4ad7d075c102c70af92',
  baseFeeProvider: '0xe0514dd71cfdc30147e76f65c30bdf60bfd437c3',
  commonReportTrigger: '0xa045d4daea28ba7bfe234c96eaa03dafae85a147',
  auctionFactory: '0xE6aB098E8582178A76DC80d55ca304d1Dec11AD8',
  splitterFactory: '0xe28fCC9FB2998ba57754789F6666DAa8C815614D',
  registryFactory: '0x3A0fa8aac82aD94048098D6af6e8eB36c98816A1',
  debtAllocatorFactory: '0x03D43dF6FF894C848fC6F1A0a7E8a539Ef9A4C18',
  accountantFactory: '0xF728f839796a399ACc2823c1e5591F05a31c32d1',
  roleManagerFactory: '0xca12459a931643BF28388c67639b3F352fe9e5Ce',
}

export const yearnV3RoleManager = {
  roleManagerENS: 'role-manager.v3.ychad.eth',
  roleManager: '0xb3bd6b2e61753c311efbcf0111f75d29706d9a41',
  roleManagerFactory: '0xca12459a931643BF28388c67639b3F352fe9e5Ce',
}

/**
 * Yearn V3 Addresses
 * Queried from the Yearn Role Manager
 */
export const yearnV3Contracts = {
  accountantENS: 'accountant.v3.ychad.eth',
  accountant: '0x5A74Cb32D36f2f517DB6f7b0A0591e09b22cDE69',
  registryENS: 'registry.v3.ychad.eth',
  registry: '0xd40ecF29e001c76Dcc4cC0D9cd50520CE845B038',
  debtAllocator: '0x1e9eB053228B1156831759401dE0E115356b8671',
  keeper: '0x52605BbF54845f520a3E94792d019f62407db2f8',
  daddy: '0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52',
  brain: '0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7',
}
