const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("loop")
        .setDescription("Toggles the loop feature for the current song."),
    async execute(interaction, musicControllers) {
        const musicController = musicControllers[interaction.guildId];

        if (!musicController) {
            await interaction.reply("There is no music playing in this guild.");
            return;
        }

        const loopState = musicController.toggleLoop();
        await interaction.reply(
            `Looping is now ${loopState ? "enabled" : "disabled"}.`
        );
    },
};
