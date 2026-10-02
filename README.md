# 🎮 Modern Responsive Tic-Tac-Toe Game

A modern, responsive, and zero-dependency Tic-Tac-Toe web application built with pure **HTML5**, **CSS3 (Glassmorphism & CSS Grid)**, and **Vanilla JavaScript (ES6+)**.

[![Tic-Tac-Toe](https://img.shields.io/badge/Tic--Tac--Toe-Vanilla%20JS-38bdf8?style=for-the-badge&logo=javascript)](https://github.com/SampathSriramoju/VOSC-Activity-1)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://github.com/SampathSriramoju/VOSC-Activity-1)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://github.com/SampathSriramoju/VOSC-Activity-1)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

---

## 🌟 Key Highlights & Features

- **🕹️ 3 Dynamic Game Modes**:
  - **2 Players (Pass & Play)**: Challenge a friend locally on the same screen.
  - **AI (Easy)**: Relaxed AI opponent for casual play.
  - **AI (Hard)**: Unbeatable computer opponent driven by the **Minimax Algorithm with Alpha-Beta Pruning**.
- **🎨 Modern Dark Glassmorphic Design**:
  - Polished dark UI with subtle ambient glow spheres.
  - Distinct neon player accents (**Sky Cyan for X**, **Vibrant Rose for O**, **Purple for Ties**).
  - Fluid pop-in entrance animations, winning line highlights, and pulsating victory badges.
- **🔊 Procedural Web Audio Synthesis**:
  - Built-in sound effects generated on-the-fly using the native browser **Web Audio API** (`AudioContext`).
  - Zero external `.mp3` / `.wav` assets needed — instant playback with 0ms load latency.
- **💾 Persistent Score Tracking**:
  - Automatically tracks wins for Player X, Player O, and Ties across rounds.
  - Data persists across browser sessions and refreshes via `localStorage`.
- **♿ Full Accessibility & Responsiveness**:
  - Fully responsive across mobile smartphones, tablets, laptops, and ultra-wide displays.
  - Complete keyboard navigation (`Tab` to focus cells, `Enter` / `Space` to make a move).
  - ARIA attributes and live status announcements for screen readers.

---

## 📁 Repository Structure

The project strictly follows a clean, minimal 3-file core architecture:

```
VOSC-Activity-1/
├── index.html        # Semantic HTML5 layout, UI cards & 3x3 board
├── style.css         # Responsive glassmorphism styling & animations
├── script.js         # Game state machine, AI Minimax engine & sound synthesis
├── README.md         # Full project documentation & guide
└── ai/               # AI Brain documentation suite
    ├── instructions.md   # Guidelines & constraints for AI pair-programming
    ├── decisions.md      # Architectural decision records (DEC-001 to DEC-005)
    ├── known-issues.md   # Discovered risks, limitations & test audit
    └── current-state.md  # Detailed technical snapshot of codebase
```

---

## 🚀 How to Run & Play

### Option 1: Direct File Launch
Simply double-click `index.html` in your file explorer, or drag and drop it into any modern web browser (Chrome, Edge, Firefox, Brave, Safari).

### Option 2: Run via Local Web Server
You can launch a local development server using Python or Node.js:

```bash
# Using Python 3
python -m http.server 8000

# Or using Node.js
npx serve .
```
Then visit **`http://localhost:8000`** in your browser.

---

## 🧠 AI Brain & Integrated Plugins

This repository was architected and verified following best-in-class agentic engineering principles and integrated toolkits:

| Plugin / Toolkit | Role & Purpose |
| :--- | :--- |
| **UI/UX Pro Max Intelligence** | Glassmorphism aesthetics, color contrast accessibility, responsive grid layout, and tactile micro-interactions. |
| **Taste-Skill Anti-Slop Frontend** | Refined typography pairing (`Outfit`), balanced motion intensity, and clean visual density. |
| **Superpowers & SPARC Methodology** | Spec-driven architecture, Minimax verification, and clean state machine design. |
| **gstack Review & QA Engine** | Autonomous multi-point code quality, security audit, and zero-dependency compliance verification. |
| **Ruflo Coordination & Brain Ledger** | Project brain documentation suite maintained inside [`ai/`](./ai) (`instructions.md`, `decisions.md`, `known-issues.md`, `current-state.md`). |

---

## 📜 Game Rules

1. The game is played on a 3x3 grid.
2. Player **X** always makes the first move.
3. Players take turns claiming empty cells.
4. The first player to get **3 in a row** (horizontally, vertically, or diagonally) wins the round.
5. If all 9 cells are filled with no 3-in-a-row combination, the game ends in a **Tie**.
6. Use **"New Game"** to start the next round or **"Reset Score"** to reset the scoreboard.

---

## 📄 License

This project is open source and available under the [MIT License](https://opensource.org/licenses/MIT).