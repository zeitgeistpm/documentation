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

## Get connected

This section will guide you through setting up your own node.
Under the current average system load, the node can be run on a Raspberry PI 4B
(built from source):
- CPU:        Broadcom BCM2711, Quad core Cortex-A72 (ARM v8) 64-bit SoC @ 1.5GHz
- RAM:        4 GB
- Hard drive: SSD recommended, but also works on MicroSD for low loads

The minimum system requirements under continuous full system load are:
- CPU:        Ryzen 5 3600
- RAM:        32 GB (less should be sufficient, but was not tested)
- Hard drive: SSD

### Running a node

There are two ways that you can run a node and connect to the Battery Park
testnet. One way is to [build the code from source](battery-park#building-from-source).
On recent hardware this should take about 5-10 minutes, on older hardware 
this can take more than 45 minutes. [The other way](battery-park#using-docker) 
is to use [Docker](https://www.docker.com/) which doesn't need to build and can
get you started right away.

#### Building from source

*Note for Windows users: Although it should be possible to build this project*
*on Windows, it is not well supported. Instead it is recommended to build this*
*project inside WSL in Windows. If you want to build this on Windows anyways,*
*you can follow [this tutorial](https://substrate.dev/docs/en/knowledgebase/getting-started/windows-users)*
*to setup your build environment and continue with this tutorial afterwards.*
*We have not tested building on Windows and cannot guarantee that it will work.*

The source code is hosted in the
[zeitgeistpm/zeitgeist](https://github.com/zeitgeistpm/zeitgeist) repository on
the Zeitgeist GitHub.

To be able to compile the project, Rust must be installed on your system.
We recommend using [rustup](https://rustup.rs/#) to manage your rust
build environments. This instructions will assume that you have rustup
installed.

You will need to clone the code locally, and make sure that you have the
[dependencies](https://substrate.dev/docs/en/knowledgebase/getting-started/#1-build-dependencies)
installed. Execute the following commands to fetch the project:

```sh
# clone the code locally
git clone https://github.com/zeitgeistpm/zeitgeist.git
# change directory
cd zeitgeist
# select correct version
git checkout fb127223ea8990bb27819dbbb9b15a46d7ffea73
```

Next configure rustup, on Unix you can execute the following script:
```sh
# use the initializer script
./scripts/init.sh
```
Otherwise configure rustup manually:
```sh
rustup update nightly-2021-03-10
rustup update stable
rustup target add wasm32-unknown-unknown --toolchain nightly-2021-03-10
```

After initializing you can then start building by using the cargo command:

```sh
cargo build --release
```

Once the build has finished you will have the *zeitgeist* binary available in
the *target/release* folder. You can start a node for Battery Park from the root
of the directory like so:

```sh
./target/release/zeitgeist --chain battery_park --bootnodes /ip4/139.162.171.58/tcp/30333/p2p/12D3KooWPvu5rpH2FNYnAmiQ8X8XqkMiuSFTjH2jwMCSjoam7RGQ --telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"
```

You should see your node begin to sync blocks.

The previous command will store the chain data in
*$HOME/.local/share/zeitgeist/chains/battery_park*. You can choose a different
location, for example */services/zeitgeist* by using the `-d` parameter:
```sh
./target/release/zeitgeist -d /services/zeitgeist --chain battery_park --bootnodes /ip4/139.162.171.58/tcp/30333/p2p/12D3KooWPvu5rpH2FNYnAmiQ8X8XqkMiuSFTjH2jwMCSjoam7RGQ --telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"
```
Ensure that you have write permissions for the path. In case you want to use
the */services/zeitgeist* folder at the root of the file system, you will have to change
the ownership to the user who runs the Zeitgeist node (called *user* here):
```sh
chown -R user:user /services/zeitgeist
```

If you want to receive rewards through the [Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform)
for running a node, you have to ensure that your node id is permanent and your
node has an high up-time. Your node id is derived from a secret, that is stored
within */services/zeitgeist/chains/battery_park/network/secret_ed25519*. First ensure
that the file is read-only:
```
chmod 400 /services/zeitgeist/chains/battery_park/network/secret_ed25519
```
Then backup your secret file to a safe place, such that you can continue to 
earn rewards for that node id after a loss of data.

Your node id is printed by the node shortly after it has been started. It looks 
like this:
> Local node identity is: 12D3KooWKzzeu1thnWQv8CCWaugFfpeCXnq7jmp6GENSdXqG5xX9

In addition, you should ensure that your node has a maximum up-time, because
your rewards will depend on it. To do this, you could use a systemd service,
that automatically starts your Zeitgeist chain and restarts it in case of an 
error. To do so, you can follow the guide at [Automatically running the Zeitgeist chain as a systemd service (Linux)](battery-park#automatically-running-the-zeitgeist-chain-as-a-systemd-service-linux).

Feel free to play around with the other available options, which you can 
inspect by executing:
```sh
./target/release/zeitgeist --help
```

#### Using Docker

We publish the latest version to the
[Docker Hub](https://hub.docker.com/r/zeitgeistpm/zeitgeist-node) that can be
pulled and ran locally to connect to the network. In order to do this first make
sure that you have Docker installed locally.

##### Downloading the docker image
```sh
docker pull zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73
```

##### Running the docker image
You can run the docker image using the following command, but the node id
and the chain data are lost after you shut down the docker container:
```sh
docker run zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73 --chain battery_park --telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"
```

To keep the chain data, you will have to select a folder on your system that
docker will use to store its files in. Ensure that the folder does exist.
Assuming the path you want to use locally is */services/zeitgeist*, 
the command would be:
```sh
docker run -v /services/zeitgeist:/zeitgeist zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73 -d /zeitgeist --chain battery_park --telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"
```
Ensure that you have write permissions for the path. In case you want to use
the */services/zeitgeist* folder at the root of the file system, you will have to change
the ownership to the user who runs the Zeitgeist node (called *user* here). On
Unix systems, you can change the ownership by using the following command:
```sh
chown -R user:user /services/zeitgeist
```

If you want to receive rewards through the [Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform)
for running a node, you have to ensure that your node id is permanent and your
node has an high up-time. Your node id is derived from a secret, that is stored
within */services/zeitgeist/chains/battery_park/network/secret_ed25519*. First ensure
that the file is read-only. On Unix:
```
chmod 400 /services/zeitgeist/chains/battery_park/network/secret_ed25519
```

On Windows (assuming you have chosen the path *C:\services\zeitgeist*):
```sh
attrib +r "C:\services\zeitgeist\chains\battery_park\network\secret_ed25519"
```

Then backup your secret file to a safe place, such that you can continue to 
earn rewards for that node id after a loss of data.

Your node id is printed by the node shortly after the `docker run` command was
executed. The message looks like this:
> Local node identity is: 12D3KooWKzzeu1thnWQv8CCWaugFfpeCXnq7jmp6GENSdXqG5xX9


That's it, your node should be running and syncing with other nodes, while
using a persistent chain storage and node id. If you want to participate in the
collators program, you should ensure that your node has a maximum up-time, 
because your rewards will depend on it. It is suggested to automatically start 
and restart the docker container that runs the node, which is explained in [Automatically running the Zeitgeist chain as a docker service](battery-park#automatically-running-the-zeitgeist-chain-as-a-docker-service).

##### Automatically running the Zeitgeist chain as a docker service
To automatically start a docker container every time (including after 
reboots and errors), except when it was explicitly stopped by a docker command,
append the `-d` and `--restart` flag to the `docker run` command from above:
```sh
docker run --restart unless-stopped -d -v /services/zeitgeist:/zeitgeist zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73 -d /zeitgeist --chain battery_park --telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"
```
*Note: If you want to participate in the [Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform),*
*you should also add a `--name your_node_name` parameter at the end of*
*the supplied command.*

After the command was executed, one line is printed in the terminal that
represents the container id. It looks like this:
> 1e501c25e43be3f2cecc3bade11b22f60f17839d41b37cdac9139cb8ebc8700b

To retrieve your node id, execute the following command (replace *container_id*
with the container id that was printed to your terminal):
```sh
docker logs container_id
```
The previous command shows the outputs of the node. It should include one line 
containing your node id, that looks like:
> Local node identity is: 12D3KooWKzzeu1thnWQv8CCWaugFfpeCXnq7jmp6GENSdXqG5xX9

You can also retrieve the container id by using the following command:
```sh
docker ps --filter ancestor=zeitgeistpm/zeitgeist-node:fb127223ea8990bb27819dbbb9b15a46d7ffea73
```

##### Automatically running the Zeitgeist chain as a systemd service (Linux)
To automatically start and restart the zeitgeist chain, you can use a systemd
service. It is not recommended to do this with a docker image, but for a
zeitgeist binary that was built from source it is perfectly adequate.

We will create a non-privileged user to execute the Zeitgeist node, setup the
folder structure, create a systemd service file, launch the service and
inspect the output.

Create a new user (without a home folder) and disable login for that user
(ensure to copy&paste both commands sequentially to ensure they're executed):
```sh
sudo useradd -M zeitgeist
```
```sh
sudo usermod zeitgeist -s /sbin/nologin
```

Create a folder that will contain the Zeitgeist data and the previously
compiled binary file (see [Building from source](battery-park#building-from-source)).
Note down were your *zeitgeist* binary lies (it is within the source folder at
*target/release*) and replace the path after the `cp` command that is
shown below. In this example we will use */services/zeitgeist*
as the base folder for our service, */service/zeitgeist/bin* will contain the
*zeitgeist* binary and the whole */services/zeitgeist* folder structure will
be owned by the non-privileged zeitgeist user we created in the previous step:
```sh
sudo mkdir -p /services/zeitgeist/bin
sudo cp /path/to/your/target/release/zeitgeist /services/zeitgeist/bin
sudo chown -R zeitgeist:zeitgeist /services/zeitgeist
```

Create a systemd service file. You can use your favorite editor, in this 
example we will use `nano` though, because it is well supported. 
```sh
sudo nano /etc/systemd/system/zeitgeist-node.service
```

You can just use the following template or adjust it to your needs:
```sh
[Unit]
Description=Zeitgeist chain node
After=network.target
Requires=network.target

[Service]
Type=simple
User=zeitgeist
Group=zeitgeist
RestartSec=5
Restart=always
Nice=0
ExecStart=/services/zeitgeist/bin/zeitgeist \
			-d /services/zeitgeist \
			--chain battery_park \
			--name WiPi \
			--bootnodes /ip4/139.162.171.58/tcp/30333/p2p/12D3KooWPvu5rpH2FNYnAmiQ8X8XqkMiuSFTjH2jwMCSjoam7RGQ \
        	--telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"


[Install]
WantedBy=multi-user.target
```
You can adjust the *Nice* value to configure the priority of the process the 
service spawns. 20 is the lowest, -20 the highest priority.

*Note: If you want to participate in the [Zeitgeist collator program](https://docs.google.com/forms/d/e/1FAIpQLSc857iTOfp_3CHCdh7qeZwkD_vQfxFeARbMsjhrCF12YBGsuQ/viewform),*
*you should also add a `--name your_node_name` parameter at the end of the*
*ExecStart argument of the service file.*

Paste your copy buffer into nano by pressing `CTRL+SHIFT+V` and save the
changes by pressing `CTRL+X`, `y` and `ENTER`

Enable the service and start it:
```sh
sudo systemctl enable zeitgeist-node
sudo systemctl start zeitgeist-node
```

Check if it is up and running and syncing with the rest of the network:
```sh
systemctl status zeitgeist-node
```

If it shows *Active: active (running)*, your service works as
expected. Use the following command to retrieve your node id:
```sh
journalctl -u zeitgeist-node.service | grep "node id"
```

Otherwise enter the following command and inspect what went wrong:
```
journalctl -u zeitgeist-node
```

If you are stuck with an error you can ask for assistance in our 
[node-operators Discord channel](https://discord.gg/WD3VkGt9eY).

## Connecting to Telemetry

By default, your node will connect to Parity's telemetry endpoint that is accessible at [https://telemetry.polkadot.io](https://telemetry.polkadot.io).
You can ensure your node is up and running by visiting this page, selecting the "Zeitgeist Battery Park" network and searching for your node's name
(search can be started by simply typing while on the telemetry page).

### Alternative Telemetry

Since we've recently hit the limit of 500 active nodes on Parity's telemetry server, we've also set up our own Telemetry server.
In order to connect to Zeitgeist's telemetry server, start your node with the flag `--telemetry-url "wss://telemetry.zeitgeist.pm/submit/ 0"`.
You can now your node is connected by visiting our page at [https://telemetry.zeitgeist.pm](https://telemetry.zeitgeist.pm).

## Accessing the user interface

You can access the campaign we put together to celebrate the Kusama 
parachain auctions and help incentivize our testnet at: [https://proto.zeitgeist.pm/kusama-derby](https://proto.zeitgeist.pm/kusama-derby)

You can follow our [kusama-derby tutorial](how-to-participate-in-derby) to learn how to interact with it.
This is not the full Zeitgeist application, it is only one special
use case. The full Zeitgeist application will be released in the future.

You can also access the Apps based (advanced) UI at:
[https://polkadot.js.org/apps/?rpc=wss://bp-rpc.zeitgeist.pm](https://polkadot.js.org/apps/?rpc=wss://bp-rpc.zeitgeist.pm)

## Faucet

We operate a [faucet](using-the-faucet), that can be used to receive the native
Zeitgeist currency for the Battery Park testnet, ZBP (Zeitgeist Battery Park),
which is required for numerous interactions with Battery Park. You will need
an account to retrieve ZBP.

There are numerous ways to generate an account, we suggest to use
[Polkadot{.js} extension](https://github.com/polkadot-js/extension) though,
because it is simple and straightforward to use. You can get it at:

- [Chrome web store](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd)
- [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/)
