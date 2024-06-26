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
        this.isPaused = false;
        this.currentTrack = null;
        this.voiceConnection = null;
        this.audioPlayer = createAudioPlayer();
        this.channel = null;
        this.isLooping = false;
        this.setupListeners();
    }

    setupListeners() {
        this.audioPlayer.on(AudioPlayerStatus.Idle, () => {
            this.next();
        });
    }

    joinChannel(channel) {
        if (!channel) return;

        this.channel = channel;

        this.voiceConnection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        this.voiceConnection.subscribe(this.audioPlayer);
    }

    play(url) {
        if (!url) return;

        this.currentTrack = url;

        const stream = ytdl(url, {
            quality: "lowestaudio",
            filter: (form) => {
                if (form.bitrate && this.channel.bitrate)
                    return form.bitrate <= this.channel.bitrate;
                return false;
            },
        }).on("error", console.error);
        const resource = createAudioResource(stream);
        this.audioPlayer.play(resource);
        this.isPlaying = true;
    }

    next() {
        if (this.isLooping && this.currentTrack) {
            this.play(this.currentTrack);
        } else if (this.queue.length > 0) {
            const nextTrack = this.queue.shift();
            this.play(nextTrack);
        } else {
            this.stop();
        }
    }

    enqueue(track) {
        this.queue.push(track);
        if (!this.isPlaying && !this.isPaused) {
            this.next();
        }
    }

    pause() {
        if (this.isPlaying) {
            this.audioPlayer.pause();
            this.isPaused = true;
            this.isPlaying = false;
        }
    }

    resume() {
        if (!this.isPlaying) {
            this.audioPlayer.unpause();
            this.isPaused = false;
            this.isPlaying = true;
        }
    }

    skip() {
        this.audioPlayer.stop();
    }

    toggleLoop() {
        this.isLooping = !this.isLooping;
        return this.isLooping;
    }

    stop() {
        this.queue.length = 0;
        this.audioPlayer.stop();
        this.isPlaying = false;
        this.isPaused = false;
        this.currentTrack = null;
        this.voiceConnection.destroy();
        this.voiceConnection = null;
        this.audioPlayer = createAudioPlayer();
        this.channel = null;
        this.isLooping = false;
    }
}

module.exports = MusicController;
