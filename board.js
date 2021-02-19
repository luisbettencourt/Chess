class Board {
  constructor(gameState) {
    this.gameState = gameState;
    this.computerPieces = [
      "k",
      "q",
      "b",
      "b",
      "n",
      "n",
      "r",
      "r",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
      "p",
    ];
    this.playerPieces = [
      "K",
      "Q",
      "B",
      "B",
      "N",
      "N",
      "R",
      "R",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
      "P",
    ];
    this.rows = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse();
    this.columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.squareHeight;
    this.squareWidth;
    this.selectedPiece;
    this.pieceImages = this.initializePieces();
    this.canvas = document.getElementById("canvas");
    setTimeout(() => {
      this.canvasResize();
    }, 500);
    window.addEventListener("resize", () => this.canvasResize());
    this.clickCanvas();
  }

  canvasResize() {
    const parentSize = this.canvas.parentNode.getBoundingClientRect();
    const parentWidth = parentSize.width;
    const parentHeight = parentSize.height;
    let canvasSize = Math.min(parentWidth, parentHeight);
    this.canvas.width = canvasSize;
    this.canvas.height = canvasSize;
    this.drawGame();
  }

  initializePieces() {
    const pieces = {};

    for (let i = 0; i < this.computerPieces.length; i++) {
      const chessPiece = new Image();
      const imagePath = "./images/" + this.computerPieces[i] + "-black.png";
      chessPiece.src = imagePath;
      pieces[this.computerPieces[i]] = chessPiece;
    }

    for (let i = 0; i < this.playerPieces.length; i++) {
      const chessPiece = new Image();
      const imagePath = "./images/" + this.playerPieces[i] + "-white.png";
      chessPiece.src = imagePath;
      pieces[this.playerPieces[i]] = chessPiece;
    }

    return pieces;
  }

  getPieceCoords(position) {
    const xCoord = this.columns.findIndex((column) => column === position[0]);
    const yCoord = this.rows.findIndex((row) => row === position[1]);
    return { xCoord, yCoord };
  }

  getPiecePosition(xCoord, yCoord) {
    return this.columns[xCoord] + this.rows[yCoord];
  }

  calcPositionBoard(position) {
    const coords = this.getPieceCoords(position);
    const canvasSize = this.canvas.getBoundingClientRect();
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    this.squareWidth = canvasWidth / this.rows.length;
    this.squareHeight = canvasHeight / this.columns.length;
    return {
      posX: coords.xCoord * this.squareWidth,
      posY: coords.yCoord * this.squareHeight,
      squareWidth: this.squareWidth,
      squareHeight: this.squareHeight,
    };
  }

  drawGame() {
    this.showPlayerNames();
    this.drawBoard(canvas);
    this.piecesOnBoard(canvas);
    if (!this.gameState.playersReady) {
      showWaitingModal();
    } else {
      closeWaitingModal();
    }

    if (this.gameState.newGameRequested) {
      showRequestModal(this.gameState.newGameRequested === "black");
    } else {
      closeRequestModal();
    }

    if (this.gameState.checkMate) {
      if (this.gameState.turn === "white") {
        showModal("You lost");
      } else {
        showModal("You won");
      }
    } else if (this.gameState.draw) {
      showModal("Draw");
    }
  }

  showPlayerNames() {
    if (this.gameState.name) {
      let namePlayer = document.getElementById("playerWhiteName");
      namePlayer.innerHTML = this.gameState.name;
    }
    if (this.gameState.opponentName) {
      let opponentName = document.getElementById("playerBlackName");
      opponentName.innerHTML = this.gameState.opponentName;
    }
  }

  drawBoard(canvas) {
    let ctx = canvas.getContext("2d");
    const canvasSize = this.canvas.getBoundingClientRect();
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.columns.length; j++) {
        const isWhite =
          (i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0);
        const position = this.columns[j] + this.rows[i];
        const pos = this.calcPositionBoard(position);
        ctx.beginPath();
        ctx.fillStyle = isWhite ? "#779556" : "#EBECD0";
        ctx.fillRect(pos.posX, pos.posY, pos.squareWidth, pos.squareHeight);
        ctx.fillStyle = isWhite ? "#EBECD0" : "#779556";
        ctx.fillText(position, pos.posX + 5, pos.posY + pos.squareHeight - 5);
        if (
          position === this.gameState.lastMove?.sourcePosition ||
          position === this.gameState.lastMove?.targetPosition
        ) {
          ctx.fillStyle = "rgba(255, 255, 0, 0.5)";
          ctx.fillRect(pos.posX, pos.posY, pos.squareWidth, pos.squareHeight);
        }
      }
    }
  }

  piecesOnBoard(canvas) {
    let ctx = canvas.getContext("2d");
    if (this.gameState.pieces) {
      let keysBoard = Object.keys(this.gameState.pieces);
      for (let i = 0; i < keysBoard.length; i++) {
        const piece = this.gameState.pieces[keysBoard[i]];
        const chessPiece = this.pieceImages[piece];
        const pos = this.calcPositionBoard(keysBoard[i]);
        if (chessPiece.complete) {
          if (
            this.gameState.movablePieces.includes(keysBoard[i]) &&
            this.gameState.turn === "white"
          ) {
            ctx.shadowColor = "blue";
            ctx.shadowBlur = 3;
          }
          ctx.drawImage(
            chessPiece,
            pos.posX,
            pos.posY,
            pos.squareWidth,
            pos.squareHeight
          );
          ctx.shadowBlur = 0;
        } else {
          chessPiece.addEventListener(
            "load",
            () => {
              if (
                this.gameState.movablePieces.includes(keysBoard[i]) &&
                this.gameState.turn === "white"
              ) {
                ctx.shadowColor = "#0000a8";
                ctx.shadowBlur = 3;
              }
              ctx.drawImage(
                chessPiece,
                pos.posX,
                pos.posY,
                pos.squareWidth,
                pos.squareHeight
              );
              ctx.shadowBlur = 0;
            },
            false
          );
        }
      }
    }
  }

  checkPieceOwner(piece) {
    return piece === piece.toUpperCase() ? "white" : "black";
  }

  clickSquare(x, y) {
    const xCord = Math.floor(x / this.squareWidth);
    const yCord = Math.floor(y / this.squareHeight);
    return this.getPiecePosition(xCord, yCord);
  }

  clickCanvas() {
    this.canvas.onclick = (e) => {
      const position = this.clickSquare(e.offsetX, e.offsetY);
      if (
        this.gameState.playersReady &&
        !this.gameState.loading &&
        "white" === this.gameState.turn
      ) {
        if (
          this.selectedPiece &&
          this.gameState.moves[this.selectedPiece].includes(position)
        ) {
          this.gameState.takeTurn(this.selectedPiece, position);
          this.selectedPiece = undefined;
        } else if (
          Object.keys(this.gameState.pieces).includes(position) &&
          this.checkPieceOwner(this.gameState.pieces[position]) === "white"
        ) {
          this.selectedPiece = position;
          this.drawPossiblePath();
        }
      }
    };
  }

  highlightMovablePieces(turn = "white") {
    const lengthObject = Object.keys(this.gameState.pieces);
    let playerMoves = {};
    let arrayPositions = [];
    for (let i = 0; i < lengthObject.length; i++) {
      const valueBoard = this.gameState.pieces[lengthObject[i]];
      if (this.checkPieceOwner(valueBoard) === turn) {
        playerMoves[lengthObject[i]] = game.moves[lengthObject[i]];
      }
    }
    for (let i = 0; i < Object.keys(playerMoves).length; i++) {
      const position = Object.keys(playerMoves)[i];
      const arrayMoves = playerMoves[position];
      if (arrayMoves.length !== 0) {
        arrayPositions.push(position);
      }
    }
    return arrayPositions;
  }

  drawPossiblePath() {
    let ctx = canvas.getContext("2d");
    const moves = this.gameState.moves[this.selectedPiece];
    if (moves) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawGame(canvas);
      for (let i = 0; i < moves.length; i++) {
        ctx.beginPath();
        const cords = this.getPieceCoords(moves[i]);
        const posX = this.squareWidth * cords.xCoord + this.squareWidth / 2;
        const posY = this.squareHeight * cords.yCoord + this.squareHeight / 2;
        if (
          this.gameState.pieces[moves[i]] &&
          this.checkPieceOwner(this.gameState.pieces[moves[i]]) !==
            this.gameState.turn
        ) {
          ctx.arc(posX, posY, this.squareWidth / 2, 0, 2 * Math.PI);
          ctx.strokeStyle = "rgba(0,0,0,.3)";
          ctx.lineWidth = 5;
          ctx.stroke();
        } else {
          ctx.fillStyle = "rgba(0,0,0,.2)";
          ctx.arc(posX, posY, 15, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }
  }
}
