const fs = require('fs');
const moment = require('moment');
module.exports = async (client) => {
    let count = 0;
    const folder = await fs.readdirSync('./Commands').filter(file => !file.endsWith('.js'));
    for (const folderName of folder) {
        const files = await fs.readdirSync(`./Commands/${folderName}`).filter(file => file.endsWith('.js'));
        for (const fileName of files) {
            try {
                const command = require(`../Commands/${folderName}/${fileName}`);
                count++;
                client.commands.set(command.name, command);
                
                for (const alias of (command.aliases || [])) {
                    client.aliases.set(alias, command.name);
                }
                
                
            } catch (e) {
                console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Fail ⛔ ${fileName}`);
                console.log(e);
            }
        }
        
    }
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Đã tải ${count} lệnh !`)
}