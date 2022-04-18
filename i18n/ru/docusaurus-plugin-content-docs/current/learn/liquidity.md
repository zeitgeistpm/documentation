---
id: liquidity
title: Liquidity
---

The _liquidity_ of a market describes how quickly an asset can be traded on the
market at a reasonable market price. Illiquid markets tend to suffer from large
price fluctuations when large amounts of assets are bought or sold and are slow
to execute trades. Liquid markets, on the other hand, experience only
insignificant changes in price from trades and can execute trades quickly.

For example, a market for a limited NFT collection of ten items is highly
illiquid. It is very often the case that no one is willing to sell or buy. There
is no market price to speak of. The floor price is the only available measure
for the value of the collection, and it will most likely change drastically
whenever a trade is executed. Real estate (tax, agents, attorneys) and
collectibles (shipping) are other examples of illiquid markets.

The New York Stock Exchange, on the other hand, is a highly liquid market. For
every asset, markets makers set buy and sell prices at which they are willing to
execute virtually any trade, and thus facilitate trading. Using modern
technology, assets can be bought and sold within seconds. The only downside for
investors is that market makers charge trading fees and/or make use of a bid/ask
spread (market makers sell higher than they buy), hoping to take a profit from
the trades.

On decentralized exchanges, liquidity is provided using liquidity pools, and
liquidity providers are rewarded with profits from liquidity mining. As users on
Zeitgeist interact with liquidity pools by trading and providing liquidity, and
may even create liquidity pools themselves, we describe these concepts in
detail. If you are already familiar this the notions of liquidity pool and
liquidity mining, you may want to skip this chapter or later return to it.

## Liquidity Pools

For various reasons, the type of market makers used on centralized exchanges
don't work on-chain. Instead, decentralized exchanges use liquidity pools and
automated market makers to provide liquidity to their markets.

Usually, a _liquidity pool_ (LP) holds balances of two or more assets, for
example ETH and USDT, and allows trading these assets for one another. For
example, when trading ETH/USDT, the user adds USDT to the pool and receives ETH
from the pool.

The price of each pair is determined by an _automated market maker_ (AMM), an
algorithm that computes the price of each asset in the pool according to
available trading data and/or price oracles.

### Example: Constant Product Market Maker

A particularly straightforward AMM and common example is Uniswap's
[constant product formula](https://docs.uniswap.org/protocol/V2/concepts/protocol-overview/how-uniswap-works)
for pools with two assets. Suppose we create a liquidity pool which (at
inception) holds 10 ETH and 40,000 USDT (these balances are usually determined
by the current price of ETH/USDT provided by some other source, in this case
4,000 USDT/ETH). We define $k$ as the product of the balances of the assets in
the pool ($\#A$ denotes the balance of A in the pool):

$$
k = \#\mathrm{ETH} \cdot \#\mathrm{USDT} = 10 \cdot 40,\!000 = 400,\!000.
$$

The rule defining the price of the pairs ETH/USDT and USDT/ETH is: _Trades must
always keep $k$ constant_, in other words: After a trade has gone through, the
product of the balances of the assets in the pool must remain unchanged (this is
not entirely correct due to the fees taken by the liquidity providers, see
below).

For example, after trading USDT for 1 ETH, the balance of USDT in the pool must
be

$$
\# \mathrm{USDT} = \frac{k}{\# \mathrm{ETH}} = \frac{400,\!000}{9} \approx 44,\!444 \, \mathrm{USDT}.
$$

This means that buying 1 ETH from the pool costs 4,444 USDT, and will leave the
pool with 9 ETH and approximately 44,444 USDT.

For the sake of simplicity, we've ignored fees in the discussion above. For
every trade in a market B/A, the liquidity pool charges 0.3% fees (paid in A).
The fees are added to the balance of A in the pool, but, instead of keeping $k$
constant, they are used to increase the value of $k$.

Thus, it costs approximately 13 USDT (0.3% of 4,444 USDT) in fees to execute the
trade above, and after the trade the pool will hold approximately 44,457 USDT,
increasing $k$ to 400,113.

## Low Liquidity and Slippage

You may have noticed that 1 ETH cost us 4,444 USDT instead of 4,000 USDT when
the pool was just created based on an oracle report of 4,000 USDT.

This phenomenon is called _slippage_ and is a side effect of low liquidity. If
trades are made whose size significantly change the balances in the pool (ten
percent in this case), the constant product formula causes the prices at which
the trade is executed to "slip" up or down.

If, instead of 10 ETH and 40,000 USDT, we had 100 ETH and 400,000 USDT in the
pool, the same trade would cause the price to "only" slip by 40 USDT. This shows
that higher amounts of liquidity create a more stable, less volatile market.

Slippage is a common phenomenon when market makers are involved, and may also
occur when placing trades on Zeitgeist.

## Liquidity Mining

The assets in the liquidity pools are provided by users called _liquidity
providers_. Usually, anyone who holds the required assets to do so can _enter_
(or _join_) a liquidity pool by placing their assets in the pool (on Uniswap, it
is required that the assets added to the pool preserve the ratio between the two
balances). The larger the pool, the larger the liquidity, and the smoother the
trades.

As compensation for _providing liquidity_, the liquidity providers usually
receive tokens (sometimes referred to as _LP tokens_) which represent their
share of the pool. The LP tokens can be burned by a provider in order to receive
back their share of the pool, usually in the hopes that through the collection
of trading fees that share has appreciated in value. This process of making
gains of providing liquidity is often referred to as _liquidity mining_.

One of the risks of liquidity mining is _impermanent loss_. In fact, if one of
the assets provided to a pool (ETH, for example) has appreciated in value on
another exchange (kraken, for example), this will result in _arbitrage_ (unless
the pool uses price oracles to automatically correct the price). An
_arbitrageur_ can now make an essentially risk-free trade by buying ETH from the
pool and selling it at kraken at the appreciated price. But this means that the
liquidity provider essentially sold their assets below market price.

However, this loss is _impermanent_ in the sense that if ETH depreciates back to
its original value, the loss is mitigated. The loss becomes "permanent" only if
the liquidity provider withdraws funds from the pool.

Prediction markets using the liquidity-sensitive automated market maker function
proposed by Othman-Sandholm-Pennock-Reeves (upon which the Rikiddo scoring rule
developed by Zeitgeist is based) leave plenty of opportunity for arbitrageurs.

## Further Reading and Viewing

Video tutorials on liquidity pools:

- [Finematics on Liquidity Pools](https://www.youtube.com/watch?v=cizLhxSKrAc)
- [Finematics on Impermanent Loss](https://www.youtube.com/watch?v=8XJ1MSTEuU0)

Some examples of liquidity pools:

- [Understanding Curve](https://resources.curve.fi/base-features/understanding-curve)
- [Karura protocol overview](https://wiki.acala.network/karura/defi-hub/swap/protocol-overview)

A fantastic article on automated market makers for prediction markets (for the
mathematically inclined):

- Abraham Othman, Tuomas Sandholm, David M. Pennock, Daniel M. Reeves,
  [A practical liquidity-sensitive automated market maker](https://www.researchgate.net/publication/221445031_A_practical_liquidity-sensitive_automated_market_maker),
  ACM Transactions on Economics and Computation 1(3), pp. 377-386 (2010)
