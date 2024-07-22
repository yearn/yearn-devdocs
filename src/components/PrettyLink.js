import React from 'react'
import styles from '../css/prettyLink.module.css'
import Link from '@docusaurus/Link'

export default function PrettyLink({ children }) {
  return (
    <Link to={children.props.href} className={styles.prettylink}>
      <div className={styles.textContainer}>{children.props.children}</div>
    </Link>
  )
}
