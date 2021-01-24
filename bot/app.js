/* Necessary Variables & Modules */
const fs = require("fs");
const Discord = require("discord.js")
const config = require("./config.json")
const path = require('path')
// Necessary Variables/Required
const client = new Discord.Client();
client.commands = new Discord.Collection()
client.servercache = new Map
servercache = client.servercache // Set servercache to be equal to client.servercache (this just makes it easier to call servercache, looks less congested)

// Export from app.js
module.exports = {
    client: client,
    commands: client.commands
    
}

// Importing from files
const info = require("./modules/cmdinfo.js");





/* Variables */

const i = 0; // Counter variable, used anytime something needs to be counted (integer)


// Create a cache for server information
console.log(`Loading Cache...`)
const serverdata = fs.readdirSync(`.//data//servers`).filter(file => file.endsWith(".JSON"));
for (file of serverdata){
    let data = fs.readFileSync(`.//data//servers//${file}`)
    let cached = JSON.parse(data)
    servercache.set(cached.serverid, cached);
}
console.log(servercache)
console.log(`Cache Complete.`)

// Events handler
fs.readdir('./utilities/', (err, files) => { //read the utilities directory
    if (err) return console.error(err); // spit out error if detected
    files.forEach(file => { // for each file in the utilities directory, do {this}
        const eventFunction = require(`./utilities/${file}`); // require the function of the file
        if (eventFunction.disabled) return;

        const event = eventFunction.event || file.split('.')[0];
        const emitter = (typeof eventFunction.emitter === 'string' ? client[eventFunction.emitter] : eventFunction.emitter) || client;
        const once = eventFunction.once;

        try {
            emitter[once ? 'once' : 'on'](event, (...args) => eventFunction.run(...args));
        }
        catch (error) {
            console.error(error.stack);
        }
    });
});

// Message Event
client.on("message", message => {



            let data = fs.readFileSync(`./data/servers/${message.guild.id}.json`)
            let parsed = JSON.parse(data)
            let prefix = parsed.prefix;
            // Checking the message
            if(!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;
            // Split into args and define what the command is
            let args = message.content.slice(prefix.length).trim().split(' ');
            let command = args.shift().toLowerCase();
            //
            if(!client.commands.has(command)) return; // Return if the command does not exist
            //
            let cmd = client.commands.get(command); 
            if(args[0] == "info") return message.channel.send(info.embed(cmd.name, message.author.username, cmd.description, cmd.input))
            if(command == "config"){
                client.commands.get(command).run(client, message, args);
            }
            if(!client.servercache.get(message.guild.id).logid) return (message.channel.send(`Error: No log channel has been set. This bot requires a log channel to keep logs. If you are unsure of how to do this, please use .config logchannel <#channel>`))
            
            client.commands.get(command).run(client, message, args);





});

        
// Command handler
const cmds = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
for (file of cmds){
    const command = require(`./commands/${file}`)


    client.commands.set(command.name, command)
    
}


// Login
client.login(config.token);