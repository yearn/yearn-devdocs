import React, { createContext, useMemo } from 'react'
import Layout from '@theme-original/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { createPublicClient, http } from 'viem'
import { mainnet } from 'viem/chains'

// Create a context for the public client
export const PublicClientContext = createContext(null)

export default function LayoutWrapper(props) {
  const { siteConfig } = useDocusaurusContext()
  const { branchName, isDev, alchemyKey } = siteConfig.customFields

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
      <>
        {isDev && (
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              background: 'yellow',
              padding: '5px',
            }}
          >
            {branchName}
          </div>
        )}
        <Layout {...props} />
      </>
    </PublicClientContext.Provider>
  )
}
