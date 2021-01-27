const Discord = require("discord.js");
config = require("../config.json");
const fs = require('fs');
const { client } = require("../app");
module.exports = {
    event: "guildCreate", // Message event
    once: false, // Trigger multiple times
    run(guild) { // This code is run when the event is called, this is the actual function.

        
        const channel = guild.channels.cache.find(
            (c) => c.type === "text"
        );
        



            
        let serverinfo = {
            serverjoinedname: guild.name,
            serverid: guild.id,
            prefix: ".",
            logsenabled: "true"
        }

        let data = JSON.stringify(serverinfo);

        serverdir = fs.writeFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${guild.id}.JSON`, data)
        client.servercache.set(guild.id, serverinfo);

        if(channel) return msg = channel.send("**Use .config to begin with the setup of Lydian.**");



        }
}
