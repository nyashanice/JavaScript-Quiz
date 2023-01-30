// declaring all variables
var timeRem = document.getElementById("time-remaining");
var startButton = document.querySelector(".start-button");
var tryAgain = document.querySelector(".tryAgainButton");
var quizDescription = document.getElementById('descriptionText');

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

// storing questions with a question prompt, answer choices to choose from, and a correct answer 
questionsArr = [
    {
        prompt: "What is my name?",
        choices: ["Nya", "Tomato", "Potato", "Cheese"],
        correctAnswer: "Nya"
    },
    {
        prompt: "What is my last?",
        choices: ["Tyus", "Acovado", "Lime", "Orange"],
        correctAnswer: "Tyus"
    },
    {
        prompt: "How old am I?",
        choices: [23, 22, 21, 20],
        correctAnswer: 23
    }
]

// hides try again button at start of quiz
tryAgain.style.display = 'none';

startButton.addEventListener("click", start);
// Starts quiz with timer and questions
function start(event) {
    event.preventDefault();
    quizTimer();
    startButton.style.display = "none";
    quizDescription.style.display = 'none';
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
    document.getElementById("quizQuestions").innerHTML = (questionIndex + 1) + ". " + currentPrompt;


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
        choiceButton.style.backgroundColor = '#F192E8';
        choiceButton.style.borderRadius = '5px';
        choiceButton.style.fontSize = '20px';
        choiceButton.style.display = 'block';
        choiceButton.style.marginLeft = '170px';
        choiceButton.style.justifyContent = 'space-between';
        choiceButton.style.marginTop = '5px';
        choiceButton.style.border = 'none';
    }

}

// checks to see if chosen answer is right or wrong
function checkAnswer(event) {

    if (event.target.textContent == rightAnswer) {
        alert('Correct!');
        score += 20;
        questionIndex++;
        // uses question index to determine if all questions have been answered before timer runs out
        if (questionIndex == questionsArr.length) {
            endQuiz();
        } else {
            showQuestion();
        }
    } else {
        alert('Not quite');
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
    console.log(event);
    console.log(this);
    console.log(event.target);
}

// what happens with elements and data once quiz ends
function endQuiz() {
    console.log("Ending!")
    clearInterval(interval);
    timeRem.style.display = 'none';
    buttonHolder.innerHTML = '';
    document.getElementById('quizQuestions').innerHTML = '';
    tryAgain.style.display = 'block';
    initials = prompt('Enter your initials to be entered into the highscores list!');
    // user = [];
    userData = {
        initials: initials,
        points: score
    };
    // console.log(typeof user);
    console.log(userData);
    saveStorage(userData);
    // localStorage.setItem("user", JSON.stringify([userData]));
}

// saves each new score in local storage
function saveStorage(newScore) {
    // ????????????? can't add additional scores
    storage = JSON.parse(localStorage.getItem("user"));
    // storage = localStorage.getItem(JSON.parse(user));
    newUserData = newScore;
    // console.log(typeof storage);
    storage.push(newUserData);
    console.log(storage);
    localStorage.setItem("user", JSON.stringify(storage));
}

function loadStorage() {
    storage = JSON.parse(localStorage.getItem("user"));
    console.log(storage)
    if (!storage) {
        console.log("NO Storage exists!!!");
        localStorage.setItem("user", JSON.stringify([]));
        return;
    }
}

// ????????????? what does this do
function renderHighscores() {
    storage = JSON.parse(localStorage.getItem("user"));
    console.log(storage);
    if (storage !== null) {
        console.log(storage[storage.length - 1].initials);
        var lastInitials = storage[storage.length - 1].initials;
        console.log(storage[storage.length - 1].points);
        var lastScore = storage[storage.length - 1].points
        document.getElementById("endScore").innerHTML = lastInitials + " got a score of " + lastScore
        return;
    }
};

renderHighscores();
loadStorage();

viewScores = document.getElementById('viewHighscores');
viewScores.addEventListener('click', viewHighscores);

function viewHighscores(event) {
    if (event.target.textContent !== null) {
        // document.body.innerHTML = "";
        highscoresDisplay = document.getElementById('highscoresList');
        highscoresDisplay.style.display = 'block';
        storageContent = JSON.parse(localStorage.getItem("user"));
        storage = document.createElement('div');
        storage.textContent = JSON.stringify(storageContent);
        highscoresDisplay.appendChild(storage);

        for (i >= 0; i = storageContent.length - 1; i--) {

        }
    }
};
