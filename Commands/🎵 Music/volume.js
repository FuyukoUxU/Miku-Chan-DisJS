module.exports = {
    name: 'volume',
    aliases: ['v', 'set', 'set-volume', 'vol'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
        const { checkSameRoom } = require('../../src/util')
        if (checkSameRoom(message)) return;
        const { EmbedBuilder } = require('discord.js');
        const noMusicEmbed = new EmbedBuilder()
            .setColor('#FF0000')
            .setAuthor({
                name: `Miku Thông Báo`,
                iconURL: `${message.guild.iconURL()}`
            })
            .setDescription(`Chờ đã ?! Wait.....\n\`\`\`🛑 Bạn đang không chơi nhạc !\nHãy chơi trước 1 bài nhạc nào đó rồi hẵn dùng lệnh này nhé <3\`\`\``)
            .setThumbnail(`https://media.tenor.com/IWKYIP6AMIgAAAAd/miku-nakano-the-quintessential-quintuplets.gif`)
            .setTimestamp()
            .setFooter({
                text: `${client.user.tag}`,
                iconURL: client.user.displayAvatarURL()
            })
            .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
        const queue = client.distube.getQueue(message)
        if (!queue) return message.reply({ embeds: [noMusicEmbed] }).then(msg => { setTimeout(() => msg.delete(), 4000) })

        try {
            if (!args[0]) return message.reply("Bạn hãy nhập mức âm lượng `%`")
            if (isNaN(args[0])) return message.reply("Mức âm lượng không hợp lệ🚫");
            if (args[0] > 100 && args[0] < 501) {
                message.reply(`:loud_sound::chart_with_upwards_trend: Âm lượng được boost hiện tại là \`${args[0]} %\``)
                return queue.setVolume(message, args[0]);
            }
            if (args[0] > 49 && args[0] < 101) {
                message.reply(`:loud_sound: Âm lượng hiện tại là \`${args[0]} %\``)
                return queue.setVolume(message, args[0]);
            }
            if (0 < args[0] && args[0] < 50) {
                message.reply(`:sound: Âm lượng hiện tại là \`${args[0]} %\``)
                return queue.setVolume(message, args[0]);
            }
            if (args[0] == 0) {
                message.reply(`:mute: Bạn đã tắt tiếng !`)
                return queue.setVolume(message, args[0]);
            }
        } catch {
            return;
        }

    }
}