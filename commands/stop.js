const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("stop")
        .setDescription("Stops the music and disconnects"),
    async execute(interaction, musicControllers) {
        const musicController = musicControllers[interaction.guildId];

        if (!musicController) {
            await interaction.reply("There is no music playing");
            return;
        }

        musicController.stop();
        await interaction.reply("Stopped the music & Disconnected!");
    },
};
