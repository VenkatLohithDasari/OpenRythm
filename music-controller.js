const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource,
    AudioPlayerStatus,
} = require("@discordjs/voice");
const ytdl = require("ytdl-core");

class MusicController {
    constructor() {
        this.queue = [];
        this.isPlaying = false;
        this.currentTrack = null;
        this.voiceConnection = null;
        this.audioPlayer = createAudioPlayer();
        this.setupListeners();
    }

    setupListeners() {
        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            this.next();
        });
    }

    joinChannel(channel) {
        if (!channel) return;

        this.voiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        this.voiceConnection.subscribe(this.audioPlayer);
    }

    play(url) {
        if (!url) return;

        const stream = ytdl(url, {
            quality: "lowestaudio",
            filter: (form) => {
                if (form.bitrate && channel.bitrate)
                    return form.bitrate <= channel.bitrate;
                return false;
            },
        }).on("error", console.error);
        const resource = createAudioResource(stream);
        this.audioPlayer.play(resource);
        this.isPlaying = true;
    }

    next() {
        if (this.queue.length === 0) {
            this.stop();
            return;
        }
        const nextTrack = this.queue.shift();
        this.play(nextTrack);
    }

    enqueue(track) {
        this.queue.push(track);
        if (!this.isPlaying) {
            this.next();
        }
    }

    pause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.isPlaying = false;
        }
    }

    resume() {
        if (!this.isPlaying) {
            this.audioPlayer.unpause();
            this.isPlaying = true;
        }
    }

    skip() {
        this.audioPlayer.stop();
    }

    stop() {
        this.queue.length = 0;
        this.audioPlayer.stop();
        this.isPlaying = false;
        this.currentTrack = null;
        this.voiceConnection.destroy();
        this.voiceConnection = null;
    }
}

module.exports = MusicController;
