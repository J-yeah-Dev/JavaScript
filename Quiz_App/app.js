const TIME_LIMIT = 15;
let timerId = null;
let answered = false;   

document.getElementById("start_screen").hidden = false;
document.getElementById("quiz_screen").hidden = true;
document.getElementById("result_screen").hidden = true;

const start = document.querySelector(".btn-start");

start.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  quizQuestions = getRandomQuestions(10);
  document.getElementById("result_screen").innerHTML = "";
  document.getElementById("start_screen").hidden = true;
  document.getElementById("quiz_screen").hidden = false;

  renderQuestion();
});

function getRandomQuestions(count) {
  const copy = [...questions]; 

  // Fisher-Yates shuffle
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy.slice(0, count);
}

function renderQuestion(count) {

  const q = quizQuestions[currentIndex];
  const parentList = document.getElementById("quiz_screen");
  parentList.innerHTML = "";

  const form = document.createElement("form");
  form.id = "quiz-form";

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearInterval(timerId);
    const answer = form.elements.answers.value;
    if (answer !== "" && Number(answer) === q.correctIndex) score++;

    currentIndex++;
    if (currentIndex < quizQuestions.length) {
      renderQuestion();
    } else {
          
      const parentList2 = document.getElementById("result_screen");
      const p = document.createElement("p");
      p.innerText = "Your score: " + score + "/" + quizQuestions.length;
      
      parentList2.appendChild(p);
      
      document.getElementById("quiz_screen").hidden = true;
      document.getElementById("result_screen").hidden = false;

    }
  });

  var h3 = document.createElement("h3");
  h3.innerText = "Question " + (currentIndex +1) + ": ";
  var p = document.createElement("p");
  p.innerText = q.question;

  q.options.forEach((optionText, index) => {
    const id = "opt" + index;

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answers"; 
    radio.id = id;
    radio.value = index; 
    radio.required = true;   

    const label = document.createElement("label");
    label.htmlFor = id;                 
    label.innerText = optionText;

    const row = document.createElement("div");
    row.append(radio, label);
    form.appendChild(row);               
  });

  const row = document.createElement("div");

  const nextButton = document.createElement("input");
  nextButton.setAttribute("form", "quiz-form");
  nextButton.type = "submit";
  nextButton.value = "Next";
  nextButton.classList.add('btn-next');

  const div = document.createElement("div");
  div.classList.add("buttonarea");

  const timer = document.createElement("span");
  timer.innerText = "  Time left: 15s";
  h3.appendChild(timer);

  parentList.appendChild(h3);
  parentList.appendChild(p);
  parentList.appendChild(form);
  div.appendChild(nextButton);
  parentList.appendChild(div);

  startTimer(timer,form);
}



function startTimer(timerEl, form) {
  clearInterval(timerId);          // kill any old timer first
  let timeLeft = TIME_LIMIT;
  timerEl.innerText = "  Time left: " + timeLeft + "s";

  timerId = setInterval(() => {
    timeLeft--;
    timerEl.innerText = "  Time left: " + timeLeft + "s";

    if (timeLeft === 0) {
      clearInterval(timerId);
      form.noValidate = true;    
      form.requestSubmit();  
    }
  }, 1000);
}