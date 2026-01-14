const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const config = require('./config.json');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});

// Collection pour les slash commands
client.slashCommands = new Collection();

// Charger toutes les commandes dans /commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data) client.slashCommands.set(command.data.name, command);
}

// Quand le bot est prêt
client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} est connecté !`);
    client.user.setActivity(`GTA RP | ${config.serverName}`);

    // Synchroniser les slash commands
    await client.application.commands.set(client.slashCommands.map(cmd => cmd.data));
});

// ---------------------------
// ⚡ Ici tu ajoutes ton code interactionCreate
// ---------------------------
client.on('interactionCreate', async interaction => {

    // Gestion des slash commands
    if (interaction.isCommand()) {
        const command = client.slashCommands.get(interaction.commandName);
        if (!command) return;
        try {
            await command.execute(interaction, client, config);
        } catch (err) {
            console.error(err);
            await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
        }
    }

    // ---------------------------
    // ✅ Gestion des boutons tickets automatiques
    // ---------------------------
    if (!interaction.isButton()) return;

    const ticketTypes = {
        "support_fondateur": "1 - Support Fondateur",
        "support_remboursement": "2 - Support / Remboursement",
        "reclamation_staff": "3 - Réclamation / Problème Staff",
        "probleme_rp": "4 - Problème RP (Scène)",
        "creation_legal": "5 - Création / Reprise Legal",
        "creation_illegal": "6 - Création / Reprise Illégal"
    };

    const type = ticketTypes[interaction.customId];
    if (!type) return;

    // Vérifier si l'utilisateur a déjà un ticket de ce type
    const existingChannel = interaction.guild.channels.cache.find(
        c => c.name === `ticket-${interaction.user.username}-${interaction.customId}`
    );
    if (existingChannel)
        return interaction.reply({ content: '❌ Tu as déjà un ticket ouvert pour ce type.', ephemeral: true });

    // Chercher la catégorie par nom
    let category = interaction.guild.channels.cache.find(
        c => c.type === 4 && c.name === type // type 4 = GUILD_CATEGORY
    );

    // Si la catégorie n'existe pas, la créer
    if (!category) {
        category = await interaction.guild.channels.create({
            name: type,
            type: 4 // GUILD_CATEGORY
        });
    }

    // Créer le salon dans la catégorie
    const channel = await interaction.guild.channels.create({
        name: `ticket-${interaction.user.username}-${interaction.customId}`,
        type: 0, // text channel
        parent: category.id,
        permissionOverwrites: [
            { id: interaction.guild.id, deny: ['ViewChannel'] },
            { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] },
            { id: config.staffRoleId, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory'] }
        ]
    });

    // Envoyer l'embed d’accueil
    await channel.send({
        content: `${interaction.user} a créé un ticket de type **${type}**.`,
        embeds: [{
            title: `🎫 Ticket: ${type}`,
            description: `Bonjour ${interaction.user}, un membre du staff va bientôt te répondre.\nPour fermer le ticket, utilisez \`/close-ticket\`.`,
            color: 0x2b2d31
        }]
    });

    await interaction.reply({ content: `✅ Ton ticket a été créé automatiquement : ${channel}`, ephemeral: true });
});

// ---------------------------
// Fin du fichier
// ---------------------------
client.login(config.token);
