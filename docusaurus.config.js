// @ts-check
/** @type {import('@docusaurus/types').Config} */
import math from 'remark-math'
import katex from 'rehype-katex'

export default {
  title: 'yearn.fi',
  tagline: 'DeFi made simple',
  url: 'https://docs.yearn.fi',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'yearn', // Usually your GitHub org/user name.
  projectName: 'yearn-devdocs', // Usually your repo name.
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    docs: {
      sidebar: {
        autoCollapseCategories: true,
      },
    },
    prism: {
      additionalLanguages: ['solidity'],
    },
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
        content: 'https://github.com/yearn/yearn-devdocs',
      },
    ],
    navbar: {
      hideOnScroll: false,
      logo: {
        alt: 'YFI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'getting-started/intro',
          label: 'User Docs',
          activeBasePath: '/getting-started',
        },
        {
          to: 'developers/building-on-yearn',
          label: 'Dev Docs',
          activeBasePath: '/developers',
        },
        {
          to: 'contributing/contribute',
          label: 'DAO Docs',
          activeBasePath: '/contributing',
        },
        {
          label: 'Blog',
          position: 'right',
          href: 'https://blog.yearn.fi',
        },
        {
          type: 'dropdown',
          label: 'Community',
          position: 'right',
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
              label: 'Governance Forum',
              href: 'https://gov.yearn.fi',
            },
            {
              label: 'Snapshot Voting',
              href: 'https://snapshot.org/#/veyfi.eth',
            },
          ],
        },
        {
          href: 'https://github.com/yearn',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
        {
          href: 'https://yearn.fi',
          position: 'right',
          className: 'header-yearn-link',
          'aria-label': 'yearn.fi',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs/getting-started',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          routeBasePath: 'getting-started',
          sidebarPath: './sidebars/sidebarsUserDocs.js',
          editUrl:
            'https://github.com/yearn/yearn-devdocs/edit/master/website/',
          sidebarCollapsed: true,
          breadcrumbs: false,
        },
        theme: {
          customCss: './src/css/custom.css',
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
        sidebarPath: './sidebars/sidebarsDeveloperDocs.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'contributing',
        path: 'docs/contributing',
        routeBasePath: 'contributing',
        sidebarPath: './sidebars/sidebarsContributing.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
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
        sidebarPath: './sidebars/sidebarsResources.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: false,
      },
    ],
  ],
}
