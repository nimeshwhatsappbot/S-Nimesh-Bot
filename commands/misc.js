/**
 Copyright (C) 2022.
 Licensed under the  GPL-3.0 License;
 You may not use this file except in compliance with the License.
 It is supplied in the hope that it may be useful.
 * @project_name : Secktor-Md By Suhail Tech
 * @author : SuhailTech <https://www.youtube.com/c/SuhailTechInfo>
 * @description : Secktor Bot ,A Multi-functional whatsapp bot.
 * @version 0.0.6
 **/

 const {tlang, getAdmin, prefix, Config, sck,sck1, fetchJson, runtime,cmd } = require('../lib')
 let { dBinary, eBinary } = require("../lib/binary");
const { Sticker, createSticker, StickerTypes } = require("wa-sticker-formatter");
 const fs = require('fs')
 const axios = require('axios')
  //---------------------------------------------------------------------------
 cmd({
    pattern: "welcome",
    alias:["setwelcome"],
    desc: "sets welcome message in specific group.",
    category: "misc",
 filename: __filename
},
async(Void, citel, text,{ isCreator }) => {

    let grp =citel.chat;
if(grp.split("@")[1]  == "g.us") 
{
  if (!isCreator) return citel.reply(tlang().owner)
  
      let Group = await sck.findOne({ id: citel.chat });
      if (!text)  {  return await citel.reply ("*Wellcome Message :* "+Group.welcome)  }
      await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
      let metadata = await Void.groupMetadata(citel.chat);
      var ppuser;
      let num = citel.sender;
  
      var welcome_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc);
      try {  ppuser = await Void.profilePictureUrl(num, 'image') }catch { ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg' ; }
       
  
       let buttonMessage = {
                image: { url: ppuser },
                caption: welcome_messages,
                //footer: `${Config.botname}`,
                // mentions: [num],
                headerType: 4,
          }
          return await Void.sendMessage(citel.chat, buttonMessage)
  
}
  else return citel.reply("This is Not A Group")
  
  
  

     
       /*if (!Group) {
                await new sck({ id: citel.chat, welcome: text,events:'true' }).save()
                return citel.reply('Welcome added for this group.\n *Wellcome Message :* '+text )
            } else {
                await await sck.updateOne({ id: citel.chat }, { welcome:text ,events:'true'})
                return citel.reply('Welcome updated successfully.\n *New Wellcome Message Is :* '+text)
                
            }      */
  
}
)
 //---------------------------------------------------------------------------
