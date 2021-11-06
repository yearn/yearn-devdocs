/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: 'Yearn.finance',
  tagline: 'DeFi made simple',
  url: 'https://yearn.github.io',
  baseUrl: '/yearn-devdocs/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'yearn', // Usually your GitHub org/user name.
  projectName: 'yearn-devdocs', // Usually your repo name.
  themeConfig: {
    algolia: {
      apiKey: 'dddf45f99d4d9c8b153e51038c8ebfca1',
      indexName: 'yearn_docs',
      appId: 'MUGPB5SQLX',
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
          type: 'doc',
          docId: 'getting-started',
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
              label: 'Bug Bounty',
              href: 'https://github.com/yearn/yearn-security/blob/master/SECURITY.md#bug-bounty-program',
            },
            {
              label: '#dev-chat',
              href: 'https://discord.gg/w89vVxeV9h',
            },
            {
              label: 'Whitepaper',
              href: '/yearn-devdocs/getting-started/products/yvaults/overview',
            },
          ],
        },
        {
          title: 'Github',
          items: [
            {
              label: 'yearn-core',
              href: 'https://github.com/yearn/yearn-vaults',
            },
            {
              label: 'yearn-sdk',
              href: 'https://github.com/yearn/yearn-sdk',
            },
            {
              label: 'brownie-strategy-mix',
              href: 'https://github.com/yearn/brownie-strategy-mix',
            },
            {
              label: 'Deployment Addresses',
              href: 'https://github.com/yearn/yearn-finance/tree/master/app/containers/Vaults',
            },
          ],
        },
        {
          title: 'Ecosystem',
          items: [
            {
              label: 'Home',
              href: 'https://galaxy.eco/yearn/',
            },
            {
              label: 'App',
              href: 'https://yearn.finance/',
            },
            {
              label: 'Analytics',
              href: 'https://duneanalytics.com/projects/yearn',
            },
            {
              label: 'Token Lists',
              href: 'https://tokenlists.org/token-list?url=https://yearn.science/static/tokenlist.json',
            },
            {
              label: 'Brand Assets',
              href: 'https://github.com/yearn/yearn-assets',
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
              label: 'Discourse',
              href: 'https://gov.yearn.finance/',
            },
            {
              label: 'Governance Forum',
              href: 'https://gov.yearn.finance',
            },
            {
              label: 'Partnership Program',
              href: '/yearn-devdocs/partners/introduction',
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
          path: "docs/developers/v2",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: "v2",
          sidebarPath: require.resolve('./sidebars/sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/yearn/yearn-devdocs/edit/master/website/',
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
        id: 'v_one',
        path: 'docs/developers/v1',
        editCurrentVersion: true,
        routeBasePath: 'v1',
        sidebarPath: require.resolve('./sidebars/sidebarsV1.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'getting-started',
        path: 'docs/getting-started',
        editCurrentVersion: true,
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
        editCurrentVersion: true,
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
        editCurrentVersion: true,
        routeBasePath: 'contributing',
        sidebarPath: require.resolve('./sidebars/sidebarsContributing.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'resources',
        path: 'docs/resources',
        editCurrentVersion: true,
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
        editCurrentVersion: true,
        routeBasePath: 'security',
        sidebarPath: require.resolve('./sidebars/sidebarsSecurity.js'),
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
  ]
};