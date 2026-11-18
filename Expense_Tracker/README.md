# Expense Tracker

A simple expense management app built with HTML, CSS, and JavaScript. It helps users track income and expenses, view totals, and filter transaction history in real time.

## Features

- Add income and expense transactions
- Track total balance, income, and expenses
- View transaction history with category and date
- Filter transactions by type: all, income, or expense
- Delete individual transactions
- Persist transactions automatically using browser `localStorage`
- Responsive single-page UI

## How it works

1. Open `index.html` in the browser.
2. Enter a transaction description, amount, type, and category.
3. Click the Add Transaction button.
4. The totals update automatically and the transaction is saved to `localStorage`.
5. Use the filter dropdown to view all, income-only, or expense-only records.
6. Delete any transaction if needed.

## Data Storage

Transactions are stored locally in your browser using the `localStorage` API under the key `"expense_tracker_data"`. Each entry is saved as a JSON object containing a unique `crypto.randomUUID()`, description, amount, type, category, and formatted date. Data remains saved across page reloads and browser restarts on the same device.

## Run the app

You can open the project directly in a browser:

- Open `index.html` in your browser

Or serve it locally with a simple web server:

```bash
python -m http.server
```

Then visit:

```text
http://localhost:8000
```

## Project files

- `index.html` — app structure and form layout
- `style.css` — styling for the dashboard and transaction cards
- `app.js` — logic for adding, deleting, filtering, calculating totals, and syncing with `localStorage`

## Notes

Because data is saved in your browser's `localStorage`, clearing your browser site data or opening the app in a private/incognito window will start with an empty transaction list.
