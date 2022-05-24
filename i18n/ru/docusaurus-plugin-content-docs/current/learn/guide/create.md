# Create Markets

As a **Permissionless** prediction market APP, we support users to create their
own markets and add liquidity.

1. Click `Create Market`

   ![](https://raw.githubusercontent.com/Whisker17/ImageStoreService/main/image-20211019110305148.png)

2. Fill in the specific information, the points that need to be noted include:

   - `Market ends` is the closing time of the market, after the market is
     closed, `Oracle` is required to submit the result
   - The `Ticker` in `Outcomes` refers to the name of your result token, defined
     by yourself, such as `ABCYES` and `ABCNO``
   - ``Oracle` fills in the address of the person who will finally report the
     result. It can be a person who does not create a market, but it is
     recommended to write your own address
   - If Oracle fails to report the result in the end, you will lose part of the
     staked token
   - You can choose the attributes of the market: `Permissionless` or `Advised`.
     The `Advised` market needs to pass our review to be active. At the same
     time, the amount of deposit token required for such a market will be
     relatively small

   ![](https://raw.githubusercontent.com/Whisker17/ImageStoreService/main/image-20211019113534808.png)

3. Regarding the last item `Depoly Liquidity Pool`, all participants who create
   a market need to inject liquidity into their market, that is, at least 100
   individual result tokens and 100 ZBS.

<!-- prettier-ignore -->
:::tip

At present, everyone does not have so many ZBS to provide liquidity, so in
BetaNet testnet activities, you can contact team members in the Discord group to
ask the team to help add liquidity. So I recommend that you choose `OFF` in the
above `Depoly Liquidity Pool`

:::

1. After completing the above steps, sign the transaction to complete the
   creation of the market
