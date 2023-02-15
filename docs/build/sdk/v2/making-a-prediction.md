# Making a Prediction

**Buying Market Outcome Assets**

In this part we give an example of how to buy a market outcome asset in a
categorical market. This effectively means making a prediction on the market.

### 1. Set up

First we import the needed modules from the sdk and polkadotjs. Some of the
types are not needed but included for clarity.

:::note

To submit transactions we need to have the sdk in `FullContext` or `RpcContext`
mode. Here we are using the FullContext.

:::

```ts
import { KeyringPair } from "@polkadot/keyring/types";
import {
  AssetId,
  calcInGivenOut,
  create,
  FullContext,
  getIndexOf,
  mainnet,
  Market,
  Pool,
  Sdk,
  ZTG,
  ZtgAssetId,
} from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());
```

### 2. Fetching Market and Pool

We fetch the market since it has metadata about the outcome categories that we
need and the associated pool that we are going to buy assets from.

```ts
const marketId = 1;

const market: Market<FullContext> = await sdk.model.markets
  .get({ marketId })
  .then((market) => market.unwrap()!);

const pool: Pool<FullContext> = await sdk.model.swaps
  .getPool({ marketId })
  .then((pool) => pool.unwrap()!);
```

:::note

Note a market or pool might not exist by any given id so here we unwrap unsafely
and do a non null assertion on them. This will throw an error if the market or
pool does not exist and should be done in a safer way in a real world
application like:

```ts
const market = (await sdk.model.markets.get({ marketId })).unwrap();

if (!market) {
  throw new Error("No market found");
}
```

:::

### 3. Massaging the Trade Data

Now we massage the data fetched and further fetch some data we need to be able
to make the trade.

First we normalize the assets in the pool to the `AssetId` type

```ts
const marketAssets: AssetId[] = pool.getAssetIds();
```

Then we declare the base asset we are going to buy the outcome assets with. This
is the base asset of the pool.

```ts
const baseAsset: ZtgAssetId = { Ztg: null };
```

:::info

Currently only `ZTG` is able to be the base asset of a pool. But this will be
expanded in the future.

:::

Next we find the `AssetId` in the pool by the outcome name `Yes` that we want to
buy.

```ts
const outcomeAssetIndex = market?.categories?.findIndex(
  (category) => category?.name === "Yes"
);
const outcomeAsset = marketAssets.find(
  (asset) => getIndexOf(asset) === outcomeAssetIndex
)!;
```

We want to buy `20 Yes` assets

```ts
const amountToBuy = ZTG.mul(20).toString();
```

Now we need to fetch the asset balances in the pool for the base asset `ZTG` and
the outcome asset we want to buy. We also need the swap fee, slippage percentage
and weights of the pool assets so that we can calculate the max amount of base
assets we are willing to pay for the outcome asset.

```ts
const [baseAssetBalance, outcomeAssetBalance] = await Promise.all([
  pool.getAssetBalance(baseAsset),
  pool.getAssetBalance(outcomeAsset),
]);

const baseAssetWeight = pool.getAssetWeight(baseAsset).unwrap()!;
const outcomeAssetWeight = pool.getAssetWeight(outcomeAsset).unwrap()!;

const amountToBuy = ZTG.mul(20).toString();
const swapFee = pool.getSwapFee();
const slippage = 0.1;

const maxAssetAmountIn = calcInGivenOut(
  baseAssetBalance,
  baseAssetWeight,
  outcomeAssetBalance,
  outcomeAssetWeight,
  amountToBuy,
  swapFee.div(ZTG).toNumber()
).mul(slippage / 100 + 1);
```

:::info

> "Slippage tolerances establish a margin of change acceptable to the user
> beyond price impact."

[Read more about slippage here.](https://docs.uniswap.org/concepts/protocol/swaps#slippage)

:::

### 4. Making the Transaction

Now we have all the data we need to submit the transaction and can submit it by
calling the `swapExactAmountOut` method on the `Pool`

```ts
const signer: KeyringPair = getSignerSomehow();

const submitableResult = await pool.swapExactAmountOut({
  assetIn: { Ztg: null },
  assetAmountOut: amountToBuy,
  assetOut: outcomeAsset,
  signer,
  maxAssetAmountIn: maxAssetAmountIn.toFixed(0),
});

console.log("Trade Successfull");
```

### Full Code

Here is a link to the full code of this example with some smaller differences so
its testable during development.

[Full Code Snippet](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/assets/buy-sell-assets.ts)
