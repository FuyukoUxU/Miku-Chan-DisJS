module.exports = {
    name: 'filter',
    aliases: ['filters'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
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
             const filter = args[0]
             if (filter === 'off' && queue.filters.size) queue.filters.clear()
    else if (Object.keys(client.distube.filters).includes(filter)) {
      if (queue.filters.has(filter)) queue.filters.remove(filter)
      else queue.filters.add(filter)
    } else if (args[0]) return 
    const embed = new EmbedBuilder()
    .setAuthor({
        name: 'Miku Thông Báo:',
        iconURL: `${message.guild.iconURL()}`
       })
       .setDescription("Chờ đã ?! Có lỗi rồi :(\n 💥 Hiệu ứng nhạc không hợp lệ !\nHãy dùng:\n`3d`, `bassboost`, `echo`, `karaoke`, `nightcore`, `vaporwave`, `flanger`, `gate`, `haas`, `reverse`, `surround`, `mcompand`, `phaser`, `tremolo`, `earwax`")
       .setColor('#FF0000')
       .setFooter({
        text: client.user.tag,
        iconURL: `${client.user.displayAvatarURL()}`
       })
       .setTimestamp()
       .setThumbnail(`https://media.tenor.com/IWKYIP6AMIgAAAAd/miku-nakano-the-quintessential-quintuplets.gif`)
       .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
    message.reply({embeds:[embed]})
    message.reply(`Hiệu ứng nhạc hiện tại: \`${queue.filters.names.join(', ') || 'Không có'}\``)
    }
  }