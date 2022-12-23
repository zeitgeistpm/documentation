---
id: betting-strategy
title: Betting Strategies
---

# Betting Strategies

What follows is a short introduction to the basic strategies when dealing with
prediction markets. It is by no means a complete guide.

Recall that the asset prices in prediction markets as used to form a prediction
of future events, and the right AMMs are _proper_ in the sense that they
incentivize the traders (which are in this context often referred to as
_informants_) to change the prices so that they reflect their beliefs.

Before you become an informant and expose yourself to a prediction market, you
need a _belief_. This belief could be anything from "$A$ is definitely going to
occur" or "$A$ is _not_ going to occur with a probability of 80%" to "The
following probability distribution is correct", etc.

The first example is a bit curious because it is seldom reasonable to assume
that something will happen almost certainly. In prediction markets, you usually
don't bet that one particular thing is going to happen, you bet on the
probability of each of the possible outcomes of an event. This is a common
misconception regarding prediction markets: They don't predict that an event
will definitely have a particular outcome, but instead predict a probability
distribution for the possible outcomes.

For example, you might believe that a particular team will definitely win their
next game. But maybe the probability of that happening is only 80%. This means
that buying the corresponding token isn't always a winning move (more details
below). Just like in Poker, where going all-in with the stronger hand isn't
necessarily a good move and doesn't guarantee a win, buying the tokens of the
most likely event isn't always a good idea.

In fact, no matter how good your prediction is, you cannot guarantee a profit.
For example, if you buy a number of tokens for an outcome $A$ that you believe
to be 90% certain at the price of 50 cent, that's a good deal (assuming you are
correct): There's a 90% chance that you will double your money. But according to
your own beliefs, there's also a 10% chance that your stake will go up in
flames. Swings like these aren't uncommon in prediction markets.

So, just like in Poker, instead of trying to win every game, we try to trade
profitably over time by maximizing our _expected value_, which is defined as the
probability-weighted average over all possible outcomes. For example, in the
example above, the expected value is

$$
    p(A) \cdot \$1 + p(\neg A) \cdot \$0 - \$0.5 = \$0.4
$$

(assuming that our beliefs are correct, the probability of $A$ is $0.9$ and the
probability of "not $A$" is $p(\neg A) = 0.1$; if $A$ doesn't occur, then we
lose our stake). Still a good deal (expected profit of 80%), but definitely not
risk-free (10% chance of total loss).

<!-- prettier-ignore -->
:::warning
Prediction markets are high-risk high-reward games. Optimizing your expected
results does not protect you from massive downswings.
:::

Note that all our projections about profit are based on the assumption that our
beliefs are correct (if we didn't assume that, we should probably not betting on
our beliefs in the first place.). _If your prediction is incorrect, you're
unlikely to profit._

Of course, we may never know if any prediction was correct. For example, if you
believe that the probabilities of $A$ and $B$ are 90% and 10%, resp. and then
$B$ occurs - well, that doesn't mean you were wrong. Your prediction may have
been spot-on and it just so happened that things played out in an unusual way.

Below are some general notes on how to optimize the standard interactions with
categorical and scalar markets, especially with regard to providing liquidity.
The last section is a TL;DR.

<!-- prettier-ignore -->
:::note
You can _short_ a token (bet that the event will _not_ occur) by buying the same
amount of all other tokens. With Zeitgeist's current market maker, this can be
implemented by first buying $x$ full sets and then selling $x$ units of the
token you wish to short on the market.
:::

## Trading Categorical Markets

Suppose there's a categorical market and you believe that a particular outcome
$A$ has a probability of $p(A)$. Let $q$ be the price of the outcome. Then the
expected profit of buying one $A$ token

$$
    p(A) \cdot \$1 - q
$$

(you pay $q$, and if $A$ occurs, then you receive one dollar; otherwise you go
broke).

