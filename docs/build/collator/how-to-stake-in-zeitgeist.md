# How to Stake on Zeitgeist

Head to [polkadot.js](https://https://polkadot.js.org/apps/) to control your
account's staking.

### Get the List of Candidates

1. Choose **Developer** > **Chain state**

1. Choose `parachainStaking`

1. Choose `candidatePool(): ParachainStakingSetOrderedSetBond`

1. Click `+` to make a query

1. Copy the candidate address that you want to delegate your tokens to

![](/img/get-candidates-list.png)

### Get the Candidate Delegation Count

1. Choose **Developer** > **Chain state**

1. Choose
   `candidateInfo(AccountId32): Option<ParachainStakingCandidateMetadata>`

1. Paste the collator candidate's address

1. Enable the "include option"

1. Click `+` to make a query

1. Get the number of delegationCount

![](/img/get-delegation-count.png)

### Get the Number of Existing Delegations

Choose **Developer** > **JavaScript** and copy the following code to the editor
box:

```
// Simple script to get your number of existing delegations.
// Remember toreplace YOUR_ADDRESS_HERE with your delegator address.

const yourDelegatorAccount = 'YOUR_ADDRESS_HERE';
const delegatorInfo = await api.query.parachainStaking.delegatorState(yourDelegatorAccount);
console.log(delegatorInfo.toHuman()["delegations"].length);
```

1. Replace `YOUR_ADDRESS_HERE` with your address

1. Click Run button

1. Get the number of existing delegations

![](/img/get-your-delegations-number.png)

### Check the Amount You Can Stake

You have a balance which consists of transferrable, locked and reserved tokens.
You can only stake transferrable tokens. To see the amount of transferrable
tokens, check the **Accounts** page:

![](/img/check-stake-result.png)

### Stake Your Tokens

Choose **Developer** > **Extrinsics**.

1. Choose the account you would like to delegate your tokens to

1. Choose `parachainStaking`

1. Choose
   `delegate(candidate, amount, candidateDelegationCount, delegationCount)`

1. Copy the candidate's address to delegate (the one you get from "Get the list
   of candidates" step)

1. Specify the amount that you would like to stake. The amount is given in
   Pennocks, which means you need to multiply the amount in ZTG by $10^{10}$, so
   if you want to stake 1 ZTG, you should fill in `10000000000`

1. Enter the `delegationCount` from [Get the Candidate Delegation Count]

1. Enter the number of existing delegations from [Get the Number of Existing
   Delegations] (if you did not stake before, then enter `0`)

![](/img/stake-ztg.png)

### Check the Stake Result

Once the transaction is confirmed, you can check the result on the **Accounts**
page:

1. Choose ` Account`

1. Click the triangle button

1. You can see the reserved balance

![](/img/check-stake-result.png)

## How to Stop Delegations

### Schedule Request to Stop Delegations

Choose **Developer** > **Extrinsics**.

1. Select the account you want to execute the revocation for

1. Choose `parachainStaking`

1. Choose `scheduleRevokeDelegation(collator)`

1. Select the account you want to remove the delegation for

1. Submit this transaction

![](/img/schedule-leave-delegation.png)

### Execute Request to Stop Delegations

Choose **Developer** > **Extrinsics**.

1. Select the account you want to execute the revocation

1. Choose `parachainStaking`

1. Choose `executeDelegationRequest`

1. Select the delegator's address

1. Select the account you want to remove the delegation for

1. Submit this transaction

![](/img/execute-delegation-request.png)

### Remove All Ongoing Delegations

Choose **Developer** > **Extrinsics**.

1. Select the account you want to remove all delegations for

1. Choose `parachainStaking`

1. Choose `executeLeaveDelegators`

1. Select the account you want to remove all delegations for

1. Enter the total number that you have delegated. To check the number, see [Get
   the Number of Existing Delegations]

1. Submit this transaction

![](/img/execute-leave-delegation.png)

### Verify Your State

You can verify whether your delegation was removed by following step:

Choose **Developer** > **Chain state**.

1. Choose `parachainStaking`

1. Choose `delegatorState`

1. Select your account

1. Enable the "Include option"

1. Click the `+`

1. Your latest result

![](/img/delegate-state.png)

### Cancel Request to Stop Delegations

Choose **Developer** > **Extrinsics**.

1. Select your account

1. Choose `parachainStaking`

1. Choose the `cancelDelegationRequest` or the `cancelLeaveDelegators`,
   depending on whether your scheduled the request via
   `scheduleRevokeDelegation` or `scheduleLeaveDelegators`

1. Enter the candidate's address

1. Submit this transaction

![](/img/cancel-request-stop-delegations.png)

[get the candidate delegation count]: #get-the-candidate-delegation-count
[get the number of existing delegations]:
  #get-the-number-of-existing-delegations
