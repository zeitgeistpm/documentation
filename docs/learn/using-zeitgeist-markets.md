---
id: using-zeitgeist-markets
title: Using Zeitgeist Markets
---

## Assets on Zeitgeist

### The ZTG Token and Other Currencies

The native token on Zeitgeist is _ZTG_. On the Battery Station test network,
this token is known as _ZBS_, but in SDK and CLI commands, and on this page,
both ZTG and ZBS are called ZTG.

ZTG may be used as _collateral_ (or _base asset_) in prediction markets. This
means it's used as liquidity and for placing bets (like USD in the examples of
the previous chapters); outcome asset tokens will not redeem for \$1 when a
market is resolved, but for 1 ZTG instead, and trading fees will be paid in ZTG.
Other select foreign assets can be used as collateral as well.

Other uses of ZTG include governance, staking for dispute resolution
(particularly in the [Decentralized Court]) and collator selection, and bonding
for various on-chain actions, most importantly market creation. _These actions
require ZTG and ZTG only._ Details follow below.

The total supply of ZTG at genesis was 100M. Each ZTG equal
$10^{10} = 10,\!000,\!000,\!000$ _Pennocks_, the smallest unit of currency on
Zeitgeist. Whenever amounts of ZTG are specified in the SDK or polkadot-js, they
are specified in Pennocks.

### Outcome Asset Tokens

