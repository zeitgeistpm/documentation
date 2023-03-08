# Getting Started

Install using your package manager of choice.

```bash
yarn add @zeitgeistpm/sdk @polkadot/api @polkadot/util
# or
npm i @zeitgeistpm/sdk @polkadot/api @polkadot/util
```

## Initialization

The zeitgeist sdk can be initialized in one of three different modes.

[Code Snippets for Initialization](https://github.com/zeitgeistpm/sdk-next/tree/main/playground/examples/src/initialization)

### Full(default)

The full mode has access to both the zeitgeist indexer and chain rpc apis, it
has a certain opinionative preference when querying for data and has access to
rpc transaction methods for submitting extrinsic´s to the chain.

```ts
import type { FullContext, Sdk } from "@zeitgeistpm/sdk";
import { create, mainnet } from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(mainnet());
```

:::info

This is the preferred mode for full applications that need to both query data in
a more optimized way and also need to interact with the chain itself.

:::

### Rpc Mode

The rpc mode connects only to the rpc chain node and has a bit more limitations
when querying for data.

```ts
import type { RpcContext, Sdk } from "@zeitgeistpm/sdk";
import { create, mainnetRpc } from "@zeitgeistpm/sdk";

const sdk: Sdk<RpcContext> = await create(mainnetRpc());
```

:::info

Prefer this mode when need to make sure you are only interacting with the latest
chain data for verification purposes or only need to submit transactions.

:::

### Indexer Mode

The indexer mode is only interacting with the indexed data and has no
transaction or chain query capabilities. It boots up quicker than the rpc or
full sdk.

```ts
import type { IndexerContext, Sdk } from "@zeitgeistpm/sdk";
import { create, mainnetIndexer } from "@zeitgeistpm/sdk";

const sdk: Sdk<IndexerContext> = await create(mainnetIndexer());
```

:::info

Prefer this mode when working with slightly stale(1-2 minutes) data is ok.
Perfect for static sites or analytics tools.

:::

## Battery Station

You can also connect to our test net using the sdk.

```ts
import type { FullContext, Sdk } from "@zeitgeistpm/sdk";
import { create, batterystation } from "@zeitgeistpm/sdk";

const sdk: Sdk<FullContext> = await create(batterystation());
```

## Local Dev Node

You can also connect to a locally running development node. Just note that if
you don't have the zeitgeist Subsquid node also running locally you have to boot
it in rpc mode.

### Starting a local Zeitgeist Node with Docker.

**1. First lets pull the IPFS image and zeitgeist image.**

```bash
docker pull ipfs/go-ipfs:latest
docker pull zeitgeistpm/zeitgeist-node
```

**2. Then we can boot up the IPFS daemon image and zeitgeist node.**

```bash
docker run \
   -p 4001:4001 \
   -p 127.0.0.1:8080:8080 \
   -p 127.0.0.1:8081:8081 \
   -p 127.0.0.1:5001:5001 \
   ipfs/go-ipfs

docker run \
    -p 30333:30333 \
    -p 9933:9933 \
    -p 9944:9944 \
    zeitgeistpm/zeitgeist-node \
    --dev \
    --rpc-external \
    --ws-external \
    --rpc-cors=all \
    --pruning=archive
```

**3. Connecting the SDK to the dev environment.**

```ts
import type { RpcContext, Sdk } from "@zeitgeistpm/sdk";
import { create, createStorage } from "@zeitgeistpm/sdk";
import { IPFS } from "@zeitgeistpm/web3.storage";

const sdk: Sdk<RpcContext> = await create({
  provider: "wss://localhost:9944",
  storage: createStorage(
    IPFS.storage({
      node: { url: "localhost:5001" },
    })
  ),
});
```
