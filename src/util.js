const checkSameRoom = (message) => {
    if (!message.member.voice.channel) return message.reply('Bạn phải vào **voice channel** để sử dụng lệnh này !')
}




module.exports = {
    checkSameRoom
}