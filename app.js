// DOM reference / Global 
const container = document.querySelector(".container")
const playerTurn = document.getElementById("playerTurn")
const startScreen = document.querySelector(".startScreen")
const startButton = document.getElementById("start")
const message = document.getElementById("message")

let initMatrix = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

let currentPlayer 

//Selects a random number from given range
const selectRandomNumber = (min, max) =>
Math.floor(Math.random() * (max - min)) + min

//Checking for win Logic 
const winCheck = (row, column) => {
    // if any of the functions return true ... return true
    return checkAdjacentRowValues(row)
    ? true 
    : checkAdjacentColumnValues(column)
    ? true 
    : checkAdjacentDiagonalValues(row, column) ? true 
    : false
}


//set Token to exact points
const setToken = (startCount, colValue) => {
    let rows = document.querySelectorAll(".grid-row")
    // Initially places the tokens in the last row. if no place available will default to decrement the count until it finds an open slot
    if(initMatrix[startCount] [colValue] != 0) {
        startCount -= 1
        setToken(startCount, colValue)
    } else {
        //place token 
        let currentRow = rows[startCount].querySelectorAll(".grid-box")
        currentRow[colValue].classList.add("filled", `player${currentPlayer}`)
        //update matrix
        initMatrix[startCount][colValue] = currentPlayer
        //Checks for wins
        if (winCheck(startCount, colValue)) {
            message.innerHTML = `Player<span> ${currentPlayer}</span> wins!`
            startScreen.classList.remove("hide")
            return false
        }
    }
    // check if all slots are full 
    gameOverCheck()

}




//User clicks -> Placing token in box 
const fillBox = (e) => {
    //column value
    let colValue = parseInt(e.target.getAttribute("data-value"))
    //6 rows so 5 *index starts at 0 not 1
    SecurityPolicyViolationEvent(5, colValue)
    currentPlayer = currentPlayer == 1 ? 2 : 1
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn!`
}

//Render Game Matrix
const renderMatrix = () => {
    for (let innerArray in initMatrix) {
        let outerDiv = document.createElement("div")
        outerDiv.classList.add("grid-row")
        outerDiv.setAttribute("data-value", innerArray)
        for (let j in initMatrix[innerArray]){
            //sets matrix values to 0
            initMatrix[innerArray][j] = [0]
            let innerDiv = document.createElement("div")
            innerDiv.classList.add("grid-box")
            innerDiv.setAttribute("data-value", j)
            innerDiv.addEventListener("click", (e) => {
                fillBox(e)
            })
            outerDiv.appendChild(innerDiv)
        }
        container.appendChild(outerDiv)
    }
}

//Start Game 
window.onload = startGame = async () => {
    //select random number between 1&2 to determine player 1 & 2
    currentPlayer = selectRandomNumber(1,3)
    container.innerHTML = ""
    await renderMatrix()
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn!`
}

