const { ApplicationCommandOptionType } = require('discord.js')
const db = require("../mongoDB");
module.exports = {
  name: "yardim",
  description: "Bot ve komutlar hakkında bilgi almanıza yardımcı olur.",
  permissions: "0x0000000000000800",
  options: [
    {
      name: "komut",
      description: "Hakkında bilgi almak istediğiniz komut.",
      type: ApplicationCommandOptionType.String,
      required: false
    }
  ],
  showHelp: false,
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);
    try {
      const { EmbedBuilder } = require('discord.js');
      const info = interaction.options.getString('komut');
      if (info) {
        const cmd_filter = client.commands.filter(x => x.name === info);
        if (!cmd_filter.length > 0) return interaction.reply({ content: lang.msg127, ephemeral: true }).catch(e => { })

        const cmd = cmd_filter[0]
        const embed = new EmbedBuilder()
          .setTitle(`Komut Bilgisi: ${cmd.name}`)
          .setDescription(`> **Açıklama: \`${cmd.description}\`**\n> **Seçenekler:**\n${cmd?.options?.map(x => `> **\`${x.name}\` - \`${x.description}\`**`).join("\n")}`)
          .setColor(client.config.embedColor)
          .setTimestamp()
        return interaction.reply({ embeds: [embed] }).catch(e => { })

      } else {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
          .setColor(client.config.embedColor)
          .setTitle("/yardım info <command>")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription(lang.msg32)
          .addFields([
            { name: `${lang.msg33}`, value: commands.map(x => `\`/${x.name}\``).join(' | ') }
          ])
          .setTimestamp()
          .setFooter({ text: `Delight ❤️` })
        interaction.reply({ embeds: [embed] }).catch(e => { })
      }

    } catch (e) {
      const errorNotifer = require("../functions.js")
     errorNotifer(client, interaction, e, lang)
      }
  },
};
