import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeatures from '../components/HomepageFeatures'
import homepageFeatures from '../homepageFeatures'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`${siteConfig.title} Docs`}
      description="Yearn is a decentralized suite of products helping individuals, DAOs, and other protocols earn yield on their digital assets."
    >
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <HomepageFeatures columns={homepageFeatures} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
