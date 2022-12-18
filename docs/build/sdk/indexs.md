# Indexs

## getAllMarketIds

You can use this function to get all market IDs in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/getAllMarketIds.ts)

## getAllMarkets

You can use this function to get all market in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/getAllMarkets.ts)

## createCpmmMarketAndDeployAssets

Creates a market using CPMM scoring rule, buys a complete set of the assets used
and deploys the funds.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.createCpmmMarketAndDeployAssets({
  signer: util.signerFromSeed(`//Alice`),
  oracle: `dE3pPiRvdKqPD5bUDBu3Xpi83McE3Zf3UG8CbhWBQfvUywd7U`,
  period: { block: [4000, 5000] },
  marketType: { categorical: 5 },
  metadata: {
    categories: [
      { name: `karura` },
      { name: `moonriver` },
      { name: `phala` },
      { name: `robonomics` },
      { name: `kilt` },
    ],
    slug: `kusama-derby-example`,
    description: `example description`,
    question: `who will win?`,
  },
  mdm: { authorized: `dE3pPiRvdKqPD5bUDBu3Xpi83McE3Zf3UG8CbhWBQfvUywd7U` },
  swapFee: `1000000000`,
  amount: `10000000000`,
  weights: [
    `10000000000`,
    `10000000000`,
    `10000000000`,
    `10000000000`,
    `10000000000`,
  ],
  callbackOrPaymentInfo: false,
});
```

**Object Arguments**

| Name                  | Type                     | Description                                                   |
| --------------------- | ------------------------ | ------------------------------------------------------------- |
| signer                | [KeyringPairOrExtSigner] | The actual signer provider to sign the transaction            |
| oracle                | string                   | The address that will be responsible for reporting the market |
| period                | [MarketPeriod]           | Start and end block numbers or milliseconds since epoch       |
| marketType            | [MarketTypeOf]           | `Categorical` or `Scalar`                                     |
| metadata              | [DecodedMarketMetadata]  | A hash pointer to the metadata of the market                  |
| mdm                   | [MarketDisputeMechanism] | Dispute settlement can only be `Authorized` currently         |
| swapFee               | string                   | The fee applied to each swap after pool creation              |
| amount                | string                   | The amount of each token to add to the pool                   |
| weights               | string[]                 | List of relative denormalized weights of each outcome asset   |
| callbackOrPaymentInfo | boolean                  | `true` to get txn fee estimation otherwise `false`            |

[keyringpairorextsigner]:
  https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L276
[marketdisputemechanism]:
  https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L198
[marketperiod]:
  https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L182
[markettypeof]:
  https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L188
[decodedmarketmetadata]:
  https://github.com/zeitgeistpm/tools/blob/main/packages/sdk/src/types/index.ts#L6

## createMarket

You can use this function to create categorical or scalar market using below
arguments.

```typescript
const sdk = await SDK.initialize(endpoint);

const marketId = await sdk.models.createMarket({
  signer,
  oracle,
  period: marketPeriod,
  metadata,
  creationType: advised ? `Advised` : `Permissionless`,
  marketType: { Scalar: bounds ? bounds : [0, 100] },
  mdm,
  scoringRule: cpmm ? `CPMM` : `RikiddoSigmoidFeeMarketEma`,
  callbackOrPaymentInfo: false,
});
```

**Object Arguments**

| Name                  | Type                   | Description                                                   |
| --------------------- | ---------------------- | ------------------------------------------------------------- |
| signer                | KeyringPairOrExtSigner | The actual signer provider to sign the transaction            |
| oracle                | string                 | The address that will be responsible for reporting the market |
| period                | MarketPeriod           | Start and end block numbers or milliseconds since epoch       |
| metadata              | DecodedMarketMetadata  | A hash pointer to the metadata of the market                  |
| creationType          | string                 | `Permissionless` or `Advised`                                 |
| marketType            | MarketTypeOf           | `Categorical` or `Scalar`                                     |
| mdm                   | MarketDisputeMechanism | Dispute settlement can only be `Authorized` currently         |
| scoringRule           | string                 | The scoring rule of the market                                |
| callbackOrPaymentInfo | boolean                | `true` to get txn fee estimation otherwise `false`            |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/createCategoricalMarket.ts)

## fetchMarketData

You can use this function to fetch specify market's infomation by id in the
Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const market = await sdk.models.fetchMarketData(Number(marketId));
```

**Arguments**

| Name     | Type     | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| marketId | MarketId | The unique identifier for the market you want to fetch. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/fetchMarketData.ts)

## getMarketCount

You can use this function to get total number of markets registered with the
network.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getMarketCount();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/getMarketCount.ts)

## fetchDisputes

You can use this function to get all market IDs in the Zeitgeiest. Should throw
errors where market status is such that no disputes can have been registered,
but all registered disputes will still be returned even if, eg, resolved. To
check if disputes are active, use `viewMarket` and check market_status for
"Disputed"

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.fetchDisputes();
```

**Arguments**

| Name     | Type     | Description                                             |
| -------- | -------- | ------------------------------------------------------- |
| marketId | MarketId | The unique identifier for the market you want to fetch. |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/fetchDisputes.ts)

## fetchPoolData

You can use this function to get specify pool infomation in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const swap = await sdk.models.fetchPoolData(swapId);
if (swap != null) {
  console.log(swap.toJSONString());
}
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/fetchPoolData.ts)

## assetSpotPricesInZtg

You can use this function to find prices at a particular block in the
Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.assetSpotPricesInZtg(blockHash);
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/assetSpotPricesInZtg.ts)

## getBlockData

You can use this function to get block infomation by blockhash in the
Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getBlockData();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/getBlockData.ts)

## queryMarket

You can use this function to query market by GraphQL in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint, { graphQlEndpoint });

const res = await sdk.models.queryMarket(marketId);
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/queryMarket.ts)

## queryMarketsCount

You can use this function to query counts of markets for specified filter
options by GraphQL in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint, { graphQlEndpoint });

const count = await sdk.models.queryMarketsCount({ tags: [tag] });
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/queryMarketsCount.ts)

## queryAllActiveAssets

You can use this function to query all active assets from subsquid indexer in
the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint, { graphQlEndpoint });

const res = await sdk.models.queryAllActiveAssets(marketSlug, pagination);
```

**Arguments**

| Name           | Type                                     | Description                            |
| -------------- | ---------------------------------------- | -------------------------------------- |
| marketSlugText | string                                   | Filter assets by market slug           |
| pagination     | { pageNumber: number; pageSize: number } | Options for pagination, not neccessary |

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/queryAllActiveAssets.ts)

## filterMarkets

You can use this function to query subsquid indexer for market data with
pagination in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint, { graphQlEndpoint });

const { result, count } = await sdk.models.filterMarkets(
  { statuses, creator, oracle, tags, searchText, liquidityOnly },
  {
    ordering,
    orderBy,
    pageSize,
    pageNumber,
  }
);
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/filterMarkets.ts)

## indexTransferRecipients

You can use this function to get all market IDs in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/getAllMarketIds.ts)

## currencyTransfer

You can use this function to transfer specified asset from self to any account
in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.currencyTransfer(
  signer,
  dest,
  currencyId,
  amount,
  false
);
```

[Code snippet](https://github.com/Whisker17/sdk-demo/tree/main/src/index/currencyTransfer.ts)
