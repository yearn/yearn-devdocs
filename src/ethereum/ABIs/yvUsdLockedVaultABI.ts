export const yvUsdLockedVaultABI = [
  {
    stateMutability: 'view',
    type: 'function',
    name: 'availableWithdrawLimit',
    inputs: [{ name: '_owner', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'cooldownDuration',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'withdrawalWindow',
    inputs: [],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    stateMutability: 'view',
    type: 'function',
    name: 'getCooldownStatus',
    inputs: [{ name: 'user', type: 'address' }],
    outputs: [
      { name: 'cooldownEnd', type: 'uint256' },
      { name: 'windowEnd', type: 'uint256' },
      { name: 'shares', type: 'uint256' },
    ],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'startCooldown',
    inputs: [{ name: 'shares', type: 'uint256' }],
    outputs: [],
  },
  {
    stateMutability: 'nonpayable',
    type: 'function',
    name: 'cancelCooldown',
    inputs: [],
    outputs: [],
  },
] as const
