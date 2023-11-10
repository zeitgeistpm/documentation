# Fetching Prices Using Rpc

If your requirements for calculating asset prices require a high grade of
verifiability and leaves little room for client side calculation errors. You can
fetch the prices for assets using the following **on-chain** rpc calls.

:::warning

These calls are currently not working on our mainnet and testnet, but will be
supported in the `0.3.9` node release.

:::

## swaps.getSpotPrice()

This method fetches the current spot price given an assetIn and and assetOut at
a given block(default is current block).

```ts
(
  poolId: u128 | Number | Uint8Array,
  assetIn: ZeitgeistPrimitivesAsset | AssetId | string | Uint8Array,
  assetOut: ZeitgeistPrimitivesAsset | AssetId | string | Uint8Array,
  withFees: bool | boolean | Uint8Array,
  at: Option<BlockHash> | null | Uint8Array | string,
) => Promise<u128>
```

### Example

Here we are fetching the price for the `AssetId`
`{ CategoricalOutcome: [0, 0] }` in \*_ZTG_ at the current best block not
including the swap fees.

```ts
const sdk: Sdk<RpcContext> = await create(localhostRpc());

const price = await sdk.api.rpc.swaps.getSpotPrice(
  0,
  { Ztg: null },
  { CategoricalOutcome: [0, 0] },
  false,
  null
);

console.log(new Decimal(price.toNumber()).div(ZTG).toNumber());
```

[Full code snippet.](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/rpc-get-spot-price.ts)

## swaps.getSpotPrices()

This method fetches the spot prices given an assetIn and and assetOut for a
range of blocks.

_Usefull when you need a graph of prices over a range of blocks._

```ts
(
  poolId: u128 | Number | Uint8Array,
  assetIn: ZeitgeistPrimitivesAsset | AssetId | string | Uint8Array,
  assetOut: ZeitgeistPrimitivesAsset | AssetId | string | Uint8Array,
  withFees: bool | boolean | Uint8Array,
  blocks: Vec<u128> | Array<u128 | Number | Uint8Array>,
) => Promise<Vec<Balance>>
```

### Example

Here we are fetching the price for the `AssetId`
`{ CategoricalOutcome: [0, 0] }` in \*_ZTG_ for the blocks `55`, `56` and `57`
not including the swap fees.

```ts
const sdk: Sdk<RpcContext> = await create(localhostRpc());

const prices = await sdk.api.rpc.swaps.getSpotPrices(
  0,
  { Ztg: null },
  { CategoricalOutcome: [0, 0] },
  false,
  [55, 56, 57]
);

prices.forEach((price) => {
  console.log(new Decimal(price.toNumber()).div(ZTG).toNumber());
});
```

[Full code snippet.](https://github.com/zeitgeistpm/sdk-next/blob/main/playground/examples/src/rpc-get-spot-prices.ts)
