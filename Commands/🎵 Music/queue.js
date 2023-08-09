const discord = require('discord.js')
module.exports = {
    name: "queue",
    aliases: ["list"],
    inVoiceChannel: true,
    run : async ( client , message  ) => {
        const { EmbedBuilder } = require('discord.js');
        const { checkSameRoom } = require('../../src/util')
        if (checkSameRoom(message)) return; 
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
             if (!queue) return  message.reply({ embeds : [noMusicEmbed]}).then(msg => { setTimeout(() => msg.delete(), 4000)})
        const voice_channel = message.member.voice.channel;
        let page = 1;
        let vid = 0
        
            let curqueue = queue.songs.map((song, id) =>
            `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
            ).slice(0, 10).join("\n");
            const embed = new EmbedBuilder()
            .setTitle(`Danh sách phát (Trang 1)`)
            .setDescription(curqueue)
        const msg = await message.reply({embeds : [embed]});
        await msg.react("⬅️");
        await msg.react("➡️")
        await msg.react('❌')
        const collector = msg.createReactionCollector(
            (reaction, user) =>
              ["⬅️", "➡️", "❌"].includes(reaction.emoji.name) &&
              user.id === message.author.id
          );
        collector.on("collect", reaction => {
            reaction.users.remove(message.author).then(async () => {
              if (reaction.emoji.name === "⬅️") {
                if (vid - 10 < 0) return msg.delete();
                page = page - 1
                let curqueue = queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                ).slice(vid - 10, vid).join("\n");
                if (page == 1) curqueue = queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                ).slice(0, 10).join("\n");
                let embed = new EmbedBuilder()
                .setTitle(`Danh sách phát (Trang ${page})`)
                .setDescription(curqueue)
            await msg.edit({embeds : [embed]});
            vid = vid - 10
            await msg.react("⬅️");
            await msg.react("➡️")
            await msg.react('❌')
              }
            })
        })
        collector.on("collect", reaction => {
            reaction.users.remove(message.author).then(async () => {
              if (reaction.emoji.name === "➡️") {
                page = page + 1
                vid = vid + 10
                let curqueue = queue.songs.map((song, id) =>
                `**${id + 1}**. ${song.name} - \`${song.formattedDuration}\``
                ).slice(vid, vid + 10).join("\n");
                let embed = new EmbedBuilder()
                .setTitle(`Danh sách phát (Trang ${page})`)
                .setDescription(curqueue)
            await msg.edit({embeds : [embed]});
            await msg.react("⬅️");
            await msg.react("➡️")
            await msg.react('❌')
              }
            })
        })
        collector.on("collect", reaction => {
            reaction.users.remove(message.author).then(async () => {
              if (reaction.emoji.name === "❌") {
                msg.delete();
              }
            })
        })
    }
}