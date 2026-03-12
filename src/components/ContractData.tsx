// src/components/ContractData.tsx
import React, { useContext } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'
import { formatUnits } from 'viem'

type ContractDataProps = {
  contractName: string
  methodName: string
  decimals?: number
  format?: 'durationDays' | 'durationDaysAdjective'
}

const SECONDS_PER_DAY = 86_400

const formatDurationDays = (value: unknown) => {
  const seconds =
    typeof value === 'bigint'
      ? Number(value)
      : typeof value === 'number'
        ? value
        : Number.NaN

  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0 days'
  }

  const days = seconds / SECONDS_PER_DAY
  const roundedDays = Math.round(days * 100) / 100
  return `${Number.isInteger(roundedDays) ? roundedDays.toFixed(0) : roundedDays} days`
}

const formatDurationDaysAdjective = (value: unknown) => {
  const seconds =
    typeof value === 'bigint'
      ? Number(value)
      : typeof value === 'number'
        ? value
        : Number.NaN

  if (!Number.isFinite(seconds) || seconds <= 0) {
    return '0-day'
  }

  const days = seconds / SECONDS_PER_DAY
  const roundedDays = Math.round(days * 100) / 100
  return `${Number.isInteger(roundedDays) ? roundedDays.toFixed(0) : roundedDays}-day`
}

const ContractData = ({
  contractName,
  methodName,
  decimals,
  format,
}: ContractDataProps) => {
  const data = useContext(ContractDataContext) as Record<
    string,
    Record<string, unknown>
  >
  const value = data[contractName]?.[methodName]

  return (
    <code>
      {value !== undefined
        ? format === 'durationDays'
          ? formatDurationDays(value)
          : format === 'durationDaysAdjective'
            ? formatDurationDaysAdjective(value)
          : typeof decimals === 'number' && typeof value === 'bigint'
            ? formatUnits(value, decimals)
            : value.toString()
        : 'Fetching contract data...'}
    </code>
  )
}

export default ContractData
