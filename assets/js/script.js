// declaring all variables
var timeRem = document.getElementById("time-remaining");
var startButton = document.querySelector(".start-button");
var quizDescription = document.getElementById("descriptionText");

var secondsRemaining = 60;
var questionIndex = 0;
var score = 0;

var questionsArr;
var interval;
var currentQuestion;
var currentPrompt;
var questionChoices;
var buttonHolder;
var choiceButton;
var rightAnswer;
var initials;
var userData;
var newUserData;
var storage;
var highscoreData;
var viewScores;
var pointsArr = [];

// storing questions with a question prompt, answer choices to choose from, and a correct answer
questionsArr = [
  {
    prompt: "Commonly used data types do NOT include:",
    choices: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    prompt: "The condition of an if/else statement is enclosed with:",
    choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
    correctAnswer: "parentheses",
  },
  {
    prompt: "Arrays in JavaScript can be used to hold:",
    choices: [
      "numbers and strings",
      "booleans",
      "other arrays",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    prompt:
      "String values must be enclosed within ______ when being assigned to variables.",
    choices: ["commas", "curly brackets", "parentheses", "quotes"],
    correctAnswer: "quotes",
  },
  {
    prompt:
      "A very useful tool during development and debugging for printing content to the debugger is:",
    choices: ["JavaScript", "terminal/bash", "for loop", "console.log"],
    correctAnswer: "console.log",
  },
];

startButton.addEventListener("click", start);
// Starts quiz with timer and questions
function start(event) {
  event.preventDefault();
  quizTimer();
  startButton.style.display = "none";
  quizDescription.style.display = "none";
  showQuestion();
}

// starts the 60 second timer and displays on screen
function quizTimer() {
  interval = setInterval(function () {
    secondsRemaining--;
    timeRem.textContent = "Time remaining: " + secondsRemaining;

    if (secondsRemaining === 0) {
      endQuiz();
    }
    // decrement of 1 s or 1000 ms
  }, 1000);
}

// Displays numbered quiz questions on screen along with all answer choices for that question
function showQuestion() {
  currentQuestion = questionsArr[questionIndex];
  currentPrompt = currentQuestion.prompt;
  rightAnswer = currentQuestion.correctAnswer;
  document.getElementById("quizQuestions").innerHTML =
    questionIndex + 1 + ". " + currentPrompt;

  questionChoices = currentQuestion.choices;
  buttonHolder = document.getElementById("quiz-choices");
  buttonHolder.innerHTML = "";

  // displays appropriate answer choices as the question changes
  for (var i = 0; i < questionChoices.length; i++) {
    choiceButton = document.createElement("button");
    choiceButton.addEventListener("click", checkAnswer);
    choiceButton.textContent = questionChoices[i];
    buttonHolder.appendChild(choiceButton);

    // styling for answer choice buttons
    choiceButton.style.backgroundColor = "#F192E8";
    choiceButton.style.borderRadius = "5px";
    choiceButton.style.fontSize = "20px";
    choiceButton.style.display = "block";
    choiceButton.style.marginLeft = "170px";
    choiceButton.style.justifyContent = "space-between";
    choiceButton.style.marginTop = "5px";
    choiceButton.style.border = "none";
  }
}

// checks to see if chosen answer is right or wrong
function checkAnswer(event) {
  if (event.target.textContent == rightAnswer) {
    alert("Correct!");
    score += 20;
    questionIndex++;
    // uses question index to determine if all questions have been answered before timer runs out
    if (questionIndex == questionsArr.length) {
      endQuiz();
    } else {
      showQuestion();
    }
  } else {
    alert("Not quite");
    questionIndex++;
    if (questionIndex == questionsArr.length) {
      endQuiz();
    } else {
      // takes away time from quiz timer if there is enough time remaining
      if (secondsRemaining > 10) {
        secondsRemaining -= 10;
        showQuestion();
      } else {
        endQuiz();
      }
    }
  }
  event.preventDefault();
}

// what happens with elements and data once quiz ends
function endQuiz() {
  clearInterval(interval);
  timeRem.style.display = "none";
  buttonHolder.innerHTML = "";
  document.getElementById("quizQuestions").innerHTML = "";
  initials = prompt(
    "Enter your initials to be entered into the highscores list!"
  );
  userData = {
    initials: initials,
    points: score,
  };
  saveStorage(userData);
}

// saves each new score in local storage
function saveStorage(newScore) {
  storage = JSON.parse(localStorage.getItem("user"));
  newUserData = newScore;
  storage.push(newUserData);
  localStorage.setItem("user", JSON.stringify(storage));
}

function loadStorage() {
  storage = JSON.parse(localStorage.getItem("user"));
  if (!storage) {
    console.log("NO Storage exists!!!");
    localStorage.setItem("user", JSON.stringify([]));
    return;
  }
}

function renderHighscores() {
  storage = JSON.parse(localStorage.getItem("user"));
  if (storage !== null) {
    var lastInitials = storage[storage.length - 1].initials;
    var lastScore = storage[storage.length - 1].points;
    document.getElementById("endScore").innerHTML =
      lastInitials + " got a score of " + lastScore;
    return;
  }
}

renderHighscores();
loadStorage();

viewScores = document.getElementById("viewHighscores");
viewScores.addEventListener("click", viewHighscores);

function viewHighscores(event) {
  if (event.target.textContent !== null) {
    highscoresDisplay = document.getElementById("highscoresList");
    highscoresDisplay.style.display = "block";
    storageContent = JSON.parse(localStorage.getItem("user"));
    storage = document.createElement("div");
    for (i = 0; i < storageContent.length; i++) {
      storage.textContent =
        storageContent[i].initials + ": " + storageContent[i].points;
      pointsArr.push(storage.textContent);
    }
    storage.textContent = JSON.stringify(pointsArr);
    highscoresDisplay.appendChild(storage);
  }
}
