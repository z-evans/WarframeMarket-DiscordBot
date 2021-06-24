import { Command } from "../interfaces/Command";

const command: Command = {
	name: 'Help',
	description: 'Gets list of commands',
	async execute(msg, args, warframeItems, commands) {

		const commandList = commands.filter(e => { return e.name.toLowerCase() != "help" });
		const helpList = commandList.map(e => { return `**${e.name}**: ${e.description}` });
		msg.channel.send({
			embed: {
				title: `Command List:`,
				description: `${helpList.join("\n\n")}`
			}
		});

	},
};

module.exports = command;