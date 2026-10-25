The Hollow Below Windows alpha 0.22.57.

- Voice Chat is now a visible tab in Controls & Settings, available from the main menu and solo pause settings before joining a lobby. Sound Mix also has an Open Voice Chat shortcut.
- Shared voice controls offer microphone selection, Off / push-to-talk / open-mic modes, input gain, speech sensitivity, an input meter, crew volume and microphone mute. Hold V to speak in push-to-talk mode; F8 toggles microphone mute.
- Use Test Microphone / Watch Meter to check your selected input locally. The test does not play your voice back, save recordings or transmit to other players. Leaving the setup ends the local test and saves preferences.
- Lobby, round-results and in-game pause actions are explicitly labelled Voice Chat. The crew HUD reports the actual microphone status. Typing a lobby name no longer leaves voice hotkeys blocked in the setup panel, and Escape closes offline voice settings.
- The existing host/Relay connection carries Opus voice packets; no new paid voice provider or account is introduced. Team voice is the default; the host can select proximity voice. Living players and spectators have separate voice audiences during a run.
- The final native interface passed 768 measured draw states across both levels, four resolutions and three HUD sizes, with zero clipping/overlap findings. Four real Relay processes in each level passed generated-voice transmission, decode and streaming PCM callback checks, hunter hearing, voice resumption in the returned lobby, and clean departures. Generated samples validate the network/audio path; human microphone quality is not claimed.
- Blackwater and Briarwake support offline solo or private 2-4 player invite-code co-op. The Last Harvest and The Ossuary remain Coming Soon. Windows keyboard and mouse alpha; no saved run progress.
- Close the game, then choose Update & restart in the launcher. Everyone in a lobby should use the same build. The installer includes the full game and launcher.

[Actual Voice Chat setup screen](https://github.com/RyanVerWey/the-hollow-below-alpha/releases/download/v0.22.57/voice-chat-settings-v057.png).

Getting started: Controls & Settings > Voice Chat; choose your microphone, select PTT / V or Open Mic, unmute, and use Test Microphone to watch the meter. Join your lobby after setup.
