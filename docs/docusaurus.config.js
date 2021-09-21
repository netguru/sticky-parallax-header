const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'React Native Sticky Parallax Header',
  tagline:
    'A simple React Native library, enabling to create a fully custom header for your iOS and Android apps.',
  url: 'https://netguru.github.io/',
  baseUrl: '/sticky-parallax-header/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/netguru_logo.png',
  organizationName: 'netguru', // Usually your GitHub org/user name.
  projectName: 'sticky-parallax-header', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'React Native Sticky Parallax Header',
      logo: {
        alt: 'React Native Sticky Parallax Header Logo',
        src: 'img/netguru_logo.png',
      },
      items: [
        {
          to: 'docs/introduction/getting-started',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'right',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Docs',
              to: 'docs/introduction/getting-started',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href: 'https://stackoverflow.com/questions/tagged/sticky-parallax-header',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/netguru',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/netguru/sticky-parallax-header',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Netguru, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/facebook/docusaurus/edit/master/website/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
