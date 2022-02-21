---
id: market-metadata
title: Market Metadata
---

In order to keep some metadata about the markets we use a separate storage
layer.

For now, this storage layer is IPFS, although we plan to extend this over time
and allow the creator of the market to choose other storage providers.

Since only a hash of the storage is kept on-chain, we need a standard structure
for Zeitgeist metadata for clients to successfully pull and populate this data
on front-ends.

The metadata structure is extensible, but the following three fields are always
required:

```ts
type MarketMetadata = {
  title: string;
  description: string;
  categories?: string[];
};
```

The Zeitgeist SDK has helper functions for uploading and pulling this data from
IPFS.
