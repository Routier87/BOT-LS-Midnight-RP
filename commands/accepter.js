const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("accepter")
        .setDescription("Accepter le règlement et recevoir le rôle Citoyen RP"),

    async execute(interaction, client, config) {
        const role = interaction.guild.roles.cache.get(config.roleCitoyen);
        if (!role) return interaction.reply({ content: '❌ Rôle introuvable !', ephemeral: true });

        if (interaction.member.roles.cache.has(role.id))
            return interaction.reply({ content: '✅ Tu as déjà accepté le règlement.', ephemeral: true });

        await interaction.member.roles.add(role, 'Règlement accepté');
        await interaction.reply({ content: `🎉 ${interaction.user}, tu as accepté le règlement ! Bon RP 🚓🚑`, ephemeral: false });
    }
};
