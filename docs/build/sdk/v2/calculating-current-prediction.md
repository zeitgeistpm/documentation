# Calculating Predictions

In this example we will take a look at how you can parse the the state of a
market and calculate the current prediction based on the outcome asset prices.

## 1. Set up

We boot up the sdk in full context mode.

```ts
import {
  calcSpotPrice,
  create,
  FullContext,
  getIndexOf,
  IOMarketOutcomeAssetId,
  mainnet,
  Market,
  Sdk,
} from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());
```

## 2. Fetch Market and Pool

Then we fetch the market and pool we want to query the prediction for.

```ts
const marketId = 90;

const market: Market<FullContext> = await sdk.model.markets
  .get({ marketId })
  .then((market) => market.unwrap()!);

const pool = await sdk.model.swaps
  .getPool({ marketId })
  .then((pool) => pool.unwrap()!);
```

## 3. Fetching Base asset weight and balance.

Next we get the assets of the pool and fetch the pools base asset balance and
base asset weight.

```ts
const assets = pool
  .getAssetIds()
  .filter(IOMarketOutcomeAssetId.is.bind(IOMarketOutcomeAssetId));

const poolBaseAssetBalance = await pool.getAssetBalance({ Ztg: null });
const poolBaseAssetWeight = await pool.getAssetWeight({ Ztg: null }).unwrap()!;
```

## 4. Calculating Prices

Now we can iterate through the markets assets, fetch their balances, weights and
correlated market metadata category. Then we can calculate the price for the
given assets.

:::info

The zeitgeist node also supports `rpc` calls to fetch asset prices.
[Read more about them here.](/docs/build/sdk/v2/rpc-prices)

:::

```ts
const assetPrices = await Promise.all(
  assets.map(async (asset) => {
    const assetBalance = await pool.getAssetBalance(asset);
    const assetWeight = pool.getAssetWeight(asset).unwrap()!;
    const category = market.categories?.[getIndexOf(asset)];

    const price = calcSpotPrice(
      poolBaseAssetBalance,
      poolBaseAssetWeight,
      assetBalance,
      assetWeight,
      0
    );

    return {
      name: category?.name ?? asset.toString(),
      price,
    };
  })
);
```

:::note

Note that the category metadata can be missing on markets.

:::

## 5. Printing the current prediction

Now we can get the highest asset price and print the current prediction.

:::info

Here we are assuming the market is a `Categorical` market. To see how you can
calculate the value if the market is a `Scalar` market,
**[jump to the next section](/docs/build/sdk/v2/calculating-scalar-prediction)**.

:::

```ts
const predictedPrice = assetPrices
  .sort((a, b) => (a.price.gt(b.price) ? -1 : 1))
  .at(0)!;

console.log(
  `${market.question}`,
  `The prediction is ${predictedPrice.name} at ${predictedValue.toFixed(2)}`
);
```

Based on the market data at time of writing the output will be:

```bash
Will a DEX be deployed on Statemint or Statemine before the end of Q2 2023?
The prediction is `no` at 0.80767457218061127617
```

### Full Code

[Go to the full code snippet for this example](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/assets/getting-prediction.ts)
