export default {
  security: [
    'index',
    'multisig',
    {
      type: 'category',
      label: 'Risks',
      link: {
        type: 'doc',
        id: 'risks/risk-score',
      },
      items: [
        'risks/protocol-risks',
        'risks/strategy-risks',
        'risks/vault-risks',
      ],
    },
    'testing',
    'EMERGENCY',
  ],
}
