//catching the DOM
var userScore = 0
var compputerScore = 0
const userScore_span = document.getElementById("user-score")
const compputerScore_span = document.getElementById("computer-score")
const scoreBoar_div = document.querySelector(".score-board")
const result_div = document.querySelector(".result>p")
const rock_div = document.getElementById("r")
const papper_div = document.getElementById("p")
const scissors_div = document.getElementById("s")

//funs

function wordEquivalent(letter) {
    if (letter == 'r') return "Rock"
    if (letter == 'p') return "Papper"
    return "Scissor"
}


function getComputerChoice() {
    const choices = ['r', 'p', 's']
    const ranNum = Math.floor(Math.random() * 3)
    return choices[ranNum]
}

function win(userChoice, compChoice) {
    compputerScore++;
    userColor = document.getElementById(userChoice)
    userScore_span.innerHTML = userScore
    compputerScore_span.innerHTML = compputerScore
    result_div.innerHTML = `${wordEquivalent(userChoice)}  Beats   ${wordEquivalent(compChoice)}   . YOU WIN ! `
    userColor.classList.add('userWin')
    setTimeout(() => {
        userColor.classList.remove('userWin')
    }, 300)
}

function lose(userChoice, compChoice) {
    userScore++;
    userColor = document.getElementById(userChoice)
    userScore_span.innerHTML = userScore
    compputerScore_span.innerHTML = compputerScore
    result_div.innerHTML = `${wordEquivalent(userChoice)}    Loses To   ${wordEquivalent(compChoice)}   . YOU LOSE !`
    userColor.classList.add('userLose')
    setTimeout(() => {
        userColor.classList.remove('userLose')
    }, 300)
}

function draw(userChoice, compChoice) {
    userColor = document.getElementById(userChoice)
    result_div.innerHTML = `${wordEquivalent(userChoice)}   Equal To   ${wordEquivalent(compChoice)}   . ITS A DRAW !`
    userColor.classList.add('userDraw')
    setTimeout(() => {
        userColor.classList.remove('userDraw')
    }, 300)
}


function game(userChoice) {
    const compChoice = getComputerChoice()
    console.log('computer Choice : ' + compChoice)
    console.log('user choice : ' + userChoice)
    switch (userChoice + compChoice) {
        case "rs":
        case "pr":
        case "sp":
            console.log('user wins')
            win(userChoice, compChoice)
            break
        case "rp":
        case "ps":
        case "sr":
            console.log('computer wins')
            lose(userChoice, compChoice)
            break
        case "rr":
        case "pp":
        case "ss":
            console.log('draw')
            draw(userChoice, compChoice)
            break
    }
}


function main() {
    rock_div.addEventListener("click", () => {
        game("r")
    })
    papper_div.addEventListener("click", () => {
        game("p")
    })
    scissors_div.addEventListener("click", () => {
        game("s")
    })
}
main()