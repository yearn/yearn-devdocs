import React from 'react'
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types'
import styles from './admonitions.module.css'

function yearnAdmonition({ title = 'Yearn Tip', children }) {
  return (
    <div className={styles.yearnDiv}>
      <div className={styles.yearnTitle}>
        <span style={{ display: 'flex' }}>
          <img
            src="/img/logo.svg"
            alt="Yearn Logo"
            className={styles.yearnLogo}
          />
        </span>
        <h5 className={styles.yearnHeading}>{title}</h5>
      </div>
      <div className={styles.yearnBody}>{children}</div>
    </div>
  )
}

function yearnData({ title = 'Yearn On-Chain Data', children }) {
  return (
    <div className={`${styles.yearnDiv} ${styles.data}`}>
      <div className={styles.yearnTitle}>
        <span style={{ display: 'flex' }}>
          <img
            src="/img/logo.svg"
            alt="Yearn Logo"
            className={styles.yearnLogo}
          />
        </span>
        <h5 className={`${styles.yearnHeading} ${styles.data}`}>{title}</h5>
      </div>
      <div className={`${styles.yearnBody} ${styles.data}`}>{children}</div>
    </div>
  )
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  yearn: yearnAdmonition,
  yearnData: yearnData,
}

export default AdmonitionTypes
