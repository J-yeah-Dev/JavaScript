
(function () {
  // Six shapes drawn on a 40 by 40 grid, five colours. A card is one shape in one colour.
  var SHAPE_NAMES = ['circle', 'square', 'triangle', 'diamond', 'hollow circle', 'hexagon'];
  var SHAPES = [
    '<circle cx="20" cy="20" r="15"/>',
    '<rect x="6" y="6" width="28" height="28"/>',
    '<polygon points="20,5 36,34 4,34"/>',
    '<polygon points="20,3 37,20 20,37 3,20"/>',
    '<path d="M20 5a15 15 0 1 0 0 30a15 15 0 1 0 0-30zm0 8a7 7 0 1 1 0 14a7 7 0 1 1 0-14z" fill-rule="evenodd"/>',
    '<polygon points="12,5 28,5 37,20 28,35 12,35 3,20"/>'
  ];
  var COLOR_NAMES = ['red', 'blue', 'yellow', 'green'];
  var COLORS = ['var(--red)', 'var(--blue)', 'var(--yellow)', 'var(--green)'];
  var SIZES = { s: { pairs: 6, cols: 4 }, m: { pairs: 8, cols: 4 }, l: { pairs: 12, cols: 6 } };

  var boardEl = document.getElementById('board');
  var movesEl = document.getElementById('moves');
  var timeEl = document.getElementById('time');
  var bestEl = document.getElementById('best');
  var resultEl = document.getElementById('result');

  var size = 'm', cards = [], open = [], lock = false, moves = 0, matched = 0;
  var startedAt = 0, timer = null, elapsed = 0;

  function readBest() {
    try { var v = localStorage.getItem('pairs-best-' + size); return v ? JSON.parse(v) : null; } catch (e) { return null; }
  }
  function writeBest(v) {
    try { localStorage.setItem('pairs-best-' + size, JSON.stringify(v)); } catch (e) {}
  }
  function fmt(s) { return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
  function showBest() {
    var b = readBest();
    bestEl.textContent = b ? b.moves + ' / ' + fmt(b.time) : '–';
  }

  function shuffle(a) {
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1)), t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function stopTimer() { if (timer) { clearInterval(timer); timer = null; } }
  function startTimer() {
    startedAt = Date.now();
    timer = setInterval(function () {
      elapsed = Math.floor((Date.now() - startedAt) / 1000);
      timeEl.textContent = fmt(elapsed);
    }, 250);
  }

  function reset() {
    stopTimer();
    var cfg = SIZES[size];
    open = []; lock = false; moves = 0; matched = 0; elapsed = 0; startedAt = 0;
    movesEl.textContent = '0'; timeEl.textContent = '0:00';
    resultEl.className = 'result';
    resultEl.innerHTML = '<p id="msg">Flip two cards. Match every pair in as few moves as you can.</p>';
    boardEl.setAttribute('data-cols', String(cfg.cols));
    boardEl.innerHTML = '';

    // All 30 shape and colour combinations, shuffled. This game uses the first few.
    var combos = [];
    for (var s = 0; s < SHAPES.length; s++) {
      for (var c = 0; c < COLORS.length; c++) combos.push({ shape: s, color: c });
    }
    shuffle(combos);
    var chosen = combos.slice(0, cfg.pairs);

    var deck = [];
    for (var i = 0; i < chosen.length; i++) { deck.push(chosen[i]); deck.push(chosen[i]); }
    shuffle(deck);

    cards = deck.map(function (combo, idx) {
      var name = COLOR_NAMES[combo.color] + ' ' + SHAPE_NAMES[combo.shape];
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'card';
      btn.id = 'card-' + idx;
      btn.setAttribute('aria-label', 'Card ' + (idx + 1) + ', face down');
      btn.innerHTML =
        '<span class="inner">' +
          '<span class="face back"></span>' +
          '<span class="face front"><svg viewBox="0 0 40 40" fill="' + COLORS[combo.color] + '" aria-hidden="true">' + SHAPES[combo.shape] + '</svg></span>' +
        '</span>';
      btn.addEventListener('click', function () { flip(idx); });
      boardEl.appendChild(btn);
      return { key: combo.color + '-' + combo.shape, name: name, el: btn, up: false, done: false };
    });
    showBest();
  }

  function setLabel(c, idx) {
    c.el.setAttribute('aria-label', 'Card ' + (idx + 1) + (c.done ? ', matched, ' + c.name : c.up ? ', ' + c.name : ', face down'));
  }

  function flip(idx) {
    var c = cards[idx];
    if (lock || c.up || c.done) return;
    if (!timer && matched === 0 && moves === 0 && open.length === 0) startTimer();
    c.up = true; c.el.classList.add('up'); setLabel(c, idx);
    open.push(idx);
    if (open.length < 2) return;

    moves++; movesEl.textContent = String(moves);
    var a = cards[open[0]], b = cards[open[1]];
    if (a.key === b.key) {
      a.done = b.done = true;
      a.el.classList.add('done'); b.el.classList.add('done');
      setLabel(a, open[0]); setLabel(b, open[1]);
      open = []; matched++;
      if (matched === SIZES[size].pairs) win();
    } else {
      lock = true;
      a.el.classList.add('miss'); b.el.classList.add('miss');
      var first = open[0], second = open[1];
      setTimeout(function () {
        [first, second].forEach(function (i) {
          var k = cards[i];
          k.up = false; k.el.classList.remove('up', 'miss'); setLabel(k, i);
        });
        open = []; lock = false;
      }, 850);
    }
  }

  function win() {
    stopTimer();
    elapsed = Math.floor((Date.now() - startedAt) / 1000);
    timeEl.textContent = fmt(elapsed);
    var prev = readBest();
    var better = !prev || moves < prev.moves || (moves === prev.moves && elapsed < prev.time);
    if (better) writeBest({ moves: moves, time: elapsed });
    showBest();
    resultEl.className = 'result won';
    resultEl.innerHTML =
      '<p>' + (better ? 'New best. ' : '') + 'Cleared in ' + moves + ' moves and ' + fmt(elapsed) + '.</p>' +
      '<button type="button" class="again" id="again">Play again</button>';
    document.getElementById('again').addEventListener('click', reset);
    document.getElementById('again').focus();
  }

  Array.prototype.forEach.call(document.querySelectorAll('.sizes button'), function (b) {
    b.addEventListener('click', function () {
      size = b.getAttribute('data-size');
      Array.prototype.forEach.call(document.querySelectorAll('.sizes button'), function (o) {
        o.setAttribute('aria-pressed', o === b ? 'true' : 'false');
      });
      reset();
    });
  });

  reset();
})();