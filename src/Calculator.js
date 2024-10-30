const checkWin = (board) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};


const minimax = (board,depth, isMaximizingPlayer) => {
    let winner = checkWin(board);
    if (winner === 'X') return -10 + depth;
    if (winner === 'O') return 10 - depth;
    if (winner === null) return 0;
    if (board.every(cell => cell !== null)) return 0;

    if (isMaximizingPlayer) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                const boardCopy = board.slice();
                boardCopy[i] = 'O';
                const score = minimax(boardCopy, depth + 1, false);
                bestScore = Math.max(bestScore, score);
            }
        }
        return bestScore;
    }
    else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (!board[i]) {
                const boardCopy = board.slice();
                boardCopy[i] = 'X';
                const score = minimax(boardCopy, depth + 1, true);
                bestScore = Math.min(bestScore, score);
            }
        }
        return bestScore;
    }
};

const findBestMove = (board) => {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < 9; i++) {
        if (!board[i]) {
            const boardCopy = board.slice();
            boardCopy[i] = 'O';
            const score = minimax(boardCopy, 0, false);
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
};


export {
    checkWin,
    findBestMove
};