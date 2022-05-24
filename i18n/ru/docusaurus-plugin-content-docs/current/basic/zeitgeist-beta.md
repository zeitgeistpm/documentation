---
id: zeitgeist-beta
title: Zeitgeist Beta
---

Zeitgeist is currently in closed beta, which runs on Zeitgeist's test network
[Battery Station](./battery-station). You can access the beta application at:
[https://beta.zeitgeist.pm](https://beta.zeitgeist.pm). Note that to gain access
to the beta application, an NFT from one of the Zeitgeist Tarot collections is
required:

- [Zeitgeist Tarot: Fool Collection](https://singular.rmrk.app/collections/102cb9e9988c85201e-ZEITGEIST-FOOL-COLLECTION?page=1&forsale=forSale&sortBy=priceAscending)
- [Zeitgeist Tarot: Lovers Collection](https://singular.rmrk.app/collections/102cb9e9988c85201e-ZEITGEIST-LOVERS-COLLECTION)
- [Zeitgeist Tarot: Justice Collection](https://singular.rmrk.app/collections/102cb9e9988c85201e-ZEITGEIST-JUSTICE-TAROT-COLLECTION)
- [Zeitgeist Tarot: Hierophant Collection](https://singular.rmrk.app/collections/102cb9e9988c85201e-ZEITGEIST-HIEROPHANT-TAROT-COLLECTION)
- [Zeitgeist Tarot: Star Collection](https://singular.rmrk.app/collections/102cb9e9988c85201e-ZEITGEIST-STAR-COLLECTION)

<!-- prettier-ignore -->
:::important
The beta application takes a snapshot every couple of minutes. If you've just
bought the NFT, you may have to wait until the next snapshot is taken until you
can gain access.
:::

You can follow our
[beta app tutorial](https://whisker17.github.io/APP-Guide/#/en/app-en) to learn
how to interact with the application.

You can also access the polkadot.js-based (advanced) UI at:
https://polkadot.js.org/apps/?rpc=wss://bsr.zeitgeist.pm

## Getting ZBS

Battery Station uses the ZBS token, instead of ZTG. ZBS is provided to users
through a frictioned faucet on Discord in order to allow for testing and
experimentation. To gain access to the faucet, an NFT from one of the
collections above is required.

### Using the !drip command

The normal way to get ZBS from the faucet is to use the !drip command.

- First create a new Zeitgeist account (standard Substrate account) using the
  Polkadot-JS Extension that is available
  [here](https://polkadot.js.org/extension/).
- Follow the instructions from
  [Account Generation](https://wiki.polkadot.network/docs/learn-account-generation)
  for creating a new account. Once you have created an account, select either
  "Use on any chain" or "Zeitgeist Battery Station" in the side menu of the new
  account.
- Go to Zeitgeist's Discord server and enter into the #faucet channel.
- Copy your address from the extension, ensure that it's in Substrate generic or
  Battery Station format (begins with either a "5" or "d").
- Type in `!drip <address>` to the faucet channel.
- The faucet should respond that it sent you some ZBS.
- After completing this you will have a 24 hour cooldown until you can get more
  ZBS.
