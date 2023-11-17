---
id: parimutuel
title: Parimutuel
---

## Overview

The term _parimutuel_ refers to a particular market making and payout mechanism
used on Zeitgeist for extra casual markets.

These are "losers pay winners" market makers: Any informant can bet any amount
at any time. Their bet amount goes into the _pot_ and they receive tokens which
represent their share of the pot. After the market is resolved, the entire pot
is distributed amongst those who wagered on the outcome that materialized,
proportional to what their share of the pot is.

Although parimutuels work with scalar markets, Zeitgeist currently only supports
parimutuel for categorical markets.

## Example

Let's imagine a simple prediction market based on a horse race. There are five
horses running in this race: A, B, C, D and E. People are placing bets on which
horse they believe will win.

Suppose that at this point, the total amount of money wagered on these horses is
as follows:

- A: $200
- B: $300
- C: $100
- D: $250
- E: $150

Altogether, the total pool of money that's been wagered is $1,000.

If you bet on Horse A, and Horse A wins, for each dollar you bet, you'd get the
total bets on all horses ($1,000) divided by the total amount bet on Horse A
($200). So for every dollar you bet, you would get $5 back - this includes the
return of your original dollar plus $4 in winnings. If you bet $100, then you'd
receive a total of $500 from the pot. The market predicts the probability of A
winning the race as 20% (or 1:4).

Similarly, if you bet on Horse B, and Horse B wins, for each dollar you bet,
you'd get the total bets on all horses ($1,000) divided by the amount bet on
Horse B ($300). So for every dollar you bet, you would get roughly $3.33 back -
this includes the return of your original dollar plus about $2.33 in winnings.
The market predicts the probability of B winning the race as 30%.

And so on for the rest of the horses...

### Advantages and Disadvantages

Unlike automatic market makers (AMM) or continuous double-auction (CDA), the
parimutuel market maker does not require any liquidity, and shares the property
of AMM that it can fill any order at any time. It is essentially a "bring your
own liquidity" market maker.

However, it does suffer several disadvantages compared to the other mechanisms
on Zeitgeist:

- The odds are not fixed when tokens are bought. For example, if an informant
  fills an ask at a price of 0.33 on an order book, then they know that they'll
  get a 300% payoff if they're right. That's not the case at a parimutuel. If
  more people buy your outcome, your payoff gets worse. This makes it impossible
  to properly reward traders that have moved the price in the right direction
  and have done so early.

  A particularly vexing symptom of this problem is that, if a market becomes
  trivialized (some outcome $X$ has materialized before the end of the market)
  and at least two agents have bet on the winning outcome, then it's a winning
  strategy to keep pumping more money into the market to dilute the other
  agent's stake.

- No selling of contracts. Once you've bought a contract, you have to hold it.
  You can't just take back your bet. This means that parimutuels are really only
  suited for markets which resolve very quickly.

As such, parimutuel markets are perfectly suited for short-lived markets where
the market's outcome is published at a predefined time.

## Parimutuel Markets on Zeitgeist

### Betting

Every parimutuel market uses a special account as the pot. If an informant
places a bet, they send `x` units of collateral to the pot and receive `x` units
of the corresponding type of _parimutuel shares_. Informants must observe a
minimum bet size defined in the parimutuel pallet when placing their bets.

<!-- TODO External fees to be defined in the general section on Zeitgeist markets in a later PR. -->

External fees are paid when users buy parimutuel shares in the usual fashion: If
Alice buys parimutuel shares for a certain amount, then the external fees are
deducted from this amount before the rest of the transaction is executed. The
amount Alice is left with after fees are deducted must satisfy the minimum bet
size requirement.

### Claiming Rewards

Suppose an informant holds $x$ units of the parimutuel share for the outcome
$A$. If the market resolves to some outcome not equal to $A$, then the
informants shares are completely worthless; if the market resolves to $A$, then
the informant receives $xr$ units of collateral from the pot, where $r$ is the
ratio between the amount wagered on $A$ and the total amount wagered on any
outcome. A detailed outline of the math is presented further below.

If the unlikely event occurs that the winning token has a total issuance of zero
but the pot is not empty, each informant can redeem _any_ parimutuel share for
its original price, one unit of collateral. This avoids confusion on markets
with very low participation ("I bet $100 on A, no one else was interested, B won
and now my money is gone?! Why?").

## Details: Expected Payoff in Categorical Markets

If you believe an outcome has a probability p of occurring, then the fair return
on a winning bet should be $1/p$. This is because, over many repetitions, you'd
expect to win once every $1/p$ times. For example, if you believe that
$p = 0.25$, then fair odds would be 4:1. This means for every dollar you bet,
you'd expect a return of $4 on a win.

We consider a denote the amount wagered on each outcome $i$ by $w_i$. In the
parimutuel system, the return for each dollar bet on $i$ is $r_i$ = \sum_k w_k
/w_i$. For this return to be considered "fair" based on your belief about the
outcome's probability, it should match the inverse of your believed probability.
In other words, if you think there's a 25% chance of an outcome, you'd expect
the system to give you 4:1 odds (or a return of $4 for every $1 bet) for it to
be a fair bet.

If the system offers odds that are better than your believed probability, then
you'd consider the bet to have positive expected value (you expect to make a
profit in the long run). If the odds are worse, then the bet has negative
expected value (you expect to lose money in the long run).

In essence, for a bet to be "fair", the expected value should be zero: you
neither expect to make nor lose money in the long run. This happens when the
system's offered odds match your personal beliefs about the probability of the
outcome.

Long story short, given a pot balance $w$, the return $r_i(w)$ of a fair bet on
$i$ would match the inverse of the probability $p_i(w)$ of $i$. Thus, the
prediction/spot price of $i$ is $p_i(w) = r_i(w)^{-1}$.

## Bibliography & Further Reading

- Abraham Othman, Tuomas Sandholm, David M. Pennock, Daniel M. Reeves,
  [A practical liquidity-sensitive automated market maker](https://www.researchgate.net/publication/221445031_A_practical_liquidity-sensitive_automated_market_maker),
  ACM Transactions on Economics and Computation 1(3), pp. 377-386 (2010)
- D. M. Pennock, "A dynamic pari-mutuel market for hedging, wagering, and
  information aggregation," in Proceedings of the 5th ACM Conference, 2004. DOI:
  10.1145/988772.988799
