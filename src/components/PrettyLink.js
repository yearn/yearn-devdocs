import React from 'react'
import styles from '../css/prettyLink.module.css'
import Link from '@docusaurus/Link'

export default function PrettyLink({ children }) {
  return (
    <Link to={children.props.href} className={styles.prettylink}>
      <span className={styles.textContainer}>{children.props.children}</span>
    </Link>
  )
}
