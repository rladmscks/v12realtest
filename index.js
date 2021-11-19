require("dotenv").config();

const { Client, Collection } = require("discord.js");
const client = new Client({
    disableMentions: "everyone",
    partials: ["CHANNEL", "MESSAGE", "GUILD_MEMBER", "REACTION"],
});

const token = process.env.BOT_TOKEN

client.commands = new Collection();
client.events = new Collection();
client.aliases = new Collection();

module.exports = client;

["command_handler", "event_handler"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
}); 

client.login(token);