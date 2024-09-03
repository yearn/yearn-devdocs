module.exports = {
  userDocsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Products',
      collapsed: false,
      items: [
        {
          type: 'category',
          label: 'yVaults',
          items: [
            'products/yvaults/overview',
            'products/yvaults/vault-tokens',
            {
              type: 'category',
              label: 'yVaults Version 3',
              link: {
                type: 'doc',
                id: 'products/yvaults/v3',
              },
              items: [],
            },
            {
              type: 'category',
              label: 'yVaults Version 2',
              link: {
                type: 'doc',
                id: 'products/yvaults/v2',
              },
              items: ['products/yvaults/vault-factory'],
            },
          ],
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
          type: 'category',
          label: 'yBribe',
          items: [
            'products/ybribe/overview',
            'products/ybribe/guide',
            'products/ybribe/faq',
          ],
        },
        {
          type: 'link',
          label: 'veYFI →',
          href: '/contributing/governance/veyfi-intro',
        },
        {
          type: 'link',
          label: 'Deprecated Projects →',
          href: '/resources/deprecated',
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
  ],
}
