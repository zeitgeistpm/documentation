---
id: using-zeitgeist-markets
title: Using Zeitgeist Markets
---

TODO Define base asset

## Assets on Zeitgeist

### The ZTG Token and Other Currencies

The primary asset on Zeitgeist is the _ZTG_ token. On the Battery Station test
network, this token is known as _ZBS_, but in SDK and CLI commands, and on this
page, both ZTG and ZBS are called ZTG.

ZTG may be used for placing bets in prediction markets (like USD in the examples
of the previous chapters). Outcome asset tokens will not redeem to 1\$ when a
market is resolved, but to 1 ZTG instead, and trading fees will be paid in ZTG.
Other currencies like [aUSD](https://acala.network/ausd) will be made available
for trading, as well.

Other uses of ZTG include governance, staking for dispute resolution and
collator selection, and bonding for various on-chain actions, most importantly
market creation. _These actions require ZTG and ZTG only._ Details follow below.

The total supply of ZTG at genesis is 100M. Each ZTG equal
$10^{10} = 10,\!000,\!000,\!000$ _Pennocks_, the smallest unit of currency on
Zeitgeist. Whenever amounts of ZTG are specified in the SDK or polkadot-js, they
are specified in Pennocks. See [Tokenomics](https://zeitgeist.pm/ztg) for
details.

### Outcome Asset Tokens

Recall that outcome asset tokens (or _outcome tokens_ for short) represent the
possible outcomes of a future event. For example the prediction market
"[James Webb Space Telescope](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope)
(JWST) launches on December 18" might have two outcome tokens, "The JWST does
launch on Dec. 18" and "The JWST does not launch on Dec. 18", which are
represented by on-chain tokens using ticker symbols like JWSTYES and JWSTNO.
(Two outcomes from the same market may not have the same ticker symbol, but
outcomes from separate markets may.)

### Liquidity Shares

Trading on Zeitgeist is facilitated by [liquidity pools](./liquidity.md). Those
who wish to provide liquidity to these pools may _join_ the pool with assets and
mint _liquidity pool shares_, which represent their total share in the pool's
liquidity. For example, if a pool's liquidity shares have a total issuance of
100 and Alice owns 10 liquidity pool shares, her share of the pool is 10%.

Once they have transferred the assets into the pool, the liquidity providers no
longer control those assets, but will receive fees when others swap them with
their own assets (usually ZTG) to compensate for the risk of being left holding
the losing outcome tokens (see [Resolving Markets and Redeeming Tokens]).

<!-- prettier-ignore -->
:::important
As liquidity provider for a prediction market, you are essentially betting
against the informants' ability to predict future outcomes.
:::

Anyone who owns liquidity pool shares may _exit_ the pool and receive back their
share of the pool's assets. The details of joining and exiting depend on the
market's scoring rule.

## Zeitgeist Markets

A prediction market on Zeitgeist is created using the `create_market` extrinsic.
The market requires the following data...

-   The _market type_ is either _categorical_ or _scalar_. See [prediction
    markets] for details.

-   The _creation type_ determines if the market is _permissionless_ or
    _advised_. See [Creation Type] for details.

-   The _oracle_ is a Zeitgeist address which is responsible for reporting the
    outcome, and deposits the _oracle bond_. This amount is paid in ZTG and is
    only returned to the market creator if the oracle has faithfully reported
    the market's outcome. If the oracle has failed to do so, the stake is
    slashed. See [disputes] for details.

    <!-- prettier-ignore -->
    :::important
    The market creator can specify _any_ address as oracle, but also provides
    the stake for the oracle. If the market creator specifies an unwitting
    oracle (by mistake or with malicious intent), the market creator will most
    likely lose their stake and the oracle will go unpunished.
    :::

-   The _market dispute mechanism_ is used to resolve disputes between users.
    See [disputes] for details.

-   The _scoring rule_ determines the automatic market maker that the market's
    pools use. The scoring rules are described in detail in [zeitgeist amms].

TODO Add link to UNIX time

-   The _period_ determines when a market opens and closes and is specified
    either in blocks or using UNIX timestamps (in _milliseconds_ since epoch).
    The Zeitgeist application allows users to comfortably set the period using
    human-readable dates.

The curret status of a market is described by the `status` field.
The market's initial status depends on the creation type and scoring rule:

- Advised markets are `Proposed`.
- Permissionless markets and approved advised markets with scoring rule
  `ScoringRule::CPMM` are `Active` or `Closed`
  depending on what their period is.
- Permissionless markets and approved advised markets with scoring rule
  `ScoringRule::RikiddoSigmoidEma` are `CollectingSubsidy`.

### Market Lifecycle


The market opens when the `start` block/timestamp is reached. If a liquidity
pool is deployed for the market during market hours or before, users can swap
assets and (depending on the scoring rule) may provide liquidity to the pool.

The market closes when the `end` block/timestamp is reached. This means that
swapping assets and providing liquidity is no longer allowed. Depending on the scoring rule, users may still be able to withdraw their liquidity from the pool, now that it is no longer used.

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

### Disputes

### Creation Type: Permissionless & Advised Markets

Th Zeitgeist network allow entirely _permissionless_ creation of market. Anyone
can create a new market, provided they place a _validity bond_ in ZTG. The size
of the bond is equal to the on-chain constant `ValidityBond`. The purpose of the
bond is to ensure that the market obeys the rules put in place by the Zeitgeist
team. It is returned to the market creator after the market is resolved.

If the user does not wish to place the validity bond, they may instead create
the market as _advised_ and only place a small _advisory bond_ in ZTG. A member
of the [advisory committee] then decides if the market is valid. Until this
decision is made, no liquidity pool may be deployed for the market and no full
sets may be bought or sold.

If the market is deemed valid, the advisory bond is returned to the creator and
liquidity pools may be deployed. If, on the other hand, the market violated the
rules or is invalid, the advisory bond is slashed. Should, for any reason, the
committee not reach a decision until the market ends, the advisory bond and
oracle bond are both returned to the creator.

TODO A page with all the committees! (called Governance)

TODO Where should rules be put? Main page? Documentation?

By default, a new market has no liquidity pool. Instead, the pool must either be
deployed by the market creator, or by some external liquidity provider. After
the pool is created, others may _join_ the liquidity pool by providing
additional liquidity. When deploying liquidity into a pool, a liquidity provider
will usually provide the same amount of full sets of outcome tokens as ZTG ($x$
of each outcome token and $x$ ZTG). The current minimum for $x$ is 100, making a
total value of 200 ZTG.

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

## The Life Cycle of a Zeitgeist Prediction Market

### Creating a Market

The market must be supplied with the following info:

-   A unique name
-   A question regarding a future event
-   A list of outcome tokens including ticker symbols
-   A Zeitgeist address that will serve as oracle (see below)
-   An _end date_ (at which the market will close), specified as date or by its
    end block
-   A detailed description, including info on what information the oracle will
    base its report and what each outcome tokens represents
-   Optional: The liquidity pool to deploy for the market

<!-- prettier-ignore -->
:::important
Every possible outcome must be represented by an outcome token. Often, it is a
good idea to include a catch-all token for catching unexpected outcomes. See
also
[Markets with More than Two Outcomes](prediction-markets.md#markets-with-more-than-two-outcomes).
:::

A common choice of oracle is any address controlled by the market creator.

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

## Zeitgeist AMMs

Zeitgeist supports two automatic market markets: CPMM (constant product market
maker), and Rikiddo, a novel _logarithmic market scoring rule_ (LMSR for short;
see [^1] for an introduction to LMSRs).

### CPMM

Our constant product market maker is based on the
[Balancer AMM](balancer.fi/whitepaper.pdf), which is a variation on the basic
$x \cdot y = \mathrm{const}$ formula which allows different assets to have
different _weights_, which define their impact on price.

Every asset $i$ has a _weight_ $w_i$, which is a number bounded by the on-chain
constants `MinWeight` and `MaxWeight` of the `swaps` pallet. The larger an
asset's weight is, the more valuable the asset is compared to other assets in
the pool. The _spot price_ for swapping asset $i$ against asset $j$ is

$$
    s\_{ij} = \frac{1}{1 - f} \cdot \frac{ \frac{b_i}{w_i} }{ \frac{b_j}{w_j} },
$$

where $b_i$ denotes the balance of asset $i$ and $f$ is the swap fee (a fraction
of $1$; $f = 0.03$ means a swap fee of 3%). Actual calculations of amounts
swapped in and out need to take slippage into account and result in more complex
formulas.

#### Prize Pool

On every market, outcome tokens may be _bought_ (minted) in _full sets_ by users
while the market is open (exactly one of each outcome token from the market) at
the exact price of 1 unit of the base asset plus transaction fee (so that every
outcome token is backed $1:(n-1)$ by tokens for the $(n-1)$ other outcomes). The
minted outcome tokens are transferred to the user's wallet. The BAS paid for the
mint, on the other hand, are placed in the market's _prize pool_. _All outcome
tokens are created by minting them in this fashion._

Minting full sets has an inverse process: If a user holds a full set of outcome
tokens, they may _burn_ (or _sell_) the full set and receive 1 ZTG from the
prize pool.

When a market is created, the prize pool is empty, and the balance of the prize
pool cannot be changed except by minting and burning full sets. These rules
guarantee the prize pool contains exactly 1 BAS for every full set of outcome
tokens in circulation. The purpose of these mechanics is to ensure that when the
market resolves, all tokens can be redeemed for BAS from the prize pool (for
details, see [Resolving Markets and Redeeming Tokens]), and that the prize pool
is empty after all tokens are redeemed.

For example, Alice has 3.7 ZTG in her wallet. She mints 3.5 full sets for the
James Webb Space Telescope market, pays 3.5 ZTG (which goes into the prize pool
of the JWST market) plus transaction fees, and receives 3.5 JWSTYES and 3.5
JWSTNO.

Bob, on the other hand, has 2.1 JWSTYES and 3.4 JWSTNO tokens. He decides to
destroy 2.1 full sets (leaving him with only 1.3 JWSTNO) and receive 2.1 ZTG
back from the prize pool. Note that Bob could not have destroyed any more full
sets, as he owns no more JWSTYES.

#### Trading

Zeitgeist's `swap` pallet offers the dispatches for executing swaps on these
pools:

-   `swap_exact_amount_in` lets the user specify the exact amount they want to
    swap into the pool while setting a `max_price` and a
    `minimum_asset_amount_out`; if slippage causes the spot price to slip above
    `max_price` or causes the amount received to slip below
    `minimum_asset_amount_out`, then it errors with `LimitOut`.

-   `swap_exact_amount_out` lets the user specify the exact amount they want to
    receive from the pool while setting a `max_price` and a
    `maximum_asset_amount_in`; if slippage causes the spot price to slip above
    `max_price` or causes the amount to pay to slip above
    `maximum_asset_amount_in`, then it errors with `LimitIn`.

There are two more limits that prohibit trading more than a certain percentage
of the balance of the pool: `MaxInRatio` and `MaxOutRatio`. They are currently
set to 30%, which means that trading 30% or more of a pool's balance is not
allowed. The dispatch will error with `MaxInRatio` or `MaxOutRatio` if this
occurs.

Swap fees are charged on the amount that is swapped into the pool. For example,
if Alice swaps in 10 aUSD for the YES outcome into the pool at a swap fee of
10%, then she will pay 10 aUSD, but receive the same amount of YES tokens as if
she swapped 9 aUSD into the pool at a swap fee of 0% (10 aUSD minus 10% equal 9
aUSD). Put differently, the LPs charge an extra 11.11% premium for using their
pool (10 aUSD instead of 9 aUSD for the same amount).

#### Deploying a Liquidity Pool

When deploying a new liquidity pool with this AMM, the user specifies the
`amount` of each token to add to the pool (the `amount` is the same for every
asset that goes into the pool, as that all balances are the same immediately
after the pool is created). The `amount` must be greater or equal to the pallet
constant `MinLiquidity`. Before creating a new pool, make sure that you have
`amount` of the base asset and have bought `amount` full sets using the
`buy_complete_set` dispatch!

The user may also specify the weights of the outcome tokens (the weight of the
base asset $w_{\mathrm{base}}$ will be set so that the spot prices of the
outcome tokens against the base asset sum to $1$). This allows them to control
the initial price of each outcome asset, thereby creating an "initial
prediction". The larger the weight, the higher the value.

For example, Alice wants to create a pool for a prediction market: _Who will win
the football game?_ The outcome tokens are: TEAMA, TEAMB, TIE, NONE (the NONE
tokens is a catch-all that the market resolves to if, for example, the game is
cancelled due to bad weather). First, she buys one hundred full sets of outcome
tokens from the market. Then she deploys a CPMM pool for the market with
`amount = 100` and the following weights: `[8, 8, 8, 1]`. This will cost her 200
ZTG (let's assume ZTG is the base asset of the pool) plus bonds. The pool will
contain 100 ZTG and 100 of each outcome token at the following prices:
TEAMA@0.32 ZTG, TEAMB@0.32 ZTG, TIE@0.32 ZTG, NONE@0.04 ZTG.

#### Providing Liquidity

When joining a liquidity pool, they also receive _liquidity shares_ (also known
as _liquidity pool shares_), the third and final asset on Zeitgeist, which
represent their share of the assets stored in the liquidity pool. Since the
market is liquid, the amount of shares a liquidity provider will receive cannot
be exactly determined before the transaction is made. However, they can specify
bounds on the amount, either as a minimum of shares to receive for specified
assets, or as the maximum assets they will provide for a specified amount of
shares.

The single-asset join/exit extrinsics are subject to the same `MaxInRatio` and
`MaxOutRatio` constraints as the trading extrinsics.

-   Joining/exiting the pool

### Rikiddo

<!-- prettier-ignore -->
:::important
Rikiddo is currently in development and not available on Zeitgeist or Battery
Station.
:::

## Advanced Topics

### Arbitrage on Zeitgeist

Zeitgeist's AMM, the Rikiddo scoring rule, does not guarantee that for any
market the sum of the prices of all outcome assets is approximately equal to 1
ZTG, or that the price of any outcome tokens remains below 1 ZTG. High prices
are indicators of low liquidity or a volatile market.

This creates opportunities for users to add or remove liquidity to profit from
arbitrage:

-   If the sum of a market's prices is greater than 1 ZTG, then a user can mint
    a full set for 1 ZTG and sell it to the liquidity pool at a price above 1
    ZTG (ignoring slippage and trading fees). This move will add liquidity to
    the market.
-   If the sum of a market's prices is less than 1 ZTG, then a user can buy one
    of each outcome token from the market for less than 1 ZTG and then burn the
    full set to receive 1 ZTG from the prize pool. This move will remove
    liquidity from the market.

### Changing the Ratio between Outcome Tokens in a Liquidity Pool

It is possible to add either varying weights of standard assets (the market's
outcome assets and ZTG) or other individual assets to any existing pool.

## Further reading

-   [Whisker17's Zeitgeist Beta App Guide](https://whisker17.github.io/APP-Guide/#/en/README)

<!-- Links -->

[trading on zeitgeist]: #trading-on-zeitgeist
[resolving markets and redeeming tokens]:
    #resolving-markets-and-redeeming-tokens
[trading on zeitgeist]: #trading-on-zeitgeist
[liquidity]: ./liquidity.md
[liquidity]: #liquidity
[resolving markets and redeeming tokens]:
    #resolving-markets-and-redeeming-tokens
[zeitgeist amms]: #zeitgeist-amms
[prediction markets]: ./prediction-markets.md

[^1] Abraham Othman, Tuomas Sandholm, David M. Pennock, Daniel M. Reeves,
[A practical liquidity-sensitive automated market maker](https://www.researchgate.net/publication/221445031_A_practical_liquidity-sensitive_automated_market_maker),
ACM Transactions on Economics and Computation 1(3), pp. 377-386 (2010)
