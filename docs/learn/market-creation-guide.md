---
id: market-creation-guide
title: Market Creator's Guide
---

# Market Creator's Guide

This is a short guide to selecting topics for prediction markets and formulating
air-tight, bullet-proof descriptions and resolution criteria.

## What Makes a Good Topic?

The quality of the topic of a prediction market plays a significant role in
attracting liquidity providers and informants to the market. Uninteresting,
unclear or opinionated topics will deter users from participating. Well-phrased
markets on curious topics will flourish.

When selecting a topic for a market, the creator must avoid trivial or
exceedingly difficult questions or illegal topics. For example, "Will SpaceX
send a manned mission to Mars by 2026?" is likely trivial. Topics may be in
question form in the form of a statement. Contentious issues are welcome, as
long as resolution criteria are clear (see below). Questions are preferred for
contentious issues.

The market's duration and time frame has implications on engagement. If the
market runs for a long time, users are required to take into account economic
uncertainties like the price stability of the base asset when making a trade or
providing liquidity. They are also taking on risks of information shock. If the
market runs for too short of a time, accurate prediction are difficult to
make.[^1] The ideal length depends on the topic: For sports markets, shorter
durations are acceptable. Markets on political or economic trends should at
least run a couple of month to properly aggregate information.

[^1] Zeitgeist currently doesn't allow markets with a duration of more than a
year.

For example, "Will SpaceX send a manned mission to Marks by 2030?" requires
participants to lock up funds for a significant time period. If the base asset
against which the bets are taken is a speculative asset itself, this bears
incalculable risks for those who hold outcome tokens.

If a market runs too long, it might be a good idea to split the market up into
smaller steps. For example, a market on a manned Mars mission may be split into
markets betting on the success or failure of Starship test launches or unmanned
missions.

## What Makes a Good Description?

The landmark features of a good description are clear language and unambiguous
_resolution criteria_, which real-life developments map to which prediction
market outcomes. For every possible real-life development, the resolution
criteria must specify an outcome token which represents that outcome.

There is one exception to this rule. There are always so-called _long shots_,
which are so unlikely that it makes no sense to bet on them makes no sense, but
which may occur after all. For example, a market on the Champions League Finals
might have one outcome for each team. But there's also the chance that the game
is delayed until after the market is resolved or even cancelled. Any event with
a probability of less that $1\%$ is considered a long shot and should generally
not be made part of the market. If a long shot occurs, the market is instead
voided.[^2]

[^2] As of 0.3.9, Zeitgeist doesn't yet implement voiding markets.

The resolution criteria may also specify which source the oracle uses to resolve
the market. This isn't always necessary, but it is of paramount importance if
the topic of the market is contentious and may result in conflicting reports.
Bad or unreliable sources must be avoided. The data used to resolve the market
should be easily reproducible for all participants in the market.

When creating a scalar market instead of a categorical market, the market
creator must define a lower and upper bound for the values. A badly configured
range doesn't hinder the resolution of the market (recall that if the reported
value falls outside of the market's range, SHORT resolves to 1 or 0 depending on
where the value ended up, and a similar rule applies for LONG), but has
implications for the informants and the quality of the predictions: If the range
is too wide, there's too little price resistance to create a good prediction or
sufficient reward for informants; if the range is too narrow, small fluctuations
or information shocks can ruin the liquidity providers. A good balance must be
struck here.

## Advisory Committee's Standards

The list below contains some guidelines that Zeitgeist's Advisory Committee
prefers to use:

- Please spell-check your description and title. In the age of AI, there's
  little excuse for presenting incomplete sentences, gross spelling mistakes or
  missing punctuation. In the worst case, these can result in distortions of the
  market creator's intent.
- Let AI review your market. This can help identify missing outcomes, loopholes
  or lack of clarity.
- Specify contentious issues as questions rather than statements.
- Specify a time zone for each date that is relevant to the resolution of the
  market. Prefer UTC unless the topic is clearly related to a particular locale.
  Dates without time zones can lead to confusion. ISO 6801
  (YYYY-MM-DDTHH:MM±HH:MM), on the other hand, is bullet-proof.
- Prefer 24 hour clock to 12 hour clock.
- Define an outcome token for every possible outcome except long-shots.
- Resolution data must be reproducible and verifiable as possible. Avoid sources
  which are not available for the entire duration of the market. Avoid
  newspapers whose articles are paywalled and API calls which require a paid
  key.
