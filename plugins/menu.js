let handler = async(m,{text, conn, usedPrefix, command, args, isCmd}) => {
let cute = `${pickRandom(['https://telegra.ph/file/520a7d8d531f976ed23b5.jpg', 'https://telegra.ph/file/862e5a42d3435e12b2ec2.jpg', 'https://telegra.ph/file/aebb49a158df5a6da47d6.jpg', 'https://telegra.ph/file/8d0f6476b51d76eaf8cea.jpg','https://telegra.ph/file/cc86d58dd6c6ec6828ce0.jpg','https://telegra.ph/file/309fe309cf1a8f0b9a463.jpg', 'https://telegra.ph/file/10377f92ab3043979485b.jpg', 'https://telegra.ph/file/b4a60b95b203cfb6678f3.jpg', 'https://telegra.ph/file/81ac8ecd55d4a6deb8463.jpg'])}` 
 	let ori = `Hi Kak, @${m.sender.split`@`[0]}
 
Saya Adalah Zero-Bot Salah Satu Bot Whatsapp Yang Siap Membantu Kamu Mempermudah Sesuatu Seperti Membuat Sticker Dan Lainnya, Kalo Kamu Mau Request Fitur Silahkan Ketik #request Pesan Atau Fitur Yang Kamu Inginkan!`
/*conn.sendMessage(m.chat, {
    	react: {
    		text: emot,
    		key: m.key
    	}
    })*/
conn.send3ButtonLoc(m.chat, await conn.resize(pickRandom(global.waifu), 300, 300), ori, `By Wandygans`, 'COMMAND', '.simplemenu', 'PING', '.ping', 'OWNER', '.owner', m)
}

handler.command = ['menu', 'help']
handler.register = true
handler.exp = 10

module.exports = handler
