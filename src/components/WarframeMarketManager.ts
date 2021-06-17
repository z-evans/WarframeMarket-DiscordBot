import { get } from 'superagent';
import { URLs } from '../config/Urls';
import { Order, WarframeMarketItemResponse, WarframeMarketOrderResponse } from '../interfaces/WarframeMarketApi';
import MathManager from './MathManager';

class WarframeMarketManager {
  async checkPrice(item: string) {
    const res = await get(URLs.API.WarframeMarketItemOrders(item));
    return res.body as WarframeMarketOrderResponse;
  }

  async check(item: string) {

    const data = await this.checkPrice(item);

    const numbers: number[] = data.payload.orders.map(order => order.platinum);
    const most = MathManager.getMode(numbers)[0];

    const orders: Order[] = data.payload.orders.filter(order => {
      if (order.order_type == "sell" &&
        order.user.status == "ingame" &&
        order.platinum < most) {
        return order;
      }
    });

    return {
      orders,
      most
    };

  }

  async getItemList() {
    const res = await get(URLs.API.WarframeMarketItems);
    return res.body as WarframeMarketItemResponse;
  }
}

export default new WarframeMarketManager();