const { DisTube } = require('distube');
const config = require('../config.json');
const moment = require('moment');

module.exports = (client, message) => {
    if (message.author.bot) return;
    const prefix = config.prefix;
    if (!message.content.startsWith(prefix)) {
        if (message.channel.id == '1142688108526174269') {
            const simsimi = require('simsimi-api');

            function replaceMultiple(text, replacements) {
                let result = text;
                for (const search in replacements) {
                    if (replacements.hasOwnProperty(search)) {
                        result = result.replace(new RegExp(search, 'g'), replacements[search]);
                    }
                }
                return result;
            }

            const replacementRules = {
                "sim": "Miku",
                "simsimi": "Miku",
                "SimSimi" : "Miku",
                "Sim Simi" : "Miku"
            };

            simsimi.simtalk(message.content, 'vn')
                .then((response) => {
                    let tomiku = replaceMultiple(response.message, replacementRules);
                    return message.reply(tomiku);
                })
                .catch((error) => {
                    console.error(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Có lỗi ở event chat with Miku, vui lòng debug !`); // Handle the error appropriately
                });

        }




    } else {
        if (message.content.toLowerCase().startsWith(prefix)) {
            const args = message.content.slice(prefix.length).trim().split(/ +/g);
            const cmd = args.shift().toLowerCase();

            if (cmd.length === 0) return;
            let command = client.commands.get(cmd);
            if (!command) command = client.commands.get(client.aliases.get(cmd));
            if (command)
                return command.run(client, message, args, cmd, DisTube);
        }
    }
}