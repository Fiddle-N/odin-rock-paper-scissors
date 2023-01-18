const LOSE = -1
const DRAW = 0
const WIN = 1

const INIT_SCORE = 0;


function capitalise(str) {
    return str[0].toUpperCase() + str.slice(1);
}


function getComputerChoice() {
    let randomInt = Math.floor(Math.random() * 3);
    switch (randomInt) {
        case 0:
            return 'rock';
        case 1:
            return 'paper';
        case 2:
            return 'scissors';
    }
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return DRAW;
    }
    else if (
           (playerSelection === 'rock' && computerSelection === 'paper')
        || (playerSelection === 'paper' && computerSelection === 'scissors')
        || (playerSelection === 'scissors' && computerSelection === 'rock')
    ){
        return LOSE;
    }
    else {
        return WIN;
    }
}


function createRoundSummary(result, playerSelection, computerSelection) {
    const playerSelectionTxt = capitalise(playerSelection);
    const computerSelectionTxt = capitalise(computerSelection);

    switch (result) {
        case LOSE:
            return `You Lose. ${computerSelectionTxt} beats ${playerSelectionTxt}.`;
        case DRAW:
            return `It's a draw. Both you and the computer chose ${playerSelectionTxt}.`;
        case WIN:
            return `You Win! ${playerSelectionTxt} beats ${computerSelectionTxt}.`;
    }

}


function createGameSummary(result, playerScore, computerScore) {
    let playerRoundStr = (playerScore === 1) ? 'round' : 'rounds';
    let computerRoundStr = (computerScore === 1) ? 'round' : 'rounds';

    switch (result) {
        case LOSE:
            return `You Lose. You won ${playerScore} ${playerRoundStr} but the computer beat you with ${computerScore} ${computerRoundStr}.`;
        case WIN:
            return `You Win! The computer won ${computerScore} ${computerRoundStr} but you beat it with ${playerScore} ${playerRoundStr}!`;
    }

}


function getPlayerSelections() {
    return Array.from(document.querySelectorAll('.player-selection'))
}


function playRounds() {
    let playerScore = INIT_SCORE;
    let computerScore = INIT_SCORE;

    function playRoundWithPlayerSelection(e) {
        const playerSelection = e.target.dataset.playerSelection;
        const computerSelection = getComputerChoice();

        const result = playRound(playerSelection, computerSelection);
        const resultSummary = createRoundSummary(result, playerSelection, computerSelection);

        const playerChoice = document.querySelector('#player-choice');
        playerChoice.textContent = capitalise(playerSelection);

        const computerChoice = document.querySelector('#computer-choice');
        computerChoice.textContent = capitalise(computerSelection);

        const roundResult = document.querySelector('#round-result');
        roundResult.textContent = resultSummary;

        if (result === WIN) {
            playerScore++;
            const playerResult = document.querySelector('#player-score');
            playerResult.textContent = playerScore;
        }
        if (result === LOSE) {
            computerScore++;
            const computerResult = document.querySelector('#computer-score');
            computerResult.textContent = computerScore;
        }

        if (playerScore === 5 || computerScore === 5) {
            const playerSelections = getPlayerSelections();
            playerSelections.forEach(playerSelection => playerSelection.disabled = true);

            const gameResult = document.querySelector('#game-result');

            const gameSummary = (playerScore == 5) 
                ? createGameSummary(WIN, playerScore, computerScore) 
                : createGameSummary(LOSE, playerScore, computerScore);

            gameResult.textContent = gameSummary;
        }
    }

    return playRoundWithPlayerSelection;

}


function main() {
    const scores = Array.from(document.querySelectorAll('.score'));
    scores.forEach(score => (score.textContent = INIT_SCORE));

    playRoundFn = playRounds();
    const playerSelections = getPlayerSelections();
    playerSelections.forEach(playerSelection => playerSelection.addEventListener('click', playRoundFn));

    
}


main();