---
id: comparisons
title: Comparisons
---

One of the most frequently asked questions we receive is "How does Zeitgeist
compare to other prediction markets?". This documentation aims at answering this
question in the most objective, and technically focused way possible. Of course,
since you're reading this on Zeitgeist's own documentation, some bias does
exist.

## Bitcoin's Discrete Log Contracts

Discrete Log Contracts (DLC) are a form of scriptless-scripts that are
structured to look like normal multisignature transactions on Bitcoin's
blockchain. As explained by
[Coindesk](https://www.coindesk.com/dlc-private-smart-contracts-bitcoin), they
can be used to place bets between two accounts.

The way this is accomplished is by two accounts sending funds to a
multi-signature address on Bitcoin. The transaction then has the condition of
settling when the outcome is reported by a designated oracle that signs the hash
of the winning outcome and publishes it. The person who made the winning bid can
then use the oracle's signed message to withdraw the funds from the
multi-signature address.

While DLCs can be used to place bets between two parties, there are a number of
ways they are more primitive than a full-fledged protocol for prediction markets
such as Zeitgeist.

Some ways that DLCs are weaker than Zeitgeist:

- The oracle is completely trusted, there is no way to later dispute the oracle
  result if one of the sides disagrees with the outcome that the oracle signed.
- DLCs require off-chain communication for the bettor to find the counterparty
  to the contract. It does not provide any inherent way to match two parties
  that want to take the opposite sides of a bet, like a full-fledged prediction
  market protocol can do.
- DLCs do not allow for either side to exit early, or increase the amount they
  have at stake. Once a DLC is created, it's like a static agreement.
- DLCs are necessarily slow to execute, and therefore cannot be used for trading
  on real-time events that might change from one minute to the next (such as the
  outcome of sports matches and similar).

One way that DLCs are good, however, is the privacy aspect. Since DLCs look like
simple multisignature accounts on Bitcoin, the terms of the bet remains
confidential and only necessarily shared between the counterparties and the
oracle. As much as _confidentiality_ is a desirable property of any blockchain
application, all current prediction market protocols take the approach that the
market terms must be _transparent_. Transparency is necessary for prediction
market protocols because they are resolved in a decentralized way, where the
actors helping to resolve the market in case of disputes must have access to the
full terms of the agreement.
