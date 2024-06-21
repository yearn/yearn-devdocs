export default {
  mySidebar: [
    'building-on-yearn',
    {
      type: 'category',
      label: 'yVaults',
      // link: {
      //   type: 'doc',
      //   id: 'v1/introduction',
      // },
      items: [
        {
          type: 'category',
          label: 'yVaults Version 3',
          link: {
            type: 'doc',
            id: 'v3/overview',
          },
          items: [
            'v3/Integrating_v3',
            'v3/strategy_writing_guide',
            'v3/vault_management',
            'v3/periphery',
            'v3/protocol_fees',
            {
              type: 'link',
              label: 'Smart Contracts →',
              href: '/smart-contracts/V3/Current-v3.0.2/BaseStrategy',
            },
          ],
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
              label: 'Smart Contracts →',
              href: '/smart-contracts/V2/Current-v0.4.6/BaseStrategy',
            },
          ],
        },
        {
          type: 'category',
          label: 'yVaults Version 1',
          link: {
            type: 'doc',
            id: 'v1/introduction',
          },
          items: [
            {
              type: 'link',
              label: 'Smart Contracts →',
              href: '/smart-contracts/V1/interfaces',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Yearn Data Services',
      link: {
        type: 'doc',
        id: 'data-services/yearn-data',
      },
      items: [
        {
          type: 'category',
          label: 'Subgraph',
          link: {
            type: 'doc',
            id: 'data-services/subgraph-info',
          },
          items: ['data-services/entities', 'data-services/queries'],
        },
        'data-services/yearn-lens',
        'data-services/yearn-api',
      ],
    },
    {
      type: 'category',
      label: 'Front End Development',
      link: {
        type: 'doc',
        id: 'front-end-development',
      },
      items: ['v2/fork-yearn-ui'],
    },
    {
      type: 'category',
      label: 'Other Products',
      items: [
        'v2/yswaps',
        'auctions',
        'v2/naming-convention',
        'v2/ledger-plugin',
      ],
    },
    { type: 'link', label: 'Smart Contracts →', href: '/smart-contracts' },
    {
      type: 'link',
      label: 'Security →',
      href: '/security',
    },
  ],
}
