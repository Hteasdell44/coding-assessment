// Global Variables//

var startScreen = document.getElementById("start-screen");
var startButton = document.getElementById("start-button");
var questionScreen = document.getElementById("question");
var leaderboardLink = document.getElementById("leaderboard-link");
var leaderboardScreen = document.getElementById("leaderboard");
var nameEntryScreen = document.getElementById("name-entry");
var backButton = document.getElementById("back-button");
var questionElement = document.getElementById("question-Text");
var answerChoiceOne = document.getElementById("button-one");
var answerChoiceTwo = document.getElementById("button-two");
var answerChoiceThree = document.getElementById("button-three");
var answerChoiceFour = document.getElementById("button-four");
var answerResult = document.getElementById("answer-result");
var nameEntryAnswerResult = document.getElementById("answer-result-name-entry");
var nameEntryInputValue = document.getElementById("initial-input");
var nameEntrySubmitButton = document.getElementById("form-submit");
var clearButton = document.getElementById("clear-button");
var leaderboardName = document.getElementById("leaderboard-name");
var countdownTimer = document.querySelector("#timer-countdown");
var scoreDisplay = document.getElementById("final-score");

var scoreTracker;
var timerCount = 60;

var correctAnswer;
var currentQuestion;
var gameStatus = "not started";

var currentScreen = "startScreen";
var previousScreen = "startScreen";

const testQuestionOne = {

    questionText: "1. Which of the following is not a commonly used data type in JavaScript?",
    choiceOne: "strings",
    choiceTwo: "booleans",
    choiceThree: "alerts",
    choiceFour: "numbers",
    correctChoice: "choiceThree"
};

const testQuestionTwo = {

    questionText: "2. Which of the following encloses the condition of an if/else statement?",
    choiceOne: "quotes",
    choiceTwo: "curly braces",
    choiceThree: "parenthesis",
    choiceFour: "square brackets",
    correctChoice: "choiceThree"
}

const testQuestionThree = {

    questionText: "3. Which of the following can be stored inside of an array in JavaScript?",
    choiceOne: "numbers & strings",
    choiceTwo: "arrays",
    choiceThree: "booleans",
    choiceFour: "all of the above",
    correctChoice: "choiceFour"
}

const testQuestionFour = {

    questionText: "4. When being referenced, string values must be enclosed in which of the following?",
    choiceOne: "commas",
    choiceTwo: "curly braces",
    choiceThree: "quotes",
    choiceFour: "parenthesis",
    correctChoice: "choiceThree"
}

const testQuestionFive = {

    questionText: "5. Which of the following is a useful debugging tool used during development to print content to the screen?",
    choiceOne: "JavaScript",
    choiceTwo: "terminal/bash",
    choiceThree: "for loopd",
    choiceFour: "console.log",
    correctChoice: "choiceFour"
}

// Code Executed At Run Time //

startButton.addEventListener("click", beginTest);
leaderboardLink.addEventListener("click", seeLeaderboard);
backButton.addEventListener("click", seePreviousScreen);
nameEntrySubmitButton.addEventListener("click", handleFormSubmit);
clearButton.addEventListener("click", handleClear);
setInterval(displayTime, 1000);

// Functions //

function beginTest() {

    timerCount = 60;
    gameStatus = "in progress";
    currentScreen = "questionScreen";
    startScreen.style.display = "none";
    questionScreen.style.display = "flex";
    previousScreen = "startScreen";
    displayQuestionOne();
}

function seeLeaderboard() {

    if (currentScreen == "startScreen") {

        startScreen.style.display = "none";
        questionScreen.style.display = "none";
        nameEntryScreen.style.display = "none";
        leaderboardScreen.style.display = "flex";

        currentScreen = "leaderboard";
        previousScreen = "startScreen";
    }

    if (currentScreen == "questionScreen") {

        startScreen.style.display = "none";
        questionScreen.style.display = "none";
        nameEntryScreen.style.display = "none";
        leaderboardScreen.style.display = "flex";

        currentScreen = "leaderboard";
        previousScreen = "questionScreen";
    }

    if (currentScreen == "nameEntryScreen") {
    
        startScreen.style.display = "none";
        questionScreen.style.display = "none";
        nameEntryScreen.style.display = "none";
        leaderboardScreen.style.display = "flex";
    
        currentScreen = "leaderboard";
        previousScreen = "nameEntryScreen";
        
    }

    while (leaderboardName.firstChild) {

        leaderboardName.removeChild(leaderboardName.firstChild);

    }

    const scores = [];

    for (var i = 0; i < localStorage.length; i++) {
        
        const key = localStorage.key(i);
        const score = localStorage.getItem(key);
        scores.push({ name: key, score: score });
    }

    scores.sort((a, b) => b.score - a.score);

    for (var j = 0; j < scores.length; j++) {

        const newEl = document.createElement("p");
        newEl.textContent = `${j + 1}. ${scores[j].name}: ${scores[j].score} Points`;
        leaderboardName.appendChild(newEl);
    }
}

