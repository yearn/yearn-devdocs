module.exports = {
  userDocsSidebar: [
    {
      type: 'category',
      label: 'Yearn Products',
      link: {
        type: 'doc',
        id: 'intro',
      },
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
              items: [
                'products/yvaults/v3',
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
              items: [
                'products/yvaults/vault-factory',
                {
                  type: 'link',
                  label: 'v2 Vaults dApp',
                  href: 'https://yearn.fi/vaults',
                },
              ],
            },
            'products/yvaults/vault-tokens',
            {
              type: 'link',
              label: 'yVaults Dev Docs →',
              href: '/developers/v1/introduction',
            },
          ],
        },
        {
          type: 'category',
          label: 'yPools',
          items: ['products/ypools/yeth/overview'],
        },
        {
          type: 'category',
          label: 'yLockers',
          items: [
            'products/ylockers/overview',
            {
              type: 'category',
              label: 'yCRV',
              items: [
                'products/ylockers/ycrv/overview',
                'products/ylockers/ycrv/ycrv-guide',
                'products/ylockers/ycrv/ycrv-faq',
              ],
            },
            {
              type: 'category',
              label: 'yPRISMA',
              items: [
                'products/ylockers/yprisma/overview',
                'products/ylockers/yprisma/yprisma-guide',
                'products/ylockers/yprisma/yprisma-faq',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'yETH',
          items: ['products/yeth/overview'],
        },
        {
          type: 'link',
          label: 'veYFI →',
          href: '/contributing/governance/veyfi-intro',
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
          label: 'veYFI →',
          href: '/contributing/governance/veyfi-intro',
        },
        {
          type: 'link',
          label: 'veYFI →',
          href: '/contributing/governance/veyfi-intro',
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
        'guides/using-yearn-v3',
        'guides/using-yearn-v2',
        'guides/how-boost-works',
        'guides/how-to-add-a-custom-token-to-metamask',
        'guides/how-to-understand-yvault-roi',
        'guides/how-apy-works',
        'guides/how-to-understand-strategies-descriptions',
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
      href: '/developers/security/risks',
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
