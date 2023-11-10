# Zeitgeist Subsquid Indexer

The sdk gives direct access to the subsquid indexer that indexes our on chain
data.

:::warning

**Some caveats when working with the indexer:**

- The indexed data might lag behind the actual chain data by 30sec up to
  2minutes.
- The `Markets`, `Pool` etc returned by the indexer directly doesnt have access
  to the methods like `market.swapExactAmountOut` or `pool.join`

:::

### Testnet Graphql Explorer

You can access the testnet Graphql explorer if you want to look at the indexed
data and get more info on the indexed data types here:

[https://processor.bsr.zeitgeist.pm/graphql](https://processor.bsr.zeitgeist.pm/graphql)

## Quickstart

Boot up the SDK in either `FullContext` or `IndexedContext` mode to be able to
access the indexer sdk.

```ts
const sdk: Sdk<FullContext> = await create(batterystation());
```

```ts
const sdk: Sdk<IndexerContext> = await create(batterystationIndexer());
```

Lets fetch some markets, order them by when they are created and apply some
filters.

```ts
import { MarketOrderByInput, MarketStatus } from "@zeitgeistpm/indexer";

const { markets } = await sdk.indexer.markets({
  offset: 0,
  limit: 10,
  order: MarketOrderByInput.CreationDesc,
  where: {
    status_eq: MarketStatus.Active,
    tags_containsAll: ["dev", "sports"],
    OR: [
      {
        creator_eq: "some address",
      },
      {
        creator_eq: "or this address",
      },
    ],
  },
});
```

:::info

You can see that the filtering parameters mirror the graphql options subsquid
provides and if you use typescript(recommended) you will get good editor
feedback and type help.

:::

## Reference

### `sdk#indexer.markets`

Get latest indexed market data for a set of markets.

**Returns:**

```ts
type MarketsQuery = {
  markets: Array<{
    id: string;
    marketId: number;
    description?: string | null;
    creator: string;
    creatorFee?: number | null;
    creation: string;
    oracle: string;
    question?: string | null;
    slug?: string | null;
    img?: string | null;
    tags?: Array<string | null> | null;
    status: MarketStatus;
    scoringRule: string;
    resolvedOutcome?: string | null;
    scalarType?: string | null;
    outcomeAssets: Array<string | null>;
    rejectReason?: string | null;
    disputeMechanism: string;
    marketType: {
      categorical?: string | null;
      scalar?: Array<string | null> | null;
    };
    period: {
      block?: Array<any | null> | null;
      timestamp?: Array<any | null> | null;
      end: any;
      start: any;
    };
    report?: {
      at?: number | null;
      by?: string | null;
      outcome: {
        categorical?: number | null;
        scalar?: any | null;
      };
    } | null;
    categories?: Array<{
      ticker?: string | null;
      name?: string | null;
      color?: string | null;
    } | null> | null;
    deadlines?: {
      disputeDuration: any;
      gracePeriod: any;
      oracleDuration: any;
    } | null;
    bonds?: {
      creation?: {
        isSettled: boolean;
        value: any;
        who: string;
      } | null;
      oracle?: {
        isSettled: boolean;
        value: any;
        who: string;
      } | null;
    } | null;
    pool?: {
      accountId?: string | null;
      baseAsset: string;
      createdAt: any;
      id: string;
      marketId: number;
      poolId: number;
      poolStatus: string;
      scoringRule: string;
      swapFee: string;
      totalSubsidy: string;
      totalWeight: string;
      volume: any;
      ztgQty: any;
      weights: Array<{
        assetId: string;
        len: any;
      } | null>;
    } | null;
  }>;
};
```

### `sdk#indexer.pools`

Get latest indexed market data for a set of liquidity pools.

**Returns:**

```ts
type PoolsQuery = {
  pools: Array<{
    accountId?: string | null;
    baseAsset: string;
    createdAt: any;
    id: string;
    marketId: number;
    poolId: number;
    poolStatus: string;
    scoringRule: string;
    swapFee: string;
    totalSubsidy: string;
    totalWeight: string;
    volume: any;
    ztgQty: any;
    weights: Array<{ assetId: string; len: any } | null>;
  }>;
};
```

### `sdk#indexer.accountBalances`

**Returns:**

```ts
type AccountBalancesQuery = {
  accountBalances: Array<{
    assetId: string;
    balance: any;
    id: string;
    account: {
      accountId: string;
      id: string;
      marketId?: number | null;
      poolId?: number | null;
    };
  }>;
};
```

### `sdk#indexer.assets`

**Returns:**

```ts
type AssetsQuery = {
  assets: Array<{
    id: string;
    assetId: string;
    poolId?: number | null;
    price?: number | null;
    amountInPool?: any | null;
  }>;
};
```

### `sdk#indexer.historicalAccountBalances`

**Returns:**

```ts
type HistoricalAccountBalancesQuery = {
  historicalAccountBalances: Array<{
    accountId: string;
    assetId: string;
    balance: any;
    blockNumber: number;
    dBalance: any;
    event: string;
    id: string;
    timestamp: any;
  }>;
};
```

### `sdk#indexer.historicalAssets`

**Returns:**

```ts
type HistoricalAssetsQuery = {
  historicalAssets: Array<{
    accountId?: string | null;
    assetId: string;
    blockNumber: number;
    dAmountInPool?: any | null;
    dPrice?: number | null;
    event: string;
    id: string;
    newAmountInPool?: any | null;
    newPrice?: number | null;
    timestamp: any;
    ztgTraded?: any | null;
  }>;
};
```

### `sdk#indexer.marketStatusCount`

**Returns:**

```ts
type MarketStatusCountQuery = {
  markets: Array<{ id: string }>;
};
```

### `sdk#indexer.historicalMarkets`

**Returns:**

```ts
type HistoricalMarketsQuery = {
  historicalMarkets: Array<{
    blockNumber: number;
    event: string;
    id: string;
    marketId: number;
    poolId?: number | null;
    resolvedOutcome?: string | null;
    status: MarketStatus;
    timestamp: any;
  }>;
};
```

### `sdk#indexer.historicalPools`

**Returns:**

```ts
type HistoricalPoolsQuery = {
  historicalPools: Array<{
    blockNumber: number;
    dVolume?: any | null;
    event: string;
    id: string;
    poolId: number;
    poolStatus: string;
    timestamp: any;
    volume?: any | null;
    ztgQty?: any | null;
  }>;
};
```

### `sdk#indexer.squidStatus`

**Returns:**

```ts
type SquidStatusQuery = {
  squidStatus?: { height?: number | null } | null;
};
```

### `sdk#indexer.stats`

**Returns:**

```ts
type StatsQuery = {
  stats: Array<{ totalLiquidity: any; totalVolume: any }>;
};
```
