module.exports = {
    name: 'ping', 
    aliases: ['p'],
    run: (client, message, args) => {
        message.reply(`🏓 Pong! \`${client.ws.ping}ms\``);
    }
}