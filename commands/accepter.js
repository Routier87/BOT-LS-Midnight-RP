module.exports = {
    name: 'accepter',
    description: 'Accepter le règlement et recevoir le rôle Citoyen RP',
    async execute(message, args, client) {
        const role = message.guild.roles.cache.get(require('../config.json').roleCitoyen);
        if (!role) return message.channel.send('❌ Rôle introuvable !');

        if (message.member.roles.cache.has(role.id)) {
            return message.channel.send('✅ Tu as déjà accepté le règlement.');
        }

        await message.member.roles.add(role, 'Règlement accepté');
        await message.channel.send(`🎉 ${message.member}, tu as accepté le règlement ! Bon RP 🚓🚑`);
        try { await message.delete(); } catch {}
    }
}
