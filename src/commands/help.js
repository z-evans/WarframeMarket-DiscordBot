module.exports = {
	name: 'help',
	execute(msg, args) {
		
		var dev = false;
  		if (msg.author.id === "181346745610010624") dev = true;

		msg.channel.send({embed: {
			color: "RANDOM",
			title: "Bot Commands",
			fields: [
			  {
				name: 'Bot Prefix', 
				value: 'The bot uses either @Mention or ~.'
			  },
			  {
				name: 'Bruh Commands', 
				value: '`Top`, `Display`, `Search`, `Sync`'
			  },
			  {
				name: 'Economy Commands', 
				value: '`vote`, `daily`, `claim`, `bal`, `pay`'
			  },
			  {
				name: 'Games Commands', 
				value: '`coinflip`, `slots`, More Coming soon...'
			  },
			  {
				name: 'Fun Commands', 
				value: '`Meme`, `Doggo`, `Cat`, `Random`'
			  },
			  {
				name: 'Misc Commands', 
				value: '`Avatar`'
			  },
			  {
				name: 'Global / Daily Statistics', 
				value: 'https://bot.bruh.dev'
			  }
			],
			footer: {
			  text: "If you enjoy the bot please feel free to vote by doing `~vote`"
			}
		}});
	  
		if (args[0] != null) {
			if (dev && args[0] == "dev") {
				msg.author.send({embed: {
				color: 1111111,
				title: "Dev Commands",
				fields: [
					{
					name: 'Stats', 
					value: 'Show Bot Stats'
					},
					{
					name: 'Usage', 
					value: 'Shows hardware usage'
					},
					{
					name: 'Updatedbl', 
					value: 'Update Top.gg Stats'
					},
					{
					name: 'Forcesync',
					value: 'Force Sync Website'
					}
				],
				footer: {
					text: "If you enjoy the bot please feel free to vote by doing `~vote`"
				}
				}});
			}
		}

	},
};