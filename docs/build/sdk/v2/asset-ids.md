# Working With AssetId´s

Asset ids delineates an asset at an index in a market pool.

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
and the index in the assets vector it is.

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

### Ztg Assets

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
