const { DiscordAPIError } = require('discord.js');
const fs = require('fs');
const { client } = require("../app");
const randomColor = require("randomcolor");
const Discord = require("discord.js")
module.exports = {
    name: 'help',
    description: `returns an embed message featuring a website link that provides access to see a list of available commands.`,
    input: `This command does not support any arguments.`,
	run(message) {
		
            let hembed = new Discord.MessageEmbed()
            .setTitle(`Need some help?`)
            .setColor(randomColor())
            .setAuthor(message.author.username)
            .setDescription(`Lydian has a wide variety of commands that can be run by both users and administrators on any server.`)
            .addFields(
                { name: "Website Link:", value: "In progress!"}
            );
        
            message.channel.send(hembed);

    }




}
