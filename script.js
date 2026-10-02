// Tic-Tac-Toe Game Logic & State Management

(function () {
    'use strict';

    // Game state
    const state = {
        board: Array(9).fill(null),
        currentPlayer: 'X',
        gameActive: true,
        gameMode: 'pvp', // 'pvp', 'ai-easy', 'ai-hard'
        scores: {
            X: 0,
            O: 0,
            ties: 0
        },
        winningCombination: null
    };

    // Winning combinations (rows, columns, diagonals)
    const WINNING_COMBINATIONS = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    // DOM Elements
    const boardElement = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const statusBanner = document.getElementById('status-banner');
    const restartBtn = document.getElementById('restart-btn');
    const resetScoresBtn = document.getElementById('reset-scores-btn');
    const modeButtons = document.querySelectorAll('.mode-btn');
    
    const cardX = document.getElementById('card-x');
    const cardO = document.getElementById('card-o');
    const nameX = document.getElementById('name-x');
    const nameO = document.getElementById('name-o');
    const scoreX = document.getElementById('score-x');
    const scoreO = document.getElementById('score-o');
    const scoreTies = document.getElementById('score-ties');

    // Web Audio Synthesizer for lightweight zero-asset sound effects
    class SoundEffects {
        constructor() {
            this.ctx = null;
        }

        init() {
            if (!this.ctx) {
                const AudioContextClass = window.AudioContext || window.webkitAudioContext;
                if (AudioContextClass) {
                    this.ctx = new AudioContextClass();
                }
            }
        }

        playNote(freq, type = 'sine', duration = 0.1, gainValue = 0.1) {
            try {
                this.init();
                if (!this.ctx) return;
                if (this.ctx.state === 'suspended') {
                    this.ctx.resume();
                }
                const osc = this.ctx.createOscillator();
                const gain = this.ctx.createGain();

                osc.type = type;
                osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

                gain.gain.setValueAtTime(gainValue, this.ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

                osc.connect(gain);
                gain.connect(this.ctx.destination);

                osc.start();
                osc.stop(this.ctx.currentTime + duration);
            } catch (e) {
                // Audio not supported or blocked
            }
        }

        playMoveX() {
            this.playNote(480, 'sine', 0.1, 0.12);
        }

        playMoveO() {
            this.playNote(360, 'sine', 0.1, 0.12);
        }

        playWin() {
            try {
                const notes = [440, 554.37, 659.25, 880];
                notes.forEach((freq, idx) => {
                    setTimeout(() => {
                        this.playNote(freq, 'triangle', 0.25, 0.15);
                    }, idx * 100);
                });
            } catch (e) {}
        }

        playTie() {
            this.playNote(220, 'sawtooth', 0.25, 0.08);
        }

        playReset() {
            this.playNote(520, 'sine', 0.08, 0.08);
        }
    }

    const sfx = new SoundEffects();

    // Local Storage Helpers
    function loadSavedScores() {
        try {
            const saved = localStorage.getItem('tictactoe_scores');
            if (saved) {
                const parsed = JSON.parse(saved);
                state.scores.X = parsed.X || 0;
                state.scores.O = parsed.O || 0;
                state.scores.ties = parsed.ties || 0;
            }
        } catch (e) {
            console.warn('Could not load scores from localStorage', e);
        }
    }

    function saveScores() {
        try {
            localStorage.setItem('tictactoe_scores', JSON.stringify(state.scores));
        } catch (e) {
            console.warn('Could not save scores to localStorage', e);
        }
    }

    // UI Updates
    function updateScoreboard() {
        scoreX.textContent = state.scores.X;
        scoreO.textContent = state.scores.O;
        scoreTies.textContent = state.scores.ties;

        if (state.gameMode === 'pvp') {
            nameX.textContent = 'Player 1';
            nameO.textContent = 'Player 2';
        } else {
            nameX.textContent = 'You (X)';
            nameO.textContent = state.gameMode === 'ai-easy' ? 'AI (Easy)' : 'AI (Hard)';
        }

        updateTurnIndicator();
    }

    function updateTurnIndicator() {
        if (!state.gameActive) {
            cardX.classList.remove('active-turn');
            cardO.classList.remove('active-turn');
            return;
        }

        if (state.currentPlayer === 'X') {
            cardX.classList.add('active-turn');
            cardO.classList.remove('active-turn');
            statusBanner.textContent = state.gameMode === 'pvp' ? "Player X's Turn" : "Your Turn (X)";
            statusBanner.style.color = 'var(--color-x)';
        } else {
            cardO.classList.add('active-turn');
            cardX.classList.remove('active-turn');
            statusBanner.textContent = state.gameMode === 'pvp' ? "Player O's Turn" : "AI Thinking...";
            statusBanner.style.color = 'var(--color-o)';
        }
    }

    function checkWin(board, player) {
        for (const combination of WINNING_COMBINATIONS) {
            const [a, b, c] = combination;
            if (board[a] === player && board[b] === player && board[c] === player) {
                return { hasWon: true, combination };
            }
        }
        return { hasWon: false, combination: null };
    }

    function checkTie(board) {
        return board.every(cell => cell !== null);
    }

    // Make a move
    function handleCellClick(e) {
        const cell = e.target.closest('.cell');
        if (!cell) return;

        const index = parseInt(cell.getAttribute('data-index'), 10);

        if (state.board[index] !== null || !state.gameActive) {
            return;
        }

        // Prevent human input during AI turn
        if (state.gameMode !== 'pvp' && state.currentPlayer === 'O') {
            return;
        }

        executeMove(index);
    }

    function executeMove(index) {
        const player = state.currentPlayer;
        state.board[index] = player;

        // Render move on DOM
        const cell = cells[index];
        cell.textContent = player;
        cell.classList.add(player.toLowerCase());
        cell.disabled = true;

        if (player === 'X') {
            sfx.playMoveX();
        } else {
            sfx.playMoveO();
        }

        // Check for win
        const winResult = checkWin(state.board, player);
        if (winResult.hasWon) {
            handleGameWin(player, winResult.combination);
            return;
        }

        // Check for tie
        if (checkTie(state.board)) {
            handleGameTie();
            return;
        }

        // Switch turn
        state.currentPlayer = state.currentPlayer === 'X' ? 'O' : 'X';
        updateTurnIndicator();

        // Trigger AI if in AI mode
        if (state.gameActive && state.gameMode !== 'pvp' && state.currentPlayer === 'O') {
            // Disable board interaction during AI calculation
            setTimeout(() => {
                const aiIndex = computeAIMove(state.gameMode);
                if (aiIndex !== null && state.gameActive) {
                    executeMove(aiIndex);
                }
            }, 300);
        }
    }

    function handleGameWin(winner, combination) {
        state.gameActive = false;
        state.winningCombination = combination;
        state.scores[winner]++;
        saveScores();
        updateScoreboard();

        // Highlight winning cells
        combination.forEach(idx => {
            cells[idx].classList.add('winner');
            if (winner === 'O') {
                cells[idx].classList.add('o-winner');
            }
        });

        const winnerLabel = state.gameMode === 'pvp' 
            ? `Player ${winner} Wins!` 
            : (winner === 'X' ? 'You Win!' : 'AI Wins!');

        statusBanner.textContent = `🎉 ${winnerLabel}`;
        statusBanner.style.color = winner === 'X' ? 'var(--color-x)' : 'var(--color-o)';
        sfx.playWin();
    }

    function handleGameTie() {
        state.gameActive = false;
        state.scores.ties++;
        saveScores();
        updateScoreboard();

        statusBanner.textContent = "🤝 It's a Tie!";
        statusBanner.style.color = 'var(--color-tie)';
        sfx.playTie();
    }

    // AI Move Computation
    function computeAIMove(mode) {
        const emptyIndices = [];
        state.board.forEach((val, idx) => {
            if (val === null) emptyIndices.push(idx);
        });

        if (emptyIndices.length === 0) return null;

        if (mode === 'ai-easy') {
            // Random move with slight chance of taking immediate win
            const immediateWin = findWinningMove(state.board, 'O');
            if (immediateWin !== null && Math.random() < 0.6) {
                return immediateWin;
            }
            return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
        }

        // AI Hard: Minimax Algorithm (Optimal unbeatable play)
        return getBestMinimaxMove(state.board);
    }

    function findWinningMove(board, player) {
        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = player;
                const win = checkWin(board, player);
                board[i] = null;
                if (win.hasWon) return i;
            }
        }
        return null;
    }

    function getBestMinimaxMove(board) {
        let bestScore = -Infinity;
        let bestMove = null;

        for (let i = 0; i < 9; i++) {
            if (board[i] === null) {
                board[i] = 'O';
                const score = minimax(board, 0, false, -Infinity, Infinity);
                board[i] = null;
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = i;
                }
            }
        }
        return bestMove;
    }

    function minimax(board, depth, isMaximizing, alpha, beta) {
        const winO = checkWin(board, 'O');
        if (winO.hasWon) return 10 - depth;

        const winX = checkWin(board, 'X');
        if (winX.hasWon) return depth - 10;

        if (checkTie(board)) return 0;

        if (isMaximizing) {
            let maxEval = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = 'O';
                    const evaluation = minimax(board, depth + 1, false, alpha, beta);
                    board[i] = null;
                    maxEval = Math.max(maxEval, evaluation);
                    alpha = Math.max(alpha, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return maxEval;
        } else {
            let minEval = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === null) {
                    board[i] = 'X';
                    const evaluation = minimax(board, depth + 1, true, alpha, beta);
                    board[i] = null;
                    minEval = Math.min(minEval, evaluation);
                    beta = Math.min(beta, evaluation);
                    if (beta <= alpha) break;
                }
            }
            return minEval;
        }
    }

    // Reset current board for a new game
    function resetBoard() {
        state.board.fill(null);
        state.currentPlayer = 'X';
        state.gameActive = true;
        state.winningCombination = null;

        cells.forEach(cell => {
            cell.textContent = '';
            cell.className = 'cell';
            cell.disabled = false;
        });

        updateTurnIndicator();
        sfx.playReset();
    }

    // Reset all scores
    function resetScores() {
        state.scores.X = 0;
        state.scores.O = 0;
        state.scores.ties = 0;
        saveScores();
        updateScoreboard();
        resetBoard();
    }

    // Mode switching
    function setGameMode(mode) {
        state.gameMode = mode;
        modeButtons.forEach(btn => {
            if (btn.getAttribute('data-mode') === mode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        updateScoreboard();
        resetBoard();
    }

    // Event Listeners
    boardElement.addEventListener('click', handleCellClick);
    restartBtn.addEventListener('click', resetBoard);
    resetScoresBtn.addEventListener('click', resetScores);

    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.getAttribute('data-mode');
            if (mode) setGameMode(mode);
        });
    });

    // Keyboard navigation support
    boardElement.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            if (e.target.classList.contains('cell')) {
                e.preventDefault();
                e.target.click();
            }
        }
    });

    // Initialize Game
    function init() {
        loadSavedScores();
        updateScoreboard();
        resetBoard();
    }

    init();
})();
