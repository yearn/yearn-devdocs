export default {
  smartContracts: [
    'index',
    {
      type: 'category',
      label: 'V3 Vaults',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'V3',
        },
      ],
    },
    {
      type: 'category',
      label: 'V2 Vaults',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'V2',
        },
      ],
    },
    {
      type: 'category',
      label: 'V1 Vaults',
      collapsed: true,
      items: [
        {
          type: 'autogenerated',
          dirName: 'V1',
        },
      ],
    },
    'yearn-lens/yearn-lens',
    'yearn-sdk/yearn-stack',
    'yearn-api',
    {
      type: 'link',
      label: 'Developer Docs →',
      href: '/developers/building-on-yearn',
    },
  ],
}
