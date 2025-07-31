const cells = Array.from(document.querySelectorAll(".cell"));
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill("");
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // rows
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // cols
  [0, 4, 8],
  [2, 4, 6], // diags
];

function checkWin() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(pattern);
      return board[a];
    }
  }
  return null;
}

function checkDraw() {
  return board.every((cell) => cell) && !checkWin();
}

function highlightWin(pattern) {
  pattern.forEach((idx) => {
    cells[idx].style.backgroundColor = "#4CAF50";
  });
}

function handleCellClick(e) {
  const idx = cells.indexOf(e.target);
  if (!gameActive || board[idx]) return;

  board[idx] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.style.backgroundColor = "gold";

  const winner = checkWin();
  if (winner) {
    status.textContent = `Player ${winner} wins!`;
    gameActive = false;
    return;
  }
  if (checkDraw()) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = Array(9).fill("");
  currentPlayer = "X";
  gameActive = true;
  status.textContent = "Player X's turn";
  cells.forEach((cell) => {
    cell.textContent = "";
    cell.style.backgroundColor = "";
  });
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
