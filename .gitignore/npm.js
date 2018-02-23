const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json')
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var bot = new Discord.Client();
var prefix = ("-");
var test = 3;
var randnum = 0


var storynumber = db.get('histoires').map('story_value').value();

bot.on('ready', () => {
    bot.user.setPresence({game: { name: '[-help] Mon créateur me code' + "      Ne me faites pas chier", type : 0}}); 
    console.log("Bot Ready !")
});

bot.login('NDE1NzgxMjQzNDI3NDg3NzQ0.DXA0XQ.nsl-cvwCh9mkb2tj7kYeCQyRces');

bot.on('message', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get('xp').find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 2}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb);
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 2}).write();
    }

   if (message.content === "Ping"){
       message.reply("Pongeuh");
       console.log('ping pong');
    }
    if (message.content === "I love you"){
        message.reply("Moi aussi je t'aime :hearts:");
        console.log('ping pong');
    }    
    if (message.content === "Créateur"){
            message.reply("Le createur de ce bot et B");
            console.log('créateur');
     }
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
            .setColor('#2800F3')
            .setFooter("Ne t'inquiète pas ! C'est pas terminer ;-) Mon créateur me code")
            .addField("Say", "Vous permet de mettre un message qui va être delete et écrit pas le bot")
            .addField("Les commandes du BOT !", "      -help : Affiche les commandes du bot")
            .addField("Pour faires les commandes :thinking:", "Pour que tu puisse faire les commandes le prefix est : - :hugging: sans l'émoji bien sûr")
            .addField("Interaction :sunglasses:", "Ping : Le bot te repondra Pongeuh")
            .addField("Interaction :sunglasses:", "I love you, Le bot te repondra : Moi aussi je t'aime")
            .addField("Interaction :sunglasses:", "Comment vas-tu Souristo ? = Le bot vous repondras une réponse aléatoire   |  Ne marche plus")
            .addField("Commande XP :hugging:", "xpstats vous permez de voir vos xp en général");
            

        message.channel.sendEmbed(help_embed);
        //message.channel.sendMessage("Tu à la les commandes du bot ! : \n -help pour afficher les commandes");
        console.log("La commande help a été effectuer");
     }
     if(message.content === "Comment vas-tu Souristo ?")
        random();

        if (randnum == 1){
            message.reply("**Thanks you je vais très bien** 🦄");
            console.log(randnum);
        }
        if (randnum == 2){
            message.reply("**Je suis maladeeeeee ! Je vais pas bien** 😪");
            console.log(randnum);
        }
        if (randnum == 3){
            message.reply("**Ca peut allez mieux j'ai perdu mon lapin** 🐰");
            console.log(randnum);
        }
        if (randnum == 4){
            message.reply("**Wesh frère sa gaz ?** 🙋‍");
            console.log(randnum);
        } 
        if (randnum == 5){
            message.reply("**Moi personnellement je vais bien et toi ?** 😊");
            console.log(randnum);       
        }
       

        if(message.content === prefix + "xpstats"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
            .setTitle(`**Nombre d'XP de** ${message.author.username}`)
            .addField("XP :", `${xpfinal[1]} xp`)
            .setDescription("Voici Ton nombre d'XP")
           
        message.channel.send({embed: xp_embed});
        }

    if (!message.content.startsWith(prefix)) return
    var args = message.content.substring(prefix.length).split(" ");

    if (message.content.startsWith("-say")) {
        var say_msg = message.content.substr(5)
        var say_embed = new Discord.RichEmbed()
            .addField("Requete de " + message.author.username, say_msg)
            .setFooter("Commande par Mister_Koro, merci à lui de m'avoir passer cette commande")
        message.delete()
        message.channel.sendEmbed(say_embed)
    }
    const currentDate = new Date();
    const output = currentDate.getDate() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getFullYear();
    
    switch (args[0].toLowerCase()){
   case "kick":
        if (!message.channel.permissionsFor(message.member).hasPermission("KICK_MEMBERS")){
            message.reply("Tu n'as pas la permission pour kick ! :warning:")
        }else{
            var memberkick = message.mentions.users.first();
            console.log(memberkick)
            console.log(message.guild.member(memberkick).kickable);{
            if(!memberkick){
                message.reply("L'utilisateur n'existe pas !:regional_indicator_l: :regional_indicator_o: :regional_indicator_l: ");
            }else{ 
                if(!message.guild.member(memberkick).kickable){
                    message.reply("Utilisateur impossible à kick ! :regional_indicator_s::regional_indicator_o::regional_indicator_r::regional_indicator_r::regional_indicator_y:");
                }else{
                    message.guild.member(memberkick).kick().then((member) => {
                        message.channel.send(`${member.displayName} **à été kick ! Tampis pour lui !**`);
                    }).catch(() => {
                        message.channel.send("Kick refusé !")
                    }
            
                )    
            }    
        break;
        
        switch (args[0].toLowerCase()){
        case "ban":

            if (!message.channel.permissionsFor(message.member).hasPermission("BAN_MEMBERS")){
                message.reply("Tu n'as pas les droits de ban ! :warning: ")
            }else{
                var memberban = message.mentions.users.first();
                if(!memberban){
                    message.reply("Cette personne n'existe pas ! :warning: ");
                }else{
                    if(!message.guild.member(memberban).bannable){
                        message.reply("Personne impossible à ban ! :warning: ");
                    }else{
                        message.guild.member(memberban).ban().then((member) => {
                        message.channel.send(`${member} a été ban ! `);
                    }).catch(() => {
                        message.channel.send("Ban Refusé ! :warning: ")
                    })
                }
            }
        }
    }
break;


    function story_random (min, max) {
        min = Math.ceil(1);
        max = Math.floor(storynumber = -1);
        randnum = Math.floor(Math.random() * (max - min +1) + min);
    }

function random (min, max) {
    min = Math.ceil(0);
    max = Math.floor(2);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}}}}}})
