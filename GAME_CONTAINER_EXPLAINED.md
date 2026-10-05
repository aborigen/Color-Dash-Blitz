# GameContainer Technical Deep-Dive 🧠

The `GameContainer` (`src/components/game/GameContainer.tsx`) is the core engine of **Color Dash Blitz**. It manages the state machine, gameplay logic, and real-time UI updates.

## 🕹 1. State Machine
The component uses a `GameState` union type to handle three distinct views:
- **START**: The landing screen with the "Play Now" button and language toggle.
- **PLAYING**: The active gameplay loop featuring the timer, score, and color matching.
- **GAMEOVER**: The results screen displaying the final score, AI color facts, and retry options.

## 📈 2. Difficulty & Level Generation
Levels are generated dynamically via the `generateLevel` function.

### Scaling Logic
As the player's `score` increases, the number of choices grows to challenge their speed:
- **0-4 Points**: 3 choices (1 row/column)
- **5-9 Points**: 4 choices (2x2 grid)
- **10-14 Points**: 6 choices (2x3 grid)
- **15-19 Points**: 8 choices (2x4 grid)
- **20-29 Points**: 9 choices (3x3 grid)
- **30+ Points**: 12 choices (3x4 grid)

## ⏱ 3. The Blitz Timer
The timer logic is handled inside a `useEffect` hook:
- **Interval**: Updates every 100ms.
- **Speed Multiplier**: `1 + Math.min(1.5, score / 40)`. As you score higher, the timer drains significantly faster.
- **Penalty**: An incorrect match deducts `20 + min(20, score/1.5)` from the timer, making mistakes costly at high levels.

## 🎨 4. Responsive UI Logic
To prevent layout shifts and overlapping on mobile devices:
- **Grid Classes**: `getGridClasses` dynamically returns Tailwind `grid-cols-X` classes based on the current level's choice count.
- **Dynamic Viewports**: The container uses `h-[100dvh]` to ensure a perfect fit on mobile browsers despite address bar changes.
- **Visual Feedback**: The `feedback` state triggers the `game-shake` (CSS animation) on error and `game-bounce` on success.

## 🔊 5. Audio Integration
The component interacts with `src/lib/audio-synth.ts` to play synthesized sounds:
- `playCorrect()`: A rising frequency ramp.
- `playWrong()`: A declining sawtooth "buzz".
- `playGameOver()`: A heavy frequency drop.

## 🤖 6. AI Facts
Upon entering the `GAMEOVER` state, the component triggers a loading state and fetches a random fact from the `COLOR_FACTS` library (localized to the user's language). This provides a moment of "edu-tainment" between rounds.
