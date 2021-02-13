const jsChess = window['js-chess-engine'];

class Chess {
  constructor() {
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
    this.pieceImages = this.initializePieces();
    this.canvas = document.getElementById("canvas");
    
    this.rows = ["1", "2", "3", "4", "5", "6", "7", "8"].reverse();
    this.columns = ["A", "B", "C", "D", "E", "F", "G", "H"];
    this.squareHeight = this.canvas.width / this.rows.length;
    this.squareWidth = this.canvas.height / this.columns.length;
    this.selectedPiece;
    this.loading = false;
    this.newGame();
  }
  
  objectGameState(){
    return {
      pieces : this.pieces,
      turn : this.turn,
      check : this.check,
      checkMate : this.checkMate,
      moves : this.moves,
      castling : this.castling,
      enPassant : this.enPassant,
      halfMove : this.halfMove,
      fullMove : this.fullMove,
      isFinished : this.isFinished
    }
  }

  newGame(){
    this.turn = "white";
    this.check = false;
    this.checkMate = false;
    this.isFinished = false;
    this.enPassant = null;
    this.halfMove = 0;
    this.fullMove = 0;

    this.castling = {
      whiteLong: false,
      whiteShort: false,
      blackLong: false,
      blackShort: false,
    };
    this.pieces = {
      A8: this.computerPieces[6],
      A7: this.computerPieces[8],
      B8: this.computerPieces[4],
      B7: this.computerPieces[9],
      C8: this.computerPieces[2],
      C7: this.computerPieces[10],
      D8: this.computerPieces[1],
      D7: this.computerPieces[11],
      E8: this.computerPieces[0],
      E7: this.computerPieces[12],
      F8: this.computerPieces[3],
      F7: this.computerPieces[13],
      G8: this.computerPieces[5],
      G7: this.computerPieces[14],
      H8: this.computerPieces[7],
      H7: this.computerPieces[15],

      A1: this.playerPieces[6],
      A2: this.playerPieces[8],
      B1: this.playerPieces[4],
      B2: this.playerPieces[9],
      C1: this.playerPieces[2],
      C2: this.playerPieces[10],
      D1: this.playerPieces[1],
      D2: this.playerPieces[11],
      E1: this.playerPieces[0],
      E2: this.playerPieces[12],
      F1: this.playerPieces[3],
      F2: this.playerPieces[13],
      G1: this.playerPieces[5],
      G2: this.playerPieces[14],
      H1: this.playerPieces[7],
      H2: this.playerPieces[15],
      
      // D4: this.playerPieces[0],
      // D5: this.computerPieces[15],
      // E4: this.computerPieces[2]
    };

    this.moves = this.calcPieceMoves(this.pieces, this.turn);
    this.drawGame();
    this.clickCanvas();
  }

  calcPieceMoves(board, turn, validateCheck = true) {
    let moves = {};
    const lengthObject = Object.keys(board);
    for (let i = 0; i < lengthObject.length; i++) {
      moves[lengthObject[i]] = this.piecesPossibleMoves(lengthObject[i], board); 
    }
    if(validateCheck){
      moves = this.validateCheckMoves(moves, turn);
      const kingCheck = this.kingCheckMate(board, moves, turn);
      this.check = kingCheck.check;
      this.checkMate = kingCheck.checkMate;
    }
    return moves;
  }


  validateCheckMoves(moves, turn){
    const validatedMoves = {...moves};
    Object.keys(validatedMoves).forEach((sourcePosition) =>  {
      if(this.checkPieceOwner(this.pieces[sourcePosition]) === turn){
        let pieceMoves = validatedMoves[sourcePosition];
        pieceMoves = pieceMoves.filter((targetPosition, i) => {
          const dummyPieces = {...this.pieces};
          let piece = dummyPieces[sourcePosition];
          dummyPieces[targetPosition] = piece;
          delete dummyPieces[sourcePosition];
          const dummyMoves = this.calcPieceMoves(dummyPieces, turn, false);
          if(this.kingCheckMate(dummyPieces, dummyMoves, turn).check){
            return false
          }
          return true
        });
        validatedMoves[sourcePosition] = pieceMoves;
      }
    });
    return validatedMoves;
  }

