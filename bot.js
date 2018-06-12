const Discord = require("discord.js");

const Prefix = "/";

var bot = new Discord.Client();

var fortunes = [
     "Yes",
     "No",
     "Maybe",
     "Probably",
     "Probably not"
];

bot.on("ready", function(){
   console.log("Bot is online and ready to use!")
});


bot.on("guildMemberAdd", function(member){

    member.guild.channels.find("name", "main-chat").send(member.toString() + " Welcome to this server! We hope you have fun! And don't forget to read the rules!");
    
    member.addRole(member.guild.roles.find("name", "Guest"));

});


bot.on("message", function(message){
   if(message.author.equals(bot.user)) return;

   if(!message.content.startsWith(Prefix)) return;

   var args = message.content.substring(Prefix.length).split(" ");

   switch (args[0].toLowerCase() ) {
       case "ping":
          message.channel.send("Pong!");
          break;
       case "info":
          message.channel.send("I am a bot created by MaxWithDicord!");
          break;
       case "8ball":
          if(args[1]) message.channel.send(fortunes[Math.floor(Math.random() * fortunes.length)]);
          else message.channel.send("Can't read that.");
          break;    
       case "staff":
          var staff = new Discord.RichEmbed()
              .addField("Trap Vibes", "Trap Vibes#5096")
              .addField("Owner", "MaxWithDiscord#0568")  
              .addField("Head Admin", "Kaya-Sem#4536")
              .setColor(0x20b2aa)
              .setFooter("The Staff")
              .setTimestamp(new Date())
          message.channel.sendEmbed(staff);
          break; 
       case "help":
          message.reply(" Sorry but this bot is under development. A command you can use for now is `/8ball (question)`");
          break;          
        default:
        var invalid = new Discord.RichEmbed()
           .addField("Invalid" , "Invalid command, Please try again.")
           .setColor(0xFF5733)
           .setFooter("You might have got the command wrong!")
           .setThumbnail(message.author.avatarURL)
           .setTimestamp(new Date())
        message.channel.sendEmbed(invalid);   
        
   }
});


bot.login(process.env.BOT_TOKEN);
