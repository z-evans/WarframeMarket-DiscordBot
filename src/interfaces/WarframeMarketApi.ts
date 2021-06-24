export interface WarframeMarketOrderResponse {
  payload: Orders;
}

export interface Orders {
  orders: Order[];
}

export interface Order {
  order_type: "buy" | "sell";
  quantity: number;
  platinum: number;
  user: User;
  platform: string;
  region: string;
  creation_date: Date;
  last_update: Date;
  visible: Boolean;
  id: string;
}

interface User {
  reputation: number;
  region: string;
  last_seen: Date;
  ingame_name: string;
  status: "offline" | "ingame" | "online";
  id: string;
  avatar: string;
}

export interface WarframeMarketItemResponse {
  payload: WarframeItems;
}

export interface WarframeItems {
  items: WarframeItem[];
}

export interface WarframeItem {
  id: string;
  item_name: string;
  thumb: string;
  url_name: string;
}

export interface WatchListNotification {
  itemName: string;
  lowPrice: number | undefined;
  avgPrice: number;
}