async function handler(m) {
let vcard = 'BEGIN:VCARD\n'
+ 'VERSION:3.0\n' 
+ 'N:;Wandy;;;'
+ 'FN:ZEROSTORE\n'
+ 'ORG:OwnerBot;\n'
+ 'TEL;type=CELL;type=VOICE;waid=6282125039170:+62 821-2503-9170\n' // WhatsApp ID + phone number
+ 'END:VCARD'
conn.sendMessage(m.chat, { contacts: { displayName: 'Wandy Gunawan', contacts: [{ vcard }] } }, { quoted: m })
}

handler.command = /^owner/i 

module.exports = handler
