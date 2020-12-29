var checkBtn = document.querySelector('.check')
var againBtn = document.querySelector('.again')
var message = document.querySelector('.message') 
var userInput = parseInt(document.querySelector('.guess').value)
var scoreUI = document.querySelector('.score')
var thePage = document.querySelector('body')
var secretNumberUI = document.querySelector('.number')

var gameIsPlaying = true // if the player lose or win, it gets "false" which player can't do anything but press "again" which it gets true again
var highscore = 0
var score = 10
var invalidNum

var secretNumber = Math.floor(Math.random() * 100) + 1


    function displayMessage(text) {
        message.textContent = text   
    }

    function updateScore(input) {
        score = score + input 
    }
    
    function updateScoreUI(input) {
        scoreUI.textContent = input
    }


function playerWin(guess) {
    if(guess === secretNumber) {
        if(score > highscore) {
            highscore = score
            document.querySelector('.highscore').textContent = highscore
        }
        displayMessage('🎉 You Won!')
        thePage.style.backgroundColor = '#60b347'
        secretNumberUI.style.width = '30rem'
        secretNumberUI.textContent = secretNumber        
    }
    
}

function invalidNumber() { // invalid: '', -2, 102; inclusive: 1, 100
    if(userInput > 100 || userInput < 1 || !userInput) { 
        displayMessage('❌ Invalid Number!')
        invalidNum = true
    } else{
        invalidNum = false
    }
    
}

function againBtnHandler() {
    secretNumber = Math.floor(Math.random() * 100) + 1
    thePage.style.backgroundColor = '#222'
    secretNumberUI.style.width = '15rem'
    score = 10
    updateScoreUI(score)
    secretNumberUI.textContent = '?'
    displayMessage('Start guessing....')
    document.querySelector('.guess').value = ''
    continuePlay = true
    gameIsPlaying = true
}


    function playerLost() { // when the player lose the game
    if(score === 1 && userInput !== secretNumber) {
        updateScore(-1) // not necessary because not showing on the UI but still
        updateScoreUI(score)
        displayMessage('💥 You Lost!')
        thePage.style.backgroundColor = 'red'
        gameIsPlaying = false
    }
}

function checkBtnHandler() {
    if(gameIsPlaying) {
    userInput = parseInt(document.querySelector('.guess').value) 
    if(userInput === secretNumber) {
        playerWin(userInput)
        updateScoreUI(score) 
        gameIsPlaying = false
        return
    }   
    if(score > 1) { // so, the score doesn't go negative infinite and > 1 because when click it goes 1 down so if it is 0, it will displayMessage 
        invalidNumber()
        
       if(userInput > secretNumber && !invalidNum) { 
        displayMessage('📈 Too High')
        updateScore(-1)
        updateScoreUI(score)
        }
        else if(userInput < secretNumber && !invalidNum) { 
        displayMessage('📉 Too Low!')
        updateScore(-1)
        updateScoreUI(score)
        }
    }
    else{ // line 67 comment before "and"    
        playerLost()
    }
    }

    }


checkBtn.addEventListener('click', checkBtnHandler)
againBtn.addEventListener('click', againBtnHandler)

