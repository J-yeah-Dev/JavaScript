# 2048 Game

A simple browser-based 2048 game built with HTML, CSS, and JavaScript.

## Features

- 4x4 game board
- Arrow key controls
- Score tracking
- Tile merging logic
- Game-over reset

## How to Play

1. Open `index.html` in your browser.
2. Use the arrow keys to move the tiles.
3. When two identical tiles touch, they merge into one tile with double the value.
4. Keep merging tiles to reach the highest score possible.
5. If the board fills up and no moves remain, the game ends and resets.

## Controls

- Up Arrow: move tiles upward
- Down Arrow: move tiles downward
- Left Arrow: move tiles left
- Right Arrow: move tiles right

## Run the Game

Open the project folder and launch `index.html` in a browser.

You can also use a local web server if you prefer, for example:

```bash
python -m http.server
```

Then open `http://localhost:8000` in your browser.

## Project Files

- `index.html` — page structure
- `style.css` — board and tile styling
- `app.js` — game logic
