const fs = require('fs');
const { client } = require("../app");
const randomColor = require("randomcolor");
const Discord = require("discord.js");
const logembed = require("../modules/log.js");
module.exports = {
    name: 'whois',
    description: `provides info about a user in a server.`,
    input: `user`,
	run: async(client, message, args) => {
		
        if(!args[0]) return message.reply(`Error: ${module.exports.name} requires arguments to run. If you are unsure of the arguments required, use ${module.exports.name} info`)
        const user = message.mentions.members.first()
        if(!user) return message.reply("Error: mention was not found.")

        let roleslist = [] // Create role list array
        let highest = user.roles.highest; // Find the highest role that a user has
        user.roles.cache.forEach(role => roleslist.push(role)) // Push all the roles into the role list array in order to print them

        let randompresence = [
            `No game detected, seems kinda boring tbh :(`,
            `this kid doesnt even need games, hes just that cool.`,
            `honestly im too old for games`,
            `hes not playing any right now :/`
        ]

        let presence = user.presence.activities
        if(!presence.length){presence.push(randompresence[Math.floor(Math.random() * randompresence.length)])}

        let nickname = user.nickname;
        if(!nickname){nickname = "none"}; // Get the nickname, if there is not a nickname then set it to "none"


        let embed = new Discord.MessageEmbed()
        .setAuthor(message.author.username)
        .setColor(randomColor())
        .setThumbnail(user.user.avatarURL())
        .setFooter(`Lydian V1.0 || Developed by jared#6747`, client.user.avatarURL())
        .addFields(
            {name: `Username`, value: `${user.user.username}`},
            {name: `Status`, value: `${user.presence.status}`},
            {name: `Playing`, value: `${presence}`},
            {name: `Nickname`, value: `${nickname}`},
            {name: `Highest Role`, value: `${highest}`}
        )
        .addFields(
            {name: `Role List`, value: `${roleslist.join(", ")}`},
            {name: `Joined Server On`, value: `${user.joinedAt}`},
            {name: `Discord User Since`, value: `${user.user.createdAt}`}
        )

        message.channel.send(embed);

    


        


    }




}
