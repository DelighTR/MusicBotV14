function errorNotifer(client, interaction, e, lang) {
const { EmbedBuilder } = require("discord.js")
if(client.errorLog){

    if(client.shard){
        let embed = new EmbedBuilder()
        .setColor(client.config.embedColor)
        .setTimestamp()
        .addFields([
            { name: "Komut", value: `${interaction?.commandName}` },
            { name: "Hata", value: `${e.stack}` },
            { name: "Kullanıcı", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
            { name: "Sunucu", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\` - \`${interaction?.guild?.memberCount} üye\``, inline: true },
            { name: "Zaman", value: `<t:${Math.floor(Date.now()/1000)}:R>`, inline: true },
            { name: "Komutun Kullanıldığı Kanal", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
            { name: "Kullanıcı Ses Kanalı", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
        ])
     client.shard.broadcastEval(async (c, { channelId, embed}) => {
           let channel = c.channels.cache.get(channelId);
           channel?.send({ embeds: [embed] }).catch(e => { })
      }, { context: { channelId: client?.errorLog, embed: embed } })

    } else {
        let embed = new EmbedBuilder()
.setColor(client.config.embedColor)
.setTimestamp()
.addFields([
    { name: "Komut", value: `${interaction?.commandName}` },
    { name: "Hata", value: `${e.stack}` },
    { name: "Kullanıcı", value: `${interaction?.user?.tag} \`(${interaction?.user?.id})\``, inline: true },
    { name: "Sunucu", value: `${interaction?.guild?.name} \`(${interaction?.guild?.id})\``, inline: true },
    { name: "Zaman", value: `<t:${Math.floor(Date.now()/1000)}:R>`, inline: true },
    { name: "Komut Kullanım Kanalı", value: `${interaction?.channel?.name} \`(${interaction?.channel?.id})\``, inline: true },
    { name: "Kullanıcı Ses Kanalı", value: `${interaction?.member?.voice?.channel?.name} \`(${interaction?.member?.voice?.channel?.id})\``, inline: true },
])
client.channels.cache.get(client?.errorLog)?.send({ embeds: [embed] }).catch(e => { })
    }

    } else {
    console.log(`
    Komut: ${interaction?.commandName}
    Hata: ${e}
    Kullanıcı: ${interaction?.user?.tag} (${interaction?.user?.id})
    Sunucu: ${interaction?.guild?.name} (${interaction?.guild?.id})
    Komutun Kullanıldığı Kanal ${interaction?.channel?.name} (${interaction?.channel?.id})
    Kullanıcı Ses Kanalı: ${interaction?.member?.voice?.channel?.name} (${interaction?.member?.voice?.channel?.id})
    `)
    }
    return interaction.reply({ content: `${lang.error7}\n\`${e}\``, ephemeral: true }).catch(e => { })

}

module.exports = errorNotifer;
