export default {
  gettingStarted: [
    {
      type: 'category',
      label: 'What is Yearn?',
      link: {
        type: 'doc',
        id: 'intro',
      },
      items: [
        'yearn-principles',
        {
          type: 'link',
          label: 'The Blue Pill',
          href: 'https://yfistory.org/thebluepill',
        },
      ],
    },
    {
      type: 'category',
      label: 'Products',
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
              items: ['products/yvaults/v3/using-yearn-v3'],
            },
            {
              type: 'category',
              label: 'yVaults v2',
              link: {
                type: 'doc',
                id: 'products/yvaults/v2/v2',
              },
              items: ['products/yvaults/v2/using-yearn-v2'],
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
              href: '../../../developers/v1/introduction',
            },
          ],
        },
        {
          type: 'category',
          label: 'veYFI',
          link: {
            type: 'doc',
            id: 'products/veyfi',
          },
          items: [],
        },
        {
          type: 'category',
          label: 'yETH',
          link: {
            type: 'doc',
            id: 'products/yeth/overview',
          },
          items: [
            {
              type: 'doc',
              id: 'products/yeth/yeth-faq',
              label: 'yETH FAQ',
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
                'products/ylockers/ycrv/ycrv-guide',
                'products/ylockers/ycrv/ycrv-faq',
                {
                  type: 'link',
                  label: 'yCRV Contract Addresses →',
                  href: '/developers/addresses/ycrv-contracts',
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
                'products/ylockers/yprisma/yprisma-guide',
                'products/ylockers/yprisma/yprisma-faq',
                {
                  type: 'link',
                  label: 'yPRISMA Contract Addresses →',
                  href: '/developers/addresses/yprisma-contracts',
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'yBribe',
          items: [
            'products/ybribe/overview',
            'products/ybribe/guide',
            'products/ybribe/faq',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Guides',
      link: {
        type: 'doc',
        id: 'guides/index',
      },
      items: [
        {
          type: 'ref',
          label: 'v3 Vaults Interface Guide →',
          id: 'products/yvaults/v3/using-yearn-v3',
        },
        {
          type: 'ref',
          label: 'v2 Vaults Interface Guide →',
          id: 'products/yvaults/v2/using-yearn-v2',
        },
        'guides/how-boost-works',
        'guides/how-to-add-a-custom-token-to-metamask',
        'guides/how-to-understand-yvault-roi',
        'guides/how-apy-works',
        'guides/how-to-understand-strategies-descriptions',
      ],
    },
    {
      type: 'link',
      label: 'Token and Contract Addresses →',
      href: '/developers/addresses',
    },
    {
      type: 'link',
      label: 'Understanding Risks →',
      href: '/security/risks/risk-overview',
    },
    { type: 'link', label: 'Smart Contracts →', href: '/smart-contracts' },
    { type: 'link', label: 'Security →', href: '/security' },
  ],
}
