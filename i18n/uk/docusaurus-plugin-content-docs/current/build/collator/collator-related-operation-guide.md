# Посібник з Експлуатації Колатора

## Генерація сеансового ключа та прив'язка

1. Використовуйте RPC для генерації ідентифікатора автора та створення/перетворення сеансових ключів, надсилаючи RPC виклики на кінцеві точки HTTP, використовуючи метод `author_rotateKeys` у вашому терміналі.

   ```
   curl http://127.0.0.1:9933 -H \
   "Content-Type:application/json;charset=utf-8" -d \
     '{
       "jsonrpc": "2.0",
       "id":1,
       "method": "author_rotateKeys",
       "params": []
     }'
   ```

1. Зіставлення ID Автора та встановлення сеансових ключів:

   1. Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

   1. Виберіть `Developer`-`Extrinsics`

   1. Виберіть потрібний обліковий запис

   1. Оберіть `authorMapping` та `addAssociation(authorId)`

   1. Заповніть ID автора та підтвердіть транзакцію

   ![addAssociation](/img/mapping-association.png)

1. Перевірте параметри відображення:

   1. Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

   1. Виберіть `Developer`-`Chain state`

   1. Оберіть `authorMapping` та `mappingWithDeposit`

   1. Заповніть ID автора та подайте запит, і ви отримаєте інформацію щодо цього.

   ![addAssociation](/img/check-mapping.png)

## Отримати розмір пулу кандидатів

Додайте пул кандидатів, щоб отримати розмір пулу кандидатів, оберіть Developer-Javascript у Polkadot.js.

```
// Простий скрипт для отримання розміру пула кандидатів
const candidatePool = await api.query.parachainStaking.candidatePool();
console.log(`Candidate pool size is: ${candidatePool.length}`);
```

![get candidate pool size](/img/get-candidate-pool-size.png)

## Приєднатися до пулу кандидатів

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Виберіть потрібний обліковий запис

1.  Оберіть `parachainStaking` і `joinCandidates`

1.  Заповніть суму облігації (у Pennock, тобто вам потрібно помножити $10^{10}$, тому мінімальна кількість, яку ви повинні заповнити, це `640000000000`) та кількість кандидатів ви можете отримати [тут](#get-candidate-pool-size)
1.  Подайте цю транзакцію і, якщо вона успішна, ви приєднаєтеся до пулу кандидата.

![join candidate pool](/img/join-candidate-pool.png)

## Покинути пул кандидатів

Якщо ви хочете залишити пул для кандидатів, вам потрібно спочатку запланувати запит на вихід з пулу та зачекати (10 блоків), після цієї затримки ви можете виконати запит та припинити роботу у ролі колатора.

Окрім того, ми підтримуємо тимчасовий вихід з пулу кандидатів без розблокування токенів.

### Заплануйте запит для виходу з пулу

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Виберіть потрібний обліковий запис

1.  Оберіть `parachainStaking` та `scheduleLeaveCandidates`

1.  Заповніть кількість кандидатів, які ви можете отримати [тут](#get-candidate-pool-size)
1.  Надішліть запит на цю операцію і, якщо вона успішна, необхідно дочекатися exit delay (певна кількість блоків) перед виконанням запиту.

![schedule leave candidates](/img/schedule-leave-candidates.png)

### Виконайте запит для виходу з пулу

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Chain state`

1.  Виберіть потрібний обліковий запис

1.  Оберіть `parachainStaking` та `executeLeaveCandidates`

1.  Заповніть кількість кандидатів, які ви можете отримати [тут](#get-candidate-pool-size)
1.  Подайте запит на цю транзакцію і, якщо вона успішна, ви припините роботу колатора.

![execute leave candidates](/img/execute-leave-candidates.png)

### Тимчасовий вихід з пулу кандидатів

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Виберіть потрібний обліковий запис

1.  Оберіть `parachainStaking` та `goOffline`

1.  Подайте запит на цю транзакцію і, якщо вона успішна, ви зможете тимчасово покинути пул.

![go offline](/img/go-offline.png)

## Змінити суму облігацій

### Обрати більшу суму

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Виберіть потрібний обліковий запис

1.  Оберіть `parachainStaking` та `candidateBondMore`

1.  Заповніть вашу збільшену суму (Pennock, це означає, що вам потрібно помножити $10^{10}$, тож, якщо потрібно на 10 ZTG більше, це варто заповнити як `100000000000`)

1.  Подайте запит на транзакцію

![bond more](/img/bond-more.png)

### Обрати меншу суму

Так само, як у виході з пулу кандидатів, якщо ви хочете зв'язати менше, вам треба спочатку запланувати запит та чекати затримки виходу (10 блоків), після цієї затримки ви можете виконати запит.

#### Запланувати запит на зменшення суми облігацій

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Виберіть необхідний обліковий запис

1.  Виберіть `parachainStaking` та `scheduleCandidateBondLess`

1.  Введіть зменшену суму (в Pennock, це означає, що вам потрібно помножити 10^10, тому, якщо ви хочете зв'язати на 10 ZTG менше, ви повинні заповнити `100000000000`)

1.  Надішліть запит на цю операцію і, якщо вона успішна, необхідно дочекатися exit delay (певна кількість блоків) перед виконанням запиту.

![schedule bond less](/img/schedule-bond-less.png)

#### Виконати запит на зменшення кількості облігацій

1.  Передіть до [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

1.  Виберіть `Developer`-`Extrinsics`

1.  Оберіть необхідний обліковий запис

1.  Оберіть `parachainStaking` та `executeCandidateBondLess`

1.  Надішліть транзакцію

![execute bond less](/img/execute-bond-less.png)
