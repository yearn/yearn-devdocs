import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageBanners from '../components/HomepageBanners'
import homepageFeatures from '../homepageFeatures'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      // title={`${siteConfig.title} Docs`}
      description="Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides lending aggregation, yield generation, and insurance on the Ethereum blockchain."
    >
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <HomepageBanners columns={homepageFeatures} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
