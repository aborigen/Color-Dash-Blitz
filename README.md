# Color Dash Blitz ⚡️

Color Dash Blitz is a fast-paced, hyper-casual color matching game built for the web. Test your reflexes as you match target colors against a ticking clock, featuring dynamic difficulty and AI-powered color insights.

## 🚀 Features

- **Fast-Paced Gameplay**: High-intensity matching that tests your speed and precision.
- **Dynamic Difficulty**: The game scales from 3 to 12 color choices with an accelerating timer.
- **AI Color Facts**: Receive unique color theory facts after every game session.
- **Immersive Audio**: High-energy sound effects for every game action with a mute toggle.
- **Yandex Games Integration**: Built-in support for Remote Config, full-screen ads, and global leaderboards.
- **Responsive Design**: Optimized with `dvh` units for a perfect "no-scroll" experience on smartphone portrait screens.
- **Static Export**: Fully compatible with static hosting (Yandex Games, GitHub Pages).

## 🛠 Tech Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **AI Implementation**: [Genkit](https://firebase.google.com/docs/genkit) (for fact generation during development)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
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

3. Build the static version:
   ```bash
   npm run build
   ```
   The static files will be generated in the `out/` directory.

## 📦 Connecting to GitHub

To upload your code to GitHub, follow these exact steps for the **color-dash-blitz** repository:

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
   Go to [GitHub](https://github.com/new) and create a new repository named `color-dash-blitz`. Do **not** initialize it with a README or License. Then run:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/color-dash-blitz.git
   ```

4. **Push the Code**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

### Troubleshooting:
- **"Remote origin already exists"**: Run `git remote remove origin` and try Step 3 again.
- **Authentication failed**: Ensure you have a GitHub Personal Access Token (PAT) configured or use SSH.

## 📄 License

This project is open-source and available under the MIT License.