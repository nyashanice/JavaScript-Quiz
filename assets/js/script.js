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
var score = 0;
var highscoreForm = document.getElementById('highscoreName');
score = document.getElementById('endScore');
var highscoreName = document.getElementById('name');
var buttonHolder;

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
    document.getElementById("quizQuestions").innerHTML = (questionIndex + 1) + ": " + currentPrompt;
    // console.log(currentPrompt)

    var questionChoices = currentQuestion.choices;
    //where are those buttons going to go??
    buttonHolder = document.getElementById("quiz-choices");
    //if there's anything there, should I clear it before I append them?
    buttonHolder.innerHTML = ""

    for (var i = 0; i < questionChoices.length; i++) {
        var choiceButton = document.createElement("button");
        choiceButton.addEventListener("click", checkAnswer);
        choiceButton.textContent = questionChoices[i];
        buttonHolder.appendChild(choiceButton);
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
        score += 20;
        //        localStorage.setItem('score', score);
        questionIndex++;
        if (questionIndex == questionsArr.length) {
            endQuiz();
        } else {
            showQuestion();
        }
    } else {
        alert('Not quite');
        questionIndex++;
        if (secondsRemaining > 10) {
            secondsRemaining -= 10;
            showQuestion();
        } else {
            endQuiz();
        }
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
    // currentPrompt.style.display = 'none';
    buttonHolder.innerHTML = '';
    document.getElementById('quizQuestions').innerHTML = '';
    // score.style.display = 'block';
    // highscoreForm.style.display = 'block';
    // JSON.stringify(highscoreName);
    // JSON.stringify(score);
    // var initials = document.getElementById('initials').value;
    // console.log(initials);
    var initials = prompt('Enter your initials to be entered into the highscores list!');
    console.log(initials);
    var user = {
        initials: initials,
        points: score
    };
    saveStorage(user);
    //Once the user submits their initials, we get the values
    //var user = { initials: "Value",
    //points: score}
    // saveStorage(user)
    // localStorage.setItem('highscores', [highscoreName, score]);
}

function saveStorage(newScore) {
    var storage = JSON.parse(localStorage.getItem("highscores"))
    storage.push(newScore)
    localStorage.setItem("highscores", JSON.stringify(storage))

}

function loadStorage() {
    var storage = JSON.parse(localStorage.getItem("highscores"))
    console.log(storage)
    if (!storage) {
        console.log("NO Storage exists!!!")
        localStorage.setItem("highscores", JSON.stringify([]))
        return
    }
    //render that storage!!

}

loadStorage()
