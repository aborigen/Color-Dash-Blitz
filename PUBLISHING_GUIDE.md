
# Color Dash Blitz - Publishing Guide 🚀

This document provides instructions on how to package and publish **Color Dash Blitz** to various web game platforms.

## 📦 Automated Build Scripts

The project includes pre-configured scripts to generate optimized `.zip` archives for the major platforms. These scripts ensure that the build is static, self-contained, and uses relative paths for all assets.

### 1. Yandex Games
To generate a build for the Yandex Games developer console:
```bash
npm run build:yandex
```
**Output**: `dist-yandex-YYYY-MM-DD.zip`

### 2. VK Games (VK Play / Mini Apps)
To generate a build for VK Games:
```bash
npm run build:vk
```
**Output**: `dist-vk-YYYY-MM-DD.zip`

### 3. Sber Devices (SmartMarket)
To generate a build for Sber Devices (Canvas App):
```bash
npm run build:sber
```
**Output**: `dist-sber-YYYY-MM-DD.zip`

---

## 🛠 Platform Specific Requirements

### General Static Export (Next.js)
The app is configured in `next.config.ts` with:
- `output: 'export'`: Generates a static site.
- `trailingSlash: true`: Ensures directory-based routing (e.g., `/game/` instead of `/game.html`).
- `assetPrefix: './'`: Crucial for platforms where the game might be served from a sub-directory or a local file system.

### Audio Synthesizer
The game uses a custom Web Audio API synthesizer (`src/lib/audio-synth.ts`). This is highly compatible with mobile browsers on Sber and VK devices and removes the need for large `.mp3` or `.wav` assets.

### System Fonts
To ensure 100% offline capability and zero external dependencies (required by some "walled garden" platforms), we use a system font stack. No Google Fonts or external CSS are referenced.

---

## 🚀 Deployment Checklist
1. **API Keys**: Ensure `GOOGLE_GENAI_API_KEY` is not embedded in the client build (Genkit flows run server-side or are mocked for static builds).
2. **Icons**: Use the `public/game-icon.svg` (or exported PNG) for the platform's store listing.
3. **Cover Images**: Use the templates in `PROMO.md` for high-quality marketing materials.
4. **Testing**: Always test the `.zip` content locally using a simple server like `npx serve out` to ensure all paths resolve correctly.
