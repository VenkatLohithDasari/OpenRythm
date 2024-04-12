const { SlashCommandBuilder } = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");
const youtubeSr = require("youtube-sr").default;

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
    async execute(interaction) {
        const input = interaction.options.getString("input");
        let url = input;

        if (!ytdl.validateURL(url)) {
            const searchResults = await youtubeSr.search(input, { limit: 1 });
            if (searchResults.length === 0) {
                await interaction.reply("No results found.");
                return;
            }
            url = searchResults[0].url;
        }

        const channel = interaction.member.voice.channel;
        if (!channel) {
            await interaction.reply(
                "You need to be in a voice channel to play music!"
            );
            return;
        }

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: interaction.guildId,
            adapterCreator: interaction.guild.voiceAdapterCreator,
        });

        const stream = ytdl(url, {
            quality: "highestaudio",
            filter: (form) => {
                if (form.bitrate && channel.bitrate)
                    return form.bitrate <= channel.bitrate;
                return false;
            },
        }).on("error", console.error);

        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        await interaction.reply(`Now playing: ${url}`);
    },
};
