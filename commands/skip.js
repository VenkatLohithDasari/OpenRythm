const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("skip")
        .setDescription("Skips the current song"),
    async execute(interaction, musicControllers) {
        const musicController = musicControllers[interaction.guildId];

        if (!musicController) {
            await interaction.reply("There is no music playing");
            return;
        }

        if (musicController.queue.length === 0) {
            await interaction.reply(
                "There is no more songs in the queue to skip."
            );
            return;
        }

        musicController.skip();

        await interaction.reply("Skipped the current song.");
    },
};
