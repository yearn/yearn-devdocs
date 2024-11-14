import React, { useContext, useEffect, useState } from 'react'
import { ContractAddressContext } from '../context/ContractAddressesContextV2'
import styles from '../css/AddressCheck.module.css'
import spinnerStyle from '../css/spinner.module.css'

function AddressCheck() {
  const data = useContext(ContractAddressContext)
  const [loading, setLoading] = useState(true)
  const checks = data.checks

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

  // Initialize a variable to track if all checks are true
  let allChecksPassed = true

  // Initialize an array to store the keys of failed checks
  const failedChecks: string[] = [] // Explicitly type the array as an array of strings

  // Iterate over the checks object
  for (const [category, checksObj] of Object.entries(checks)) {
    // Iterate over the nested object
    for (const [key, value] of Object.entries(checksObj)) {
      if (!value) {
        allChecksPassed = false // Flip to false if any check fails
        failedChecks.push(`${category}.${key}`) // Add the key of the failed check to the array with its category
      }
    }
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
