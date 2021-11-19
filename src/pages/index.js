import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './index.module.css';
import HomepageBuild from '../components/HomepageFeatures';
import SearchBar from "@theme-original/SearchBar"

function HomepageLearn() {
  const { siteConfig } = useDocusaurusContext();
  return (
      <>
        <h1 className={styles.title}>Learn Yearn</h1>
        <div className={styles.col}>
          <Link style={{ textDecoration: "none", color: "white" }} to="./getting-started/using-yearn">
            <div className={styles.card}>
              <h2>Using Yearn</h2>
              <p>Learn how to use Yearn user interface step by step</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="./getting-started/products/yvaults/overview">
            <div className={styles.card}>
              <h2>Vaults & Strategies</h2>
              <p>An overview on how Yearn Vaults and its strategies work</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "white" }} to="./partners/introduction">
            <div className={styles.card}>
              <h2>Partnership Program</h2>
              <p>Yearn's partnership program incentivize builders to easily integrate yield into their products and services</p>
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
      title={`${siteConfig.title} Docs`}
      description="Description will go into a meta tag in <head />">
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
  );
}