import math from 'remark-math'
import katex from 'rehype-katex'
import { themes as prismThemes } from 'prism-react-renderer'

const branchName = process.env.BRANCH_NAME || 'unknown'
const isDev = process.env.IS_DEV === 'true'

export default {
  title: 'Yearn Docs',
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
  customFields: {
    branchName,
    isDev,
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
      // title: 'Yearn Finance',
      logo: {
        alt: 'YFI Logo',
        src: 'img/logo.svg',
      },
      items: [
        // {
        //   to: 'testing/folder1/doc1',
        //   label: 'testing',
        // },
        {
          type: 'doc',
          position: 'left',
          docId: 'intro',
          label: 'User Docs',
          // activeBasePath: '/getting-started',
          // to: 'getting-started/intro',
        },
        {
          to: 'developers/building-on-yearn',
          label: 'Dev Docs',
          activeBasePath: '/developers',
          position: 'left',
        },
        // {
        //   to: 'smart-contracts',
        //   label: 'Smart Contracts',
        // },
        {
          to: 'contributing/introduction',
          label: 'DAO Docs',
          activeBasePath: '/contributing',
          position: 'left',
        },
        // {
        //   to: 'resources/faq',
        //   label: 'Resources',
        //   activeBasePath: '/resources',
        // },
        // {
        //   to: 'security/',
        //   label: 'Security',
        //   activeBasePath: '/security',
        // },
        // {
        //   type: 'docsVersionDropdown',
        //   dropdownItemsBefore: [],
        //   position: 'right',
        //   // Do not add the link active class when browsing docs.
        //   dropdownActiveClassDisabled: true,
        //   docsPluginId: 'default',
        // },
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

        // {
        //   type: 'dropdown',
        //   label: 'GitHub',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'V3 Vaults',
        //       href: 'https://github.com/yearn/yearn-vaults-v3',
        //     },
        //     {
        //       label: 'V3 Tokenized Strategy',
        //       href: 'https://github.com/yearn/tokenized-strategy',
        //     },
        //     {
        //       label: 'V3 Strategy Mix: Foundry',
        //       href: 'https://github.com/yearn/tokenized-strategy-foundry-mix',
        //     },
        //     {
        //       label: 'V3 Strategy Mix: Ape',
        //       href: 'https://github.com/yearn/tokenized-strategy-ape-mix',
        //     },
        //     {
        //       label: 'V2 Vaults',
        //       href: 'https://github.com/yearn/yearn-vaults',
        //     },
        //     {
        //       label: 'V2 Strategy Mix',
        //       href: 'https://github.com/yearn/brownie-strategy-mix',
        //     },
        //     {
        //       label: 'yearn-security',
        //       href: 'https://github.com/yearn/yearn-security',
        //     },
        //     {
        //       label: 'yearn-devdocs',
        //       href: 'https://github.com/yearn/yearn-devdocs',
        //     },
        //   ],
        // },
        // {
        //   type: 'dropdown',
        //   label: 'Ecosystem',
        //   position: 'right',
        //   items: [
        //     {
        //       label: 'V3 Vaults',
        //       href: 'https://yearn.fi/v3',
        //     },
        //     {
        //       label: 'V2 Vaults',
        //       href: 'https://yearn.fi/vaults',
        //     },
        //     {
        //       label: 'Juiced Vaults',
        //       href: 'https://juiced.yearn.fi/',
        //     },
        //     {
        //       label: 'veYFI',
        //       href: 'https://veyfi.yearn.fi/',
        //     },
        //     {
        //       label: 'yETH',
        //       href: 'https://yeth.yearn.fi/',
        //     },
        //     {
        //       label: 'yCRV',
        //       href: 'https://ycrv.yearn.fi/',
        //     },
        //     {
        //       label: 'yPrisma',
        //       href: 'https://yprisma.yearn.fi/',
        //     },
        //   ],
        // },
      ],
    },
    // footer: {
    //   style: 'light',
    //   links: [
    //     {
    //       title: 'GitHub',
    //       items: [
    //         {
    //           label: 'V3 Vaults',
    //           href: 'https://github.com/yearn/yearn-vaults-v3',
    //         },
    //         {
    //           label: 'V3 Tokenized Strategy',
    //           href: 'https://github.com/yearn/tokenized-strategy',
    //         },
    //         {
    //           label: 'V3 Strategy Mix: Foundry',
    //           href: 'https://github.com/yearn/tokenized-strategy-foundry-mix',
    //         },
    //         {
    //           label: 'V3 Strategy Mix: Ape',
    //           href: 'https://github.com/yearn/tokenized-strategy-ape-mix',
    //         },
    //         {
    //           label: 'V2 Vaults',
    //           href: 'https://github.com/yearn/yearn-vaults',
    //         },
    //         {
    //           label: 'V2 Strategy Mix',
    //           href: 'https://github.com/yearn/brownie-strategy-mix',
    //         },
    //         {
    //           label: 'yearn-security',
    //           href: 'https://github.com/yearn/yearn-security',
    //         },
    //         {
    //           label: 'yearn-devdocs',
    //           href: 'https://github.com/yearn/yearn-devdocs',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Ecosystem',
    //       items: [
    //         {
    //           label: 'V3 Vaults',
    //           href: 'https://yearn.fi/v3',
    //         },
    //         {
    //           label: 'V2 Vaults',
    //           href: 'https://yearn.fi/vaults',
    //         },
    //         {
    //           label: 'Juiced Vaults',
    //           href: 'https://juiced.yearn.fi/',
    //         },
    //         {
    //           label: 'veYFI',
    //           href: 'https://veyfi.yearn.fi/',
    //         },
    //         {
    //           label: 'yETH',
    //           href: 'https://yeth.yearn.fi/',
    //         },
    //         {
    //           label: 'yCRV',
    //           href: 'https://ycrv.yearn.fi/',
    //         },
    //         {
    //           label: 'yPrisma',
    //           href: 'https://yprisma.yearn.fi/',
    //         },
    //         {
    //           label: 'yBribe',
    //           href: 'https://ybribe.yearn.fi/',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Community',
    //       items: [
    //         {
    //           label: 'Discord',
    //           href: 'https://discord.gg/b8ENPNqG5c',
    //         },
    //         {
    //           label: 'Twitter',
    //           href: 'https://x.com/yearnfi',
    //         },
    //         {
    //           label: 'Telegram',
    //           href: 'https://t.me/yearnfinance/',
    //         },
    //         {
    //           label: 'Medium',
    //           href: 'https://medium.com/iearn',
    //         },
    //         {
    //           label: 'Forum',
    //           href: 'https://gov.yearn.fi',
    //         },
    //         {
    //           label: 'Snapshot Voting',
    //           href: 'https://snapshot.org/#/veyfi.eth',
    //         },
    //       ],
    //     },
    //   ],
    // },
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
          sidebarPath: './sidebars/sidebarsGettingStarted.js',
          editUrl:
            'https://github.com/yearn/yearn-devdocs/edit/master/website/',
          breadcrumbs: false,
          admonitions: {
            keywords: ['yearn-info'],
            extendDefaults: true,
          },
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
        sidebarPath: './sidebars/sidebarsDevelopers.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: false,
      },
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'getting-started',
    //     path: 'docs/getting-started',
    //     routeBasePath: 'getting-started',
    //     sidebarPath: './sidebars/sidebarsGettingStarted.js',
    //     showLastUpdateTime: true,
    //     sidebarCollapsed: false,
    //     breadcrumbs: false,
    //     remarkPlugins: [math],
    //     rehypePlugins: [katex],
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'partners',
        path: 'docs/partners',
        routeBasePath: 'partners',
        sidebarPath: './sidebars/sidebarsPartners.js',
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
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'resources',
    //     path: 'docs/resources',
    //     routeBasePath: 'resources',
    //     sidebarPath: './sidebars/sidebarsResources.js',
    //     showLastUpdateTime: true,
    //     sidebarCollapsed: true,
    //     breadcrumbs: false,
    //   },
    // ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'deprecated',
        path: 'docs/resources',
        routeBasePath: 'resources',
        sidebarPath: './sidebars/sidebarsDeprecated.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: false,
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'security',
        path: 'docs/security',
        routeBasePath: 'security',
        sidebarPath: './sidebars/sidebarsSecurity.js',
        showLastUpdateTime: true,
        sidebarCollapsed: true,
        breadcrumbs: false,
      },
    ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'smart-contracts',
    //     path: 'docs/smart-contracts',
    //     routeBasePath: 'smart-contracts',
    //     sidebarPath: './sidebars/sidebarsSmartContracts.js',
    //     showLastUpdateTime: true,
    //     sidebarCollapsed: true,
    //     breadcrumbs: false,
    //     remarkPlugins: [math],
    //     rehypePlugins: [katex],
    //   },
    // ],
    // [
    //   '@docusaurus/plugin-content-docs',
    //   {
    //     id: 'testing',
    //     path: 'docs/testing',
    //     routeBasePath: 'testing',
    //     sidebarPath: './sidebars/sidebars.js',
    //     showLastUpdateTime: true,
    //     sidebarCollapsed: true,
    //     breadcrumbs: false,
    //     remarkPlugins: [math],
    //     rehypePlugins: [katex],
    //   },
    // ],
  ],
}
