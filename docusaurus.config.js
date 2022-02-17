const math = require("remark-math");
const katex = require("rehype-katex");

const config = {
  title: "Zeitgeist Documentation",
  tagline: "Learn how to integrate with the Zeitgeist network.",
  url: "https://docs.zeitgeist.pm",
  baseUrl: "/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",
  organizationName: "zeitgeistpm",
  projectName: "documentation", // Usually your repo name.

  // plugins: [
  //   [
  //     'content-docs',
  //     /** @type {import('@docusaurus/plugin-content-docs').Options} */
  //   ],
  // ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      algolia: {
        // The application ID provided by Algolia
        appId: "YOUR_APP_ID",

        // Public API key: it is safe to commit it
        apiKey: "YOUR_SEARCH_API_KEY",

        indexName: "YOUR_INDEX_NAME",

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        externalUrlRegex: "external\\.com|domain\\.com",

        // Optional: Algolia search parameters
        searchParameters: {},

        //... other Algolia params
      },
      navbar: {
        hideOnScroll: true,
        title: "Zeitgeist Documentation",
        logo: {
          src: "img/Zeitgeist-trans.png",
        },
        items: [
          {
            to: "/", // getting-started',
            label: "Docs",
            position: "left",
          },
          {
            type: "docSidebar",
            sidebarId: "sdk",
            label: "SDK",
            position: "left",
          },
          {
            type: "docSidebar",
            sidebarId: "guide",
            label: "App Guide",
            position: "left",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Community",
            items: [
              {
                label: "Website",
                href: "https://zeitgeist.pm",
              },
              {
                label: "Discord",
                href: "https://discord.com/invite/xv8HuA4s8v",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/zeitgeistpm",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "https://blog.zeitgeist.pm",
              },
              {
                label: "GitHub",
                href: "https://github.com/zeitgeistpm",
              },
              {
                label: "LinkTree",
                href: "https://linktr.ee/zeitgeistpm",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Zeitgeist PM`,
      },
      prism: {
        additionalLanguages: ["bash", "powershell"],
      },
    }),
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "/",
          // Please change this to your repo.
          editUrl: "https://github.com/zeitgeistpm/docs/edit/main/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      },
    ],
  ],
  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
  ],
};

module.exports = config;
