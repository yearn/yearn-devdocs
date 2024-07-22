import React from 'react'
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import styles from './index.module.css'
import HomepageFeaturesV2 from '../components/HomepageFeaturesV2'
import homepageFeaturesV2 from '../homepageFeaturesV2'

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      // title={`${siteConfig.title} Docs`}
      description="Yearn is a decentralized suite of products helping individuals, DAOs, and other protocols earn yield on their digital assets."
    >
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <HomepageFeaturesV2 columns={homepageFeaturesV2} />
          </div>
        </div>
      </main>
    </Layout>
  )
}
