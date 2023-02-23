# Working With AssetId´s

Asset ids delineates an asset at an index in a market pool.

## Types of Asset ids

### AssetId

The AssetId type is a union type of the following types of assets.

```ts
type AssetId =
  | CategoricalAssetId
  | ScalarAssetId
  | ZtgAssetId
  | PoolShareAssetId;
```

### Categorical Assets

The categorical asset id specifies which market it belongs to by the market id
and the index in the outcome assets vector it is.

```ts
type CategoricalAssetId = {
  CategoricalOutcome: [MarketId, number];
};
```

### Scalar Assets

The scalar asset id specifies which market it belongs to by the market id and if
its the long or short asset.

```ts
type ScalarAssetId = {
  ScalarOutcome: [MarketId, "Short" | "Long"];
};
```

### Ztg Assets _(base asset)_

The ZTG asset is currently the only base asset a market/pool can have.

:::warning

This will be expanded in the near future to be able to be other base assets like
stable coins.

:::

```ts
type ZtgAssetId = {
  Ztg: null;
};
```

### Pool Share Assets

Pool shares are earned/minted when you provide liquidity to a market. The number
represents the pool id the poolshares belong to.

```ts
type PoolShareAssetId = {
  PoolShare: number;
};
```

## Parsing Asset Ids

The sdk exposes the following function that helps to normalize/parse a `AssetId`
from a `string`, `object` or `ZeitgeistPrimitivesAsset`

```ts
declare const parseAssetId = (
  raw: string | object | ZeitgeistPrimitivesAsset,
): E.IEither<SyntaxError, AssetId>
```

All of the following examples will parse to the same `AssetId`

```ts
const assetId: AssetId = parseAssetId({ CategoricalOutcome: [1, 2] }).unwrap();

const assetId: AssetId = parseAssetId('{"CategoricalOutcome":[1,2]}').unwrap();

const assetId: AssetId = parseAssetId(
  api.createType("ZeitgeistPrimitivesAsset", { categoricalOutcome: [1, 2] })
).unwrap();
```

:::info

Note that the `unwrap` method in `Either` values will throw an error if it
cannot parse the value as expected and should be handled.

:::

## Typeguards for Asset Ids

The sdk exposes certain type guards that can typecheck asset ids at runtime.

```ts
import {
  AssetId,
  getIndexOf,
  IOCategoricalAssetId,
  IOMarketOutcomeAssetId,
  IOScalarAssetId,
  parseAssetId,
} from "@zeitgeistpm/sdk";

const categoricalAssetId: AssetId = parseAssetId({
  CategoricalOutcome: [1, 2],
}).unwrap();

const scalarAssetId: AssetId = parseAssetId({
  ScalarOutcome: [1, "Short"],
}).unwrap();

/**
 * We can narrow all the way down to a concrete type
 */
if (IOCategoricalAssetId.is(categoricalAssetId)) {
  console.log(categoricalAssetId.CategoricalOutcome);
}
if (IOScalarAssetId.is(scalarAssetId)) {
  console.log(scalarAssetId.ScalarOutcome);
}

/**
 * Or down to the union type of possible outcome asset id types
 */
if (IOMarketOutcomeAssetId.is(categoricalAssetId)) {
  /**
   * Getting the index of asset ids is only applicable to Market Outcome Asset ids
   */
  console.log(getIndexOf(categoricalAssetId));
}
```

## Corelating AssetId and Outcome Metadata

The asset ids that represent market outcomes IE:
[`MarketOutcomeAssetId`](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.MarketOutcomeAssetId.html)
which is either a
[`ScalarAssetId`](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.ScalarAssetId.html)
or a
[`CategoricalAssetId`](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.CategoricalAssetId.html)
stores the index of the asset that is corelated to the `market.categories`.

```ts
declare const market: Market<FullContext>;
declare const assetId: MarketOutcomeAssetId;

const { name, ticker, color } = market.categories![getIndexOf(assetId)]!;
```

## Example

In this example we are using `parseAssetId` to normalize the asset ids of a
market so that we can correlate them with the category metadata(name of outcome)
and also to fetch the market pools balance of those assets.

```ts
import { MarketStatus } from "@zeitgeistpm/indexer";
import {
  create,
  FullContext,
  getIndexOf,
  IOMarketOutcomeAssetId,
  mainnet,
  MarketOutcomeAssetId,
  parseAssetId,
  Sdk,
  ZTG,
} from "@zeitgeistpm/sdk";
import { isNotNull } from "@zeitgeistpm/utility/dist/null";

const sdk: Sdk<FullContext> = await create(mainnet());

/**
 * We fetch all active sports markets.
 */
const activeSportsMarkets = await sdk.model.markets.list({
  limit: 10,
  where: {
    tags_containsAll: ["Sports"],
    status_eq: MarketStatus.Active,
  },
});

for (const market of activeSportsMarkets) {
  /**
   * We fetch the pool for each market.
   */
  const pool = await sdk.model.swaps
    .getPool({ marketId: market.marketId })
    .then((pool) => pool.unwrap()!);

  /**
   * Massage the outcome assets so that they are all valid outcome assets.
   * We dont care about the base asset or pool shares here.
   */
  const assetIds: MarketOutcomeAssetId[] = market.outcomeAssets
    .filter(isNotNull)
    .map((raw) => parseAssetId(raw).unwrap())
    .filter(IOMarketOutcomeAssetId.is.bind(IOMarketOutcomeAssetId));

  /**
   * We fetch the balances for each outcome asset.
   * We also use the getIndexOf helper to corealte the asset id to the market category.
   */
  const assetsData = await Promise.all(
    assetIds.map(async (assetId) => {
      const balance = await pool.getAssetBalance(assetId);
      const category = market.categories?.[getIndexOf(assetId)];
      return { balance, category };
    })
  );

  /**
   * Print the balances for each outcome asset of the market.
   */
  console.log(`${market.marketId}: ${market.question}`);
  for (const { category, balance } of assetsData) {
    console.log(`  ${category?.name}: Volume: ${balance.div(ZTG).toFixed(2)}`);
  }

  console.log("--------------------------------");
}
```

#### Result

At the time of writing this documentation the results of this script is the
following:

```
85: Which team will be the champion of the Kings League tournament organized by Gerard Pique and Ibai Llanos?
  Ultimate Mostoles:          75.86 Mosto
  1K FC:                      75.86 1K FC
  Saiyans FC:                 107.13 Saiyans
  Kunisports:                 107.13 Kuni
  El Barrio:                  107.13 Barrio
  Los Troncos FC:             107.13 Troncos
  Porcinos FC:                107.13 Porcino
  Rayo de Barcelona:          107.13 Rayo
  Jijantes FC:                107.13 Jija
  PIO FC:                     107.13 PIO
  XBUYER TEAM:                107.13 Xbuy
  Aniquiladores FC:           107.13 Aniq
--------------------------------

21: Who will win the UEFA Champions League Cup in 2022/ 23?
  Liverpool FC:               6877.49 LIV
  FC Bayern München:          3896.01 BAY
  Real Madrid CF:             3085.29 MAD
  Manchester City F.C:        3058.22 MCI
  Chelsea FC:                 6917.83 CHL
  Paris Saint-Germain:        2835.22 PSG
  F.C. Barcelona:             9248.22 BAR
  A.C. Milan:                 9463.22 ACM
  SSC Napoli:                 6981.16 NAP
  OTHER:                      6463.22 OTH
--------------------------------
```
