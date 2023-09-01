const { Client, Collection, GatewayIntentBits, Partials, IntentsBitField } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildPresences,
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [
    Partials.User,
    Partials.Message,
    Partials.Channel
  ]
});
const Discord = require('discord.js')
const { DisTube } = require('distube')
const handler = require('./src/commandHardler');
const runMSGCR = require('./src/event')
const runReady = require('./events/ready')
const config = require('./config.json');
client.commands = new Collection();
client.aliases = new Collection();
client.interactions = new Collection();
const configemoji = require('./config.json')
client.emotes = configemoji.emoji;

const { SpotifyPlugin } = require('@distube/spotify')
const { SoundCloudPlugin } = require('@distube/soundcloud')
const { YtDlpPlugin } = require('@distube/yt-dlp')

client.distube = new DisTube(client, {
  leaveOnStop: false,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin()
  ]
})

function separateNumbers(inputNumber) {
  const numStr = inputNumber.toString();
  let separatedStr = '';

  for (let i = 0; i < numStr.length; i++) {
    if (i > 0 && (numStr.length - i) % 3 === 0) {
      separatedStr += '.';
    }
    separatedStr += numStr[i];
  }

  return separatedStr;
}
function removeTrailingZeros(inputNumber) {
  const numStr = inputNumber.toString();
  let endIndex = numStr.length - 1;

  while (endIndex >= 0 && numStr[endIndex] === '0') {
    endIndex--;
  }

  const trimmedNumber = numStr.slice(0, endIndex + 1);
  return trimmedNumber;
}
client.distube
  .on('playSong', async (queue, song, message) => {
    ///const autoplay = await queue.toggleAutoplay()

    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: song.name,
        url: song.url,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1037832432684122152/sound.gif?width=128&height=128`
      })
      .setDescription(`\`\`\`js\n${queue.formattedCurrentTime} ―――――――――――――――――――― ${song.formattedDuration}\n ⇆ㅤㅤㅤㅤ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤㅤ↻ \`\`\``)
      .setThumbnail(song.thumbnail)
      .setFields(
        { name: 'Info:', value: `┕${client.emotes.miku} \`\`${separateNumbers(song.views)}\`\`\n┕${client.emotes.like} \`\`${separateNumbers(song.likes)}\`\`\n┕${client.emotes.dislike} \`\`${song.dislikes}\`\`\n┕${client.emotes.upload} [\`\`${song.uploader.name}\`\`](${song.uploader.url})`, inline: true },
        { name: 'Player:', value: `┕${client.emotes.request} \n${song.user}\n┕${client.emotes.playlist} \`\`${queue.queues.size}\`\` bài\n┕${client.emotes.clock} \`\`${song.formattedDuration}\`\``, inline: true },
        { name: 'Setting:', value: `┕${client.emotes.volume} \`\`${queue.volume}%\`\`\n┕${client.emotes.repeat} \`\`${queue.repeatMode ? (queue.repeatMode === 2 ? 'Lặp Danh Sách' : 'Lặp 1 Bài') : 'Không có'}\`\`\n┕${client.emotes.autoplay} \`\`${queue.autoplay ? '✅' : '❌'}\`\`\n┕${client.emotes.speed} \`\`1x\`\``, inline: true },
        { name: 'VoiceChannel:', value: `┕${queue.voiceChannel} [\`\`${removeTrailingZeros(queue.voiceChannel.bitrate)}\`\` kbps] \`\`(${queue.voiceChannel.members.size}/∞)\`\` - Ping: \`\`${client.ws.ping}\`\` ms` },
        { name: 'Effect:', value: `┕\`\`${queue.filters.names.join(', ') || 'Không có'}\`\`` },
        { name: 'Đề xuất: [YouTube]', value: `┕${client.emotes.youtube} [\`\`${song.related[1].name}\`\`](${song.related[1].url})\nㅤ${client.emotes.clock} \`\`${song.formattedDuration}\`\` - ${client.emotes.upload} [\`\`${song.uploader.name}\`\`](${song.uploader.url})` }
      )
      .setColor('#FF0000')
      .setFooter({
        text: `${client.user.tag} - Youtube`,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1038102926482210837/Youtube.png?width=102&height=102`
      })
      .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
      .setTimestamp()
    queue.textChannel.send({ embeds: [embed] })


  }
  )



  .on('addSong', async (queue, song) => {
    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Thêm vào hàng đợi 🎵`,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1037832432684122152/sound.gif?width=128&height=128`
      })
      .setDescription(`${client.emotes.youtube} [\`\`${song.name}\`\`](${song.url})`)

      .setFields(
        { name: `Yêu cầu:`, value: `${song.user}`, inline: true },
        { name: `Thời lượng:`, value: `\`\`${song.formattedDuration}\`\``, inline: true },
        { name: `Danh sách:`, value: `${queue.queues.size} bài - \`\`${song.formattedDuration}\`\``, inline: true }
      )
      .setColor('#FF0000')
      .setThumbnail(song.thumbnail)
      .setFooter({
        text: `${client.user.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp()
    queue.textChannel.send({ embeds: [embed] })
  })
  .on('addList', async (queue, playlist) => {
    const embed = new Discord.EmbedBuilder()
      .setAuthor({
        name: `Thêm vào hàng đợi 🎵`,
        iconURL: `https://media.discordapp.net/attachments/1036136013925453894/1037832432684122152/sound.gif?width=128&height=128`
      })
      .setDescription(`${client.emotes.youtube} Danh sách: [\`\`${playlist.name}\`\`](${playlist.url})`)

      .setFields(
        { name: `Yêu cầu:`, value: `${playlist.member}`, inline: true },
        { name: `Thời lượng:`, value: `\`\`${playlist.formattedDuration}\`\``, inline: true },
        { name: `Danh sách:`, value: `${playlist.songs.length} bài - \`\`${playlist.formattedDuration}\`\``, inline: true }
      )
      .setColor('#FF0000')
      .setThumbnail(playlist.thumbnail)
      .setFooter({
        text: `${client.user.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp()
    queue.textChannel.send({ embeds: [embed] })
  }
  )
  .on('error', (channel, e) => {
    if (channel) channel.send(`${client.emotes.error} | An error encountered: ${e.toString().slice(0, 1974)}`)
    else console.error(e)
  })
  .on('empty', queue => queue.textChannel.send('Voice channel is empty! Leaving the channel...'))
  .on('searchNoResult', (message, query) =>
    message.channel.send(`${client.emotes.error} | No result found for \`${query}\`!`)
  )
  .on('finish', queue => queue.textChannel.send('Finished!'))


client.on('ready', async () => {
  await runReady(client);
  await runMSGCR(client);
  await handler(client);
});



client.on('interactionCreate', async interaction => {

});

client.on('messageCreate', async (message) => {


});

client.login(config.token);