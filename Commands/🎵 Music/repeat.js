module.exports = {
  name: 'repeat',
  aliases: ['loop', 'rp'],
  inVoiceChannel: true,
  run: async (client, message, args) => {

    const { checkSameRoom } = require('../../src/util')
    if (checkSameRoom(message)) return;
    const { EmbedBuilder } = require('discord.js');
    const noMusicEmbed = new EmbedBuilder()
      .setColor('#FF0000')
      .setAuthor({
        name: `Miku Thông Báo`,
        ////   iconURL: `${message.guild.iconURL()}`
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
      if (0 <= Number(args[0]) && Number(args[0]) <= 2) {
        queue.setRepeatMode(parseInt(args[0]))
        message.reply(`Chế độ lặp được đặt thành: \n\`\`${queue.repeatMode ? (queue.repeatMode === 2 ? '🔁 Lặp danh sách phát' : '🔂 Lặp bài hiện tại') : 'Không có'}\`\``)
      } else {
        const embed2 = new EmbedBuilder()
          .setAuthor({
            name: 'Miku Thông Báo:',
            ///iconURL: `${message.guild.iconURL()}`
          })
          .setDescription(`Chờ đã ?! Có lỗi rồi :(\n 🔁 Bạn cần đặt chế độ lặp hợp lệ !\n\`\`0 = Tắt\`\`\n\`\`1 = 🔂 Lặp bài hiện tại\`\`\n\`\`2 = 🔁 Lặp danh sách phát\`\``)
          .setColor('#FF0000')
          .setFooter({
            text: client.user.tag,
            iconURL: `${client.user.displayAvatarURL()}`
          })
          .setTimestamp()
          .setThumbnail(`https://media.tenor.com/IWKYIP6AMIgAAAAd/miku-nakano-the-quintessential-quintuplets.gif`)
          .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
        message.reply({ embeds: [embed2] })
      }
    } catch {
      return;
    }
  }
}