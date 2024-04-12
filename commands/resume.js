const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("resume")
        .setDescription("Resumes the current song"),
    async execute(interaction, musicControllers) {
        const musicController = musicControllers[interaction.guildId];

        if (!musicController) {
            await interaction.reply("No music is currently playing");
            return;
        }

        if (!musicController.isPaused) {
            await interaction.reply("The music is already playing");
            return;
        }

        musicController.resume();
        await interaction.reply("Resumed the music.");
    },
};