function seePreviousScreen() {

    if (previousScreen == "startScreen") {

        leaderboardScreen.style.display = "none";
        startScreen.style.display = "flex";

        previousScreen = currentScreen;
        currentScreen = "startScreen";
        return;
    }

    if (previousScreen == "nameEntryScreen") {

        if (gameStatus == "complete") {

            leaderboardScreen.style.display = "none";
            nameEntryScreen.style.display = "flex";
            previousScreen = currentScreen;
            currentScreen = "nameEntryScreen";
            return;
        }
        
        leaderboardScreen.style.display = "none";
        startScreen.style.display = "flex";
        previousScreen = currentScreen;
        currentScreen = "startScreen";
    }

    if (previousScreen == "questionScreen") {

        leaderboardScreen.style.display = "none";
        questionScreen.style.display = "flex";

        previousScreen = currentScreen;
        currentScreen = "questionScreen";
    }

}

function displayQuestionOne() {

    currentQuestion = testQuestionOne;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", showNameEntryWrong);
    answerChoiceTwo.removeEventListener("click", showNameEntryWrong);
    answerChoiceThree.removeEventListener("click", showNameEntryWrong);
    answerChoiceFour.removeEventListener("click", showNameEntryCorrect);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceThree.addEventListener("click", rightAnswerDisplayQuestionTwo);
    answerChoiceFour.addEventListener("click", wrongAnswerDisplayQuestionTwo);

}

function rightAnswerDisplayQuestionTwo() {

    answerResult.style.display = "block";
    answerResult.textContent = "Correct!";

    currentQuestion = testQuestionTwo;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionTwo);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionTwo);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceThree.addEventListener("click", rightAnswerDisplayQuestionThree);
    answerChoiceFour.addEventListener("click", wrongAnswerDisplayQuestionThree);


}

function wrongAnswerDisplayQuestionTwo() {

    timerCount -= 7;
    answerResult.style.display = "block";
    answerResult.textContent = "Wrong!";

    currentQuestion = testQuestionTwo;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionTwo);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionTwo);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionTwo);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceThree.addEventListener("click", rightAnswerDisplayQuestionThree);
    answerChoiceFour.addEventListener("click", wrongAnswerDisplayQuestionThree);


}

function rightAnswerDisplayQuestionThree() {

    answerResult.style.display = "block";
    answerResult.textContent = "Correct!";

    currentQuestion = testQuestionThree;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionThree);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionThree);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceThree.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceFour.addEventListener("click", rightAnswerDisplayQuestionFour);


}

function wrongAnswerDisplayQuestionThree() {

    timerCount -= 7;
    answerResult.style.display = "block";
    answerResult.textContent = "Wrong!";

    currentQuestion = testQuestionThree;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionThree);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionThree);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionThree);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceThree.addEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceFour.addEventListener("click", rightAnswerDisplayQuestionFour);

}

function rightAnswerDisplayQuestionFour() {

    answerResult.style.display = "block";
    answerResult.textContent = "Correct!";

    currentQuestion = testQuestionFour;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceThree.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceFour.removeEventListener("click", rightAnswerDisplayQuestionFour);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceThree.addEventListener("click", rightAnswerDisplayQuestionFive);
    answerChoiceFour.addEventListener("click", wrongAnswerDisplayQuestionFive);

}

function wrongAnswerDisplayQuestionFour() {

    timerCount -= 7;
    answerResult.style.display = "block";
    answerResult.textContent = "Wrong!";

    currentQuestion = testQuestionFour;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceThree.removeEventListener("click", wrongAnswerDisplayQuestionFour);
    answerChoiceFour.removeEventListener("click", rightAnswerDisplayQuestionFour);

    answerChoiceOne.addEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceTwo.addEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceThree.addEventListener("click", rightAnswerDisplayQuestionFive);
    answerChoiceFour.addEventListener("click", wrongAnswerDisplayQuestionFive);
}

