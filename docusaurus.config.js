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
        // title: `Zeitgeist . Documentation`,
        logo: {
          src: "img/Moon_White.png",
          height: '35'
          //href: "/docs/",
        },
        items: [
          {
            type: 'html',
            position: 'left',
            value: '<a href="https://docs.zeitgeist.pm" class="navbar-title"><span class="navbar-title--zeitgeist">Zeitgeist</span><span class="navbar-title--blue">.</span><span class="navbar-title--documentation">Documentation</span></a>',
          },
          {to: 'docs/getting-started', label: 'Getting Started', position: 'right'},
          {to: 'docs/category/learn', label: 'Learn', position: 'right'},
          {to: 'docs/category/build', label: 'Build', position: 'right'},
          {to: 'docs/faq', label: 'FAQ', position: 'right'},
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
                      <img src="/img/logo-footer.svg" alt="Zeitgeist Logo" height="40" />
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
                    <a href="https://drive.google.com/drive/folders/1AfYT8k-LRK_84Ca76jgQktVQsSwkBYwW" target="_blank" rel="noreferrer noopener">
                      Assets
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://blog.zeitgeist.pm/" target="_blank" rel="noreferrer noopener">
                      Blog
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://angel.co/company/zeitgeist-pm" target="_blank" rel="noreferrer noopener">
                      Career
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://mega.nz/folder/XzxjDaTJ#APLp7GIZ-JMUrgZJu6itvQ" target="_blank" rel="noreferrer noopener">
                      Wallpapers
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
            title: "Community",
            items: [
              {
                html: `
                    <a href="https://discord.com/invite/xv8HuA4s8v" target="_blank" rel="noreferrer noopener">
                      Discord
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://t.me/zeitgeist_official" target="_blank" rel="noreferrer noopener">
                      Telegram
                    </a>
                  `,
              },
              {
                html: `
                    <a href="https://twitter.com/ZeitgeistPM" target="_blank" rel="noreferrer noopener">
                      Twitter
                    </a>
                  `,
              },
            ],
          },
          {
            items: [
              {
                html: `© ${new Date().getFullYear()} Zeitgeist PM`,
              },
            ],
          },
          // {
          //   title: "Social",
          //   items: [
          //     {
          //       html: `
          //           <div class="social-links">
          //             <a class="social-link" href="https://discord.com/invite/xv8HuA4s8v" target="_blank" rel="noreferrer noopener">
          //               <img width="25" src="img/discord.svg" alt="Discord Logo">
          //             </a>
          //             <a class="social-link" href="https://github.com/ZeitgeistPM" target="_blank" rel="noreferrer noopener">
          //               <img width="25" src="img/github-light.png" alt="Github Logo">
          //             </a>
          //             <a class="social-link" href="https://twitter.com/zeitgeistpm" target="_blank" rel="noreferrer noopener">
          //               <img width="25" src="img/twitter.svg" alt="Twitter Logo">
          //             </a>
          //             <a class="social-link" href="https://facebook.com/zeitgeistpm" target="_blank" rel="noreferrer noopener">
          //               <img width="12" src="img/facebook.svg" alt="Facebook Logo">
          //             </a>
          //           </div>
          //         `,
          //     },
          //   ],
          // },
        ],
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
};

module.exports = config;
