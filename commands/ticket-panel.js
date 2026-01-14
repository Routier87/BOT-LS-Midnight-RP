const { 
    SlashCommandBuilder, 
    EmbedBuilder, 
    ActionRowBuilder, 
    ButtonBuilder, 
    ButtonStyle 
} = require('discord.js');
const path = require('path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ticket-panel")
        .setDescription("Affiche le panel de création de tickets"),

    async execute(interaction) {
        // ⚡ Déférer la réponse pour éviter InteractionAlreadyReplied
        await interaction.deferReply({ ephemeral: false });

        // Embed principal avec bannière
        const embed = new EmbedBuilder()
            .setTitle("🎫 Panel des Tickets")
            .setDescription(
`**1 - Support Fondateur :** Contact direct fondateur / haute direction.
**2 - Support / Remboursement :** Si vous avez perdu un objet / argent et que vous avez des preuves.
**3 - Réclamation / Problème Staff :** Pour signaler un comportement staff incorrect.
**4 - Problème RP (Scène) :** Pour toute scène HRP ou problème en RP.
**5 - Création / Reprise Legal :** Pour créer ou reprendre une entreprise légale.
**6 - Création / Reprise Illégal :** Pour devenir un acteur du milieu illégal.`)
            .setColor("#2b2d31")
            .setImage('attachment://banniere.png'); // Image en bannière

        // Boutons ligne 1
        const row1 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("support_fondateur")
                .setLabel("1 • Support Fondateur")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("support_remboursement")
                .setLabel("2 • Support / Remboursement")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("reclamation_staff")
                .setLabel("3 • Réclamation Staff")
                .setStyle(ButtonStyle.Primary)
        );

        // Boutons ligne 2
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId("probleme_rp")
                .setLabel("4 • Problème RP (Scène)")
                .setStyle(ButtonStyle.Success),
            new ButtonBuilder()
                .setCustomId("creation_legal")
                .setLabel("5 • Création/Reprise Légal")
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId("creation_illegal")
                .setLabel("6 • Création/Reprise Illégal")
                .setStyle(ButtonStyle.Primary)
        );

        // Chemin absolu vers la bannière
        const bannerPath = path.join(__dirname, '..', 'banniere.png');

        // Envoi du panel (embed + boutons + bannière)
        await interaction.editReply({
            embeds: [embed],
            components: [row1, row2],
            files: [bannerPath]
        });
    }
};
