---
id: market-rules
title: Rules for Market Creation
---

# Market Creation and Permitted Markets

There are **two kinds of markets**. And **two kinds of market refusals**

- **Advised markets** require a **200 ZTG bond** and have to be **approved by the** [Advisory Committee](governance#advisory-committee) and can be rejected (with the loss of the bond)
  - Here we reject markets which are **poorly defined**
  - We lay out our rules below, but our rule of thumb is " **if it has any chance of confusing people or resolving ambiguously, we will not approve it** "
- Permissionless markets are created **without approval** and cost a **1000 ZTG bond**
  - Here we will **retroactively remove** markets which we **expect to cause significantly more harm than benefit** or which **flippantly discuss awful outcomes**
  - We will **never remove markets lightly**
  - We **will not remove poorly defined permissionless markets**, but **you will probably lose money on them**, so it's a bad idea

In future we would like to move towards most markets being permissionless, since this allows users more freedom and requires less time from the Advisory Committee. We will need to build a process to support users here.

## Approved markets

We're is currently building an optional **off-chain pre-approval process** for users to work together to create high quality markets. If you're interested in discussing an idea for a market proposal, contact us on our Discord in [market-creation]() (which uses Discord's new forum feature). Until the off-chain process is set up, markets must be submitted directly to the Advisory Committee using the Zeitgeist app. Beware that markets submitted without discussing with us these are much more likely to be rejected with users losing their bonds.

The **average (median) user expects to be betting in a fair environment**. They expect things to "**just work**" and for **markets to mean what it seems like they mean**. While there is room for a "wild west" of experimental markets, the Advisory Committee gives its approval to markets that users can trust without question.

**Zeitgeist pays a high price to remove its markets**. Hence a bad market cannot be quickly altered. If a market resolves too soon... it resolves too soon. There are no easy take-backs on the blockchain.

We therefore reject markets that are badly written or confusing. Users will lose their bounties.

## Markets the Advisory Committee will reject

- **Markets without clear questions**
  - e.g. "What's going to happen in Ukraine?"
    - While users might have some sense of what this market is about, it is not clear from the question. Users must be able to get an accurate view of what the market is about from just reading the question.
    - To put this another way, if more than 1% of users read the question and imagine the market is about something it's not about and bet on it, this is too many.
- **Markets without clear resolution criteria**
  - e.g. "Who will win the 2024 US Presidential election?" Resolution criterion: "This resolves as the winner of the election"
    - This was not good resolution criterion in 2020. Do we want the person who won according to AP? The person who got the most votes? The person who gets the most electors, even if some are "faithless electors" (this sounds charged, but is a technical term)?
    - We need a clear resolution source. If we want to ask a question about what Zeitgeist or a certain user judges, then that should be _explicit_ within the criteria.
  - e.g. "What will the price of ETH be at September 7, 2022, 15:30 PM?"
    - It's unclear what the time zone is.
    - It's unclear in which currency the price of ETH is measured.
    - It's unclear which source is used (there are many ETH/USD markets).
    - Do we mean Proof of Work or Proof of Stake?
- **Markets with outcomes which do not consider all major possible outcomes**
  - e.g. "Who will win UFC #290?" Outcomes: Adam Abbes, Balijis Bhat.
    - UFC fights are regularly postponed or cancelled. There needs to be a "fight cancelled" option. Without this, the market could resolve uncertainly. This will be a huge mess.
    - A good catch all here is to have an "other" option, clearly defined as not the options already mentioned
- **Markets with ill-configured start/end times**
  - e.g. "Who will win the 2022 World Cup?"; ends January 2024.
    - There is no reason for the market to stay open this long. Users might be confused.
  - e.g. "Who will win the 2022 World Cup?"; ends five minutes after opening.
    - This market is way too short to aggregate correct information.
- **Confusing images**
- **Wrong categories**

## Permissionless markets

Zeitgeist removes markets which on expectation cause 10x more harm than the information/incentives they create.

The following list would seem to go without saying. But we will say them to make our expectations clear. **By making clear bright lines, we free the community to make infinite and interesting markets within the large space of permitted markets**. If you create markets like this we will be upset with you. Likewise, if we remove markets unnecessarily, you should rightly be upset with us.

### Markets we always reject

- **Explicit market titles/descriptions/images**
  - Rather than "Will that [expletive] arsehole Dave get fired?" you can write "Will Dave get fired?"
  - Don't add advertisements to your markets description
- **Individuals being harmed**
  - Rather than "Will [world leader] be harmed?" you can write "When will world leader leave office?"
- **Very specific predictions about locations or individuals suffering acts of terrorism**
- **Markets which cause Zeitgeist to break national laws**
  - e.g. markets which create ways for US citizens to bet.
- **We reserve the right to add to this list things which cause the same magnitude of harm when predicted**.
- We also reserve the right to **remove markets around the privacy of private individuals**. We will write more guidance as this issue becomes clearer to us.
- Finally, **we reserve the right to remove markets which seek to game our rules**. We will have a high bar for this, but should there be low liquidity markets which seek to go right to the edge of what is permitted, we may take action against those markets.

### Why do we care?

- Zeitgeist is a place where anyone can create markets. **But with personal freedom comes the personal freedom of others. Some markets could create harm. Where that harm is likely to be much larger than the benefit, we will consider, then remove those markets.**
- While markets predict, they also incentivise. Placing a large bet on something not happening is equivalent to offering a large reward for it happening and allowing others to signal that they are working on it. Sometimes this is a fun or beneficial side effect. Sometimes it is a harm to be mitigated.
- For any genuinely interesting question, it is possible to frame markets in a way that doesn't have these bad outcomes. If there isn't, then it's not a market that is good to make.
- Zeitgeist is allows far more freedom of action here than other prediction markets. If you wish to discuss this, please have an example of a specific market you wish to create. Responding to queries here is a lower priority than creating interesting markets and building new technology.
  https://discord.com/channels/737780518313000960/1013755957911760996
