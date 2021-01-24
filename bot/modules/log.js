const { client } = require("../app.js");
const Discord = require("discord.js")
const randomColor = require("randomcolor"); // random colour generation node module
function embed (cmd, args, message, user){
    

    const logembed = new Discord.MessageEmbed() // Create new embed message with paremeters (below)
    .setColor(randomColor())
    .setTitle(`${message.author.username} -> ${cmd}`)
    .setAuthor(`LYDIAN - LOGGED COMMAND`)
    .setDescription(`The ${cmd} command was ran by a user with the valid permissions.`)
    .addFields(
        {name: `Used By`, value:`${message.author}`},
        {name: `Subject`, value:`${user}`},
        {name: `Reason`, value:`${args}`},
        {name: `Time Data`, value:`${Date()}`}
    );
    return logembed
}

module.exports = {
    embed
};