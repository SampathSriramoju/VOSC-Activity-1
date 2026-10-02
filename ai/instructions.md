# AI Agent Operating Instructions

This document specifies mandatory rules, architectural constraints, conventions, and operational procedures for all AI agents working within this codebase.

---

## 1. Project Conventions vs Recommended Rules

### Discovered Project Conventions (Existing Reality)
- **Minimalist Architecture**: Zero-build, vanilla client-side web stack consisting purely of `index.html`, `style.css`, and `script.js`.
- **Zero External Runtime Dependencies**: No npm packages, external build tooling (Webpack/Vite), or external CSS/JS runtime frameworks.
- **Synthesized Audio**: Web Audio API oscillator synthesis is used in place of static audio asset files (`.mp3` / `.wav`).
- **Encapsulated Scope**: JavaScript logic is contained within an Immediately Invoked Function Expression (IIFE) to prevent global namespace pollution.
- **Direct DOM Manipulation**: Native DOM selectors and standard event listeners are used without virtual DOM abstractions.

### Recommended Operational Rules for Agents
- **Maintain 3-File Core Constraint**: Do not introduce complex module bundlers or frameworks unless explicitly requested by the user.
- **Preserve Cross-Browser Compatibility**: Ensure any modern CSS or JavaScript features are supported across evergreen mobile and desktop browsers.
- **Strict Error Handling**: Wrap `localStorage` and `AudioContext` accesses in try/catch blocks to gracefully handle sandboxed or privacy-mode environments.

---

## 2. Architecture Constraints

- **Single Page Static App**: The application must remain executable by simply opening `index.html` directly via the file system (`file:///`) or static file servers.
- **Stateless AI Computation**: AI move calculations (Minimax & heuristic checks) execute synchronously or via micro-delayed async timeouts on the main UI thread without blocking rendering.
- **Persistence Mechanism**: Game scores must only rely on browser `localStorage` under the key `tictactoe_scores`.

---

## 3. Critical Files & Caution Areas

| File | Criticality | Caution Reason |
| :--- | :--- | :--- |
| `script.js` | **High** | Contains the Minimax recursive tree evaluation and terminal state win/tie checks. Alterations to win conditions or scoring heuristics can cause infinite recursion or erroneous game ends. |
| `index.html` | **Medium** | Cell `data-index` attributes (0 through 8) directly map to array positions in `script.js`. Renaming or reordering cell indices will break board state mapping. |
| `style.css` | **Medium** | Grid templates (`3x3`) and responsive aspect-ratios maintain touch target alignment and visual consistency across devices. |

---

## 4. Protected Elements (Do Not Modify Without User Approval)

- **File Structure**: Do not split into modular bundler builds (e.g., Webpack/Vite/TS) or create additional nested subdirectories for application code without user approval.
- **Audio Strategy**: Do not introduce external binary audio assets without explicit consent.
- **Game Core Logic**: Do not alter the standard 3x3 Tic-Tac-Toe rules or turn mechanics.

---

## 5. Testing & Validation Expectations

Before submitting changes, agents must verify:
1. **PVP Mode**: Valid turn alternation between X and O, detection of horizontal, vertical, and diagonal wins, and detection of full-board ties.
2. **AI Easy Mode**: AI responds within 300ms, plays legal unoccupied squares, and completes the round without throwing unhandled exceptions.
3. **AI Hard (Minimax) Mode**: AI cannot be defeated from any initial move configuration (results in either AI victory or draw).
4. **Score Persistence**: Refreshing the browser preserves score counters; clicking "Reset Score" clears state to `0`.
5. **Keyboard / Accessibility**: Board cells can be focused via `Tab` and activated via `Enter` or `Space`.

---

## 6. Security, Deployment, & Release Precautions

- **Static Hosting**: Deployable directly to GitHub Pages, Cloudflare Pages, Vercel, Netlify, or AWS S3.
- **XSS & Injection**: Never inject untrusted user input using `innerHTML`. State values are purely internal ('X', 'O', null).
- **Audio Context Policies**: Ensure `AudioContext` resumption occurs only after user interaction (clicks) to comply with browser autoplay restrictions.
