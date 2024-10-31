export const ygRegistryABI = [
  {
    "name": "Register",
    "inputs": [
      { "name": "gauge", "type": "address", "indexed": true },
      { "name": "idx", "type": "uint256", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "Deregister",
    "inputs": [
      { "name": "gauge", "type": "address", "indexed": true },
      { "name": "idx", "type": "uint256", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "UpdateIndex",
    "inputs": [
      { "name": "old_idx", "type": "uint256", "indexed": true },
      { "name": "idx", "type": "uint256", "indexed": false }
    ],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "SetController",
    "inputs": [{ "name": "controller", "type": "address", "indexed": false }],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "SetFactory",
    "inputs": [{ "name": "factory", "type": "address", "indexed": false }],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "PendingManagement",
    "inputs": [{ "name": "management", "type": "address", "indexed": true }],
    "anonymous": false,
    "type": "event"
  },
  {
    "name": "SetManagement",
    "inputs": [{ "name": "management", "type": "address", "indexed": true }],
    "anonymous": false,
    "type": "event"
  },
  {
    "stateMutability": "nonpayable",
    "type": "constructor",
    "inputs": [
      { "name": "_controller", "type": "address" },
      { "name": "_factory", "type": "address" }
    ],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "gauges",
    "inputs": [{ "name": "_idx", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "register",
    "inputs": [{ "name": "_gauge", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "deregister",
    "inputs": [
      { "name": "_gauge", "type": "address" },
      { "name": "_idx", "type": "uint256" }
    ],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "registered",
    "inputs": [{ "name": "_gauge", "type": "address" }],
    "outputs": [{ "name": "", "type": "bool" }]
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_controller",
    "inputs": [{ "name": "_controller", "type": "address" }],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_factory",
    "inputs": [{ "name": "_factory", "type": "address" }],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "set_management",
    "inputs": [{ "name": "_management", "type": "address" }],
    "outputs": []
  },
  {
    "stateMutability": "nonpayable",
    "type": "function",
    "name": "accept_management",
    "inputs": [],
    "outputs": []
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "management",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "pending_management",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "controller",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "factory",
    "inputs": [],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "vault_count",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "vaults",
    "inputs": [{ "name": "arg0", "type": "uint256" }],
    "outputs": [{ "name": "", "type": "address" }]
  },
  {
    "stateMutability": "view",
    "type": "function",
    "name": "vault_gauge_map",
    "inputs": [{ "name": "arg0", "type": "address" }],
    "outputs": [{ "name": "", "type": "address" }]
  }
] as const
