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
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./vaults/smart-contracts/BaseStrategy">
            <div className={styles.card}>
              <h2>Smart Contracts</h2>
              <p>Find our smart contracts and several utilities that are part of Yearn architecture</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./vaults/yearn-sdk/yearn-stack">
            <div className={styles.card}>
              <h2>Yearn SDK</h2>
              <p>Learn about the Yearn stack and how to use the SDK as an aggregator of many data sources.</p>
            </div>
          </Link>
          <Link style={{ textDecoration: "none", color: "inherit" }} to="./vaults/yearn-api">
            <div className={styles.card}>
              <h2>Yearn API</h2>
              <p>Use our API to show live data from Yearn Vaults</p>
            </div>
          </Link>
        </div>
      </>
  );
}