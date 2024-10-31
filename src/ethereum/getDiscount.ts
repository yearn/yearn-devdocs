import { getContractData } from './ethereumService'
import { dyfiRedemptionABI } from './ABIs/dyfi-redemption'
import { dyfiRedemptionAddress } from './constants'

export const getDiscount = async (args: any[]) => {
  return getContractData(
    dyfiRedemptionAddress,
    dyfiRedemptionABI,
    'discount',
    []
  )
}
