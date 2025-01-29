import React from 'react'
import { encodeFunctionData } from 'viem'
import { yPoolsInclusionVoteABI } from '../ethereum/ABIs'

const AbiEncoder = (epoch: number) => {
  const data = encodeFunctionData({
    abi: yPoolsInclusionVoteABI,
    functionName: 'set_enable_epoch',
    args: [BigInt(epoch)],
  })

  console.log(data)
  return (
    <div>
      <h3>AbiEncoder</h3>
    </div>
  )
}

export default AbiEncoder
