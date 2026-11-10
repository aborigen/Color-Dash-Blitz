
# Changelog

All notable changes to the Color Dash Blitz project will be documented in this file.

## [1.0.0] - 2024-06-13

### Added
- **Multi-Platform SDK Bridge**: Centralized `platformSDK` in `src/lib/platform-sdk.ts` for unified handling of Yandex, VK, and Sber platforms.
- **Build-Time Selection**: Integrated `NEXT_PUBLIC_GAME_PLATFORM` environment variable to toggle SDKs during the build process.
- **Score Reporting**: Implemented `reportScore` to sync game results with platform leaderboards or social walls.
- **Automatic Script Injection**: Conditional injection of platform-specific SDK scripts in `src/app/layout.tsx`.
- **Enhanced Build Scripts**: Updated `package.json` with `build:sber`, `build:vk`, and `build:yandex` to automate deployment workflows.

... (rest of changelog)
