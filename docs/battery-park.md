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

If you want to support and strengthen Battery Park by running your own network
node, head over to the section [Get Connected](battery-park#get-connected). If
you want to interact with Battery Park, head over to the section
[Accessing the User Interface](battery-park#accessing-the-user-interface)

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
# change directory
cd zeitgeist
# select correct version
git checkout fb127223ea8990bb27819dbbb9b15a46d7ffea73
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
./target/release/zeitgeist --chain battery_park --bootnodes /ip4/139.162.171.58/tcp/30333/p2p/12D3KooWPvu5rpH2FNYnAmiQ8X8XqkMiuSFTjH2jwMCSjoam7RGQ
```

You should see your node begin to sync blocks.

#### Using Docker

We publish the latest version to the
[Docker Hub](https://hub.docker.com/r/zeitgeistpm/zeitgeist-node) that can be
pulled and ran locally to connect to the network. In order to do this first make
sure that you have Docker installed locally.

##### Downloading the docker image
```
docker pull zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73
```

##### Running the image with a temporary node id
You can run the docker image using the following command, but the node id
is lost after you shut down the docker image:
```
docker run zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73 --chain battery_park
```

If you want to receive rewards through the [Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform)
for running a node, head over to [Generating a key for a permanent node id on Linux](battery-park#generating-a-key-for-a-permanent-node-id-on-linux)

##### Generating a key for a permanent node id on Linux
You need a permanent node id if you want to participate in the
[Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform).
Execute the following code, but make sure to read the comments and adjust
the variable `ZEITGEIST_KEY_PATH` and `ZEITGEIST_KEY_NAME`:

```
# Configure where your key is stored (last character must not be "/")
ZEITGEIST_KEY_PATH="${HOME}/.zeitgeist"
# Configure the key name
ZEITGEIST_KEY_NAME="node_key"
mkdir -p ${ZEITGEIST_KEY_PATH}
# Attention: Old keys you stored in the same path might be overwritten here
xxd -l 32 -c 32 -p /dev/urandom > ${ZEITGEIST_KEY_PATH}/${ZEITGEIST_KEY_NAME}
chmod 400 ${ZEITGEIST_KEY_PATH}/${ZEITGEIST_KEY_NAME} 
```

If you simply run the docker image directly, make sure to export the
`ZEITGEIST_KEY_PATH` environment variable on login:
```
echo -e "\n# Zeitgeist node id secret file\nexport ZEITGEIST_KEY_PATH=${ZEITGEIST_KEY_PATH}\nexport ZEITGEIST_KEY_NAME=${ZEITGEIST_KEY_NAME}" >> ${HOME}/.profile
```
*note: Opening a new terminal will require to source the profile file again,*
*such that the environment variables are active again: `source ${HOME}/.profile`.*
*You can log out of and into your system again to automate this procedure.*

If you want to run a service that automatically runs the node, make sure
to include the `ZEITGEIST_KEY_PATH` and the `ZEITGEIST_KEY_NAME` environment
variables in the service file, again the last character of
`ZEITGEIST_KEY_PATH` must not be "/":

```
Environment="ZEITGEIST_KEY_PATH=/path/to/node_key"
Environment="ZEITGEIST_KEY_NAME=node_key"
```

Make sure to backup the secret file to a safe place to avoid loss of rewards
due to a lost secret for the node id:
```
cp ${ZEITGEIST_KEY_PATH}/${ZEITGEIST_KEY_NAME} /your/safe/place
```

##### Generating a key for a permanent node id on Windows
Windows instructions will follow soon.


##### Running the docker image with a permanent node id
executing the following command launch the node using the node id file
that we generated before to assure a constant node id:
```
docker run zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73 --chain battery_park --node-key "$(cat ${ZEITGEIST_KEY_PATH}/${ZEITGEIST_KEY_NAME})"
```

## Accessing the User Interface

You can access the campaign we put together to celebrate the Kusama 
parachain auctions and help incentivize our testnet at: [https://proto.zeitgeist.pm/kusama-derby](https://proto.zeitgeist.pm/kusama-derby)

You can follow our [kusama-derby tutorial](how-to-participate-in-derby) to learn how to interact with it.
This is not the full Zeitgeist application, it is only one special
use case. The full Zeitgeist application will be released in the future.

You can also access the Apps based (advanced) UI at:
[https://polkadot.js.org/apps/?rpc=wss://bp-rpc.zeitgeist.pm](https://polkadot.js.org/apps/?rpc=wss://bp-rpc.zeitgeist.pm)

## Faucet

We operate a [faucet discord channel](https://discord.gg/VWMY3xMtWb), that
offers a faucet that can be used to receive the native Zeitgeist currency for
the Battery Park testnet, ZBP (Zeitgeist Battery Park), which is required for
numerous interactions with Battery Park. You can request 1 ZBP per 24 hours by
using the `!drip your_account_address` command in the
[faucet discord channel](https://discord.gg/VWMY3xMtWb). The account address
should start with a "5".

There are numerous ways to generate an account, we suggest to use
[Polkadot{.js} extension](https://github.com/polkadot-js/extension) though,
because it is simple and straightforward to use. You can get it at:

- [Chrome web store](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd)
- [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/)
