export default {
  gettingStarted: [
    {
      type: 'category',
      label: 'Yearn Products',
      link: {
        type: 'doc',
        id: 'intro',
      },
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'yVaults',
          link: {
            type: 'doc',
            id: 'products/yvaults/overview',
          },
          items: [
            {
              type: 'category',
              label: 'yVaults v3',
              link: {
                type: 'doc',
                id: 'products/yvaults/v3/v3',
              },
              items: [
                {
                  type: 'link',
                  label: 'v3 Vaults Interface Guide →',
                  href: '../../../guides/interface-guides/using-yearn-v3', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'v3 Vaults dApp',
                  href: 'https://yearn.fi/v3',
                },
              ],
            },
            {
              type: 'category',
              label: 'yVaults v2',
              link: {
                type: 'doc',
                id: 'products/yvaults/v2/v2',
              },
              items: [
                'products/yvaults/v2/vault-factory',
                {
                  type: 'link',
                  label: 'v2 Vaults Interface Guide →',
                  href: '../../../guides/interface-guides/using-yearn-v2', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'v2 Vaults dApp',
                  href: 'https://yearn.fi/vaults',
                },
              ],
            },
            'products/yvaults/vault-tokens',
            {
              type: 'doc',
              id: 'products/yvaults/yvaults-faq',
              label: 'yVaults FAQ',
            },
            {
              type: 'link',
              label: 'yVaults Dev Docs →',
              href: '/developers/v1/introduction',
            },
          ],
        },
        // {
        //   type: 'category',
        //   label: 'veYFI',
        //   link: {
        //     type: 'doc',
        //     id: 'products/veyfi',
        //   },
        //   items: [
        //     {
        //       type: 'link',
        //       label: 'veYFI dApp',
        //       href: 'https://veyfi.yearn.fi/',
        //     },
        //   ],
        // },
        {
          type: 'category',
          label: 'yPools',
          items: [
            {
              type: 'category',
              label: 'yETH',
              link: {
                type: 'doc',
                id: 'products/ypools/yeth/overview',
              },
              items: [
                {
                  type: 'doc',
                  id: 'products/ypools/yeth/yeth-faq',
                  label: 'yETH FAQ',
                },
                {
                  type: 'link',
                  label: 'yETH dApp',
                  href: 'https://yeth.yearn.fi/',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'yLockers',
          link: {
            type: 'doc',
            id: 'products/ylockers/overview',
          },
          items: [
            {
              type: 'category',
              label: 'yCRV',
              link: {
                type: 'doc',
                id: 'products/ylockers/ycrv/overview',
              },
              items: [
                'products/ylockers/ycrv/ycrv-faq',
                {
                  type: 'link',
                  label: 'yCRV Interface Guide →',
                  href: '../../../guides/interface-guides/ycrv-guide', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'yCRV Contract Addresses →',
                  href: '/developers/addresses/ycrv-contracts',
                },
                {
                  type: 'link',
                  label: 'yCRV dApp',
                  href: 'https://ycrv.yearn.fi/',
                },
              ],
            },
            {
              type: 'category',
              label: 'yPRISMA',
              link: {
                type: 'doc',
                id: 'products/ylockers/yprisma/overview',
              },
              items: [
                'products/ylockers/yprisma/yprisma-faq',
                {
                  type: 'link',
                  label: 'yPRISMA Interface Guide →',
                  href: '../../../guides/interface-guides/yprisma-guide', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'yPRISMA Contract Addresses →',
                  href: '/developers/addresses/yprisma-contracts',
                },
                {
                  type: 'link',
                  label: 'yPRISMA dApp',
                  href: 'https://yprisma.yearn.fi/',
                },
              ],
            },
          ],
        },
        // {
        //   type: 'category',
        //   label: 'yBribe',
        //   items: [
        //     'products/ybribe/overview',
        //     'products/ybribe/guide',
        //     'products/ybribe/faq',
        //   ],
        // },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    {
      type: 'category',
      label: 'About Yearn',
      // link: {
      //   type: 'doc',
      //   id: 'intro',
      // },
      items: [
        'yearn-principles',
        {
          type: 'link',
          label: 'The Blue Pill',
          href: 'https://yfistory.org/thebluepill',
        },
        {
          type: 'link',
          label: 'DAO Docs →',
          href: '/contributing/contribute',
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    {
      type: 'category',
      label: 'Guides',
      items: [
        {
          type: 'category',
          label: 'Using Yearn',
          link: {
            type: 'doc',
            id: 'guides/interface-guides/index',
          },
          items: [
            'guides/interface-guides/using-yearn-v3',
            'guides/interface-guides/using-yearn-v2',
            'guides/interface-guides/ycrv-guide',
            'guides/interface-guides/yprisma-guide',
            'guides/interface-guides/how-to-add-a-custom-token-to-metamask',
          ],
        },
        {
          type: 'category',
          label: 'Understanding Yearn',
          link: {
            type: 'doc',
            id: 'guides/concept-explainers/index',
          },
          items: [
            'guides/concept-explainers/how-boost-works',
            'guides/concept-explainers/how-to-understand-yvault-roi',
            'guides/concept-explainers/how-apy-works',
            'guides/concept-explainers/how-to-understand-strategies-descriptions',
          ],
        },
      ],
    },
    {
      type: 'html',
      value: '<hr/>',
      className: 'divider',
    },
    {
      type: 'link',
      label: 'Token and Contract Addresses →',
      href: '/developers/addresses',
    },
    {
      type: 'link',
      label: 'Understanding Risks →',
      href: '/developers/security/risks/risk-overview',
    },
    {
      type: 'link',
      label: 'Smart Contracts →',
      href: '/developers/smart-contracts/',
    },
    { type: 'link', label: 'Security →', href: '/developers/security' },
    {
      type: 'link',
      label: 'Deprecated Projects →',
      href: '/resources/deprecated',
    },
  ],
}
