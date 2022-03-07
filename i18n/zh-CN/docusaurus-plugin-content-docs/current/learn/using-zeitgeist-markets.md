---
id: using-zeitgeist-markets
title: Using Zeitgeist Markets
---

## Assets and Markets on Zeitgeist

### The ZTG Token

The primary asset on Zeitgeist is the _ZTG_ token. On the Battery Station test
network, this token is known as _ZBS_, but in SDK and CLI commands, and on this
page, both ZTG and ZBS are called ZTG.

We use ZTG on Zeitgeist as currency for placing bets in prediction markets (like
USD in the examples of the previous chapters). Outcome asset tokens will not
redeem to 1\$ when a market is resolved, but to 1 ZTG instead, and trading fees
will be paid in ZTG.

Other uses of ZTG include governance, staking for dispute resolution and
collator selection, and bonding for various on-chain actions, most importantly
market creation. Details follow below. You may also be interested in the
detailed [Tokenomics](https://zeitgeist.pm/ztg) of ZTG.

### Outcome Asset Tokens

Recall that outcome asset tokens (or _outcome tokens_ for short) represent the
possible outcomes of a future event. For example the prediction market
"[James Webb Space Telescope](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope)
(JWST) launches on December 18" might have two outcome tokens, "The JWST does
launch on Dec. 18" and "The JWST does not launch on Dec. 18", which are
represented by on-chain tokens using ticker symbols like JWSTYES and JWSTNO.
(Two outcomes from the same market may not have the same ticker symbol, but
outcomes from separate markets may.)

### Trading on Zeitgeist

Trading on a prediction market on Zeitgeist is facilitated by the market's
liquidity pool. The pool contains balances of ZTG and of all outcome tokens of
the market. Users can trade their tokens with tokens stored in the pool: They
can buy outcome tokens from the pool with ZTG which is then added to the pool,
or sell outcome tokens to the pool for some of the pool's ZTG.

For example, if the pool contains 100 ZTG and 100 JWSTYES and Alice buys 3
JWSTYES at 0.5 ZTG, then Alice transfers 1.5 ZTG into the pool and receives 3
JWSTYES from the pool, leaving the pool with 101.5 ZTG and 97 JWSTYES (ignoring
transaction cost, trading fees and slippage).

Let's pretend that the automated market maker has now adjusted the price of
JWSTYES to 0.6 ZTG and Bob wants to sell 5 JWSTYES. He would receive 3 ZTG from
the pool and add 5 JWSTYES, leaving the pool at 98.5 ZTG and 102 JWSTYES
(ignoring transaction cost, trading fees and slippage).

Note that this means that trading can only happen when the liquidity pool is
sufficiently deep. If the pool is too shallow, some trades may be impossible
(Alice cannot buy 150 JWSTYES from the pool above) or may suffer from excessive
slippage (buying 50 JWSTYES from the pool above will most certainly cost more
than 25 ZTG).

<!-- TODO Link to the research page on Rikiddo! -->

Recall that the buy/sell prices of the assets are determined by an automated
market maker. Zeitgeist uses a novel AMM, the _Rikiddo scoring rule_. Rikiddo
guarantees that the price of each individual asset cannot exceed 1 ZTG. (Note
that buying an outcome asset for 1 ZTG or more is fairly unattractive, as each
unit of the asset could never be redeemed for more than the market price.)
However, there is no guarantee that the prices of all outcome assets sum to 1
ZTG. Usually, the prices will sum to _approximately_ 1 ZTG, but in markets with
shallow liquidity pools or in volatile markets, this is not to be expected. See
[Arbitrage on Zeitgeist](#arbitrage-on-zeitgeist) for more details.

<!-- prettier-ignore -->
:::important
The Zeitgeist Beta uses a
[constant product market maker](./liquidity.md#example-constant-product-market-maker)
instead of the Rikiddo scoring rule.
:::

### The Prize Pool

On every market, outcome tokens may be _minted_ (or _bought_) in _full sets_ by
users while the market is open (exactly one of each outcome token from the
market) at the exact price of 1 ZTG plus transaction fee (so that every outcome
token is backed $1:(n-1)$ by tokens for the $(n-1)$ other outcomes). The minted
outcome tokens are transferred to the user's wallet. The ZTG paid for the mint,
on the other hand, is placed in the market's _prize pool_. _All outcome tokens
are created by minting them in this fashion._

Minting full sets has an inverse process: If a user holds a full set of outcome
tokens, they may _burn_ (or _sell_) the full set and receive 1 ZTG from the
prize pool.

When a market is created, the prize pool is empty, and the balance of the prize
pool cannot be changed except by minting and burning full sets. These rules
guarantee the prize pool contains exactly 1 ZTG for every full set of outcome
tokens in circulation. The purpose of these mechanics is to ensure that when the
market resolves, all tokens can be redeemed for ZTG from the prize pool (for
details, see [Resolving Markets and Redeeming Tokens]), and that the prize pool
is empty after all tokens are redeemed.

<!-- prettier-ignore -->
:::important
The prize pool is separate from the market's liquidity pool, which will be
discussed further below.
:::

For example, Alice has 3.7 ZTG in her wallet. She mints 3.5 full sets for the
James Webb Space Telescope market, pays 3.5 ZTG (which goes into the prize pool
of the JWST market) plus transaction fees, and receives 3.5 JWSTYES and 3.5
JWSTNO.

Bob, on the other hand, has 2.1 JWSTYES and 3.4 JWSTNO tokens. He decides to
destroy 2.1 full sets (leaving him with only 1.3 JWSTNO) and receive 2.1 ZTG
back from the prize pool. Note that Bob could not have destroyed any more full
sets, as he owns no more JWSTYES.

### Liquidity Pools and Shares

We already mentioned in [Trading on Zeitgeist] that trading in a prediction
markets on Zeitgeist is facilitated by the market's liquidity pool, and that the
pool contains balances of ZTG and of all outcome tokens of the market.

But by default, a new market has no liquidity pool. Instead, the pool must
either be deployed by the market creator, or by some external liquidity
provider. After the pool is created, others may _join_ the liquidity pool by
providing additional liquidity. When deploying liquidity into a pool, a
liquidity provider will usually provide the same amount of full sets of outcome
tokens as ZTG ($x$ of each outcome token and $x$ ZTG). The current minimum for
$x$ is 100, making a total value of 200 ZTG.

Once they have transferred the assets into the pool, the liquidity providers no
longer control those assets, but will receive fees when others swap them with
their own assets (usually ZTG) to compensate for the risk of being left holding
the losing outcome tokens (see [Resolving Markets and Redeeming Tokens]).

<!-- prettier-ignore -->
:::important
In the Zeitgeist Beta, liquidity providers do not receive fees.
:::

When joining a liquidity pool, they also receive _liquidity shares_ (also known
as _liquidity pool shares_), the third and final asset on Zeitgeist, which
represent their share of the assets stored in the liquidity pool. Since the
market is liquid, the amount of shares a liquidity provider will receive cannot
be exactly determined before the transaction is made. However, they can specify
bounds on the amount, either as a minimum of shares to receive for specified
assets, or as the maximum assets they will provide for a specified amount of
shares.

Liquidity providers may, at any time, destroy their liquidity shares to withdraw
their share of the pool.

For example, lets say the JWST market has no liquidity pool yet and Alice wishes
to deploy a pool. First she mints 100 full sets of outcome tokens, so she pays
100 ZTG into the prize pool of the market and receives 100 JWSTYES and 100
JWSTNO. Then she transfers these outcome tokens plus 100 ZTG into the pool. The
whole endeavor costs her 200 ZTG plus transaction costs and earns her 100
liquidity shares.

Suppose now that the market ends and the balances of the pool are the following:
63 JWSTYES, 89 JWSTNO, and 120 ZTG. The balance of ZTG has increased from
trading fees. After market close, Alice withdraws her funds: The outcome tokens
and 120 ZTG. If the JWST did not launch on December 18, then she can redeem the
89 JWSTNO for 89 ZTG from the prize pool. This means that she's made a gain of 9
ZTG for supplying liquidity to the pool. If, on the other hand, the JWST does
launch December 18, Alice is left holding 120 ZTG and 63 JWSTYES (redeemable for
63 ZTG), and, thus, Alice got rekt to the tune of 17 ZTG (but many traders will
have made some profit).

<!-- prettier-ignore -->
:::important
As liquidity provider for a prediction market, you are essentially betting
against the informants' ability to predict future outcomes.
:::

## The Life Cycle of a Zeitgeist Prediction Market

### Creating a Market

The market must be supplied with the following info:

- A unique name
- A question regarding a future event
- A list of outcome tokens including ticker symbols
- A Zeitgeist address that will serve as oracle (see below)
- An _end date_ (at which the market will close), specified as date or by its
  end block
- A detailed description, including info on what information the oracle will
  base its report and what each outcome tokens represents
- Optional: The liquidity pool to deploy for the market

<!-- prettier-ignore -->
:::important
Every possible outcome must be represented by an outcome token. Often, it is a
good idea to include a catch-all token for catching unexpected outcomes. See
also
[Markets with More than Two Outcomes](prediction-markets.md#markets-with-more-than-two-outcomes).
:::

The market creator specifies a Zeitgeist address which is responsible for
reporting the outcome. This address is called the _oracle_. The market creator
must vouch for the oracle by staking a fixed amount of ZTG. If the oracle does
not submit the report on time, the stake is slashed.

A common choice of oracle is any address controlled by the market creator.

<!-- prettier-ignore -->
:::important
The market creator can specify _any_ address as oracle, but also provides the
stake for the oracle. If the market creator specifies an unwitting oracle (by
mistake or with malicious intent), the market creator will lose their stake and
the oracle will go unpunished.
:::

As mentioned earlier markets have no liquidity pool by default. The market
creator can choose to deploy the liquidity pool during market creation or create
the market without a liquidity pool, hoping that someone else will deploy a pool
for the market.

<!-- prettier-ignore -->
:::important
The market creator will sign three transactions when deploying a liquidity pool
during market creation: Creating the market and bonding the stake for the
oracle, minting the outcome tokens, and joining the liquidity pool.
:::

### During Market Hours

The market opens immediately after it is created. If no liquidity pool was
deployed, trading as described in [Trading on Zeitgeist] is impossible, but
users may still mint/burn full sets of tokens.

The market remains open until the end date is reached. The market will then
become _inactive_ and trading will no longer be possible.

### After Hours: Reporting an Outcome

The oracle of the market is expected to submit which outcome actually occurred
within a fixed frame of time. If the oracle fails to submit the report in time,
the market creators stake will be slashed, and all addresses will be able to
submit their report.

<!-- prettier-ignore -->
:::important
In the Zeitgeist Beta, the oracle has 24 hours to report the outcome.
:::

Once the report is submitted, the status of the market changes from inactive to
_reported_.

### Disputes

Every time a report is submitted (by the oracle or a stand-in), the market is
not resolved for another 24 hours. During this period of time, other users can
submit a _dispute_ if they believe that the report is incorrect.

To do so, they stake some ZTG and report the outcome they believe to be correct.
The 24 hour window for disputes is then reset, and other users (including the
oracle) can dispute the new report.

If the dispute cannot be resolved, it is escalated to the
[Decentralized Court](./court.md).

<!-- prettier-ignore -->
:::important
During the Beta campaign, only _simple disputes_ are enabled. This means that
the outcome of a market can be disputed a maximum of six times (with a 24h
window, except the last one), each time with a higher stake. The report of the
sixth dispute will be used to resolve the market. There is no decentralized
court in the beta.
:::

For example, suppose that the oracle of the JSWT market reports JWSTYES at
8:00AM, December 19. If no disputes are opened until 8:00AM, December 20, the
market is resolved to JWSTYES. If Alice is convinced that this is incorrect, she
may stake ZTG to dispute the outcome and report JWSTNO. If she does this at,
say, 16:00 PM, December 19, then a new window for disputes opens, and other
users could dispute the new report until 16:00 PM, December 20. If no other
disputes are opened, the market will resolve to JWSTNO at 16:00 PM, December 20.

### Resolving Markets and Redeeming Tokens

Once the window for disputes is closed, the market is _resolved_ to the last
reported outcome. All outcome tokens except for the winning outcome token are
immediately burned. Traders who hold winning tokens can now _redeem_ them for 1
ZTG apiece by signing a transaction. There is no time limit for redeeming
winning outcome tokens.

For example, Alice holds 3 JWSTYES and Bob holds 5 JWSTNO. If the market
resolves to JWSTNO, then Alice's 3 JWSTYES are burned and she is left with
nothing, while Bob can redeem his 5 JWSTNO for 5 ZTG from the prize pool.

<!-- prettier-ignore -->
:::important
Redeeming tokens is different from selling tokens. Tokens cannot be traded after
market close, but they can be redeemed for 1 ZTG each once the market is resolved.
:::

Furthermore, as soon as the market is resolved, those who staked ZTG in a
dispute for the token which the market eventually resolved to receive their
stakes tokens back, while the stake of those who staked for other tokens are
slashed.

## Advanced Topics

### Arbitrage on Zeitgeist

Zeitgeist's AMM, the Rikiddo scoring rule, does not guarantee that for any
market the sum of the prices of all outcome assets is approximately equal to 1
ZTG, or that the price of any outcome tokens remains below 1 ZTG. High prices
are indicators of low liquidity or a volatile market.

This creates opportunities for users to add or remove liquidity to profit from
arbitrage:

- If the sum of a market's prices is greater than 1 ZTG, then a user can mint a
  full set for 1 ZTG and sell it to the liquidity pool at a price above 1 ZTG
  (ignoring slippage and trading fees). This move will add liquidity to the
  market.
- If the sum of a market's prices is less than 1 ZTG, then a user can buy one of
  each outcome token from the market for less than 1 ZTG and then burn the full
  set to receive 1 ZTG from the prize pool. This move will remove liquidity from
  the market.

### Liquidity Pools for Multiple Markets

It is possible for a liquidity provider to deploy their own pool, involving any
kind of assets and not referenced by a specific market. The reason _not_ to do
this is that they would then be taking the risk of providing liquidity, without
optimally minimizing that risk, as the total liquidity would be fragmented
between different pools. When a pool has less liquidity, it is less liquid which
tends to a lose-lose outcome for all involved. It is recommended, instead, only
to use the market's _canonical pool_, which will be referenced by the market
itself in its on-chain `marketData`.

### Changing the Ratio between Outcome Tokens in a Liquidity Pool

It is possible to add either varying weights of standard assets (the market's
outcome assets and ZTG) or other individual assets to any existing pool.

## Further reading

- [Whisker17's Zeitgeist Beta App Guide](https://whisker17.github.io/APP-Guide/#/en/README)

<!-- Links -->

[trading on zeitgeist]: #trading-on-zeitgeist
[resolving markets and redeeming tokens]:
  #resolving-markets-and-redeeming-tokens
[trading on zeitgeist]: #trading-on-zeitgeist
[liquidity]: ./liquidity.md
[liquidity]: #liquidity
[resolving markets and redeeming tokens]:
  #resolving-markets-and-redeeming-tokens
