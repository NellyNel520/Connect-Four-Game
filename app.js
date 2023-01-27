// DOM reference / Global variables
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

//Selects a random number doesn't always start with player 1
const selectRandomNumber = (min, max) =>
Math.floor(Math.random() * (max - min)) + min

//Loop through array
const verifyArray = (arrayElement) => {
    let bool = false
    let elementCount = 0
    arrayElement.forEach((element, index) => {
        if(element == currentPlayer) {
            elementCount += 1
            if(elementCount == 4) {
                bool = true
            }
        }
        else {
            elementCount = 0
        }
    })
    return bool
}

// Game Over Check
const gameOverCheck = () => {
    let truthCount = 0
    for(let innerArray of initMatrix) {
        if (innerArray.every((val) => val != 0)) {
            truthCount += 1
        } else {
            return false
        }
    }
    if (truthCount == 6) {
        message.innerHTML = "Game Over!"
        startScreen.classList.remove("hide")
    }
}



// Checks rows for matches
const checkAdjacentRowValues = (row) => {
    return verifyArray(initMatrix[row])
}

// Check column for matches 
const checkAdjacentColumnValues = (column) => {
    let colWinCount = 0
    colWinBool = false
    initMatrix.forEach((element, index) => {
        if(element[column] == currentPlayer) {
            colWinCount += 1
            if (colWinCount == 4) {
                colWinBool = true
            }
        } else {
            colWinCount = 0
        }
    })
    //if theres no match 
    return colWinBool
}


//Get right diagonal values
const getRightDiagonal = (row, column, rowLength, columnLength) => {
    let rowCount = row
    let columnCount = column
    let rightDiagonal = []
    while (rowCount > 0){
        if(columnCount >= columnLength - 1){
            break
        }
        rowCount -= 1
        columnCount += 1
        rightDiagonal.unshift(initMatrix[rowCount] [columnCount])
    }
    rowCount = row
    columnCount = column
    while (rowCount < rowLength) {
        if (columnCount <  0){
            break
        }
        rightDiagonal.push(initMatrix [rowCount][columnCount])
        rowCount += 1
        columnCount -= 1
    }
    return rightDiagonal
}
//Get Left diagonal values
const getLeftDiagonal = (row, column, rowLength, columnLength) => {
    let rowCount = row 
let columnCount = column
let leftDiagonal = []
while (rowCount>0) {
    if (columnCount<=0) {
        break
    }
    row -= 1
    columnCount -= 1
    leftDiagonal.unshift(initMatrix[rowCount] [columnCount])
}
rowCount = row
columnCount = column
while (rowCount < rowLength) {
    if (columnCount >= columnLength) {
        break
    }
    leftDiagonal.push(initMatrix[rowCount] [columnCount])
    rowCount +=1
    columnCount += 1
    }
    return leftDiagonal
}




//Check diagonal 
const checkAdjacentDiagonalValues = (row, column) => {
    let diagWinBool = false
    let tempChecks = {
        leftTop: [],
        rightTop: [],
    }
    let columnLength = initMatrix[row].length
    let rowLength = initMatrix.length


    //Store left and right diagonal array
    tempChecks.leftTop = [
        ...getLeftDiagonal(row, column, rowLength, columnLength),
    ]
    tempChecks.rightTop = [
        ...getRightDiagonal(row, column, rowLength, columnLength),
    ]
    //check both arrays for matches
    diagWinBool = verifyArray(tempChecks.rightTop)
    if(!diagWinBool) {
        diagWinBool = verifyArray(tempChecks.leftTop)
    }
    return diagWinBool
}


//Checking for win Logic 
const winCheck = (row, column) => {
    // if any of the functions return true ... return true
    return checkAdjacentRowValues(row)
        ? true 
        : checkAdjacentColumnValues(column)
        ? true 
        : checkAdjacentDiagonalValues(row, column) 
        ? true 
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
    setToken(5, colValue)
    currentPlayer = currentPlayer == 1 ? 2 : 1

    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn!`
}

// /Render Game Matrix
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
    currentPlayer = selectRandomNumber(1, 3)
    container.innerHTML = ""
    await renderMatrix()
    playerTurn.innerHTML = `Player <span>${currentPlayer}'s</span> turn!`
}

//Start Game Event listener
startButton.addEventListener("click", () => {
    startScreen.classList.add("hide")
    startGame()
})