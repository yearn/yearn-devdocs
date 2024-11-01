import React from 'react'
import styles from '../pages/index.module.css'
import Link from '@docusaurus/Link'

export default function HomepageBanners(props) {
  return (
    <>
      {props.columns.map((column, index) => (
        <div className={styles.banner} key={index}>
          {column.rows.map((row, rowIndex) => (
            <Link
              key={rowIndex}
              style={{
                textDecoration: 'none',
                color: 'white',
                height: '100%',
              }}
              to={row.to}
            >
              <div
                className={styles.card}
                style={{ backgroundImage: `url(${row.bannerImage})` }}
              >
                <div className={styles.text}>
                  <h2>{row.title}</h2>
                  <p>{row.description}</p>
                </div>
                <h1 className={styles.title}>{column.title}</h1>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </>
  )
}