cmd({
    pattern: "goodbye",
    alias: ["setgoodbye","setbye"],
    desc: "sets goodbye message in specific group.",
    category: "misc",
 filename: __filename
},
async(Void, citel, text,{ isCreator }) => {

 let grp =citel.chat;
if(grp.split("@")[1]  == "g.us") 
{
 if (!isCreator) return citel.reply(tlang().owner)      
 let Group = await sck.findOne({ id: citel.chat })
 if (!text)  {  return await citel.reply ("*Goodbye Message Is:* "+Group.goodbye)  }
 await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' }) 
 
      let metadata = await Void.groupMetadata(citel.chat);
      var ppuser;
      let num = citel.sender;
 
       var goodbye_messages = text.replace(/@pp/g, '').replace(/@user/gi, `@${num.split("@")[0]}`).replace(/@gname/gi, metadata.subject).replace(/@desc/gi, metadata.desc);
      try {  ppuser = await Void.profilePictureUrl(num, 'image') }catch { ppuser = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg' ; }
   
 
        let buttonMessage = {
                image: { url: ppuser },
                caption: goodbye_messages,
                //footer: `${Config.botname}`,
                // mentions: [num],
                headerType: 4,
          }
          return await Void.sendMessage(citel.chat, buttonMessage)
  
}
  else return citel.reply("This is Not A Group")
 
 
 
         /*   if (!Group) {
                await new sck({ id: citel.chat, goodbye: text,events:'true' }).save()
                return citel.reply('Goodbye added for this group.\n *New Googbye Message Is :* '+text)
            } else {
                await await sck.updateOne({ id: citel.chat }, { goodbye:text,events:'true' })
                return citel.reply('Goodbye updated successfully.\n *New GoodBye Message Is :* '+text)    
            }      
           */
})
 //---------------------------------------------------------------------------
 cmd({
             pattern: "attp",
             desc: "Makes glowing sticker of text.",
             category: "sticker",
             filename: __filename
         },
         async(Void, citel, text) => {
             Void.sendMessage(citel.chat, {
                 sticker: {
                     url: `https://api.xteam.xyz/attp?file&text=${encodeURI(text)}`
                 }
             }, {
                 quoted: citel
             })
 
         }
     )

     //---------------------------------------------------------------------------
 cmd({
             pattern: "location",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
          if (!text) return citel.reply(`Give Coordinates To Send Location\n *Example:* ${prefix}location 24.121231,55.1121221`);
         let cord1 = parseFloat(text.split(',')[0])
         let cord2 = parseFloat(text.split(',')[1])
var c1 = cord1.toString();
var c2 = cord2.toString();
if(c1=="NaN" || c2 ==  "NaN") return citel.reply("*Cordinates Not In Formate, Try Again*") 


let txt  = "*----------LOCATION------------*"
   txt +=" \n Sending Location to Given Data: ";
   txt +="\n Latitude     :  "+cord1;
   txt +="\n Longitude  :  "+cord2;

citel.reply (txt);


              Void.sendMessage(citel.chat, { location: { degreesLatitude: cord1, degreesLongitude:cord2 } })
 }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "exec",
             desc: "Evaluates quoted code with given language.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
  if (!citel.quoted) return citel.reply("*Reply to A Code Of Statements to Execute*")
             try {
                 const code = {
                     script: citel.quoted.text,
                     language: text[1],
                     versionIndex: "0",
                     stdin: text.slice(2).join(" "),
                     clientId: '694805244d4f825fc02a9d6260a54a99',
                     clientSecret: '741b8b6a57446508285bb5893f106df3e20f1226fa3858a1f2aba813799d4734'
                 };
                 request({
                     url: "https://api.jdoodle.com/v1/execute",
                     method: "POST",
                     json: code
                 }, function(_error, _response, body) {
                     citel.reply("> " + text[1] + "\n\n" + "```" + body.output + "```");
                 });
             } catch (error) {
                 console.log(error);
             }
         }
     )
     //---------------------------------------------------------------------------

 cmd({
             pattern: "getpp",
             desc: "Get Profile Pic For Given User",
             category: "user",
             filename: __filename
         },
         async(Void, citel, text) => {

if (!citel.quoted) return citel.reply (`*Please Reply To A User*`)
const ppUrl = await Void.profilePictureUrl(citel.quoted.sender, 'image')
  
                let buttonMessaged = {

                            //quoted: "923184474176@s.whatsapp.net", 
                            //contextInfo: { forwardingScore: 1999999, isForwarded: false },
                            image: { url: ppUrl },
                            caption: '*---Profile Pic Is Here---*',
                            footer: tlang().footer,
                            headerType: 4,
                   
                };
                return await Void.sendMessage(citel.chat, buttonMessaged);


         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "readmore",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
             await citel.reply(text.replace(/\+/g, (String.fromCharCode(8206)).repeat(4001)))
 
         }
     )
  //---------------------------------------------------------------------------
cmd({
            pattern: "whois",
            desc: "Makes photo of replied sticker.",
            category: "user",
            use: '<reply to any gif>',
            filename: __filename
        },
async(Void, citel, text) => {
            if (!citel.quoted) return citel.reply(`Please Reply To A Person`);
            var bio = await Void.fetchStatus(citel.quoted.sender);
            var bioo = bio.status;
            var setAt = bio.setAt.toString();
            
            var words = setAt.split(" ");
            if(words.length > 3){ setAt= words.slice(0, 5).join(' ') ; }
             
            var num = citel.quoted.sender.split('@')[0];
            let pfp;
            try  {  pfp = await Void.profilePictureUrl(citel.quoted.sender, "image"); } 
            catch (e) { pfp = await Void.profilePictureUrl(citel.sender, "image");  }    //|| 'https://telegra.ph/file/29a8c892a1d18fdb26028.jpg' ;  }
            
            let username = await sck1.findOne({ id: citel.quoted.sender });
            var tname = username.name;

            
           await Void.sendMessage(citel.chat, {
                image: {   url: pfp  },
                caption: `
╔════◇
║ *『Person's  Information』*
║ 
║ *🍫Name :* ${tname}
║ *👤Num :* ${num}
║ *🎐Bio    :*  ${bioo}
║ *🌟SetAt :* ${setAt}
║    *Keep Calm Dude🥳*    ◇
╚════════════════╝
`,
            });

        }
    )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "vcard",
             desc: "Create Contact by given name.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {

