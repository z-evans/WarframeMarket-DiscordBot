import { ShardingManager } from 'discord.js';
import config from './config/bot.json';

const manager = new ShardingManager('./src/bot.ts', { token: config.token });

manager.on('shardCreate', (shard: { id: any; }) => console.log(`Launched shard ${shard.id}`));
manager.spawn();