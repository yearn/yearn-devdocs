TODO: 'after upgrade to v3, change to: export default { mySidebar: ... }'

export default {
  mySidebar: [
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
    'yearn-lens/yearn-lens',
    'yearn-sdk/yearn-stack',
    'yearn-api',
  ],
}
