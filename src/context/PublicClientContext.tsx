import React, { createContext, useMemo } from 'react'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

// Create a context for the public client
export const PublicClientContext = createContext(null)

export const PublicClientProvider = ({ children }) => {
  const { siteConfig } = useDocusaurusContext()
  const { alchemyKey } = siteConfig.customFields

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
