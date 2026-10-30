
(() => {
  const LINES = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  const boardEl = document.getElementById('board');
  const statusEl = document.getElementById('status');
  const scoreEls = { X: document.getElementById('n-x'), O: document.getElementById('n-o'), D: document.getElementById('n-d') };
  const turnEls = { X: document.getElementById('score-x'), O: document.getElementById('score-o') };

  let board, current, over, vsCpu = true, locked = false;
  const scores = { X: 0, O: 0, D: 0 };

  // Build the cells once
  const cells = Array.from({ length: 9 }, (_, i) => {
    const b = document.createElement('button');
    b.className = 'cell';
    b.setAttribute('aria-label', `Cell ${i + 1}`);
    b.addEventListener('click', () => onCellClick(i));
    boardEl.appendChild(b);
    return b;
  });

  function winnerOf(b) {
    for (const line of LINES) {
      const [a, c, d] = line;
      if (b[a] && b[a] === b[c] && b[a] === b[d]) return { player: b[a], line };
    }
    return null;
  }

  function newGame() {
    board = Array(9).fill(null);
    current = 'X';
    over = false;
    locked = false;
    cells.forEach(c => { c.innerHTML = ''; c.className = 'cell'; c.disabled = false; });
    render();
  }

  function render() {
    turnEls.X.classList.toggle('turn', !over && current === 'X');
    turnEls.O.classList.toggle('turn', !over && current === 'O');
    if (!over) {
      const who = vsCpu ? (current === 'X' ? 'Your' : "Computer's") : `Player ${current}'s`;
      statusEl.textContent = `${who} turn`;
    }
    scoreEls.X.textContent = scores.X;
    scoreEls.O.textContent = scores.O;
    scoreEls.D.textContent = scores.D;
  }

  function place(i) {
    board[i] = current;
    const c = cells[i];
    c.innerHTML = `<span class="mark">${current}</span>`;
    c.classList.add(current.toLowerCase());
    c.disabled = true;

    const win = winnerOf(board);
    if (win) {
      over = true;
      win.line.forEach(k => cells[k].classList.add('win'));
      cells.forEach(el => el.disabled = true);
      scores[win.player]++;
      statusEl.textContent = vsCpu
        ? (win.player === 'X' ? 'You win! 🎉' : 'Computer wins!')
        : `Player ${win.player} wins! 🎉`;
    } else if (board.every(Boolean)) {
      over = true;
      scores.D++;
      statusEl.textContent = "It's a draw!";
    } else {
      current = current === 'X' ? 'O' : 'X';
    }
    render();
  }

  function onCellClick(i) {
    if (over || locked || board[i]) return;
    place(i);
    if (!over && vsCpu && current === 'O') {
      locked = true;
      setTimeout(() => {
        place(bestMove(board));
        locked = false;
      }, 350);
    }
  }

  // Minimax: computer plays O (unbeatable)
  function bestMove(b) {
    let best = -Infinity, move = -1;
    for (let i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = 'O';
      const score = minimax(b, false, 0);
      b[i] = null;
      if (score > best) { best = score; move = i; }
    }
    return move;
  }

  function minimax(b, isMax, depth) {
    const w = winnerOf(b);
    if (w) return w.player === 'O' ? 10 - depth : depth - 10;
    if (b.every(Boolean)) return 0;
    let best = isMax ? -Infinity : Infinity;
    for (let i = 0; i < 9; i++) {
      if (b[i]) continue;
      b[i] = isMax ? 'O' : 'X';
      const s = minimax(b, !isMax, depth + 1);
      b[i] = null;
      best = isMax ? Math.max(best, s) : Math.min(best, s);
    }
    return best;
  }

  function setMode(cpu) {
    vsCpu = cpu;
    document.getElementById('mode-cpu').classList.toggle('active', cpu);
    document.getElementById('mode-2p').classList.toggle('active', !cpu);
    document.getElementById('label-x').textContent = cpu ? 'You (X)' : 'Player X';
    document.getElementById('label-o').textContent = cpu ? 'CPU (O)' : 'Player O';
    scores.X = scores.O = scores.D = 0;
    newGame();
  }

  document.getElementById('mode-cpu').addEventListener('click', () => setMode(true));
  document.getElementById('mode-2p').addEventListener('click', () => setMode(false));
  document.getElementById('new-game').addEventListener('click', newGame);
  document.getElementById('reset-scores').addEventListener('click', () => {
    scores.X = scores.O = scores.D = 0;
    newGame();
  });

  newGame();
})();