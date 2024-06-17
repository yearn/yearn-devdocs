module.exports = {
  mySidebar: [
    'building-on-yearn',
    {
      type: 'category',
      label: 'yVaults Version 3',
      items: [
        'v3/overview',
        'v3/vault_management',
        'v3/strategy_writing_guide',
        'v3/protocol_fees',
        'v3/smart-contracts'
      ]
    },
    {
      type: 'category',
      label: 'yVaults Version 2',
      items: [
        'v2/getting-started',
        'v2/DEPLOYMENT',
        'v2/SPECIFICATION',
        'v2/OPERATIONS',
        'v2/additional-resources',

        {
          type: 'link',
          label: 'Smart Contracts',
          href: '/vaults/smart-contracts/BaseStrategy'
        }
      ]
    },
    {
      type: 'category',
      label: 'Yearn Data Services',
      items: [
        'data-services/yearn-data',
        {
          type: 'category',
          label: 'Subgraph',
          items: [
            'data-services/subgraph-info',
            'data-services/entities',
            'data-services/queries'
          ]
        },
        'data-services/yearn-lens',
        'data-services/yearn-api'
      ]
    },
    'front-end-development',
    'v2/naming-convention',
    'v2/EMERGENCY',
    'v2/fork-yearn-ui',
    'v2/ledger-plugin',
    'v2/yswaps'
  ]
}
