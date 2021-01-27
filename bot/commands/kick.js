const fs = require('fs');
const { client } = require("../app");
const randomColor = require("randomcolor");
const Discord = require("discord.js");
const logembed = require("../modules/log.js");
module.exports = {
    name: 'kick',
    description: `removes a specified user from the server`,
    input: `user\nuser + reason`,
	run: async(client, message, args) => {
		
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.reply(`**You do not have permission to run: ${module.exports.name}**`);
        if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.reply(`**Error: I do not have the required permission to run this command: ${module.exports.name}`)
        if(!args[0]) return message.reply(`Error: ${module.exports.name} requires arguments to run. If you are unsure of the arguments required, use ${module.exports.name} info`)
        if(args[1]){ reason = args.slice(1) }
        if(!args[1]){ reason = `There was no reason specified by the member.`}


        const user = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!user) return message.reply("Error: mention was not found.")
        if(user.id === message.author.id) return message.reply("Hey man, you can't do that to yourself... It'll never be the same without you!")
        if(!user.bannable) return message.reply("Error: I can't perform this action due to - User not being bannable by Lydian. (Role Hierarchy?)")

        if(client.servercache.get(message.guild.id).logsenabled == "true") {
            const logid = client.servercache.get(message.guild.id).logid
            client.channels.cache.get(logid).send(logembed.embed(module.exports.name, reason, message, user))
        }

        user.kick({reason})
        .catch(err => {
            if (err) return message.channel.send(`Well.... the ban didn't work out. Here's the error ${err}`)
        });




    


        


    }




}
