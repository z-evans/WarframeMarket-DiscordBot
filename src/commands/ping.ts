import { Command } from "../interfaces/Command";

const command: Command = {
  name: 'ping',
  description: 'Simple Pong reply',
  execute(msg, args) {

    msg.channel.send("Pong!");

  },
};

module.exports = command;