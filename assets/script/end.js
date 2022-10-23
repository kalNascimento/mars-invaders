const saveButton = document.getElementById('save');
const username = document.getElementById('username');
const youScore = document.getElementById('youScore');

let scores = localStorage.getItem("scores") == null ? 0 : localStorage.getItem("scores").split(',');
let scoreBoards = []
let lastScoreBoard = localStorage.getItem("scoreBoard");
let lastScore = scores == 0 ? 0 : scores[scores.length-1];

youScore.innerHTML = "Score: "+ lastScore

console.log(scores)
console.log(lastScore)


saveButton.addEventListener('click', () => {
    let scoreBoard = {
        user: username.value,
        score: lastScore
    };
    scoreBoards.push(lastScoreBoard);
    scoreBoards.push(JSON.stringify(scoreBoard));
    localStorage.setItem('scoreBoard',  scoreBoards)
    console.log(localStorage.getItem("scoreBoard"))

    setTimeout(() => {
        location = "./index.html";
    }, 500);
});
