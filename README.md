# OpenRythm

OpenRythm is a simple, customizable Discord music bot designed with ease of use and extensibility in mind. Built using Discord.js, it offers basic music playback features and serves as a solid foundation for further development and customization according to individual needs.

## Features

-   Play music from YouTube via URL or search query
-   Queue management with play, skip, stop, pause, and resume functionality
-   Looping current track
-   Easy to understand and extend

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js
-   A Discord account and a Discord server where you have administrative permissions

### Installation

1. Clone the repository:

```bash
git clone https://github.com/VenkatLohithDasari/OpenRythm.git
cd OpenRythm
```

2. Install the required packages:

```bash
npm install
```

3. Create a `.env` file in the root directory of the project and add your Discord bot token, client ID, and guild ID:

```plaintext
DISCORD_TOKEN=your_discord_bot_token_here
CLIENT_ID=your_client_id_here
GUILD_ID=your_guild_id_here
```

### Running the Bot

1. Register the bot commands with Discord:

```bash
node deploy-commands.js
```

2. Start the bot:

```bash
node bot.js
```

Your bot should now be running and ready to join your server!

## Contributing

We welcome contributions from everyone! If you have an idea for a new feature, feel free to open an issue or submit a pull request. Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests to us.

## Feature Requests

Got an idea for a feature that would make OpenRythm even better? Open an issue with the tag "feature request". We love hearing from our users and strive to make OpenRythm as versatile and user-friendly as possible.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

-   Thanks to the Discord.js team for their fantastic library
-   Everyone who has contributed to making OpenRythm better!
