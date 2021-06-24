import { Message } from "discord.js";
import { realpathSync } from "fs";
import WarframeItemManager from "../components/WarframeItemManager";
import WatchListManager from "../components/WatchListManager";
import { URLs } from "../config/Urls";
import { Command } from "../interfaces/Command";

const command: Command = {
  name: 'Watchlist',
  description: 'Check your watch list',
  async execute(msg, args, warframeItems) {

    const data = await WatchListManager.getByUserId(msg.author.id);

    if (data != undefined && data.length > 0) {
      const content = data.map(item => { return WarframeItemManager.urlToName(warframeItems, item.name) })
      msg.channel.send({
        embed: {
          title: `${msg.author.username}'s Watchlist`,
          description: content.join("\n")
        }
      });
    }


  },
};

module.exports = command;