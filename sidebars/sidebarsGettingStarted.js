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
            'products/yvaults/yvault-advantages',
          ],
        },
        {
          type: 'category',
          label: 'yCRV',
          items: [
            'products/ycrv/overview',
            'products/ycrv/faq',
            'products/ycrv/vl-crv',
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
        'guides/how-to-understand-yveCRV',
        'guides/how-apy-works',
        'guides/how-to-understand-strategies-descriptions',
      ],
    },
    'products/token-addresses',
  ],
}
