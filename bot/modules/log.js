const Discord = require("discord.js")
const randomColor = require("randomcolor"); // random colour generation node module
function embed (cmd, args, message, user){
    
    if(!cmd) return console.log(`You must give a command name in order to use the log embed function.`)
    if(!args){args=`N/A || No reason or arguments supplied. (This may be because arguments were not needed for this command.)`}
    if(!message) return console.log(`You must give a message in order to use the log embed function.`)
    if(!user){user=`N/A || No user was supplied. (This may be because there was no user that the command required)`}

    const logembed = new Discord.MessageEmbed() // Create new embed message with paremeters (below)
    .setColor(randomColor())
    .setTitle(`${message.author.username} -> ${cmd}`)
    .setAuthor(`LYDIAN - LOGGED COMMAND`)
    .setDescription(`The **${cmd}** command was ran by a user with the valid permissions.`)
    .addFields(
        {name: `Used By`, value:`${message.author}`},
        {name: `Used On`, value:`${user}`},
        {name: `Reason || Arguments`, value:`${args.join(" ")}`},
        {name: `Time Data`, value:`${Date()}`}
    );
    return logembed;
}

module.exports = {
    embed
};