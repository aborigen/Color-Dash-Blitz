# Color Dash Blitz - UI Components & Project Overview

## 🎨 Overview
Color Dash Blitz is a high-intensity, hyper-casual color matching game designed for web platforms (specifically Yandex Games). It features dynamic difficulty, AI-powered color facts, and a self-contained audio system.

## 🏗 Core Component: `GameContainer`
The heart of the application, located at `src/components/game/GameContainer.tsx`. It manages:
- **Game State**: Transitions between `START`, `PLAYING`, and `GAMEOVER`.
- **Level Generation**: Dynamically scales difficulty (3 to 12 colors) based on score.
- **Timer Logic**: An accelerating countdown that penalizes wrong answers.
- **Yandex SDK Integration**: Handles fullscreen ads, global leaderboards ('leaders'), and remote configuration for feature toggles.

## 🧱 UI Component Library (ShadCN)
The project utilizes a tailored set of ShadCN components for a professional, consistent look:
- **Button**: Used for all primary actions (Start, Retry, Mute, Language toggle). Enhanced with custom Tailwind shadows and active translation states for a "tactile" arcade feel.
- **Progress**: The timer bar uses a custom gradient implementation (`from-primary to-secondary`) to provide smooth visual feedback on remaining time.
- **Card**: Utilized in the Game Over screen to frame the final score and AI facts elegantly.
- **Lucide Icons**: Integrated for intuitive navigation:
    - `Zap`: Symbolizes the "Blitz" and speed.
    - `Trophy`: Represents high scores and leaderboards.
    - `Volume2 / VolumeX`: Indicates audio status.
    - `RotateCcw`: The standard icon for retrying a session.

## 🔊 Audio Synthesizer (`AudioSynth`)
A custom Web Audio API implementation (`src/lib/audio-synth.ts`) that replaces external MP3 dependencies:
- **Correct Match**: An upward frequency ramp (C5 to C6) using sine waves.
- **Wrong Match**: A downward sawtooth drone to signal error.
- **Start/GameOver**: Specific triangle and square waveforms to set the mood without requiring external assets.

## 🤖 AI Features
- **Genkit Integration**: Uses the `aiCreatedColorFactFlow` to generate unique color facts via Google Gemini.
- **Contextual Facts**: Facts can be requested based on the last color matched, providing an educational twist to the high-speed gameplay.

## 📱 Mobile Optimizations
- **Responsiveness**: Uses `dvh` (dynamic viewport height) units to ensure a perfect fit on mobile screens with browser toolbars.
- **Interaction Protection**: Contextual menus and touch callouts are disabled (`touch-none`, `user-select-none`) to ensure rapid tapping doesn't trigger OS-level popups.
- **Static Export**: The project is configured with `trailingSlash: true` and `output: 'export'` for maximum compatibility with static hosts like Yandex Games.

## 🚀 The Result
A production-ready, static-exportable game that:
1. **Loads instantly**: Zero external media dependencies (images or MP3s).
2. **Scales difficulty**: Keeps players engaged by increasing complexity as they improve.
3. **Platform Compliant**: Fully integrated with Yandex Games SDK features (Ads, Config, Leaderboards).
4. **Polished UX**: Features smooth animations (`game-bounce`, `game-shake`) and a modern, high-contrast aesthetic.