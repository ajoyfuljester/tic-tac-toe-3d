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

const PLAYERS = [player1, player2]


let isPlayer1Turn = true


let circleMoves = [[], [], [], []]
let crossMoves = [[], [], [], []]

function move(x, y, element) {
    let currentPlayer
    
    if (isPlayer1Turn) {
        currentPlayer = player1
    } else {
        currentPlayer = player2
    }

    if (element.innerHTML != '') return

    element.innerHTML = currentPlayer.symbol
    currentPlayer.moves[y].push(x)



    element.style.backgroundColor = currentPlayer.color
    
    checkForWin()
    
    isPlayer1Turn = !isPlayer1Turn
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
        ) {
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

const settingsDialog = document.querySelector('dialog')

document.querySelector('#open-settings').onclick = () => {
    settingsDialog.showModal()
}

document.querySelector('#save').onclick = () => {
    for (let i = 1; i <= 2; i++) {
        if (document.querySelector(`#P${i}Image`).value != '') {
            PLAYERS[i - 1].symbol = `<img src="${document.querySelector(`#P${i}Image`).value}">`
        }

        if (document.querySelector(`#P${i}Color`).value != '') {
            PLAYERS[i - 1].color = document.querySelector(`#P${i}Color`).value
        }
    }

    settingsDialog.close()
}

document.querySelector('#cancel').onclick = () => settingsDialog.close()

document.querySelector('#reset').onclick = () => {
    document.body.style.backgroundColor = '#fff'
    document.querySelectorAll('.cell').forEach((cell) => {
        cell.innerHTML = ''

        let backgroundColors = ['#fff', '#aaa', '#666']
        cell.style.backgroundColor = backgroundColors[cell.parentElement.classList[1][1] - 1]
        document.querySelector('.y2 > .x5').style.backgroundColor = '#000'

        cell.onclick = function() {
            move(parseInt(this.classList[1].split('').slice(1)),
            parseInt(this.parentElement.classList[1].split('').slice(1)),
            this)
        }
    })

    document.querySelector('.y2 > .x5').onclick = null

    for (const player of PLAYERS) {
        player.moves = [[], [], [], []]
    }

    isPlayer1Turn = true
}


document.querySelector('#rotation').oninput = () => {
    for (let level of document.querySelectorAll('.level')) {
        level.style.transform = `rotateX(45deg) rotateZ(${document.querySelector('#rotation').value}deg)`
    }
}

document.querySelector('#spacing').oninput = () => {
    document.querySelector('.y1').style.translate = `0 ${document.querySelector('#spacing').value}vh`
    document.querySelector('.y3').style.translate = `0 -${document.querySelector('#spacing').value}vh`
}