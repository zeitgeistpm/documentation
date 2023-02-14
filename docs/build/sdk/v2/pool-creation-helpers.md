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
- We use the helper `swapFeeFromFloat(percent)` to set the swap fee tio `1%`

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

## Uneven Asset Weighting

In case you want to have uneven weighting of assets upon pool/market creation
you can use the helper `weightsFromRelativeRatio(ratio: number[])`

:::info

In this example we are distributing the weight unevenly in a 2 to 4 ratio.

:::

```ts
import {
  weightsFromRelativeRatio
} from '@zeitgeistpm/sdk'

const params = {
  ...,
  marketType: { Categorical: 2 },
  pool: {
    ...,
    weights: weightsFromRelativeRatio([2, 4]),
  },
}
```
