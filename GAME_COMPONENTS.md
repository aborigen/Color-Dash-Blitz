# Color Dash Blitz - Game Components & Logic 🧩

This document provides a technical breakdown of the core modules and logic that drive **Color Dash Blitz**.

## 🎮 1. GameContainer (`src/components/game/GameContainer.tsx`)
The central orchestrator of the application. It handles the entire lifecycle of a game session.

### State Management
- **GameState**: Tracks if the user is in the `START` menu, `PLAYING`, or at the `GAMEOVER` screen.
- **Score & Level**: Manages the current score and generates the next `LevelData` (target color and choices).
- **Timer**: A reactive state that decrements based on score-based difficulty scaling.

### Level Generation Logic
- **Difficulty Scaling**: The number of color choices increases as the player scores higher:
  - 0-4 points: 3 colors
  - 5-9 points: 4 colors
  - 10-14 points: 6 colors
  - 15-19 points: 8 colors
  - 20-29 points: 9 colors
  - 30+ points: 12 colors
- **Shuffling**: Uses a Fisher-Yates shuffle algorithm to ensure the target color and wrong choices are randomly distributed in the grid.

### Feedback System
- **Visual**: Triggers `game-bounce` for correct answers and `game-shake` for errors using Tailwind animations.
- **Penalty**: Wrong answers deduct a dynamic amount of time from the timer, increasing the pressure as the score rises.

## 🔊 2. Audio Synthesizer (`src/lib/audio-synth.ts`)
A custom implementation of the **Web Audio API** to ensure 100% platform compatibility without external assets.

- **Correct Match**: Uses a sine wave oscillator with an exponential frequency ramp (C5 to C6).
- **Wrong Match**: Uses a sawtooth wave with a downward linear ramp to create a "buzz" effect.
- **Game Over**: A square wave with a rapid frequency drop to signal failure.

## 🌍 3. Internationalization (`src/lib/i18n.ts`)
A lightweight, typed translation system supporting English (`en`) and Russian (`ru`).

- **Translation Dictionary**: Maps UI strings and color names to their localized equivalents.
- **Dynamic Helper**: The `tColor` function ensures that color names shown in the UI are always in the user's preferred language.

## 🔌 4. Yandex Games SDK Bridge (`src/lib/yandex-sdk.ts`)
The integration with the Yandex Games platform follows a robust pattern to ensure compatibility and stability:

### 1. Script Injection
The SDK is loaded via a script tag in `src/app/layout.tsx`. Because it loads asynchronously, we cannot rely on it being available immediately.

### 2. The Bridge Logic (`src/lib/yandex-sdk.ts`)
- **Retry Mechanism**: The `initYandexSDK` function uses a recursive retry strategy to check for `window.YaGames`. This prevents initialization failures if the script takes longer than the React mount cycle to load.
- **Initialization**: Once found, `YaGames.init()` is called, and the resulting SDK instance is returned to the `GameContainer`.
- **Typed Wrapper**: The bridge provides typed methods for `showFullscreenAd`, `submitScoreToLeaderboard`, and `fetchRemoteConfig`.

### 3. Feature Implementations
- **Ads**: `showFullscreenAd` is wrapped in a Promise to allow the game to pause logic while the interstitial is active.
- **Remote Config**: Fetches balance variables from the Yandex Console. Used for `starting_timer` and `enable_facts` toggles.
- **Leaderboards**: Submits high scores to the technical ID `leaders`.
- **Loading Progress**: Calls `sdk.features.LoadingProgress.ready()` once the app and remote configs are ready, which is a requirement for Yandex publication.
- **Environment Detection**: Detects `sdk.environment.i18n.lang` to automatically set the game's language to Russian or English.

## 🤖 5. AI & Static Logic
- **Genkit AI Flow (`src/ai/flows/ai-created-color-fact-flow.ts`)**: Used during development to design color facts.
- **Static Facts (`src/lib/facts.ts`)**: For production builds, the app relies on this library of pre-compiled facts to ensure zero runtime server dependency, which is critical for static-only platforms like Yandex Games.

## 📱 6. UI & Styling (`src/app/globals.css`)
- **Dynamic Viewports**: Uses `dvh` units to ensure the game occupies the exact visible space on mobile browsers.
- **Interaction Prevention**: Disables touch callouts and selection to ensure high-speed tapping doesn't trigger OS menus.
