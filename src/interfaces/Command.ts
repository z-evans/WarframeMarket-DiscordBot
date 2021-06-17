import { Message } from "discord.js";
import { WarframeItem } from "./WarframeMarketApi";

export interface Command {
  name: string,
  description: string,
  execute: (message: Message, args: string[], warframeItems: WarframeItem[]) => void
}