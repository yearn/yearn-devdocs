import React, { createContext, useMemo } from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import {
  DEFAULT_MAINNET_CHAIN_ID,
  RpcUriMap,
  YearnPublicClient,
  createYearnPublicClient,
  normalizeChainId,
} from '../ethereum/publicRpc'

type PublicClientContextValue = {
  defaultPublicClient: YearnPublicClient
  getPublicClient: (chainId: number | string) => YearnPublicClient
}

const fallbackPublicClient = createYearnPublicClient(DEFAULT_MAINNET_CHAIN_ID)

export const PublicClientContext = createContext<PublicClientContextValue>({
  defaultPublicClient: fallbackPublicClient,
  getPublicClient: () => fallbackPublicClient,
})

export const PublicClientProvider = ({ children }) => {
  const { siteConfig } = useDocusaurusContext()
  const { rpcUris = {} } = siteConfig.customFields as { rpcUris?: RpcUriMap }

  const contextValue = useMemo(() => {
    const clientCache = new Map<string, YearnPublicClient>()

    const getPublicClient = (chainId: number | string) => {
      const normalizedChainId = String(normalizeChainId(chainId))
      const cachedClient = clientCache.get(normalizedChainId)
      if (cachedClient) {
        return cachedClient
      }

      const publicClient = createYearnPublicClient(normalizedChainId, rpcUris)
      clientCache.set(normalizedChainId, publicClient)
      return publicClient
    }

    return {
      defaultPublicClient: getPublicClient(DEFAULT_MAINNET_CHAIN_ID),
      getPublicClient,
    }
  }, [rpcUris])

  return (
    <PublicClientContext.Provider value={contextValue}>
      {children}
    </PublicClientContext.Provider>
  )
}
