// DOM reference
const container = document.querySelector(".container")
const playerTurn = document.querySelector("startScreen")
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
            innerDiv.addEventListener("click", (event) => {
                fillBox(event)
            })
            outerDiv.appendChild(innerDiv)
        }
        container.appendChild(outerDiv)
    }
}

