# Project Current State

A factual snapshot of the current state of the Tic-Tac-Toe codebase.

---

## 1. Project Purpose & Scope
The project is a lightweight, responsive, and standalone web-based Tic-Tac-Toe game supporting 2-Player local pass-and-play as well as two AI difficulty levels (Easy and Hard Minimax).

---

## 2. Technology Stack

- **Markup**: HTML5 (Semantic elements, ARIA accessibility attributes)
- **Styling**: CSS3 (Modern Flexbox, CSS Grid, Custom Properties / CSS Variables, Glassmorphism, CSS Animations)
- **Scripting**: Vanilla JavaScript (ES6+, IIFE encapsulation, Web Audio API, Web Storage API)
- **Fonts**: Google Fonts (`Outfit`) via CDN

---

## 3. Architecture & Directory Structure

```
.
├── index.html        # Main HTML entry point & UI structure
├── style.css         # Visual styles, responsive rules, animations
├── script.js         # Core game logic, state machine, AI engine, audio synthesis
├── README.md         # User documentation and guide
└── ai/               # AI brain documentation suite
    ├── instructions.md
    ├── decisions.md
    ├── known-issues.md
    └── current-state.md
```

---

## 4. Major Components & Subsystems

### Frontend UI (`index.html` & `style.css`)
- **Header**: Title & Mode switch selector (2 Players, AI Easy, AI Hard).
- **Scoreboard**: Live score counters for Player X, Player O, and Ties with active turn glowing badges.
- **Status Banner**: Real-time message banner announcing whose turn it is, wins, or ties.
- **3x3 Grid Board**: Interactive buttons mapped via `data-index="0"` to `data-index="8"`.
- **Game Controls**: "New Game" (clears current board) and "Reset Score" (resets cumulative scores).

### Core Engine (`script.js`)
- **State Store**: Centralized `state` object managing `board` array, `currentPlayer`, `gameActive`, `gameMode`, `scores`, and `winningCombination`.
- **Win & Tie Detection**: Evaluates 8 possible lines (`WINNING_COMBINATIONS`) on each move.
- **AI Engine**:
  - `ai-easy`: Random legal cell selection with 60% probability of taking an immediate win if available.
  - `ai-hard`: Minimax algorithm with depth weighting and alpha-beta pruning (optimal minimax play).
- **Audio Synthesizer**: `SoundEffects` class utilizing native browser `AudioContext` to generate frequency sweeps and chords for moves, wins, ties, and resets.
- **Persistence**: `localStorage` serialization for game scores.

---

## 5. Backend, Database, APIs, & External Services

- **Backend**: None (pure client-side static application).
- **Database**: None (local client-side `localStorage` used for score caching).
- **APIs**: Native browser Web APIs (`AudioContext`, `localStorage`, `DOM`).
- **Authentication / Authorization**: UNKNOWN / NOT APPLICABLE (no user accounts or server sessions).
- **External Services**: Google Fonts CDN (`https://fonts.googleapis.com`).

---

## 6. Build, Run, & Deployment Process

- **Build Process**: None required (zero-build static website).
- **Run Process**: Double-click `index.html` or serve via any static web server (e.g. `npx serve`, `python -m http.server`).
- **Deployment**: Can be hosted on any static hosting provider (GitHub Pages, Netlify, Vercel, Cloudflare Pages, S3).

---

## 7. Current Feature Status

| Feature | Implementation Status | Verification |
| :--- | :--- | :--- |
| 2-Player Local Pass & Play | **Complete** | Verified |
| AI Easy Mode | **Complete** | Verified |
| AI Hard Mode (Minimax) | **Complete** | Verified |
| Score Tracking & Persistence | **Complete** | Verified |
| Audio Effects (Web Audio) | **Complete** | Verified |
| Mobile & Desktop Responsiveness | **Complete** | Verified |
| Keyboard Accessibility | **Complete** | Verified |
| Server-side Multiplayer | **Not Implemented / Out of Scope** | Verified |
