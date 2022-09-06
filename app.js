/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify player of correct answer if loose
- Let player choose to play again
*/

// Game values
let min = 1, 
    max = 10,
    winningNum = getRandomWinNum(min,max),
    guessesNum = 3;
    guessesLeft = guessesNum;

console.log('Winning number is: ' + winningNum);

// Ui elements
const uiGame = document.querySelector('#game-wrapper'),
    uiMinNum = document.querySelector('.min-num'),
    uiMaxNum = document.querySelector('.max-num'),
    uiGuessBtn = document.querySelector('#guess-btn'),
    uiGuessInput = document.querySelector('#guess-input'),
    uiMessage = document.querySelector('.message');
    uiTryAgainBtn = document.querySelector('#tryAgain-btn');

// Assign UI min and max
uiMinNum.textContent = min;
uiMaxNum.textContent = max;

// Listener for guess and try again
uiGuessBtn.addEventListener('click', submitGuess);
uiTryAgainBtn.addEventListener('click', tryAgain);

function submitGuess(){
    clearMessage();
    let guess = parseInt(uiGuessInput.value);
    
    //Validate the input
    if (isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}.`, 'red');
        return;
    }

    //Check if won
    if (guess === winningNum){
        //Disable input
        uiGuessInput.disabled = true;
        //Change border color
        uiGuessInput.style.borderColor = 'green';
        //Let the user know they won
        setMessage (`${winningNum} is correct! You win! Do you want to play again?`, 'green');
        endOfGame();
    }
    
    //Check if lose and has no guesses left
    if (guess != winningNum && guessesLeft == 1){
        //Let the user know they lose
        setMessage(`${guess} is wrong! Sorry, you lost the game, try again!`, 'red');
        endOfGame();
    }

    //Check if lose but has guesses left
    if (guess != winningNum && guessesLeft != 1){
        guessesLeft--;
        //Let the user know they lose
        setMessage(`${guess} is wrong! You have ${guessesLeft} guesses left!`, 'red');
    }
}

function endOfGame(){
    uiTryAgainBtn.style.display = 'block';
    uiGuessInput.disabled = true;
    uiGuessBtn.disabled = true;
}

function tryAgain(){
    uiTryAgainBtn.style.display = 'none';
    uiGuessInput.disabled = false;
    uiGuessBtn.disabled = false;
    uiGuessInput.style.borderColor = 'rgb(182, 27, 71)';
    uiGuessInput.value = '';

    guessesLeft = guessesNum;
    clearMessage();
    winningNum = getRandomWinNum(min,max);
}

function setMessage(message, color){
    uiMessage.textContent = message;
    uiMessage.style.color = color;
}

function clearMessage(){
    uiMessage.textContent = '';
}

function getRandomWinNum(min, max){
    return parseInt(Math.random() * ((max + 1) - min) + min);
}