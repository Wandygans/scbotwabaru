const { createHash } = require('crypto')

let handler = async function (m, { args }) {
  if (!args[0]) throw 'Serial Number kosong'
  let user = global.db.data.users[m.sender]
  let sn = createHash('md5').update(m.sender).digest('hex')
  if (args[0] !== sn) throw 'Serial Number salah'
  user.registered = false
  m.reply('```Succes Unreg !```')
}

handler.command = /^unreg(ister)?$/i
handler.register = true

module.exports = handler
