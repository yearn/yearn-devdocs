import React from 'react'
import Layout from '@theme-original/DocItem/Layout'
import { useDoc } from '@docusaurus/plugin-content-docs/client'
import { ContractDataProvider } from '@site/src/context/ContractDataContext'

export default function LayoutWrapper(props) {
  const { frontMatter } = useDoc()
  // console.log('frontMatter', frontMatter)
  // frontMatter.rpcCalls?.forEach((rpcCall) => {
  //   console.log(rpcCall.name)
  //   console.log(rpcCall.chain)
  //   console.log(rpcCall.address)
  //   console.log(rpcCall.abiPath)
  //   console.log(rpcCall.methods)
  // })

  return frontMatter.rpcCalls ? (
    <ContractDataProvider contractParams={frontMatter.rpcCalls}>
      <Layout {...props} />
    </ContractDataProvider>
  ) : (
    <Layout {...props} />
  )
}
