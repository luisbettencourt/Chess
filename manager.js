let game = null;
let app = null;
let difficulty = 0;
let nameLogin = "";
// let client = new Colyseus.Client("ws://chess-server-pcm.herokuapp.com");
let client = new Colyseus.Client("ws://chess-server-pcm.herokuapp.com");
let room;

console.log(process?.env)
function main() {
  showLoginModal();
}

function joinRoomOnline() {
  const difSection = document.getElementById("chooseDifficulty");
  const menuSection = document.getElementById("menuStart");
  const gameSection = document.getElementById("gameSection");

  difSection.style.display = "none";
  menuSection.style.display = "none";
  gameSection.style.display = "grid";

  game = new Game(true, nameLogin);
  game.joinGame();
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

function showRequestModal(needsAnswer) {
  if (needsAnswer) {
    jQuery("#requestNewGameAnswer").modal("show");
  } else {
    jQuery("#requestNewGame").modal("show");
  }
}
function closeRequestModal() {
  jQuery("#requestNewGame").modal("hide");
  jQuery("#requestNewGameAnswer").modal("hide");
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
  game = new Game(false, nameLogin, difficulty);
  game.joinGame();

  const difSection = document.getElementById("chooseDifficulty");
  const menuSection = document.getElementById("menuStart");
  const gameSection = document.getElementById("gameSection");

  difSection.style.display = "none";
  menuSection.style.display = "none";
  gameSection.style.display = "grid";
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
  closeRequestModal();
}
