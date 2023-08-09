module.exports = {
    name: 'skip',
    inVoiceChannel: true,
    run: async (client, message) => {
  
   
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
      const configemoji = require('../../config.json')
      client.emotes = configemoji.emoji;
      try {
        await queue.skip()
        message.react('⏭')
        message.react(client.emotes.miku)
      } catch (e) {
        message.react('❌')
        const errorembed = new EmbedBuilder()
.setColor('#FF0000')
.setAuthor({
    name: `Miku Thông Báo:`,
    iconURL: `${message.guild.iconURL()}`
})
.setDescription(`Chờ đã ?! Có lỗi rồi :(\n\`\`\`js\n${e}\`\`\``)
.setThumbnail(`https://media.tenor.com/IWKYIP6AMIgAAAAd/miku-nakano-the-quintessential-quintuplets.gif`)
.setTimestamp()
.setFooter({
    text: `${client.user.tag}`,
    iconURL: client.user.displayAvatarURL()
})
         message.reply({embeds :[errorembed]})
      }
    }
  }