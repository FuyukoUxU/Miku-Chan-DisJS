const Discord = require('discord.js')
const lyricsFinder = require('lyrics-finder')
module.exports = {
    name: 'lyric',
    aliases: ['loibaihat'],
    run: async (client, message, args) => {
        const queue = client.distube.getQueue(message)
        let keyword = args.join(' ')
        if (queue) {
            if (!keyword) keyword = queue.songs[0].name
        } else {
            if (!keyword) return message.reply('Bạn chưa nhập tên bài hát để tìm lyric')
        }
        let lyrics = await lyricsFinder(keyword) || "Không có kết quả ... 😥 Hãy thử tìm kiếm 1 từ khóa khác !";
        if (lyrics.length > 4095) return message.reply("Lyrics của bài hát bạn đang tìm quá dài .");
        const firstembed = new Discord.EmbedBuilder()
            .setAuthor({
                name: 'Tìm kiếm lời bài hát với Miku-chan\n',
                iconURL: message.guild.iconURL()
            })
            .setTitle(`Kết quả lời bài hát \`${keyword}\``)
            .setDescription(lyrics.length > 2048 ? lyrics.slice(0, 2048) : lyrics)
            .setFooter({
                text: 'Trang 1'
            })
            .setTimestamp()
            .setColor('#FF0000')
        message.channel.send({ embeds: [firstembed] });
        if (lyrics.length > 2048) {
            const secondembed = new Discord.EmbedBuilder()
                .setColor('#FF0000')
                .setDescription(lyrics.slice(2048, lyrics.length))
                .setFooter({
                    text: 'Trang 2'
                })
                .setTimestamp()
            message.channel.send({ embeds: [secondembed] });
        }
    }
}