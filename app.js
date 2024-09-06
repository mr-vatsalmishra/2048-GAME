const board = [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
];
const boardContainer = document.querySelector(".board");

document.addEventListener('swiped-up', function(e) {
    moveUp();
    postMove();
});
document.addEventListener('swiped-down', function(e) {
    moveDown();
    postMove();
});
document.addEventListener('swiped-left', function(e) {
    moveLeft();
    postMove();
});
document.addEventListener('swiped-right', function(e) {
    moveRight();
    postMove();
});

function display() {
    let elem = 0;
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = boardContainer.children[elem];
            if (board[row][col] === 0) {
                tile.style.color = "";
                tile.innerText = "";
                tile.style.backgroundColor = "";
            } else {
                tile.style.color = board[row][col] >= 128 ? "white" : "black";
                tile.innerText = board[row][col];
                tile.style.backgroundColor = changeColor(row, col);
            }
            elem++;
        }
    }
}

function assignRandom() {
    const emptyTiles = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) {
                emptyTiles.push({ row, col });
            }
        }
    }

    if (emptyTiles.length === 0) {
        checkGameOver();
        return;
    }

    const { row, col } = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
    board[row][col] = Math.random() > 0.9 ? 4 : 2;
}

function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (board[row][col] === 0) return false;
            if (col < 3 && board[row][col] === board[row][col + 1]) return false;
            if (row < 3 && board[row][col] === board[row + 1][col]) return false;
        }
    }
    console.log("Game Over");
    return true;
}

function postMove() {
    assignRandom();
    display();
    if (checkGameOver()) {
        alert("Game Over! Try again.");
    }
}

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case "ArrowUp":
            moveUp();
            break;
        case "ArrowDown":
            moveDown();
            break;
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        default:
            return;
    }
    postMove();
});

function changeColor(row, col) {
    const value = board[row][col];
    const lightness = 100 - Math.log2(value) * 8;
    return `hsla(45, 85%, ${lightness}%, 1)`;
}

function moveUp() {
    for (let col = 0; col < 4; col++) {
        let newRow = 0;
        let lastMergeRow = -1;
        for (let row = 0; row < 4; row++) {
            if (board[row][col] !== 0) {
                if (newRow > 0 && board[newRow - 1][col] === board[row][col] && lastMergeRow !== newRow - 1) {
                    board[newRow - 1][col] *= 2;
                    board[row][col] = 0;
                    lastMergeRow = newRow - 1;
                } else {
                    if (row !== newRow) {
                        board[newRow][col] = board[row][col];
                        board[row][col] = 0;
                    }
                    newRow++;
                }
            }
        }
    }
}

function moveDown() {
    for (let col = 0; col < 4; col++) {
        let newRow = 3;
        let lastMergeRow = 4;
        for (let row = 3; row >= 0; row--) {
            if (board[row][col] !== 0) {
                if (newRow < 3 && board[newRow + 1][col] === board[row][col] && lastMergeRow !== newRow + 1) {
                    board[newRow + 1][col] *= 2;
                    board[row][col] = 0;
                    lastMergeRow = newRow + 1;
                } else {
                    if (row !== newRow) {
                        board[newRow][col] = board[row][col];
                        board[row][col] = 0;
                    }
                    newRow--;
                }
            }
        }
    }
}

function moveLeft() {
    for (let row = 0; row < 4; row++) {
        let newCol = 0;
        let lastMergeCol = -1;
        for (let col = 0; col < 4; col++) {
            if (board[row][col] !== 0) {
                if (newCol > 0 && board[row][newCol - 1] === board[row][col] && lastMergeCol !== newCol - 1) {
                    board[row][newCol - 1] *= 2;
                    board[row][col] = 0;
                    lastMergeCol = newCol - 1;
                } else {
                    if (col !== newCol) {
                        board[row][newCol] = board[row][col];
                        board[row][col] = 0;
                    }
                    newCol++;
                }
            }
        }
    }
}

function moveRight() {
    for (let row = 0; row < 4; row++) {
        let newCol = 3;
        let lastMergeCol = 4;
        for (let col = 3; col >= 0; col--) {
            if (board[row][col] !== 0) {
                if (newCol < 3 && board[row][newCol + 1] === board[row][col] && lastMergeCol !== newCol + 1) {
                    board[row][newCol + 1] *= 2;
                    board[row][col] = 0;
                    lastMergeCol = newCol + 1;
                } else {
                    if (col !== newCol) {
                        board[row][newCol] = board[row][col];
                        board[row][col] = 0;
                    }
                    newCol--;
                }
            }
        }
    }
}

// Initialize the game
assignRandom();
assignRandom();
display();
