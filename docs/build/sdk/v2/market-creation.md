# Market Creation

## 1. Set up

Import the needed modules and initialize the sdk in either full or rpc mode to
be able to submit transactions.

```ts
import {
  Sdk,
  FullContext,
  CreateStandaloneMarketParams,
  create,
  mainnet,
  ZTG,
} from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());
```

## 2. Init Market Creation Params

First we need to set up or get the signer from the wallet extension(browser) or
other keyring mechanism.

```ts
const signer: KeyringPair = getSigner();
```

Then we set up the parameters needed to create a market. In this case we are
creating a market with a pool with a liquidity of `300 ZTG` and even weighting
among the two categorical outcomes.

```ts
const params: CreateMarketWithPoolParams<typeof sdk> = {
  baseAsset: { Ztg: null },
  signer,
  disputeMechanism: "Authorized",
  marketType: { Categorical: 2 },
  oracle: signer.address,
  period: { Timestamp: [Date.now(), Date.now() + 60 * 60 * 24 * 1000 * 2] },
  deadlines: {
    disputeDuration: 5000,
    gracePeriod: 200,
    oracleDuration: 500,
  },
  metadata: {
    __meta: "markets",
    question: "Will the example work?",
    description: "Testing the sdk.",
    slug: "standalone-market-example",
    categories: [
      { name: "yes", ticker: "Y" },
      { name: "no", ticker: "N" },
    ],
    tags: ["dev"],
  },
  pool: {
    amount: ZTG.mul(300).toString(),
    swapFee: "1",
    weights: ["50000000000", "50000000000"],
  },
};
```

[Read more about market parameters](/docs/build/sdk/v2/create-market-parameters)

## 3. Submitting transaction

The `create` method on `sdk.model.markets` will first add the metadata to the
IPFS(or other custom) storage and then submit the transaction needed to create
the market on chain.

```ts
const response = await sdk.model.markets.create(params);
```

:::success

At this point the market has been created and the next step is optional and only
necessary if you need the created marketId in the next step of your application.

:::

## 4. Extracting Created Market and Pool (_optional_)

The `saturate` method will try to extract the create market and pool from the
submitted extrinsic events; and `unwrap` will unwrap the raw value.

```ts
const { market, pool } = response.saturate().unwrap();

console.log(`Market created with id: ${market.marketId}`);
console.log(`Pool created with id: ${pool.poolId}`);
```

:::warning

The unwrap method will throw and error if failing and should be try catched.

:::

### 5. Exception Safe Error Handling

In case you want more fine grained error handling, the sdk has some more
functional approaches to dealing with it.

```ts
const response = await sdk.model.markets.create(params);
const data = response.saturate();

if (data.isRight()) {
  const { market, pool } = data.unwrap();
  console.log(`Market created with id: ${market.marketId}`);
  console.log(`Pool created with id: ${pool.poolId}`);
} else {
  console.log(`Market creation had error: ${data.unwrapLeft().message}`);
}
```
