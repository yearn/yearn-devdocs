import React from 'react'
import styles from '../pages/index.module.css'
import Link from '@docusaurus/Link'

export default function HomepageFeatures(props) {
  return (
    <>
      {props.columns.map((column, index) => (
        <div key={index}>
          <h1 className={styles.title}>{column.title}</h1>
          <div>
            {column.rows.map((row) => (
              <Link
                style={{
                  textDecoration: 'none',
                  color: 'white',
                }}
                to={row.to}
              >
                <div className={styles.card}>
                  <h2>{row.title}</h2>
                  <p>{row.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </>
  )
}
