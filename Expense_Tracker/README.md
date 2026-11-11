# Expense Tracker

A simple expense management app built with HTML, CSS, and JavaScript. It helps users track income and expenses, view totals, and filter transaction history in real time.

## Features

- Add income and expense transactions
- Track total balance, income, and expenses
- View transaction history with category and date
- Filter transactions by type: all, income, or expense
- Delete individual transactions
- Responsive single-page UI

## How it works

1. Open `index.html` in the browser.
2. Enter a transaction description, amount, type, and category.
3. Click the Add Transaction button.
4. The totals update automatically.
5. Use the filter dropdown to view all, income-only, or expense-only records.
6. Delete any transaction if needed.

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
- `app.js` — logic for adding, deleting, filtering, and calculating totals

## Notes

This app stores data only in the browser session while the page is open. Transactions are not persisted to localStorage unless that feature is added later.

## Author

Jayadev Rajendran
