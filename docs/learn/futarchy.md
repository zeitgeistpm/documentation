---
id: futarchy
title: Futarchy
---

> "Vote on values, but bet on beliefs"
>
> - Robin Hanson

Futarchy is a mode of governance defined by R. Hanson in _Shall We Vote on
Values, But Bet on Beliefs?_[^1]. An organization governed by futarchy (nation,
city, corporation, DAO, etc.) selects its _values_ (how is _welfare_ measured?)
using some form of a democratic vote, but uses prediction markets in which
informants bet on their _beliefs_ to aggregate information on which policies
will improve the organization's welfare and which policies won't.

[^1]:
    [Shall We Vote on Values, But Bet on Beliefs?](https://www.researchgate.net/publication/277294676_Shall_We_Vote_on_Values_But_Bet_on_Beliefs),
    The Journal of Political Philosophy, 21(2), pp. 151–178 (2013).

## Introduction to Futarchy

In _futarchy_, decisions about policy are delegated to prediction markets. In
these markets, the efficacy of the policies is estimated in terms of a
pre-defined _welfare measure_, a scalar measure of how well things are going for
the organization. Depending on the measurements made using the prediction
markets, the policy is either adopted or not. By proceeding in this fashion,
organizations governed by futarchy rely on the
[Wisdom of the Crowd](https://en.wikipedia.org/wiki/Wisdom_of_the_crowd) instead
of the "public relations teams, organized interest groups, news media,
conversation forums, think tanks, universities, journals, elite committees, and
state agencies"[^2]. Decisions are based purely on merit (improving the welfare
measure) and those who promote bad or corrupt policy are economically punished,
even if they succeed in the short term.

Futarchy also represents an alternative to the typical approaches to on-chain
governance. As on-chain identities do not necessarily correspond one-to-one to
off-chain identities, "One man, one vote" democracy is infeasible in the
blockchain context. Previous endeavours to finding a good replacement
([Polkadot democracy](https://wiki.polkadot.network/docs/maintain-guides-democracy),
[token holder votes](https://vote.polkadot.network),
[token curated registries](https://education.district0x.io/general-topics/understanding-ethereum/token-curated-registry/))
have mostly led down the same road: token-based voting.[^3] This essentially
puts the decisions into the hands of the powerful few. Futarchy walks a
different path. Once the welfare measure is set, policy decision become matter
of fact and are decided upon not by vote, but by bet.

[^2]: ibid. p. 151
[^3]:
    See
    [What is Futarchy? - Trading on The Future - Friederike Ernst #TOA18](https://www.youtube.com/watch?v=XonwBPXpyJQ)

## Futarchy by Example

It's easiest to illustrate this new concept through the use of an example.
Suppose that a group wants to make large-scale decisions using futarchy. This is
done by first selecting the welfare measure In case of a publicly traded
company, this could be the stock price of the company.

When a yay/nay decision needs to be made (for example: "Should we fire our CEO?"
for a public company), two scalar markets are created:

- $M_0$: _What's the stock price next year if the CEO is fired?_
- $M_1$: _What's the stock price next year if the CEO is not fired?_

These markets will run for some time and provide a prediction for which decision
is _better_: The difference $s_0 - s_1$ between the results of $M_0$ and $M_1$
approximates the effect of firing the CEO on the stock price. If the estimate of
$M_0$ is larger than the estimate of $M_1$, then the stock price is expected to
increase. This means that the CEO actually gets fired and the trades of $M_1$
are cancelled (this is done as we have no way of ever knowing what the stock
price would have been if the CEO had remained in place). If, on the other hand,
the estimate of $M_1$ is larger than that of $M_0$, then the CEO keeps their job
and the trades of $M_0$ are cancelled.

The traders in favor of firing the CEO can buy exposure to both markers by
acquiring LONG shares of $M_0$ and SHORT shares of $M_1$. Similarly, traders in
favor of keeping the CEO in place can buy SHORT of $M_0$ and LONG of $M_1$.
Therefore, both parties have skin in the game regardless of what decision is
eventually made. If the decision turns out to be good (stock price is as
predicted or higher), then the traders will on average profit from participating
in the market. If the decision turns out to be bad (stock price is lower than
predicted), then most traders will suffer losses.

Other scenarios can be approached using this pattern. If a political party
wishes to select a candidate in order to maximize their change of winning, they
might select their share of the popular vote as the welfare measure and open a
scalar market for each candidate $i$:

- $M^i_0$: _What will our share of the popular vote be if we choose $i$ as
  candidate?_
- $M^i_1$: _What will our share of the popular vote be if we don't choose $i$ as
  candidate?_

Of course, these are only toy examples of applications of futarchy. The
processes above can be embellished in a multitude of ways. For example, maybe
the motion to fire the CEO should only be put into action if there is a _clear_
difference between the stock prices $s_0$ and $s_1$ (say, 5 percent). We
encourage you to take a look at section _IX. A Reference Proposal_ of
[Shall We Vote on Values, But Bet on Beliefs?](https://www.researchgate.net/publication/277294676_Shall_We_Vote_on_Values_But_Bet_on_Beliefs)
for a deeper dive into the topic.

## Selecting the Welfare Measure

> Under a new form of governance, we could formally defer to betting markets on
> matters of fact, while retaining representative democracy on matters of value.
> That is, we could vote on values but bet on beliefs. [^3]

[^3]: ibid. p. 174-175

As the examples above show, the selection the welfare measure has wide-ranging
consequences. For example, by setting the welfare measure as the party's share
of the popular vote, the party's candidate is now selected purely on their merit
in winning the election, but is the candidate actually a competent politician
and leader? Maybe firing the CEO will result in a one year rally, but will will
the improvement last, or is their strategy not sustainable?

The welfare measure encapsulates the _values_ of the organization, and must be
numerically measurable to allow its use in a scalar prediction market, but in
the absence of a way of estimating the quality of values, the welfare measure
itself is decided by vote instead of speculation. The goal of later running the
prediction markets is only to decide if a certain policy will increase or
decrease the welfare measure.

In off-chain organizations like nations, cities, etc. which are typically
governed by representative democracy, the already available instruments can be
used to facilitate this vote. The futarchy will also rely on the present
structures to properly monitor the measurement of the welfare measure to prevent
corruption. On-chain organizations may rely on token holder votes to decide the
welfare measure.

By virtue of this process, Futarchy separates the decision on the intangible
values of the organization (measured using the welfare measure, which is decided
upon by vote) from the matter-of-fact decision of how to attain or maintain
these values (decided by estimating the effect of policy on the welfare measure
using prediction markets). This is the meaning of the mantra _Vote on Values,
Bet on Beliefs_.

## On-Chain Policy Enforcement

Off-chain futarchy relies on courts to enforce the application of policy. In the
on-chain context, this is not required. Instead, _code is law_. Policy consists
primarily of the execution of code. Will applying this update or signing that
extrinsic improve the welfare measure? Once the decision is made, the code is
automatically executed or discarded. The laborious interpretation and
enforcement of ambiguous policy is no longer required.

## Further Reading and Viewing

- [What is Futarchy? - Trading on The Future - Friederike Ernst #TOA18](https://www.youtube.com/watch?v=XonwBPXpyJQ)

- [ethereum foundation blog - An Introduction to Futarchy](https://blog.ethereum.org/2014/08/21/introduction-futarchy/)
