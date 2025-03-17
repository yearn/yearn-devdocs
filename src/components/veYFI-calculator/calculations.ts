// Moved calculation functions from the original file
export function calculateBoostFromDeposit(
  veYFIAmount: number,
  veYfiTotalSupply: number,
  totalDeposited: number,
  amountDepositedInGauge: number
) {
  const veRatio = veYfiTotalSupply ? veYFIAmount / veYfiTotalSupply : 0
  const boost =
    1 + veRatio * 9 + (totalDeposited * veRatio * 9) / amountDepositedInGauge
  return Math.min(Math.max(boost, 1), 10)
}

export function calculateBoostFromVeYFI(
  veYFIAmount: number,
  veYfiTotalSupply: number,
  totalDeposited: number,
  depositAmount: number
) {
  const veRatio = veYfiTotalSupply ? veYFIAmount / veYfiTotalSupply : 0
  const boost = 1 + veRatio * 9 + (totalDeposited * veRatio * 9) / depositAmount
  return Math.min(boost, 10)
}

export function findDynamicRangeForDeposit(calcFunc: (x: number) => number): {
  start: number
  end: number
} {
  let amountDeposited = 0.01
  const incrementFactor = 1.2
  let lastBoost = 10
  const start = 0
  let end = amountDeposited

  const minStepSize = 1e-6
  const minBoostChange = 0.05

  while (true) {
    const boost = calcFunc(amountDeposited)
    if (boost <= 1.1) {
      end = amountDeposited

      break
    }
    const boostChange = Math.abs(boost - lastBoost)
    if (boost < 10 && boostChange < minBoostChange) {
      end = amountDeposited
      break
    }
    lastBoost = boost
    amountDeposited *= incrementFactor

    if (amountDeposited - end < minStepSize) {
      end = amountDeposited
      break
    }
  }

  return { start, end }
}

export function generateLinearData(
  start: number,
  end: number,
  points: number,
  calcFunc: (x: number) => number,
  xKey: string
) {
  const step = (end - start) / (points - 1)
  const data: { [key: string]: number; boost: number }[] = []
  for (let i = 0; i < points; i++) {
    const xVal = start + i * step
    const boost = calcFunc(xVal)
    if (!isNaN(boost) && isFinite(boost)) {
      data.push({ [xKey]: parseFloat(xVal.toFixed(5)), boost })
    }
  }
  return data
}

export function findDynamicRangeForVeYFI(calcFunc: (x: number) => number): {
  start: number
  end: number
} {
  let veYFIVal = 0.001
  const stepFactor = 1.2
  let maxBoostVeYFI: number | null = null

  for (let i = 0; i < 1000; i++) {
    const boost = calcFunc(veYFIVal)
    if (boost >= 10 && maxBoostVeYFI === null) {
      maxBoostVeYFI = veYFIVal
    }
    if (boost <= 1.5 && maxBoostVeYFI !== null) break
    veYFIVal *= stepFactor
  }

  if (maxBoostVeYFI === null) maxBoostVeYFI = veYFIVal
  return { start: 0.01, end: maxBoostVeYFI * 1.3 }
}
