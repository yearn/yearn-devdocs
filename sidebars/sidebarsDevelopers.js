export default {
  developers: [
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
          label: 'yVaults v3',
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
          label: 'yVaults v2',
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
          label: 'yVaults v1',
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
        'v2/naming-convention',
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
          type: 'link',
          label: 'yDaemon',
          href: 'https://ydaemon.yearn.farm/docs/intro',
        },
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
        'data-services/yearn-stack',
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
        'wallet-integrations',
        'v2/yswaps',
        'auctions',
        'v2/ledger-plugin',
      ],
    },
    {
      type: 'category',
      label: 'Token and Contract Addresses',
      link: {
        type: 'doc',
        id: 'addresses/index',
      },
      items: [
        {
          type: 'doc',
          label: 'General',
          id: 'addresses/core-contracts',
        },
        {
          type: 'doc',
          label: 'yVaults v3',
          id: 'addresses/v3-contracts',
        },
        {
          type: 'doc',
          label: 'yVaults v2',
          id: 'addresses/v2-contracts',
        },
        {
          type: 'doc',
          label: 'yCRV',
          id: 'addresses/ycrv-contracts',
        },
        {
          type: 'doc',
          label: 'yPRISMA',
          id: 'addresses/yprisma-contracts',
        },
        {
          type: 'doc',
          label: 'Lens',
          id: 'addresses/lens-contracts',
        },
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
