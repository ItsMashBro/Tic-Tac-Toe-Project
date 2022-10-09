
//Variables


let playerTitle = document.getElementById('playerTitle')
let restartBtn = document.getElementById('restartBtn')
let boxes = Array.from(document.getElementsByClassName('box')) 


let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks')


const O_TEXT = "O"
const X_TEXT = "X"
let currentPlayer = X_TEXT
let spaces = Array(9).fill(null)

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked))
}

//win conditions

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

//functions //select entire element //switch player every time box is clicked

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition
        //I need to check if all 3 spaces contain the same letter
        if(spaces[a] && (spaces[a] == spaces[b] && spaces[a] == spaces[c])) {
            return [a,b,c]
        }
    }
    return false
}
//boxes ID = e
function boxClicked(e) {
    const id = e.target.id

    if(!spaces[id]){
        spaces[id] = currentPlayer
        e.target.innerText = currentPlayer

        if(playerHasWon() !==false){
            playerTitle.innerHTML = `${currentPlayer} has won!`
            let winning_blocks = playerHasWon()
            winning_blocks.map( box => boxes[box].style.backgroundColor=winnerIndicator)
            return
        }

        currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT
    }
}


//restart

//empty boxes and set text back to default
function restart() {
    spaces.fill(null)

    boxes.forEach( box => {
        box.innerText = ''
        box.style.backgroundColor=''
    })

    playerTitle.innerHTML = '"Synth" Tac Toe'

    currentPlayer = X_TEXT
}

restartBtn.addEventListener('click', restart)

startGame()