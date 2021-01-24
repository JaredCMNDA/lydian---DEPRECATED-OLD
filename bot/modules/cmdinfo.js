const { client } = require("../app.js");
const Discord = require("discord.js")
const randomColor = require("randomcolor"); // random colour generation node module
function embed (cmd, author, description, args){
    

    const infoembed = new Discord.MessageEmbed() // Create new embed message with paremeters (below)
    .setColor(randomColor())
    .setTitle(`${cmd} -> Info`)
    .setAuthor(author)
    .setDescription(description)
    .addFields(
        {name: `Supported Arguments`, value:`${args}`}
    );
    return infoembed
}

module.exports = {
    embed
};