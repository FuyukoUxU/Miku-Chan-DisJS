const { readdirSync } = require('fs');

module.exports = (client) => {

    const files = readdirSync('./events/');
    for (const f of files) {
        if (!f.endsWith('.js')) continue;
        const eventName = f.substring(0, f.indexOf('.js'));
        const event = require(`../events/${f}`);
        client.on(eventName, event.bind(null, client));
 
    }
}