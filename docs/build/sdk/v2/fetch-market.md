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
unique database identifier in the indexed Subsquid data. While `marketId` is the
unique id used across both indexed and on chain market data.

:::

## Fetching

Here we are fetching a single market by its id.

You can fetch by a market id number _(strings are also accepted)_:

```ts
const market = (await sdk.model.markets.get(212)).unwrap();
```

You can also pass objects that has the property `marketId` on them. So in case
you already have the pool you can find the related market by passing it
directly.

```ts
const pool = await sdk.model.swaps.getPool(568).then((pool) => pool.unwrap()!);
const market = await sdk.model.markets.get(pool);
```

#### Returns

**[Market type ref](/docs/build/sdk/v2/reference/market)**

#### Full Code

[Full code snippet](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/fetching-markets/get.ts)
