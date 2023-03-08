# Fetching Markets

## Quickstart

Here we are fetching `10` `active` markets with the `Sports` tag.

```ts
import { MarketStatus } from "@zeitgeistpm/indexer";
import {
  create,
  FullContext,
  mainnet,
  MarketList,
  Sdk,
} from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());

const activeSportsMarkets: MarketList<FullContext> =
  await sdk.model.markets.list({
    limit: 10,
    where: {
      tags_containsAll: ["Sports"],
      status_eq: MarketStatus.Active,
    },
  });

activeSportsMarkets.forEach((market) => {
  console.log(`${market.marketId}: ${market.question}`);
});
```

#### Returns

**[Market type ref](/docs/build/sdk/v2/reference/market)**

:::info

Note that since we are creating a `FullContext` sdk the indexer will be the
preferred method of fetching markets and will give access to more fine grained
filtering like by status, tags, creator etc.

:::

## Fetching With Rpc

If you have a requirement to fetch directly from the chain and decentralized
storage(IPFS) you can start the sdk in `RpcContext` mode. The following example
will give the same result as the indexed one above with the exception of
limiting results.

:::warning

Currently this fetches all markets on chain and wont be a viable long term. But
features to paginate and stream the list of markets is coming shortly.

:::

```ts
import {
  create,
  mainnetRpc,
  MarketList,
  RpcContext,
  Sdk,
} from "@zeitgeistpm/sdk";
import { isNotNull } from "@zeitgeistpm/utility/dist/null";

const sdk: Sdk<RpcContext> = await create(mainnetRpc());

const all: MarketList<RpcContext> = await sdk.model.markets.list();

const activeSportsMarkets = (
  await Promise.all(
    all.map(async (market) => {
      if (!market.status.isActive) {
        return null;
      }

      /**
       * Saturation is a process that fetches metadata for a market from external storage(IPFS)
       */
      const marketWithMetadata = await market.saturate();

      /**
       * Saturated markets have access to the metadata like tags, categories, question, etc.
       */
      if (marketWithMetadata.tags?.includes("Sports")) {
        return marketWithMetadata;
      }

      return null;
    })
  )
).filter(isNotNull);

activeSportsMarkets.forEach((market) => {
  console.log(`${market.marketId}: ${market.question}`);
});
```

### Forcing Rpc

If you are working with a `FullContext` sdk it will favour the indexer when
querying markets. But if you want to force querying on chain data you can use it
`asRpc` which will in effect make it a `RpcContext` sdk.

:::info

Note that `asRpc()` clones the sdk and will reuse the underlying websocket
connection, but will not affect the behavior of the sdk it was cloned from.

:::

```ts
import {
  create,
  FullContext,
  mainnet,
  MarketList,
  RpcContext,
  Sdk,
} from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());

/**
 * Clone the sdk and force it to use the rpc api.
 */
const rpcSdk: Sdk<RpcContext> = sdk.asRpc();

const markets: MarketList<RpcContext> = await rpcSdk.model.markets.list();

/**
 * Saturate the markets with data from IPFS so we can peek its question
 */
const saturatedMarkets = await Promise.all(
  markets.slice(0, 10).map(async (market) => market.saturate())
);

saturatedMarkets.forEach((market) => {
  console.log(`${market.marketId}: ${market.question}`);
});
```
