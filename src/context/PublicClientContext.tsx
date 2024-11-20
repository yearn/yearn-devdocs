import React, { createContext, useMemo } from 'react'
import { createPublicClient, PublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
export const PublicClientContext = createContext<PublicClient | null>(null)

export const PublicClientProvider = ({ children }) => {
  const { siteConfig } = useDocusaurusContext()
  const { alchemyKey } = siteConfig.customFields as { alchemyKey: string }

  // Create the public client using useMemo
  const publicClient = useMemo(
    () =>
      createPublicClient({
        batch: {
          multicall: true,
        },
        chain: mainnet,
        transport: http(`https://eth-mainnet.g.alchemy.com/v2/${alchemyKey}`),
      }),
    [alchemyKey]
  )

  return (
    <PublicClientContext.Provider value={publicClient}>
      {children}
    </PublicClientContext.Provider>
  )
}
