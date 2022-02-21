# Common

### getBlockInfo

You can use this function to get block info in Zeitgeist.

```typescript
const api = await ApiPromise.create({ provider });

const [blockNumber] = await Promise.all([
    api.rpc.chain.getHeader(),
  ]);
```
[Code snippet](./getBlockInfo.ts)


### getChainInfo

You can use this function to get chain info about Zeitgeiest.

```typescript
const api = await ApiPromise.create({ provider });

const [chain, nodeName, nodeVersion] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
  ]);
```
[Code snippet](./getChainInfo.ts)

