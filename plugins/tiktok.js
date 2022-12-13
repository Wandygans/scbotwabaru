const axios = require('axios')
const cheerio = require('cheerio')

let handler = async(m, {conn, command, usedPrefix, text}) => {
if (!text) throw `Example: ${usedPrefix + command} link tiktok`
m.reply(wait)

async function tiktok(url){
    try {
        const tokenn = await axios.get("https://downvideo.quora-wiki.com/tiktok-video-downloader#url=" + url);
        let a = cheerio.load(tokenn.data);
        let token = a("#token").attr("value");
        const param = {
            url: url,
            token: token,
        };
        const { data } = await axios.request("https://downvideo.quora-wiki.com/system/action.php", {
                method: "post",
                data: new URLSearchParams(Object.entries(param)),
                headers: {
                    "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36",
                    "referer": "https://downvideo.quora-wiki.com/tiktok-video-downloader",
                },
            }
        );
        return {
            status: 200,
            author: "WandyGans",
            title: data.title,
            thumbnail: "https:" + data.thumbnail,
            duration: data.duration,
            media: data.medias,
        };
    } catch (e) {
        return e
    }
}

result = await tiktok(text)
result = result.media[1].url;
conn.sendMessage(m.chat, { video: result, caption: "", quoted: m})
}

handler.command = ['tiktok']
handler.exp = 3

module.exports = handler
