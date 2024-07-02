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
                id: 'products/yvaults/v3',
              },
              items: [],
            },
            {
              type: 'category',
              label: 'yVaults v2',
              link: {
                type: 'doc',
                id: 'products/yvaults/vault-factory',
              },
              items: [],
            },
            'products/yvaults/vault-tokens',
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
          items: [],
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
      items: [
        'guides/using-yearn-v3',
        'guides/using-yearn-v2',
        'guides/how-boost-works',
        'guides/how-to-add-a-custom-token-to-metamask',
        'guides/how-to-understand-yvault-roi',
        'guides/how-apy-works',
        'guides/how-to-understand-strategies-descriptions',
      ],
    },
    'products/addresses',
    {
      type: 'link',
      label: 'Understanding Risks →',
      href: '/security/risks/risk-overview',
    },
    { type: 'link', label: 'Smart Contracts →', href: '/smart-contracts' },
    { type: 'link', label: 'Security →', href: '/security' },
  ],
}
