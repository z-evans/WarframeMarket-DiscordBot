const WarframeMarketApi = 'api.warframe.market/v1';

export const URLs = {
  API: {
    WarframeMarketItems: `${WarframeMarketApi}/items`,
    WarframeMarketItemOrders: (item: string) => `${WarframeMarketApi}/items/${item}/orders`,
    WebHook: "https://discord.com/api/webhooks/0000000000000/XXXXXXXXXXXXXXX"
  },
  Icons: {
    WarframeMarket: (thumb: string) => `https://warframe.market/static/assets/${thumb}`
  }
}
