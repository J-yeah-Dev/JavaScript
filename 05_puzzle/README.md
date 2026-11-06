# Sliding Puzzle Game

This project is a small browser-based sliding puzzle built with HTML, CSS, and JavaScript. It displays a 3x3 image board where one space is empty, and the goal is to rearrange the tiles into the correct order by sliding pieces into the blank space.

## How it works

- The board contains 9 image tiles arranged in a 3x3 grid.
- One tile is the blank space, represented by the image file named 3.jpg.
- Clicking a tile that is directly adjacent to the blank space swaps the two positions.
- Each valid move increases the turn counter.
- The puzzle is solved when the image is restored to its original arrangement.

## How to play

1. Open the project in a browser.
2. Click a tile next to the empty space.
3. Continue sliding tiles until the full image is reassembled.
4. Watch the turn counter update with each valid move.

## Controls

- Mouse click: select a tile adjacent to the empty space

## Run the game

You can open the project directly in a browser by loading the index.html file, or serve it locally:

```bash
python -m http.server
```

Then visit http://localhost:8000 in your browser.

## Project files

- index.html — page structure and board container
- style.css — layout and tile styling
- app.js — puzzle logic, tile creation, movement checks, and turn tracking
- images/ — puzzle image assets used for each tile
