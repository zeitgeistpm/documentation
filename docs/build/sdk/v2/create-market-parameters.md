# Market Parameters

Here we document the possible parameters you can pass to market creation and how
they affect the market.

## Base Parameters

These parameters are needed in all cases, both when creating a market with a
pool and without.

```ts
/**
 * Base parameters for creating a market.
 */
export type CreateMarketBaseParams = {
  /**
   * The base asset of the market. Can be ZTG or another
   */
  baseAsset: ZeitgeistPrimitivesAsset | AssetId;
  /**
   * The signer of the transaction. Can be a unlocked keyring pair or extension.
   */
  signer: KeyringPairOrExtSigner;
  /**
   * Metadata to store in external storage alongside the market.
   */
  metadata: MarketMetadata;
  /**
   * Type of market, categorical or scalar
   */
  marketType:
    | {
        /**
         * The number of outcome category in the assets.
         */
        Categorical: number;
      }
    | {
        /**
         * The scalar range of the market, the first value being the short bottom value and the second the ceiling long value.
         */
        Scalar: [number, number];
      };
  /**
   * The resolver of the market outcome
   */
  oracle: string;
  /**
   * The period of the market in tuple of timestamps or block numbers.
   */
  period:
    | {
        /**
         * The start and end block of the market.
         */
        Block: [number, number];
      }
    | {
        /**
         * The start and end timestamp of the market.
         */
        Timestamp: [number, number];
      };

  deadlines: {
    /**
     * The number of blocks to wait after trading ends and before the oracle can resolve the market.
     */
    gracePeriod: number;
    /**
     * The number of blocks to wait for the oracle to resolve the market.
     * If this period is exceeded, the market will go into open resolving where anyone can resolve the market.
     */
    oracleDuration: number;
    /**
     * The number of blocks to await possible disputes after market is resolved.
     */
    disputeDuration: number;
  };
  /**
   * Market dispute mechanism.
   * @note Authorized is the only one available atm.
   */
  disputeMechanism:
    | ZeitgeistPrimitivesMarketMarketDisputeMechanism
    | "Authorized"
    | "Court"
    | "SimpleDisputes";
  /**
   * If true, the extrinsic will wait for the market to be finalize in a block before resolving.
   * Otherwise it will resolve immediately after inclusion.
   */
  waitForFinalization?: boolean;
};
```

:::info

### Scalar Markets

Scalar markets can be any range of numbers also timestamps. And if you want them
to display as dates in the Zeitgeist UI you can specify that in the metadata.

```ts
const params: CreateMarketWithPoolParams<typeof sdk> = {
  marketType: { Scalar: [
    Date.now(),
    Date.now() + oneWeekInMs
  ] },
  metadata: {
    ...
    scalarType: 'date',
  }
}
```

:::

## Standalone Market Parameters

These parameters are added to the base when you want to create a market without
a pool.

```ts
/**
 * Parameters for creating a market without a pool
 */
export type CreateStandaloneMarketParams = CreateMarketBaseParams & {
  /**
   * Market scoring rule.
   *
   * @default Cpmm
   * @note Cpmm is the only one available atm. Rikkido will become available in a future update.
   */
  scoringRule?: "Cpmm" | "RikiddoSigmoidFeeMarketEma";
  /**
   * Market creation type, permissionless or advised.
   */
  creationType: "Permissionless" | "Advised";
};
```

:::info

Note that when creating a standalone market you have more control over certain
aspects like `scoringRule` and `creationtype`. But also note that some of them
might not yet be implemented yet.

:::

## Market with Pool Parameters

You can deploy a market and pool in one transaction by adding the following
parameters to the base parameters specified above.

```ts
/**
 * Parameters for creating a market with a pool.
 */
export type CreateMarketWithPoolParams = CreateMarketBaseParams & {
  pool: {
    /**
     * The fee to swap in and out of the pool.
     * @note '1' would be 1%
     */
    swapFee: string | u128;
    /**
     * The ammount to deploy in ZTG
     */
    amount: string | u128;
    /**
     * Weighting of the assets.
     */
    weights: Array<string | u128>;
  };
};
```

:::info

Note that the length of the `weights` array have to match the number of
`categorical assets` or the exact number 2 when its a scalar market.

[Read more about weights and helpers here.](/docs/build/sdk/v2/pool-creation-helpers)

:::

## Metadata

The metadata passed to market creation is added to external storage(default
IPFS) before the market is submitted.

```ts
type MarketMetadata = {
  /**
   * Type narrowing tag.
   * @required
   */
  __meta: "markets";
  /**
   * The market slug. Used to identify on smaller components in the Zeitgeist app UI.
   * @required
   */
  slug: string;
  /**
   * The market question.
   * @required
   */
  question: string;
  /**
   * The market description.
   * @required
   */
  description: string;
  /**
   * The market tags.
   */
  tags?: Array<ZeitgeistTag | string>;
  /**
   * The market image IPFS CID.
   */
  img?: string | undefined;
  /**
   * If the market is a scalar market, then set the scalar type.
   * Determines how the range is displayed in the zeitgeist app UI.
   */
  scalarType?: "number" | "date" | undefined;
  /**
   * The market categories.
   * The number of cattegories should match the number of outcomes and have the same soring order as the outcomes..
   */
  categories?: {
    /**
     * The category name.
     */
    name: string;
    /**
     * The category image IPFS CID.
     */
    img?: string | undefined;
    /**
     * The category token ticker. Like 'ETH' or 'BTC'.
     */
    ticker?: string | undefined;
    /**
     * The category color.
     */
    color?: string | undefined;
  }[];
};
```

### Officially Supported Tags

The following tags are supported in the zeitgeist application. And you want to
use one of them if you want the market to show up under that tag on the
zeitgeist app.

```ts
type ZeitgeistTag =
  | "Politics",
  | "Governance",
  | "North America",
  | "China",
  | "India",
  | "Crypto",
  | "Dotsama",
  | "Zeitgeist",
  | "Technology",
  | "Science",
  | "Pandemics",
  | "Space",
  | "News",
  | "Sports",
  | "E-sports",
  | "Football",
  | "MMA",
  | "Cricket",

```
