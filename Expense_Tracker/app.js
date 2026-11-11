total_balance = 0;
total_income = 0;
total_expenses = 0;

transactions = [];

const form = document.getElementById("transaction-form");

function formatDate(d) {
  const day = String(d.getDate()).padStart(2, "0");
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const description = document.getElementById("description").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  transactions.push({
    id: crypto.randomUUID(),
    description: description,
    amount: amount,
    type: type,
    category: category,
    date: formatDate(new Date()),
  });

  form.reset();

  recalculateTotals();
  displayTransactions();
});

function recalculateTotals() {
  total_balance = 0;
  total_income = 0;
  total_expenses = 0;

  transactions.forEach((t) => {
    const amt = parseFloat(t.amount);
    if (t.type === "income") {
      total_balance += amt;
      total_income += amt;
    } else {
      total_balance -= amt;
      total_expenses += amt;
    }
  });

  document.getElementById("total-balance").innerText = total_balance.toFixed(2);
  document.getElementById("total-income").innerText = total_income.toFixed(2);
  document.getElementById("total-expenses").innerText = total_expenses.toFixed(2);
}

function displayTransactions() {
  const filter = document.getElementById("filter-type").value;
  const parentList = document.getElementById("transaction-list");
  parentList.innerHTML = "";

  const filteredTransactions = transactions.filter((transaction) => {
    return filter === "all" || transaction.type === filter;
  });

  if (filteredTransactions.length === 0) {
    parentList.innerHTML = `
      <p class="empty-message" id="empty-message">
        No transactions yet. Add one above!
      </p>
    `;
    return;
  }

  filteredTransactions.forEach((element) => {
    var sign = "";
    var transaction_class = "";

    if (element.type === "income") {
      sign = "+";
      transaction_class = "income-text";
    } else {
      sign = "-";
      transaction_class = "expense-text";
    }

    var div1 = document.createElement("div");
    div1.classList.add("transaction-item");

    var div2 = document.createElement("div");
    div2.classList.add("transaction-info");

    var div2h3 = document.createElement("h3");
    div2h3.innerText = element.description;

    var div2p = document.createElement("p");
    div2p.innerText = element.category + " · " + element.date;

    var div3 = document.createElement("div");
    div3.classList.add("transaction-actions");

    var div3span = document.createElement("span");
    div3span.classList.add("transaction-amount");
    div3span.classList.add(transaction_class);
    div3span.innerText = sign + " ₹" + element.amount;

    var button = document.createElement("button");
    button.innerText = "Delete";
    button.classList.add("delete-btn");
    button.dataset.id = element.id; // UUID stored here

    parentList.appendChild(div1);
    div1.appendChild(div2);
    div2.appendChild(div2h3);
    div2.appendChild(div2p);
    div1.appendChild(div3);
    div3.appendChild(div3span);
    div3.appendChild(button);
  });
}

const transactionList = document.getElementById("transaction-list");

transactionList.addEventListener("click", (event) => {
  const button = event.target.closest(".delete-btn");
  if (!button) return;

  const id = button.dataset.id;
  deleteTransaction(id);
});

function deleteTransaction(id) {
  transactions = transactions.filter((t) => t.id !== id);
  recalculateTotals();
  displayTransactions();
}

const filterType = document.getElementById("filter-type");

filterType.addEventListener("change", () => {
  displayTransactions();
});