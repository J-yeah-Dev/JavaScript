# 💣 Minesweeper

A small browser-based Minesweeper game built with plain HTML, CSS, and JavaScript.

## Overview

This project is a classic 8x8 Minesweeper board with 5 hidden mines. The player reveals tiles, avoids bombs, and clears the board by uncovering all safe cells.

## Gameplay

- The board is generated on load as an 8x8 grid.
- 5 mines are placed randomly before the game begins.
- Left-click a tile to reveal it.
- If a tile contains a mine, the game ends and all mines are shown.
- Numbers on safe tiles indicate how many adjacent mines are nearby.
- Empty tiles automatically expand to reveal surrounding safe spaces.
- The game is won when all non-mine tiles are revealed.
- The Reset button creates a fresh board with a new mine layout.

## Controls

- Click a tile to reveal it.
- Use the 🚩 button to toggle flag mode.
- In flag mode, clicking a tile places or removes a flag marker.
- Use the Reset button to restart the game with a new board.

## Files

- `index.html` – page structure and game container
- `style.css` – board styling and tile colors
- `app.js` – game logic, mine placement, reveal logic, and win/loss handling

## Run it locally

Open `index.html` in a browser to play.

If you prefer a local web server, you can also run one from the project folder and open the page in the browser.

## Notes

This is a simple implementation without extra features like difficulty levels or a timer. It focuses on the core Minesweeper gameplay loop, including a reset button for restarting with a new board.
