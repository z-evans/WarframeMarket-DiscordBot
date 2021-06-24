import Discord, { Message } from 'discord.js';
import fs from 'fs';
import WarframeMarketManager from './components/WarframeMarketManager';
import WatchListManager from './components/WatchListManager';

import config from './config/bot.json';
import { Command } from './interfaces/Command';
import { WarframeItem } from './interfaces/WarframeMarketApi';

const client = new Discord.Client();
const log = console.log;

// Command Setup
const commands: Discord.Collection<string, Command> = new Discord.Collection();
const commandFiles = fs.readdirSync('./src/commands').filter(file => file.endsWith('.ts'));
for (const file of commandFiles) {
  const command: Command = require(`./commands/${file}`);
  commands.set(command.name.toLowerCase(), command);
}

let warframeItems: WarframeItem[];

// Once Shard is ready
client.once('ready', async () => {
  log(`Logged in as ${client.user.tag}!`);
  warframeItems = await (await WarframeMarketManager.getItemList()).payload.items;

  setInterval(async () => { // Loop every minute
    await WatchListManager.process(warframeItems);
  }, 300000);
});

// On User Message
const prefix = '~';
client.on('message', (msg: Message) => {

  const args = msg.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()!.toLowerCase();

  if (!msg.content.startsWith(prefix) || msg.author.bot) return;
  if (!commands.has(command)) return;

  try {
    commands.get(command)!.execute(msg, args, warframeItems, commands);
  } catch (error) {
    log(error);
  }

});

client.login(config.token);