  getPlayerMoves(playerColor, pieces, moves){
    const lengthObject = Object.keys(pieces);
    let playerMoves = [];
      for(let i = 0; i < lengthObject.length;i++){
        const valueBoard = pieces[lengthObject[i]];
        if(this.checkPieceOwner(valueBoard) === playerColor){
          const playerPieceMoves = moves[lengthObject[i]];
          playerPieceMoves.forEach((move) => {
            if(!playerMoves.includes(move)){
              playerMoves.push(move);
            }
          })
        }
      }
    return playerMoves;
  }

  squareCheck(position, turn, pieces, moves) {
    const enemyColor = turn === "white" ? "black" : "white";
    const enemyMoves = this.getPlayerMoves(enemyColor, pieces, moves);
    return (enemyMoves.includes(position));
  }


  kingCheckMate(pieces, moves, turn){
    let kingPos;
    let check = false;
    let checkMate = false;
    if(turn === "white"){
      kingPos = Object.keys(pieces).find((pos) => "K" === (pieces)[pos])
    }
    else{
      kingPos = Object.keys(pieces).find((pos) => "k" === (pieces)[pos])
    }
    if(this.squareCheck(kingPos, turn, pieces, moves)){
      check = true; 
      if(!this.getPlayerMoves(turn, pieces, moves).length){
        checkMate = true;
      }
      else{
        checkMate = false;
      }
    }
    else{
      check = false;
    }
    return {check, checkMate}
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
    return  this.columns[xCoord] + this.rows[yCoord] ;
  }


  calcPositionBoard(position) {
    const coords = this.getPieceCoords(position);
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    const squareHeight = canvasWidth / this.rows.length;
    const squareWidth = canvasHeight / this.columns.length;
    return {
      posX: coords.xCoord * squareHeight,
      posY: coords.yCoord * squareWidth,
      squareWidth,
      squareHeight,
    };
  }

  drawGame(){
    this.drawBoard(canvas);
    this.piecesOnBoard(canvas);
    if(this.checkMate){
      if(this.turn === "white"){
        showModal("You lost")
      }
      else{
        showModal("You won")
      }
    }
  }


