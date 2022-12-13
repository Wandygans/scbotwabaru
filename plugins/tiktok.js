const axios = require("axios");
const cheerio = require("cheerio");
const clean = (data) => {
	let regex = /(<([^>]+)>)/ig
	data = data.replace(/(<br?\s?\/>)/ig, ' \n')
	return data.replace(regex, '')
}

global.ftroli = { key: { remoteJid: 'status@broadcast', participant: '0@s.whatsapp.net' }, message: { orderMessage: { itemCount: 9999999999999999999999999999999999999999999999999999999, status: 1, surface: 1, message: wm, orderTitle: wm, sellerJid: '0@s.whatsapp.net' } } }

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

let handler = async(m,{text, conn}) => {
m.reply(global.wait)
url = await tiktok(text)
conn.sendFile(m.chat, url.medias.nowm.url, null, ``, global.ftroli)
}

handler.command = ['tiktok']

handler.exp = 10

module.exports = handler
