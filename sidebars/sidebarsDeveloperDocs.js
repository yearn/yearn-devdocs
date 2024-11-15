// NOTICE: don't use relative links in this file when setting hrefs, as they append to the current URL, which may not be what you expect.
// GOOD: href: '/developers/smart-contracts/V1/interfaces',
// BAD: href: './smart-contracts/V1/interfaces',

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
                'v3/vault_deployment',
                'v3/periphery',
                'v3/protocol_fees',
                {
                  type: 'link',
                  label: 'v3 Contract Addresses →',
                  href: 'https://docs.yearn.fi/developers/addresses/v3-contracts',
                },
                {
                  type: 'link',
                  label: 'Smart Contracts →',
                  href: 'https://docs.yearn.fi/developers/smart-contracts/V3/', // this link needs to be hardcoded to not cause issues with the sidebar
                },
              ],
            },
            {
              type: 'category',
              label: 'yVaults v2',
              items: [
                'v2/getting-started',
                'v2/DEPLOYMENT',
                'v2/vault-factory',
                'v2/SPECIFICATION',
                'v2/OPERATIONS',
                'v2/additional-resources',
                {
                  type: 'link',
                  label: 'v2 Contract Addresses →',
                  href: 'https://docs.yearn.fi/developers/addresses/v2-contracts',
                },
                {
                  type: 'link',
                  label: 'Smart Contracts →',
                  href: 'https://docs.yearn.fi/developers/smart-contracts/v2/', // this link needs to be hardcoded to not cause issues with the sidebar
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
                  href: 'https://docs.yearn.fi/developers/smart-contracts/v1/interfaces', // this link needs to be hardcoded to not cause issues with the sidebar
                },
              ],
            },
            'v2/naming-convention',
          ],
        },
        // yPools
        {
          type: 'category',
          label: 'yPools',
          link: {
            type: 'doc',
            id: 'ypools/ypools-overview',
          },
          items: [
            {
              type: 'category',
              label: 'yETH',
              link: {
                type: 'doc',
                id: 'ypools/yeth/yeth-overview',
              },
              items: ['ypools/yeth/adding-assets'],
            },
            'ypools/ypools-roles',
            {
              type: 'link',
              label: 'yPools Contract Addresses →',
              href: '/developers/addresses/ypools-contracts',
            },
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
          label: 'yPools',
          id: 'addresses/ypools-contracts',
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
          label: 'yVaults V3',
          link: {
            type: 'doc',
            id: 'smart-contracts/V3/index',
          },
          collapsed: true,
          items: [
            'smart-contracts/V3/BaseStrategy',
            'smart-contracts/V3/TokenizedStrategy',
            'smart-contracts/V3/VaultFactory',
            'smart-contracts/V3/VaultV3',
            {
              type: 'category',
              label: 'Periphery',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'smart-contracts/V3/Periphery',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'yVaults V2',
          collapsed: true,
          link: {
            type: 'doc',
            id: 'smart-contracts/V2/index',
          },
          items: [
            'smart-contracts/V2/BaseStrategy',
            'smart-contracts/V2/BaseFeeOracle',
            'smart-contracts/V2/CommonHealthCheck',
            'smart-contracts/V2/registry',
            'smart-contracts/V2/vault',
            {
              type: 'category',
              label: 'test',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'smart-contracts/V2/test',
                },
              ],
            },
          ],
        },
        // {
        //   type: 'category',
        //   label: 'V1 Vaults',
        //   collapsed: true,
        //   items: [
        //     {
        //       type: 'autogenerated',
        //       dirName: 'smart-contracts/V1',
        //     },
        //   ],
        // },
        {
          type: 'link',
          label: 'Yearn Lens →',
          href: '/developers/data-services/yearn-lens#contracts',
        },
        {
          type: 'category',
          label: 'Deprecated',
          link: {
            type: 'doc',
            id: 'smart-contracts/deprecated/index',
          },
          items: [
            {
              type: 'category',
              label: 'yVaults V1',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'smart-contracts/deprecated/V1',
                },
              ],
            },
            {
              type: 'category',
              label: 'yVaults V2',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'smart-contracts/deprecated/V2',
                },
              ],
            },
            {
              type: 'category',
              label: 'yVaults V3',
              items: [
                {
                  type: 'autogenerated',
                  dirName: 'smart-contracts/deprecated/V3',
                },
              ],
            },
          ],
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
