import { WarframeItem } from "../interfaces/WarframeMarketApi";

class WarframeItemManager {

  urlToName(warframeItems: WarframeItem[], itemUrl: string) {
    return warframeItems.filter(item => { return item.url_name == itemUrl }).map(item => { return item.item_name })[0];
  }

  nameToUrl(warframeItems: WarframeItem[], itemName: string) {
    return warframeItems.filter(item => { return item.item_name.toLowerCase() == itemName.toLowerCase() }).map(item => { return item.url_name })[0];
  }

}

export default new WarframeItemManager();