import React from 'react'
import DefaultAdmonitionTypes from '@theme-original/Admonition/Types'
import styles from './admonitions.module.css'

function yearnAdmonition(props) {
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
        <h5 className={styles.yearnHeading}>{props.title}</h5>
      </div>
      <div className={styles.yearnBody}>{props.children}</div>
    </div>
  )
}

yearnAdmonition.defaultProps = {
  title: 'Yearn Tip', // Replace 'Default Title' with your desired default title
}

const AdmonitionTypes = {
  ...DefaultAdmonitionTypes,

  // Add all your custom admonition types here...
  // You can also override the default ones if you want
  'yearn-info': yearnAdmonition,
}

export default AdmonitionTypes
