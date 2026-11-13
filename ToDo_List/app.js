let todoList = JSON.parse(localStorage.getItem("todoList")) || [];
let currentFilter = "all";
let draggedId = null;

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const listEl = document.getElementById("todo-list");
const emptyMessage = document.getElementById("empty-message");
const taskCount = document.getElementById("task-count");
const filterBar = document.querySelector(".filter-bar");

function saveTodos() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}

function addTodo(name) {
  todoList.push({
    id: crypto.randomUUID(),
    name: name,
    completed: false,
  });
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todoList = todoList.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(todo, isCompleted) {
  todo.completed = isCompleted;
  saveTodos();
  renderTodos();
}

function toggleTabs(todo) {
  saveTodos();
  renderTodos();
}

filterBar.addEventListener("click", () => {
  const btn = event.target.closest(".filter-btn");
  if (!btn) return;
  currentFilter = btn.dataset.filter;  
  document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
  btn.classList.add("active");
  renderTodos();
});


function createTodoItem(todo) {
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.draggable = true;
  li.dataset.id = todo.id;
  if (todo.completed) li.classList.add("completed");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-check");
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    toggleTodo(todo, checkbox.checked);
  });

  const text = document.createElement("span");
  text.classList.add("todo-text");
  text.innerText = todo.name;

  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText = "Delete";
  deleteBtn.addEventListener("click", () => {
    deleteTodo(todo.id);
  });

  li.append(checkbox, text, deleteBtn);
  return li;
}

function renderTodos() {
  listEl.innerHTML = "";

  const visibleTodos = todoList.filter((todo) => {
    if (currentFilter === "active") return !todo.completed;
    if (currentFilter === "completed") return todo.completed;
    return true; // "all"
  });

  visibleTodos.forEach((todo) => listEl.appendChild(createTodoItem(todo)));

  emptyMessage.hidden = visibleTodos.length > 0;

  const remaining = todoList.filter((todo) => !todo.completed).length;
  taskCount.innerText = `${remaining} ${remaining === 1 ? "task" : "tasks"} left`;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();                   

  const name = input.value.trim();
  if (name === "") return;        

  addTodo(name);
  form.reset(); 
});             

function clearDragOver() {
  listEl.querySelectorAll(".drag-over").forEach((el) => el.classList.remove("drag-over"));
}

listEl.addEventListener("dragstart", (event) => {
  const item = event.target.closest(".todo-item");
  if (!item) return;

  draggedId = item.dataset.id;
  item.classList.add("dragging");
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("text/plain", draggedId); // Firefox needs this to start a drag
});

listEl.addEventListener("dragover", (event) => {
  event.preventDefault(); // without this, "drop" never fires

  const item = event.target.closest(".todo-item");
  clearDragOver();
  if (item && item.dataset.id !== draggedId) {
    item.classList.add("drag-over");
  }
});

listEl.addEventListener("drop", (event) => {
  event.preventDefault();

  const targetItem = event.target.closest(".todo-item");
  if (!targetItem || !draggedId) return;

  const targetId = targetItem.dataset.id;
  if (targetId === draggedId) return;

  // find positions in the FULL array by id (works even when a filter is active)
  const fromIndex = todoList.findIndex((todo) => todo.id === draggedId);
  const toIndex = todoList.findIndex((todo) => todo.id === targetId);

  const [moved] = todoList.splice(fromIndex, 1); // remove from old spot
  todoList.splice(toIndex, 0, moved); // insert at new spot

  saveTodos();
  renderTodos();
});

listEl.addEventListener("dragend", () => {
  draggedId = null;
  clearDragOver();
  const dragging = listEl.querySelector(".dragging");
  if (dragging) dragging.classList.remove("dragging");
});

renderTodos();