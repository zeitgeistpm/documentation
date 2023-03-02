# Scalar Prediction

Here we jump straight to step 5 of the calculating prediction flow. Meaning that
step 1 through 4 in the
[previous section](/docs/build/sdk/v2/calculating-current-prediction) are the
same.

:::info

[Learn more about scalar markets](/docs/learn/prediction-markets#scalar-prediction-markets)

:::

## 5. Printing the current _(scalar)_ prediction

If the market is a scalar market we get the lower and upper bounds of the market
and use them to calculate what the predicted scalar value of the market is
currently.

```ts
const predictedPrice = assetPrices
  .sort((a, b) => (a.price.gt(b.price) ? -1 : 1))
  .at(0)!;

if (market.marketType.scalar) {
  const [lower, upper] = getScalarBounds(market).unwrap()!;

  const predictedValue = upper
    .minus(lower)
    .mul(predictedPrice.price)
    .plus(lower);

  console.log(
    `${market.question}`,
    `The prediction is ${predictedPrice.name} at ${predictedValue.toFixed(2)}`
  );
}
```

### Full Code

[Go to the full code snippet for this example](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/assets/getting-prediction.ts)
