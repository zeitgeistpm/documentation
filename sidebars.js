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
          AppGuide: [
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
          SDK: [
            "build/sdk/introduction",
            "build/sdk/common",
            "build/sdk/index",
            "build/sdk/market",
            "build/sdk/swap",
          ],
        },
      ],
    },
    "faq",
  ],
};

module.exports = sidebars;
