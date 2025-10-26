const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
    voter = config.DSLVoteRoleID
BumpPoints = config.BumpPoints
DSLPoints = config.DSLPoints
console.log(BumpPoints)
DSLChannel = config.DSLPointsChannelID
BumpChannel = config.BumpPointsChannelID
BumpBotID = config.BumpBotID
});



client.on('message', async message => {
	if (message.author.id == BumpBotID) {
        console.log('author said')
        let embed = message.embeds[0];
        console.log(embed.description)
        if (embed && embed.description.includes('Bump done')){
            console.log('yes')
            need = embed.description
            toString(need)
            need = need.substring(2)
            user = need.substring(0, need.indexOf('>'))
            print(user)
            
        if(BumpPoints == 1){
            ts = 't'
            
        }
        else {
            ts = 'ts'
        }
        channel = client.channels.cache.get(BumpChannel);
        channel.send('<@' +user +'> gained ' + BumpPoints + ' vote poin'+ ts)
            
            console.log(user + ': 1\nnext')
        }
    }});
    client.on('guildMemberUpdate', (newMember, oldMember) =>  {
        
    console.log('guildMemberUpdate')
        
        if(oldMember.roles.cache.has(voter)) {
            console.log('has role');
            if(DSLPoints == 1){
            ts = 't'
            }
            else {
                ts = 'ts'
            }
            user = newMember
            channel = client.channels.cache.get(DSLChannel);
            channel.send('<@' + user +'> gained ' + DSLPoints + ' vote poin'+ts)
            newMember.roles.remove(voter)
            
           
    }});
client.login(config.token);