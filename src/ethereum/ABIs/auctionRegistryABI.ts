export const auctionRegistryABI = [
  {
    stateMutability: 'view',
    type: 'function',
    name: 'getLatestFactory',
    inputs: [],
    outputs: [{ name: '', type: 'address' }],
  },
] as const
