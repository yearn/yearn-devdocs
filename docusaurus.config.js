/** @type {import('@docusaurus/types').DocusaurusConfig} */
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
    navbar: {
      title: 'Yearn.finance',
      logo: {
        alt: 'YFI Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: 'smart-contracts/vault',
          label: "Smart Contracts"
        },
      ],
    },
    footer: {
      style: 'dark',
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
              href: 'https://discord.yearn.finance/',
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
          sidebarPath: require.resolve('./sidebars.js'),
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
};
