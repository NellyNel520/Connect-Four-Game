// DOM reference
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

//Placing token in box when user clicks on a box
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

