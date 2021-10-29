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
        src: 'img/Zeitgeist-trans.png',
      },
      items: [
        {
          to: 'getting-started',
          label: 'Getting Started',
          position: 'right',
        },
        {
          to: 'battery-station',
          label: 'Documentation',
          position: 'right',
        },
        {
          to: 'guides',
          label: 'Technology',
          position: 'right',
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
              to: 'https://blog.zeitgeist.pm',
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
    prism: {
      additionalLanguages: ['bash', 'powershell'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
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
