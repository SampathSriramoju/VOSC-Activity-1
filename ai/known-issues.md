# Known Issues, Limitations & Risk Analysis

This document identifies discovered bugs, technical debt, security/performance considerations, and reliability risks in the codebase.

---

### ISSUE-001: Web Audio Autoplay Policy on Initial Interaction

- **Issue**: Some strict browsers block or throw warnings if `AudioContext` is created prior to a direct user gesture.
- **Severity**: Low
- **Evidence**: `SoundEffects.init()` in `script.js` handles creation and resumes context when suspended on first user move.
- **Affected area**: `script.js` (`SoundEffects` class).
- **Current behavior**: Sound is initialized on demand upon the first user interaction / click.
- **Expected behavior**: Audio seamlessly plays upon move without console warnings.
- **Possible impact**: If the user's browser strictly blocks audio before user interaction, audio may stay silent on first move.
- **Status**: Mitigated (handled inside try/catch and gesture event callback).
- **Recommended next investigation/fix**: Verify behavior in strict iframe/embedded preview environments.

---

### ISSUE-002: LocalStorage Availability in Restricted / Incognito Environments

- **Issue**: Accessing `localStorage` in certain embedded webviews or privacy-restricted modes can throw `SecurityError` or `QuotaExceededError`.
- **Severity**: Low
- **Evidence**: `loadSavedScores()` and `saveScores()` in `script.js`.
- **Affected area**: `script.js` state persistence.
- **Current behavior**: Wrapped in try/catch blocks; falls back to in-memory score tracking during the active session.
- **Expected behavior**: In-memory fallback functions without throwing runtime errors.
- **Possible impact**: Scores may not persist across refreshes if local storage is disabled by the user or security policy.
- **Status**: Handled / Non-blocking.
- **Recommended next investigation/fix**: None required for standard web app functionality.

---

### ISSUE-003: Main Thread Execution of AI Minimax Calculation

- **Issue**: Minimax runs synchronously on the main UI thread during AI turns.
- **Severity**: Very Low
- **Evidence**: `computeAIMove('ai-hard')` invoked inside `setTimeout(..., 300)` in `script.js`.
- **Affected area**: `script.js` (`minimax`, `getBestMinimaxMove`).
- **Current behavior**: Runs in < 2ms for a 3x3 grid with maximum depth of 9.
- **Expected behavior**: Instant move calculation without UI stutter.
- **Possible impact**: None for standard 3x3 Tic-Tac-Toe. If expanded to 4x4 or 5x5 grids in the future, depth recursion would freeze the UI thread without a Web Worker.
- **Status**: Documented technical limitation for future grid expansions.
- **Recommended next investigation/fix**: If larger board sizes (4x4 or 5x5) are implemented in the future, offload computation to a Web Worker or apply depth-limited heuristic evaluation.

---

### ISSUE-004: Lack of Automated Unit Test Suite

- **Issue**: There is no automated CLI test runner (e.g. Jest, Vitest) configured.
- **Severity**: Low
- **Evidence**: Root workspace contains only static files (`index.html`, `style.css`, `script.js`, `README.md`).
- **Affected area**: Testing & Verification pipeline.
- **Current behavior**: Quality assurance is conducted via manual browser testing.
- **Expected behavior**: Automated execution of win-condition and minimax test cases.
- **Possible impact**: Future manual refactoring could inadvertently break edge-case game resolution.
- **Status**: Known technical debt (by design for minimal zero-dependency architecture).
- **Recommended next investigation/fix**: A lightweight zero-dependency Node test script (`test.js`) can be added if automated CI/CD is desired.
