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
            'products/yvaults/vaults-and-strategies',
            'products/yvaults/vault-tokens',
          ],
        },
        {
          type: 'category',
          label: 'yCRV',
          items: [
            'products/ycrv/overview',
            'products/ycrv/guide',
            'products/ycrv/faq',
          ],
        },
        'products/woofy',
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
