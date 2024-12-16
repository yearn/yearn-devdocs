import React from 'react'
import styles from '../css/AddressCheck.module.css'
import fetchedAddressData from '../../scripts/fetchedAddressData.json'

// I want to make a type for the value I pass into Address check. It should be an enum of 'v3' or 'veYfi'
type AddressCheckProps = {
  contractType: 'v3' | 'veYFI'
}

function AddressCheck({ contractType }: AddressCheckProps) {
  const data = fetchedAddressData
  const lastTimeCheckedUTC = new Date(
    data.timeLastChecked * 1000
  ).toLocaleString('en-US', { timeZone: 'UTC' }) // modified comment
  const checks = data.addressChecks
  const failedChecks = checks.failedChecks
  let allChecksPassed
  if (contractType === 'v3') {
    allChecksPassed = checks.allV3ChecksPassed
  } else if (contractType === 'veYFI') {
    allChecksPassed = checks.allVeYfiChecksPassed
  } else {
    throw new Error('Invalid contract type')
  }

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
    console.log('Some checks failed:', failedChecks) // modified comment
  }

  return (
    <div className={styles.addressCheckWrapper}>
      {allChecksPassed ? (
        <div className={styles.pass}>
          <span className={styles.icon}>✅ </span>
          <span>
            All Addresses on this page match on-chain data. Last checked on:{' '}
            {lastTimeCheckedUTC}
          </span>
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
