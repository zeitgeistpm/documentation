---
id: battery-station
title: Battery Station
---

:::important Zeitgeist Battery Station is a test network in beta phase. You
can follow this guide to connect to it but some things might not work yet. If
you would like to report a bug please open an issue on our GitHub repository.
Also note that the chain is liable to be reset **at any time without warning.**
:::

If you want to support and strengthen Battery Station by running your own network
node, head over to the section [Get Connected](battery-station#get-connected). If
you want to interact with Battery Station, head over to the section
[Accessing the User Interface](battery-station#accessing-the-user-interface)

## Get connected

The minimum system requirements are:
- CPU:        Ryzen 5 3600
- RAM:        32 GB (less should be sufficient, but was not tested)
- Hard drive: SSD

There are two ways that you can run a node and connect to the Battery Station
testnet. One way is to [build the code from source](battery-station#building-from-source).
On recent hardware this should take about 15 minutes. [The other way](battery-station#using-docker) 
is to use [Docker](https://www.docker.com/) which doesn't need to build and can
get you started right away.

### Building from source

*Note for Windows users: Although it should be possible to build this project*
*on Windows, it is not well supported. Instead it is recommended to build this*
*project inside WSL in Windows. If you want to build this on Windows anyways,*
*you can follow [this tutorial](https://substrate.dev/docs/en/knowledgebase/getting-started/windows-users)*
*to setup your build environment and continue with this tutorial afterwards.*
*We have not tested building on Windows and cannot guarantee that it will work.*

*Note for Ubuntu >= 16 users: Building from source is not necessary, since we offer*
*a [pre-built binary](https://github.com/zeitgeistpm/zeitgeist/releases/download/v0.2.0/zeitgeist-parachain).
*You can use it instead of building from source and skip this tutorial to the part*
*that describes how to fetch the Zeitgeist relay chain specification. Feel free to*
*use the following command to download the binary under the name "zeitgeist" into*
*the current folder (and don't forget to replace "/target/release/zeitgeist" with*
*"zeitgeist" during the tutorial):*
```sh
curl -o zeitgeist https://github.com/zeitgeistpm/zeitgeist/releases/download/v0.2.0/zeitgeist-parachain
```

The source code is hosted in the
[zeitgeistpm/zeitgeist](https://github.com/zeitgeistpm/zeitgeist) repository on
GitHub.

To be able to compile the project, Rust must be installed on your system.
We recommend using [rustup](https://rustup.rs/#) to manage your rust
build environments. This instructions will assume that you have rustup
installed.

You will need to clone the code locally, and make sure that you have the
[dependencies](https://substrate.dev/docs/en/knowledgebase/getting-started/#1-build-dependencies)
installed. Execute the following commands to fetch the project:

```sh
# clone the code locally and checkout version v0.2.0
git clone https://github.com/zeitgeistpm/zeitgeist.git --depth 1 --branch v0.2.0
# change directory
cd zeitgeist
```

Next configure rustup, on Unix you can execute the following script:
```sh
# use the initializer script
./scripts/init.sh
```
Otherwise configure rustup manually:
```sh
rustup update nightly-2021-09-28
rustup update stable
rustup target add wasm32-unknown-unknown --toolchain nightly-2021-09-28
```

After initializing you can then start building by using the cargo command:

```sh
cargo build --release --features parachain
```

*Note: A system with at least 16gb of RAM is required to build the node.*

Once the build has finished you will have the *zeitgeist* binary available in
the *target/release* folder. The Zeitgeist node consists of two components:
1. The Zeitgeist parachain
2. The Zeitgeist relaychain

To be able to use the Zeitgeist relaychain instead of the Polkadot relaychain,
a custom chain specification is required that can be obtained with:
```sh
curl -o battery-station-relay.json https://raw.githubusercontent.com/zeitgeistpm/polkadot/battery-station-relay/node/service/res/battery-station-relay.json

```

You can start a full-node (non-authoring) for Battery Station from the root
of the directory like this:

```sh
./target/release/zeitgeist \
    --bootnodes=/ip4/45.33.117.205/tcp/30001/p2p/12D3KooWBMSGsvMa2A7A9PA2CptRFg9UFaWmNgcaXRxr1pE1jbe9 \
    --chain=battery_station \
    --parachain-id=2050 \
    --port=30333 \
    --rpc-port=9933 \
    --ws-port=9944 \
    -- \
    --bootnodes=/ip4/45.33.117.205/tcp/31001/p2p/12D3KooWHgbvdWFwNQiUPbqncwPmGCHKE8gUQLbzbCzaVbkJ1crJ \
    --bootnodes=/ip4/45.33.117.205/tcp/31002/p2p/12D3KooWE5KxMrfJLWCpaJmAPLWDm9rS612VcZg2JP6AYgxrGuuE \
    --chain=battery-station-relay.json \
    --port=30334 \
    --rpc-port=9934 \
    --ws-port=9945
```

You should see your node begin to sync blocks.

Feel free to play around with the other available options, which you can 
inspect by executing:
```sh
./target/release/zeitgeist --help
```

If you plan to continuously run your node, jump to the next section.

#### Automatically running the Zeitgeist parachain as a systemd service (Linux)
To automatically start and restart the zeitgeist chain, you can use a systemd
service. It is not recommended to do this with a docker image.

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

Create a folder that will contain the Zeitgeist data, previously
compiled binary file and relaychain chain specification file
(see [Building from source](battery-station#building-from-source)).
Note were your *zeitgeist* binary lies (by default it is within
the source folder at *target/release*) and replace the path after the `cp`
command that is shown below. In this example we will use */services/zeitgeist*
as the base folder for our service, */services/zeitgeist/bin* will contain the
*zeitgeist* binary and the whole */services/zeitgeist* folder structure will
be owned by the unprivileged zeitgeist user we created during the previous step:
```sh
sudo mkdir -p /services/zeitgeist/bin
sudo mkdir -p /services/zeitgeist/battery_station
sudo cp /path/to/your/target/release/zeitgeist /services/zeitgeist/bin
sudo cp /path/to/your/battery-station-relay.json /services/zeitgeist/battery_station/battery-station-relay.json
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
Description=Zeitgeist Battery Station parachain full node
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
    --base-path=/services/zeitgeist/battery_station \
    --bootnodes=/ip4/45.33.117.205/tcp/30001/p2p/12D3KooWBMSGsvMa2A7A9PA2CptRFg9UFaWmNgcaXRxr1pE1jbe9 \
    --chain=battery_station \
    --name=zeitgeist-support-$RANDOM \
    --parachain-id=2050 \
    --port=30333 \
    --rpc-port=9933 \
    --ws-port=9944 \
    --rpc-external \
    --ws-external \
    --rpc-cors=all \
    -- \
    --bootnodes=/ip4/45.33.117.205/tcp/31001/p2p/12D3KooWHgbvdWFwNQiUPbqncwPmGCHKE8gUQLbzbCzaVbkJ1crJ \
    --bootnodes=/ip4/45.33.117.205/tcp/31002/p2p/12D3KooWE5KxMrfJLWCpaJmAPLWDm9rS612VcZg2JP6AYgxrGuuE \
    --chain=battery-station-relay.json \
    --port=30334 \
    --rpc-port=9934 \
    --ws-port=9945


[Install]
WantedBy=multi-user.target
```

Replace `zeitgeist-support-$RANDOM` with the name your node should have.
Set `--port`, `--rpc-port` and `ws-port` to some ports that are not occupied
yet. Ensure that incoming traffic on those ports is allowed. The node will
listen to RPCs over HTTP and WS, to make the node eligible for potential
load-balancing.
You can adjust the *Nice* value to configure the priority of the process the 
service spawns. 20 is the lowest, -20 the highest priority.

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

We recommend [backing up the node secret file](battery-station#backing-up-the-node-secret-file-from-a-systemd-service),
which is used to derive your node's id. The id might be required in future
programs. If you want to restore a previous node id, jump to the
[node id restoration section](battery-station#restoring-the-node-id-within-systemd).

### Using Docker

We publish the latest version to the
[Docker Hub](https://hub.docker.com/r/zeitgeistpm/zeitgeist-node-parachain)
that can be pulled and ran locally to connect to the Battery Station network.
In order to do this first make sure that you have Docker installed locally.

#### Downloading the docker image
```sh
docker pull zeitgeistpm/zeitgeist-node-parachain:sha-8ea9683
```

#### Running a Zeitgeist parachain full node within docker
To be able to use the Zeitgeist relaychain instead of the Polkadot relaychain,
a custom chain specification is required that can be obtained with:
```sh
curl -o battery-station-relay.json https://raw.githubusercontent.com/zeitgeistpm/polkadot/battery-station-relay/node/service/res/battery-station-relay.json
```

The above command will store a file called *battery-station-relay.json* within
the current folder.

You can run the docker image using the following command (place the correct
path to the *battery-station-relay.json* file), but the node id
and the chain data are lost after you shut down the docker container:
```sh
docker run \
    -p 30333:30333 \
    -p 9933:9933 \
    -p 9944:9944 \
    -v battery-station-relay.json:/zeitgeist/relay-chain-spec.json \
    --name=zeitgeist-parachain \
    --restart=always \
    zeitgeistpm/zeitgeist-node-parachain:sha-8ea9683 \
    --base-path=/zeitgeist/data \
    --bootnodes=/ip4/45.33.117.205/tcp/30001/p2p/12D3KooWBMSGsvMa2A7A9PA2CptRFg9UFaWmNgcaXRxr1pE1jbe9 \
    --chain=battery_station \
    --name=zeitgeist-support-$RANDOM \
    --parachain-id=2050 \
    -- \
    --bootnodes=/ip4/45.33.117.205/tcp/31001/p2p/12D3KooWHgbvdWFwNQiUPbqncwPmGCHKE8gUQLbzbCzaVbkJ1crJ \
    --bootnodes=/ip4/45.33.117.205/tcp/31002/p2p/12D3KooWE5KxMrfJLWCpaJmAPLWDm9rS612VcZg2JP6AYgxrGuuE \
    --chain=/zeitgeist/relay-chain-spec.json
```


To keep the chain data, you will have to select a folder on your system that
docker will use to store its files in. Ensure that the folder does exist and
that you have write permission for that folder.
Assuming the path you want to use locally is */services/zeitgeist*, 
the previous command should be appended by one more `-v` option:
```sh
docker run \
    -p 30333:30333 \
    -p 9933:9933 \
    -p 9944:9944 \
    -v /services/zeitgeist:/zeitgeist/data/
    -v battery-station-relay.json:/zeitgeist/relay-chain-spec.json \
    --name=zeitgeist-parachain \
    --restart=always \
    zeitgeistpm/zeitgeist-node-parachain:sha-8ea9683 \
    --base-path=/zeitgeist/data \
    --bootnodes=/ip4/45.33.117.205/tcp/30001/p2p/12D3KooWBMSGsvMa2A7A9PA2CptRFg9UFaWmNgcaXRxr1pE1jbe9 \
    --chain=battery_station \
    --name=zeitgeist-support-$RANDOM \
    --parachain-id=2050 \
    -- \
    --bootnodes=/ip4/45.33.117.205/tcp/31001/p2p/12D3KooWHgbvdWFwNQiUPbqncwPmGCHKE8gUQLbzbCzaVbkJ1crJ \
    --bootnodes=/ip4/45.33.117.205/tcp/31002/p2p/12D3KooWE5KxMrfJLWCpaJmAPLWDm9rS612VcZg2JP6AYgxrGuuE \
    --chain=/zeitgeist/relay-chain-spec.json
```

That's it, your node should be running and syncing with other nodes, while
using a persistent chain storage and node id.
If you plan to continuously run your node, jump to the next section.


#### Running a Zeitgeist parachain full node in a persistent docker container
To automatically start a docker container at any occasion (including after 
reboots and errors), except when it was explicitly stopped by a docker command,
append the `-d` and `--restart` flag to the `docker run` command from above.
The following command includes those options. In addition to that, the node
parameters are extended in a way that makes the node listen to RPCs over HTTP
and WS, to make the node eligible for potential future load-balancing.
Ensure that `-v battery-station-relay.json` points to the correct chain
specification that was downloaded as described in the previous chapter.
Also ensure that you adjust `-v /services/zeitgeist` to use a folder you
desire for chain data and that the current user has write permissions for it.
Replace `zeitgeist-support-$RANDOM` with the name your node should have.
Set the first occurence of `--port`, `--rpc-port` and `ws-port` to some ports
that are not occupied yet and that accept incoming traffic. If you change on
of those, changes the corresponding entry in the option `-p CHANGE_THIS:port`
must be applied.

```sh
docker run \
    --restart unless-stopped \
    -d \
    -p 30333:30333 \
    -p 9933:9933 \
    -p 9944:9944 \
    -v /services/zeitgeist:/zeitgeist/data/
    -v battery-station-relay.json:/zeitgeist/relay-chain-spec.json \
    --name=zeitgeist-parachain \
    --restart=always \
    zeitgeistpm/zeitgeist-node-parachain:sha-8ea9683 \
    --base-path=/zeitgeist/data \
    --bootnodes=/ip4/45.33.117.205/tcp/30001/p2p/12D3KooWBMSGsvMa2A7A9PA2CptRFg9UFaWmNgcaXRxr1pE1jbe9 \
    --chain=battery_station \
    --name=zeitgeist-support-$RANDOM \
    --parachain-id=2050 \
    --port=30333 \
    --rpc-port=9933 \
    --ws-port=9944 \
    --rpc-external \
    --ws-external \
    --rpc-cors=all \
    -- \
    --bootnodes=/ip4/45.33.117.205/tcp/31001/p2p/12D3KooWHgbvdWFwNQiUPbqncwPmGCHKE8gUQLbzbCzaVbkJ1crJ \
    --bootnodes=/ip4/45.33.117.205/tcp/31002/p2p/12D3KooWE5KxMrfJLWCpaJmAPLWDm9rS612VcZg2JP6AYgxrGuuE \
    --chain=/zeitgeist/relay-chain-spec.json
    --port=30334 \
    --rpc-port=9934 \
    --ws-port=9945 \
```

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

You can also retrieve the container id by using the following command (you might have to replace *latest* with the docker image version you use):
```sh
docker ps --filter ancestor=zeitgeistpm/zeitgeist-node-parachain:sha-8ea9683
```

We recommend [backing up the node secret file](battery-station#backing-up-the-node-secret-file-from-a-docker-container),
which is used to derive your node's id. The id might be required in future
programs. If you want to restore a previous node id, jump to the
[node id restoration section](battery-station#restoring-the-node-id-within-a-docker-container).

### Ensuring that you can restore your node's id

For anybody who has entered a node id in any of our forms, it is essential 
that you backup the corresponding node secret after you have set up the node 
to ensure, that you always can restore the node id that you have entered and 
consequently are always able to continue gathering rewards based on that 
node id.

Your node's id is derived from a secret seed. If you lose access to the data 
of your node, it is impossible to restore your node id, unless you have 
created a backup as long as you had access to the data.

#### Backing up the node secret file from a docker container

The following sections will explain how to retrieve the path to the node secret 
on Unix and Windows based systems. After retrieving the path, copy the file 
located at the path to a safe location that is not on the same machine where 
you copied the file from.

##### On Unix
```sh
echo "$(CONTAINER_ROW=`docker ps | grep zeitgeistpm/zeitgeist-node-parachain` && docker inspect --format '{{range .Mounts}}{{println .Destination}}{{end}}' ${CONTAINER_ROW%% *} | sed -n '2p')/chains/battery_station/network/secret_ed25519"
```

##### On Windows
First get the container id:

```sh
docker ps | findstr "zeitgeist"
```

The container ID is the leftmost number in the row.
Then get the volume it's mounted to (replace *container_id* with the id you 
extracted during the previous step):
```sh
docker inspect --format '{{range .Mounts}}{{println .Destination}}{{end}}' container_id
```

Last, append the following string to the last path in the output: *\chains\battery_station\network\secret_ed25519*
The resulting string is the location of the secret file.


#### Backing up the node secret file from a systemd service

The following command will print the location of your node's secret file (you might have to replace *zeitgeist-node* with the name of your Zeitgeist node service):

```sh
SECRET_LOCATION=`journalctl -u zeitgeist-node | grep "Database: RocksDb at"` && echo ${SECRET_LOCATION##* RocksDb at } | sed 's/\/db/\/network\/secret_ed25519/'
```

Copy the file to a safe location that is not on the same machine you copied the file from.

#### Restoring the node id

Before the node is started, the node secret file backup has to be put in the
data folder of the Zeitgeist node. The steps to restore the node id differ a 
bit between docker and systemd and are described in the following sections.

##### Restoring the node id within a docker container

First copy the node secret backup file *secret_ed25519* into the docker folder 
that was mounted using the *-v* command. If that folder does not exist yet,
create it and ensure docker has the permissions to read from and write into it. 

After that, append the following option to the `docker run` command right
after the docker image (zeitgeist-node-parachain-TAG): 
```sh
--node-key-file /zeitgeist/data/secret_ed25519
```

Don't forget to replace */services/zeitgeist/* with the directory you copied 
the backup into. Running the docker container will log the node id.
Use it to verify that the Zeitgeist node does indeed use your old node's id.
```sh
docker logs container_id
```

##### Restoring the node id within systemd

First copy the node secret backup file *secret_ed25519* into the data folder 
of your Zeitgeist node. You can use the following command to retrieve the 
data folder (replace *zeitgeist-node.service* with the name of your Zeitgeist 
systemd file):
```sh
cat /etc/systemd/system/zeitgeist-node.service | grep -- "-d "
```

After copying the node secret file backup to this location, append the 
following line to the line starting with *ExecStart* within your 
Zeitgeist systemd file (replace */services/zeitgeist* with the data folder, 
in which you placed your backup): `--node-key-file /services/zeitgeist/secret_ed25519`

Stop any running node, update the daemon and start the node again (replace 
*zeitgeist-node*):
```sh
sudo systemctl stop zeitgeist-node; sudo systemctl daemon-reload && sudo systemctl start zeitgeist-node
```

Finally, verify that the Zeitgeist node does indeed use your old node's id 
(replace *zeitgeist-node*):
```sh
journalctl -u zeitgeist-node.service | grep "node id"
```

### Connecting to Telemetry

By default, your node will connect to Parity's telemetry endpoint that is 
accessible at [https://telemetry.polkadot.io](https://telemetry.polkadot.io).
You can ensure your node is up and running by visiting this page, selecting 
the ["Battery Station" network](https://telemetry.polkadot.io/#list/0xb90cd3a37b4793c6494b78962986f4f6ed3ec2eda91a6b84fd8457d24f606b9c)
and searching for your node's name (search can be started by simply typing
while on the telemetry page).

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
Zeitgeist currency for the Battery Station testnet, ZBP (Zeitgeist Battery Station),
which is required for numerous interactions with Battery Station. You will need
an account to retrieve ZBP.

There are numerous ways to generate an account, we suggest to use
[Polkadot{.js} extension](https://github.com/polkadot-js/extension) though,
because it is simple and straightforward to use. You can get it at:

- [Chrome web store](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd)
- [Firefox add-ons](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension/)