if (!citel.quoted) return citel.reply (`*Please Reply to User With Name*`);
if ( !text ) return citel.reply( `Please Give Me User Name, \n *Example : ${prefix}vcard Suhail Tech Info* `)
var words = text.split(" ");
if (words.length >3) {   text= words.slice(0, 3).join(' ')  }
// citel.reply(text);

const vcard = 'BEGIN:VCARD\n' +
            'VERSION:3.0\n' +
            'FN:' + text + '\n' +
            'ORG:;\n' +
            'TEL;type=CELL;type=VOICE;waid=' + citel.quoted.sender.split('@')[0] + ':+' + owner[0] + '\n' +
            'END:VCARD'
        let buttonMessaged = {
            contacts: { displayName: text, contacts: [{ vcard }] },
            
        };
        return await Void.sendMessage(citel.chat, buttonMessaged, { quoted: citel, });
 
})
     //---------------------------------------------------------------------------
 cmd({
             pattern: "calc",
             desc: "Adds *readmore* in given text.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
let func  =  text.split(";")[0];
let num1  =  +text.split(";")[1];
let num2  =  +text.split(";")[2];

var c1 = num1.toString();
var c2 = num2.toString();
if(c1=="NaN" || c2 ==  "NaN") return citel.reply("*Numbers Are Not In Formate, Try Again*") 
if (!text)
{
let txt="*--------------- CALCULATOR ----------------*\n";
 txt +=" \nChoose An Operator From List  ";
 txt +="\nFor Addittion    :  add ";
 txt +="\nFor Subtraction :  sub";
 txt +="\nFor  Multiply     :  mul";
 txt +="\nFor division       :  div";
 txt += `\n\n  Likewise :  ${prefix}calc add;10;50`;   
  return citel.reply(txt)
}
else if (func == "add" )  {  let result = num1+num2;
return citel.reply (`${num1} + ${ num2}  = ${result}` );
}
else if (func == "sub" ) { let result = num1-num2;
return citel.reply (`${num1} - ${ num2}  = ${result}` );
}
else if (func == "mul" ) { let result = num1*num2;
return citel.reply (`${num1} * ${ num2}  = ${result}` );
}
else if (func == "div" ) { let result = num1/num2;
return citel.reply (`${num1} / ${ num2}  = ${result}` );
}
else
 {
return citel.reply(`Give me Query Like :  ${prefix}calc add;10;50 `);
}
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "steal",
             alias:["take"],
             desc: "Makes sticker of replied image/video.",
             category: "sticker",
             filename: __filename
         },
         async(Void, citel, text) => {
             if (!citel.quoted) return citel.reply(`*Mention any Image or video Sir.*`);
             let mime = citel.quoted.mtype
             var pack;
             var author;
             if (text) {
                 anu = text.split("|");
                 pack = anu[0] !== "" ? anu[0] : citel.pushName + '♥️';
                 author = anu[1] !== "" ? anu[1] : Config.packname;
             } else {
                 pack = citel.pushName;
                 author =Config.packname;
             }
                 let media = await citel.quoted.download();
                 //citel.reply("*Processing Your request*");
                let sticker = new Sticker(media, {
                    pack: pack, // The pack name
                    author: author, // The author name
                    type: text.includes("--crop" || '-c') ? StickerTypes.CROPPED : StickerTypes.FULL,
                    categories: ["🤩", "🎉"], // The sticker category
                    id: "12345", // The sticker id
                    quality: 75, // The quality of the output file
                    background: "transparent", // The sticker background color (only for full stickers)
                });
                const buffer = await sticker.toBuffer();
                return Void.sendMessage(citel.chat, {sticker: buffer }, {quoted: citel });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "uptime",
             alias: ["runtime"],
             desc: "Tells runtime/uptime of bot.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
             const upt = runtime(process.uptime())
             citel.reply(`Uptime of ${tlang().title}: ${upt}`)
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "wa",
             desc: "Makes wa me of quoted or mentioned user.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
             if(!citel.quoted && citel.mentionedJid) return await citel.reply(`*Please Reply Or Mention A User*`);
             let users = citel.mentionedJid ? citel.mentionedJid[0].split('@')[0] : citel.quoted ? citel.quoted.sender.split('@')[0] : text.replace('@')[0]
            return await  citel.reply(`https://wa.me/${users}`);
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "mee",
             desc: "Makes wa me for user.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {  let user = citel.sender.split('@')[0]  ; return await citel.reply( `https://wa.me/${user}` ); })
     //---------------------------------------------------------------------------
 cmd({
             pattern: "pick",
             desc: "Pics random user from Group",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, match) => {
             if (!match) return citel.reply("*Which type of User you want?*");
             const groupMetadata = citel.isGroup ? await Void.groupMetadata(citel.chat)
                 .catch((e) => {}) : "";
             const participants = citel.isGroup ? await groupMetadata.participants : "";
             let member = participants.map((u) => u.id);
             let me = citel.sender;
             let pick = member[Math.floor(Math.random() * member.length)];
             Void.sendMessage(citel.chat, {
                 text: `The most ${match} around us is *@${pick.split("@")[0]}*`,
                 mentions: [pick],
             }, {
                 quoted: citel,
             });
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "nsfw",
             desc: "activates and deactivates nsfw.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
            
  
  
             if (checkgroup.nsfw == "true") return citel.reply(`*NSFW* is enabled in this Chat \n For deActive 18+ Commands *type ${prefix}deact nsfw*`);
             else return citel.reply(`*NSFW* is Disabled in this Chat \n For Active 18+ Commands *type ${prefix}act nsfw*`);
 }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "npm",
             desc: "download mp4 from url.",
             category: "search",
             use: '<package name>',
             filename: __filename
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply('Please give me package name.📦')
             axios.get(`https://api.npms.io/v2/search?q=${text}`).then(({ data }) => {
                 let txt = data.results.map(({ package: pkg }) => `*${pkg.name}* (v${pkg.version})\n_${pkg.links.npm}_\n_${pkg.description}_`).join('\n\n')
                 citel.reply(txt)
             }).catch(e => console.log(e))
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "fliptext",
             desc: "Flips given text.",
             category: "misc",
             use: '<query>',
             filename: __filename
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`Example : ${prefix}fliptext Back in black`)
             flipe = text.split('').reverse().join('')
             citel.reply(`\`\`\`「  Text Flipper Tool  」\`\`\`\n*IGiven text :*\n${text}\n*Fliped text :*\n${flipe}`)
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "downmp4",
  
             alias:['mp4down','mp4fromurl'],
             desc: "download mp4 from url.",
             category: "downloader",
             use: '<url>',
             filename: __filename
         },
         async(Void, citel, text) => {
             if (!text) return citel.reply(`_give me Video Link ?_`);
             Void.sendMessage(citel.chat, {
                 video: {
                     url: text.split(" ")[0],
                 },
                 caption: "*HERE WE GO*",
                 contextInfo: {
                     externalAdReply: {
                         title: tlang().title,
                         body: `${citel.pushName}`,
                         thumbnail: log0,
                         mediaType: 2,
                         mediaUrl: ``,
                         sourceUrl: ``,
                     },
                 },
             }, {
                 quoted: citel,
             });
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "events",
             desc: "activates and deactivates events.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text) => {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
  
             if (checkgroup.events == "true") return citel.reply(`*Events* is enabled in this Chat \n For deActive Welcome Msg *type ${prefix}deact events*`);
             else return citel.reply(`*Events* is Disabled in this Chat \n For Active Welcome Msg *type ${prefix}act events*`);

         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "emix",
             desc: "Mixes two emojies.",
             category: "sticker",
             use: '<query>',
             filename: __filename
         },
         async(Void, citel, text,{ isCreator }) => {
             if (!text) return citel.reply(`Example : ${prefix}emix 😅,🤔`);
             let emoji1 = text.split(",")[0] ;
             let emoji2 = text.split(",")[1];
            /* //let [emoji1, emoji2] = text.split `,`;
             let anu = await fetchJson(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${emoji1}_${emoji2}`);
             for (let res of anu.results) {
                 let encmedia = await Void.sendImageAsSticker(citel.chat, res.url, citel, { packname: global.packname, author: global.author });
                    // categories: res.tags,
                 
                 await fs.unlinkSync(encmedia);
             }*/
  
  const response = await fetch(`https://tenor.googleapis.com/v2/featured?key=AIzaSyAyimkuYQYF_FXVALexPuGQctUWRURdCYQ&contentfilter=high&media_filter=png_transparent&component=proactive&collection=emoji_kitchen_v5&q=${emoji1}_${emoji2}`);
  const data = await response.json();
//console.log("Url Here  : " ,data.results[0].url)
let res = data.locale;;
  if(res=="") return citel.reply(`*Can't Create Mixture, Please Try Other Emojies*`)
  else return Void.sendMessage(citel.chat,{image:{url:data.results[0].url}})
   
  
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "chatbot",
             desc: "activates and deactivates chatbot.\nuse buttons to toggle.",
             category: "misc",
             filename: __filename
         },
         async(Void, citel, text,{ isCreator }) => {
             if (!isCreator) return citel.reply(tlang().owner)
             const { chatbot } = require('../lib/');
             switch (text.split(" ")[0]) {
                 case "on":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "true" }).save()
                         return citel.reply('Chatbot activated successfully.')
                     } else {
                         if (chatbott.worktype == "true") return citel.reply("Chatbot was already enabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "true" })
                         citel.reply('Enabled chatbot successfully.')
                         return
                     }      
                     }
                     break
                 case "off":
                     {
                      let chatbott= await chatbot.findOne({ id: 'chatbot' })
                     if (!chatbott) {
                         await new chatbot({ id: 'chatbot', worktype: "false" }).save()
                         return citel.reply('Chatbot deactivated successfully.')
                     } else {
                         if (chatbott.worktype == "false") return citel.reply("Chatbot was already disabled.")
                         await chatbot.updateOne({ id: 'chatbot' }, { worktype: "false" })
                         citel.reply('Disabled chatbot successfully.')
                         return
                     }
                     }
                     break
                 default:
                     {
                         let buttons = [{
                                 buttonId: `${prefix}chatbot on`,
                                 buttonText: {
                                     displayText: "Turn On",
                                 },
                                 type: 1,
                             },
                             {
                                 buttonId: `${prefix}chatbot off`,
                                 buttonText: {
                                     displayText: "Turn Off",
                                 },
                                 type: 1,
                             },
                         ];
                         let chatbott= await chatbot.findOne({ id: 'chatbot' })
                         await Void.sendButtonText(citel.chat, buttons, `Chatbot Status: ${chatbott.worktype} `, 'Secktor-Md', citel);
                     }
             }
 
 
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "ebinary",
             desc: "encode binary",
             category: "misc",
             use: '<query>',
             filename: __filename
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(`Send text to be encoded.`);
 
                 let textt = text || citel.quoted.text
                 let eb = await eBinary(textt);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
     //---------------------------------------------------------------------------
 cmd({
             pattern: "dbinary",
             desc: "decode binary",
             category: "misc",
             use: '<query>',
             filename: __filename
         },
         async(Void, citel, text,{ isCreator }) => {
             try {
                 if (!text) return citel.reply(`Send text to be decoded.`);
                 let eb = await dBinary(text);
                 citel.reply(eb);
             } catch (e) {
                 console.log(e)
             }
         }
     )
