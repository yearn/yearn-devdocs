 module.exports = {
    mySidebar: [
      'intro','using-yearn',
      {
        type: 'category',
        label: 'Products',
        items: [
          {
            type: 'category',
            label: 'yVaults',
            items: ['products/yvaults/overview', 'products/yvaults/vaults-and-strategies', 'products/yvaults/vault-tokens', 'products/yvaults/yvault-advantages']
          },
          'products/earn',
          'products/woofy'
        ]
      },
    ],
  };
  