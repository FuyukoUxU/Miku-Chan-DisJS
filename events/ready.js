module.exports = (client) => {
    console.log(`${client.user.tag} 操作する準備ができました ! Ctrl + Cを押して一時停止します ...`);
    var countingtimes = 1;
    
    setInterval(() => {
       /// client.user.setPresence({ activities: [{ name: 'activity' }], status: 'idle' });
        const activity = (msg, type) => {
       

            client.user.setPresence({ activities: [{ name: msg }], status: type })

        }
        if (countingtimes == 1) activity(`🌎 Copyright © FuyukoUxU. All right reserved.` , 'online');
        if (countingtimes == 2) activity(`✅ Prefix c.  |  Slash Command /` , 'dnd');
        if (countingtimes == 3) activity(`🎵 Nghe nhạc chill nhaaa 🎧` , 'idle');
        if (countingtimes == 4) activity("🎮 Honkai Impact 3rd cùng  Miku :3! " ,'dnd');
        if (countingtimes == 5) countingtimes = 0;
        countingtimes++;
    }, 6000);

}