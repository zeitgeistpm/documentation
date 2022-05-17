---
id: cli-example
title: Using Zeitgeist markets (CLI)
---

### Setup

This page will describe some CLI commands to access a Zeitgeist chain. You can
either run a Zeitgeist chain instance locally for testing purposes or interact
with the live chain. By default, the local chain endows the well-known account
`//Alice` with test ZTG and you don't need to do anything to fund this account
or obtain the private seed. On the live chain, we will assume that you have the
private seed to an account which is funded with sufficient ZBS (or ZTG) as
appropriate for the chain. You will need over 100 ZTG or equivalent on the chain
you are using if you want to interact with a market you have created.

If you are using a local chain instance, follow the instructions to install and
start the chain in the
[zeitgeistpm/zeitgeist repo](https://github.com/zeitgeistpm/zeitgeist).
Compilation may take around 30-60 minutes.

In order to use the CLI, clone the
[zeitgeistpm/tools repo](https://github.com/zeitgeistpm/tools) and install using
`yarn`. installation using `npm` may not be complete.

```
git clone https://github.com/zeitgeistpm/tools.git
cd tools
yarn
```

We will set up a bash alias and refer to it in this doc. You can set up your own
alias, or run the command directly, with `yarn cli` or through a GUI, as you
prefer.

```
alias zgcli="node $PWD/packages/cli/dist/index.js "
```

You can test that you have setup the CLI correctly with `zgcli help` or
`yarn cli help`.

### As a user of an existing market

Find a market thatyou wish to interact with. You will need a market whose
`marketStatus` is `"Approved"`.

```
 zgcli getAllMarkets -f marketStatus marketType
```

### To create a market

Anyone can create a prediction market using Zeitgeist!

A market could be _categorical_, _scalar_ or _combinatorial_. These are
different types of market and refer to the available outcomes and how the
markets are evntually resolved (or how outcome shares redeemed).

Currently, to create a market, you must either

- leave a `ValidityBond` (larger) deposit, or
- leave a `AdvisoryBond` (smaller) deposit and, after creating the market, wait
  for it to be approved - this is to prevent spam and incomplete markets

Before the market is approved, the market will still show all its information
on-chain, but it will not be possible to add liquidity and therefore the
outcomes cannot be traded.

##### To create a market on a live Zeitgeist network:

```
 zgcli createMarket "Zeitgeist a hit?" "Will Zeitgeist be a hit?" 5HBjqZByJz36LPpod2p5ZbeM84yUywj2U1EP9WjZwDp7S4pk 125000 --seed "correct battery hore staple"

```

`"Zeitgeist a hit?"` and `"Will Zeitgeist be a hit?"` are the _title_ and
_description_ of the market you want to create. `5HBjqZByJ...` is the Account
who will act as the orcale to resolve the market. If you are just testing out
the functionality, you could set this to be your own account. `125000` is the
block number at which the market expires. You can also choose to add
` --no-advised` if you want to create a Permissionless market `--seed` is an
optional paramter, but will be necessary in order to interact with the live
chain, as you will need to run extrinsics from a funded account.

##### To create a market on a live Zeitgeist network:

We could create the same market on a local testnet, by specifying an endpoint

```
 zgcli createMarket "Zeitgeist a hit?" "Will Zeitgeist be a hit?" 5HBjqZByJz36LPpod2p5ZbeM84yUywj2U1EP9WjZwDp7S4pk 125000 --endpoint ws://localhost:9944
```

We didn't specify a seed here - we could have done, but the CLI will use the
private seed for `//Alice` by default and, on the local chain instance, this
account in endowed with a balance by default. Make a note of the `marketId` if
creation of the market was successful. (Here we'll use `0`).

As well as being funded, the `//Alice` account has sudo permissions on the local
instance, so we can approve our own market! :

```
zgcli approve 0 --endpoint ws://localhost:9944
```

### As a liquidity provider

Here we're using the example of the account created on the local chain and
approved by `//Alice`. `10000000000` correponds to 1 ZTG, so when we
`buyCompleteSet`, we are buying 300 ZTG-equivalent sets of outcomes. In the case
of this market, where we used the defaults, this means that we created a
`Yes`/`No`categorical market and so when we spend 300 ZTG, we receive both 300
`Yes` outcome tokens _and_ 300 `No` outcome tokens. We can then use `deployPool`
to be the first to deploy a liquidity pool for market `0`. (The current,
temporary, default amount to deploy to a pool is 100 ZTG equivalent of outcome
tokens, _plus_ 100 ZTG - These amounts will be configurable, but are currently
set to 100 ZTG as this is the minimum allowed to deploy to a liquidity pool)

```
zgcli buyCompleteSet 0 3000000000000 --endpoint ws://localhost:9944
zgcli deployPool 0 --endpoint ws://localhost:9944
```

Make a note of the `PoolId` if deploying the pool was successful. (Here we'll
use `0` again but be aware: `marketId`s and `PoolId`s are not interchangeable).
Note that, now the pool is deployed, it cannot be deployed again. Other
participants must instead _join_ the existing pool using `joinPool`.
