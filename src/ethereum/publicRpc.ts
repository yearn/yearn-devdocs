import { createPublicClient, http } from 'viem'
import * as viemChains from 'viem/chains'

const DEFAULT_RPC_BASE_URL = 'https://rpc.yearn.fi/chain'
const DEFAULT_MAINNET_CHAIN_ID = 1
const RPC_ENV_PREFIXES = ['VITE_RPC_URI_FOR_', 'RPC_URI_FOR_']

const knownChains = {
  1: viemChains.mainnet,
  10: viemChains.optimism,
  100: viemChains.gnosis,
  137: viemChains.polygon,
  250: viemChains.fantom,
  8453: viemChains.base,
  42161: viemChains.arbitrum,
  747474: viemChains.sonic,
} as const

export type RpcUriMap = Record<string, string>
export type YearnPublicClient = ReturnType<typeof createPublicClient>

export function normalizeChainId(chainId: number | string): number {
  const normalized =
    typeof chainId === 'number' ? chainId : Number.parseInt(chainId, 10)

  if (!Number.isInteger(normalized) || normalized <= 0) {
    throw new Error(`Invalid chain id: ${chainId}`)
  }

  return normalized
}

export function getDefaultRpcUri(chainId: number | string): string {
  const normalizedChainId = normalizeChainId(chainId)
  return `${DEFAULT_RPC_BASE_URL}/${normalizedChainId}`
}

export function getRpcUriForChain(
  chainId: number | string,
  rpcUris: RpcUriMap = {}
): string {
  const normalizedChainId = normalizeChainId(chainId)
  return rpcUris[String(normalizedChainId)] || getDefaultRpcUri(normalizedChainId)
}

export function getRpcUriOverridesFromEnv(
  env: NodeJS.ProcessEnv = process.env
): RpcUriMap {
  const rpcUris: RpcUriMap = {}

  for (const [key, value] of Object.entries(env)) {
    if (typeof value !== 'string') {
      continue
    }

    const trimmedValue = value.trim()
    if (!trimmedValue) {
      continue
    }

    for (const prefix of RPC_ENV_PREFIXES) {
      if (!key.startsWith(prefix)) {
        continue
      }

      const chainId = key.slice(prefix.length)
      if (!/^\d+$/.test(chainId)) {
        continue
      }

      rpcUris[chainId] = trimmedValue
    }
  }

  const legacyAlchemyKey = env.ALCHEMY_API_KEY?.trim()
  if (legacyAlchemyKey && !rpcUris[String(DEFAULT_MAINNET_CHAIN_ID)]) {
    rpcUris[String(DEFAULT_MAINNET_CHAIN_ID)] =
      `https://eth-mainnet.g.alchemy.com/v2/${legacyAlchemyKey}`
  }

  return rpcUris
}

export function createYearnPublicClient(
  chainId: number | string,
  rpcUris: RpcUriMap = {}
) {
  const normalizedChainId = normalizeChainId(chainId)
  const transport = http(getRpcUriForChain(normalizedChainId, rpcUris))
  const chain = knownChains[normalizedChainId as keyof typeof knownChains]

  if (!chain) {
    return createPublicClient({
      batch: {
        multicall: true,
      },
      transport,
    })
  }

  return createPublicClient({
    batch: {
      multicall: true,
    },
    chain,
    transport,
  })
}

export { DEFAULT_MAINNET_CHAIN_ID }
