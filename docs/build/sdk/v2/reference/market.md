# Market

## The market type.

### Indexed Markets [[ref]](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.IndexedMarket.html)

The market structure that is returned from the indexer, which is the preferred
data when using the full sdk; looks like the following:

:::note

**This is the type returned from
`Sdk<FullContext | IndexerContext>#model.markets.get|list`**

:::

```ts
type Market<IndexerContext> = {
  id: string;
  marketId: number;
  description?: string | null;
  creator: string;
  creatorFee?: number | null;
  creation: string;
  oracle: string;
  question?: string | null;
  slug?: string | null;
  img?: string | null;
  tags?: Array<string | null> | null;
  status: MarketStatus;
  scoringRule: string;
  resolvedOutcome?: string | null;
  scalarType?: string | null;
  outcomeAssets: Array<string | null>;
  rejectReason?: string | null;
  disputeMechanism: string;
  marketType: {
    categorical?: string | null;
    scalar?: Array<string | null> | null;
  };
  period: {
    block?: Array<any | null> | null;
    timestamp?: Array<any | null> | null;
    end: any;
    start: any;
  };
  report?: {
    at?: number | null;
    by?: string | null;
    outcome: {
      categorical?: number | null;
      scalar?: any | null;
    };
  } | null;
  categories?: Array<{
    ticker?: string | null;
    name?: string | null;
    color?: string | null;
  } | null> | null;
  deadlines?: {
    disputeDuration: any;
    gracePeriod: any;
    oracleDuration: any;
  } | null;
  bonds?: {
    creation?: {
      isSettled: boolean;
      value: any;
      who: string;
    } | null;
    oracle?: {
      isSettled: boolean;
      value: any;
      who: string;
    } | null;
  } | null;
  pool?: {
    accountId?: string | null;
    baseAsset: string;
    createdAt: any;
    id: string;
    marketId: number;
    poolId: number;
    poolStatus: string;
    scoringRule: string;
    swapFee: string;
    totalSubsidy: string;
    totalWeight: string;
    volume: any;
    ztgQty: any;
    weights: Array<{ assetId: string; len: any } | null>;
  } | null;
};
```

### Rpc Markets [[ref]](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.RpcMarket.html)

The market structure that is returned from the sdk when in rpc mode, looks like
the following:

```ts
type Market<RpcContext> = {
  readonly baseAsset: ZeitgeistPrimitivesAsset;
  readonly creator: AccountId32;
  readonly creation: ZeitgeistPrimitivesMarketMarketCreation;
  readonly creatorFee: u8;
  readonly oracle: AccountId32;
  readonly metadata: Bytes;
  readonly marketType: ZeitgeistPrimitivesMarketMarketType;
  readonly period: ZeitgeistPrimitivesMarketMarketPeriod;
  readonly deadlines: ZeitgeistPrimitivesMarketDeadlines;
  readonly scoringRule: ZeitgeistPrimitivesPoolScoringRule;
  readonly status: ZeitgeistPrimitivesMarketMarketStatus;
  readonly report: Option<ZeitgeistPrimitivesMarketReport>;
  readonly resolvedOutcome: Option<ZeitgeistPrimitivesOutcomeReport>;
  readonly disputeMechanism: ZeitgeistPrimitivesMarketMarketDisputeMechanism;
  readonly bonds: ZeitgeistPrimitivesMarketMarketBonds;
};
```

#### Saturated Rpc Markets [[ref]](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.SaturatedRpcMarket.html)

When you call the method `saturate` on a rpc market, it fetches the metadata
from external storage(IPFS) and conforms some of the native rpc data to look
more like the indexed data making them more interchangeable when passing them to
react components for example.

:::note

**This is the type returned from `Sdk<RpcContext>#model.markets.get|list`**

:::

```ts
const sdk: Sdk<RpcContext> = await create(batterystationRpc());
const market = (await sdk.model.markets.get(340)).unwrap()!;
const saturatedMarket: SaturatedRpcMarket = await market.saturate();

// Metadata is available on the market object.
saturatedMarket.slug;
saturatedMarket.question;
saturatedMarket.description;
saturatedMarket.tags;
```

### Market Methods [[ref]](https://zeitgeist.pm/sdk-next/types/_zeitgeistpm_sdk.MarketMethods.html)

Both indexed markets and rpc markets have access to transaction methods if the
context has access to the rpc node.

:::note

**This is applicable to markets returned from returned from
`Sdk<FullContext | RpcContext>#model.markets.get|list`**

:::

```ts
type MarketMethods = {
  approveMarket: (params: {
    signer: KeyringPair;
  }) => Promise<ISubmittableResult>;

  buyCompleteSet: (params: {
    signer: KeyringPair;
    amount: string | number | u128;
  }) => Promise<ISubmittableResult>;

  deploySwapPool: (params: {
    signer: KeyringPair;
    swapFee: string | number | u128;
    amount: string | number | u128;
    weights: Array<string | number | u128>;
  }) => ExtractableResult<E.IEither<Error, RpcPool>>;

  deploySwapPoolAndAdditionalLiquidity: (params: {
    signer: KeyringPair;
    swapFee: string | number | u128;
    amount: string | number | u128;
    weights: Array<string | number | u128>;
  }) => ExtractableResult<E.IEither<Error, RpcPool>>;

  disputeOutcome: (params: {
    signer: KeyringPair;
    outcome:
      | ZeitgeistPrimitivesOutcomeReport
      | { Categorical: number | u16 | Uint8Array }
      | { Scalar: number | u128 | Uint8Array };
  }) => Promise<ISubmittableResult>;

  redeemShares: (params: {
    signer: KeyringPair;
  }) => Promise<ISubmittableResult>;

  reportOutcome: (params: {
    signer: KeyringPair;
    outcome:
      | ZeitgeistPrimitivesOutcomeReport
      | { Categorical: number | u16 | Uint8Array }
      | { Scalar: number | u128 | Uint8Array };
  }) => Promise<ISubmittableResult>;

  sellCompleteSet: (params: {
    signer: KeyringPair;
    amount: number;
  }) => Promise<ISubmittableResult>;

  adminCleanUpPool: (params: {
    signer: KeyringPair;
    outcome:
      | ZeitgeistPrimitivesOutcomeReport
      | { Categorical: number | u16 | Uint8Array }
      | { Scalar: number | u128 | Uint8Array };
  }) => Promise<ISubmittableResult>;

  adminDestroyMarket: (params: {
    signer: KeyringPair;
  }) => Promise<ISubmittableResult>;

  adminMoveMarketToClosed: (params: {
    signer: KeyringPair;
  }) => Promise<ISubmittableResult>;

  adminMoveMarketToResolved: (params: {
    signer: KeyringPair;
  }) => Promise<ISubmittableResult>;
};
```