function rightAnswerDisplayQuestionFive() {

    answerResult.style.display = "block";
    answerResult.textContent = "Correct!";

    currentQuestion = testQuestionFive;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionFive);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionFive);

    answerChoiceOne.addEventListener("click", showNameEntryWrong);
    answerChoiceTwo.addEventListener("click", showNameEntryWrong);
    answerChoiceThree.addEventListener("click", showNameEntryWrong);
    answerChoiceFour.addEventListener("click", showNameEntryCorrect);
}

function wrongAnswerDisplayQuestionFive() {

    timerCount -= 7;
    answerResult.style.display = "block";
    answerResult.textContent = "Wrong!";

    currentQuestion = testQuestionFive;

    correctAnswer = currentQuestion.correctChoice;

    questionElement.textContent = currentQuestion.questionText;

    answerChoiceOne.textContent = "1. " + currentQuestion.choiceOne;
    answerChoiceTwo.textContent = "2. " + currentQuestion.choiceTwo;
    answerChoiceThree.textContent = "3. " + currentQuestion.choiceThree;
    answerChoiceFour.textContent = "4. " + currentQuestion.choiceFour;

    answerChoiceOne.removeEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceTwo.removeEventListener("click", wrongAnswerDisplayQuestionFive);
    answerChoiceThree.removeEventListener("click", rightAnswerDisplayQuestionFive);
    answerChoiceFour.removeEventListener("click", wrongAnswerDisplayQuestionFive);

    answerChoiceOne.addEventListener("click", showNameEntryWrong);
    answerChoiceTwo.addEventListener("click", showNameEntryWrong);
    answerChoiceThree.addEventListener("click", showNameEntryWrong);
    answerChoiceFour.addEventListener("click", showNameEntryCorrect);
}

function showNameEntryWrong() {

    timerCount -= 7;
    gameStatus = "complete";

    scoreTracker = timerCount;
    scoreDisplay.textContent = "Your Final Score Is " + scoreTracker;
    nameEntryAnswerResult.style.display = "block";
    nameEntryAnswerResult.textContent = "Wrong!"
    questionScreen.style.display = "none";
    nameEntryScreen.style.display= "flex";
    currentScreen = "nameEntryScreen";
    countdownTimer.textContent = "";
}

function showNameEntryCorrect() {

    gameStatus = "complete";
    scoreTracker = timerCount;
    scoreDisplay.textContent = "Your Final Score Is " + scoreTracker;
    nameEntryAnswerResult.style.display = "block";
    nameEntryAnswerResult.textContent = "Correct!";
    questionScreen.style.display = "none";
    nameEntryScreen.style.display= "flex";
    currentScreen = "nameEntryScreen";
    countdownTimer.textContent = "";
}

function showNameEntry() {

    gameStatus = "complete";
    scoreTracker = timerCount;
    scoreDisplay.textContent = "Your Final Score Is " + scoreTracker;
    startScreen.style.display = "none";
    questionScreen.style.display = "none";
    leaderboardScreen.style.display = "none";
    nameEntryAnswerResult.style.display = "block";
    nameEntryAnswerResult.textContent = "Time's Up!";

    nameEntryScreen.style.display= "flex";
    currentScreen = "nameEntryScreen";
    countdownTimer.textContent = "";
}

function displayTime() {

    if (currentScreen == "leaderboard") {

        if (gameStatus == "complete" || gameStatus == "not started") {

            countdownTimer.textContent = "";
            return;

        } else {
            
            countdownTimer.textContent = "Paused";
            return;
        }
    }

    if (currentScreen == "nameEntryScreen" || currentScreen == "startScreen") {

        countdownTimer.textContent = "";
        return;

    } else {

        if (timerCount < 0) {

            timerCount = 0;
            countdownTimer.textContent = "Time Left: 0";
            showNameEntry();
    
        } else {
            
            countdownTimer.textContent = "Time Left: " + timerCount;
            timerCount--;
        }
    }
}

function handleFormSubmit(event) {
    
    event.preventDefault();

    localStorage.setItem(nameEntryInputValue.value, scoreTracker);
    gameStatus = "not started";

    while (leaderboardName.firstChild) {

        leaderboardName.removeChild(leaderboardName.firstChild);

      }
    
    seeLeaderboard();
}

function handleClear() {

    localStorage.clear();

    while (leaderboardName.firstChild) {

        leaderboardName.removeChild(leaderboardName.firstChild);

      }
}