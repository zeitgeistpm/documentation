const math = require('remark-math');
const katex = require('rehype-katex');

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
          to: '/',  // getting-started',
          label: 'Basics',
          position: 'right',
        },
        {
          to: 'prediction-markets',
          label: 'Learn',
          position: 'right',
        },
        {
          to: 'SDK guide',
          label: 'Build',
          position: 'right',
        },
        {
          to: 'index',
          label: 'Guide',
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
              href: 'https://discord.com/invite/xv8HuA4s8v',
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
            {
              label: 'LinkTree',
              href: 'https://linktr.ee/zeitgeistpm',
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
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  stylesheets: [
    {
        href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
        integrity: "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
        crossorigin: "anonymous",
    },
  ],
};
