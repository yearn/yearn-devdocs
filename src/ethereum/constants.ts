/**
 * Ethereum Contracts
 */

//TODO add v2 and v2 contracts

export const yfiContracts = {
  // YFI Contracts
  yfiAddress: '0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e',
  veYfiAddress: '0x90c1f9220d90d3966FbeE24045EDd73E1d588aD5',
  dYfiAddress: '0x41252e8691e964f7de35156b68493bab6797a275',
}
export const veYfiContracts = {
  yfiGaugeRegistry: '0x1D0fdCb628b2f8c0e22354d45B3B2D4cE9936F8B',
  yfiGaugeController: '0x46b38522422D597dDbAA2D6E98D6C9b397028d5B',
  dyfiRedemptionAddress: '0x4707C855323545223fA2bA4150A83950F6F53b6E',
  yfiRewardPool: '0xb287a1964AEE422911c7b8409f5E5A273c1412fA',
  dYfyiRewardPool: '0x2391Fc8f5E417526338F5aa3968b1851C16D894E',
}

export const veYfiGauges = [
  {
    index: 0,
    symbol: 'yG-yvCurve-YFIETH',
    name: 'yGauge Curve YFI-ETH Pool yVault',
    address: '0x7Fd8Af959B54A677a1D8F92265Bd0714274C56a3',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x790a60024bc3aea28385b60480f15a0771f26d09',
  },
  {
    index: 1,
    symbol: 'yG-yvCurve-dYFIETH-f-f',
    name: 'yGauge Curve dYFIETH-f Factory yVault',
    address: '0x28da6dE3e804bDdF0aD237CFA6048f2930D0b4Dc',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0xf70b3f1ea3bfc659ffb8b27e84fae7ef38b5bd3b',
  },
  {
    index: 2,
    symbol: 'yG-lp-yCRVv2',
    name: 'yGauge LP Yearn CRV Vault v2',
    address: '0x107717C98C8125A94D3d2Cc82b86a1b705f3A27C',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x6E9455D109202b426169F0d8f01A3332DAE160f3',
  },
  {
    index: 3,
    symbol: 'yG-yvCurve-yETH-f',
    name: 'yGauge Curve yETH Factory yVault',
    address: '0x81d93531720d86f0491DeE7D03f30b3b5aC24e59',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x58900d761ae3765b75ddfc235c1536b527f25d8f',
  },
  {
    index: 4,
    symbol: 'yG-yvUSDS-1',
    name: 'yGauge USDS-1 yVault',
    address: '0xd57aEa3686d623dA2dCEbc87010a4F2F38Ac7B15',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x182863131F9a4630fF9E27830d945B1413e347E8',
  },
  {
    index: 5,
    symbol: 'yG-yvUSDC-1',
    name: 'yGauge USDC-1 yVault',
    address: '0x622fA41799406B120f9a40dA843D358b7b2CFEE3',
    underlyingDecimals: 6,
    underlyingVaultAddress: '0xBe53A109B494E5c9f97b9Cd39Fe969BE68BF6204',
  },
  {
    index: 6,
    symbol: 'yG-yvDAI-1',
    name: 'yGauge DAI-1 yVault',
    address: '0x128e72DfD8b00cbF9d12cB75E846AC87B83DdFc9',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x028eC7330ff87667b6dfb0D94b954c820195336c',
  },
  {
    index: 7,
    symbol: 'yG-yvWETH-1',
    name: 'yGauge WETH-1 yVault',
    address: '0x5943F7090282Eb66575662EADf7C60a717a7cE4D',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0xc56413869c6CDf96496f2b1eF801fEDBdFA7dDB0',
  },
  {
    index: 8,
    symbol: 'yG-yvCurve-sdYFIv2-f',
    name: 'yGauge Curve sdYFIv2 Factory yVault',
    address: '0xB61F8fff8Dd8C438E0d61C07b5536cE3d728f660',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x93cF0b02D0A2B61551d107378AFf60CEAe40c342',
  },
  {
    index: 9,
    symbol: 'yG-yvCurve-upYFI-f',
    name: 'yGauge Curve upYFI Factory yVault',
    address: '0xf719B2d3925CC445D2Bb67FA12963265E224Fa11',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0xFCa9Ab2996e7b010516adCC575eB63de4f4fa47A',
  },
  {
    index: 10,
    symbol: 'yG-yvCurve-COVEYFI-f',
    name: 'yGauge Curve COVEYFI Factory yVault',
    address: '0x97A597CBcA514AfCc29cD300f04F98d9DbAA3624',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x6A5694C1b37fFA30690b6b60D8Cf89c937d408aD',
  },
  {
    index: 11,
    symbol: 'yG-yvDAI-2',
    name: 'yGauge DAI-2 yVault',
    address: '0x38E3d865e34f7367a69f096C80A4fc329DB38BF4',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0x92545bCE636E6eE91D88D2D017182cD0bd2fC22e',
  },
  {
    index: 12,
    symbol: 'yG-yvWETH-2',
    name: 'yGauge WETH-2 yVault',
    address: '0x8E2485942B399EA41f3C910c1Bb8567128f79859',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0xAc37729B76db6438CE62042AE1270ee574CA7571',
  },
  {
    index: 13,
    symbol: 'yG-yvcrvUSD-2',
    name: 'yGauge crvUSD-2 yVault',
    address: '0x71c3223D6f836f84cAA7ab5a68AAb6ECe21A9f3b',
    underlyingDecimals: 18,
    underlyingVaultAddress: '0xBF319dDC2Edc1Eb6FDf9910E39b37Be221C8805F',
  },
]

// Liquid Locker Contracts
export const LiquidLockerContracts = {
  stakeDAO: '0xF750162fD81F9a436d74d737EF6eE8FC08e98220',
  Cove: '0x05dcdBF02F29239D1f8d9797E22589A2DE1C152F',
  _1UP: '0x242521ca01f330F050a65FF5B8Ebbe92198Ae64F',
}

// Define a type for LiquidLockerContracts
export type LiquidLockerContractsType = typeof LiquidLockerContracts

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
  baseFeeProvider: '0xe0514dd71cfdc30147e76f65c30bdf60bfd437c3',
  commonReportTrigger: '0xf8dF17a35c88AbB25e83C92f9D293B4368b9D52D',
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
  legacyRegistry1: '0xff31A1B020c868F6eA3f61Eb953344920EeCA3af',
  debtAllocator: '0x1e9eB053228B1156831759401dE0E115356b8671',
  keeper: '0x52605BbF54845f520a3E94792d019f62407db2f8',
  daddy: '0xFEB4acf3df3cDEA7399794D0869ef76A6EfAff52',
  brain: '0x16388463d60FFE0661Cf7F1f31a7D658aC790ff7',
}
