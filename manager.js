let game = null;
let app = null;
let difficulty = 0;
let nameLogin = "";
let client = new Colyseus.Client("ws://localhost:3000");
let room;

function main() {
  showLoginModal();
}

async function joinOnlineGame() {
  try {
    room = await client.joinOrCreate("room", {
      maxClients: 2,
      online: true,
      name: nameLogin,
    });

    game = new Game(room);
    
    room.onMessage("gameState", (gameState) => {
      console.log(gameState);
      game.updateGameState(gameState);
    });
    
    room.onMessage("gameState", (gameState) => {
      console.log(gameState);
      game.updateGameState(gameState);
    });

    console.log("joined successfully", room);
  } catch (e) {
    console.error("join error", e);
  }
}

async function joinOfflineGame() {
  try {
    room = await client.joinOrCreate("room", {
      maxClients: 1,
      online: false,
      difficulty: difficulty,
      name: nameLogin,
    });

    game = new Game(room);

    room.onStateChange.once((state) => {
      console.log("this is the first room state!", state);
    });

    room.onStateChange((state) => {
      console.log("the room state has been updated:", state);
    });

    room.onMessage("gameState", (gameState) => {
      console.log(gameState);
      game.updateGameState(gameState);
    });

    console.log("joined successfully", room);
  } catch (e) {
    console.error("join error", e);
  }
}

function joinRoomOnline() {
  joinOnlineGame();
  const dif = document.getElementById("chooseDifficulty");
  const menu = document.getElementById("menuStart");
  const game = document.getElementById("gameSection");

  // namePlayer.innerHTML = nameLogin;
  // nameOpponent.innerHTML = "Computer Level: " + difficulty;

  dif.style.display = "none";
  menu.style.display = "none";
  game.style.display = "grid";
}

function serverOpen() {
  if (room) {
    room.send("move", "hey");
  }
}

function drawCanvasRect() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "black";
  ctx.lineWidth = 2;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);
}

function showModal(texto) {
  jQuery("#modalTexto").html(texto);
  jQuery("#modalTexto").text(texto);
  jQuery("#popup").modal("show");
}

function modalAction() {
  game.requestNewGame();
  jQuery("#popup").modal("hide");
}

function showLoginModal() {
  let eventLogin = document.getElementById("nameField");
  jQuery("#login").modal("show");
  eventLogin.addEventListener("keypress", inputKeyPress);
}

function showWaitingModal() {
  jQuery("#waitForOpponent").modal("show");
}
function closeWaitingModal() {
  jQuery("#waitForOpponent").modal("hide");
}

function showRequestModal() {
  jQuery("#requestNewGame").modal("show");
}
function closeRequestModal() {
  jQuery("#requestNewGame").modal("hide");
}

function loginModalAction() {
  nameLogin = document.getElementById("nameField").value;
  jQuery("#login").modal("hide");
}

function inputKeyPress(event) {
  if (event.key === "Enter") {
    loginModalAction();
  }
}

function changeDifficulty(difValue) {
  difficulty = difValue;
  let buttonDifficulty = document.getElementsByClassName("buttonDif");
  for (let i = 0; i < buttonDifficulty.length; i++) {
    if (i === difValue) {
      buttonDifficulty[i].classList.add("active");
    } else {
      buttonDifficulty[i].classList.remove("active");
    }
  }
}

function startGame() {
  //   app = new Chess(nameLogin, "Computer Level: " + difficulty, difficulty);
  joinOfflineGame();
  const dif = document.getElementById("chooseDifficulty");
  const menu = document.getElementById("menuStart");
  const game = document.getElementById("gameSection");
  //   let nameOpponent = document.getElementById("playerBlackName");
  //   let namePlayer = document.getElementById("playerWhiteName");

  //   namePlayer.innerHTML = nameLogin;
  //   nameOpponent.innerHTML = "Computer Level: " + difficulty;

  dif.style.display = "none";
  menu.style.display = "none";
  game.style.display = "grid";
}

function playComputer() {
  const dif = document.getElementById("chooseDifficulty");
  const menu = document.getElementById("menuStart");
  const game = document.getElementById("gameSection");
  dif.style.display = "grid";
  menu.style.display = "none";
  game.style.display = "none";
}

function goToMenu() {
  const dif = document.getElementById("chooseDifficulty");
  const menu = document.getElementById("menuStart");
  const game = document.getElementById("gameSection");
  dif.style.display = "none";
  menu.style.display = "flex";
  game.style.display = "none";
  closeWaitingModal();
}
