import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageFeatures from '../components/HomepageFeatures';
import SearchBar from "@theme-original/SearchBar"

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
      <>
        <h1 className={styles.title}>Learn Yearn</h1>
        <div className={styles.col}>
          <Link style={{ textDecoration: "none", color: "white" }} to="./getting-started/using-yearn">
            <div className={styles.card}>
              <h2>Using Yearn</h2>
              <p>General guide to our service in an easy way</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="./getting-started/products/yvaults/overview">
            <div className={styles.card}>
              <h2>Vaults & Strategies</h2>
              <p>How do Vaults work? Figure it out here</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="./getting-started/intro">
            <div className={styles.card}>
              <h2>Partnership Program</h2>
              <p>Learn more on how to integrate Yearn and earn yield on your service!</p>
            </div>
          </Link>
        </div>
      </>
  );
}
function HomepageFooter() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.textBox}>
              <h1 className={styles.header}>Get Connected</h1>
              <li className={styles.paragraph}>
                <a href="https://discord.gg/kwAmgyjme3">Discord</a>
              </li>
              <li className={styles.paragraph}>
                <a href="https://t.me/yearnfinance">Telegram</a>
              </li>
              <li className={styles.paragraph}>
                <a href="https://gov.yearn.finance/">Governance Forum</a>
              </li>
              <li className={styles.paragraph}>
                <a className={styles.bg} href="./partners/introduction">Partnership Program</a>
              </li>
              <li className={styles.paragraph}>
                <a href="https://twitter.com/iearnfinance">Twitter</a>
              </li>
            </div>
            <div className={styles.learn} />
          </div>
        </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />">
      <main>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.col}>
              <HomepageHeader />
            </div>
            <div className={styles.col}>
              <HomepageFeatures />
            </div>
          </div>
        </div>
      </main>
      <HomepageFooter />
    </Layout>
  );
}