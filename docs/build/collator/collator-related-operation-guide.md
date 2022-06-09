# Collator Related Operation Guide

## Generate Session key And Bonding

1. Use RPC to generate an author ID and create/convert session keys by sending
   RPC calls to HTTP endpoints using the `author_rotateKeys` method in your
   terminal.

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

2. Mapping Author IDs and setting session keys:

   1. Head to
      [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

   2. Choose `Developer`-`Extrinsics`

   3. Select the account you want to be associated

   4. Choose `authorMapping` and `addAssociation(authorId)`

   5. Fill your author Id and submit transaction

![addAssociation](/img/mapping-association.png)

1. Check the mapping settings:

   1. Head to
      [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

   2. Choose `Developer`-`Chain state`

   3. Choose `authorMapping` and `mappingWithDeposit`

   4. Fill your author Id and submit your request, you will get your mapping
      infomation.

![check mapping](/img/check-mapping.png)

## Get Candidate Pool Size

Add the candidate pool To get the candidate pool size, select
Developer-Javascript in Polkadot.js.

```
// Simple script to get candidate pool size
const candidatePool = await api.query.parachainStaking.candidatePool();
console.log(`Candidate pool size is: ${candidatePool.length}`);
```

![get candidate pool size](/img/get-candidate-pool-size.png)

## Join The Candidate Pool

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `joinCandidates`

5.  Fill your bond amount (in Pennock, which means you need to multiply 10^10,
    so the minimum number you should fill in is `640000000000`) and candidate
    count which you can get from [there](#get-candidate-pool-size)
6.  Submit this transaction and if succeed, you will join the candidate pool.

![join candidate pool](/img/join-candidate-pool.png)

## Leave Candidate Pool

If you want to leave candidate pool, you need to first schedule a request to
leave the pool and wait for an exit delay(10 blocks), after this delay you can
execute this request and stop working as a collator.

And we also support temporarily leaving the candidate pool without unbonding
your tokens.

### Schedule Request to Leave Candidates

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `scheduleLeaveCandidates`

5.  Fill candidate count which you can get from
    [there](#get-candidate-pool-size)
6.  Submit this transaction and if succeed, you need to wait an exit delay to
    execute this request.

![schedule leave candidates](/img/schedule-leave-candidates.png)

### Execute Request to Leave Candidates

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `executeLeaveCandidates`

5.  Fill candidate delegation count which you can get from
    [there](#get-candidate-pool-size)
6.  Submit this transaction and if succeed, you will stop working as a collator

![execute leave candidates](/img/execute-leave-candidates.png)

### Temporarily Leave the Candidate Pool

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `goOffline`

5.  Submit this transaction and if succeed, you wiil temporarily leave the
    candidate pool

![go offline](/img/go-offline.png)

## Change Bond Amount

### Bond More

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `candidateBondMore`

5.  Fill your more amount (in Pennock, which means you need to multiply 10^10,
    so if you want to bond 10 ZTG more you should fill in is `100000000000`)

6.  Submit this transaction

![bond more](/img/bond-more.png)

### Bond Less

Same as leaving candidate pool, if you want to bond less, you need to first
schedule a request and wait for an exit delay(10 blocks), after this delay you
can execute this request and bond less.

#### Schedule Bond Less Request

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `scheduleCandidateBondLess`

5.  Fill your less amount (in Pennock, which means you need to multiply 10^10,
    so if you want to bond 10 ZTG less you should fill in is `100000000000`)
6.  Submit this transaction and if succeed, you need to wait an exit delay to
    execute this request.

![schedule bond less](/img/schedule-bond-less.png)

#### Execute Bond Less Request

1.  Head to
    [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2.  Choose `Developer`-`Extrinsics`

3.  Select the account you want to be associated

4.  Choose `parachainStaking` and `executeCandidateBondLess`

5.  Submit this transaction

![execute bond less](/img/execute-bond-less.png)
