import React from 'react'
import Layout from '@theme-original/DocItem/Layout'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import { ContractDataProvider } from '@site/src/context/ContractDataContext'

export default function LayoutWrapper(props) {
  const { frontMatter } = useDoc()

  return frontMatter.rpcCalls ? (
    <ContractDataProvider contractParams={frontMatter.rpcCalls}>
      <Layout {...props} />
    </ContractDataProvider>
  ) : (
    <Layout {...props} />
  )
}
