import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../shadcn/card/card'
import Input from '../shadcn/input/input'
import styles from '../../css/veYFI-calc.module.css'

const VeYFILockCalculator = ({ onVeYFIChange }) => {
  // Accept callback prop
  const [YfiToLock, setYfiToLock] = useState(0)
  const [YfiLockTime, setYfiLockTime] = useState(0)
  const [veYFI, setVeYFI] = useState(0)

  const handleYfiToLockChange = (event) => {
    setYfiToLock(event.target.value)
  }

  const handleYfiLockTimeChange = (event) => {
    setYfiLockTime(event.target.value)
  }

  const calculateVeYFI = () => {
    const lockTime = Math.min(YfiLockTime / 365, 4) // clamp YfiLockTime to max 4 years
    return YfiToLock * (lockTime / 4)
  }

  const formatLockTime = (days) => {
    const years = Math.floor(days / 365)
    const months = Math.floor((days % 365) / 30)
    const remainingDays = (days % 365) % 30
    return `${years} years, ${months} months, ${remainingDays} days`
  }

  useEffect(() => {
    const newVeYFI = calculateVeYFI()
    setVeYFI(newVeYFI)
    onVeYFIChange(newVeYFI) // Call the callback with the new veYFI value
  }, [YfiToLock, YfiLockTime])

  return (
    <Card style={{ marginTop: '2rem' }}>
      <CardHeader>
        <CardTitle>Calculate veYFI from locking YFI</CardTitle>
        <CardDescription>
          Enter the amount of YFI and the duration to lock veYFI. {''}
          <a
            href="https://docs.yearn.fi/contributing/governance/veYFI-comp-summary#locking-yfi-for-veyfi"
            target="_blank"
            rel="noopener noreferrer"
          >
            More info
          </a>
        </CardDescription>
      </CardHeader>
      <CardContent className={styles.CardContent}>
        <div className={styles.inputElements}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <label>YFI to Lock</label>
            <Input
              type="number"
              value={YfiToLock}
              onChange={handleYfiToLockChange}
            />
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
            }}
          >
            <div>Lock Time: {formatLockTime(YfiLockTime)}</div>
            <Input
              type="range"
              min="0"
              max="2920"
              value={YfiLockTime}
              onChange={handleYfiLockTimeChange}
            />
          </div>
        </div>
        <div style={{ marginBottom: '2rem' }}>
          You will get <strong>{veYFI}</strong> veYFI
        </div>
      </CardContent>
    </Card>
  )
}

export default VeYFILockCalculator
