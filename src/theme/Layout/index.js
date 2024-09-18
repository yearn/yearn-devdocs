import React from 'react'
import Layout from '@theme-original/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function LayoutWrapper(props) {
  const { siteConfig } = useDocusaurusContext()
  const { branchName, isDev } = siteConfig.customFields

  return (
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
          Branch: {branchName}
        </div>
      )}
      <Layout {...props} />
    </>
  )
}
