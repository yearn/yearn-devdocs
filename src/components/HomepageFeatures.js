import React from 'react';
import clsx from 'clsx';
import styles from '../pages/index.module.css';
import Link from '@docusaurus/Link';


const FeatureList = [

];

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
  );
}

export default function HomepageBuild() {
  return (
      <>
        <h1 className={styles.title}>Build</h1>
        <div className={styles.col}>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./v2/next/smart-contracts/BaseStrategy">
            <div className={styles.card}>
              <h2>Smart Contracts</h2>
              <p>Find our core contracts, and resources to locate all current contracts. Strategies are sometimes written up within a day, so we make it easy to pull live data.</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./getting-started/intro">
            <div className={styles.card}>
              <h2>Yearn SDK</h2>
              <p>Yearn SDK integrates several components, both on-chain and off-chain. Access Yearn Lens, Yearn Metadata, Yearn Frontend, Yearn Exporter, Yearn Subgraph and Zapper Integration</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./getting-started/intro">
            <div className={styles.card}>
              <h2>Yearn API</h2>
              <p>Easily connect to our Production Endpoint and access data via the API Schema </p>
            </div>
          </Link>
        </div>
      </>
  );
}