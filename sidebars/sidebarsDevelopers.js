module.exports = {
  mySidebar: [
    {
      type: 'category',
      label: 'yVaults Version 3',
      items: [
        'v3/overview',
        'v3/protocol_fees',
        'v3/vault_management',
        'v3/strategy_writing_guide',
      ],
    },
    {
      type: 'category',
      label: 'yVaults Version 2',
      items: [
        'v2/getting-started',
        'v2/additional-resources',
        {
          type: 'category',
          label: 'Procedures',
          items: [
            'v2/SPECIFICATION',
            'v2/DEPLOYMENT',
            'v2/OPERATIONS',
            'v2/EMERGENCY',
            'v2/naming-convention',
            'v2/ledger-plugin',
          ],
        },
        {
          type: 'link',
          label: 'Smart Contracts',
          href: '../../smart-contracts',
        },
        {
          type: 'category',
          label: 'Yearn Data Services',
          items: [
            'v2/yearn-data',
            {
              type: 'category',
              label: 'Subgraph',
              items: ['v2/subgraph-info', 'v2/entities', 'v2/queries'],
            },
            'v2/yearn-lens',
            'v2/yearn-api',
          ],
        },
        'v2/hacking-with-yearn',
        'v2/fork-yearn-ui',
        'v2/yswaps',
      ],
    },
  ],
}
