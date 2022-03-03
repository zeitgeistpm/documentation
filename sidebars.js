
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docs: [
    'getting-started',
    // Basic
    {
      type: 'category',
      label: 'Basic',
      link: {
        type: 'generated-index',
      },
      collapsed: false,
      items: [
        'basic/battery-station',
        'basic/roadmap',
        'basic/zeitgeist-beta',
      ],
    },
    // Learn
    {
      type: 'category',
      label: 'Learn',
      link: {
        type: 'generated-index',
      },
      items: [
        'learn/prediction-markets',
        'learn/liquidity',
        'learn/using-zeitgeist-markets',
        'learn/governance',
        'learn/court',
        'learn/futarchy',
        'learn/comparisons',
      ],
    },
    // Build
    {
      type: 'category',
      label: 'Build',
      link: {
        type: 'generated-index',
      },
      items: [
        'build/market-metadata',
        'build/troubleshooting',
        'build/how-to-monitor-node',
        'build/cli-example',
        'build/sdk',
      ],
    },
    'faq',
  ],
  sdk: [
    {
      type: 'category',
      label: 'SDK',
      link: {
        type: 'generated-index',
      },
      items: [
        'sdk/introduction',
        'sdk/common',
        'sdk/index',
        'sdk/market',
        'sdk/swap',
      ],
    },
  ],
  guide: [
    {
      type: 'category',
      label: 'App Guide',
      link: {
        type: 'generated-index',
      },
      items: [
        'guide/app',
        'guide/market',
        'guide/buy',
        'guide/redeem',
        'guide/create',
        'guide/disputed',
        'guide/liquidity',
      ],
    },
  ],
};

module.exports = sidebars;
