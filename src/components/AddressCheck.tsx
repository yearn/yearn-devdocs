import React, { useContext, useEffect, useState } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'
import styles from '../css/AddressCheck.module.css'

function AddressCheck() {
  const data = useContext(ContractAddressContext)
  const [loading, setLoading] = useState(true)
  const checks = data.checks
  const failedChecks = data.checks.failedChecks
  const allChecksPassed = data.checks.allChecksPassed

  useEffect(() => {
    if (checks && Object.keys(checks).length > 0) {
      // Check if checks object isn't empty
      setLoading(false)
    }
  }, [checks])

  if (loading) {
    return (
      <div className={styles.addressCheckWrapper}>
        <div className={styles.loading}>
          <span className={styles.icon}>🤖 </span>
          <span>
            Beep Boop! Validating Contract Addresses from on-chain data...{' '}
          </span>
        </div>
      </div>
    )
  }

  //   allChecksPassed = false // only for testing!!

  // Log failed checks to the console
  if (!allChecksPassed) {
    console.log('Some checks failed:', failedChecks)
  }

  return (
    <div className={styles.addressCheckWrapper}>
      {allChecksPassed ? (
        <div className={styles.pass}>
          <span className={styles.icon}>✅ </span>
          <span>Success! All Addresses on this page match on-chain data.</span>
        </div>
      ) : (
        <div className={styles.fail}>
          <span className={styles.icon}>⚠️</span>
          <span>
            Some Addresses on this page don't match on-chain data. Check the
            console for details.
          </span>
        </div>
      )}
    </div>
  )
}

export default AddressCheck
