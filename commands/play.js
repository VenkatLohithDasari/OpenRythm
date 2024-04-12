const { SlashCommandBuilder } = require("discord.js");
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    getVoiceConnection,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("play")
        .setDescription("Plays a song from YouTube.")
        .addStringOption((option) =>
            option
                .setName("url")
                .setDescription("The URL of the YouTube video")
                .setRequired(true)
        ),
    async execute(interaction) {
        const url = interaction.options.getString("url");

        if (!ytdl.validateURL(url)) {
            await interaction.reply("Please provide a valid YouTube URL.");
            return;
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

        const stream = ytdl(url, { filter: "audioonly" }).on(
            "error",
            console.error
        );
        const resource = createAudioResource(stream);
        const player = createAudioPlayer();

        player.play(resource);
        connection.subscribe(player);

        await interaction.reply(`Now playing: ${url}`);
    },
};
