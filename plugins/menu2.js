let levelling = require('../lib/levelling') 
 let fs = require('fs') 
 let path = require('path') 
 let fetch = require('node-fetch') 
 let moment = require('moment-timezone') 
 let jimp = require('jimp') 
 const Jimp = require('jimp')
 let PhoneNumber = require('awesome-phonenumber') 

let handler = async(m, {conn, command, usedPrefix, text}) => {
	
	conn.resize = async(buffer, ukur1, ukur2) => {
    return new Promise(async(resolve, reject) => {
        var baper = await Jimp.read(buffer);
        var ab = await baper.resize(ukur1, ukur2).getBufferAsync(Jimp.MIME_JPEG)
        resolve(ab)
    })
}

  let wib = moment.tz('Asia/Jakarta').format('HH:mm:ss') 
     let wibh = moment.tz('Asia/Jakarta').format('HH') 
     let wibm = moment.tz('Asia/Jakarta').format('mm') 
     let wibs = moment.tz('Asia/Jakarta').format('ss') 
	 
     let witj = moment.tz('Asia/Jayapura').format('HH') 
	 let witm = moment.tz('Asia/Jayapura').format('mm') 
	 let wits = moment.tz('Asia/Jayapura').format('ss') 
	 
     let witaj = moment.tz('Asia/Makassar').format('HH') 
	 let witam = moment.tz('Asia/Makassar').format('mm') 
	 let witas = moment.tz('Asia/Makassar').format('ss') 
	 
let d = new Date(new Date + 3600000)
    let locale = 'id'
let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let { exp, limit, age, money, level, role, registered } = global.db.data.users[m.sender]
    let { min, xp, max } = levelling.xpRange(level, global.multiplier)
    let umur = `*${age == '-1' ? 'Belum Daftar*' : age + '* Thn'}`
    let { premium, premiumTime } = global.db.data.users[m.sender]
    let name = registered ? global.db.data.users[m.sender].name : conn.getName(m.sender)
    let totalreg = Object.keys(global.db.data.users).length
	let wibfont = "𝐖𝐈𝐁"
	let witfont = "𝐖𝐈𝐓"
	let witafont = "𝐖𝐈𝐓𝐀"
	
	
	
menu = `*Halo, @${m.sender.split`@`[0]} 👋*
●────━───༺༻───━────●
 *《 USER INFO 》*
 
◦ *Nama: ${name}*
◦ *Status :* ${premium ? 'Premium' : 'Free'} User
◦ *Limit: ${limit}*
◦ *Your Api:* wa.me/${m.sender.split('@')[0]}

 *《 YOUR PROGRESS 》*
 
◦ *Level: ${level}*
◦ *XP: ${exp}*
◦ *Rank: ${role}*

●────━───༺༻───━────●
*《 INFO JAM 》*

✧ *${wibfont}*
_${wibh} Jam ${wibm} Menit ${wibs} Detik_

✧ *${witfont}*
_${witj} Jam ${witm} Menit ${wits} Detik_

✧ *${witafont}*
_${witaj} Jam ${witam} Menit ${witas} Detik_

●────━───༺༻───━────●
*《 TANGGAL 》*

Tanggal: 
*${week} ${weton}, ${date}*

Islamic date:
*${dateIslamic}*

●────━───༺༻───━────●

*《 BOT STATUS 》*

❏ *Runtime*: ${uptime}, *(${uptime})*
❏ *User Register*: ${totalreg}
❏ *Prefix*: [ MULTI PREFIX ]
❏ *Name Bot*: ZeroBot
❏ *Owner*: WandyGans

●────━───༺༻───━────●
*《 LIST MENU 》*
`
let buttons = [
{buttonId: `.ping`, buttonText: {displayText: 'PING'}, type: 1}
]
let buttonMessage = {
image: await conn.resize(await genProfile(conn, m), 300, 180),
caption: menu,
footer: wm,
buttons: buttons,
headerType: 4
}
conn.sendMessage(m.chat, buttonMessage, { quoted: m })
}

handler.command = ['allmenu']

module.exports = handler

async function genProfile(conn, m) { 
   let font = await jimp.loadFont('./name.fnt'), 
     mask = await jimp.read('https://i.imgur.com/552kzaW.png'), 
     welcome = await jimp.read(thumbnailUrl.getRandom()), 
     avatar = await jimp.read(await conn.profilePictureUrl(m.sender, 'image').catch(() => 'https://telegra.ph/file/24fa902ead26340f3df2c.png')), 
     status = (await conn.fetchStatus(m.sender).catch(console.log) || {}).status?.slice(0, 30) || 'Not Detected' 
  
     await avatar.resize(460, 460) 
     await mask.resize(460, 460) 
     await avatar.mask(mask) 
     await welcome.resize(welcome.getWidth(), welcome.getHeight()) 

     await welcome.print(font, 550, 180, 'Name:') 
     await welcome.print(font, 650, 255, m.pushName.slice(0, 25)) 
     await welcome.print(font, 550, 340, 'About:') 
     await welcome.print(font, 650, 415, status) 
     await welcome.print(font, 550, 500, 'Number:') 
     await welcome.print(font, 650, 575, PhoneNumber('+' + m.sender.split('@')[0]).getNumber('international')) 
     return await welcome.composite(avatar, 50, 170).getBufferAsync('image/png') 
 }

function clockString(ms) { 
   let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) 
   let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60 
   let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60 
   return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':') 
 }