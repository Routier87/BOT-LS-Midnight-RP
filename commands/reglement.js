const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reglement")
        .setDescription("Afficher le règlement officiel du serveur LS Midnight RP"),

    async execute(interaction, client, config) {
        const embeds = [];

        embeds.push(new EmbedBuilder()
            .setTitle(`📜 Règlement Joueurs – ${config.serverName}`)
            .setDescription("Le règlement est obligatoire. Les sanctions vont de l’avertissement au ban définitif. ⚠️ Modifiable à tout moment.")
            .setColor(0xFFA500)
            .setFooter({ text: `BOT ${config.serverName} | GTA RP` })
        );

        embeds.push(new EmbedBuilder()
            .setTitle("📘 HRP & Discord")
            .setDescription("• Respect obligatoire\n• Pas de spam / flood\n• Publicité interdite")
            .setColor(0x1E90FF)
            .setFooter({ text: `BOT ${config.serverName} | GTA RP` })
        );

        embeds.push(new EmbedBuilder()
            .setTitle("📚 Lexique RP")
            .setDescription(
`**Zone Safe** : Zone où crimes et kill intent sont interdits
**Masse RP** : RP de groupe ou de masse
**No Pain** : Ignorer la douleur
**No Fear** : Ne pas avoir peur malgré le danger
**Carkill** : Tuer quelqu’un volontairement avec un véhicule
**Force RP** : Forcer une action alors qu’une autre option existe
**Revenge Kill** : Revenir se venger après sa mort RP
**Freekill** : Tuer sans raison RP
**Mix** : Mélanger RP et HRP
**Power Gaming** : Faire une action irréaliste ou impossible HRP
**Meta-Gaming** : Utiliser des informations HRP en RP`
            )
            .setColor(0x00FF00)
            .setFooter({ text: `BOT ${config.serverName} | GTA RP` })
        );

        embeds.push(new EmbedBuilder()
            .setTitle("🎭 Rôleplay (RP)")
            .setDescription(
`• Propos discriminatoires interdits
• Respect total des joueuses
• Problème en scène : terminer puis ouvrir un ticket
• Crash : reprendre la scène
• Départ IRL : prévenir en RP
• /me obligatoire pour actions et comas

**Exemples :**
\`/me inconscient\`
\`/me serre la main\`
\`/me tente de se relever\``
            )
            .setColor(0x800080)
            .setFooter({ text: `BOT ${config.serverName} | GTA RP` })
        );

        for (const embed of embeds) {
            await interaction.reply({ embeds: [embed], ephemeral: false });
        }
    }
};
