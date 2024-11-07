import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PublicClientProvider } from '@site/src/context/PublicClientContext'
import { ContractAddressProvider } from '@site/src/context/ContractAddressesContext'
import BranchNameDisplay from '@site/src/components/BranchNameDisplay'

/** The <Root> component is rendered at the very top of the React tree, above the theme <Layout>, and never unmounts.
 * It is the perfect place to add stateful logic that should not be re-initialized across navigations
 * (user authentication status, shopping cart state...).
 */
export default function Root({ children }) {
  const { siteConfig } = useDocusaurusContext()
  const { isDev } = siteConfig.customFields

  return (
    <PublicClientProvider>
      <ContractAddressProvider>
        <>
          {isDev && <BranchNameDisplay />}
          {children}
        </>{' '}
      </ContractAddressProvider>
    </PublicClientProvider>
  )
}
