# Zeitgeist SDK Documentation

![sdk version](https://img.shields.io/github/v/tag/zeitgeistpm/tools?label=sdk)

The Zeitgeist SDK is written in `Typescript` and can be found here:
[@zeitgeistpm/sdk](https://github.com/zeitgeistpm/tools/tree/main/packages/sdk).
You can do the following to install it directly into your javascript based
project: `npm i @zeitgeistpm/sdk` or `yarn add @zeitgeistpm/sdk`.

:::tip

All `amount` parameters are in Pennock, so need to be multiplied by 10^10, which
means if you want to transfer 1 ZTG, you should fill in `10000000000`

:::

## Get Markets Datas

| Function Name                                                                    | Description                                                                        |
| -------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------- |
| [getAllMarketIds](/docs/build/sdk/v1/indexs#getallmarketids)                     | get all market IDs in the Zeitgeiest.                                              |
| [getAllMarkets](/docs/build/sdk/v1/indexs#getallmarkets)                         | get all market in the Zeitgeiest.                                                  |
| [getMarketCount](/docs/build/sdk/v1/indexs#getmarketcount)                       | get market counts in the Zeitgeiest.                                               |
| [fetchMarketData](/docs/build/sdk/v1/indexs#fetchmarketdata)                     | fetch specify market's infomation by id in the Zeitgeiest.                         |
| [queryMarket](/docs/build/sdk/v1/indexs#querymarket)                             | query market by GraphQL in the Zeitgeiest.                                         |
| [queryMarketsCount](/docs/build/sdk/v1/indexs#querymarketscount)                 | query counts of markets for specified filter options by GraphQL in the Zeitgeiest. |
| [filterMarkets](/docs/build/sdk/v1/indexs#filtermarkets)                         | get all market in the Zeitgeiest.                                                  |
| [filterMarketData](/docs/build/sdk/v1/market#filtermarketdata)                   | Populate only selected attributes from the market data defined using filter.       |
| [indexTransferRecipients](/docs/build/sdk/v1/indexs#indextransferrecipients)     | query subsquid indexer for market data with pagination in the Zeitgeiest.          |
| [getMarketDataForPoolsList](/docs/build/sdk/v1/indexs#getMarketDataForPoolsList) | get market datas by using pool's data                                              |
| [getEndTimestamp](/docs/build/sdk/v1/market#getendtimestamp)                     | get timestamp at the end of the market period.                                     |
| [fetchDisputes](/docs/build/sdk/v1/indexs#fetchpooldata)                         | get all market IDs in the Zeitgeiest.                                              |
| [getDisputes](/docs/build/sdk/v1/market#getdisputes)                             | fetch disputes for this market using unique identifier `marketId`.                 |

---

## Get Pools && Assets Datas

| Function Name                                                            | Description                                                                   |
| ------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
| [getPoolId](/docs/build/sdk/v1/market#getpoolid)                         | get pool id to be used for fetching data using `sdk.models.market.getPool()`. |
| [getPool](/docs/build/sdk/v1/market#getpool)                             | recreate swap pool for this market using data fetched with `poolId`.          |
| [fetchPoolData](/docs/build/sdk/v1/indexs#fetchpooldata)                 | get specify pool infomation in the Zeitgeiest.                                |
| [filterPools](/docs/build/sdk/v1/indexs#filterPools)                     | filter some pools from Zeitgeist                                              |
| [queryAllActiveAssets](/docs/build/sdk/v1/indexs#queryallactiveassets)   | query all active assets from subsquid indexer in the Zeitgeiest.              |
| [getAssetsForPoolsList](/docs/build/sdk/v1/indexs#getAssetsForPoolsList) | get assets datas by using pool's data                                         |
| [getAssetPriceHistory](/docs/build/sdk/v1/indexs#getAssetPriceHistory)   | get assets' historic prices                                                   |
| [assetSpotPricesInZtg](/docs/build/sdk/v1/indexs#assetspotpricesinztg)   | find prices at a particular block in the Zeitgeiest.                          |
| [assetSpotPricesInZtg](/docs/build/sdk/v1/swap#assetspotpricesinztg)     | find prices at a particular block using unique identifier.                    |
| [getSpotPrice](/docs/build/sdk/v1/swap#getspotprice)                     | get spot price in the specified block.                                        |
| [fetchPoolSpotPrices](/docs/build/sdk/v1/swap#fetchpoolspotprices)       | fetch spot prices of specified blocks.                                        |
| [sharesId](/docs/build/sdk/v1/swap#sharesid)                             | fetch all shares' ids.                                                        |

---

## Get Accounts Datas

| Function Name                                                                      | Description                      |
| ---------------------------------------------------------------------------------- | -------------------------------- |
| [getAccountBalances](/docs/build/sdk/v1/indexs#getAccountBalances)                 | get balance of specific account. |
| [getAccountHistoricalValues](/docs/build/sdk/v1/indexs#getAccountHistoricalValues) | get accounts' historic datas     |
| [accountId](/docs/build/sdk/v1/swap#accountid)                                     | fetch account id in this pool.   |

---

## Create Markets Transactions

| Function Name                                                                                | Description                                                                                                                                                                      |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createCategoricalMarket](/docs/build/sdk/v1/indexs#createcategoricalmarket)                 | create a categorical market in the Zeitgeiest.                                                                                                                                   |
| [createCpmmMarketAndDeployAssets](/docs/build/sdk/v1/indexs#createcpmmmarketanddeployassets) | Create a market using CPMM scoring rule, buy a complete set of the assets used and deploy within and deploy an arbitrary amount of those that's greater than the minimum amount. |
| [createScalarMarket](/docs/build/sdk/v1/indexs#createscalarmarket)                           | create a scalar market in the Zeitgeiest.                                                                                                                                        |
| [deploySwapPool](/docs/build/sdk/v1/market#deployswappool)                                   | create swap pool for this market via `api.tx.predictionMarkets.deploySwapPoolForMarket(marketId, weights)`.                                                                      |
| [assetSpotPricesInZtg](/docs/build/sdk/v1/market#assetspotpricesinztg)                       | find prices at a particular block using unique identifier.                                                                                                                       |
| [buyCompleteSet](/docs/build/sdk/v1/market#buycompleteset)                                   | buy a complete set of outcome shares for the market.                                                                                                                             |
| [sellCompleteSet](/docs/build/sdk/v1/market#sellcompleteset)                                 | sell/destroy a complete set of outcome shares for the market.                                                                                                                    |
| [reportOutcome](/docs/build/sdk/v1/market#reportoutcome)                                     | report an outcome for the market.                                                                                                                                                |
| [dispute](/docs/build/sdk/v1/market#dispute)                                                 | submit a disputed outcome for the market.                                                                                                                                        |
| [redeemShares](/docs/build/sdk/v1/market#redeemshares)                                       | redeem the winning shares for the market.                                                                                                                                        |
| [approve](/docs/build/sdk/v1/market#approve)                                                 | approve the `Proposed` market that is waiting for approval from the advisory committee.                                                                                          |
| [reject](/docs/build/sdk/v1/market#reject)                                                   | reject the `Proposed` market that is waiting for approval from the advisory committee.                                                                                           |
| [cancelAdvised](/docs/build/sdk/v1/market#canceladvised)                                     | allow the proposer of the market that is currently in a `Proposed` state to cancel the market proposal.                                                                          |
| [joinPool](/docs/build/sdk/v1/swap#joinpool)                                                 | join pool.                                                                                                                                                                       |
| [poolJoinWithExactAssetAmount](/docs/build/sdk/v1/swap#pooljoinwithexactassetamount)         | join exact asset amount to the pool.                                                                                                                                             |
| [joinPoolMultifunc](/docs/build/sdk/v1/swap#joinpoolmultifunc)                               | join pool.<br/>Three substrate join_pool_xxx functions in one                                                                                                                    |
| [exitPool](/docs/build/sdk/v1/swap#exitpool)                                                 | retrieve a given set of assets from pool to the signer.                                                                                                                          |
| [swapExactAmountIn](/docs/build/sdk/v1/swap#swapexactamountin)                               | swap a given `assetAmountIn` of the `assetIn/assetOut` pair to pool.                                                                                                             |
| [swapExactAmountOut](/docs/build/sdk/v1/swap#swapexactamountout)                             | swap a given `assetAmountOut` of the `assetIn/assetOut` pair to pool.                                                                                                            |

---

## Utils

| Function Name                                                          | Description                                                          |
| ---------------------------------------------------------------------- | -------------------------------------------------------------------- |
| [getBlockInfo](/docs/build/sdk/v1/common#getblockinfo)                 | get block info in Zeitgeist.                                         |
| [getChainInfo](/docs/build/sdk/v1/common#getchaininfo)                 | get chain info about Zeitgeiest.                                     |
| [getBlockData](/docs/build/sdk/v1/indexs#getblockdata)                 | get block infomation by blockhash in the Zeitgeiest.                 |
| [currencyTransfer](/docs/build/sdk/v1/indexs#currencytransfer)         | transfer specified asset from self to any account in the Zeitgeiest. |
| [toJSONString](/docs/build/sdk/v1/market#tojsonstring)                 | convert market object into string.                                   |
| [toFilteredJSONString](/docs/build/sdk/v1/market#tofilteredjsonstring) | convert market object into string with filters.                      |
