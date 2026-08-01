# Changelog

All notable changes to the Color Dash Blitz project will be documented in this file.

## [0.3.1] - 2024-05-25

### Fixed
- **SDK Lifecycle**: Updated the readiness signal to use `sdk.features.LoadingAPI.ready()` for better compatibility with the latest Yandex Games platform standards.

## [0.3.0] - 2024-05-24

### Added
- **Internal Audio Synthesizer**: Replaced all external MP3 dependencies with a custom Web Audio API `AudioSynth` to ensure 100% compatibility with static web platforms and reduce initial load size.
- **Publishing Kit**: Added `PROMO.md` with localized English and Russian metadata (titles, descriptions, instructions) for Yandex Games Console.
- **Git Integration**: Added `.gitignore` and updated `README.md` with comprehensive troubleshooting for GitHub connectivity.

### Fixed
- **Mobile UX**: Disabled contextual menus and long-touch callouts across all UI elements to prevent gameplay interruptions on touch devices.
- **SDK Lifecycle**: Implemented `sdk.features.LoadingProgress.ready()` to correctly signal game readiness to the Yandex Games environment after assets and remote configs are loaded.
- **Static Export**: Enabled `trailingSlash: true` in Next.js config to prevent 404 errors on refreshes in static hosting environments.

### Improved
- **Layout Robustness**: Refined the UI with `dvh` units and flexible flexbox containers to ensure 12-color grids and AI facts never cut off on compact or legacy smartphone screens.
- **Interaction Quality**: Added `overscroll-behavior: none` to the body to prevent accidental "pull-to-refresh" gestures during intense tapping.

## [0.2.0] - 2024-05-22

### Added
- **Difficulty Scaling**: Introduced 3 new levels of difficulty. The game now scales from 3 to 12 color choices with an accelerating timer based on the user's score.
- **Yandex Games SDK Integration**:
    - Full-screen ad support with smart frequency logic.
    - Global leaderboard submission for high scores (ID: 'leaders').
    - Remote Config support for toggling AI facts and adjusting game balance.

### Improved
- **Multilingual Support**: Enhanced English and Russian translations for all UI elements and color names.
- **Visual Feedback**: Added bounce and shake animations for correct and wrong answers.

## [0.1.0] - 2024-05-20

### Added
- Initial project structure with Next.js 15 and ShadCN UI.
- Basic color matching gameplay loop.
- AI-powered color facts using Genkit and Google Gemini.
