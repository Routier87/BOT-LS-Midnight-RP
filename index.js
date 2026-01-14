const fs = require('fs');
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const config = require('./config.json');

const client = new Client({ 
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] 
});

// Collection pour slash commands
client.slashCommands = new Collection();

// Charger toutes les commandes dans /commands
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    if (command.data) client.slashCommands.set(command.data.name, command);
}

client.once('ready', async () => {
    console.log(`✅ ${client.user.tag} est connecté !`);
    client.user.setActivity(`GTA RP | ${config.serverName}`);

    // Synchroniser toutes les slash commands
    await client.application.commands.set(client.slashCommands.map(cmd => cmd.data));
});

// Gérer les interactions
client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;
    const command = client.slashCommands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client, config);
    } catch (err) {
        console.error(err);
        await interaction.reply({ content: '❌ Une erreur est survenue.', ephemeral: true });
    }
});

client.login(config.token);
