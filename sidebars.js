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
        "learn/market-rules",
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
        "build/how-to-unlock-vested-token",
        "build/cli-example",
        {
          type: "category",
          label: "SDK",
          link: {
            type: "generated-index",
            title: "Zeitgeist SDK",
            description:
              "Use the Zeitgeist SDK to build using Zeitgeist Prediction Market Primitives.",
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
                {
                  type: "category",
                  label: "Market Creation",
                  link: {
                    type: "doc",
                    id: "build/sdk/v2/market-creation",
                  },
                  items: [
                    "build/sdk/v2/create-market-parameters",
                    "build/sdk/v2/pool-creation-helpers",
                    "build/sdk/v2/market-creation-two-step",
                  ],
                },
                {
                  type: "category",
                  label: "Fetching Markets",
                  link: {
                    type: "doc",
                    id: "build/sdk/v2/fetch-markets",
                  },
                  items: ["build/sdk/v2/fetch-market"],
                },
                {
                  type: "category",
                  label: "Making A Prediction",
                  link: {
                    type: "doc",
                    id: "build/sdk/v2/making-a-prediction",
                  },
                  items: ["build/sdk/v2/selling-assets"],
                },
                {
                  type: "category",
                  label: "Calculating Predictions",
                  link: {
                    type: "doc",
                    id: "build/sdk/v2/calculating-current-prediction",
                  },
                  items: ["build/sdk/v2/calculating-scalar-prediction"],
                },
                "build/sdk/v2/rpc-prices",
                {
                  type: "category",
                  label: "Providing Liquidity",
                  link: {
                    type: "doc",
                    id: "build/sdk/v2/join-pool",
                  },
                  items: ["build/sdk/v2/exit-pool"],
                },
                "build/sdk/v2/asset-ids",
                "build/sdk/v2/custom-metadata",
                "build/sdk/v2/indexer",
                {
                  type: "category",
                  label: "Reference",
                  link: {
                    type: "generated-index",
                  },
                  items: [
                    "build/sdk/v2/reference/market",
                    {
                      type: "link",
                      label: "Full API Docs",
                      href: "https://zeitgeist.pm/sdk-next/index.html", // The external URL
                    },
                  ],
                },
                {
                  type: "link",
                  label: "CHANGELOG",
                  href: "https://github.com/zeitgeistpm/sdk-next/blob/main/packages/sdk/CHANGELOG.md",
                },
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
