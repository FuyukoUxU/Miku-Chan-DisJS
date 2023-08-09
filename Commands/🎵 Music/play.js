const { checkSameRoom } = require('../../src/util')
module.exports = {
    name: 'play',
    aliases: ['p'],
    inVoiceChannel: true,
    run: async (client, message, args) => {
  
      if (checkSameRoom(message)) return;
      const string = args.join(' ')
      if (!string) return  message.reply(`Vui lòng nhập tên bài hát hoặc url để phát nhạc !`)
      client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message
      })
      const configemoji = require('../../config.json')
      client.emotes = configemoji.emoji;
      message.reply(`Đang chuẩn bị, vui lòng đợi ${client.emotes.miku}`).then(msg => { setTimeout(() => msg.delete(), 2900)})
    }
  }