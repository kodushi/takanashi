const Discord = require("discord.js")
const client = new Discord.Client()
const curseWords = require("cursewords.json")
const config = require("config.json")
const prefix = config.prefix;
let amountof = "0"
require("dotenv").config()

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.user.setActivity("chat for bad words", {
  type: "WATCHING"
});

client.on('ready', () => {
  client.api.applications(client.user.id).commands.post({
      data: {
          name: "count",
          description: "Moderation count"
          // possible options here e.g. options: [{...}]
      }
  });


  client.ws.on('INTERACTION_CREATE', async interaction => {
      const command = interaction.data.name.toLowerCase();
      const args = interaction.data.options;

      if (command === 'hello'){ 
         client.api.interactions(interaction.id, interaction.token).callback.post({
           data: {
             type: 4,
             data: {
               content: amountof
             }
           }
         })
      }
  });
});

client.on("message", msg => {
  for(var i = 0; i < curseWords; i++) {
    if(msg.content.includes(curseWords[i])) {
      let role = msg.guild.roles.find(r => r.name === "Role Name");
      msg.member.addRole(role)
      msg.member.send("You have been muted for 30 minutes")
      msg.delete(0)
      amountof++
      setTimeout(function() {
        msg.member.removeRole(role)
      }, 1800000) 
    }
  }
  
  if(msg.content === prefix + "count") {
    msg.author.reply("I have moderated " + amountof + " words!")
  }
})

client.login(process.env.TOKEN)
