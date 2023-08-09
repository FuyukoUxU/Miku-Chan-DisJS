const {  DisTube } = require('distube');
const config = require('../config');
module.exports = (client, message) => {
    if (message.author.bot) return;
    const prefix = config.prefix;
    if (message.content.toLowerCase().startsWith(prefix)) {
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();
        
            if (cmd.length === 0) return;
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command)
                  return command.run(client, message, args , cmd, DisTube);
}
}