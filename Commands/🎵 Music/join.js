const Discord = require('discord.js')
module.exports = {
  name: "join",
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const { checkSameRoom } = require('../../src/util')
    if (checkSameRoom(message)) return;
    let voiceChannel = message.member.voice.channel
    client.distube.voices.join(voiceChannel)
    message.reply(`Đã vào voice channel ${voiceChannel} ! Chạy lệnh play để phát nhạc nhaaa !`)
  }
}   