This leads to a very simple strategy: If the price of $A$ is lower than your
prediction, buy $A$. That way, you're betting that $A$ is more likely to occur
than predicted by the market. If, on the other hand, the price of $A$ is higher
than your prediction you short $A$, either by selling $A$ (if you own any) or by
buying the same amount of all other outcome tokens. This means you're betting
that $A$ is less likely to occur than currently predicted by the market. In
particular, it is absolutely a valid strategy to own multiple outcome tokens in
a market.

The farther off the price is from your prediction, the higher the profit. Note
that, as discussed above, _we're assuming that your prediction is correct_. The
more your prediction diverges from the actual probabilities, the higher the risk
of making a loss.

## Trading Scalar Markets

Suppose there's a scalar market with a range of $[a, b]$. Let $p$ and $q$ be the
spot prices of SHORT and LONG, resp. Recall that $p + q = 1$. The value
predicted by the market is $v = pa + qb$. Assume you believe that the market
will resolve to $w \in [a, b]$. Given the current status $p, q, v$ of the
market, how should you bet?

The SHORT token takes on more value as the value that the market resolves to is
closer to the lower bound $a$, and LONG tokens on more value as the value that
the market resolves to is closer to the upper bound $b$. In fact, suppose that
your belief is correct and the market resolves to $w$. Then each LONG is worth
$(w - a) / (b - a)$ and each SHORT is worth $(b - w) / (b - a)$.

Thus, if the market resolves to $w$, then the profit of buying one unit of LONG
at the price of $q$ and later redeeming it is

$$
    \frac{w - a}{b - a} - q = \frac{w - v}{b - a}
$$

(using $v = pa + qb = a + q(b - a)$; a negative profit means a loss, of course).
Thus, the trade is good whenever $w > v$. In other words, a reasonable informant
buys LONG if they believe the prediction is too low. Note that the result of
this buy is that the price of LONG increases, as does the value predicted by the
scalar market, reflecting that the informant has provided information to the
market. Since buying LONG is equivalent to selling/shorting SHORT, if you
already own SHORT tokens, you can sell SHORT tokens in this situation instead of
buying more LONG tokens.

Similarly, the profit of buying one unit of SHORT at the price of $p$ is
$(v - w) / (b - a)$, so a reasonable informant buys SHORT if they believe the
prediction is too high.

If $w$ lies outside of the scalar range $[a, b]$, then just assume that $w = a$
if $w < a$ or $w = b$ if $w > b$ and apply the system above.

## Providing Liquidity

Trades on prediction markets shift the price of the assets. Buying (resp.
selling) an outcome asset increases (resp. decreases) its price and decreases
(resp. increases) the prices of the other outcome assets. By buying (resp.
selling) you bet that the probability of the outcome is higher (resp. lower)
than currently predicted by the market. But how can you expose yourself to the
market if you think that the prices are correct? This is where providing
liquidity comes into play.

The liquidity of a market is important when it comes to creating accurate
predictions. When a trader buys tokens, they are giving up information in
exchange for a potential pay-off (if they are correct, they make a profit). The
more significant the price movement, the more information they are providing.
But if prices slip too quickly due to a lack of liquidity, their profits are
comparatively small to the value of their information.

Thus, informants and liquidity providers are taking opposite sides of a bet.
When liquidity providers sell to the informants, they are hoping that the assets
are overpriced relative to their likelihood, while the traders assume that the
asset is underpriced. But when informants buy, the prices go up, which means,
provided the LPs are correct, that they are overpaying, resulting in a profit
for the LPs. The same applies to selling.

As an extreme example, imagine the informants are buying out a token which the
LPs know to be incorrect, even at prices close to 1$. The LPs receive fees and
keep the profits made from selling the incorrect outcome tokens, which will be
worthless after the market has resolved. But they also kept the correct outcome
tokens (their initial investment), giving them a considerable profit.
Conversely, if there's an information shock and the informants are able to
conclude which outcome the market will resolve to, they will buy all of these
tokens from the pool and leave the LPs holding bags of incorrect (this is,
worthless) outcome tokens.

