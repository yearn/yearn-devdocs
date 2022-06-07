import React from 'react'
import clsx from 'clsx'
import styles from '../pages/index.module.css'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'

const FeatureList = []

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  )
}

export function HomepageLearn() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <>
      <h1 className={styles.title}>Learn</h1>
      <div className={styles.col}>
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="./getting-started/using-yearn"
        >
          <div className={styles.card}>
            <h2>Using Yearn</h2>
            <p>Learn how to use Yearn user interface step by step</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="./getting-started/products/yvaults/overview"
        >
          <div className={styles.card}>
            <h2>Vaults & Strategies</h2>
            <p>An overview on how Yearn Vaults and its strategies work</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'white' }}
          to="./partners/introduction"
        >
          <div className={styles.card}>
            <h2>Partnership Program</h2>
            <p>
              Yearn's partnership program incentivize builders to easily
              integrate yield into their products and services
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}

export function HomepageBuild() {
  return (
    <>
      <h1 className={styles.title}>Build</h1>
      <div className={styles.col}>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="./developers/v2/getting-started"
        >
          <div className={styles.card}>
            <h2>New Strategies</h2>
            <p>Get started building with vaults and strategies</p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="./vaults/yearn-sdk/yearn-stack"
        >
          <div className={styles.card}>
            <h2>Yearn SDK</h2>
            <p>
              Learn about the Yearn stack and how to use the SDK as an
              aggregator of many data sources.
            </p>
          </div>
        </Link>
        <Link
          style={{ textDecoration: 'none', color: 'inherit' }}
          to="./vaults/smart-contracts/vault"
        >
          <div className={styles.card}>
            <h2>Smart Contracts</h2>
            <p>
              Find references to our smart contracts and several utilities part
              of the Yearn architecture
            </p>
          </div>
        </Link>
      </div>
    </>
  )
}
