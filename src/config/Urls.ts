const WarframeMarketApi = 'api.warframe.market/v1';

export const URLs = {
  API: {
    WarframeMarketItems: `${WarframeMarketApi}/items`,
    WarframeMarketItemOrders: (item: string) => `${WarframeMarketApi}/items/${item}/orders`,
    WebHook: "https://discord.com/api/webhooks/855126413644529684/RH3GGNREzHRk_QFo7Vbz5HiVZvcLtYb96ADvwZTwNqpHibW3rv2YkQd5fjknxvygThpK"
  },
  Icons: {
    WarframeMarket: (thumb: string) => `https://warframe.market/static/assets/${thumb}`
  }
}