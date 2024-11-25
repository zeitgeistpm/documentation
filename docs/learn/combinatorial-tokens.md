# Combinatorial Betting

Zeitgeist's combinatorial tokens allow users to combine outcome tokens of
several markets and trade these combined tokens in a single liquidity pool.

Much of Zeitgeist's implementation of combinatorial tokens is based on pioneer
work done by Gnosis done
[here (documentation)](https://docs.gnosis.io/conditionaltokens/) and
[here (implementation)](https://github.com/gnosis/conditional-tokens-contracts).

## Collection and Positions

Given a market with outcomes `A`, `B` and `C`, we can form _collections_ of
these outcomes. A collection is notated as, for example, `A|B`, and specifies a
bet that `A` _or_ `B` will happen.

A _position_ is a collection combined with a collateral token. Currently, the
type of collateral is still tied to markets on Zeitgeist, but that might change
in the future and you'll be allowed to use any collateral with any market.

Positions are used to actually make bets on more complicated claims about the
future.

## Splits and Merges

Suppose we have two markets with outcome tokens `A`, `B`, `C` and `X`, `Y`, `Z`,
resp. Their tokens can be combined to the following tokens: `A&X`, `A&Y`, `A&Z`,
`B&X`, `B&Y`, `B&Z`, `C&X`, `C&Y`, `C&Z`. A bet on the token `A&X` is a bet that
both `A` _and_ `X` occur (we'll interpret the meaning of `A&X` in case one or
both markets is a scalar market below in the section _Redeeming_).

In fact, we can even go further and combine positions from both markets into
_split positions such as `(A|B)&Z`, which signifies that `A` or `B` \_and_ `Z`
will occur.

Split collections are obtained by taking a position such as `(A|B)` of one of
the markets and specifying a partition of the outcomes of the other market, such
as `(X|Y)` and `Z` (the partition must cover all outcomes and there may be no
duplicates). Splitting `x` units of `(A|B)` using the partition `(X|Y), Z`
results in `x` units of the following tokens: `(A|B)&(X|Y)` and `(A|B)&Z`.

Splitting can even involve more complicated tokens. For example, the position
`(A|B)&(X|Y)` may further be split into `(A|B)&(X|Y)&U` and `(A|B)&(X|Y)&V` if
there is a market with outcomes `U`, `V`.

Merging is the opposite process. For example, `x` units of `(A|B)&(X|Y)` and
`(A|B)&Z` may be combined into `x` units of `(A|B)`.

## Redeeming

If a user owns a position involving multiple markets, such as `(A|B)&X` and only
one of the markets is resolved (say, the market with `A`, `B`, `C`), then they
may want cash out the part of the position. This is where payout vectors come
in.

The _payout vector_ of a resolved prediction market determines the value of each
outcome token of that market. For a market with outcome tokens
$x_1, \ldots, x_n$, the payout vector $(p_1, \ldots, p_n)$ specifies how much
collateral one unit of each outcome token redeems for.

For example, if a categorical market with three outcomes resolves to the second
outcome, the payout vector is $(0, 1, 0)$. If a scalar market with range
$[1, 3]$ resolves to $2.5$, then the payout vector is $(.75, .25)$ assuming that
the first outcome is _Long_.

The payout of a collection like `(A|B)` is the sum of the payouts of each
individual outcome token. Suppose that the payout vector for the market with
`A`, `B`, `C` is `(0, 1, 0)`, then `(A|B)` has a payout of `1`.

Returning to the idea of redeeming tokens, `x` units of `(A|B)&X` can be
redeemed for `x` units of `X` since the payout of `(A|B)` is equal to `1`. To
take a more complex example, if we have a scalar market with tokens `L` and `S`
(long and short) and a payout vector of `(.6, .4)` and we want to redeem `x`
units of `L&(X|Y)`, then we receive `.6` times `x` units of `(X|Y)`.

## Combinatorial Betting

Buying individual outcomes of a combinatorial market allows the user to bet on
more specialzied outcomes (A _and_ B will happen), but the true strength of
combinatorial markets lies is making bets on contingencies (if A occurrs, then
so will B).

The following example is taken from [H13]. Let $D$ denote the event that the
Democratic Party wins the 2016 U.S. Presidential election and let $H$ denote the
event that Hillary Clinton is nominated as the Dem's candidate. The pairs of
securities $(D, \neg D)$ (i.e. "Pays 1\$ if $D$" and "Pays 1\$ if not $D$") and
$(H, \neg H)$ are traded on separate markets, but can be combined into a single
market by using _splits_.

If you know how buying complete sets works on Zeitgeist, you already know one
example of a split: The collateral token is split into a set of tokens which,
when the markets resolves, will have the same value as the collateral token. By
the same reasoning fashion, we can split non-collateral tokens like "Pays 1\$ if
$D$" into "Pays 1\$ if $D$ and $H$" and "Pays 1\$ if $D$ and not $H$". For the
sake of simplicity, we denote these tokens by $D$, $D \land H$ and
$D \land \bar H$, resp. By combining the two markets above, we create a new
market with four assets: $D \land H$, $D \land \bar H$, $\bar D \land H$ and
$\bar D \land \bar H$.

Using splits, agents can now bet on correlations between the events $D$ and $H$.
For example, to bet that the Dems win if Hillary is nominated, the agent would
split their collateral into $x$ units of $H$ and $\bar H$, then split these
units into $x$ units of $H \land D$ and $H \land \bar D$, then sell their units
of $H \land \bar D$ for more $H \land D$. There are three possible outcomes:

- Hillary is nominated and wins the election. Each unit of $H \land D$ pays 1\$.
  The agent makes a profit as they own more than $x$ units.
- Hillary is nominated and loses the election. All assets that the agent holds
  are worthless.
- Hillary is not nominated. Each unit of $\bar H$ pays 1\$. The agent receives
  their buy-in of $x$ back (the bet is essentially declared void).

The spot price of this swap is equal to the
[conditional probability](https://en.wikipedia.org/wiki/Conditional_probability)
$P(D|H)$ predicted by the market. We denote the trade described above by
$H \Rightarrow D$.

To prevent arbitrage opportunities, buying such a composite asset must not move
the price of uninvolved outcomes. For example, betting that $D$ holds if $H$
holds should leave the price of $\bar H$ unchanged. After all, the agent is
betting on what happens contingent on $H$; they're not making any claims as to
how likely $H$ is to occur. This is summarized in the _modularity property_
defined by Hanson in [H03a]:

> Consider the case of an agent who bets with a market scoring rule, and bets
> only on the event $A$ given the event $B$. That is, this agent gains assets of
> the form “Pays \$1 if $A$ and $B$ hold”, in trade for assets of the form “Pays
> \$1 if $B$ holds and $A$ does not. [...] In general, depending on the
> particular market scoring rule, such a bet might change any probability
> estimate $p_i$, and thus change any event probability
> $p(C) = \sum\_{i \in C} p_i$. It seems preferable, however, for this bet to
> change as little as possible besides $p(A|B)$ (and of course
> $p(\bar A|B) = 1 − p(A|B)$).

(The market maker implemented in zrml-neo-swaps has that property.)

A fundamental idea is that trades made on prediction markets are not so much
absolute bets ("I bet $10 that Hillary will win at 1:1 odds"), but rather that
trades are made to "correct" the forecast of the market by changing the prices
of the outcome. The agent executing the trade pays a price to do so, but is
rewarded if the prediction is closer to the truth that the current one.

One could say that the agent buying $H \Rightarrow D$ claims that $H \land D$ is
undervalued and $H \land \bar D$ is overvalued, and that $\bar H \land D$ and
$\bar H \land \bar D$ are correctly priced or the agent doesn't know how to
profitably change their price.

Viewed from this angle, a _combinatorial bet_ divides the assets in a
combinatorial pool into three categories: _buy_ (the assets the agent thinks are
undervalued), _sell_ (the assets the agent thinks are overvalued) and _keep_
(the assets whose prices the agent can't or won't change).

## Bibliography

- - [H03a] R. Hanson, "Logarithmic Market Scoring Rules for Modular
    Combinatorial Information Aggregation," The Journal of Prediction Markets,
    vol. 1, no. 1, 2003. [Online]. Available:
    [https://doi.org/10.5750/jpm.v1i1.417](https://doi.org/10.5750/jpm.v1i1.417)
- [H13] R. Hanson, "Shall We Vote on Values, But Bet on Beliefs?," The Journal
  of Political Philosophy, vol. 21, no. 2, pp. 151-178, 2013.
