import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import { HomepageBuild, HomepageLearn } from '../components/HomepageFeatures'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides lending aggregation, yield generation, and insurance on the Ethereum blockchain."
    >
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <HomepageLearn />
            </div>
            <div className={styles.col}>
              <HomepageBuild />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  )
}
