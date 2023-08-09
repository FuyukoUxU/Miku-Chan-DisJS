const Discord = require('discord.js')


module.exports = {
    name: 'nowplaying',
    aliases: ['np'],
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
      const song = queue.songs[0]
      const configemoji = require('../../config.json')
      client.emotes = configemoji.emoji;
      const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: song.name,
        url: song.url,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1037832432684122152/sound.gif?width=128&height=128`
      })
      .setDescription (`\`\`\`js\n${queue.formattedCurrentTime} ―――――――――――――――――――― ${song.formattedDuration}\n ⇆ㅤㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤㅤ↻ \`\`\``)
      .setThumbnail(song.thumbnail)
      .setFields(
        { name: 'Info:', value: `┕${client.emotes.miku} \`\`${song.views}\`\`\n┕${client.emotes.like} \`\`${song.likes}\`\`\n┕${client.emotes.dislike} \`\`${song.dislikes}\`\`\n┕${client.emotes.upload} [\`\`${song.uploader.name}\`\`](${song.uploader.url})`,  inline: true},
        { name: 'Player:', value: `┕${client.emotes.request} \n${song.user}\n┕${client.emotes.playlist} \`\`${queue.queues.size}\`\` bài\n┕${client.emotes.clock} \`\`${song.formattedDuration}\`\`` ,  inline: true },
        { name: 'Setting:', value: `┕${client.emotes.volume} \`\`${queue.volume}%\`\`\n┕${client.emotes.repeat} \`\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Lặp Danh Sách' : 'Lặp 1 Bài') : 'Không có'}\`\`\n┕${client.emotes.autoplay} \`\`${queue.autoplay ? '✅' : '❌'}\`\`\n┕${client.emotes.speed} \`\`1x\`\``,  inline: true},
        { name: 'VoiceChannel:', value: `┕${queue.voiceChannel} [\`\`${queue.voiceChannel.bitrate}\`\` kbps] \`\`(${queue.voiceChannel.members.size}/∞)\`\` - Ping: \`\`${client.ws.ping}\`\` ms`},
        { name: 'Effect:', value:`┕\`\`${queue.filters.names.join(', ') || 'Không có'}\`\``},
        { name: 'Đề xuất: [YouTube]', value:`┕${client.emotes.youtube} [\`\`${song.related[1].name}\`\`](${song.related[1].url})\nㅤ${client.emotes.clock} \`\`${song.formattedDuration}\`\` - ${client.emotes.upload} [\`\`${song.uploader.name}\`\`](${song.uploader.url})`}
      )
      .setColor('#FF0000')
      .setFooter({
        text: `${client.user.tag} - Youtube`,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1038102926482210837/Youtube.png?width=102&height=102`
      })
      .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
      .setTimestamp()
       message.reply({ embeds : [embed]})
    }
  }