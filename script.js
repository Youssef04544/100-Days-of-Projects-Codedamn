const questions = [
  {
    questionText: "Commonly used data types DO NOT include:",
    options: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "3. alerts",
  },
  {
    questionText: "Arrays in JavaScript can be used to store ______.",
    options: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "4. all of the above",
  },
  {
    questionText:
      "String values must be enclosed within _____ when being assigned to variables.",
    options: ["1. commas", "2. curly brackets", "3. quotes", "4. parentheses"],
    answer: "3. quotes",
  },
  {
    questionText:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    options: [
      "1. JavaScript",
      "2. terminal/bash",
      "3. for loops",
      "4. console.log",
    ],
    answer: "4. console.log",
  },
  {
    questionText:
      "Which of the following is a statement that can be used to terminate a loop, switch or label statement?",
    options: ["1. break", "2. stop", "3. halt", "4. exit"],
    answer: "1. break",
  },
];
const startCard = document.querySelector(".startcard");
const currentQuestionZone = document.querySelector(".current-question");
const startButton = document.querySelector(".start");
const scoresheet = document.querySelector(".scoresheet");
const submitBtn = document.querySelector(".submit");
const highscoresList = document.querySelector(".highscoresList");
const leaderboardToggle = document.getElementById("leaderboard");
const highscoresPanel = document.querySelector(".highscoresPannel");
const closeHighscoresBtn = document.getElementById("goBack");
const clearBtn = document.getElementById("clearScores");
let questionCounter = 0;
let countdown = 50;
let quizzDone = false;
let highscores = [];

leaderboardToggle.addEventListener("click", () =>
  highscoresPanel.classList.remove("hide")
);
closeHighscoresBtn.addEventListener("click", () =>
  highscoresPanel.classList.add("hide")
);

startButton.addEventListener("click", startQuizz);
submitBtn.addEventListener("click", submitFinish);
function timer() {
  countdown = 50;
  quizzDone = false;
  let timer = setInterval(function () {
    document.getElementById("timer").innerHTML = "Time: " + countdown;
    if (countdown < 0 || quizzDone) {
      clearInterval(timer);
      finishQuizz();
    }
    countdown--;
  }, 1000);
}

function startQuizz() {
  startCard.classList.add("hide");
  questionCounter = 0;
  showQuestion();
  timer();
}

function showQuestion() {
  currentQuestionZone.innerHTML = "";
  currentQuestionZone.classList.remove("hide");
  let question = questions[questionCounter];
  let questionText = document.createElement("h1");
  questionText.innerText = question.questionText;
  currentQuestionZone.appendChild(questionText);
  question.options.map((option) => {
    const optionbtn = document.createElement("button");
    optionbtn.innerText = option;
    currentQuestionZone.appendChild(optionbtn);
    optionbtn.addEventListener("click", selectAnswer);
  });
}

function selectAnswer(e) {
  if (questionCounter < questions.length - 1) {
    questionCounter++;
    showQuestion();
    currentQuestionZone.appendChild(document.createElement("hr"));
    if (e.target.innerText === questions[questionCounter - 1].answer) {
      addInfo("Correct !");
    } else {
      addInfo("Incorrect !");
      countdown -= 10;
    }
  } else {
    finishQuizz();
  }
}

function addInfo(info) {
  const statement = document.createElement("div");
  statement.innerText = info;
  currentQuestionZone.appendChild(statement);
}

function finishQuizz() {
  quizzDone = true;
  currentQuestionZone.classList.add("hide");
  scoresheet.classList.remove("hide");
  document.querySelector(
    ".score"
  ).innerText = `Your final score is ${countdown}.`;
}

function submitFinish(e) {
  e.preventDefault();
  let userInitials = document.getElementById("userInitials").value;
  highscores.push([`${userInitials} - `, countdown]);
  highscores.sort((a, b) => {
    if (a[1] > b[1]) return 1;
    if (a[1] < b[1]) return -1;
    else return 0;
  });
  console.log(highscores);
  scoresheet.classList.add("hide");
  startCard.classList.remove("hide");
}

//localstoring of the highscores and initials
//Setting up the display of highscores onClick---------
//setting up the submit funct to put you back on the start menuus-------
//fix bug where you restart the app and you get wrong display of questions
//also noticed one bug where at then end on score display it showed two scores ???--------
