---
id: prediction-markets
title: Prediction Markets
---

Prediction markets are openly traded markets that trade assets which are linked
to different potential future outcomes. The purpose of prediction markets is to
aggregate information from a diverse set of independent actors. Prediction
markets have been shown in numerous studies to have more accurate prediction
capabilities than other methods such as polls. The reason for this is that they
require the actors trading in the markets (also known as _informants_) to put
stake in the game and allows them to profit if they correctly predict a future
outcome - while risking loss if their predictions are incorrect.

The examples presented here are based on the examples in R. Hanson's watershed
paper _Shall We Vote on Values, But Bet on Beliefs?_.[^1]

[^1]:
    [Shall We Vote on Values, But Bet on Beliefs?](https://www.researchgate.net/publication/277294676_Shall_We_Vote_on_Values_But_Bet_on_Beliefs),
    The Journal of Political Philosophy, 21(2), pp. 151–178 (2013).

## Categorical Prediction markets

In its simplest form, a prediction market tries to predict the probability of a
particular outcome $D$ of a future event. For example, the future event might be
the U.S. presidential election of 2016 (for the sake of this example, imagine
that it's early 2016) and $D$ might be "The Democratic Party wins the 2016 U.S.
presidential election".

To aggregate information about the probability of $D$, a centralized institution
(the _bank_) sells pairs of the following assets at 1\$: "Worth 1\$ if $D$",
"Worth 1\$ if not $D$". These assets are called _outcome asset tokens_
(sometimes referred to as _binary options_). Each token represents a possible
_outcome_ of the election.

While the market is open, these slips are sold to the actors of the market by
the bank. The price of the individual assets will be decided by the market
makers who provide liquidity to the market.

Before the market ends, a date for its _end_ is defined. For example, the Iowa
Electronic Markets'
[2016 U.S. Presidential Election Markets](https://iemweb.biz.uiowa.edu/markets/pres16.html),
in which traders could bet on which of the major parties wins a greater share of
the popular vote in the 2016 election, opened on November 19, 2014 and closed
November 10, 2016.[^2]

[^2]: Note that this closing date is _after_ the end of the election.

When the market closes, the outcome must be reported. For centralized prediction
markets, this is usually done by the bank, and the report is based on trusted
news media.[^3] On decentralized prediction markets, the report is issued by an
entity called _oracle_, which must be incentivized to provide correct
information (or discouraged from providing incorrect information).

[^3]:
    For example, this is the strategy for the 2016 U.S. Presidential Election
    Markets (see
    [here](https://iemweb.biz.uiowa.edu/markets/pr_Pres16_VS.html)):

    > The election data posted on the New York Times official website at 5pm CST
    > on Wednesday, November 9, 2016, or as soon after as available, will be the
    > official source used to determine payoffs. In the event that the two
    > parties' popular votes are not reported at that website by midnight,
    > Wednesday, November 9, 2016, the Washington Post official website will
    > become the official source. Should neither source report popular vote by
    > midnight Wednesday, the information reported in the print version of the
    > New York Times on Thursday, November 10, 2016, or as soon thereafter as
    > reported, will be used. In the event that the election is delayed or
    > postponed, liquidation will take place in a timely fashion after the close
    > of polling sites for the popular vote.

    > The judgment of the IEM Governors and Directors will be final in resolving
    > questions of interpretation and typographical or clerical errors."

Once the outcome is reported (for the presidential election: $D$ is false), the
_winning outcome_ (in this case "Worth 1\$ if not $D$") can be traded in for 1\$
at the bank, while the _losing outcome_ ("Worth 1\$ if $D$") is rendered
worthless. _It's winner-take-all!_ We say that the market _resolves_ to "Worth
1\$ if not $D$".

<!-- prettier-ignore -->
:::important
After market close, the price of each token is irrelevant to the trader. Only
the correct outcome asset token has any remaining value.
:::

For example, suppose Alice bought 10 shares of "Worth 1\$ if not $D$" at 0.6\$
and Bob bought 5 shares of "Worth 1\$ if $D$" at 0.4\$. Then November 10, 2016
comes along and the Republican Party is declared the winner of the election.
Thus, Bob's shares are rendered worthless, while Alice may trade her 10 shares
in for 10\$, leaving her a fat profit of 4\$ (minus trading fees, see below).

But how did the market reveal information about the future event? The price at
which actors are willing to buy "Worth 1\$ if $D$" measures the actors'
confidence that $D$ will occur. In fact, the price of one share of "Worth 1\$ if
$D$" in USD is considered to be equal to the market's prediction of the
probability that the event $D$ occurs. If, for example, actors are willing to
buy shares of "Worth 1\$ if $D$" at 0.7\$, then the markets predicts the
probability of D to be about 70%, and the probability of "not $D$" to be about
30%.[^4]

[^4]:
    The reasoning here is that if the probability of outcome $D$ is $x$, then
    the expected profit of buying the outcome token for the price of $y$ is
    $x - y$. Thus, ignoring trading fees, a trader who believes that the
    probability of $D$ is $x$ should expect to make a profit by buying at a
    price lower than $x$ and selling at a price higher than $x$. So the price
    should, in the long run, approach $x$.

The longer a market is active, the more refined the prediction is expected to
be. The prediction at market close should reflect all information available to
the traders over the course of the market. If a market remains open while the
events on whose outcome bets are made unfold, then the value of the outcome to
which the market will eventually resolve will likely approach 1\$, and all other
outcomes will become nearly worthless. For example, during the IEM's 2016 U.S.
Presidential Election Markets, the average price of DEM16_WTA, the token for
"\$1 if the Democratic Party nominee receives the majority of popular votes cast
for the two major parties in the 2016 U.S. Presidential election, \$0
otherwise", at market close was 0.973\$ (see also
[2016 US Presidential Election Winner Takes All Market](https://iemweb.biz.uiowa.edu/graphs/graph_Pres16_WTA.cfm)).

Depending on the market maker strategy and the correctness of the aggregated
information, the bank might suffer a loss. In practice, the market makers will
take trading fees from the actors to mitigate these risks.[^5]

[^5]:
    If a bank suffers a loss from providing liquidity to a market, this loss may
    be viewed as the cost of receiving the information aggregated by the actors.

### Markets with More than Two Outcomes

In general, a prediction market can involve any (finite) number of assets. For
example, during the
[Kusama Derby](https://blog.zeitgeist.pm/zeitgeist-presents-the-kusama-parachain-derby/),
three prediction markets opened on the Zeitgeist Battery Park chain: _Who will
win the first/second/third parachain slot on Kusama?_ The tokens of these
markets:

- Karura
- Moonriver
- Khala
- Robonomics
- Kilt
- Equilibrium
- Hydra
- Shiden
- Darwinia
- None

The _None_ token is a catch-all option representing the following outcomes:

- None of the other teams listed win the slot
- The parachain auction does not complete in time before the market's end date
  of June 30, 2021
- More than one team split the slot with different lease periods
- Any other unforeseen outcome

The collection of outcome tokens should be _mutually exclusive_ (no two outcomes
may both occur) and _exhaustive_ (there must be a token for every possible
outcome). A good rule of thumb when designing a prediction market that does not
ask a yes-no question is to define a _catch-all_ token (like _None_ from the
Kusama Derby), which wins if the outcome matches no other token. In fact, as the
bidding on the last parachain slot only ended July 6, 2021, and the Kusama Derby
ended on June 30, 2021, the reported outcome of the third market of the Kusama
Derby was _None_, even though Khala did eventually win the third parachain slot
auction.

<!-- TODO Link Zeitgeist Closed Beta -->

During the Zeitgeist Closed Beta, a market for a football game between the
Minnesota Vikings and the Dallas Cowboys had the following tokens:

- Cowboys win by 6 or less points
- Cowboys win by 7 or more points
- Vikings win by 6 or less points
- Vikings win by 7 or more points
- Tied
- Cancelled due to bad weather or other unforeseen events

## Scalar Prediction Markets

The type of market described above is a _discrete_ prediction market in which
outcomes form clear _categories_. For betting on the value of some quantity or
measurement, _scalar prediction markets_ are used. For example, "What's the
Tesla stock price on Monday at market close?" Unlike discrete prediction
markets, these are not winner-take-all.

For scalar markets, the outcome assets are known as "Long" and "Short", though
the outcome that the market will eventually resolve to will be a number. In
scalar markets, instead of the categories (e.g. Yes/No, Under/Over, etc.), the
continuous _outcome range_ is set at market creation, defined by an upper and
lower numerical bound. The outcome range specified by these bounds does _not_
necessarily cover all possible outcomes.

If the market resolves to a number within the outcome range, both Long and Short
outcome assets will be redeemable at between 0\$ and 1\$, proportional to where
the resolved outcome lies along the range (and totalling 1\$). If the market
resolves to a number that lies below or above the range, then one of the Long
and Short outcome assets would be redeemable to 1\$ (and the other would have no
value).

For example, suppose that the upper and lower bounds for Tesla's stock price are
1,000\$ and 1,200\$. If traders buy Long at 0.60\$, then they bet that Tesla
will _as least_ be at

$$
1,\! 000\$ + 0.6 \cdot 200\$ = 1,\! 120\$
$$

at market close. If you want to bet that Tesla will be at 1,050\$ at market
close, then you buy Long at 0.25\$ or lower (you predict that Long will redeem
for at least 0.25\$) and Short at 0.75\$ or lower (you predict that Short will
redeem for at least 0.75\$).

If the market then resolves to 1,180\$, then Long may be redeemed for 0.90\$ and
Short for 0.10\$. If the market resolves to a value above 1,200\$, then Long is
worth 1.00\$ and Short is worthless.

Another example of a scalar prediction market is the Pres16_VS Market on the
Iowa Electronic Markets. Instead of betting on the who wins the larger amount of
votes in the popular vote, traders are betting the major parties' share in the
popular vote. This means that the lower bound is 0 and the upper bound is 1, and
buying a share of UDEM16_VS (Long) at 0.55\$ means that you predict that the
Democratic Party will have at least a 55% share of the popular vote (cast
between the two parties), and buying UREP16_VS (Short) at 0.40\$ means that you
predict that the Republican Party will have at least a 40% share of the vote
(cast between the two parties). At market close on November 10, 2016, the
average prices were 0.519\$ for UDEM16_VS and 0.484\$ for UREP16_VS (see
[2016 US Presidential Election Vote Share Market](https://iemweb.biz.uiowa.edu/graphs/graph_Pres16_VS.cfm)).
Note that the actual shares of the Democratic and Republican Party of the
popular vote (cast between the two parties) are approximately 51.11% and 48.89%
(see
[2016 United States presidential election](https://en.wikipedia.org/wiki/2016_United_States_presidential_election)).

## Historical Background

<!-- TODO Shouldn't this go into the futarchy section? -->

Prediction markets can be traced back to writings of [Ludwig von Mises][mises]
and [Frederik Hayek][hayek], however it is the economist Robin Hansen that is
perhaps the best-known proponent of them today. Hansen's writings have a very
significant theoretic implication on how to implement prediction markets in a
blockchain setting. He posits in _Shall We Vote on Values, But Bet on
Beliefs?_[^1] that the primary problem that can be solved is that of _info
problems_, that is the difficulty of aggregating information among many
individuals with all different views of the subject.

In relation to the info problems described above, Hanson (in the same paper)
points out that speculative markets show striking success in their ability to
aggregate information. He says "That is, active speculative markets do very well
at inducing people to acquire info, share it via trades, and collect that info
into consensus prices that persuade wider audiences."

[mises]:
  https://cdn.mises.org/Economic%20Calculation%20in%20the%20Socialist%20Commonwealth_Vol_2_3.pdf
[hayek]: https://www.kysq.org/docs/Hayek_45.pdf
