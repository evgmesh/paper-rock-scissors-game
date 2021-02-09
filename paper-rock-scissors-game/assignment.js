const game = () => {
    let pScore = 0;
    let cScore = 0;
    let resultCounter = [];
    //initiation of refferences to HTML elements
    const winner = document.querySelector('.winner');
    const options = document.querySelectorAll('.options button');
    const match = document.querySelector('.match');
    const playButton = document.querySelector('.intro button');
    const gameOverP = document.querySelector('.gameOver p');
    const playerScore = document.querySelector('.player-score p');
    const computerScore = document.querySelector('.computer-score p');
    const playerHand = document.querySelector('.player-hand');
    const computerHand = document.querySelector('.computer-hand');

// Start the game
const startGame = () => {
    const introScreen = document.querySelector('.intro');
    playButton.addEventListener('click', () => {
        introScreen.classList.add('fadeOut');
        match.classList.add('fadeIn');
    });
};
//Play match
const playMatch = () => {
    const hands = document.querySelectorAll('.hands img');
    for (let hand of hands) {
        hand.addEventListener('animationend', () => {
            hand.style.animation = '';
        });
    };
    // Computer's options
    const computerOptions = ['rock', 'paper', 'scissors'];
    for (const option of options) {
    option.addEventListener('click', () => {
        // Computer's choise
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        buttonsOff();
        setTimeout(() => {
            // Call of function of compare hands
            compareHands(option.textContent, computerChoice);
            // Update Images and switch on buttons back
            playerHand.src = `./img/${option.textContent}.png`;
            computerHand.src = `./img/${computerChoice}.png`;
            buttonsOn();
            }, 1000)
        // Animation while shake
        playerHand.src = `./img/rock.png`;
        computerHand.src = `./img/rock.png`;
        playerHand.style.animation = 'shakePlayer 1s ease';
        computerHand.style.animation = 'shakeComputer 1s ease';
    });
    };
};
    // Disables the buttons and changes its style
const buttonsOff = () => {
        for (const option of options) {
            option.disabled = true;
            option.style.background = 'rgb(176, 175, 174)';
            option.style.cursor = 'default';
        };
    };
    // Enables the buttons and changes style back
const buttonsOn = () => {
        for (const option of options) {
            option.disabled = false;
            option.style.background = '';
            option.style.cursor = 'pointer';
        };
    };
const updateScore = () => {
    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
    console.log('resultCounter is: ', resultCounter);
};
const tenWins = () => {
    let numberOfWins = 10
    if(pScore === numberOfWins) {
        gameOverP.textContent = 'Player won the game ' + numberOfWins + ' times';
        newGame();
        return;
    }
    if (cScore === numberOfWins) {
        gameOverP.textContent = 'Computer won the game ' + numberOfWins + ' times';
        newGame();
        return;
    }
};
const counter = 3;
const winsInARow = (array, counter) => {
if (array.length < counter) 
{
    return;
}
  const lastThreeElements = array.slice(array.length-counter);
  const lastElement = lastThreeElements[counter-1];
  let count = 1;
  for (let i = counter-2; i>=0; i--) 
  {
      if(lastThreeElements[i] === lastElement) 
      {
        count++;
      }
      else 
      {
        break;
      }
  }
  // Check who won n times in a row
  if (count === counter) 
  {
      if (lastElement === 'c') 
      {
        gameOverP.textContent = 'Computer won ' + counter + ' times in a row!';
        newGame();
        return;
      }
      if (lastElement === 'p') 
      {
        gameOverP.textContent = 'Player won ' + counter + ' times in a row!'
        newGame();
        return;
      }
  }
  return;
};
const compareHands = (playerChoice, computerChoice) => {
    // Check for tie
    if(playerChoice === computerChoice){
        winner.textContent = 'It is a tie';
        resultCounter.push('t');
        updateScore();
        tenWins();
        winsInARow(resultCounter, counter);
        return;
    }
    // Check for Rock
    else if(playerChoice === 'rock'){
        if(computerChoice === 'scissors'){
            winner.textContent = 'Player Wins!';
            resultCounter.push('p');
            pScore++;
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
        else{
            winner.textContent = 'Computer Wins';
            resultCounter.push('c');
            cScore++;
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
    }
    // Check for Paper
    else if(playerChoice === 'paper'){
        if(computerChoice === 'rock'){
            winner.textContent = 'Player Wins!';
            resultCounter.push('p');
            pScore++;
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
        else{
            winner.textContent = 'Computer Wins';
            cScore++;
            resultCounter.push('c');
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
    }
    // Check for Scissors
    else if(playerChoice === 'scissors'){
        if(computerChoice === 'paper'){
            winner.textContent = 'Player Wins!';
            resultCounter.push('p');
            pScore++;
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
        else{
            winner.textContent = 'Computer Wins';
            cScore++;
            resultCounter.push('c');
            updateScore();
            tenWins();
            winsInARow(resultCounter, counter);
            return;
        }
    }
};
// Game over events
const newGame = () => {
const gameOver = document.querySelector('.gameOver');
const gameOverButton = document.querySelector('.gameOver button');
// Update of variables
resultCounter = [];
pScore = 0;
cScore = 0;
// Game screen removal
match.classList.remove('fadeIn');
// Shows game over screen
gameOver.classList.add('fadeIn');
// Functions to play again button
gameOverButton.addEventListener('click', () => {
//Change of screens
gameOver.classList.remove('fadeIn');
match.classList.add('fadeIn');
// Update of scores, message to player and images of hands
playerScore.textContent = pScore;
computerScore.textContent = cScore;
winner.textContent = 'Choose an option again';
playerHand.src = `./img/rock.png`;
computerHand.src = `./img/rock.png`;
});
};

// Call of inner functions to start game and play match
startGame();
playMatch();

};

// Start the game function
game();