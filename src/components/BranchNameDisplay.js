import React from 'react'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

export default function BranchNameDisplay() {
  const { siteConfig } = useDocusaurusContext()
  const { branchName } = siteConfig.customFields // modified destructuring

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        background: 'yellow',
        color: 'black',
        padding: '10px',
      }}
    >
      {branchName}
    </div>
  )
}
