const cells = document.querySelectorAll("[data-cell]");
const statusText = document.getElementById("status");
const score1 = document.getElementById("score1");
const score2 = document.getElementById("score2");

let board = Array(9).fill(null);
let knightTurn = true;
let active = true;
let p1Score = 0;
let p2Score = 0;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => play(cell, index));
});

function play(cell, index) {
  if (!active || board[index]) return;

  board[index] = knightTurn ? "♞" : "♚";
  cell.textContent = board[index];

  if (checkWin()) {
    active = false;
    if (knightTurn) {
      p1Score++;
      score1.textContent = p1Score;
    } else {
      p2Score++;
      score2.textContent = p2Score;
    }
    statusText.textContent = "Winner declared 🎉";
    return;
  }

  if (!board.includes(null)) {
    statusText.textContent = "Draw Match!";
    active = false;
    return;
  }

  knightTurn = !knightTurn;
  updateTurnText();
}

function checkWin() {
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      pattern.forEach(i => cells[i].classList.add("win"));
      return true;
    }
    return false;
  });
}

function updateTurnText() {
  const p1 = document.getElementById("p1").value || "Knight";
  const p2 = document.getElementById("p2").value || "King";
  statusText.textContent = knightTurn ? `${p1}'s Turn ♞` : `${p2}'s Turn ♚`;
}

function restartRound() {
  board.fill(null);
  active = true;
  knightTurn = true;
  cells.forEach(c => {
    c.textContent = "";
    c.classList.remove("win");
  });
  updateTurnText();
}

function resetAll() {
  restartRound();
  p1Score = 0;
  p2Score = 0;
  score1.textContent = "0";
  score2.textContent = "0";
}
