module.exports = {
  mySidebar: [
    'introduction',
    'contribute',
    'contributor-tools',
    {
      type: 'category',
      label: 'Operations',
      items: [
        'operations/budget',
        {
          type: 'link',
          href: 'https://github.com/yearn/budget/issues',
          label: 'Budget Requests',
        },
      ],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/proposal-process',
        'governance/yfi',
        {
          type: 'category',
          label: 'veYFI',
          link: {
            type: 'doc',
            id: 'governance/veYFI-intro',
          },
          items: [
            'governance/veyfi',
            {
              type: 'link',
              label: 'Contract Addresses →',
              href: '/developers/addresses/veyfi-contracts',
            },
            {
              type: 'link',
              label: 'veYFI dApp',
              href: 'https://veyfi.yearn.fi/',
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Documentation',
      items: [
        'documentation/working-on-docs',
        'documentation/writing-style-guide',
      ],
    },
  ],
}
