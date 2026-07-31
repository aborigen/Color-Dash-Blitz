
# Color Dash Blitz - Game UI & Visual Logic

## 🎨 Design Philosophy
Color Dash Blitz utilizes a "Hyper-Casual Arcade" aesthetic. The UI is designed to be high-contrast, tactile, and extremely responsive. We prioritize immediate visual feedback and a "no-scroll" layout that fits any screen perfectly.

## 🏗 Core Game UI Components

### 1. The Target Indicator (Match Hub)
Located at the center of the "Playing" state (or left in landscape), this is the player's primary focus.
- **Visuals**: A large, rounded square (`rounded-[2.5rem]`) displaying the target color.
- **Context**: The color's name is displayed in localized text (via `tColor`) with high tracking (`tracking-[0.2em]`) for an architectural, modern feel.
- **Animations**: Triggers the `game-bounce` animation when a correct match is made.

### 2. Dynamic Choice Grid
The grid adapts in real-time as the player progresses.
- **Scaling Logic**: Switches between 2, 3, and 4 columns based on the difficulty level (3 to 12 choices).
- **Tactile Feel**: Buttons use physical translation (`active:translate-y-1`) and white overlays to simulate a "light-up" effect.

### 3. HUD & Timer System
- **The Blitz Bar**: A progress bar that visualizes remaining time. As the score increases, a speed multiplier makes this bar deplete faster.

## ⚡ Interaction Flow & Sensory Systems

### The Interaction Loop
1. **Identification**: The player identifies the target color.
2. **Scan & Match**: The player scans the grid for the corresponding value.
3. **Execution**: A fast tap/click on the target button.
4. **Instant Validation**:
   - **Correct**: A positive frequency ramp plays, the target square bounces, and a new level swaps in.
   - **Incorrect**: A low-frequency "buzz" plays, the screen shakes, and the timer takes a penalty.

## 🚀 Responsive & Orientation Optimization
- **Portrait**: Standard vertical stack optimized for one-handed play.
- **Landscape**: Swaps to a side-by-side layout (Target Indicator on the left, Grid on the right) to prevent overlap and ensure all elements fit within the shorter vertical space.
- **No-Scroll Layout**: Uses `h-[100dvh]` to lock the game into the visible frame.
- **Touch Protection**: Context menus and touch callouts are disabled globally.
