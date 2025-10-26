const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();
const Enmap = require('enmap');

client.once('ready', () => {
    console.log('Ready!');
    client.user.setActivity("For The Best Time For You To Bump The Server",{
  type: "WATCHING"

    })
BumpBotID = config.BumpBotID

});





client.settings = new Enmap({
  name: "settings",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: 'deep',
  autoEnsure: {
    Prefix: "!",
    AdminRoleIDs: "RoleID1, RoleID2, RoleID3, etcetera",
    BumpChannel: "ChannelID",
    VoteReminderRoleID: "RoleID"
  }
  
});
client.on("guildDelete", guild => {
    client.settings.delete(guild.id);
  });
  client.on("message", (message) => {
    if(!message.guild) return;
  
   
    const guildConf = client.settings.get(message.guild.id);
if(message.content.indexOf(guildConf.Prefix) !== 0) {
 if(guildConf.bumpChannel == "ChannelID" || guildConf.voteReminderRoleID == "RoleID") return;
  if (message.author.id == BumpBotID) {
     let embed = message.embeds[0];
      if (embed && embed.description.includes('Bump done')){
           setTimeout(CanVote(message.guild.id), 7200000)
      }}}else{
        
  
    const args = message.content.split(/\s+/g);
    const command = args.shift().slice(guildConf.Prefix.length).toLowerCase();
  
    
  if(command == "setconf") {
    const perms = message.member.permissions;
const has_adminP = perms.has("ADMINISTRATOR");
    if(guildConf.AdminRoleIDs == "RoleID1, RoleID2, RoleID3, etcetera"){
 if(has_adminP == false) {
   return message.reply("Your Server Does Not Have Any Admin Roles And You Do Not Have Administrator perms");}

    }
      else{
    let roleID = guildConf.AdminRoleIDs
    let roleID2 = roleID.split(" ").join("")
    let roleID3 = roleID2.split(",")
    
  
    
    let i = 0
  while(i <= roleID3.length){
    let AdminRole = message.guild.roles.cache.get(roleID3[i])
    if(AdminRole) {
      i = 0
      while(i <= roleID3.length){
        if(message.member.roles.cache.has(roleID3[i])) {
    
    i = roleID3.length
        }else if(i == roleID3.length){
          return message.reply("You're not an admin, sorry!");
        
        
            }else {
              
            }
            i++
              }
i = roleID3.length
    }else if(i == roleID3.length){
      if(!has_adminP) {return message.reply("Your Server Does Not Have Any Found Admin Roles And You Do Not Have Administrator perms");};
      
    
    
        }else {

        }
        i++
          }
        
 
    
    
                }


    const [prop, ...value] = args;
   

if(prop == undefined){return message.reply("This key is not in the configuration.");}
    
    if(!client.settings.has(message.guild.id, prop)) {
      return message.reply("This key is not in the configuration.");
    }

   
    client.settings.set(message.guild.id, value.join(" "), prop);

 
    message.channel.send(`Guild configuration item ${prop} has been changed to:\n\`${value.join(" ")}\``);
  }
  
  if(command === "showconf") {
    let configProps = Object.keys(guildConf).map(prop => {
      return `${prop}  :  ${guildConf[prop]}`;
    });
    message.channel.send(`The following are the server's current configuration:
    \`\`\`${configProps.join("\n")}\`\`\``);
}
  }
  });
  



    
    function CanVote(gID) {
        channel = client.channels.cache.get(client.settings.get(gID).BumpChannel);
        channel.send( '<@&'+ client.channels.cache.get(client.settings.get(gID).VoteReminderRoleID)+ '>' + ', you can now vote!');
    }
           
 
client.login(config.token);
