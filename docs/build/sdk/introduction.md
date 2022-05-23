# Zeitgeist SDK Documentation

![sdk version](https://img.shields.io/github/v/tag/zeitgeistpm/tools?label=sdk)

## Get Markets Datas

| Function Name                                                            | Description                                                                        |
| ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| [getAllMarketIds](/build/sdk/indexs#getallmarketids)                     | get all market IDs in the Zeitgeiest.                                              |
| [getAllMarkets](/build/sdk/indexs#getallmarkets)                         | get all market in the Zeitgeiest.                                                  |
| [getMarketCount](/build/sdk/indexs#getmarketcount)                       | get market counts in the Zeitgeiest.                                               |
| [fetchMarketData](/build/sdk/indexs#fetchmarketdata)                     | fetch specify market's infomation by id in the Zeitgeiest.                         |
| [queryMarket](/build/sdk/indexs#querymarket)                             | query market by GraphQL in the Zeitgeiest.                                         |
| [queryMarketsCount](/build/sdk/indexs#querymarketscount)                 | query counts of markets for specified filter options by GraphQL in the Zeitgeiest. |
| [filterMarkets](/build/sdk/indexs#filtermarkets)                         | get all market in the Zeitgeiest.                                                  |
| [filterMarketData](/build/sdk/market#filtermarketdata)                   | Populate only selected attributes from the market data defined using filter.       |
| [indexTransferRecipients](/build/sdk/indexs#indextransferrecipients)     | query subsquid indexer for market data with pagination in the Zeitgeiest.          |
| [getMarketDataForPoolsList](/build/sdk/indexs#getMarketDataForPoolsList) | get market datas by using pool's data                                              |
| [getEndTimestamp](/build/sdk/market#getendtimestamp)                     | get timestamp at the end of the market period.                                     |
| [fetchDisputes](/build/sdk/indexs#fetchpooldata)                         | get all market IDs in the Zeitgeiest.                                              |
| [getDisputes](/build/sdk/market#getdisputes)                             | fetch disputes for this market using unique identifier `marketId`.                 |

---

## Get Pools && Assets Datas

| Function Name                                                    | Description                                                                   |
| ---------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| [getPoolId](/build/sdk/market#getpoolid)                         | get pool id to be used for fetching data using `sdk.models.market.getPool()`. |
| [getPool](/build/sdk/market#getpool)                             | recreate swap pool for this market using data fetched with `poolId`.          |
| [fetchPoolData](/build/sdk/indexs#fetchpooldata)                 | get specify pool infomation in the Zeitgeiest.                                |
| [filterPools](/build/sdk/indexs#filterPools)                     | filter some pools from Zeitgeist                                              |
| [queryAllActiveAssets](/build/sdk/indexs#queryallactiveassets)   | query all active assets from subsquid indexer in the Zeitgeiest.              |
| [getAssetsForPoolsList](/build/sdk/indexs#getAssetsForPoolsList) | get assets datas by using pool's data                                         |
| [getAssetPriceHistory](/build/sdk/indexs#getAssetPriceHistory)   | get assets' historic prices                                                   |
| [assetSpotPricesInZtg](/build/sdk/indexs#assetspotpricesinztg)   | find prices at a particular block in the Zeitgeiest.                          |
| [assetSpotPricesInZtg](/build/sdk/swap#assetspotpricesinztg)     | find prices at a particular block using unique identifier.                    |
| [getSpotPrice](/build/sdk/swap#getspotprice)                     | get spot price in the specified block.                                        |
| [fetchPoolSpotPrices](/build/sdk/swap#fetchpoolspotprices)       | fetch spot prices of specified blocks.                                        |
| [sharesId](/build/sdk/swap#sharesid)                             | fetch all shares' ids.                                                        |

---

## Get Accounts Datas

| Function Name                                                              | Description                      |
| -------------------------------------------------------------------------- | -------------------------------- |
| [getAccountBalances](/build/sdk/indexs#getAccountBalances)                 | get balance of specific account. |
| [getAccountHistoricalValues](/build/sdk/indexs#getAccountHistoricalValues) | get accounts' historic datas     |
| [accountId](/build/sdk/swap#accountid)                                     | fetch account id in this pool.   |

---

## Create Markets Transactions

| Function Name                                                                        | Description                                                                                                                                                                      |
| ------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [createCategoricalMarket](/build/sdk/indexs#createcategoricalmarket)                 | create a categorical market in the Zeitgeiest.                                                                                                                                   |
| [createCpmmMarketAndDeployAssets](/build/sdk/indexs#createcpmmmarketanddeployassets) | Create a market using CPMM scoring rule, buy a complete set of the assets used and deploy within and deploy an arbitrary amount of those that's greater than the minimum amount. |
| [createScalarMarket](/build/sdk/indexs#createscalarmarket)                           | create a scalar market in the Zeitgeiest.                                                                                                                                        |
| [deploySwapPool](/build/sdk/market#deployswappool)                                   | create swap pool for this market via `api.tx.predictionMarkets.deploySwapPoolForMarket(marketId, weights)`.                                                                      |
| [assetSpotPricesInZtg](/build/sdk/market#assetspotpricesinztg)                       | find prices at a particular block using unique identifier.                                                                                                                       |
| [buyCompleteSet](/build/sdk/market#buycompleteset)                                   | buy a complete set of outcome shares for the market.                                                                                                                             |
| [sellCompleteSet](/build/sdk/market#sellcompleteset)                                 | sell/destroy a complete set of outcome shares for the market.                                                                                                                    |
| [reportOutcome](/build/sdk/market#reportoutcome)                                     | report an outcome for the market.                                                                                                                                                |
| [dispute](/build/sdk/market#dispute)                                                 | submit a disputed outcome for the market.                                                                                                                                        |
| [redeemShares](/build/sdk/market#redeemshares)                                       | redeem the winning shares for the market.                                                                                                                                        |
| [approve](/build/sdk/market#approve)                                                 | approve the `Proposed` market that is waiting for approval from the advisory committee.                                                                                          |
| [reject](/build/sdk/market#reject)                                                   | reject the `Proposed` market that is waiting for approval from the advisory committee.                                                                                           |
| [cancelAdvised](/build/sdk/market#canceladvised)                                     | allow the proposer of the market that is currently in a `Proposed` state to cancel the market proposal.                                                                          |
| [joinPool](/build/sdk/swap#joinpool)                                                 | join pool.                                                                                                                                                                       |
| [poolJoinWithExactAssetAmount](/build/sdk/swap#pooljoinwithexactassetamount)         | join exact asset amount to the pool.                                                                                                                                             |
| [joinPoolMultifunc](/build/sdk/swap#joinpoolmultifunc)                               | join pool.<br/>Three substrate join_pool_xxx functions in one                                                                                                                    |
| [exitPool](/build/sdk/swap#exitpool)                                                 | retrieve a given set of assets from pool to the signer.                                                                                                                          |
| [swapExactAmountIn](/build/sdk/swap#swapexactamountin)                               | swap a given `assetAmountIn` of the `assetIn/assetOut` pair to pool.                                                                                                             |
| [swapExactAmountOut](/build/sdk/swap#swapexactamountout)                             | swap a given `assetAmountOut` of the `assetIn/assetOut` pair to pool.                                                                                                            |

---

## Utils

| Function Name                                                  | Description                                                          |
| -------------------------------------------------------------- | -------------------------------------------------------------------- |
| [getBlockInfo](/build/sdk/common#getblockinfo)                 | get block info in Zeitgeist.                                         |
| [getChainInfo](/build/sdk/common#getchaininfo)                 | get chain info about Zeitgeiest.                                     |
| [getBlockData](/build/sdk/indexs#getblockdata)                 | get block infomation by blockhash in the Zeitgeiest.                 |
| [currencyTransfer](/build/sdk/indexs#currencytransfer)         | transfer specified asset from self to any account in the Zeitgeiest. |
| [toJSONString](/build/sdk/market#tojsonstring)                 | convert market object into string.                                   |
| [toFilteredJSONString](/build/sdk/market#tofilteredjsonstring) | convert market object into string with filters.                      |
