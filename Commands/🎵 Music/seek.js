module.exports = {
    name: 'seek',
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
           if (!queue) return  message.reply({ embeds : [noMusicEmbed]}).then(msg => { setTimeout(() => msg.delete(), 4000)})
           try {
            if (!args[0]) return message.reply("Hãy nhập số giờ cần tua")
            if (!args[1]) return message.reply("Hãy nhập số phút cần tua")
            if (!args[2]) return message.reply("Hãy nhập số giây cần tua")
            const h = parseInt(args[0])
            const m = parseInt(args[1])
            const s = parseInt(args[2])
            if (h < 0) return message.reply("Số giờ sao nhỏ hơn 0 được ?")
            if (m > 60) return message.reply("Số phút trong giờ sao lớn hơn 60 được ?")
            if (m < 0) return message.reply("Số phút trong giờ sao nhở hơn 0 được ?")
            if (s > 60) return message.reply("Số giây trong phút sao lớn hơn 60 được ?")
            if (s < 0) return message.reply("Số giây trong phút sao nhỏ hơn 0 được ?")
            let time = h * 3600 + m * 60 + s
            
            queue.seek(message, Number(time*1000));
           const embed = new EmbedBuilder()
           .setAuthor({
            name: 'Miku Thông Báo:',
            iconURL: `${message.guild.iconURL()}`
           })
           .setDescription(`Đã tua video ~~!\nVideo được tua đến: \`${h}\` giờ \`${m}\` phút \`${s}\` giây`)
           .setColor('#FF0000')
           .setFooter({
            text: client.user.tag,
            iconURL: `${client.user.displayAvatarURL()}`
           })
           .setTimestamp()
           .setThumbnail(`https://c.tenor.com/-4n_EkkV5XwAAAAC/miku-nakano-nakano-miku.gif`)
           .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
         message.reply({ embeds : [embed]})
          } catch {
            return;
        }


    } 
  }