require("dotenv").config();
const { REST, Routes } = require("discord.js");
const fs = require("fs");

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  commands.push(cmd.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('🔹 Enregistrement des commandes (GUILD)...');

    // Vérification des variables d'environnement
    if (!process.env.CLIENT_ID || !process.env.GUILD_ID) {
      throw new Error('❌ CLIENT_ID ou GUILD_ID non défini dans le fichier .env');
    }

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log('✅ Commandes enregistrées.');
  } catch (err) {
    console.error(err);
  }
})();
