const axios = require("axios")
const cheerio = require("cheerio")
const clean = (data) => {
	let regex = /(<([^>]+)>)/ig
	data = data.replace(/(<br?\s?\/>)/ig, ' \n')
	return data.replace(regex, '')
}

async function tiktok(query) {
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

let handler = async(m, {conn, command, usedPrefix, text}) => {
if(!text) throw `mana link nya blok`
m.reply(wait)
url = await tiktok(text)
conn.sendFile(m.chat, url.medias.nowm.url, null, ``, m)
}

handler.command = /^(tiktok)$/i
handler.exp = 3

module.exports = handler
