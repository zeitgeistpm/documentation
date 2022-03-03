# Index

### getAllMarketIds

You can use this function to get all market IDs in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](./getAllMarketIds.ts)

### getAllMarkets

You can use this function to get all market in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](./getAllMarkets.ts)

### createCategoricalMarket

You can use this function to create a categorical market in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const marketId = await sdk.models.createCategoricalMarket(
  signer,
  oracle,
  marketPeriod,
  advised,
  mdm,
  cpmm,
  metadata,
  false
);
```

**Arguments**
| Name | Type | Introduction |
| ---- | ---- | ------------ |
| signer | KeyringPairOrExtSigner | The actual signer provider to sign the transaction. |
| oracle | string |The address that will be responsible for reporting the market. |
| period | MarketPeriod |Start and end block numbers or unix timestamp of the market. |
| creationType | string |"Permissionless" or "Advised", Advised as default |
| mdm | MarketDisputeMechanism |Dispute settlement can be authorized, court or simple_disputes |
| scoringRule | string | scoringRule you choose, CPMM as default|
| metadata | DecodedMarketMetadata |Market metadata |
| callbackOrPaymentInfo | |"true" to get txn fee estimation otherwise "false" |

[Code snippet](./createCategoricalMarket.ts)

### createScalarMarket

You can use this function to create a scalar market in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const marketId = await sdk.models.createScalarMarket(
  signer,
  title,
  description,
  oracle,
  marketPeriod,
  advised,
  bounds,
  mdm,
  cpmm,
  false
);
```

**Arguments**
| Name | Type | Introduction |
| ---- | ---- | ------------ |
| signer | KeyringPairOrExtSigner | The actual signer provider to sign the transaction. |
| oracle | string |The address that will be responsible for reporting the market. |
| period | MarketPeriod |Start and end block numbers or unix timestamp of the market. |
| title | string | The title of the new prediction market. |
| description | string | The description / extra information for the market. |
| creationType | string |"Permissionless" or "Advised", Advised as default |
| mdm | MarketDisputeMechanism |Dispute settlement can be authorized, court or simple_disputes |
| scoringRule | string | scoringRule you choose, CPMM as default|
| bounds | number[] |The array having lower and higher bound values denoting range set. [0,100] as default |
| callbackOrPaymentInfo | |"true" to get txn fee estimation otherwise "false" |

[Code snippet](./createScalarMarket.ts)

### fetchMarketData

You can use this function to fetch specify market's infomation by id in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const market = await sdk.models.fetchMarketData(Number(marketId));
```

**Arguments**
| Name | Type | Introduction |
| ---- | ---- | ------------ |
| marketId | MarketId | The unique identifier for the market you want to fetch. |

[Code snippet](./fetchMarketData.ts)

### getMarketCount

You can use this function to get market counts in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getMarketCount();
```

[Code snippet](./getMarketCount.ts)

### fetchDisputes

You can use this function to get all market IDs in the Zeitgeiest.
Should throw errors where market status is such that no disputes can have been registered, but all registered disputes will still be returned even if, eg, resolved. To check if disputes are active, use `viewMarket` and check market_status for "Disputed"

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.fetchDisputes();
```

**Arguments**
| Name | Type | Introduction |
| ---- | ---- | ------------ |
| marketId | MarketId | The unique identifier for the market you want to fetch. |

[Code snippet](./fetchDisputes.ts)

### fetchPoolData

You can use this function to get specify pool infomation in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const swap = await sdk.models.fetchPoolData(swapId);
if (swap != null) {
  console.log(swap.toJSONString());
}
```

[Code snippet](./fetchPoolData.ts)

### assetSpotPricesInZtg

You can use this function to find prices at a particular block in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.assetSpotPricesInZtg(blockHash);
```

[Code snippet](./assetSpotPricesInZtg.ts)

### getBlockData

You can use this function to get block infomation by blockhash in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getBlockData();
```

[Code snippet](./getBlockData.ts)

### indexTransferRecipients

You can use this function to get all market IDs in the Zeitgeiest.

```typescript
const sdk = await SDK.initialize(endpoint);

const res = await sdk.models.getAllMarketIds();
```

[Code snippet](./getAllMarketIds.ts)

### currencyTransfer

You can use this function to transfer specified asset from self to any account in the Zeitgeiest.

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

[Code snippet](./currencyTransfer.ts)
