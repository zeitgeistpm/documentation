---
id: order-book
title: Order Book
---

An order book is a digital ledger used in asset trading that records open
orders, a buy or sell instruction from a trader for a specific asset or
security. It functions as the backbone of most modern trading platforms and
exchanges, enabling users to execute trades based on current market conditions.

## How the Order Book works in Zeitgeist

In Zeitgeist, the order book contains trading pairs of outcome assets and the
market's base asset (collateral). The order book can be set as the market's
scoring rule. The operations within the order book are primarily managed through
three fundamental functions: `place_order`, `remove_order`, and `fill_order`.
It's important to mention that market creator fees are charged for each taken
order.

### Place Order

This function is used to introduce a new order into the market. When traders
decide to buy or sell an asset, they use `place_order` to specify the details of
their order, the quantity they wish to buy the `taker_asset` for `taker_amount`
and sell the `maker_asset` for `maker_amount`. This order is then added to the
order book, where it waits to be matched by taker(s).

It is important to mention that the users of the Zeitgeist order book do specify
the price of the assets implicitly. This means that the `place_order` does not
take a price as an argument, but rather the `taker_amount` and `maker_amount`.
This means the caller of the `place_order` function does willingly sell the
`maker_amount` of the `maker_asset` to buy the given `taker_amount` of the
`taker_asset`. After the execution of `place_order` the `maker_amount` of the
`maker_asset` is reserved for the order. This means it is not available for the
user to use in other transactions.

##### Price Example

Let's assume you wish to purchase `42` outcome tokens, referred to as
`taker_asset`. You decide to offer `7` ZTG, your `maker_asset`, for this
transaction. Essentially, this means you're ready to exchange `7` ZTG for `42`
outcome tokens. By doing so, you've implicitly set a rate of `6` outcome tokens
per `1` ZTG (since `42` divided by `7` equals `6`). Therefore, if a taker agrees
to your proposed rate, they need to supply `42` outcome tokens (or fewer, in the
case of partial order fulfillment) and, in return, will get `7` ZTG from you (or
less, depending on the partial fulfillment scenario).

It's important to note that the market creator's fee is always deducted in the
market's base currency, which in our example is ZTG. So, if the market creator
charges a `1%` fee, the taker ends up receiving `6.93` ZTG, while the market
creator gets `0.07` ZTG. However, the `taker_amount` you receive as the maker
remains unchanged, as no fees are deducted from the outcome token. It might seem
like the recipient of the base asset (in this case, ZTG) is always the one who
pays the fee. But this perspective can vary because each order is unique and may
already factor in the associated fees at the time of its creation, adjusting the
price accordingly.

### Fill Order

The crux of any trading activity is the completion of trades, which is
facilitated by the `fill_order` function. This function is triggered when a
taker matches a given maker order. The `fill_order` function will execute the
trade, transferring the specified asset between parties at the agreed price, and
update the order book to reflect the completion of the trade.

The taker has the ability to partially fill the order for a given
`maker_partial_fill` amount. The maker always wants the `taker_amount` of the
specified taker asset (in `place_order`) getting filled by the taker(s). Thus,
the `maker_partial_fill` (if a partial fill is wanted) should be smaller than
the `taker_amount` of the maker order.

### Remove Order

Orders may need to be withdrawn from the order book for various reasons, such as
a change in market strategy or a mistake in the order's details. The
`remove_order` function allows traders or the system to cancel an existing
order. This function ensures that the order book remains up-to-date with only
active intents to trade, thereby preserving market liquidity and participant
interest.

### Market Creator Fees

As other trading mechanisms on Zeitgeist, the order book does also charge fees
for the market creator. The fees are charged for each taken order in the
market's base asset (collateral). As usual, the fee is specified by the market
creator.
