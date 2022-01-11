/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: 'Yearn.finance',
  tagline: 'DeFi made simple',
  url: 'https://docs.yearn.finance',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'yearn', // Usually your GitHub org/user name.
  projectName: 'yearn-devdocs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: process.env.ALGOLIA_API_KEY || 'UNKNOWN',
      indexName: process.env.ALGOLIA_INDEX_NAME || 'UNKNOWN',
      appId: process.env.ALGOLIA_APP_ID || 'UNKNOWN',
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
      switchConfig: {
        darkIcon: '\u0020',
        darkIconStyle: {
          marginLeft: '0px',
          backgroundColor: 'transparent',
        },
        lightIcon: '\u{00A0}',
        lightIconStyle: {
          marginLeft: '0px',
          backgroundColor: 'transparent',
        },
      }
    },
    image: 'img/YFILogoGradient.png',
    metadatas: [{name:'twitter:card', content:'Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides lending aggregation, yield generation, and insurance on the Ethereum blockchain.'}],
    navbar: {
      hideOnScroll: true,
      title: 'Yearn Finance',
      logo: {
        alt: 'YFI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'getting-started/intro',
          label: 'Getting Started'
        },
        {
          to: 'developers/v2/getting-started',
          label: "Develop"
        },
        {
          to: 'partners/introduction',
          label: "Partner"
        },
        {
          to: 'contributing/contribute',
          label: "Contribute"
        },
        {
          to: 'resources/faq',
          label: "Resources"
        },
        {
          to: 'security/index',
          label: "Security"
        },
        {
          type: 'docsVersionDropdown',
          dropdownItemsBefore: [],
          position: 'right',
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,
          docsPluginId: 'default',
        },
        {
          type: 'search',
          position: 'right'
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Developers',
          items: [
            {
              label: 'Open Issues',
              href: 'https://contribute.yearn.rocks/',
            },
            {
              label: '#strategies',
              href: 'https://discord.gg/ABh9zXGq',
            },
            {
              label: 'Get Involved - Survey',
              href: 'https://forms.gle/Jkbu81sjAfL6NzH17',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'yearn-vaults',
              href: 'https://github.com/yearn/yearn-vaults',
            },
            {
              label: 'brownie-strategy-mix',
              href: 'https://github.com/yearn/brownie-strategy-mix',
            },
            {
              label: 'brownie-wrapper-mix',
              href: 'https://github.com/yearn/brownie-wrapper-mix',
            },
            {
              label: 'yearn-watch',
              href: 'https://github.com/yearn/yearn-watch',
            },
            {
              label: 'yearn-finance-v3',
              href: 'https://github.com/yearn/yearn-finance-v3',
            },
            {
              label: 'yearn-security',
              href: 'https://github.com/yearn/yearn-security',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Vaults',
              href: 'https://yearn.finance/vaults',
            },
            {
              label: 'YFI Stats',
              href: 'https://www.yfistats.com/',
            },
            {
              label: 'Bowswap',
              href: 'https://bowswap.finance/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/yearn/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/iearnfinance',
            },
            {
              label: 'Telegram',
              href: 'https://t.me/yearnfinance/',
            },
            {
              label: 'Medium',
              href: 'https://medium.com/iearn',
            },
            {
              label: 'Forum',
              href: 'https://gov.yearn.finance',
            },
            {
              label: 'Snapshot voting',
              href: 'https://snapshot.org/#/ybaby.eth',
            },
          ],
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: "vaults",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: "vaults",
          sidebarPath: require.resolve('./sidebars/sidebars.js'),
          editUrl: 'https://github.com/yearn/yearn-devdocs/edit/master/website/',
          includeCurrentVersion: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css',
      integrity: 'sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc',
      crossorigin: 'anonymous'
    },
   ],
    plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'developers',
        path: 'docs/developers',
        routeBasePath: 'developers',
        sidebarPath: require.resolve('./sidebars/sidebarsDevelopers.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getting-started',
        path: 'docs/getting-started',
        routeBasePath: 'getting-started',
        sidebarPath: require.resolve('./sidebars/sidebarsGettingStarted.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'partners',
        path: 'docs/partners',
        routeBasePath: 'partners',
        sidebarPath: require.resolve('./sidebars/sidebarsPartners.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'docs/contributing',
        routeBasePath: 'contributing',
        sidebarPath: require.resolve('./sidebars/sidebarsContributing.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        remarkPlugins: [math],
        rehypePlugins: [katex],
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'resources',
        path: 'docs/resources',
        routeBasePath: 'resources',
        sidebarPath: require.resolve('./sidebars/sidebarsResources.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'security',
        path: 'docs/security',
        routeBasePath: 'security',
        sidebarPath: require.resolve('./sidebars/sidebarsSecurity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ]
};
