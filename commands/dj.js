const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");
module.exports = {
  name: "dj",
  description: "DJ rolünü ayarlamanıza veya sıfırlamanıza izin verir.",
  permissions: "0x0000000000000020",
  options: [{
    name: "set",
    description: "Bir DJ rolü seçmenizi sağlar.",
    type: ApplicationCommandOptionType.Subcommand,
    options: [
      {
        name: 'role',
        description: 'Bir DJ rolünden bahsedin.',
        type: ApplicationCommandOptionType.Role,
        required: true
      }
    ]
  },
  {
    name: "reset",
    description: "DJ rolünü kapatmanızı sağlar.",
    type: ApplicationCommandOptionType.Subcommand,
    options: []
  }
  ],
  run: async (client, interaction) => {
    let lang = await db?.musicbot?.findOne({ guildID: interaction.guild.id })
    lang = lang?.language || client.language
    lang = require(`../languages/${lang}.js`);
    try {

      let stp = interaction.options.getSubcommand()
      if (stp === "set") {
        const role = interaction.options.getRole('role')
        if (!role) return interaction.reply(lang.msg26).catch(e => { });

        await db.musicbot.updateOne({ guildID: interaction.guild.id }, {
          $set: {
            role: role.id
          }
        }, { upsert: true }).catch(e => { });
        return await interaction.reply({ content: lang.msg25.replace("{role}", role.id), ephemeral: true }).catch(e => { });

      }
      if (stp === "reset") {
        const data = await db.musicbot.findOne({ guildID: interaction.guild.id }).catch(e => { });

        if (data?.role) {
          await db.musicbot.updateOne({ guildID: interaction.guild.id }, {
            $set: {
              role: ""
            }
          }, { upsert: true }).catch(e => { })
          return await interaction.reply({ content: lang.msg27, ephemeral: true }).catch(e => { });
        } else {
          return await interaction.reply({ content: lang.msg28, ephemeral: true }).catch(e => { });
        }
      }

    } catch (e) {
      const errorNotifer = require("../functions.js")
     errorNotifer(client, interaction, e, lang)
      }
  },
};
