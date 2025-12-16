// @ts-check
/** @type {import('@docusaurus/types').Config} */
import math from 'remark-math'
import katex from 'rehype-katex'
import { themes as prismThemes } from 'prism-react-renderer'
import 'dotenv/config'

const branchName = process.env.BRANCH_NAME || 'unknown'
const isDev = process.env.IS_DEV === 'true'
const alchemyKey = process.env.ALCHEMY_API_KEY || 'unknown'
const yDaemon = process.env.YDAEMON_ENDPOINT || 'unknown'
const yPriceMagic = process.env.YPRICEMAGIC_ENDPOINT || 'unknown'

export default {
  title: 'Yearn Docs',
  tagline: 'DeFi made simple',
  url: 'https://docs.yearn.fi',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'yearn', // Usually your GitHub org/user name.
  projectName: 'yearn-devdocs', // Usually your repo name.
  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  customFields: {
    branchName,
    isDev,
    alchemyKey,
    yDaemon,
    yPriceMagic,
  },
  future: {
    experimental_faster: true,
    v4: true,
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
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
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
          to: 'contributing/introduction',
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
              href: 'https://discord.gg/yearn',
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
          sidebarCollapsed: true,
          breadcrumbs: false,
          admonitions: {
            keywords: ['yearn', 'yearnData'],
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
      href: 'https://cdn.jsdelivr.net/npm/katex@0.16.27/dist/katex.min.css',
      integrity:
        'sha384-Pu5+C18nP5dwykLJOhd2U4Xen7rjScHN/qusop27hdd2drI+lL5KvX7YntvT8yew',
      crossorigin: 'anonymous',
    },
  ],
  plugins: [
    [
      require.resolve('@cmfcmf/docusaurus-search-local'),
      {
        indexDocs: true,
        indexDocSidebarParentCategories: 4,
        indexBlog: false,
        indexPages: false,
        language: 'en',
        style: undefined,
        maxSearchResults: 10,
        lunr: {
          tokenizerSeparator: /[\s\-]+/,
          b: 0.75,
          k1: 1.2,
          titleBoost: 5,
          contentBoost: 1,
          tagsBoost: 3,
          parentCategoriesBoost: 2,
        },
      },
    ],
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
        remarkPlugins: [math],
        rehypePlugins: [katex],
        admonitions: {
          keywords: ['yearn', 'yearnData'],
          extendDefaults: true,
        },
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
        admonitions: {
          keywords: ['yearn', 'yearnData'],
          extendDefaults: true,
        },
      },
    ],
  ],
}
