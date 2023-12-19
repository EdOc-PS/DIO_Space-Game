const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        time: document.querySelector("#time-id"),
        score: document.querySelector("#score-id")
    },
    values: {
        hitPosition: 0,
        scoreTotal: 0,
        timeTotal: 10
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countTime: setInterval(spendTime, 1000)
    }
};

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = state.view.squares[randomNumber];

        randomSquare.classList.add("enemy");
        state.values.hitPosition = randomSquare.id;
}
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("click", () => {
            if(square.id === state.values.hitPosition) {
                state.values.scoreTotal++;
                state.view.score.textContent = state.values.scoreTotal
                audioHit();
                state.values.hitPosition = null;
           
            }
           });
    });
}
function spendTime(){

    state.values.timeTotal--;
    state.view.time.textContent = state.values.timeTotal;
    if(state.values.timeTotal === 0){
        audioGameOver();   
        clearInterval(state.actions.timerId);
        clearInterval(state.actions.countTime);
        alert("Game Over")
    }
}
function audioHit(){
    let audio = new Audio("./assets/audio/hit2.wav");
    audio.play();
}
function audioGameOver(){
    let audio = new Audio("./assets/audio/gameover.wav");
    audio.play();
}
function audioBackground(){
    let audio = new Audio("./assets/audio/background.wav");
    audio.play();
}
function start() {
    addListenerHitBox();
    audioBackground();
}

start();