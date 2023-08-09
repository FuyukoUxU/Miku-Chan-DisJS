module.exports = {
    name: 'leave',
    run: async (client, message) => {
        const { checkSameRoom } = require('../../src/util')
        if (checkSameRoom(message)) return; 
      client.distube.voices.leave(message)
      message.reply(`Đã rời kênh thoại theo yêu cầu !`)
    }
  }