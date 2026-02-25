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
          label: 'stYFI',
          link: {
            type: 'doc',
            id: 'governance/styfi',
          },
          items: [
            'governance/migrating-from-veyfi',
            'governance/liquid-lockers',
            {
              type: 'link',
              label: 'Contract Addresses →',
              href: '/developers/addresses/styfi-contracts',
            },
            {
              type: 'link',
              label: 'stYFI dashboard',
              href: 'https://styfi.yearn.fi/',
            },
            {
              type: 'link',
              label: 'Migration + LLYFI dashboard',
              href: 'https://veyfi.yearn.fi/',
            },
            {
              type: 'link',
              label: 'Legacy veYFI lock management',
              href: 'https://legacy-veyfi.yearn.fi/',
            },
          ],
        },
        {
          type: 'category',
          label: 'veYFI (Deprecated)',
          link: {
            type: 'doc',
            id: 'governance/veYFI-intro',
          },
          items: [
            'governance/veyfi',
            'governance/veYFI-comp-summary',
            'governance/veyfi-calculator',
            'governance/veyfi-faq',
            {
              type: 'link',
              label: 'Contract Addresses →',
              href: '/developers/addresses/veyfi-contracts',
            },
            {
              type: 'link',
              label: 'veYFI / LLYFI dashboard',
              href: 'https://veyfi.yearn.fi/',
            },
            {
              type: 'link',
              label: 'veYFI Snapshot Voting Page',
              href: 'https://snapshot.org/#/veyfi.eth',
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
    {
      type: 'link',
      label: 'LLM Friendly Documentation',
      href: '/getting-started/llm-friendly-docs',
    },
  ],
}
