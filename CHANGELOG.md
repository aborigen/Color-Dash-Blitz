# Changelog

All notable changes to the Color Dash Blitz project will be documented in this file.

## [0.4.0] - 2024-06-02

### Changed
- **Theme Refinement**: Updated dark mode HSL variables to a "Deep Space" palette for improved contrast and aesthetics.

## [0.3.8] - 2024-06-01

### Added
- **AI Integration**: Configured `GOOGLE_GENAI_API_KEY` in the environment to enable real-time color fact generation via Genkit.

## [0.3.7] - 2024-05-31

### Changed
- **Environment Configuration**: Added initial Gemini API key placeholder to support AI-powered features.

## [0.3.6] - 2024-05-30

### Fixed
- **Leaderboard Crash**: Resolved `TypeError: s.getName is not a function` by implementing defensive player data extraction in the UI.

## [0.3.5] - 2024-05-29

### Added
- **Dark Mode**: Implemented a comprehensive dark theme with HSL variable refinements and a persistent UI toggle.

## [0.3.4] - 2024-05-28

### Fixed
- **Yandex SDK Deprecation**: Completely removed the deprecated `ysdk.getLeaderboards()` method in favor of `ysdk.leaderboards`.