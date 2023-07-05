---
id: court
title: Decentralized Court
---

Zeitgeist implements a decentralized court to handle disputes that may arise in
the resolution of prediction markets outcomes.

### General Introduction

The court system is responsible for ensuring that accurate information is added
to the blockchain. Prediction markets, which rely on truthful data, reward
traders who base their decisions on accurate information. If someone provides
false information, they will be punished, while those who share accurate
information will be rewarded. In essence, the court is a stake-weighted
plurality decision-making machine. Zeitgeist's court makes use of the so-called
[_Schelling point_][]. This is achieved by voting in secret and revealing the
raw vote information later. The outcome with the most votes wins (plurality).
The court serves as a dispute resolution mechanism. The court is inspired by
[Kleros][], a project that has already experimented with an on-chain court
system.

### Dispute Management within Court

If the oracle submits the wrong outcome due to malicious behaviour, disputes
come into play in such cases. Anyone can dispute the oracle report, and once a
dispute is triggered, the court takes over. The court is comprised of jurors and
delegators who need to lock a certain amount of ZTG tokens to join the court
system. The more tokens locked, the higher the probability of being selected as
an active juror or delegator, who risks funds on behalf of delegated
jurors. Delegators can transfer their voting rights to active jurors, who
participate in the voting system. The court uses a plurality voting system,
meaning the outcome with the most votes wins. Each market is associated with one
court case, which can be appealed multiple times if someone believes the
jurors' decision is unjustified.

### Global Disputes as the Last Instance

If the number of appeals reaches a certain threshold (currently three appeals)
or if during the appeal period (or `dispute_duration`) the total `unconsumed`
stake (see “The selection algorithm”) is below the necessary draw weights (see
“Calculating necessary draw weights”), the global dispute system can be
initiated by anyone. This global dispute system allows all ZTG token holders to
lock funds based on their beliefs. The outcome with the most locked balance wins
and serves as the final outcome for traders to rely on for redemption. Global
dispute voting participants have all of their funds unlocked after the winner is
determined.

### Joining the Court

You can either join the court (extrinsic `join_court`) as an active juror, who
is responsible for voting, or be a delegator and delegate (extrinsic `delegate`)
funds to active jurors. It is important to note that the court pool, which
contains all jurors and delegators, is bounded in size (config parameter
`MaxCourtParticipants`). If the court pool is full, the lowest-staked
participant is about to be replaced by a new and higher-staked participant
(juror or delegator) account id. For this reason, the court pool is sorted by
the staked amount of each participant. This comes in handy in order to use
binary searches for items inside the court pool. Court participants can increase
their stake at any time by calling `join_court`or `delegate` with a higher
amount than the previous call to these functions. To decrease the stake, it’s
necessary to exit the court (see ”Exiting court”). To update the pool item
associated to a court participant, there are two binary searches, the first for
finding the pool item (the search key is a tuple of stake and the participant
account id) and with the previous data and the second for inserting the updated
data inside the pool again.

For the `delegate` extrinsic, the function argument `delegations` contains a
list of account ids. The dispatch function ensures that the list of
`delegations` contains actually account ids which are actively participating
jurors. The list needs to contain at least one account and all account ids need
to be unique.

### Exiting the Court

