# Color Dash Blitz ⚡️

Color Dash Blitz is a fast-paced, hyper-casual color matching game built for the web. Test your reflexes as you match target colors against a ticking clock, featuring dynamic difficulty and AI-powered color insights.

## 🚀 Features

- **Fast-Paced Gameplay**: High-intensity matching that tests your speed and precision.
- **Dynamic Difficulty**: The game scales from 3 to 12 color choices with an accelerating timer.
- **AI Color Facts**: Receive unique color theory facts after every game session.
- **Immersive Audio**: Built-in audio synthesizer for platform-compliant sound effects.
- **Yandex Games Integration**: Built-in support for Remote Config, full-screen ads, and global leaderboards.
- **Responsive Design**: Optimized for a perfect "no-scroll" experience on all screens.
- **Static Export**: Fully compatible with static hosting (Yandex Games, GitHub Pages).

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Implementation**: [Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Audio**: Web Audio API (Internal Synthesizer)
- **Platform**: Yandex Games SDK

## 🏁 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Build and archive for publishing:
   ```bash
   npm run archive
   ```
   This will generate a `game.zip` file in the root directory.

## 📦 Publishing

To publish your game to Yandex Games or other static hosts:

1. Run `npm run archive`.
2. Locate the `game.zip` file in your project root.
3. Upload `game.zip` to the platform console.

## 🔗 Connecting to GitHub

To upload your code to GitHub:

1. **Initialize Git**:
   ```bash
   git init
   ```

2. **Stage and Commit**:
   ```bash
   git add .
   git commit -m "Initial release of Color Dash Blitz"
   ```

3. **Link to GitHub**:
   Go to [GitHub](https://github.com/new) and create a new repository named `color-dash-blitz`. Then run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/color-dash-blitz.git
   ```

4. **Push the Code**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 📄 License

This project is open-source and available under the MIT License.