In particular, providing liquidity is just as risky as trading on a market. In
case of an _information shock_, you stand to lose your entire position (for
example, if the outcome of the event is revealed before the market closes). When
the LPs take a loss to the informants, this may be explained by thinking of the
liquidity providers' losses as payment for the informants' services.

Increasing the liquidity of a pool by adding tokens does not change any of the
prices, but it has the effect of making it harder for traders to move the
prices. This is sometimes describes by saying that the market's thickness is
increased. As a result, traders as able to take greater risks by opening larger
positions, incentivizing them more to give up what they know about future
events. But from the LPs perspective, this is also a good thing, as it gives the
informants more rope. Thus, providing liquidity can be thought of increasing
your position in your bet against the market.

So, users should provide liquidity when the spot prices are at the level that
they should be at according to their prediction. The traders then pay money to
receive outcome tokens and shift the prediction to what they believe to be the
correct probability distribution. If they get it right, the liquidity provider
will incur a loss. But if the LPs initial prediction is correct, then their
expected profit is non-negative (this is a hard calculation), and the farther
the informants' probability distribution diverges from the LPs prediction and
the more market noise that occurs while the price moves from the initial to the
final prediction, the higher the LPs expected profit. Even if the final
prediction is equal to the initial prediction, the LPs will still have collected
fees. In particular, when you create a pool, you should always set the initial
prices according to the probabilities that you predict.

By withdrawing some of their liquidity, on the other hand, an LP removes funds
from their bet against the market. They might do this to take profits (including
swap fees) or because they have lost faith in their prediction.

## Minimizing Losses When Gathering Information

Roughly speaking, there are two motivations for creating a market or providing
liquidity. One is to create a market that allows you to bet against the
informants that are active on Zeitgeist, as discussed above. This can be
profitable if the liquidity providers have information which gives them an
advantage over the traders.

The other is to gather information from the traders. This is the exact reversal
of the situation above. The liquidity providers start off with as good a
prediction they can muster (based on whatever they know about the topic), which
is then corrected by the informants. If the market eventually yields a better
prediction, this results in a loss for the liquidity providers, but they receive
a better prediction as compensation.

The question then is how the liquidity providers can minimize losses or maximize
the quality of information they receive. The liquidity is key. If the pool is
too shallow, and, thus, the market is too thin, then the potential losses for
the LPs are quite small, and it is very easy for traders to move the price. But
this is not a good situation for the traders: Not only do they deal with
excessive slippage, but they are also forced to give up their information at a
very low price. For example, if the pool is so shallow that any trader can only
buy 10 units of a particular outcome token, their profit is limited to \$10.
Most non-publicly available information is worth more than that, and may very
well discourage knowledgeable informants from participating in the market, which
may hurt the quality of the prediction.

On the other hand, if the pool is too deep, and, thus, the market is too thick,
then the potential losses of the LPs is quite large, and it is very difficult
for the traders to move the price. This is good for the traders, though, as they
can buy tokens and lower prices. And just as thin markets can have a negative
effect on the prediction, so can markets that are too thick. While a
particularly thick market may incentivize a knowledgeable whale to join the
market and give up some crucial bit of information in exchange for the chance of
a particularly big payoff, it can also make it _too_ hard for traders to move
the price, which may again hurt the quality of the prediction.

In summary, the liquidity providers control both their risk and the quality of
the prediction by adding or withdrawing liquidity. Thin markets can result in a
lack of participation, while thick markets can lead to significant losses and
slow price changes. Manually adjusting the liquidity according to market signals
is often necessary.

## Summary

- For categorical markets: If you estimate that the probability of a categorical
  outcome is $p$, then buy the corresponding token if its price is smaller than
  $p$ and short the token if its price is larger than $p$.
- For scalar markets: If you estimate that the result of a scalar market will be
  $w$, then buy LONG if the current estimate is smaller than $w$ and buy SHORT
  if the current estimate is larger than $w$.
- Provide liquidity if you believe the current prices are correct. This is a bet
  against the other informants
- Withdraw liquidity to take profits or if you believe that a justified market
  correction is about to happen.
