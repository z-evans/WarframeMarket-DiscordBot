import mysql, { Connection } from 'mysql'
import { post } from 'superagent';
import config from '../config/bot.json'
import { URLs } from '../config/Urls';
import { WatchList } from '../interfaces/Database';
import { WarframeItem, WatchListNotification } from '../interfaces/WarframeMarketApi';
import WarframeItemManager from './WarframeItemManager';
import WarframeMarketManager from './WarframeMarketManager';

class WatchListManager {

  conn: Connection;

  constructor() {
    this.conn = mysql.createConnection(config.database);
  }

  async process(warframeItems: WarframeItem[]) {

    const list = await this.getAll();
    const itemList = new Set(list.map(item => { return item.name }));

    let orderData: WatchListNotification[] = [];
    for (const item of itemList) {
      const marketData = await WarframeMarketManager.check(item);

      if (marketData.sortedOrders != undefined) {
        orderData.push({
          itemName: WarframeItemManager.urlToName(warframeItems, item),
          avgPrice: marketData.most,
          lowPrice: marketData.sortedOrders[0] ? marketData.sortedOrders[0].platinum : undefined
        });
      }
    }

    const message = orderData
      .sort((a, b) => { return a.itemName.localeCompare(b.itemName) })
      .map(e => { return e.lowPrice ? `**${e.itemName}** lowest price is ${e.lowPrice} compared to ${e.avgPrice}` : `${e.itemName} lowest and average price is ${e.avgPrice}` });

    if (message && message.length > 0) {
      const data = {
        "username": "",
        "avatar_url": "",
        "embeds": [{
          "title": "Watch List:",
          "description": message.join("\n\n")
        }],
        "components": []
      }

      await post(URLs.API.WebHook).send(data);
    }

    // const userList = new Set(list.map(item => { return item.userid }));

    /*userList.forEach(async user => {

      const filteredList = list.filter(e => { return e.userid == user });

      let orderData: WatchListNotification[] = [];
      for (const e of filteredList) {
        const marketData = await WarframeMarketManager.check(e.name);

        if (marketData.sortedOrders != undefined) {
          const lowest = marketData.sortedOrders[0];
          orderData.push({
            itemName: WarframeItemManager.urlToName(warframeItems, e.name),
            avgPrice: marketData.most,
            lowPrice: lowest.platinum
          });
        }
      }

      const message = orderData.map(e => { return `${e.itemName} lowest price is ${e.lowPrice} compared to ${e.avgPrice}` });

      if (message && message.length > 0) {
        const data = {
          "username": "",
          "avatar_url": "",
          "embeds": [{
            "title": "Watch List:",
            "description": message.join("\n\n")
          }],
          "components": []
        }

        await post(URLs.API.WebHook).send(data);
      }
    });*/

  }

  async addItemToWatchList(item: string, userid: string) {
    if (await this.getRecord(item, userid) == undefined) {
      this.addRecord(item, userid);
      return true;
    } else {
      return false;
    }
  }

  async removeItemFromWatchList(item: string, userid: string) {
    if (await this.getRecord(item, userid) == undefined) {
      return false;
    } else {
      this.removeRecord(item, userid);
      return true;
    }
  }

  getByUserId(userid: string): Promise<WatchList[]> {
    return new Promise(resolve => {
      this.conn.query('SELECT * FROM watchlist WHERE userid = ?', [userid], (err, result) => {
        if (err) throw err;
        resolve(result as WatchList[]);
      });
    });
  }

  getRecord(item: string, userid: string): Promise<WatchList> {
    return new Promise(resolve => {
      this.conn.query('SELECT * FROM watchlist WHERE name = ? AND userid = ?', [item, userid], (err, result) => {
        if (err) throw err;
        resolve(result[0] as WatchList);
      });
    });
  }

  getAll(): Promise<WatchList[]> {
    return new Promise(resolve => {
      this.conn.query('SELECT * FROM watchlist', (err, result) => {
        if (err) throw err;
        resolve(result as WatchList[]);
      });
    });
  }

  async addRecord(item: string, userid: string) {
    await this.conn.query('INSERT INTO watchlist (name, userid) VALUES (?,?)', [item, userid]);
  }

  async removeRecord(item: string, userid: string) {
    await this.conn.query('DELETE FROM watchlist WHERE name = ? AND userid = ?', [item, userid]);
  }

}

export default new WatchListManager();