# Withdrawing Liquidity

In this example we use the SDK to withdraw the liquidity we have in a `Pool`.

## 1. Setup

First we initialize the SDK(rpc/full context is needed) and fetch the pool we
want to withdraw liquidity from.

```ts
import {
  batterystation,
  create,
  FullContext,
  Sdk,
  ZTG,
} from "@zeitgeistpm/sdk";
import Decimal from "decimal.js";
import { getBsrTestingSigner } from "../getSigner";

const sdk: Sdk<FullContext> = await create(batterystation());

const pool = await sdk.model.swaps
  .getPool({
    marketId: 372,
  })
  .then((pool) => pool.unwrap()!);
```

## 2. Amount and Ratio.

Next we get the signing account, fetch the balance of pool shares the account
has in the pool, and calculate the ratio the user has of the total poolshares.

:::note

In this example we are withdrawing the full balance of pool shares the account
has.

:::

```ts
const signer: KeyringPair = getSignerSomehow();

const userPoolShares = new Decimal(
  await sdk.api.query.tokens
    .accounts(signer.address, {
      PoolShare: pool.poolId,
    })
    .then(({ free }) => free.toString())
);

const totalPoolShares = await pool.getTotalIssuance();
const ratio = totalPoolShares.div(userPoolShares);
```

[Read more about signing transactions.](/docs/build/sdk/v2/market-creation#2-init-market-creation-params)

## 3. Calculating Asset Amounts

Then we can calculate the amount of assets the user expects to get out based on
the poolshares he or she has and the ratio.

:::info

Note that we are also fetching and applying the `api.consts.swaps.exitFee` to
the expected amounts.

:::

```ts
const assets = pool.getAssetIds();

const exitFee = new Decimal(sdk.api.consts.swaps.exitFee.toString()).div(ZTG);
const exitFeeMul = new Decimal(1).minus(exitFee);

const minAssetsOut = await Promise.all(
  assets.map(async (asset) => {
    const assetBalance = await pool.getAssetBalance(asset);
    return assetBalance
      .div(ratio)
      .mul(exitFeeMul)
      .toFixed(0, Decimal.ROUND_DOWN);
  })
);
```

## 4. Sending the transaction

Finally we are ready to submit our transaction to withdraw the desired liquidity
from the pool.

```ts
const result = await pool.exit({
  signer,
  minAssetsOut: minAssetsOut,
  poolAmount: userPoolShares.toFixed(0, Decimal.ROUND_DOWN),
});
```

## Full Code

[Full code snippet](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/swaps/exit-pool.ts)
