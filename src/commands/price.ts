import { Message } from "discord.js";
import { realpathSync } from "fs";
import WarframeMarketManager from "../components/WarframeMarketManager";
import WatchListManager from "../components/WatchListManager";
import { URLs } from "../config/Urls";
import { Command } from "../interfaces/Command";

const command: Command = {
  name: 'Price',
  description: 'Check the price of a warframe item.',
  execute(msg, args, warframeItems) {

    const search = args.join(" ");

    if (warframeItems) {
      const itemResult = warframeItems.filter(item => {
        return item.item_name.toLowerCase().includes(search.toLowerCase())
      });

      let count = 0;
      const itemText = itemResult.map(item => {
        count++;
        if (count <= 5) {
          return `${count == 1 ? "1️⃣" : count == 2 ? "2️⃣" : count == 3 ? "3️⃣" : count == 4 ? "4️⃣" : "5️⃣"} ${item.item_name}\n\n`;
        }
      });

      if (itemResult[0]) {
        msg.channel.send({
          embed: {
            title: `Warframe Items under ("${search}")`,
            description: `${itemText.join("")}`
          }
        }).then(async message => {
          await message.react("1️⃣");
          if (itemResult[1]) await message.react("2️⃣");
          if (itemResult[2]) await message.react("3️⃣");
          if (itemResult[3]) await message.react("4️⃣");
          if (itemResult[4]) await message.react("5️⃣");

          const filter = (reaction: any, user: any) => {
            return ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣'].includes(reaction.emoji.name) && user.id === msg.author.id;
          };

          message.awaitReactions(filter, { max: 1, time: 30000, errors: ['time'] })
            .then(async collected => {
              const reaction = collected.first();
              let data;
              switch (reaction.emoji.name) {
                case '1️⃣':
                  data = await WarframeMarketManager.check(itemResult[0].url_name);

                  if (data.sortedOrders[0]) {
                    msg.reply(`${itemResult[0].item_name} lowest price is ${data.sortedOrders[0].platinum}, while the average price is ${data.most}.`);
                  } else {
                    msg.reply(`${itemResult[0].item_name} lowest and average price is ${data.most}.`);
                  }

                  message.delete();
                  break;
                case '2️⃣':
                  data = await WarframeMarketManager.check(itemResult[1].url_name);

                  if (data.sortedOrders[0]) {
                    msg.reply(`${itemResult[1].item_name} lowest price is ${data.sortedOrders[0].platinum}, while the average price is ${data.most}.`);
                  } else {
                    msg.reply(`${itemResult[1].item_name} lowest and average price is ${data.most}.`);
                  }

                  message.delete();
                  break;
                case '3️⃣':
                  data = await WarframeMarketManager.check(itemResult[2].url_name);

                  if (data.sortedOrders[0]) {
                    msg.reply(`${itemResult[2].item_name} lowest price is ${data.sortedOrders[0].platinum}, while the average price is ${data.most}.`);
                  } else {
                    msg.reply(`${itemResult[2].item_name} lowest and average price is ${data.most}.`);
                  }

                  message.delete();
                  break;
                case '4️⃣':
                  data = await WarframeMarketManager.check(itemResult[3].url_name);

                  if (data.sortedOrders[0]) {
                    msg.reply(`${itemResult[2].item_name} lowest price is ${data.sortedOrders[0].platinum}, while the average price is ${data.most}.`);
                  } else {
                    msg.reply(`${itemResult[2].item_name} lowest and average price is ${data.most}.`);
                  }

                  message.delete();
                  break;
                case '5️⃣':
                  data = await WarframeMarketManager.check(itemResult[4].url_name);

                  if (data.sortedOrders[0]) {
                    msg.reply(`${itemResult[2].item_name} lowest price is ${data.sortedOrders[0].platinum}, while the average price is ${data.most}.`);
                  } else {
                    msg.reply(`${itemResult[2].item_name} lowest and average price is ${data.most}.`);
                  }

                  message.delete();
                  break;
              }
            })
            .catch(collected => {
              message.delete();
              msg.reply('Price search cancelled.');
            });
        });
      } else {
        msg.reply("No items found with name.")
      }
    }

  },
};

module.exports = command;