const { SlashCommandBuilder } = require("discord.js");
const MusicController = require("../music-controller");
const youtubeSr = require("youtube-sr").default;
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song from YouTube.")
        .addStringOption((option) =>
            option
                .setName("input")
                .setDescription("The URL or search query of the YouTube video")
                .setRequired(true)
        ),
    async execute(interaction, musicControllers) {
        const input = interaction.options.getString("input");
        let url = input;

        if (!musicControllers[interaction.guildId]) {
            musicControllers[interaction.guildId] = new MusicController();
        }

        const musicController = musicControllers[interaction.guildId];

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply(
                "You need to be in a voice channel to play music!"
            );
            return;
        }

        musicController.joinChannel(channel);

        if (!ytdl.validateURL(url)) {
            const searchResults = await youtubeSr.search(input, { limit: 1 });
            if (searchResults.length === 0) {
                await interaction.reply("No results found.");
                return;
            }
            url = searchResults[0].url;
        }

        musicController.enqueue(url);

        await interaction.reply(`Enqueued: ${url}`);
    },
};