Each juror and delegator can exit the court system to retrieve their remaining
funds. If the juror or delegator is still actively involved in inner court
cases, only the unused (non-active) funds are returned. The unused stake is
equivalent to the stake that was not already selected by the selection algorithm
(see [“The Selection Algorithm”](#the-selection-algorithm)). In order to exit the court and get the funds
back as a juror or delegator, one has to call the `prepare_exit_court`
extrinsic. This extrinsic removes the participant from the court pool and saves
the current block number to notice when the unused funds can be returned.

With the introduction of the inflation period it is required to restrict court
hopping. It is possible that users enter the court whenever the rewards of the
inflationary system get spend (see chapter “Incentives”). Thus, we put a locking
period of `InflationPeriod` in place in the case that a juror wants to exit the
court. So after a participant requested to leave the court system (extrinsic
`prepare_exit_court`), the participant has to wait at least another inflation
period to get the staked funds back. To finally return the unused funds, the
participant needs to evoke the `exit_court` dispatch function. The used funds
(`active_lock`) still remain locked.

### Calculating Necessary Draw Weights

If a juror votes against the plurality decision, they are penalized by a
multiple of a constant amount (`n * MinJurorStake`). The penalized amount is
rewarded proportionally to the jurors and delegators who backed the most-voted
outcome. The amount of penalty risk depends on the juror's overall stake. When a
court case is triggered by the prediction markets functionality, the court
requests a small multiple of the constant amount (currently
`31 * MinJurorStake`) from the total stake of all jurors and delegators
randomly. The current configuration of `MinJurorStake` is `500 ZTG`. So,
`31 * 500 ZTG = 15,500 ZTG` are randomly drawn from the total stake for the
first court round.

The formula to determine the necessary requested vote weight for each appeal is
as follows:

```
2^(appeal_number) * 31 + 2^(appeal_number) - 1
```

Assume one specific court case is in the last appeal round (`3`). The number of
randomly selected draw weights for jurors and delegators is `255`, and, therefore,
the amount of requested ZTG is `127,500 ZTG`.

$$
2^3 \cdot 31 + 2^3 - 1 = 255.
$$

$$
255 \cdot 500 \, \mathrm{ZTG} = 127,\!500 \, \mathrm{ZTG}.
$$

### The Selection Algorithm

The court pool keeps track of all the stake of the jurors and delegators to
randomly select `n * MinJurorStake` draw weights from it. It is important to
note that if some of the juror’s or delegator’s `stake` was previously already
selected, the rule of drawing without replacement is followed. This is
accomplished by saving the `consumed_stake` to the pool item’s storage. For new
draws the `unconsumed` stake is calculated by the total `stake` subtracted by
the `consumed_stake`. The higher the `unconsumed` stake, the higher the
probability to get selected by the algorithm. In addition, if the `unconsumed`
stake is not exactly divisible by `MinJurorStake`, it is rounded down
(`unconsumed = unconsumed - (unconsumed % MinJurorStake)`.

The `active_lock` is essentially equivalent to the `unconsumed` stake, but
restricts the court participant to return the funds behind this active lock.
Hence, the `active_lock` is not defined inside the court pool, but individually
for each participant (storage map `Participants`).

To randomly draw `n` numbers without replacement a partial version of the
Fisher-Yates shuffle algorithm (function `get_n_random_section_ends`) is used.
The `unconsumed` total stake of all jurors and delegators is divided by
`MinJurorStake` to get the `sections_len`. The result are `n` random numbers
between `1` and `sections_len`, which get multiplied by `MinJurorStake` to
receive a random subset of all section ends for the cumulated juror’s and
delegator’s stakes. That’s why `cumulative_section_ends` exists. It adds up all
the `unconsumed` stake of the court participants, saves for each participant the
cumulative section end, and the generated random subset can be matched to each
associated account id (juror or delegator). One randomly selected draw weight is
equal to one `MinJurorStake` and associated to one juror or delegator account
id.

### Delegation of Draw Weight

If one draw weight of a delegator is selected by the algorithm (see ”The
selection algorithm”), one random delegated juror is chosen out of the
`delegations` list. This `delegations` list was specified inside the call
argument of the extrinsic `delegate` by the delegator. There is one edge case to
notify here. At the point of calling `delegate` the `delegations` list is
checked, whether the specified account ids are actually valid jurors of the
court system. If not, the `delegate` extrinsic fails. But at the time of the
selection process, the `delegations` list could contain invalid account ids,
which don’t represent proper jurors anymore (for example the juror exited the
court system). For this reason only the actual contained jurors are taken into
consideration of all `delegations`. If there are no valid jurors inside the
`delegations` list, the delegator is removed from the court pool (error inside
the code: `SelectionError::NoValidDelegatedJuror`).

For delegations a vote weight (code reference: `SelectionAdd::DelegationWeight`)
goes to a random and valid juror from the `delegations` list, but the delegator
risks (`slashable` and code reference `SelectionAdd::DelegationStake`) the
`MinJurorStake` associated to the vote weight. If the juror makes bad decisions,
the delegator loses the selected `MinJurorStake`.

### Voting at predefined Time Points

Jurors are requested to vote in a periodic interval (`RequestInterval`) at a
known request block in the future. This ensures that jurors only need to check
at predefined times if they need to take action. If there wasn’t this concept of
predefined requests, the jurors would have needed to check in a much smaller
time interval if they are selected in court cases.

### Commitment Voting

The voting system uses a commit-reveal scheme, which is required to prevent
jurors from simply voting for the obvious plurality decision. There are voting,
aggregation, and appeal phases. During the voting phase, jurors cast their votes
as encrypted hashes (extrinsic `vote`), which must later be revealed (extrinsic
`reveal_vote`) as raw information. If a juror fails to vote or reveal their
vote, they lose their stake for that specific court case. The encrypted hash
consists of a BlakeTwo256 hash of the juror account, the vote item (outcome),
and a salt. The salt is a hash derived from the juror's signature of the
specific court ID. Without a salt, a malicious actor could try every vote item
to obtain raw information. If a juror's salt is known before the voting phase
ends, they could be exposed and penalized (extrinsic `denounce_vote`) by those
aware of the salt. This adds a layer of protection against cheating and
increases trust in the system.

### Appeals

After the aggregation phase ends and all jurors have had the chance to make
their votes public, anyone can appeal the plurality decision (during the appeal
period). This triggers a new court round with more requested jurors and
delegators' stakes or (in case after the last round) allows a global dispute to
take over. If nobody appeals, the court resolves based on the plurality decision
of the last court round. Finally, the losers must pay the winners proportionally
to their selected stakes for the specific court case (extrinsic
`reassign_court_stakes`).

In order to make an appeal, the caller of `appeal` has to reserve a bond. The
cost of an appeal is calculated as following:
`cost of appeal = AppealBond * 2^(appeal_number + 1)`.

1. First appeal cost: `2000 ZTG (AppealBond) * 2^1 = 4000 ZTG`
2. Second appeal cost: `2000 ZTG (AppealBond) * 2^2 = 8000 ZTG`
3. Third appeal cost: `2000 ZTG (AppealBond) + 2^3 = 16000 ZTG`

At the end of the appeal period and if there are no further appeals, all
accounts which provided appeal bonds and didn’t appeal on the winner outcome,
get their funds back. In this case, if the appealed outcome is not equal to the
winner outcome, the appeal was justified. Otherwise the appeal bond is slashed
and given to the treasury. This punishes the malicious behaviour that someone
appeals the correct outcome.

The last possible call to `appeal` is necessary for the global dispute to get
triggered, because there has to be some kind of financial commitment to appeal
the winner outcome of the last appeal round.

### Determining the Winner Outcome

The basic concept is to get the outcome with the most juror vote weights and use
that as winner outcome. But there are two edge cases with that approach. If
there are no jurors who actually revealed the raw vote information, because of
different reasons like inactivity, denounces or other reasons, the court uses
the oracle report as the winner outcome. The second edge case is that there are
more than two outcomes, which received the same amount of votes. In this case
the court resolves on the winner outcome of the last appeal round. If there was
no previous appeal round, the court resolves on the oracle report again.

### Incentives

By making good decisions, you can be rewarded by those who lose. This is done by
the extrinsic `reassign_court_stakes`. At the end of the appeal phase, the court
resolves on a winning outcome (see ”Determining the winner outcome”). This
winner outcome is then compared to the jurors voted outcomes. All jurors and
delegators who sided with a different outcome to the winner outcome get slashed
according to their draw weights. All jurors, who failed to vote or failed to
reveal the encrypted vote or got denounced, and their delegators get slashed
according to their draw weights too. All jurors and their delegators, who sided
with the winner outcome get the previously mentioned slashed funds proportional
to their share of all the other winner stake (`total_winner_stake`).

Additionally, the court system is incentivized by inflation. Participants who
stake funds in the court receive newly minted tokens proportional to their
stake. The current configuration involves a yearly inflation rate of `2%` for all
jurors and delegators in the court system. Inflation is applied at regular
intervals, known as `InflationPeriod`, to reduce the strain on the blockchain.
To prevent users from joining the court just to receive token emissions (court
hopping), they must remain in the court for at least one full `InflationPeriod`
before they can receive inflation rewards. The block number at the point of a
participant joining the court system is saved as `joined_at` in the court pool
item. Assume now is the current block number, the inflation is rewarded to a
participant if the following condition is true:
`now - joined_at ≥ InflationPeriod`.

The `YearlyInflation` is able to get set by a `MonetaryGovernanceOrigin` and the
extrinsic `set_inflation`.

The reward per participant is calculated as the following:

```text
YearlyInflationAmount = YearlyInflation * TotalIssuance
IssuePerBlock = YearlyInflationAmount / BlocksPerYear
InflationPeriodMint = IssuePerBlock * InflationPeriod

for (Participant, ParticipantStake) in CourtPool {
    Share = ParticipantStake / ParticipantsTotalStake;
    MintAmount = Share * InflationPeriodMint;
    deposit(Participant, MintAmount)
}
```

### Terminology

- Court Hopping: Joining the court just to receive token emission benefits and
  then exiting the court.
- Court Pool: All jurors and delegators.
- Delegator: An account which gives its vote power to jurors.
- Draw Weight: One slash-able `MinJurorStake` that belongs to one vote weight.
- Global Dispute: A token voting mechanism for all ZTG holders.
- Juror: An account which is responsible to vote in secret and reveal the raw
  information later on.
- Participant: A juror or delegator account inside the court pool.
- Vote Weight: The derivative voting value of one draw weight; it represents one
  `MinJurorStake`.

[kleros]: https://kleros.io/
[_schelling point_]: https://en.wikipedia.org/wiki/Focal_point_(game_theory)
