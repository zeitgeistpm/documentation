# How to stake in Zeitgeist

## Stake

### Get the list of candidates

1. Head to [Polkadot.js](https://https://polkadot.js.org/apps/)

2. Choose `developer`---`Chain State`

3. Choose `parachainStaking`

4. Choose `candidatePool(): ParachainStakingSetOrderedSetBond`

5. Click `+` to make a query

6. Copy one of the canditate address you would to stake your tokens

![](/img/get-candidates-list.png)

### Get the Candidate Delegation Count

Choose `developer`---`Chain State`

1. Choose `parachainStaking`

2. Choose
   `candidateInfo(AccountId32): Option<ParachainStakingCandidateMetadata>`
3. Paste the collator candidate's address

4. Enable the "include option"

5. Click `+` to make a query

6. Get the number of delegationCount

![](/img/get-delegation-count.png)

### Get your Number of Existing Delegations

Choose `developer`---`JavaScript`

Simply copy the following codes and paste it inside the editor box

```
// Simple script to get your number of existing delegations.
// Remember toreplace YOUR_ADDRESS_HERE with your delegator address.

const yourDelegatorAccount = 'YOUR_ADDRESS_HERE';
const delegatorInfo = await api.query.parachainStaking.delegatorState(yourDelegatorAccount);
console.log(delegatorInfo.toHuman()["delegations"].length);
```

1.Enter your Address

2.Click run botton

3.Get the number of existing delegations

![](/img/get-your-delegations-number.png)

### Stake your Token

Choose `developer`---`Extrinsics`

1.Choose the account you would like to stake you tokens

2.Choose `parachainStaking`

3.Choose
`delegate(candidate, amount, candidateDelegationCount, delegationCount)`

4.Copy the candidate's address to delegate(the one you get from "Get the list of
candidates" step)

5.The amount that you would like to stake

6.Enter the delegationCount number from "Get the Candidate Delegation Count"

7.Enter the number of existing delegations from "Get your Number of Existing
Delegations" (If you do not stake before, then enter 0)

![](/img/stake-ztg.png)

### Check the stake result

Once the transaction is confirmed, you can check the result on` Account` Page

1.Choose ` Account`

2.Click the triangle button

3.You can see the reserved balance

![](/img/check-stake-result.png)

## How to Stop Delegations

### Schedule Request to Stop Delegations

Choose `developer`---`Extrinsics`

1.Select the account you want to execute the revocation

2.Choose `parachainStaking`

3.Choose `scheduleRevokeDelegation(collator)`

4.Select the account you want to remove the delegation for.

5.Submit this transaction.

![](/img/schedule-leave-delegation.png)

### Execute Request to Stop Delegations

Choose `developer`---`Extrinsics`

1.Select the account you want to execute the revocation

2.Choose `parachainStaking`

3.Choose `executeDelegationRequest`

4.Select the delegator's address

5.Select the account you want to remove the delegation for.

6.Submit this transaction

![](/img/execute-delegation-request.png)

### Remove all ongoing delegations

Choose `developer`---`Extrinsics`

1.Select the account you want to remove all delegation for

2.Choose `parachainStaking`

3.Choose `executeLeaveDelegators`

4.Select the account you want to remove all delegation for

5.Enter the total number that you have delegated. To check the number, see "Get
your Number of Existing Delegations"

6.Submit this transaction

![](/img/execute-leave-delegation.png)

### Verify Your State

You can verify whether your delegation was removed by following step:

Choose `developer`---`Chain State`

1.Choose `parachainStaking`

2.Choose `delegatorState`

3.Select your account

4.Enable the "Include option"

5.Click the `+`

6.Your latest result

![](/img/delegate-state.png)

### Cancel Request to Stop Delegations

Choose `developer`---`Extrinsics`

1. Select your account

2.Choose `parachainStaking`

1. Choose the `cancelDelegationRequest` or the `cancelLeaveDelegators`

4.Enter the candidate's address

5.Submit this transaction

![](/img/cancel-request-stop-delegations.png)

:::tip

If you scheduled a request via the `scheduleRevokeDelegation`, you will need to
call `cancelDelegationRequest` in step 3;

If you scheduled a request via the `scheduleLeaveDelegators`, you will need to
call `cancelDelegationRequest` in step 3;

:::