- Prefer API calls to manually pulling data.
- Prefer round values for dates and other data (April 1, 00:00 preferred to
  March 31, 23:59).

## Examples

### U.S. Debt Limit

> Will the US Raise the Debt Limit by $1.5 Trillion or More by June 2, 2023,
> 19:00 (UTC)?
>
> One of the most pressing current events is the potential default of the US
> government on its payments. This could carry significant implications for
> global economies worldwide. US bonds are viewed as the gold standard of
> safe-haven assets, and any failure to make payments could trigger major
> macroeconomic events. Will the US increase the debt limit by $1.5 trillion or
> more by June 2, thus ensuring the security of bond payments?
>
> The outcome will be reported based on major US news sources following
> government announcements. The market will resolve to YES if there is an
> announcement that the debt ceiling is increased by $1.5 trillion or more by
> June 2, 2023, 19:00 (UTC). If there is no such announcement until June 2,
> 2023, 19:00 (UTC), or there is an announcement mentioning a lesser increase
> than $1.5 trillion or other measures taken to avert default, then the market
> will resolve to NO.

Although well phrased, this market might be considered to be ambiguous. The U.S.
avoided default by
[suspending the debt limit](https://home.treasury.gov/news/press-releases/jy1517).
This allows essentially infinite spending. But does a suspension count as a
raise of the debt limit?

A solution would be to view this a case of the
[XY Problem](https://xyproblem.info). Does the market creator ask _how_ the
government default is avoided - or _if_? If the _how_ matters, the market
description should clarify how suspensions of the debt limit are handled.
Otherwise, rewriting the question to something like "Will the U.S. government go
into default by June 2, 2023, 19:00 (UTC)?" might be a good idea.

### Major AI-Related Incident in 2023

> Within the next 12 months, will there be a verified news report of an
> AI-related incident causing at least $100 million in damages or impacting the
> personal data of over 1 million individuals?
>
> 1. The incident must be directly related to an AI system, such as an AI-driven
>    recommendation engine, autonomous vehicle, or natural language processing
>    system.
> 2. A verified news report from a reputable source (e.g., BBC, CNN, or The New
>    York Times) must cover the incident, detailing the AI's involvement and the
>    extent of the damage or impact on personal data.
> 3. The report must specify that the damages amount to at least $10 million
>    (USD) or that the incident has compromised the personal data of over 1
>    million individuals.
> 4. The incident must occur within the 12-month window from the market's start
>    date.

Resolving this market is difficult. Scanning all media for reports on such
incidents is time consuming. Even worse, it is virtually impossible to disprove
that such an incident has occurred.

It is also unclear what constitutes damage. For example, on May 22, 2023 an AI
generated image of an explosion near the Pentagon was distributed on the
internet,
[causing a $500 billion swing of the S&P 500](https://twitter.com/KobeissiLetter/status/1660664125574217731).

### NHL Finale

> As we approach the highly-anticipated Stanley Cup final, set to kick off on
> Saturday, June 3 at 8 p.m. ET (Sunday, June 4 at 00:00 UTC) in Las Vegas, a
> pivotal question emerges: Who will seize the advantage and triumph in the
> first game of this series - the Golden Knights or the Florida Panthers? Both
> teams have demonstrated determination and exceptional performance throughout
> the season and playoffs, now coming face-to-face in the most prestigious
> hockey championship. This prediction market endeavors to forecast the outcome
> of this vital opening game, a significant milestone in the quest towards the
> revered Stanley Cup.
>
> The resolution criteria for this prediction market will be determined by the
> victor of the first game of the Stanley Cup final, be it the Golden Knights or
> the Florida Panthers. The market will resolve in favor of the Golden Knights
> if they secure the initial victory, and likewise, it will resolve in favor of
> the Florida Panthers if they prevail. The outcome will be drawn strictly from
> the game's result after regulation time and any necessary overtime or
> shootout, excluding any external factors such as disqualifications,
> suspensions, or unforeseen events. The official NHL game report will serve as
> the primary source of validation for the outcome.
>
> This analysis and the formation of this prediction market are grounded in the
> insights provided by Adam Proteau in The Hockey News (Proteau, 2023).
>
> Reference: Proteau, A. (2023). NHL Stanley Cup Predictions: Do The Panthers Or
> Golden Knights Win It All? The Hockey News. Retrieved from:
> **https://thehockeynews.com/news/nhl-stanley-cup-predictions-do-the-panthers-or-golden-knights-win-it-all**

This market is well phrased, correctly cites it's sources, contextualizes the
market using an introductory paragraph and even specifies the official game
report as official source for the oracle. One way this description could be
improved by detailing at what date the market will resolve ambiguously if the
game is cancelled or delayed.

### ASTR/USD at the end of Q1 2023 (UTC)

> On February 17, 2023, Sony Network Communications announced that it will be
> co-hosting a web3 incubation program with Astar Network on NFTs and DAOs,
> sending the spot price of ASTR/USD soaring over 10c (see
> [Bitcoin News](https://news.bitcoin.com/sony-and-astar-network-launch-web3-incubation-program-for-nft-and-dao-focused-projects/)).
>
> What will the spot price of ASTR/USD be at the end of Q1 2023 (UTC) according
> to CoinGecko? The exact API call that will be used is:
> https://api.coingecko.com/api/v3/coins/astar/history?date=01-04-2024-00-00-00.

Note that this description specifies a clear API call which is used to resolve
the market.

### Will @realDonaldTrump tweet before the end of April 2023 (UTC)?

> Former US President Donald Trump was banned from Twitter on Jan. 8, 2021
> following tweets about the Insurgence of Jan. 6, 2021 (see blog.twitter.com)
> and reinstated on Twitter in November 2022 after a popular vote conducted by
> Elon Musk. NBC News suggests that Donald Trump prepares for his return to
> Facebook and Twitter.
>
> Will @realDonaldTrump tweet before the end of April 2023 (UTC)? The market
> will resolve to YES if the account sends any tweet. The market will resolve to
> NO otherwise. In particular, the market will resolve to NO even if
> @realDonaldTrump retweets or likes a tweet or sends a direct message without
> tweeting. It is irrelevant whether or not the tweet is later deleted.

While this market is well-phrased, the result is not easy to verify due to the
clause: "It is irrelevant whether or not the tweet is later deleted."

### Will a Nuclear Bomb be Detonated in 2023?

> This prediction market aims to predict whether a nuclear bomb will be
> detonated in the year 2023, as per Coordinated Universal Time (UTC). A nuclear
> bomb is defined as a weapon that uses nuclear reactions of fission or fusion
> to release large amounts of energy. This can encompass a range of nuclear
> weapon designs such as fission bombs, boosted fission bombs, thermonuclear
> weapons, and neutron bombs.
>
> In addition, any nuclear tests conducted by a recognized government body or
> other credible entity, including clandestine or non-state actors, will be
> taken into account, provided these detonations meet the nuclear definition
> above.
>
> For this market, a detonation is considered to have occurred if there is
> physical evidence of a nuclear explosion such as seismic readings, radiation
> detection, or satellite imagery confirming an event. Official statements from
> governments or credible international organizations confirming such a
> detonation will also be accepted as evidence.
>
> Exclusions:
>
> - Failed detonations: Any test or attack that fails to result in a nuclear
>   explosion as defined above will not count as a detonation.
> - Dirty bombs: This market does not count detonations of "dirty bombs" or
>   radiological dispersion devices, where conventional explosives are used to
>   disperse radioactive material.
> - Nuclear Power Plant Accidents: Accidents or malfunctions at nuclear power
>   plants or other nuclear facilities, such as meltdowns, do not count, as
>   these do not involve the intentional detonation of a nuclear bomb.
> - Nuclear Propulsion Detonations: Any explosion involving a device using
>   nuclear propulsion, such as those used for space travel, will not be counted
>   as these are not intended as weapons or tests of weapon technology.
> - Subcritical Tests: Tests involving nuclear materials that do not reach a
>   critical mass and thus do not result in a nuclear explosion, known as
>   subcritical tests, will not be considered for this market.
> - Decommissioning Explosions: Explosions used in the decommissioning process
>   of nuclear weapons or facilities, which may involve nuclear materials but
>   are not themselves nuclear detonations, should be excluded.
>
> Resolution details:
>
> The market will resolve to "Yes" if there is evidence of at least one nuclear
> bomb detonation occurring in the year 2023 (UTC). The market will resolve to
> "No" if no such evidence is provided by the end of the year 2023 (UTC).
> Verification will be based on publicly available evidence and credible news
> reports or official statements.

This market is indeed very detailed and tries to ensure that all conceivable
corner cases are specified. The language is very clear and dates are equipped
with time zones, avoiding any confusing. Note, however, that this market
description is awkwardly long.
