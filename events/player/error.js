module.exports = async (client, textChannel, e) => {
if (textChannel){
   return textChannel?.send(`**Hata Bulundu:** ${e.toString().slice(0, 1974)}`)
}
}
