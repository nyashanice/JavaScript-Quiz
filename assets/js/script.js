// Click start button
// Timer starts on click
// Question pops up
// Wrong answers takes away time from clock
// Game ends at 0
// Save high score and initials at end
var questionsArr = [
    {
        prompt: "What's is my name?",
        choices: ["Nya", "Tomato", "Potato", "Cheese"],
        correctAnswer: "Nya"
    },
    {
        prompt: "What's is my last?",
        choices: ["Tyus", "Acovado", "Lime", "Orange"],
        correctAnswer: "Tyus"
    }
]

var questionIndex;
var timeRem = document.getElementById("time-remaining");
var secondsRemaining = 30;

function quizTimer() {
    var interval = setInterval(function () {
        console.log("timer")
        secondsRemaining--;
        timeRem.textContent = "Time remaining: " + secondsRemaining;

        if (secondsRemaining === 0) {
            clearInterval(interval);
            endQuiz()
        }
        // decrease in increments of 1 s or 1000 ms
    }, 1000);
}

function start(event) {
    event.preventDefault()
    quizTimer()
    questionIndex = 0
    showQuestion()
}

function showQuestion() {
    console.log("Showing question")
    var currentQuestion = questionsArr[questionIndex]
    var currentPrompt = currentQuestion.prompt
    console.log(currentPrompt)
    var questionChoices = questionsArr[questionIndex].choices
    for (var i = 0; i < questionChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.addEventListener("click", checkAnswer)
        choiceButton.textContent = questionChoices[i]
        console.log(choiceButton)
    }

    // how do I know what question I'm at?
    //Do I want to iterate through all my questions?
    //If I do a for loop, how will my code act?
}


function checkAnswer(event) {
    event.preventDefault()
    console.log(event)
    console.log(this)
    console.log(event.target);


    // Check if you're done answering all the questions
    // if statement
    // edit the questionIndex after we check it
}
document.querySelector(".start-button").addEventListener("click", start);


function endQuiz() {
    console.log("Ending!")
}
