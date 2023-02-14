# Fetching Markets

## Quickstart

Here we are fetching `10` `active` markets with the `Sports` tag.

```ts
import { MarketStatus } from "@zeitgeistpm/indexer";
import { create, FullContext, mainnet, Sdk } from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());

const activeSportsMarkets = await sdk.model.markets.list({
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

:::info

Note that since we are creating a `FullContext` sdk the indexer will be the
prefered method of fetching markets and will give access to more fine grained
filtering like by status, tags, creator etc.

:::

## Fetching With Rpc

If you have a requirement to fetch directly from the chain and decentralized
storage(IPFS) you can start the sdk in `RpcContext` mode. The following example
will give the same result as the indexed one above with the exception of
limiting results.

```ts
import { create, mainnetRpc, RpcContext, Sdk } from "@zeitgeistpm/sdk";
import { isNotNull } from "@zeitgeistpm/utility/dist/null";

const sdk: Sdk<RpcContext> = await create(mainnetRpc());

const all = await sdk.model.markets.list();

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
