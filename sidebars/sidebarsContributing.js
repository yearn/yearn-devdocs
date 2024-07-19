export default {
  contributing: [
    'introduction',
    'contribute',
    'contributor-tools',
    {
      type: 'category',
      label: 'Operations',
      items: ['operations/budget'],
    },
    {
      type: 'category',
      label: 'Governance',
      items: [
        'governance/proposal-process',
        'governance/governance-and-operations',
        'governance/yfi',
        {
          type: 'category',
          label: 'veYFI',
          link: {
            type: 'doc',
            id: 'governance/veyfi',
          },
          items: [
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
