
const rock = document.querySelector('.rock');
const paper = document.querySelector('.paper');
const scissors = document.querySelector('.scissors');
const result = document.querySelector('h2');
const detailResult = document.querySelector('h3')
const playerChoiceImage = document.querySelector('.player-choice-image');
const computerChoiceImage = document.querySelector('.computer-choice-image');
const playerScoreDiv = document.querySelector('.player-score');
const computerScoreDiv = document.querySelector('.computer-score');
const overlay = document.getElementById('overlay');
const closeButton = document.querySelector('.close-button');
const rockString = "rock";
const paperString = "paper";
const scissorsString = "scissors";
let playerScore = 0;
let computerScore = 0;

// show pop-up after game ends
function openModal(modal) {
    modal.classList.add('active');
    overlay.classList.add('active');
}

// hide pop-up after game ends
function closeModal(modal) {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function resetGame() {
    const modal = document.querySelector(".modal");
    closeModal(modal)

    playerScore = 0;
    computerScore = 0;
    result.textContent = `Choose your weapon `;
    detailResult.textContent = `First to score 5 points wins the game`;
    computerScoreDiv.textContent = `Computer: ${computerScore}`;
    playerScoreDiv.textContent = `Player: ${playerScore}`;
    playerChoiceImage.textContent = `❔`;
    computerChoiceImage.textContent = `❔`;
}

rock.addEventListener('click', playRock);
paper.addEventListener('click', playPaper);
scissors.addEventListener('click', playScissors);

function playRock() {
    playRound(rockString, getComputerChoice());
}

function playPaper() {
    playRound(paperString, getComputerChoice());
}

function playScissors() {
    playRound(scissorsString, getComputerChoice());
}

function getComputerChoice() {
    let choices = ["rock", "paper", "scissors"];
    let randomChoice = Math.floor(Math.random() * choices.length);
    return choices[randomChoice];
}

function updateChoiceImage(choice, element) {
    let textContent;
    switch (choice) {
        case "rock":
            textContent = `✊`;
            break;
        case "paper":
            textContent = `✋`;
            break;
        case "scissors":
            textContent = `✌`;
            break;
        // Add a default case to handle unexpected input
        default:
            textContent = '';
    }
    element.textContent = textContent;
}

function playRound(playerSelection, computerSelection) {
    updateChoiceImage(playerSelection, playerChoiceImage);
    updateChoiceImage(computerSelection, computerChoiceImage);
    updateScore(playerSelection, computerSelection)
    getWinner(playerScore, computerScore);
}

function updateScore(playerSelection, computerSelection) {
    let resultText = "";
    let detailResultText = "";

    if (playerSelection === computerSelection) {
        resultText = `It's a Draw!`;
        detailResultText = `${playerSelection} ties with ${computerSelection}`;
    } else if (playerSelection === "rock" && computerSelection == "scissors"
        || playerSelection === "paper" && computerSelection == "rock"
        || playerSelection === "scissors" && computerSelection == "paper") {
        resultText = `You Won! `;
        detailResultText = `${playerSelection} beats ${computerSelection}`;
        playerScore++;
        playerScoreDiv.textContent = `Player: ${playerScore}`;
    } else {
        resultText = `You Lose!`;
        detailResultText = `${computerSelection} beats ${playerSelection}`;
        computerScore++;
        computerScoreDiv.textContent = `Computer: ${computerScore}`;
    }
    result.textContent = resultText;
    detailResult.textContent = detailResultText;
}

function getWinner(playerPoints, computerPoints) {

    let gameWinner = "";

    if (playerPoints == 5) {
        gameWinner = "Player";
    } else if (computerPoints == 5) {
        gameWinner = "Computer";
    }

    if (gameWinner) {

        const modal = document.querySelector(".modal");
        openModal(modal);

        const modalTitle = document.querySelector(".modal-title");
        modalTitle.textContent = `${gameWinner} Won!`

        closeButton.addEventListener('click', resetGame);
    }
}
