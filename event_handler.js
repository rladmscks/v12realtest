const { readdirSync } = require('fs')

module.exports = (client) =>{
    const load_dir = (dirs) => {
        const events = readdirSync(`./events/${dirs}`).filter(file => file.endsWith('js'));

        for(const file of events) {
            const event = require(`../events/${dirs}/${file}`);
            if (event.name) {
                client.events.set(event.name, event);
            } else {
                continue;
            }
        }
    }

    ['client', 'guild'].forEach(e => load_dir(e));
}