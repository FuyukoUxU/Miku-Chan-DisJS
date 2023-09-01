const { checkSameRoom } = require('../../src/util');
const configemoji = require('../../config.json');

module.exports = {
  name: 'play',
  aliases: ['p'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    try {
      if (checkSameRoom(message)) return;

      const string = args.join(' ');
      if (!string) {
        return message.reply(`Vui lòng nhập tên bài hát hoặc url để phát nhạc !`);
      }
     client.distube.play(message.member.voice.channel, string, {
        member: message.member,
        textChannel: message.channel,
        message,
      });

      client.emotes = configemoji.emoji;

      const replyMessage = await message.reply(`Đang chuẩn bị, vui lòng đợi ${client.emotes.miku}`);
      setTimeout(() => replyMessage.delete(), 2900);
    } catch(error)  {
      console.error('An error occurred:', error);
    }
  },
};
