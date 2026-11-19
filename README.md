# Poké Explorer

A small Pokémon browser built with plain HTML, CSS and JavaScript. Search for a Pokémon, see it as a card, filter the cards by type, and open a detail page with its stats. Every Pokémon you search is saved in your browser, so it is still there the next time you open the page.

Data comes from the free [PokéAPI](https://pokeapi.co/). No account or API key is needed.

## Features

- Search by name or by Pokédex number
- Partial search for Pokémon already saved on your device (for example, `pi` shows every saved Pokémon with "pi" in its name)
- Filter cards by type (the dropdown only lists types you have saved)
- Cards are kept in order of Pokédex number
- Detail page with image, number, types, height, weight, abilities and base stats
- Loading message while the API responds
- Saved Pokémon are stored in `localStorage` and reloaded on startup, so repeat searches make no network request

## Built with

- HTML
- CSS
- JavaScript (no frameworks or libraries)
- [PokéAPI](https://pokeapi.co/docs/v2) for the data

## Project structure

```
index.html   page layout (list screen and detail screen)
style.css    styling
app.js       all the logic: search, cache, cards, filter, detail view
```

## Getting started

1. Put the three files in one folder.
2. Start a local server from that folder. Any of these works:

   ```bash
   py -m http.server 8000
   ```

   or use the **Live Server** extension in VS Code.
3. Open `http://localhost:8000/` in your browser.

Run it through a server like this instead of double-clicking `index.html`.

## How to use

1. Type a Pokémon name (for example `pikachu`) or number (for example `25`) and press Search.
2. The card appears in the grid. Searching again for the same Pokémon shows only that card.
3. Clear the search box to bring the full list back.
4. Pick a type in the dropdown to show only cards of that type.
5. Click a card to open its detail page, and use Back to return to the list.

## How it works

- **Search order.** The app looks in the saved Pokémon first, and only calls the API when nothing matches. The API needs a full name or a number, so partial search works only on Pokémon already saved.
- **API call.** `GET https://pokeapi.co/api/v2/pokemon/{name or id}`
- **Saved data.** To keep storage small, only the fields the app needs are kept: id, name, image, types, height, weight, abilities and stats. They are stored in `localStorage` under the key `pokemonCache`.
- **No duplicates.** Each Pokémon is drawn once, tracked by its id.
- **Rendering.** Cards are built with `createElement`. One click listener on the grid handles every card.

## Resetting your saved data

Open the browser DevTools console and run:

```javascript
localStorage.removeItem("pokemonCache");
```

Then reload the page.

## Known limitations

- Partial search only works on Pokémon you have already searched for.
- Browser storage is limited (around 5 MB), which is plenty for hundreds of Pokémon in this format.
- Saved Pokémon live in one browser on one device. They do not sync.

## Ideas for later

- Show a "Load more" list so you can browse without searching
- Favorites list
- Sort dropdown (name, number)
- Evolution chain on the detail page

## Credits

Pokémon data and images are provided by [PokéAPI](https://pokeapi.co/). Pokémon and Pokémon character names are trademarks of Nintendo, Creatures Inc. and GAME FREAK Inc. This is a personal learning project and is not affiliated with or endorsed by them.
