// @ts-check
/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math')
const katex = require('rehype-katex')

module.exports = {
  title: 'yearn.fi',
  tagline: 'DeFi made simple',
  url: 'https://docs.yearn.fi',
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
    },
    image: 'img/YFILogoGradient.jpg',
    metadata: [
      {
        name: 'twitter:card',
        content:
          'Yearn Finance is a suite of products in Decentralized Finance (DeFi) that provides lending aggregation, yield generation, and insurance on the Ethereum blockchain.',
      },
      {
        name: 'git-url',
        content: 'https://github.com/yearn/yearn-devdocs'
      }
    ],
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
          label: 'Introduction',
        },
        {
          to: 'developers/v3/overview',
          label: 'Develop',
        },
        {
          to: '/vaults/smart-contracts/BaseStrategy',
          label: 'Smart Contracts',
        },
        {
          to: 'contributing/contribute',
          label: 'Contribute',
        },
        {
          to: 'resources/faq',
          label: 'Resources',
        },
        {
          to: 'security/',
          label: 'Security',
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
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'GitHub',
          items: [
            {
              label: 'V3 Vaults',
              href: 'https://github.com/yearn/yearn-vaults-v3',
            },
            {
              label: 'V3 Tokenized Strategy',
              href: 'https://github.com/yearn/tokenized-strategy',
            },
            {
              label: 'V3 Strategy Mix: Foundry',
              href: 'https://github.com/yearn/tokenized-strategy-foundry-mix',
            },
            {
              label: 'V3 Strategy Mix: Ape',
              href: 'https://github.com/yearn/tokenized-strategy-ape-mix',
            },
            {
              label: 'V2 Vaults',
              href: 'https://github.com/yearn/yearn-vaults',
            },
            {
              label: 'V2 Strategy Mix',
              href: 'https://github.com/yearn/brownie-strategy-mix',
            },
            {
              label: 'yearn-security',
              href: 'https://github.com/yearn/yearn-security',
            },
            {
              label: 'yearn-devdocs',
              href: 'https://github.com/yearn/yearn-devdocs',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'V3 Vaults',
              href: 'https://yearn.fi/v3',
            },
            {
              label: 'V2 Vaults',
              href: 'https://yearn.fi/vaults',
            },
            {
              label: 'Juiced Vaults',
              href: 'https://juiced.yearn.fi/',
            },
            {
              label: 'veYFI',
              href: 'https://veyfi.yearn.fi/',
            },
            {
              label: 'yETH',
              href: 'https://yeth.yearn.fi/',
            },
            {
              label: 'yCRV',
              href: 'https://ycrv.yearn.fi/',
            },
            {
              label: 'yPrisma',
              href: 'https://yprisma.yearn.fi/',
            },
            {
              label: 'yBribe',
              href: 'https://ybribe.yearn.fi/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/b8ENPNqG5c',
            },
            {
              label: 'Twitter',
              href: 'https://x.com/yearnfi',
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
              href: 'https://gov.yearn.fi',
            },
            {
              label: 'Snapshot Voting',
              href: 'https://snapshot.org/#/veyfi.eth',
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
          path: 'vaults',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: 'vaults',
          sidebarPath: require.resolve('./sidebars/sidebars.js'),
          editUrl:
            'https://github.com/yearn/yearn-devdocs/edit/master/website/',
          includeCurrentVersion: false,
          breadcrumbs: false,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
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
        showLastUpdateTime: true,
        sidebarCollapsed: false,
        breadcrumbs: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getting-started',
        path: 'docs/getting-started',
        routeBasePath: 'getting-started',
        sidebarPath: require.resolve('./sidebars/sidebarsGettingStarted.js'),
        showLastUpdateTime: true,
        sidebarCollapsed: false,
        breadcrumbs: false,
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
        showLastUpdateTime: true,
        sidebarCollapsed: false,
        breadcrumbs: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'docs/contributing',
        routeBasePath: 'contributing',
        sidebarPath: require.resolve('./sidebars/sidebarsContributing.js'),
        showLastUpdateTime: true,
        sidebarCollapsed: false,
        breadcrumbs: false,
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
        showLastUpdateTime: true,
        sidebarCollapsed: false,
        breadcrumbs: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'security',
        path: 'docs/security',
        routeBasePath: 'security',
        sidebarPath: require.resolve('./sidebars/sidebarsSecurity.js'),
        showLastUpdateTime: true,
        breadcrumbs: false,
      },
    ],
  ],
}
