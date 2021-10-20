module.exports = {
  title: 'Zeitgeist Documentation',
  tagline: 'Learn how to integrate with the Zeitgeist network.',
  url: 'https://docs.zeitgeist.pm',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'zeitgeistpm', 
  projectName: 'documentation', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Zeitgeist Documentation',
      logo: {
        alt: 'My Site Logo',
        src: 'img/Zeitgeist-trans.png',
      },
      items: [
        {
          href: 'https://github.com/zeitgeistpm',
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
              label: 'Getting Started',
              to: '/',
            },
            {
              label: 'Zeitgeist SDK',
              to: '/sdk/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Website',
              href: 'https://zeitgeist.pm',
            },
            {
              label: 'Discord',
              href: '#',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/zeitgeistpm',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'https://zeitgeist.pm/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/zeitgeistpm',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Zeitgeist PM`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
          // Please change this to your repo.
          editUrl:
            'https://github.com/zeitgeistpm/docs/edit/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
