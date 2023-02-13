/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    "getting-started",
    // Basic
    {
      type: "category",
      label: "Basic",
      link: {
        type: "generated-index",
      },
      collapsed: false,
      items: ["basic/battery-station", "basic/roadmap", "basic/zeitgeist-beta"],
    },
    // Learn
    {
      type: "category",
      label: "Learn",
      link: {
        type: "generated-index",
      },
      items: [
        "learn/prediction-markets",
        "learn/liquidity",
        "learn/using-zeitgeist-markets",
        "learn/governance",
        "learn/court",
        "learn/futarchy",
        "learn/comparisons",
        {
          type: "category",
          label: "AppGuide",
          link: {
            type: "generated-index",
          },
          items: [
            "learn/guide/app",
            "learn/guide/market",
            "learn/guide/buy",
            "learn/guide/redeem",
            "learn/guide/create",
            "learn/guide/disputed",
            "learn/guide/liquidity",
          ],
        },
      ],
    },
    // Build
    {
      type: "category",
      label: "Build",
      link: {
        type: "generated-index",
      },
      items: [
        "build/market-metadata",
        "build/troubleshooting",
        "build/how-to-monitor-node",
        "build/cli-example",
        {
          type: "category",
          label: "SDK",
          link: {
            type: "doc",
            id: "build/sdk/v1/introduction",
          },
          items: [
            {
              type: "category",
              label: "V2",
              link: {
                type: "doc",
                id: "build/sdk/v2/introduction",
              },
              items: [
                "build/sdk/v2/getting-started",
                "build/sdk/v2/market-creation",
              ],
            },
            {
              type: "category",
              label: "V1",
              link: {
                type: "doc",
                id: "build/sdk/v1/introduction",
              },
              items: [
                "build/sdk/v1/common",
                "build/sdk/v1/indexs",
                "build/sdk/v1/market",
                "build/sdk/v1/swap",
              ],
            },
          ],
        },
        {
          type: "category",
          label: "Collator",
          link: {
            type: "generated-index",
          },
          items: [
            "build/collator/how-to-run-as-a-collator",
            "build/collator/collator-related-operation-guide",
            "build/collator/proxy-delegation",
            "build/collator/how-to-stake-in-zeitgeist",
            "build/collator/faq",
          ],
        },
      ],
    },
    "faq",
  ],
};

module.exports = sidebars;
