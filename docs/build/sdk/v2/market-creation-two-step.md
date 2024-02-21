# Adhoc Market and Pool Deployment

In this example we create a market and deploy a pool(with liquidity) for it in
two distinct steps/transactions.

### 1. Create the market

First we create the market, the step is very similar to the
[Market Creation Example](/docs/build/sdk/v2/market-creation) with the exception
that we do not supply the `pool` params, and that we have to supply the
`creationType` type.

```ts
import { KeyringPair } from "@polkadot/keyring/types";
import {
  batterystationRpc,
  create,
  CreateStandaloneMarketParams,
  evenWeights,
  RpcContext,
  Sdk,
  swapFeeFromFloat,
  ZTG,
} from "@zeitgeistpm/sdk";

/**
 * Initialize the SDK in full or rpc mode to be able to submit transactions to the chain.
 */
const sdk: Sdk<RpcContext> = await create(batterystationRpc());

/**
 * Get the signer from the wallet extension or other keyring.
 */
const signer: KeyringPair = getSignerSomehow();

/**
 * Params for creating a standalone market without pool.
 */
const params: CreateStandaloneMarketParams<typeof sdk> = {
  signer,
  waitForFinalization: false,
  baseAsset: { Ztg: null },
  disputeMechanism: "Authorized",
  creationType: "Permissionless",
  marketType: { Categorical: 2 },
  oracle: signer.address,
  period: { Timestamp: [Date.now(), Date.now() + 60 * 60 * 24 * 1000 * 2] },
  deadlines: {
    disputeDuration: 5000,
    gracePeriod: 200,
    oracleDuration: 500,
  },
  metadata: {
    __meta: "markets",
    question: "Creating a market and pool in two steps.",
    description: "Two step market creation.",
    slug: "two-step-market-example",
    categories: [
      { name: "yes", ticker: "Y" },
      { name: "no", ticker: "N" },
    ],
    tags: ["dev"],
  },
};

/**
 * Create market transaction and send it.
 */
const marketCreationResponse = await sdk.model.markets.create(params);

/**
 * Extracts the market from events in the block.
 */
const { market } = marketCreationResponse.saturate().unwrap();

/**
 * Print the results.
 */
console.log(`Market created with id: ${market.marketId}`);
```

[Read more about signing transactions.](/docs/build/sdk/v2/market-creation#2-init-market-creation-params)

### 2. Deploying Pool for the market with liquidity.

Here we submit a second transaction that deploys a swap pool for the market
created above and adds additional liquidity to it.

```ts
/**
 * In this second step we create a pool for the market.
 */
const poolCreationResponse = await market.deploySwapPoolAndAdditionalLiquidity({
  signer,
  amount: ZTG.mul(300).toString(),
  swapFee: swapFeeFromFloat(1).toString(),
  weights: evenWeights(2),
});

/**
 * Extracts the pool from events in the block.
 */
const pool = poolCreationResponse.saturate().unwrap();

/**
 * Print the results.
 */
console.log(`Pool created with id: ${pool.poolId}`);
```
