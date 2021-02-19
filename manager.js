let game = null;
let app = null;
let difficulty = 0;
let nameLogin = "";
let client = new Colyseus.Client("ws://localhost:3000");
let room;

function main(){
    showLoginModal();
    // let canvas = document.getElementById("canvas");
    // app = new Chess("", "", difficulty);
    // app.highlightMovablePieces();
    // app.drawGame(canvas);
    // app.clickCanvas();
    // app.calcPositionBoard("A1");
    // drawCanvasRect(canvas);
    // app.calcPieceMoves();
    // app.piecesPossibleMoves("B2");
    // app.squareCheck("C1", "white");
    
}


async function join() {
    try {
      room = await client.joinOrCreate("room", {
        maxClients: 2
      });

      game = new Game(room);

      room.onStateChange.once((state) => {
        console.log("this is the first room state!", state);
      });
  
      room.onStateChange((state) => {
        console.log("the room state has been updated:", state);
      });
  
      room.onMessage("gameState", (gameState) => {
        console.log(gameState)
        game.updateGameState(gameState);    
        // console.log("message received from server");
        // console.log(message);
      });

      console.log("joined successfully", room);
    } catch (e) {
      console.error("join error", e);
    }
  
  }

function joinRoomOnline(){
    join();
    const dif = document.getElementById("chooseDifficulty");
    const menu = document.getElementById("menuStart");
    const game = document.getElementById("gameSection");

    // namePlayer.innerHTML = nameLogin;
    // nameOpponent.innerHTML = "Computer Level: " + difficulty;

    dif.style.display = "none";
    menu.style.display = "none";
    game.style.display = "grid";
}



function serverOpen(){
    if(room){
        room.send("move", "hey");
    }
}


function drawCanvasRect(){
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function showModal(texto){
    jQuery('#modalTexto').html(texto);
    jQuery('#popup').modal('show');
}

function modalAction(){
    app.newGame();
    jQuery('#popup').modal('hide');
}

function showLoginModal(){
    let eventLogin = document.getElementById("nameField");
    jQuery('#login').modal('show');
    eventLogin.addEventListener("keypress", inputKeyPress);
}

function loginModalAction(){
    nameLogin = document.getElementById("nameField").value;
    jQuery('#login').modal('hide');
}

function inputKeyPress(event){
    if(event.key === "Enter"){
        loginModalAction();
    }
}

function changeDifficulty(difValue){
    difficulty = difValue;
    let buttonDifficulty = document.getElementsByClassName("buttonDif");
    for(let i = 0; i < buttonDifficulty.length; i++){
        if(i === difValue){
            buttonDifficulty[i].classList.add("active");
        }
        else{
            buttonDifficulty[i].classList.remove("active");
        }
    }
}

function startGame(){
    app = new Chess(nameLogin, "Computer Level: " + difficulty, difficulty);
    let nameOpponent = document.getElementById("playerBlackName");
    let namePlayer = document.getElementById("playerWhiteName");
    const dif = document.getElementById("chooseDifficulty");
    const menu = document.getElementById("menuStart");
    const game = document.getElementById("gameSection");

    namePlayer.innerHTML = nameLogin;
    nameOpponent.innerHTML = "Computer Level: " + difficulty;

    dif.style.display = "none";
    menu.style.display = "none";
    game.style.display = "grid";
}

function playComputer(){
    const dif = document.getElementById("chooseDifficulty");
    const menu = document.getElementById("menuStart");
    const game = document.getElementById("gameSection");
    dif.style.display = "grid";
    menu.style.display = "none";
    game.style.display = "none";
}

function goToMenu(){
    const dif = document.getElementById("chooseDifficulty");
    const menu = document.getElementById("menuStart");
    const game = document.getElementById("gameSection");
    dif.style.display = "none";
    menu.style.display = "flex";
    game.style.display = "none";
}




