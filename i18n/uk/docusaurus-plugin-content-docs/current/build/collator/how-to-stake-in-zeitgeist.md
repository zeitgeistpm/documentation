# Як стейкати у Zeitgeist

Перейдіть до [polkadot.js](https://https://polkadot.js.org/apps/) аби проконтролювати стейкінг у вашому обліковому записі.

### Отримати Список Кандидатів

1. Оберіть **Developer** > **Chain state**

1. Оберіть `parachainStaking`

1. Далі виберіть `candidatePool(): ParachainStakingSetOrderedSetBond`

1. Натисніть `+` для запиту

1. Скопіюйте адресу кандидата до якої ви хочете делегувати свої токени

![](/img/get-candidates-list.png)

### Отримати дані про кількість делегацій кандидатів

1. Оберіть **Developer** > **Chain state**

1. Оберіть `parachainStaking`

1. Далі оберіть `candidateInfo(AccountId32): Option<ParachainStakingCandidateMetadata>`

1. Вставте адресу кандидатів у колатори

1. Увімкніть "опцію додавання"

1. Натисніть `+` для запиту

1. Отримайте дані про кількість делегацій

![](/img/get-delegation-count.png)

### Отримати дані про чинні делегації

Виберіть **Developer** > **JavaScript** і скопіюйте наступний код у редактор:

```
// Simple script to get your number of existing delegations.
// Remember toreplace YOUR_ADDRESS_HERE with your delegator address.

const yourDelegatorAccount = 'YOUR_ADDRESS_HERE';
const delegatorInfo = await api.query.parachainStaking.delegatorState(yourDelegatorAccount);
console.log(delegatorInfo.toHuman()["delegations"].length);
```

1. Замініть `YOUR_ADDRESS_HERE` на вашу адресу

1. Натисніть кнопку "Run" (Запуск)

1. Отримайте число чинних делегацій

![](/img/get-your-delegations-number.png)

### Перевірте суму, яку ви можете застейкати

У вас є баланс, який складається із тих, що передаються, а також заблокованих та зарезервованих токенів. Ви можете стейкати лише ті токени, що передаються (transferrable). Щоб перевірити кількість transferrable токенів, перевірте сторінку **Accounts**:

![](/img/check-stake-result.png)

### Застейкати токени

Оберіть **Developer** > **Extrinsics**.

1. Виберіть обліковий запис, на який ви хочете делегувати свої токени

1. Оберіть `parachainStaking`

1. Оберіть `delegate(candidate, amount, candidateDelegationCount, delegationCount)`

1. Скопіюйте адресу кандидата в делегати (ту, яку ви отримали на кроці "Отримати список кандидатів")

1. Вкажіть суму, яку ви хотіли б застейкати. Сума вказана у Pennocks, що означає, що вам потрібно помножити суму ZTG на $10^{10}$, так що якщо ви хочете поставити 1 ZTG, ви повинні заповнити `100000000`

1. Введіть `delegationCount` від [Get the Candidate Delegation Count][]

1. Введіть кількість існуючих делегацій із \[Get the Number of Existing Делегації\] (якщо ви не зробили цього раніше, введіть `0`)

![](/img/stake-ztg.png)

### Перевірте результат Стейкінгу

Після підтвердження транзакції ви можете перевірити результат на сторінці **Accounts**:

1. Натисніть на трикутник

1. Ви можете побачити зарезервований баланс

![](/img/check-stake-result.png)

### Збільшити суму облігацій

Якщо ви хочете делегувати більше ZTG колатору, з яким ви вже стейкали, ви можете використовувати extrinsic `delegatorBondMore(candidate, more)`. Оберіть **Developer** > **Extrinsics**.

1. Виберіть свій обліковий запис у розділі _using the selected account_.

1. Виберіть `parachainStaking` під _submit the following extrinsic_.

1. Виберіть `delegatorBondMore(candidate, more)`.

1. Вставте адресу колатора, з яким вже раніше стейкали у `candidate`.

1. Під `more` введіть суму, яку бажаєте застейкати. Сума вказана у Pennocks, що означає, що вам потрібно помножити суму ZTG на  `10^10`, так що якщо ви хочете застейкати 1 ZTG, ви повинні заповнити 10000000000.

1. Натисніть `Submit Transaction`

## Як зупинити делегації

### Заплануйте запит на припинення делегування

Оберіть **Developer** > **Extrinsics**.

1. Виберіть обліковий запис, для якого ви хочете виконати відміну

1. Оберіть `parachainStaking`

1. Оберіть `scheduleRevokeDelegation(collator)`

1. Виберіть обліковий запис, для якого хочете відмінити делегування

1. Надішліть транзакцію

![](/img/schedule-leave-delegation.png)

### Виконайте запит на зупинку делегації

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

1. Enter the total number that you have delegated. To check the number, see [Get the Number of Existing Delegations]

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

1. Choose the `cancelDelegationRequest` or the `cancelLeaveDelegators`, depending on whether your scheduled the request via `scheduleRevokeDelegation` or `scheduleLeaveDelegators`

1. Enter the candidate's address

1. Submit this transaction

![](/img/cancel-request-stop-delegations.png)
  #get-the-number-of-existing-delegations

[Get the Candidate Delegation Count]: #get-the-candidate-delegation-count
