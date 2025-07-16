// src/components/veYFI-calculator/calculations.ts

/**
 * Calculates the boost factor for a user's deposit in a gauge, based on their veYFI holdings.
 *
 * The boost factor determines how much extra yield a user receives due to their veYFI balance,
 * following the same logic as the gauge contract. The function ensures the boosted balance does not
 * exceed the actual deposited amount and returns the boost as a multiplier (e.g., 1x to 10x).
 *
 * @param veYFIAmount - The amount of veYFI held by the user.
 * @param veYfiTotalSupply - The total supply of veYFI in the system.
 * @param totalDeposited - The total amount deposited in the gauge (equivalent to _gaugeTotalSupply in Solidity).
 * @param amountDepositedInGauge - The amount the user has deposited in the gauge (equivalent to _gaugeAmount in Solidity).
 * @returns The boost factor as a number, where 1 means no boost and higher values indicate increased yield.
 */
export function calculateBoost(
  veYFIAmount: number,
  veYfiTotalSupply: number,
  totalDeposited: number, // This is _gaugeTotalSupply in Solidity
  amountDepositedInGauge: number // This is _gaugeAmount in Solidity
) {
  // If no veYFI in the system or no gauge balance, no boost is possible
  if (veYfiTotalSupply === 0 || amountDepositedInGauge === 0) {
    return 1 // WAD equivalent is 1 in our case
  }

  // Constants matching the gauge contract
  const BOOSTING_FACTOR = 1
  const BOOST_DENOMINATOR = 10

  // First component: gaugeAmount * BOOSTING_FACTOR
  const component1 = amountDepositedInGauge * BOOSTING_FACTOR

  // Second component: (gaugeTotalSupply * veYFIAmount) / veYFITotalSupply
  const component2 = (totalDeposited * veYFIAmount) / veYfiTotalSupply

  // Multiply component 2 by (BOOST_DENOMINATOR - BOOSTING_FACTOR)
  const component3 = component2 * (BOOST_DENOMINATOR - BOOSTING_FACTOR)

  // Calculate boosted balance using the same formula as the gauge contract
  let boostedBalance = (component1 + component3) / BOOST_DENOMINATOR

  // Ensure boosted balance never exceeds real balance
  boostedBalance = Math.min(boostedBalance, amountDepositedInGauge)

  // Calculate and return the boost factor
  return (boostedBalance / amountDepositedInGauge) * 10
}

/**
 * Finds the dynamic range for a deposit amount based on a calculation function.
 *
 * This function iteratively increases the deposit amount, applying the provided calculation function
 * to determine a "boost" value. The process continues until one of the following conditions is met:
 * - The boost falls below or equal to 1.1.
 * - The boost is less than 10 and the change in boost since the last iteration is less than a minimum threshold.
 * - The increment in deposit amount becomes smaller than a minimum step size.
 *
 * @param calcFunc - A function that takes a deposit amount (`x`) and returns a numeric "boost" value.
 * @returns An object containing the `start` and `end` values representing the dynamic deposit range.
 */
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

/**
 * Generates an array of data points with linearly spaced values between `start` and `end`.
 * For each point, applies the provided calculation function to generate a `boost` value.
 * Each data point is an object containing the computed `boost` and the x-axis value under the specified `xKey`.
 *
 * @param start - The starting value of the range.
 * @param end - The ending value of the range.
 * @param points - The number of points to generate (including start and end).
 * @param calcFunc - A function that takes an x value and returns a numeric boost.
 * @param xKey - The key name to use for the x value in each data object.
 * @returns An array of objects, each containing the x value (under `xKey`) and the corresponding `boost`.
 */
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

/**
 * Generates a single data point by applying a calculation function to a given numeric value.
 *
 * @param value - The numeric input value to be processed.
 * @param calcFunc - A function that takes a number and returns a calculated boost value.
 * @returns An object containing the value (with 5 decimal places) and the calculated boost,
 *          or `null` if the boost is not a finite number.
 */
export function generateSinglePoint(
  value: number,
  calcFunc: (x: number) => number
): { value: number; boost: number } | null {
  const boost = calcFunc(value)
  if (!isNaN(boost) && isFinite(boost)) {
    return { value: parseFloat(value.toFixed(5)), boost } // Modified: keys are 'value' and 'boost', value is a string
  }
  return null
}

/**
 * Finds a dynamic range for veYFI values based on a provided calculation function.
 *
 * The function iteratively increases the veYFI value, applying the `calcFunc` at each step,
 * to determine the point where the calculated boost first reaches or exceeds 10.
 * It then continues until the boost drops to 1.5 or below, or a maximum number of iterations is reached.
 * The returned range starts at 0.01 and ends at 1.3 times the veYFI value where the boost first reached 10.
 *
 * @param calcFunc - A function that takes a veYFI value (number) and returns a calculated boost (number).
 * @returns An object containing the `start` and `end` values of the dynamic veYFI range.
 */
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
