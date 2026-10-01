# Changelog

All notable changes to the Color Dash Blitz project will be documented in this file.

## [0.6.7] - 2024-06-08

### Changed
- **Grid Refactoring**: Optimized the 4-color grid difficulty level to use a 1x4 horizontal layout instead of 2x2. This significantly reduces vertical space usage in portrait mode and prevents UI element overlapping on smaller screens.

## [0.6.6] - 2024-06-07

### Fixed
- **UI Overflow**: Resolved overlapping issues in portrait mode by refactoring the `GameContainer` to use more defensive vertical spacing and responsive scaling for the target indicator.
- **Mobile Ergonomics**: Scaled down primary gameplay assets slightly on mobile to prevent HUD encroachment during multi-color grid levels.

## [0.6.5] - 2024-06-06

### Changed
- **Portrait UI Refactor**: Optimized vertical space distribution for portrait orientation on mobile devices.
- **Enhanced Mobile Ergonomics**: Scaled gameplay elements (target indicator, choices grid) for better reachability and visual clarity.
- **Improved HUD**: Refined score and timer positioning to prevent overlap and improve readability during fast gameplay.

## [0.6.0] - 2024-06-05

### Changed
- **UI Refinement**: Enhanced the visual aesthetics with polished typography, better spacing, and dynamic background elements.
- **Enhanced Animations**: Added new streak/combo feedback, timer pulsing, and smoother transitions between game states.
- **Premium Feel**: Integrated glassmorphism-style components with better shadow work and high-contrast styling for both light and dark modes.

## [0.5.0] - 2024-06-04

### Removed
- **Yandex Games SDK**: Completely removed Yandex SDK integration, including ads, leaderboards, and remote config.
- **Leaderboard UI**: Removed the technical leaderboard modal.

### Changed
- **Standalone Mode**: The game is now a fully standalone static web application.
- **Refined Build**: Updated `archive.sh` to focus on generic static web deployment.
