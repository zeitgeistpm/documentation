# Seeling Assets

Your beliefs around a market might change during the market life time and in
this case you might want to sell your previously bought assets.

Lets say you have new information around a market and have the intuition that
the price of your asset will drop to a price below what it is currently at in
the near future. In this case you would like to sell those assets when the price
is still high.

:::info

The following code is a continuation of the same code used when buyin assets in
the [Making a Prediction Part](/docs/build/sdk/v2/making-a-prediction)

**But note that we have to calculate the slippage for selling and not buying.**

:::

### Swapping Outcome Assets for ZTG(base asset)

Here we swap the previously bought outcome asset `Yes` back into the pool in
exchange for `ZTG` or other base asset on the pool.

```ts
const slippage = slippageFromFloat(0.1, "selling");

const minAssetAmountOut = calcOutGivenIn(
  outcomeAssetBalance,
  outcomeAssetWeight,
  baseAssetBalance,
  baseAssetWeight,
  amountToSell,
  swapFee.div(ZTG).toNumber()
).mul(slippage);

const signer: KeyringPair = getBsrTestingSigner();

const submitableResult = await pool.swapExactAmountIn({
  assetIn: outcomeAsset,
  assetAmountIn: amountToSell,
  assetOut: { Ztg: null },
  signer,
  minAssetAmountOut: minAssetAmountOut.toFixed(0),
});
```

### Full Code

Here is a link to the full code of this example with some smaller differences so
its testable during development.

[Full Code Snippet](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/assets/sell-assets.ts)
