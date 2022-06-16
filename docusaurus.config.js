const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

const math = require("remark-math");
const katex = require("rehype-katex");

/** =@type {import('@docusaurus/types').Config} */
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
          src: "img/Moon_White.png",
          height: '50'
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
            items: [
              {
                html: `
                    <a class="footer-logo" href="/" target="_blank" rel="noreferrer noopener" aria-label="Zeitgeist Logo">
                      <img src="img/Moon_White.png" alt="Zeitgeist Logo" height="50" />
                      <h3>Zeitgeist</h3>
                    </a>
                  `,
              },
            ],
          },
          {
            title: "General",
            items: [
              {
                html: `
                    <a href="https://blog.zeitgeist.pm" target="_blank" rel="noreferrer noopener">
                      Website
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://linktr.ee/zeitgeistpm" target="_blank" rel="noreferrer noopener">
                      LinkTree
                    </a>
                  `,
              },
            ],
          },
          {
            title: "Technology",
            items: [
              {
                html: `
                    <a href="https://github.com/ZeitgeistPM" target="_blank" rel="noreferrer noopener">
                      Github
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://zeitgeist.pm/privacy.pdf" target="_blank" rel="noreferrer noopener">
                      Privacy
                    </a>
                  `,
              },
            ],
          },
          {
            title: "Social",
            items: [
              {
                html: `
                    <div class="social-links">
                      <a class="social-link" href="https://discord.com/invite/xv8HuA4s8v" target="_blank" rel="noreferrer noopener">
                        <img width="25" src="img/discord.svg"/ alt="Discord Logo">
                      </a>
                      <a class="social-link" href="https://github.com/ZeitgeistPM" target="_blank" rel="noreferrer noopener">
                        <img width="25" src="img/github-light.png"/ alt="Github Logo">
                      </a>
                      <a class="social-link" href="https://twitter.com/zeitgeistpm" target="_blank" rel="noreferrer noopener">
                        <img width="25" src="img/twitter.svg"/ alt="Twitter Logo">
                      </a>
                    </div>
                  `,
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
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: false,
        respectPrefersColorScheme: false,
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