  drawBoard(canvas) {
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.rows.length; i++) {
      for (let j = 0; j < this.columns.length; j++) {
        const isWhite = (i % 2 === 0 && j % 2 === 1) || (i % 2 === 1 && j % 2 === 0);
        const position = this.columns[j] + this.rows[i];
        const pos = this.calcPositionBoard(position);
        ctx.beginPath();
        ctx.fillStyle = isWhite ? "#779556" : "#EBECD0";
        ctx.fillRect(pos.posX, pos.posY, pos.squareWidth, pos.squareHeight);
        ctx.fillStyle = isWhite ? "#EBECD0" : "#779556";
        ctx.fillText(position, pos.posX + 5, pos.posY + pos.squareHeight - 5);
        ctx.stroke();
      }
    }
  }

  piecesOnBoard(canvas) {
    let ctx = canvas.getContext("2d");
    let keysBoard = Object.keys(this.pieces);
    for (let i = 0; i < keysBoard.length; i++) {
      const piece = this.pieces[keysBoard[i]];
      const chessPiece = this.pieceImages[piece];
      const pos = this.calcPositionBoard(keysBoard[i]);
      if(chessPiece.complete){
        ctx.drawImage(chessPiece, pos.posX, pos.posY, pos.squareWidth, pos.squareHeight);
      }
      else{
        chessPiece.addEventListener("load", () => {
          ctx.drawImage(chessPiece, pos.posX, pos.posY, pos.squareWidth, pos.squareHeight);
        }, false);
      }
    }
  }

  checkPieceOwner(piece) {
    return (piece === piece.toUpperCase()) ? "white" : "black"
  }

  movePiece(sourcePosition, targetPosition, turn){
    let piece = this.pieces[sourcePosition];
    this.pieces[targetPosition] = piece;
    delete this.pieces[sourcePosition];
    this.drawGame(canvas);
    this.moves = this.calcPieceMoves(this.pieces, turn);
  }

  takeTurn(sourcePosition, targetPosition){
    this.loading = true;
    if(Object.keys(this.pieces).includes(targetPosition)){
      this.halfMove = - 1;
    }

    if(this.turn === "white"){
      this.movePiece(sourcePosition, targetPosition, this.turn);
      this.turn = "black";
      this.fullMove++;
      this.halfMove++;
      setTimeout(() =>{
      const aiMove = jsChess.aiMove(this.objectGameState(), 2);
      this.takeTurn(Object.keys(aiMove)[0], Object.values(aiMove)[0]);

      },500)
    }

    else{
      this.turn = "white";
      this.movePiece(sourcePosition, targetPosition, this.turn);
      this.fullMove++;
      this.halfMove++;
      this.loading = false;
    }
  }

  clickSquare(x, y){
    const xCord = Math.floor(x/this.squareWidth);
    const yCord = Math.floor(y/this.squareHeight);
    return this.getPiecePosition(xCord, yCord);
  }

  clickCanvas(){
    this.canvas.addEventListener("click", (e) => {
      const position = this.clickSquare(e.offsetX, e.offsetY);
      if(!this.loading){
        if(this.selectedPiece && this.moves[this.selectedPiece].includes(position)){
          this.takeTurn(this.selectedPiece, position);
          this.selectedPiece = undefined;
        }
      
      
      else if(Object.keys(this.pieces).includes(position) && this.checkPieceOwner(this.pieces[position]) === "white"){
        this.selectedPiece = position;
        this.drawPossiblePath();
      }
    }
    });
  } 
  
  drawPossiblePath(){
    let ctx = canvas.getContext("2d");
    const moves = this.moves[this.selectedPiece];
    if(moves){
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.drawGame(canvas);
      for(let i = 0; i < moves.length; i++){
        ctx.beginPath();
        const cords = this.getPieceCoords(moves[i]);
        const posX = this.squareWidth*cords.xCoord + this.squareWidth/2;
        const posY =  this.squareHeight*cords.yCoord + this.squareHeight/2;
        ctx.arc(posX, posY, 10, 0, 2 * Math.PI);
        ctx.stroke();
      }
    }
  }


  piecesPossibleMoves(position, board, moves) {
    const cordXPiece = this.getPieceCoords(position).xCoord;
    const cordYPiece = this.getPieceCoords(position).yCoord;
    const playerColor = this.checkPieceOwner(board[position]);
    let possibleKillDirection;
    let possibleMoveDirection;
    let checkYesNo = false;
    let left = [];
    let right = [];
    let down = [];
    let up = [];
    let frontRight = [];
    let frontLeft = [];
    let sideRight = [];
    let sideLeft = [];
    let downRight = [];
    let downLeft = [];
    let anotherSideRight = [];
    let anotherSideLeft = [];
    let diagonalRightUp = [];
    let diagonalLeftUp = [];
    let diagonalRightDown = [];
    let diagonalLeftDown = [];
    let front = [];

    switch (board[position]) {
      case "P":
        possibleMoveDirection = [[[cordXPiece, cordYPiece - 1]]];
        if(position[1] === this.rows[6]){
          possibleMoveDirection[0].push([cordXPiece, cordYPiece - 2]);
        }
        possibleKillDirection = [[[cordXPiece + 1, cordYPiece - 1]], [[cordXPiece - 1, cordYPiece - 1]]];
        break;
      case "p":
        possibleMoveDirection = [[[cordXPiece, cordYPiece + 1]]];
        if(position[1] === this.rows[1]){
          possibleMoveDirection[0].push([cordXPiece, cordYPiece + 2]);
        }
        possibleKillDirection = [[[cordXPiece + 1, cordYPiece + 1]], [[cordXPiece - 1, cordYPiece + 1]]];
        break;
      case "b":
      case "B":
        for (let i = 1; i < 8; i++) {
          left.push([cordXPiece - i, cordYPiece - i]);
          right.push([cordXPiece + i, cordYPiece - i]);
          up.push([cordXPiece - i, cordYPiece + i]);
          down.push([cordXPiece + i, cordYPiece + i]);
        }
        possibleMoveDirection = [left, right, up, down];
        possibleKillDirection = [left, right, up, down];
        break;
      case "r":
      case "R":
        for (let i = 1; i < 8; i++) {
          left.push([cordXPiece - i, cordYPiece]);
          right.push([cordXPiece + i, cordYPiece]);
          up.push([cordXPiece, cordYPiece - i]);
          down.push([cordXPiece, cordYPiece + i]);
        }
        possibleMoveDirection = [left, right, up, down];
        possibleKillDirection = [left, right, up, down];
        break;
      case "n":
      case "N":
        frontRight.push([cordXPiece + 1, cordYPiece - 2]);
        frontLeft.push([cordXPiece - 1, cordYPiece - 2]);
        sideLeft.push([cordXPiece - 2, cordYPiece + 1]);
        sideRight.push([cordXPiece - 2, cordYPiece - 1]);
        anotherSideLeft.push([cordXPiece + 2, cordYPiece - 1]);
        anotherSideRight.push([cordXPiece + 2, cordYPiece + 1]);
        downLeft.push([cordXPiece + 1, cordYPiece + 2]);
        downRight.push([cordXPiece - 1, cordYPiece + 2]);

        possibleMoveDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];
        possibleKillDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];

        break;

      case "q":
      case "Q":
        for (let i = 1; i < 8; i++) {
          left.push([cordXPiece - i, cordYPiece]);
          right.push([cordXPiece + i, cordYPiece]);
          up.push([cordXPiece, cordYPiece - i]);
          down.push([cordXPiece, cordYPiece + i]);
          diagonalLeftUp.push([cordXPiece - i, cordYPiece - i]);
          diagonalRightUp.push([cordXPiece + i, cordYPiece - i]);
          diagonalLeftDown.push([cordXPiece - i, cordYPiece + i]);
          diagonalRightDown.push([cordXPiece + i, cordYPiece + i]);

        }
        possibleMoveDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
        possibleKillDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
        break;

      case "k":
      case "K":
        checkYesNo = true;   
        frontRight.push([cordXPiece + 1, cordYPiece - 1]);
        frontLeft.push([cordXPiece - 1, cordYPiece - 1]);
        front.push([cordXPiece, cordYPiece - 1]);
        right.push([cordXPiece + 1, cordYPiece]);
        left.push([cordXPiece - 1, cordYPiece]);
        down.push([cordXPiece, cordYPiece + 1]);
        downLeft.push([cordXPiece + 1, cordYPiece + 1]);
        downRight.push([cordXPiece - 1, cordYPiece + 1]);
  
        possibleMoveDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
        possibleKillDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
      break;
    }

    let validatedMoves = [];
    let possibleKillPos = [];
    let possibleMovePos = [];

    for (let i = 0; i < possibleMoveDirection.length; i++) {
      possibleMovePos = possibleMoveDirection[i];
      possibleMovePos = possibleMovePos.filter((cords) => this.columns[cords[0]] && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);
     
      for (let i = 0; i < possibleMovePos.length; i++) {
        if (!Object.keys(board).includes(possibleMovePos[i])) {
          validatedMoves.push(possibleMovePos[i]);
        }
        else {
          //nao vai verificar os quadrados a seguir porque tem uma peça a frente logo nao permite ir mais longe
          break;
        }
      }
    }

    for (let i = 0; i < possibleKillDirection.length; i++) {
      possibleKillPos = possibleKillDirection[i];
      possibleKillPos = possibleKillPos.filter((cords) => this.columns[cords[0]] && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);
      for (let i = 0; i < possibleKillPos.length; i++) {
        if (Object.keys(board).includes(possibleKillPos[i])) {
          if (this.checkPieceOwner(board[possibleKillPos[i]]) !== playerColor) {
            validatedMoves.push(possibleKillPos[i]);
          }
          break;
        }
      }

    }
    // console.log(validatedMoves);
    return validatedMoves;
  }


  


  // kingMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   let possibleMoveDirection;
  //   let possibleKillDirection;

  //   if (playerColor === "white") {
  //     let front = [];
  //     let frontRight = [];
  //     let frontLeft = [];
  //     let right = [];
  //     let left = [];
  //     let down = []
  //     let downRight = [];
  //     let downLeft = [];

  //     frontRight.push([cordXPiece + 1, cordYPiece - 1]);
  //     frontLeft.push([cordXPiece - 1, cordYPiece - 1]);
  //     front.push([cordXPiece, cordYPiece - 1]);
  //     right.push([cordXPiece + 1, cordYPiece]);
  //     left.push([cordXPiece - 1, cordYPiece]);
  //     down.push([cordXPiece, cordYPiece + 1]);
  //     downLeft.push([cordXPiece + 1, cordYPiece + 1]);
  //     downRight.push([cordXPiece - 1, cordYPiece + 1]);

  //     possibleMoveDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
  //     possibleKillDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
  //   }
  //   else {
  //     let front = [];
  //     let frontRight = [];
  //     let frontLeft = [];
  //     let right = [];
  //     let left = [];
  //     let down = []
  //     let downRight = [];
  //     let downLeft = [];

  //     frontRight.push([cordXPiece + 1, cordYPiece - 1]);
  //     frontLeft.push([cordXPiece - 1, cordYPiece - 1]);
  //     front.push([cordXPiece, cordYPiece - 1]);
  //     right.push([cordXPiece + 1, cordYPiece]);
  //     left.push([cordXPiece - 1, cordYPiece]);
  //     down.push([cordXPiece, cordYPiece + 1]);
  //     downLeft.push([cordXPiece + 1, cordYPiece + 1]);
  //     downRight.push([cordXPiece - 1, cordYPiece + 1]);

  //     possibleMoveDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
  //     possibleKillDirection = [frontLeft, frontRight, front, right, left, down, downLeft, downRight];
  //   }
  //   const validatedMoves = [];

  //   for (let i = 0; i < 8; i++) {
  //     possibleMovePos = possibleMoveDirection[i];
  //     possibleKillPos = possibleKillDirection[i];

  //     possibleMovePos = possibleMovePos.filter((cords) => this.columns[cords[0]] && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);
  //     possibleKillPos = possibleKillPos.filter((cords) => this.columns[cords[0]] && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);

  //     for (let i = 0; i < possibleMovePos.length; i++) {
  //       if (!Object.keys(this.Board).includes(possibleMovePos[i])) {
  //         validatedMoves.push(possibleMovePos[i]);
  //       }
  //       else {
  //         //nao vai verificar os quadrados a seguir porque tem uma peça a frente logo nao permite ir mais longe
  //         break;
  //       }
  //     }
  //     for (let i = 0; i < possibleKillPos.length; i++) {
  //       if (Object.keys(this.Board).includes(possibleKillPos[i])) {
  //         if (this.checkPieceOwner(this.Board[possibleKillPos[i]]) !== playerColor) {
  //           validatedMoves.push(possibleKillPos[i]);
  //         }
  //         break;
  //       }
  //     }
  //   }
  //   console.log(validatedMoves);
  //   return validatedMoves;
  // }





}




