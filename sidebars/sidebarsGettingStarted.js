module.exports = {
  mySidebar: [
    'intro',
    'using-yearn',
    {
      type: 'category',
      label: 'Products',
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
              items: ['products/yvaults/v3'],
            },
            {
              type: 'category',
              label: 'yVaults Version 2',
              items: ['products/yvaults/vault-factory'],
            },
          ],
        },
        {
          type: 'category',
          label: 'veYFI',
          items: ['products/veyfi'],
        },
        {
          type: 'category',
          label: 'yETH',
          items: ['products/yeth/overview'],
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
                'products/ylockers/ycrv/guide',
                'products/ylockers/ycrv/faq',
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
        'guides/how-boost-works',
        'guides/how-to-add-a-custom-token-to-metamask',
        'guides/how-to-understand-yvault-roi',
        'guides/how-apy-works',
        'guides/how-to-understand-strategies-descriptions',
      ],
    },
    'products/addresses',
  ],
}
