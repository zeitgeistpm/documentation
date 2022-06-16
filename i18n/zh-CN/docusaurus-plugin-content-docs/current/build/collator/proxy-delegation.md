# Proxy Delegation

## Proxy Types

| Proxy Types | Introduction                                                                                                                         |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Any         | allows the proxy account to use any function supported by the proxy pallet                                                           |
| CancelProxy | allows the proxy account to reject and remove any announced proxy calls                                                              |
| Governance  | allows the proxy account to make transactions related to governance, such as voting or proposing democracy proposals                 |
| Staking     | allows the proxy account to perform staking-related transactions, such as collator or delegator functions, including authorMapping() |

## Add Proxy For A Account

1. Head to
   [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2. Choose `Developer`-`Extrinsics`

3. Select the primary account which will controls the proxy accounts

4. Choose `proxy` and `addProxy`

5. Select the proxy account and the proxy type, you can check more details about
   roles and privileges of various proxy types

6. Set delay if you need it

7. Submit this transaction

![Add Proxy](/img/add-proxy.png)

Going back to the account page, we can see that there will be a small sign here,
you can view relevant information by clicking proxy preview.

![preview](/img/add-proxy-preview.png)

## Verify Your Proxy State

1. Head to
   [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2. Choose `Developer`-`Chain State`

3. Select the primary account which will controls the proxy accounts

4. Choose `proxy` and `proxies`

5. Select the account you want to query/verify

6. Send the query

![verify](/img/verify-proxy.png)

## Execute Proxy Delegation Transaction

1. Head to
   [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2. Choose `Developer`-`Extrinsics`

3. Select the primary account which will controls the proxy accounts

4. Choose `proxy` and `proxy` and the proxy account

5. Select the proxy delegation transaction you want to execute. Different proxy
   types can execute different proxy transactions.

6. Submit this transaction

![proxy transfer](/img/proxy-transfer.png)

We use an example of proxy transfer here to illustrate, we choose `balances` -
`transfer`, `dest` is the address of the object we want to transfer, `value` is
the amount you want to transfer (in Pennock, which means you need to multiply
10^10)

## Remove Proxy

1. Head to
   [Polkadot.js](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fbsr.zeitgeist.pm#/accounts)

2. Choose `Developer`-`Extrinsics`

3. Select the primary account which will controls the proxy accounts

4. Choose `proxy` and `removeProxy/removeProxies`

5. Select the proxy account and the proxy type

6. Set delay if you need it

7. Submit this transaction

![remove proxy](/img/remove-proxy.png)
