# Pool Creation Helpers

Some of the values that needs to be passed can be a bit occult so here we try to
explain them and offer some helpers for the most convenient ways of creating a
market.

:::info

In the example below we are creating a `categorical` market with two possible
outcomes and therefore two asset tokens.

- We use the `ZTG` helper to correctly calculate the pool value to `300 ZTG`
- We use the helper `evenWeights(x_number_of_outcomes)` to distribute the
  weights evenly among the outcomes.
- We use the helper `swapFeeFromFloat(percent)` to set the swap fee to `1%`

:::

```ts
import {
  ZTG,
  evenWeights,
  swapFeeFromFloat
} from '@zeitgeistpm/sdk'

const params = {
  ...,
  marketType: { Categorical: 2 },
  pool: {
    amount: ZTG.mul(300).toString(),
    weights: evenWeights(2),
    swapFee: swapFeeFromFloat(1).toString(),
  },
}
```

## Initial Prediction _(Uneven Asset Weighting)_

When you are creating a market and providing liquidity there is a good chance
you already have a sense of what the prediction will be and want to position
your liquidity across outcome assets in a way that is most beneficial to you.

You can use the `weightsFromRelativeRatio` to do this by supplying prices.

```ts
import {
  weightsFromRelativeRatio
} from '@zeitgeistpm/sdk'

const yesOutcomePricePrediction = 0.8
const noOutcomePricePrediction = 0.2

const params = {
  ...,
  marketType: { Categorical: 2 },
  pool: {
    ...,
    weights: weightsFromRelativeRatio([yesOutcomePricePrediction, noOutcomePricePrediction]),
  },
}
```

:::info

In this example we are prediction that the `yes` outcome has a `80%`percent
chance of being the outcome and the `no`outcome a `20%` chance.

Since the total price of all assets add up to `1 ZTG` its easier to reason
around weighting if you make sure that all the number supplied to the
`weightsFromRelativeRatio` function adds up to 1.

If you are thinking about it as percentage chances its easier if the numbers add
upp to `100`

:::