Recall that outcome asset tokens (or _outcome tokens_ for short) represent the
possible outcomes of a future event. For example the prediction market
"[James Webb Space Telescope](https://en.wikipedia.org/wiki/James_Webb_Space_Telescope)
(JWST) launches on December 18" might have two outcome tokens, "Yes" and "No". A
market on the winner of the
[Kentucky Derby](https://en.wikipedia.org/wiki/Kentucky_Derby) would have an
outcome token for each horse.

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
share of the pool's assets.

## Zeitgeist Markets

A prediction market on Zeitgeist is created using the `create_market` extrinsic.
The market requires the following data...

- The _market type_ is either _categorical_ or _scalar_. See [prediction
  markets] for details.

- The _creation type_ determines if the market is _permissionless_ or _advised_.
  See [Creation Type] for details.

- The _oracle_ is a Zeitgeist address which is responsible for reporting the
  outcome, and deposits the _oracle bond_. This amount is paid in ZTG and is
  only returned to the market creator if the oracle has faithfully reported the
  market's outcome. If the oracle has failed to do so, the stake is slashed. See
  [disputes] for details.

  <!-- prettier-ignore -->
  :::important
  The market creator can specify _any_ address as oracle, but also provides
  the stake for the oracle. If the market creator specifies an unwitting
  oracle (by mistake or with malicious intent), the market creator will most
  likely lose their stake and the oracle will go unpunished.
  :::

- The _dispute mechanism_ is used to resolve disputes between users. See
  [disputes] for details.

- The _scoring rule_ determines the automatic market maker that the market's
  pools use. There's currently only one scoring rule available on Zeitgeist.

- The _period_ determines when a market opens and closes and is specified either
  in blocks or using [UNIX timestamps](https://en.wikipedia.org/wiki/Unix_time)
  (in _milliseconds_ since epoch). The Zeitgeist application allows users to
  comfortably set the period using human-readable dates.

- The _grace period_ (may be zero) specified the number of blocks after the
  market has closed during which all activity on the market is halted. This
  allows us to stop trading without immediately allowing the oracle to hand in a
  report.

The curret status of a market is described by the `status` field. The market's
initial status depends on the creation type. These phases are described in
detail in the upcoming sections, but we provide a simple overview at this point.

After their period has ended, all markets are first closed and then enter the
second stage of their lifecycle where they undergo a grace period, if
configured. During this grace period, all trading and market activity is
suspended, allowing for a cooldown before the resolution process begins.
Following this, the designated oracle is required to report the outcome of the
market. This reported outcome is crucial, as it is the basis for the settlement
of bets and trades that occurred within the market.

However, this outcome is not necessarily final. There is an opportunity for
disputes if participants believe the oracle's report is inaccurate or biased.
The specific details of this dispute process are outlined in another section,
focusing on the mechanics and timelines for raising and resolving disputes.

Once the dispute period has elapsed without any successful challenges, or after
any disputes have been conclusively resolved, the market reaches its final
resolution stage. At this point, the outcome as reported by the oracle or as
determined through the dispute resolution process is considered final.
Participants can then redeem their outcome tokens based on this final result,
effectively settling all positions taken in the market.

### Creation Type: Permissionless & Advised Markets

The Zeitgeist network allows the _permissionless_ creation of markets. Anyone
can create a new market, provided they place a _validity bond_ in ZTG. The
purpose of the bond is to ensure that the market obeys the rules put in place by
the Zeitgeist team. It is returned to the market creator after the market is
resolved. A permissionless market that violates the [market creation rules] may
be _removed from the app without warning_.

If the user does not wish to place the validity bond, they may instead create
the market as _advised_ and only place a smaller _advisory bond_. The [Advisory
Committee] then decides if the market is valid. Until this decision is made, no
liquidity pool may be deployed for the market and no complete sets may be bought
or sold.

If the market is deemed valid according to the [market creation rules], the
advisory bond is returned to the creator and liquidity pools may be deployed.
If, on the other hand, the market violated the rules or is invalid, the advisory
bond is slashed or the user is asked to change the market before it is approved.
Should, for any reason, the Advisory Committee not reach a decision until the
market ends, the advisory bond and oracle bond are both returned to the creator.

### Market Lifecycle

The market opens when the starting block/timestamp is reached. If a liquidity
pool is deployed for the market during market hours or before, users can swap
assets and may provide liquidity to the pool.

The market closes when the ending block/timestamp is reached. This means that
swapping assets and providing liquidity is no longer allowed, but users are
allowed to remove their liquidity now that it is no longer used.

The oracle of the market is expected to submit which outcome actually occurred
within a fixed frame of time, the _reporting period_. If the oracle fails to
submit the report in time, the market creators stake will be slashed, and any
address will be able to submit a report as an outsider.

Once the report is submitted, the status of the market changes from _closed_ to
_reported_.

### Disputes

When a report is submitted (by the oracle or an
[outsider](./using-zeitgeist-markets.md)), the market is not resolved for a
certain window of time called the _dispute period_. When a participant believes
the outcome reported by the oracle is incorrect, they have the option to
initiate a dispute. This process starts with the deposit of a bond in ZTG,
serving as a guarantee of the disputant's conviction in their claim. The dispute
mechanism is modular, allowing for the implementation of various approaches to
handle these disagreements.

Upon the initiation of a dispute, the market enters a special state where the
reported outcome is effectively put on hold. The dispute mechanism, as defined
in the market's rules, then takes over. This may involve additional rounds of
voting, expert arbitration, or other methods to reassess the reported outcome.

If the dispute is resolved in favor of the disputant, their bond is returned,
and the market outcome is adjusted accordingly. However, if the dispute is
deemed unjustified, the bond is forfeited. This system ensures that disputes are
raised only when there are genuine concerns about the market's outcome,
maintaining the integrity and reliability of the market. More on that in the
bonds section of the [Using Zeitgeist Markets] page.

Throughout this process, the market’s participants are kept informed, and the
mechanisms ensure transparency and fairness, critical for maintaining trust in
the market's operations and outcomes.

The default dispute mechanism used on Zeitgeist's app is the [Decentralized
Court]. The other option that's currently available is the _authorized_
mechanism, which delegates the decision over the dispute to the Advisory
Committee.

### Resolving Markets and Redeeming Tokens

Once the window for disputes is closed, the market is _resolved_ to the last
reported outcome. All outcome tokens except for the winning outcome token are
immediately burned. Traders who hold winning tokens can now _redeem_ them for 1
ZTG apiece by signing a transaction. There is no time limit for redeeming
winning outcome tokens.

For example, Alice holds 3 "Yes" and Bob holds 5 "No". If the market resolves to
"No", then Alice's 3 "Yes" are burned and she is left with nothing, while Bob
can redeem his 5 "No" for 5 ZTG from the prize pool.

<!-- prettier-ignore -->
:::important
Redeeming tokens is different from selling tokens. Tokens cannot be traded after
market close, but they can be redeemed for one unit of collateral each once the market is resolved.
:::

Furthermore, as soon as the market is resolved, those who staked ZTG in a
dispute for the token which the market eventually resolved to receive their
stakes tokens back, while the stake of those who staked for other tokens are
slashed.

### Bonds

There are four types of bonds utilized by prediction markets on Zeitgeist:
_creation_, _oracle_, _outsider_ and _dispute_ bonds. Bonds are deemed _settled_
when they are entirely unreserved or slashed.

- The _creation bond_ is reserved by the market creator at the time of market
  creation. Its size varies depending on whether the market's creation type is
  advised or permissionless, with the latter requiring a larger amount. If the
  market is advised, the creation bond is unreserved upon market approval or if
  the market period expires without receiving either approval or rejection. If
  the market is rejected, a portion of the bond is slashed, and the remaining
  part is unreserved. The specific portion to be slashed is determined by the
  `AdvisoryBondSlashPercentage` parameter. Conversely, if the market is created
  permissionlessly, the creation bond is unreserved upon the market's
  resolution. Regardless of the scenario, the creation bond serves to ensure the
  market creator's appropriate conduct.

- The _oracle bond_ is reserved by the market creator during market creation. It
  is unreserved upon the market's resolution if the oracle provided an honest
  report, confirmed as true by dispute or undisputed. If the oracle failed to
  provide a report or if it submitted a false report that was later disputed,
  the bond is transferred to the disputant or the outsider, resp. (see below).

- The _outsider bond_ is reserved by a user, referred to as the _outsider_, if
  they submit a report after the oracle failed to do so within the report period
  deadline. The outsider bond's settlement process mirrors that of the oracle
  bond. If the outsider's report was honest, the bond is returned, and the
  outsider also receives the oracle bond as a reward. If the outsider's report
  is later found to be false through a dispute, the bond is transferred to the
  disputant.

- The _dispute bond_ is reserved by a user, the _disputant_, upon submitting a
  dispute. If the dispute is justified and the original report is proven false,
  the dispute bond is unreserved, and the disputant is rewarded with the oracle
  and the outsider bond if available. If the dispute is unjustified, the bond is
  slashed.

## Advanced Topics

### The Prize Pool

On every market, outcome tokens may be minted in _complete sets_ by users while
the market is open (exactly one of each outcome token from the market) at the
exact price of one unit of the market's base asset (see [the ztg token and other
currencies]). The collateral paid for the mint is placed in the market's _prize
pool_. _All outcome tokens are created by minting them in this fashion._
Complete sets may also be destroyed. For every complete set destroyed the user
receives one unit of collateral back from the prize pool.

