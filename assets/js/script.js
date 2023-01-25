// Click start button $
// Timer starts on click $
// Question pops up
// Wrong answers takes away time from clock
// Game ends at 0
// Save high score and initials at end
var questionsArr = [
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

var questionIndex = 0;
var timeRem = document.getElementById("time-remaining");
var secondsRemaining = 60;
var startButton = document.querySelector(".start-button");
var currentQuestion;
var currentPrompt;
var rightAnswer;
// var choiceButton = document.createElement("button");

// starts the 60 second timer and displays on screen 
function quizTimer() {
    var interval = setInterval(function () {
        // console.log("timer")
        secondsRemaining--;
        timeRem.textContent = "Time remaining: " + secondsRemaining;

        if (secondsRemaining === 0) {
            clearInterval(interval);
            endQuiz();
        }
        // decrease in increments of 1 s or 1000 ms
    }, 1000);
}

// Starts quiz by calling the showQuestion function and hides start button
function start(event) {
    event.preventDefault();
    quizTimer();
    // questionIndex = 0;
    startButton.style.display = "none";
    showQuestion();
}

// Displays quiz questions on screen
function showQuestion() {
    // console.log("Showing question");
    currentQuestion = questionsArr[questionIndex];
    // console.log(currentQuestion);
    currentPrompt = currentQuestion.prompt;
    rightAnswer = currentQuestion.correctAnswer;
    document.getElementById("quizQuestions").innerHTML = currentPrompt;
    // console.log(currentPrompt)
    for (var i = 0; i < questionsArr.length; i++) {
        console.log(currentPrompt)
        questionDisplay = (i + 1) + ". " + currentPrompt;
        console.log(questionDisplay);
        // questionIndex++;
        console.log(questionIndex);
        console.log(currentQuestion);

    }
    var questionChoices = currentQuestion.choices;
    for (var i = 0; i < questionChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.addEventListener("click", checkAnswer);
        choiceButton.textContent = questionChoices[i];
        document.body.appendChild(choiceButton);
        console.log(choiceButton)
        // checkAnswer();

    }

    // how do I know what question I'm at?
    //Do I want to iterate through all my questions?
    //If I do a for loop, how will my code act?
}


function checkAnswer(event) {
    // var rightAnswer = currentQuestion.correctAnswer;
    console.log(rightAnswer, event.target.textContent);
    if (event.target.textContent == rightAnswer) {
        alert('Correct!');
        questionIndex++;
        showQuestion();
    } else {
        alert('Not quite');
    }

    event.preventDefault();
    console.log(event);
    console.log(this);
    console.log(event.target);



    // Check if you're done answering all the questions
    // if statement
    // edit the questionIndex after we check it
}
startButton.addEventListener("click", start);

function endQuiz() {
    console.log("Ending!")
}
