const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("Pauses the current song."),
    async execute(interaction, musicControllers) {
        const musicController = musicControllers[interaction.guildId];

        if (!musicController) {
            await interaction.reply("No music playing.");
            return;
        }

        if (musicController.isPaused) {
            await interaction.reply("The music is already paused.");
            return;
        }

        musicController.pause();
        await interaction.reply("Paused the music.");
    },
};
