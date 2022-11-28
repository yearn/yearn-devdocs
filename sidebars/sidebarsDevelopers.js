module.exports = {
  mySidebar: [
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
      href: '/vaults/smart-contracts/BaseStrategy',
        },
    'v2/yearn-data',
    'v2/hacking-with-yearn',
    'v2/yswaps',
    'v2/fork-yearn-ui',
  ],
},
{
  type: 'category',
  label: 'Subgraph Information',
  items: [
    'docs/developers/v2/subgraph-info.md',
    'docs/developers/v2/entities.md',
    'docs/developers/v2/queries.md',
  ],
},
