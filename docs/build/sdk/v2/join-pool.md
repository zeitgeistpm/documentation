# Adding Liquidity to a Pool

In this example we use the SDK to add some liquidity to a `Pool`. In return we
get some LP tokens that represent our relative share of the liquidity pool.
Higher liquidity results in lower price slippage and enables a greater number of
people to participate in the market.

> The LP tokens can be burned by a provider in order to receive back their share
> of the pool, usually in the hopes that through the collection of trading fees
> that share has appreciated in value. This process of making gains of providing
> liquidity is often referred to as liquidity mining.

[Read more about Liquidity](https://docs.zeitgeist.pm/docs/learn/liquidity)

## 1. Setup

First we initialize the SDK(rpc/full context is needed) and fetch the pool we
want to add liquidity too.

```ts
import {
  batterystation,
  create,
  FullContext,
  IOMarketOutcomeAssetId,
  Sdk,
  slippageFromFloat,
  ZTG,
} from "@zeitgeistpm/sdk";
import Decimal from "decimal.js";

const sdk: Sdk<FullContext> = await create(batterystation());

const pool = await sdk.model.swaps
  .getPool({
    marketId: 372,
  })
  .then((pool) => pool.unwrap()!);
```

## 2. Total issuance and base asset.

Next we fetch the total pool shares already issued to other users and the
balance of the pools base asset(ztg).

```ts
const totalPoolShares = await pool.getTotalIssuance();
const baseAssetBalance = await pool.getAssetBalance({ Ztg: null });
```

## 3. Amount & Ratio

Then we define how much ZTG(base asset) we want to put into the pool. Based on
this amount we can calculate the ratio between the amount of ztg in the pool and
the amount ztg the user wants to add to the pool.

:::note

This ratio must be the same for all assets so that adding liquidity doesn't
change the current prices

:::

```ts
const ztgToPutIn = ZTG.mul(100);
const ratio = baseAssetBalance.div(ztgToPutIn);
```

## 4. Defining Join Pool Params

Now we can calculate the params we need to transact the join pool extrinsic.

_We need to define the max amount of each pool asset we want to put in. This is
dictated by the ratio._

```ts
const outcomeAssets = pool
  .getAssetIds()
  .filter(IOMarketOutcomeAssetId.is.bind(IOMarketOutcomeAssetId));

const assetsMaxIn = await Promise.all(
  outcomeAssets.map(async (asset) => {
    const assetBalance = await pool.getAssetBalance(asset);
    return assetBalance.div(ratio).toFixed(0, Decimal.ROUND_UP);
  })
);
```

:::note

You need to make sure you have balance needed of the outcome assets in the pool.
You can swap these using the method
[`Market<FullContext | RpcContext>#buyCompleteSet`](http://localhost:3000/docs/build/sdk/v2/reference/market#market-methods-ref)

:::

_The max base asset we want to put in is straight forward; the amount we want to
put in._

```ts
const baseAssetMaxIn = ztgToPutIn.toFixed(0);
```

_Calculate the amount of pool shares the user should receive based on the
percentage of the pool they will own after the extrinsic is executed_

```ts
const poolAmount = totalPoolShares.div(ratio).toFixed(0, Decimal.ROUND_DOWN);
```

## 5. Sending the transaction

Finally we are ready to submit our transaction to add the desired liquidity to
the pool.

```ts
const signer: KeyringPair = getSignerSomehow();

const submittableResult = await pool.join({
  signer,
  poolAmount: poolAmount, // amount of pool shares the user should receive
  maxAssetsIn: [...assetsMaxIn, baseAssetMaxIn], // maximum amounts of assets the user is willing to pay
});

console.log(`Liquidity added`);
```

[Read more about signing transactions.](/docs/build/sdk/v2/market-creation#2-init-market-creation-params)

## Full Code

[Full code snippet](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/swaps/join-pool.ts)
