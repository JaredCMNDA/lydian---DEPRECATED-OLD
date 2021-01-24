const fs = require('fs');
const { client } = require("../app");
const logembed = require("../modules/log.js");
module.exports = {
    name: 'config',
    description: `allows a server administrator to edit the configuration for Lydian on this server.`,
    input: `prefix\nlogchannel`,
	run: async(client, message, args) => {
		
        if(!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR")) return message.reply(`**You do not have permission to run: ${module.exports.name}**`);
        if(!message.content.split(' ')[1]) return message.reply(`Error: ${module.exports.name} requires arguments to run. If you are unsure of the arguments required, use ${module.exports.name} info`)

        if(message.content.split(' ')[1] == "prefix"){
            if(message.content.split(' ').length > 3) return message.reply(`Error: prefix only supports 3 arguments. Please use ${module.exports.name} prefix <prefix>`)
            const newprefix = message.content.split(' ')[2];

            let serverfile = fs.readFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`) // read the server file
            let olddata = JSON.parse(serverfile) // parse the old data
            olddata.prefix = newprefix // Change the old data from the server file to the new prefix that was suggested
            let data = JSON.stringify(olddata) // stringify the data to JSON format
            fs.writeFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`, data); // Write the new data to the server file


            // UPDATE THE CACHE
            const server = message.guild.id;
            client.servercache.set(server, olddata);
        
        }
        
        if(message.content.split(' ')[1] == "logchannel"){
            if(args > 2) return message.reply(`Error: logchannel only supports 3 arguments. Please use ${module.exports.name} logchannel @channel`)
            const logchannel = message.mentions.channels.first() || message.guild.channels.cache.get(args[1])
            if(!logchannel) return message.reply("Error: mention was not found.")

            let serverfile = fs.readFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`) // read the server file
            let olddata = JSON.parse(serverfile) // parse the old data
            olddata.logid = logchannel.id // Change the old data from the server file to the new prefix that was suggested
            let data = JSON.stringify(olddata) // stringify the data to JSON format
            fs.writeFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`, data); // Write the new data to the server file


            // UPDATE THE CACHE
            const server = message.guild.id;
            client.servercache.set(server, olddata);


        
        }






	},
};