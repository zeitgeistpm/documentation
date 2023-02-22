# Fetching by Market Id

## Params

The query can be either a number, string or object params representation of the
marketId.

```ts
type MarketGetQuery =
  | number
  | string
  | {
      marketId: number;
    };
```

:::info

Note that the `market.marketId` and `market.id` are not the same. The `id` is a
unique database identifier in the indexed subsquid data. While `marketId` is the
unique id used across both indexed and on chain market data.

:::

## Fetching

Here we are fetching a singel market by its id.

```ts
const market = (await sdk.model.markets.get("212")).unwrap();
```

```ts
const market = (await sdk.model.markets.get(212)).unwrap();
```

```ts
const market = (await sdk.model.markets.get({ marketId: 212 })).unwrap();
```

#### Returns

**[Market type ref](/docs/build/sdk/v2/reference/market)**
