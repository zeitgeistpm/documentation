---
id: using-zeitgeist-markets
title: Using Zeitgeist markets
---

In order for prediction markets to be liquid, we need to be able to exchange
assets.

#### Assets

An asset in Zeitgeist could be:

- units of the ZTG token (on the Battery Park testnet, this token is known as
  ZBP but in SDK and CLI commands, and in this page, both ZTG and ZBP and called
  ZTG)
- An outcome asset, representing 1 ZTG only _once_ the market has finalised and
  _if_ the corresponding outcome is what the market resolved to.
- A liquidity share, representing a proportion of the liquidity remaining in a
  pool (available pools and available markets will usually correspond 1:1). When
  the share is created, it will be equivalent to 1 ZTG, but this value will
  fluctuate.

#### Outcome Assets

Markets will have a finite number of outcome assets, which are determined when
the market is created.

###### Discrete (categorical and combinatorial) Markets

For categorical and combinatorial markets, the possible outcome assets
correspond 1:1 to the possible outcomes which the market may resolve to. When
the market resolves, one of the outcome assets will be redeemable for 1 ZTG per
token, and the others wil lose their value.

###### Scalar Markets

For scalar markets, the outcome assets are known as `Long` and `Short`, though
the outcome that the market will eventually resolve to will be a number. Scalar
markets, instead of the categories (eg `Yes'/'No`, `Under`/`Over` or
`Barcelona`/`Madrid`), the continuous outcome _range_ is set at market creation,
defined by an upper and lower numerical bound. The outcome range specified by
these bounds does _not_ necessarily cover all possible outcomes. While it is
unlikely that scalar market will likely resolve exactly to one of the bounds,
the eventual resolved outcome would usually be within the range, but may instead
be below or above it. In that case, one of the `Long` and `Short` outcome assets
would be redeemable to 1 ZTG (and the other would have no value) but in the more
usual case when a scalar market resolves to a number within the outcome range,
both `Long` and `Short` outcome assets will be redeemable at between 0 and 1
ZTG, proportional to where the resolved outcome lies along the range (and
totalling 1 ZTG).

###### Purchasing outcome assets

All assets are swappable for all other assets, though the usual means of
swapping would be (ZTG <-> Outcome Asset Token/s), (Outcome Asset Token/s <->
Liquidity Shares) or (Liquidity Shares -> ZTG) The simplest way to buy exposure
to the outcome of a market is to go to the market's liquidity pool and _swap_
your ZTG for the relevant outcome asset. You should pay less than 1 ZTG per
outcome asset token (of course you can swap more or less than 1) and, if the
outcome is on a categorical market, if the market resolves in your favour, you
can redeem the token for 1 ZTG. If the market is scalar, or you wish to swap out
before the market is resolved, you can redeem (for resolved scalar markets) or
swap (for any market with liquidity) the outcome token for between 0 and 1 ZTG.

#### Liquidity Shares and Liquidity Pools

Markets can be created by anyone, and anyone owning outcome assets can redeem
them once the market has resolved. Other than these two examples, though, all
trading activity within Zeitgeist takes place within a _liquidity pool_.
Locating the pool for a market should be transparent, as usually there will only
be one pool relevant to any given market. We call this the canonical pool, or
market pool.

###### Creating a market's liquidity pool

Creating this pool is separate step after market creation but pools will usually
be created straight away by the market creator (but may instead or additionally
be created by any liquidity provider). To create the pool, a provider (or market
creator) must first mint a _complete set_ of outcome assets for a given market,
not just those that they favour (the current minimum is 100 ZTG). This can be
done by any one and more than once, but is the only way to create new outcome
tokens, so that every outcome token which exists is backed 1:_(n-1)_ by tokens
for the _(n-1)_ other outcomes. So for each ZTG provided, the complete set the
liquidity provider receives in exchange consists of equal amounts of tokens of
each outcome in the market. The value of any complete set of _x_ tokens will
always remain equal to, and directly redeemable for _x_ ZTG.

###### Funding a market's liquidity pool

When deploying liquidity into a pool, a liquidity provider will usually provide
_a complete set, plus ZTG_, so that calling the `poolJoin` function with an
amount of `100` will transfer in 100 of each outcome tokens, and 100 ZTG, making
a total value of 200 ZTG liquidity provided. They may alternatively provide in a
single specific asset. We call this _joining_ or _entering_ the pool, even if
the liquidity provider already has assets in the pool. Once they have
transferred in assets, the liquidity providers no longer control those assets
but will receive fees when others swap them with their own assets (usually ZTG).
The liquidity providers receive fees from these swaps to compensate for the risk
they take, of being left holding the losing outcome assets. Until they are
swapped, though, the original assets are still owned indirectly by the liquidity
providers, as they remain in the pool and the pool is owned by the liquidity
providers through _liquidity shares_ (aka _liquidity pool shares_). Liquidity
shares are received by the liquidity providers when they join the pool, in
exchange for the assets they add. Since the market is liquid, the amount of
shares a liquidity provider will receive cannot be exactly determined before the
transaction is made. However, they can specify `bounds` on the amount, either as
a minimum shares to receive for specified assets, or as the maximum assets to
give up for a specified amount of shares.

###### Canonical pools and alternatives

It is possible for a liquidity provider to deploy their own pool, involving any
kind of assets and not referenced by a specific market. The reason _not_ to do
this is that they would then be taking the risk of providing liquidity, without
optimally minimising that risk, as the total liquidity would be fragmented
between different pools. When a pool has less liquidity, it is less liquid which
is a lose-lose outcome for all involved. It is recommended, instead, only to use
the market's _canonical pool_, which will be referenced by the market itself in
its on-chain `marketData`. It is possible to add either varying weights of
standard assets (the market's outcome assets and ZTG) or other individual assets
to any existing pool.

:)
