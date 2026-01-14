const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'reglement',
    description: 'Afficher le règlement officiel du serveur FarmOtor\'s RP',
    async execute(message, args, client) {

        const embeds = [];

        embeds.push(new EmbedBuilder()
            .setTitle('📜 Règlement Joueurs – FarmOtor\'s RP')
            .setDescription('Le règlement est obligatoire. Sanctions : avertissement → ban définitif.')
            .setColor(0xFFA500)
            .setFooter({ text: 'BOT FarmOtor\'s RP | GTA RP USA' })
        );

        embeds.push(new EmbedBuilder()
            .setTitle('📘 HRP & Discord')
            .setDescription('• Respect obligatoire\n• Pas de spam / flood\n• Publicité interdite')
            .setColor(0x1E90FF)
            .setFooter({ text: 'BOT FarmOtor\'s RP | GTA RP USA' })
        );

        // Tu peux ajouter les autres embeds comme dans Python

        for (const embed of embeds) {
            await message.channel.send({ embeds: [embed] });
        }
    }
}
