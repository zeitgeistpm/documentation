---
id: battery-park
title: Battery Park
---

:::important Zeitgeist Battery Park is still in an alpha "unreleased" phase. You
can follow this guide to connect to it but some things might not work yet. If
you would like to report a bug please open an issue on our GitHub repository.
Also note that the chain is liable to be reset **at any time without warning.**
:::

Battery Park is the name of the Zeitgeist testnet. It is named after
[The Battery](<https://en.wikipedia.org/wiki/The_Battery_(Manhattan)>), a
luscious park on the southern tip of Manhattan island with a view of the Statue
of Liberty.

## Get Connected

### Running a Node

There are two ways that you can run a node and connect to the Battery Park
testnet. One way is to build the code from source (this could take up to 45
minutes or more depending on your hardware). The other way is to use
[Docker](https://www.docker.com/) which doesn't need to build and can get you
started right away.

#### Building From Source

The source code is hosted in the
[zeitgeistpm/zeitgeist](https://github.com/zeitgeistpm/zeitgeist) repository on
the Zeitgeist GitHub.

You will need to clone the code locally, and make sure that you have the
dependencies installed. You can use the `scripts/init.sh` script inside of the
code repository to add the dependencies.

```sh
# clone the code locally
git clone https://github.com/zeitgeistpm/zeitgeist.git
# change directories
cd zeitgeist
# use the initializer script
./scripts/init.sh
```

After initializing you can then start building by using the cargo command:

```sh
cargo build --release
```

Once the build has finished you will have the `zeitgeist` binary available in
the `target/release` folder. You can start a node for Battery Park from the root
of the directory like so:

```sh
./target/release/zeitgeist --chain battery_park
```

You should see your node begin to sync blocks.

#### Using Docker

## Accessing the User Interface

You can access the Apps based (advanced) UI at:
[https://apps.zeitgeist.pm](https://apps.zeitgeist.pm)

## Faucet

TODO
