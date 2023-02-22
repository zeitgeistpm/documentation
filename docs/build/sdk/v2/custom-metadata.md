# Custom Market Metadata

You specify a custom market metadata type that extends the zeitgeist standard or
that is a completely different type.

:::warning

If you do not adhere to the zeitgeist official metadata specification your
created markets might not show up in the indexer and the application.

:::

## 1. Creating the type.

First we construct a type of custom market metadata we want to attach to our
markets.

```ts
type CustomMarketMetadata = {
  __meta: "markets";
  customValue: string;
};
```

## 2. Initializing the SDK

Next we initialize the sdk with the custom metadata as a generic.

```ts
const sdk = await create(
  batterystationRpc<MetadataStorage<CustomMarketMetadata>>()
);
```

_Or if we want to use a local test node_

```ts
const sdk = await create<MetadataStorage<CustomMarketMetadata>>({
  provider: "wss://localhost:9944",
  storage: createStorage(
    IPFS.storage({
      node: { url: "localhost:5001" },
    })
  ),
});
```

## 3. Creating a custom Market

Then we can create a market with the custom metadata.

```ts
const params: CreateStandaloneMarketParams<typeof sdk> = {
  ...,
  metadata: {
    __meta: 'markets',
    customValue: 'custom text value',
  },
}

const response = await sdk.model.markets.create(params)
const { market } = await response.saturate().unwrap()

const marketMetadata: CustomMarketMetadata = await market.fetchMetadata().unwrap()

console.log(`Market created with custom metadata: ${marketMetadata.customValue}`)
```

:::info

Using typescript will give you strong type checking when creating and fetching
metadata for markets with custom metadata types.

:::

## 4. Extending Standard Metadata _(optional)_

If you want to make sure the market shows up in the indexer and the application
you should extend the standard metadata.

```ts
import { MarketMetadata } from "@zeitgeistpm/sdk";

type CustomMarketMetadata = MarketMetadata & {
  __meta: "markets";
  customValue: string;
};
```

:::note

Note that in this example you would also have to pass `question`, `description`
etc to the metadata when creating a market.

[Ref official metadata spec](/docs/build/sdk/v2/create-market-parameters#metadata)

:::

### Indexer and Custom Metadata

:::warning

Note that the custom metadata is not indexed and if you want to use it in your
application you have to fetch it manually.

:::

We can still fetch it after the market is fetched if we have access to
rpc/storage.

```ts
const sdk = await create(
  batterystation<MetadataStorage<CustomMarketMetadata>>()
);

const market = (await sdk.model.markets.get(585)).unwrap()!;

// Question, slug etc are indexed so can be accessed directly
console.log(market.question);

// the custom value have to be fetched from IPFS
const metadata = await market.fetchMetadata().unwrap();
console.log(metadata.customValue);
```
