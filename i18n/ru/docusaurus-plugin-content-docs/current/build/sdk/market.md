# Market

## toJSONString

You can use this function to convert market object into string.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarkets();

res.forEach((market) => console.log(market.toJSONString()));
```

## toFilteredJSONString

You can use this function to convert market object into string with filters.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarkets();

res.forEach((market) => console.log(market.toFilteredJSONString(filter)));
```

## filterMarketData

Populate only selected attributes from the market data defined using filter. Populates `marketId` by default.

```typescript
const res = filterMarketData(market, filter);
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/filterMarketData.ts)

## getEndTimestamp

You can use this function to get timestamp at the end of the market period.

```typescript
const res = market.getEndTimestamp();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/getEndTimestamp.ts)

## getPoolId

You can use this function to get pool id to be used for fetching data using `sdk.models.market.getPool()`. Returns null if no swap pool is available for the market.

```typescript
const res = market.getPoolId();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/getPoolId.ts)

## getPool

You can use this function to recreate swap pool for this market using data fetched with `poolId`.

```typescript
const res = market.getPool();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/getPool.ts)

## getDisputes

You can use this function to fetch disputes for this market using unique identifier `marketId`.

```typescript
const res = market.getDisputes();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/getDisputes.ts)

## deploySwapPool

Creates swap pool for the market with specified liquidity. The sender must have enough funds to cover all of the required shares to seed the pool.

```typescript
const market = await sdk.models.fetchMarketData(marketId);

const signer = util.signerFromSeed(`//Alice`);

const poolId = await market.deploySwapPool(
  signer,
  `1000000000`,
  `10000000000`,
  [ 
    `10000000000`, 
    `10000000000`, 
    `10000000000`, 
    `10000000000`, 
    `10000000000`,
  ],
  false,
);
```

**Arguments**

| Name                  | Type                       | Description                                                                       |
| --------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| signer                | [KeyringPairOrExtSigner][] | The actual signer provider to sign the transaction                                |
| swapFee               | string                     | The fee applied to each swap after pool creation                                  |
| amount                | string                     | The amount of each token to add to the pool                                       |
| weights               | string                     | The relative denormalized weight of each outcome asset                            |
| callbackOrPaymentInfo | boolean                    | `true` to get txn fee estimation otherwise callback to capture transaction result |


## deploySwapPoolAndAdditionalLiquidity

Buy complete sets and deploy a pool with specified liquidity for a market.

```typescript
const market = await sdk.models.fetchMarketData(marketId);

const signer = util.signerFromSeed(`//Alice`);

const poolId = await market.deploySwapPoolAndAdditionalLiquidity(
  signer,
  `1000000000`,
  `10000000000`,
  [ 
    `10000000000`, 
    `10000000000`, 
    `10000000000`, 
    `10000000000`, 
    `10000000000`,
  ],
  false,
);
```

**Arguments**

| Name                  | Type                       | Description                                                                       |
| --------------------- | -------------------------- | --------------------------------------------------------------------------------- |
| signer                | [KeyringPairOrExtSigner][] | The actual signer provider to sign the transaction                                |
| swapFee               | string                     | The fee applied to each swap after pool creation                                  |
| amount                | string                     | The amount of each token to add to the pool                                       |
| weights               | string                     | The relative denormalized weight of each outcome asset                            |
| callbackOrPaymentInfo | boolean                    | `true` to get txn fee estimation otherwise callback to capture transaction result |

## assetSpotPricesInZtg

You can use this function to fetch spot prices of all assets in this market Can be used to find prices at a particular block using unique identifier.

```typescript
const res = market.assetSpotPricesInZtg(blockHash);
```

**Arguments**

| Name      | Type | Introduction                                                                     |
| --------- | ---- | -------------------------------------------------------------------------------- |
| blockHash | any  | not necessarily. The unique identifier for the block to fetch asset spot prices. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/assetSpotPricesInZtg.ts)

## buyCompleteSet

You can use this function to buy a complete set of outcome shares for the market. **Note: This is the only way to create new shares.**

```typescript
const res = market.buyCompleteSet(signer, Number(1000000000000));
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| amount                | number                 | The amount of each share.                                                          |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/buyCompleteSet.ts)

## sellCompleteSet

You can use this function to sell/destroy a complete set of outcome shares for the market.

```typescript
const res = market.sellCompleteSet(signer, Number(1000000000000));
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| amount                | number                 | The amount of each share.                                                          |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/sellCompleteSet.ts)

## reportOutcome

You can use this function to report an outcome for the market.

```typescript
const res = await market.reportOutcome(signer, outcomeReport, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| outcome               | OutcomeReport          | The outcome of the market                                                          |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/reportOutcome.ts)

## dispute

You can use this function to submit a disputed outcome for the market.

```typescript
const res = await market.dispute(signer, outcomeReport, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| outcome               | OutcomeReport          | The outcome of the market                                                          |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/dispute.ts)

## redeemShares

You can use this function to redeem the winning shares for the market.

```typescript
const res = await market.redeemShares(signer, outcomeReport, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| outcome               | OutcomeReport          | The outcome of the market                                                          |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/redeemShares.ts)

## approve

You can use this function to approve the `Proposed` market that is waiting for approval from the advisory committee.

```typescript
const res = await market.approve(signer, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/approve.ts)

## reject

You can use this function to reject the `Proposed` market that is waiting for approval from the advisory committee.

```typescript
const res = await market.reject(signer, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/reject.ts)

## cancelAdvised

You can use this function to allow the proposer of the market that is currently in a `Proposed` state to cancel the market proposal.

```typescript
const res = await market.cancelAdvised(signer, false);
```

**Arguments**

| Name                  | Type                   | Introduction                                                                       |
| --------------------- | ---------------------- | ---------------------------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction.                                |
| callbackOrPaymentInfo |                        | "true" to get txn fee estimation otherwise callback to capture transaction result. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/market/cancelAdvised.ts)

[KeyringPairOrExtSigner]: https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L276
