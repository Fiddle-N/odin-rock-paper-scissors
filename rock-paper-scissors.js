const LOSE = -1
const DRAW = 0
const WIN = 1


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


function calculateGameResult(playerScore, computerScore) {
    if (playerScore < computerScore) {
        return LOSE;
    }
    else if (playerScore > computerScore) {
        return WIN;
    }
    else {
        return DRAW;
    }

}


function createGameSummary(result, playerScore, computerScore) {
    let playerRoundStr = (playerScore === 1) ? 'round' : 'rounds';
    let computerRoundStr = (computerScore === 1) ? 'round' : 'rounds';

    switch (result) {
        case LOSE:
            return `You Lose. You won ${playerScore} ${playerRoundStr} but the computer beat you with ${computerScore} ${computerRoundStr}.`;
        case DRAW:
            return `It's a draw. Both you and the computer won ${playerScore} ${playerRoundStr}.`;
        case WIN:
            return `You Win! The computer won ${computerScore} ${computerRoundStr} but you beat it with ${playerScore} ${playerRoundStr}!`;
    }

}


function game() {
    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {
        let playerSelection = prompt('Choose Rock, Paper or Scissors:').toLowerCase();
        let computerSelection = getComputerChoice();

        let result = playRound(playerSelection, computerSelection);

        switch (result) {
            case LOSE:
                computerScore++;
                break;
            case WIN:
                playerScore++;
                break;
        }

        console.log(createRoundSummary(result, playerSelection, computerSelection));
    }

    let gameResult = calculateGameResult(playerScore, computerScore);
    console.log(createGameSummary(gameResult, playerScore, computerScore));
}


game();
