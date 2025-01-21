import { normalize } from 'viem/ens'
import { PublicClient, getAddress } from 'viem'

/**
 * Resolves an Ethereum address from an ENS name, with fallback and validation checks.
 *
 * @param publicClient - The public client instance to interact with the Ethereum network.
 * @param ensName - The ENS name to resolve.
 * @param fallbackAddress - The fallback address to use if the ENS name cannot be resolved.
 * @param contractName - The name of the contract for logging and validation purposes.
 * @param failedChecks - An array to store any failed checks encountered during the resolution process.
 * @param addressFromProviderContract - An optional address from the on-chain provider contract for additional validation.
 * @returns An object containing the resolved address and a boolean indicating if all checks passed.
 */
export const resolveAddressFromENS = async (
  publicClient: PublicClient,
  ensName: string,
  fallbackAddress: string,
  contractName: string,
  failedChecks: string[]
) => {
  let address = await publicClient.getEnsAddress({ name: normalize(ensName) })
  let isENSResolved = true
  const checkedFallback = getAddress(fallbackAddress)

  // if address is undefined, use the fallback address
  if (!address) {
    address = checkedFallback
    isENSResolved = false
    console.warn(`using fallback address for ${contractName}`)
    const failedCheck = `${contractName} ENS unresolved`
    if (!failedChecks.includes(failedCheck)) {
      failedChecks.push(failedCheck)
    }
  }

  return { address, isENSResolved }
}

/**
 * Validates if the provided address from the provider contract matches the fallback address.
 * If the addresses do not match, a warning is logged and the failed check is added to the failedChecks array.
 *
 * @param fallbackAddress - The fallback address to validate against.
 * @param contractName - The name of the contract being validated.
 * @param addressFromProviderContract - The address obtained from the provider contract.
 * @param failedChecks - An array to store the failed checks.
 * @returns A promise that resolves to a boolean indicating whether the addresses match.
 */
export async function validateAddress(
  fallbackAddress: string,
  contractName: string,
  addressFromProviderContract: string,
  failedChecks: string[]
) {
  const match =
    getAddress(addressFromProviderContract) === getAddress(fallbackAddress)
  if (!match) {
    console.warn(
      `${contractName} Fallback address in Constants does not match Provider Contract. Update the fallback address and check the ABI in /src/ethereum/constants.ts.`
    )
    const failedCheck = `${contractName}: ${addressFromProviderContract}`
    if (!failedChecks.includes(failedCheck)) {
      failedChecks.push(failedCheck)
    }
  }
  return match
}
