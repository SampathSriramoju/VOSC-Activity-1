# Project Architectural & Technical Decisions

This document records the technical decisions present in the project, their rationale, trade-offs, and verification status.

---

### DEC-001: Minimal 3-File Architecture (Vanilla HTML5 / CSS3 / JS)

- **Decision**: Build the application using only three standalone files (`index.html`, `style.css`, `script.js`) without external build tools or JS frameworks.
- **Why it appears to have been made**: Maximizes portability, allows instant execution by opening the file directly in any browser, and eliminates build-step dependency friction.
- **Current implementation**: Direct `<link>` to `style.css` and `<script>` to `script.js` located in the root directory.
- **Files/components affected**: `index.html`, `style.css`, `script.js`.
- **Known trade-offs**: No TypeScript compile-time type safety; no automatic minification/bundling for production environments.
- **Evidence/source in project**: Root directory layout, script/link tags in `index.html`.
- **Reasoning status**: Verified (Matches user specification for simple 3-file structure).

---

### DEC-002: Web Audio API Oscillator Synthesis for Sound Effects

- **Decision**: Synthesize move, victory, tie, and reset sound effects procedurally via native browser `AudioContext` oscillators instead of loading `.mp3` or `.wav` asset files.
- **Why it appears to have been made**: Removes all external network/file dependencies for assets, ensures zero 404 file errors when moved, and guarantees instant audio playback with zero load latency.
- **Current implementation**: `SoundEffects` class in `script.js` managing an `AudioContext` oscillator with dynamic gain envelopes and frequencies.
- **Files/components affected**: `script.js`.
- **Known trade-offs**: Sound effects are simple 8-bit/chime style synthesizer tones rather than complex orchestrated acoustic recordings.
- **Evidence/source in project**: `SoundEffects` class implementation in `script.js`.
- **Reasoning status**: Verified.

---

### DEC-003: Minimax Algorithm with Alpha-Beta Pruning for AI (Hard)

- **Decision**: Implement a full recursive Minimax algorithm with depth weighting (`10 - depth`) and alpha-beta pruning for the Hard difficulty mode.
- **Why it appears to have been made**: 3x3 Tic-Tac-Toe has a small state search space (maximum 9! = 362,880 states, drastically less with pruning), guaranteeing an optimal, mathematically unbeatable computer opponent.
- **Current implementation**: `minimax()`, `getBestMinimaxMove()`, and `findWinningMove()` functions in `script.js`.
- **Files/components affected**: `script.js`.
- **Known trade-offs**: Executes on the main thread; however, execution time on modern devices is sub-millisecond for 3x3 boards.
- **Evidence/source in project**: `minimax` function in `script.js`.
- **Reasoning status**: Verified.

---

### DEC-004: Browser LocalStorage for Persistent Score Tracking

- **Decision**: Store game statistics (Player X wins, Player O wins, and Ties) in `window.localStorage` under key `tictactoe_scores`.
- **Why it appears to have been made**: Allows players to retain their scoreboard across page refreshes and browser restarts without requiring a remote database or backend server.
- **Current implementation**: `loadSavedScores()` and `saveScores()` with `JSON.stringify` / `JSON.parse` and try-catch safety wrapper.
- **Files/components affected**: `script.js`.
- **Known trade-offs**: Scores are device- and browser-specific (no cross-device cloud sync).
- **Evidence/source in project**: `localStorage.getItem` and `localStorage.setItem` in `script.js`.
- **Reasoning status**: Verified.

---

### DEC-005: CSS Grid Layout with Glassmorphic Dark Palette

- **Decision**: Use modern CSS Grid with fixed aspect ratio (`1 / 1`) and CSS custom properties (variables) with backdrop blur and glow filters.
- **Why it appears to have been made**: Delivers a modern visual experience, seamless mobile responsiveness, and clean tactile feedback for touch and mouse interactions.
- **Current implementation**: `style.css` `:root` variables, `.board-wrapper`, `.board`, `.cell`, and keyframe animations.
- **Files/components affected**: `style.css`, `index.html`.
- **Known trade-offs**: Older legacy browsers (e.g. IE11) lacking CSS Grid or `backdrop-filter` will render a fallback box appearance.
- **Evidence/source in project**: `style.css`.
- **Reasoning status**: Verified.
