const Discord = require('discord.js')
const fs = require('fs')
const warnings = JSON.parse(fs.readFileSync("./Warnings.json","utf-8"))
module.exports = {
    name: "경고",
    execute(message,args){
        const embed = new Discord.MessageEmbed()
        if(args[0] == null) return message.reply(embed.setTitle("오류").addFields({name:"사용법",value:"l!경고 <TYPE> <대상>"},{name:"l!경고 확인"}
        ,{name:"TYPE",value:"\'부여\' : 경고를 부여합니다\n\'회수\' : 경고를 회수합니다"}).setColor("#fc4732"))
        const target = message.mentions.members.first()
        switch(args[0]){
            case "부여":
                if(!message.members.roles.cache.has('869013561173770240')) return message.reply("당신은 이 명령어를 사용할 권한이 없습니다")
                if(!message.mentions.members.first()) return message.reply(embed.setTitle("오류").setDescription("대상을 지정해주세요").addField("경고 - 부여 명령어 사용법","l!경고 부여 <대상>\n**대상에는 대상을 멘션하여 주세요**").setColor("#fc4732"))
                if(!warnings[target.id]) warnings[target.id] = 0
                warnings[target.id]++
                fs.waiteFile("./warnings.json",JSON.stringify(warnings),(err)=>{
                    if(err) console.log(err)
                })
                var reason = message.content.slice(29)
                if(reason == "") reason = "없음"
                return message.reply(embed.setTitle("완료").setDescription(`성공적으로 ${target.user.username}님에게 경고 1회를 부여했습니다`).addFields({name:"경고사유",value:reason},
                {name:`${target.user.username}님의 현재 경고 횟수`,value:`${warnings[target.id]}회`}))
            case "회수":
                if(message.member.roles.cache.has('869013561173770240')) return message.reply("당신은 이 명령어를 사용 할 권한이 없습니다")
                if(!message.mentions.members.first()) return message.reply(embed.setTitle("오류").setDescription("대상을 지정해주세요").addField("경고 - 회수 명령어 사용법","l!경고 회수 <대상>\n**대상에는 대상을 멘션하여 주세요**").setColor("#fc4732"))
                if(!warnings[target.id] || warnings[target.id] == 0) return message.reply(embed.setTitle("오류").setDescription("해당 사용자는 회수 할 경고가 없습니다").setColor("#fc4732"))
                warnings[target.id]--
                fs.writeFile("./warnings.json",JSON.stringify(warnings),(err)=>{
                    if(err) return console.log(err)
                })
                return message.reply(embed.setDescription(`성공적으로 ${target.user.username}님의 경고를 1회 회수하였습니다`).addField(`${target.user.username}님의 현재 경고 횟수`,`${warnings[target.id]}회`).setColor("#33ff7e"))
            case "확인":
                if(warnings[message.author.id]) warnings[message.author.id] = 0
                return message.reply(embed.setTitle("확인").setDescription(`<@${message.author.id}>님의 현재 경고 횟수는 *${warnings[message.author.id]}회* 입니다`))    
        }
    }
}