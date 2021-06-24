import { Message } from "discord.js";
import { realpathSync } from "fs";
import WarframeItemManager from "../components/WarframeItemManager";
import WatchListManager from "../components/WatchListManager";
import { URLs } from "../config/Urls";
import { Command } from "../interfaces/Command";

const command: Command = {
  name: 'Remove',
  description: 'Removes item from watch list',
  async execute(msg, args, warframeItems) {

    const search = args.join(" ");

    if (await WatchListManager.removeItemFromWatchList(WarframeItemManager.nameToUrl(warframeItems, search), msg.author.id)) {
      msg.reply(`${search} has been removed from watch list.`)
    } else {
      msg.reply(`${search} is not in watch list.`)
    }

  },
};

module.exports = command;