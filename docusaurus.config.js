/** @type {import('@docusaurus/types').DocusaurusConfig} */
const math = require('remark-math');
const katex = require('rehype-katex');

module.exports = {
  title: 'Yearn.finance',
  tagline: 'DeFi made simple',
  url: 'https://your-docusaurus-test-site.com',
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
          label: "Developers"
        },
        {
          to: 'partners/introduction',
          label: "Partners"
        },
        {
          to: 'contributing/contribute',
          label: "Contributing"
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
          type: 'search',
          position: 'right'
        },
        {
          type: 'docsVersionDropdown',
          dropdownItemsBefore: [],
          position: 'right',
          // Do not add the link active class when browsing docs.
          dropdownActiveClassDisabled: true,
          docsPluginId: 'default',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discourse',
              href: 'https://gov.yearn.finance/',
            },
            {
              label: 'Discord',
              href: 'https://discord.gg/yearn/',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/iearnfinance',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/yearn/',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} yearn.finance. Built with Docusaurus.`,
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
    { href: 'https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css', 
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