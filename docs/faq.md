---
id: faq
title: FAQs
---
Futarchy
==========

Q: What is Futarchy?

A: Futarchy is a form of government proposed by economist Robin Hanson. He outlined a form of government where policies were put forth to the public. Then, by using prediction markets, the public is able to have a voice in determining which policies would have the most positive effect. 

Q: How can Futarchy be applied to block-chain governance?	

A: One example of the application of Futarchy as on-chain governance could be for bug bounty markets. You can imagine that when an upgrade is proposed, a market can be created asking, "Will a bug be found one week after the runtime upgrade happens?" ZTG holders are then able to vote yes or no in the market. Then, on a protocol level, we can have a rule that for example if the probability is over 60% in this market, the runtime upgrade is blocked.

Court
=====

Q: How does the Zeitgeist decentralized court work? 

A: Holders of ZTG can stake their tokens for a chance to join the pool of jurors. These jurors are then randomly selected in the event that an oracle dispute is submitted for a particular market. The selected jurors of the court will then be responsible for determining the real outcome of the event.

Q: What happens if an oracle is found to have reported a false outcome?

A: A market creator must bond ZTG tokens in order to select an oracle that is used to determine the outcome of a market event. If that oracle is found to report false information at the conclusion of the event the bonded ZTG will be slashed. 

Q: Can you challenge a Court ruling?

A: Court decisions can be challenged, which will increasingly expand the number of jurors that are selected - each time raising the stakes behind the resolution of the dispute.

Q: What prevents a challenge from increasing in jury pool size indefinitely? 

A: After a number of quorums are created and asked the real outcome of a market, if there is still a dispute, the case will move to a global vote by all ZTG holders to report the outcome.

Q:How does Zeitgeist guarantee an impartial jury?  

A:  Zeitgeist has a 2 layer approach to ensuring an impartial jury. By randomly selecting a jury pool from the ZTG holders who have staked their tokens for a chance to be selected, we can inherently avoid having jurors being selected in a court dispute where they have a common interest. Furthermore, a jury determination can be challenged, and if a jury pool is found to come to the incorrect conclusion of an event they will have their staked ZTG slashed.



Development
===========

Q: How can I develop on Zeitgeist?

A: Soon we will be releasing our testnet to the public through a series of closed/open beta programs. Developers will be able to start building their zeitgeist based applications on our network and prepare for our full release while we perfect the Zeitgeist platform and protocol.

Q: Where can I find Zeitgeist Documentation?

A: https://docs.zeitgeist.pm/
https://github.com/zeitgeistpm

Q: How secure is the Zeitgeist platform?

A: Zeitgeist will be deployed on the Kusama network, and inherit all of its security protocols.



Tokenomics
==========

Q: Where can I get Zeitgeist's native token ZTG?

A: Zeitgeist’s native token ZTG is planned to be released for public sale in Q3 2021.

Q: What is the fee structure?
-----need fee ratio----
80% of all fees are burned and 20% of all fees go to the Zeitgeist treasury and used to fund healthy growth of the Zeitgeist ecosystem.

Q: How many ZTG are there?

A: ZTG will launch with a genesis supply of 100,000,000 ZTG and an annual inflation rate of 5%


Prediction Markets
==================

Q: What is a prediction market?

A: Prediction markets are open markets that trade assets which are tied to potential outcomes of a future event. They are a tool for aggregating information from a diverse set of participants and create strong probability signals for future events.

Q: How does a prediction market work on Zeitgeist?

A: After a market is created participants can use their ZTG to buy a token that is tied to the outcome of an event. 
For example: "Token A" or "Outcome A" could be priced at $85 while “Token B” or "Outcome B" trades at $15. This can be read as an 85% probability that "Outcome A" is the true outcome of an event while "Outcome B" has only a 15% probability of being the true outcome of an event. 
After the event concludes and the outcome is determined the probability of the respective outcome will then go to 100% and the token tied to that outcome will be priced accordingly. 
Continuing with our example. Let us say that "Outcome B" ended up being the true outcome. The price of "Token B" would then go to $100 to represent 100% probability. Participants who hold "Token B" would then be able to sell their token for $100.

Q: Where can prediction markets be applied?

A: Prediction markets can theoretically be applied to any event in which there is more than one possible outcome.Some of the more common prediction markets today are based around events like elections, sports events, and the price of a particular asset.
   
Q: What are the risks of participating in a prediction market?

A: Any speculative venture has its own set of risks, and prediction markets are no different. 

Pulling from our earlier example: If you happened to be wagering that "Outcome A" would be the true outcome of the event, the "Token A" that you bought at $85 would be worth $0 as the probability of "Outcome A" would go to 0 when it is concluded that "Outcome B" was the true outcome.  

Q: What are the different types of available prediction markets?

A: Zeitgeist’s prediction market primitives will cover a wide range of capabilities. Below are some explanations and examples of each of these primitives:

Categorical Prediction Market:
A categorical prediction market is a market that can have multiple outcomes of different categories. You can think of a sports tournament where there are multiple teams that could all be the potential winner of the tournament. The market in this example would ask “Which team will win the tournament?” and each category would be a different team. The most basic form of prediction markets, the binary prediction market, is really a categorical market with only two categories of outcomes: YES or NO.

Scalar Prediction Market:
A scalar prediction market is a market that has a range of possible outcomes, and participating in this market resembles going long or short on the current price. Scalar markets are useful for numerical outcomes, such as financial markets. An example market would ask “What will the price of Bitcoin be on April 24, 2021?” and set a minimum and maximum price such as $40,000 - $60,000. Buying a LONG asset would mean you think the price will be closer to $60,000 while buying a SHORT asset would mean you think the price will be closer to $40,000. 
Scalar markets can also be used as leverage if you tighten the range that’s being traded.

Combinatorial Prediction Market:
A combinatorial prediction market allows traders to place wagers on compositions of interconnected outcomes. For example, let’s take a scenario in which a public company wants to use a prediction market to get a better idea of how a particular strategy impacts their market capitalization. They could make a combinatorial wager on the price of their shares after a certain date, composed of whether or not a particular strategy is implemented. Combinatorial markets are ideal for aggregating precise information.


Q: How does the Zeitgeist network determine the outcome of an event?

A: When a new prediction market is created. The creator of that prediction market will select an oracle to provide the true conclusion of the event. The creator must bond some ZTG tokens to the oracle which will be slashed if the Oracle is found to report a false outcome.

Q:What are the limitations of centralized prediction markets in comparison to decentralized prediction markets?

A: One example of the difference between centralized and decentralized prediction markets is the ability of token holders to sway the outcome of a network-upgrade proposal via the futarchy model of on-chain governance. 

Q: Difference from other decentralized prediction markets?

A: Zeitgeist is very different from other decentralized prediction market platforms.
We are building an open and evolving protocol to support prediction markets primitives, including the governance for how this protocol changes over time. This means we are also building an ecosystem for prediction markets and applications based on prediction markets.

We will have a SDK so developers who want to build their pm-based app can plug into our tech stack, and build their applications on the Zeitgeist protocol. We are building applications ourselves too. To top it off we'll be marketing and supporting prediction markets.
 We also will be supporting select external teams with grants through the Zeitgeist Foundation, a non-profit entity separated from ZeitgeistPM LLC, in a mission to foster healthy growth throughout the Zeitgeist network.


unanswered
==========

Q: How will Zeitgeist try to get enough people to use it, so prediction markets are valid enough and don't suffer from illiquidity? - prediction markets

Q: Where can I find Zeitgeist Documentation? - development

Q: What is the Zeitgeist commitment to transparency? - tokenomics
