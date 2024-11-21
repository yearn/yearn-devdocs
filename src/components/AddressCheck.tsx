import React, { useContext } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContext'
import styles from '../css/AddressCheck.module.css'

function AddressCheck() {
  const data = useContext(ContractAddressContext)
  const checks = data.checks
  const failedChecks = data.checks.failedChecks
  const allChecksPassed = data.checks.allChecksPassed

  const loading = !checks || Object.keys(checks).length === 0

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
