module.exports = {
    name: 'mikuping',
    description: 'Phát một bài hát nào đó',
    type: 'CHAT_INPUT',
    run: async (client, interaction) => {
        interaction.reply(`🏓 Pong! \`${client.ws.ping}ms\``);
    }

}