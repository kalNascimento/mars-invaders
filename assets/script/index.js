const scores = document.getElementById('scores');

let scoreBoard = localStorage.getItem("scoreBoard").split(',');
let test = [];

// let test2 = {
//     user: [],
//     score: []
// };

let shortScore = []

let scoreArr = [];
let username = [];

for (let i = 0; i < scoreBoard.length; i++) {
    test.push(scoreBoard[i].replace(/((user|object Object|score|[\[\]{}":]))/mg, ""))
}

for (let i = 0; i < scoreBoard.length; i++) {
    if (i % 2 == 1 && scoreBoard[i] != "") {
        username.push(test[i]);
    }
    if (i % 2 == 0 && scoreBoard[i] != "") {
        scoreArr.push(test[i]);
    }
}

for (let j = 0; j < username.length; j++) {
    let test2 = {
        user: username[j],
        score: scoreArr[j]
    };
    shortScore.push([username[j], scoreArr[j]])
}

printScore = shortScore.sort(function(a, b) {
    return b[1] - a[1];
})

for (let i = 0; i < printScore.length; i++) {
    scores.innerHTML += `<p>${printScore[i][0]}: ${printScore[i][1]}</p>`;
}