const Discord = require('discord.js')
const moment = require('moment');
const { exec } = require('child_process');
module.exports = {
  name: 'spamsms',
  run: (client, message, args) => {
    const phone = args.join(' ')
    if (phone === "111" || phone === "112" || phone === "113" || phone === "114" || phone === "115" || phone === "911") { ////
      return message.reply({
        embeds: [
          new Discord.EmbedBuilder()
            .setColor('#FF0000')
            .setAuthor({
              name: `Miku Thông Báo`,
              iconURL: `${message.guild.iconURL()}`
            })
            .setDescription(`Chờ đã ?! Wait.....\n\`\`\`🛑 Bạn nhập số không hợp lệ ! Vui lòng nhập số khác 💢\`\`\``)
            .setThumbnail(`https://media.tenor.com/IWKYIP6AMIgAAAAd/miku-nakano-the-quintessential-quintuplets.gif`)
            .setTimestamp()
            .setFooter({
              text: `© ${client.user.tag}`,
              iconURL: client.user.displayAvatarURL()
            })
            .setImage(`https://cdn.discordapp.com/attachments/888268908665110558/888274569859846154/divider_1.gif`)
        ],
      }).then(msg => { setTimeout(() => msg.delete(), 4000) })
    }



    const child = exec(`python sms.py ${phone}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error executing command: ${error}`);
        return;
      }

      const result = stdout.trim();

      console.log("Result:", result);
    });

    child.stdout.on('data', (data) => {
    });

    child.stderr.on('data', (data) => {
      console.error(`Error data: ${data}`);
    });

    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Một cuộc tấn công sms được khởi chạy bởi Discord ID: ${message.author.id}`);
    const embed = new Discord.EmbedBuilder()
      .setColor("#FF0000")
      .setAuthor({
        name: `Miku Thông Báo`,
        iconURL: `${message.guild.iconURL()}`
      })
      .setDescription("☣️ Khởi chạy lệnh spam thành công !!!\n\`\`\`fix\n⚠️ Đã khởi chạy lệnh spam thành công ! Lệnh này nhằm mục đích giáo dục không cố ý tấn công người dùng hay một tố chức nào đó. Nếu có bất kì thắc mắc vui lòng liên hệ Zalo 0359828043 để yêu cầu giải quyết !\`\`\`")
      .setImage('https://cdn.discordapp.com/attachments/1036127277659988059/1142674862893187182/68747470733a2f2f36342e6d656469612e74756d626c722e636f6d2f36643734373464363166343862363639396133346166316439643664373037322f396531613135393234383833663564302d64362f73353430783831302f303266656333613734363530646137.gif')
      .addFields(
        {
          name: "👻 User :",
          value: `\`\`\`css\n [ @${message.author.username} ] \n\`\`\``,
          inline: true,
        },
        {
          name: "☎️ Phone :",
          value: `\`\`\`css\n [ ${phone} ] \n\`\`\``,
          inline: true,
        },
        {
          name: "💸 Plan :",
          value: `\`\`\`css\n [ MAX SPEED ] \n\`\`\``,
          inline: true,
        })
      .setFooter({
        text: `© ${client.user.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();
    const hehe = new Discord.EmbedBuilder()
      .setColor('#FF0000')
      .setAuthor({
        name: `Miku Thông Báo`,
        iconURL: `${message.guild.iconURL()}`
      })
      .setDescription(`Chờ một chút ! Wait.....\n\`\`\`💫💦Vui lòng chờ đợi trong giây lát, đang khởi chạy lệnh spam.....\`\`\``)
      .setImage("https://media.tenor.com/XasjKGMk_wAAAAAC/load-loading.gif")
      .setFooter({
        text: `© ${client.user.tag}`,
        iconURL: client.user.displayAvatarURL()
      })
      .setTimestamp();
    message.reply({ embeds: [hehe] }).then((message) => {
      setTimeout(function () {
        message.edit({ embeds: [embed] });
      }, 8000)
    })
  }
}