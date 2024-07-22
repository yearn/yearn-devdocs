export default {
  security: [
    'index',
    'multisig',
    {
      type: 'category',
      label: 'Risks',
      link: {
        type: 'doc',
        id: 'risks/risk-overview',
      },
      items: [
        'risks/risk-score',
        'risks/protocol-risks',
        'risks/strategy-risks',
        'risks/vault-risks',
      ],
    },
    'testing',
    'EMERGENCY',
  ],
}
