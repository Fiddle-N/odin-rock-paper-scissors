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
            return 'Rock';
        case 1:
            return 'Paper';
        case 2:
            return 'Scissors';
    }
}


function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        return DRAW;
    }
    else if (
           (playerSelection === 'Rock' && computerSelection === 'Paper')
        || (playerSelection === 'Paper' && computerSelection === 'Scissors')
        || (playerSelection === 'Scissors' && computerSelection === 'Rock')
    ){
        return LOSE;
    }
    else {
        return WIN;
    }
}


function createRoundSummary(result, playerSelection, computerSelection) {
    switch (result) {
        case LOSE:
            return `You Lose. ${computerSelection} beats ${playerSelection}.`;
        case DRAW:
            return `It's a draw. Both you and the computer chose ${playerSelection}.`;
        case WIN:
            return `You Win! ${playerSelection} beats ${computerSelection}.`;
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
        let playerSelection = capitalise(prompt('Choose Rock, Paper or Scissors:'));
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