When a market is created, the prize pool is empty, and the balance of the prize
pool cannot be changed except by minting and burning complete sets. These rules
guarantee the prize pool contains exactly one unit of the base asset for every
complete set of outcome tokens in circulation. This way the winning outcome
token is backed 1:1 in collateral.

The prize pool should not be confused with the market's liquidity pool, which is
described further below.

For example, Alice has 3.7 ZTG in her wallet. She mints 3.5 complete sets for
the James Webb Space Telescope market, pays 3.5 ZTG (which goes into the prize
pool of the JWST market) plus transaction fees, and receives 3.5 "Yes" and 3.5
"No".

Bob, on the other hand, has 2.1 "Yes" and 3.4 "No" tokens. He decides to destroy
2.1 complete sets (leaving him with only 1.3 "No") and receive 2.1 ZTG back from
the prize pool. Note that Bob could not have destroyed any more complete sets,
as he owns no more "Yes".

### The Liquidity Pool

Zeitgeist supports a constant function market maker called DLMSR, which is based on Robin Hanson's DLMSR, a variation on the basic $x \cdot y = \mathrm{const}$ formula.

By default, a new market has no liquidity pool. Instead, the pool must either be
deployed by the market creator, or by some external liquidity provider. After
the pool is created, others may _join_ the liquidity pool by providing
additional liquidity. For details on the function of the liquidity pool, see https://github.com/zeitgeistpm/zeitgeist/blob/main/zrml/neo-swaps/README.md.

Note that this means that trading can only happen when the liquidity pool is
sufficiently deep. If the pool is too shallow, some trades may be impossible
(Alice cannot buy 150 "Yes" from the pool above) or may suffer from excessive
slippage (buying 50 "Yes" from the pool above will most certainly cost more than
25 ZTG).

## Further reading

- [Whisker17's Zeitgeist Beta App Guide](https://whisker17.github.io/APP-Guide/#/en/README)

<!-- Links -->

[advisory committee]: ./governance.md#advisory-committee
[using zeitgeist markets]: ./using-zeitgeist-markets
[market creation rules]: ./market-rules.md
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
[decentralized court]: ./court.md
[the ztg token and other currencies]: #the-ztg-token-and-other-currencies

[^1] Abraham Othman, Tuomas Sandholm, David M. Pennock, Daniel M. Reeves,
[A practical liquidity-sensitive automated market maker](https://www.researchgate.net/publication/221445031_A_practical_liquidity-sensitive_automated_market_maker),
ACM Transactions on Economics and Computation 1(3), pp. 377-386 (2010)
