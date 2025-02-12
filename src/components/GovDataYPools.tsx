import React, { useContext, useEffect, useState } from 'react'
import { ContractDataContext } from '../context/ContractDataContext'

enum GovernanceState {
  PROPOSAL = 'Proposal Period',
  VOTING = 'Voting Period',
  NONE = 'None',
}

const GovDataYPools = () => {
  const data = useContext(ContractDataContext)
  const yPoolsGovernance = data?.['yPools Governance']
  const blockTimestamp = data?.['blockTimestamp']

  const [governanceState, setGovernanceState] = useState(GovernanceState.NONE)
  const [votingPeriodTime, setVotingPeriodTime] = useState<string | null>(null)
  const [epochEndTime, setEpochEndTime] = useState<string | null>(null)

  useEffect(() => {
    if (!yPoolsGovernance || !blockTimestamp) return

    const { genesis } = yPoolsGovernance
    if (!genesis) return

    const epochDuration = 4 * 7 * 24 * 60 * 60
    const proposalDuration = 3 * 7 * 24 * 60 * 60
    const votingDuration = 1 * 7 * 24 * 60 * 60

    const timeSinceGenesis = blockTimestamp - Number(genesis)
    const currentEpochTime = timeSinceGenesis % epochDuration

    let newGovernanceState = GovernanceState.NONE
    let newVotingPeriodTime: string | null = null

    // Always calculate current epoch's end time
    const currentEpochStart =
      Number(genesis) +
      Math.floor(timeSinceGenesis / epochDuration) * epochDuration
    const currentEpochEnd = currentEpochStart + epochDuration
    const newEpochEndTime = new Date(currentEpochEnd * 1000).toLocaleString(
      'en-US',
      { timeZone: 'UTC' }
    )
    setEpochEndTime(newEpochEndTime)

    if (currentEpochTime < proposalDuration) {
      newGovernanceState = GovernanceState.PROPOSAL
      const startOfVotingPeriod = currentEpochStart + proposalDuration
      newVotingPeriodTime = new Date(startOfVotingPeriod * 1000).toLocaleString(
        'en-US',
        { timeZone: 'UTC' }
      )
    } else {
      newGovernanceState = GovernanceState.VOTING
      const endOfVotingPeriod = currentEpochStart + epochDuration
      newVotingPeriodTime = new Date(endOfVotingPeriod * 1000).toLocaleString(
        'en-US',
        { timeZone: 'UTC' }
      )
    }

    if (newGovernanceState !== governanceState) {
      setGovernanceState(newGovernanceState)
    }
    if (newVotingPeriodTime !== votingPeriodTime) {
      setVotingPeriodTime(newVotingPeriodTime)
    }
  }, [yPoolsGovernance, blockTimestamp, governanceState, votingPeriodTime])

  if (!yPoolsGovernance) {
    return 'Fetching contract data...'
  }

  const { epoch } = yPoolsGovernance

  return (
    <div>
      <div>
        Current Epoch: <strong>{epoch?.toString()}</strong>
      </div>
      <div>
        Governance State: <strong>{governanceState}</strong>
      </div>
      {votingPeriodTime && (
        <div>
          {governanceState === GovernanceState.PROPOSAL ? (
            <div>
              Start of Voting Period: <strong>{votingPeriodTime} UTC</strong>
            </div>
          ) : (
            <div>
              End of Voting Period: <strong>{votingPeriodTime} UTC</strong>
            </div>
          )}
        </div>
      )}
      {epochEndTime && (
        <div>
          End of Current Epoch: <strong>{epochEndTime} UTC</strong>
        </div>
      )}
    </div>
  )
}

export default GovDataYPools
