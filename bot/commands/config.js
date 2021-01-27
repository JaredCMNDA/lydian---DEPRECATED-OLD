const fs = require('fs');
const { client } = require("../app");
const logembed = require("../modules/log.js");
module.exports = {
    name: 'config',
    description: `allows a server administrator to edit the configuration for Lydian on this server.`,
    input: `prefix\nlogschannel\nlogs (true/false)`,
	run: async(client, message, args) => {
		
        if(!message.member.hasPermission("MANAGE_GUILD" || "ADMINISTRATOR")) return message.reply(`**You do not have permission to run: ${module.exports.name}**`);
        if(!message.content.split(' ')[1]) return message.reply(`Error: ${module.exports.name} requires arguments to run. If you are unsure of the arguments required, use ${module.exports.name} info`)

        if(args[0] === "prefix"){
            if(message.content.split(' ').length > 3) return message.reply(`Error: prefix only supports 3 arguments. Please use ${module.exports.name} prefix <prefix>`)
            const newprefix = message.content.split(' ')[2];
            if(!newprefix) return message.channel.send("Error: No prefix was specified!")

            let serverfile = fs.readFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`) // read the server file
            let olddata = JSON.parse(serverfile) // parse the old data
            olddata.prefix = newprefix // Change the old data from the server file to the new prefix that was suggested
            let data = JSON.stringify(olddata) // stringify the data to JSON format
            fs.writeFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`, data); // Write the new data to the server file



            // UPDATE THE CACHE
            const server = message.guild.id;
            client.servercache.set(server, olddata);
            // SEND LOG
            if(client.servercache.get(message.guild.id).logsenabled == "true") {
                const logid = client.servercache.get(message.guild.id).logid
                client.channels.cache.get(logid).send(logembed.embed(module.exports.name, args, message))
            }
        }
        
        if(args[0] === "logschannel"){
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
            // SEND LOG
            if(client.servercache.get(message.guild.id).logsenabled == "true") {
                const logid = client.servercache.get(message.guild.id).logid
                client.channels.cache.get(logid).send(logembed.embed(module.exports.name, args, message))
            }


        
        }

        if(args[0] === "logs"){
            if(args > 1) return message.reply(`Error: logs only supports 3 arguments. Please use ${module.exports.name} logs true/false`)

            choice = args[1]

            
            if(choice === "true" || "false"){
                let serverfile = fs.readFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`) // read the server file
                let olddata = JSON.parse(serverfile) // parse the old data
                olddata.logsenabled = choice // Change the old data from the server file to the new prefix that was suggested
                let data = JSON.stringify(olddata) // stringify the data to JSON format
                fs.writeFileSync(`C:\\Users\\Jared\\Desktop\\Lydian\\bot\\data\\servers\\${message.guild.id}.JSON`, data); // Write the new data to the server file
                // UPDATE THE CACHE
                const server = message.guild.id;
                client.servercache.set(server, olddata);
                // SEND LOG
                if(client.servercache.get(message.guild.id).logsenabled == "true") {
                    const logid = client.servercache.get(message.guild.id).logid
                    client.channels.cache.get(logid).send(logembed.embed(module.exports.name, args, message))
                }
            }else{
                return message.channel.send("err")
            }

        }







    }
}
