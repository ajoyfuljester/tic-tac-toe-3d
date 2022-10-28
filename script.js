document.querySelectorAll('.cell').forEach(element => {
    element.onclick = function() {
        move(parseInt(this.classList[1].split('').slice(1)),
        parseInt(this.parentElement.classList[1].split('').slice(1)),
        this)
    }
})

document.querySelector('.y2 > .x5').onclick = null

const player1 = {
    moves: [[], [], [], []],
    symbol: '\u274e',
    color: '#0f0',
}

const player2 = {
    moves: [[], [], [], []],
    symbol: '\u2705',
    color: '#f00',
}


let isPlayer1Turn = true


let circleMoves = [[], [], [], []]
let crossMoves = [[], [], [], []]

function move(x, y, element) {
    console.table({x, y})
    
    if (element.innerText != '') return
    if (isPlayer1Turn) {
        element.innerText = player1.symbol
        player1.moves[y].push(x)
    } else {
        element.innerText = player2.symbol
        player2.moves[y].push(x)
    }
    
    checkForWin()
    
    isPlayer1Turn = !isPlayer1Turn
    console.table({isPlayer1Turn})
}

function checkForWin() {
    
    let moves = []
    
    if (isPlayer1Turn) {
        moves = player1.moves
    } else {
        moves = player2.moves
    }
    
    for (let i = 1; i <= 3; i++) {
        if (((moves[i].includes(1) && moves[i].includes(2) && moves[i].includes(3))
        || (moves[i].includes(4) && moves[i].includes(5) && moves[i].includes(6))
        || (moves[i].includes(7) && moves[i].includes(8) && moves[i].includes(9))
        || (moves[i].includes(1) && moves[i].includes(4) && moves[i].includes(7))
        || (moves[i].includes(2) && moves[i].includes(5) && moves[i].includes(8))
        || (moves[i].includes(3) && moves[i].includes(6) && moves[i].includes(9))
        || (moves[i].includes(1) && moves[i].includes(5) && moves[i].includes(9))
        || (moves[i].includes(3) && moves[i].includes(5) && moves[i].includes(7)))
        
        || ((moves[1].includes(i) && moves[2].includes(i) && moves[3].includes(i))
        || (moves[1].includes(i + 3) && moves[2].includes(i + 3) && moves[3].includes(i + 3))
        || (moves[1].includes(i + 6) && moves[2].includes(i + 6) && moves[3].includes(i + 6))
        || (moves[1].includes(i) && moves[2].includes(i + 3) && moves[3].includes(i + 6))
        || (moves[1].includes(i + 6) && moves[2].includes(i + 3) && moves[3].includes(i)))
        
        || ((moves[1].includes((i - 1) * 3 + 1) && moves[2].includes((i - 1) * 3 + 2) && moves[3].includes((i - 1) * 3 + 3))
        || (moves[1].includes((i - 1) * 3 + 3) && moves[2].includes((i - 1) * 3 + 2) && moves[3].includes((i - 1) * 3 + 1)))
        
        || (moves[1].includes(1) && moves[2].includes(5) && moves[3].includes(9))
        || (moves[1].includes(3) && moves[2].includes(5) && moves[3].includes(7))
        || (moves[1].includes(9) && moves[2].includes(5) && moves[3].includes(1))
        || (moves[1].includes(7) && moves[2].includes(5) && moves[3].includes(3))
        )
        
         {
            win()
        }
    }
}

function win() {
    let winner
    if (isPlayer1Turn) {
        winner = player1
    } else {
        winner = player2
    }
    
    document.body.style.backgroundColor = winner.color
    
    document.querySelectorAll('.cell').forEach(element => {
    element.onclick = () => {}
    })

}