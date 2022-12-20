const axios = require("axios")
const cheerio = require("cheerio")
const clean = (data) => {
	let regex = /(<([^>]+)>)/ig
	data = data.replace(/(<br?\s?\/>)/ig, ' \n')
	return data.replace(regex, '')
}

async function tiktok(query){
   return new Promise((resolve, reject) => {
     axios("https://lovetik.com/api/ajax/search", {
       method: "POST",
       data: new URLSearchParams(Object.entries({ query }))
     })
     .then(({ data }) => {
     if (!data.vid) {
        resolve(data)
        return !0
     }
        resolve({
        desc: clean(data.desc),
        uploader: clean(data.author),
        thumbnail: data.cover,
        medias: {
          nowm: {
             size: data.links[0].s || '',
             url: data.links[0].a || ''
                  },
          watermark: {
             size: data.links[1].s || '',
             url: data.links[1].a || ''
                       },
          audio: {
             sound: clean(data.links[2].s || ''),
             url: data.links[2].a || ''
                  }
                 }
        })
      })
   })
}

let handler = async (m, { conn, args, command, q, usedPrefix }) => {
if (!text) m.reply(`Example: ${usedPrefix + command) url`)
m.reply(wait)
try {
tiktok = await tiktok(text)
conn.sendMessage(m.chat, { video: { url: tiktok.medias.nowm.url }, mimetype: 'video/mp4', fileName: `${tiktok.desc}.mp4`, caption: `` }, { quoted: m })
) catch (e) {
m.reply(e)
}
}

handler.command = ['tiktok']

module.exports = handler
