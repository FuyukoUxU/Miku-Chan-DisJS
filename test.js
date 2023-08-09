const Discord = require('discord.js-selfbot-v13');
const fs = require('fs');
 const { joinVoiceChannel } = require('@discord.js-selfbot-v13/voice');

module.exports = {
    name: "treovoice",
    run: async (client, message, args) => {
   ////   const channel = message.member.voice.channel.id
   /////   if (!channel) return message.channel.send('Vui lòng vào room voice')

       joinVoiceChannel({
            channelId: message.member.voice.channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator
        })


}}