cmd({
  pattern: "bot",
  desc: "activates and deactivates bot.\nuse buttons to toggle.",
  category: "misc",
  filename: __filename
},
async(Void, citel, text,{isCreator}) => {
  if (!citel.isGroup) return citel.reply(tlang().group);
  if(!isCreator) return //citel.reply(tlang().owner)
switch (text.split(" ")[0]) {
 case 'on':{
         let checkgroup = await sck.findOne({ id: citel.chat })
         if (!checkgroup) {
             await new sck({ id: citel.chat, botenable: "true" }).save()
             return citel.reply(`Successfully Enabled *${tlang().title}*`)
         } else {
             if (checkgroup.botenable == "true") return citel.reply("*Bot* was already enabled")
             await sck.updateOne({ id: citel.chat }, { botenable: "true" })
             return citel.reply(`Successfully Enabled *${tlang().title}*`)
         }
     }
  
 break
case 'off':{
            {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!checkgroup) {
                 await new sck({ id: citel.chat, botenable: "false" })
                     .save()
                 return citel.reply(`Successfully disabled *${tlang().title}*`)
             } else {
                 if (checkgroup.botenable == "false") return citel.reply("*Bot* was already disabled")
                 await sck.updateOne({ id: citel.chat }, { botenable: "false" })
                 return citel.reply(`Successfully disabled *${tlang().title}*`)
             }
         }
}
break
default:{
let checkgroup = await sck.findOne({ id: citel.chat })
let buttons = [{
          buttonId: `${prefix}bot on`,
          buttonText: {
              displayText: "Turn On",
          },
          type: 1,
      },
      {
          buttonId: `${prefix}bot off`,
          buttonText: {
              displayText: "Turn Off",
          },
          type: 1,
      },
  ];
  await Void.sendButtonText(citel.chat, buttons, `Bot Status in Group: ${checkgroup.botenable}`, Void.user.name, citel);
}
}
})   
         
     //---------------------------------------------------------------------------
 cmd({
             pattern: "antilink",
             desc: "activates and deactivates antilink.\nuse buttons to toggle.",
             category: "group",
             filename: __filename
         },
         async(Void, citel, text) => {
             let checkgroup = await sck.findOne({ id: citel.chat })
             if (!citel.isGroup) return citel.reply(tlang().group);
             const groupAdmins = await getAdmin(Void, citel)
             const botNumber = await Void.decodeJid(Void.user.id)
             const isBotAdmins = citel.isGroup ? groupAdmins.includes(botNumber) : false;
             const isAdmins = citel.isGroup ? groupAdmins.includes(citel.sender) : false;
             if (!isAdmins) return citel.reply(tlang().admin)
             if (!isBotAdmins) return citel.reply(tlang().botadmin)
  
              
             if (checkgroup.antilink == "true") return citel.reply(`Antilink:Deletes Link + kick\n\n*Antilink* is enabled in this Chat \n For Disable Antilink Msg *type ${prefix}deact antilink*`);
             else return citel.reply(`Antilink:Deletes Link + kick\n\n*Antilink* is Disabled in this Chat \n For Enable Antilink Msg *type ${prefix}act antilink*`);

             await Void.sendButtonText(citel.chat, `Activate antilink:Deletes Link + kick`, Void.user.name, citel);
         }
     )
     //---------------------------------------------------------------------------
 cmd({ on: "body" }, async(Void, citel) => {
     if (Config.autoreaction === 'true' && citel.text.startsWith(prefix)) {
         const emojis = ['❤', '💕', '😻', '🧡', '💛', '💚', '💙', '💜', '🖤', '❣', '💞', '💓', '💗', '💖', '💘', '💝', '💟', '♥', '💌', '🙂', '🤗', '😌', '😉', '🤗', '😊', '🎊', '🎉', '🎁', '🎈', '👋']
         const emokis = emojis[Math.floor(Math.random() * (emojis.length))]
         Void.sendMessage(citel.chat, {
             react: {
                 text: emokis,
                 key: citel.key
             }
         })
     }
 })
