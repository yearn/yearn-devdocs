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
              link: {
                type: 'doc',
                id: 'products/yvaults/v3',
              },
              items: [
                {
                  type: 'link',
                  label: 'v3 Vaults Interface Guide →',
                  href: '/getting-started/guides/using-yearn-v3', //this breaks if you don't use relative links here
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
                id: 'products/yvaults/v2',
              },
              items: [
                {
                  type: 'link',
                  label: 'v2 Vaults Interface Guide →',
                  href: '/getting-started/guides/using-yearn-v2', //this breaks if you don't use relative links here
                },
                {
                  type: 'link',
                  label: 'v2 Vaults dApp',
                  href: 'https://yearn.fi/vaults',
                },
              ],
            },
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
                'products/ylockers/yprisma/yprisma-guide',
                'products/ylockers/yprisma/yprisma-faq',
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
          label: 'DAO Docs →',
          href: '/contributing/introduction',
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
        'guides/user-faq',
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
