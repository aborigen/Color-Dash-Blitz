# Changelog

All notable changes to the Color Dash Blitz project will be documented in this file.

## [0.5.0] - 2024-06-04

### Removed
- **Yandex Games SDK**: Completely removed Yandex SDK integration, including ads, leaderboards, and remote config.
- **Leaderboard UI**: Removed the technical leaderboard modal.

### Changed
- **Standalone Mode**: The game is now a fully standalone static web application.
- **Refined Build**: Updated `archive.sh` to focus on generic static web deployment.

## [0.4.1] - 2024-06-03

### Changed
- **Mobile Grid Optimization**: Refined the game choice grid to be more adaptable to small screens, improving column distribution and button scaling.

## [0.4.0] - 2024-06-02

### Changed
- **Theme Refinement**: Updated dark mode HSL variables to a "Deep Space" palette for improved contrast and aesthetics.

## [0.3.8] - 2024-06-01

### Added
- **AI Integration**: Configured `GOOGLE_GENAI_API_KEY` in the environment to enable real-time color fact generation via Genkit.
