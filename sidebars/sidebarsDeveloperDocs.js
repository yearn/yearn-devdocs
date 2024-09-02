export default {
  developers: [
    {
      type: 'category',
      label: 'Building on Yearn',
      link: {
        type: 'doc',
        id: 'building-on-yearn',
      },
      collapsed: true,
      items: [
        // yVaults
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
                  label: 'v3 Contract Addresses →',
                  href: '../../developers/addresses/v3-contracts', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'Smart Contracts →',
                  href: '../../developers/smart-contracts/V3/Current-v3.0.2/BaseStrategy', //this breaks if you don't use relative links here
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
        // Yearn Data Services
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
          ],
        },
        // Front End Development
        {
          type: 'category',
          label: 'Front End Development',
          link: {
            type: 'doc',
            id: 'front-end-development',
          },
          items: ['data-services/yearn-stack', 'v2/fork-yearn-ui'],
        },
        // Other Stuff
        {
          type: 'category',
          label: 'Other Stuff',
          items: [
            // 'wallet-integrations',
            'v2/yswaps',
            'auctions',
            'v2/ledger-plugin',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    // Token and Contract Addresses
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
          label: 'veYFI',
          id: 'addresses/veyfi-contracts',
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
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    // Smart Contracts
    {
      type: 'category',
      label: 'Smart Contracts',
      link: {
        type: 'doc',
        id: 'smart-contracts/index',
      },
      items: [
        {
          type: 'category',
          label: 'V3 Vaults',
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'smart-contracts/V3',
            },
          ],
        },
        {
          type: 'category',
          label: 'V2 Vaults',
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'smart-contracts/V2',
            },
          ],
        },
        {
          type: 'category',
          label: 'V1 Vaults',
          collapsed: true,
          items: [
            {
              type: 'autogenerated',
              dirName: 'smart-contracts/V1',
            },
          ],
        },
        {
          type: 'link',
          label: 'Yearn Lens →',
          href: '../../data-services/yearn-lens#contracts',
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    //Security
    {
      type: 'category',
      label: 'Security',
      link: {
        type: 'doc',
        id: 'security/index',
      },
      items: [
        'security/multisig',
        {
          type: 'category',
          label: 'Risks',
          link: {
            type: 'doc',
            id: 'security/risks/index',
          },
          items: [
            'security/risks/risk-score',
            'security/risks/protocol-risks',
            'security/risks/strategy-risks',
            'security/risks/vault-risks',
          ],
        },
        'security/testing',
        'security/EMERGENCY',
      ],
    },
  ],
}
