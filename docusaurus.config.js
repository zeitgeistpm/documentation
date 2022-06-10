const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** @type {import('@docusaurus/types').Config} */
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

  // support multi-languages
  i18n: {
    defaultLocale: "en",
    locales: ["en", "zh-CN", "ru"],
    localeConfigs: {
      en: {
        htmlLang: "en-GB",
      },
    },
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "Zeitgeist Documentation",
        logo: {
          src: "img/Zeitgeist-trans.png",
          //href: "/docs/",
        },
        items: [
          {to: 'docs', label: 'Getting Started', position: 'right'},
          {to: 'docs/category/learn', label: 'Learn', position: 'right'},
          {to: 'docs/category/build', label: 'Build', position: 'right'},
          {to: 'docs/faq', label: 'FAQ', position: 'right'},
          {
            type: 'search',
            position: 'right',
          },
          {
            type: "localeDropdown",
            position: "right",
            dropdownItemsAfter: [
              {
                href: "https://crowdin.com/project/zeitgeist-documentation",
                label: "Help Us Translate",
              },
            ],
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
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ["bash", "powershell"],
      },
    }),

  presets: [
    [
      "@docusaurus/preset-classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
          sidebarPath: require.resolve("./sidebars.js"),
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

  plugins: [
    "plugin-image-zoom",
    // () => ({
    //   configureWebpack() {
    //     return {
    //       devServer: { open: "/docs/" },
    //     };
    //   },
    // }),
  ],

  themes: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        hashed: true,
        language: ["en", "zh"],
      },
    ],
  ],
};

module.exports = config;
