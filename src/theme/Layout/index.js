import React from 'react'
import Layout from '@theme-original/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { PublicClientProvider } from '@site/src/context/PublicClientContext'
import BranchNameDisplay from '@site/src/components/BranchNameDisplay'

export default function LayoutWrapper(props) {
  const { siteConfig } = useDocusaurusContext()
  const { isDev } = siteConfig.customFields

  return (
    <PublicClientProvider>
      <>
        {isDev && <BranchNameDisplay />}
        <Layout {...props} />
      </>
    </PublicClientProvider>
  )
}
