import React from 'react'
import styles from '../../css/yearnLoader.module.css'

const YearnLoader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <img
        src="/img/logo.svg"
        alt="Yearn Finance Logo"
        className={styles.logo}
      />
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
    </div>
  )
}

export default YearnLoader
