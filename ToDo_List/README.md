# To-Do List

A simple browser-based task manager for organizing daily activities built with plain HTML, CSS, and JavaScript. This project allows users to add tasks, mark them complete, remove them, filter by status, and drag tasks to reorder them within the list.

## Features

- Add new tasks to the list
- Mark tasks as complete or active
- Delete tasks individually
- Filter tasks by All, Active, and Completed
- View the remaining task count in real time
- Drag and drop to reorder tasks
- Save tasks in the browser using `localStorage`

## Tech Stack

- HTML5 for the page structure
- CSS3 for styling and layout
- JavaScript (Vanilla JS) for app logic and interactivity
- Browser `localStorage` for persistent task storage

## How to Use

1. Open `index.html` in your browser.
2. Enter a task in the input field and click Add.
3. Use the checkbox to mark a task as complete or incomplete.
4. Click Delete to remove a task.
5. Use the filter buttons to view tasks by status.
6. Drag any task and drop it in a new position to reorder the list.

## Run the Project

Open the project folder and launch `index.html` directly in the browser.

You can also serve it locally with:

```bash
python -m http.server
```

Then open `http://localhost:8000` in the browser.

## Project Files

- `index.html` — page structure and UI layout
- `style.css` — visual design and task list styling
- `app.js` — task management, filters, drag-and-drop reorder logic, and persistence

## Author

Jayadev Rajendran