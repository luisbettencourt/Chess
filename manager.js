let app = null;

function main(){
    let canvas = document.getElementById("canvas");
    app = new Chess();
    // app.drawGame(canvas);
    // app.clickCanvas();
    // app.calcPositionBoard("A1");
    // drawCanvasRect(canvas);
    // app.calcPieceMoves();
    // app.piecesPossibleMoves("B2");
    // app.squareCheck("C1", "white");
    
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



// piecesMovesValidated(possibleMoveDirection, possibleKillDirection) {
  //   const validatedMoves = [];
  //   let possibleKillPos = [];
  //   let possibleMovePos = [];

  //   for (let i = 0; i < possibleMoveDirection.length; i++) {
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



  // pawnMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   if (playerColor === "white") {
  //     possibleMovePos = [[cordXPiece, cordYPiece - 1], [cordXPiece, cordYPiece - 2]];
  //     possibleKillPos = [[cordXPiece + 1, cordYPiece - 1], [cordXPiece - 1, cordYPiece - 1]];
  //   }
  //   else {
  //     possibleMovePos = [[cordXPiece, cordYPiece + 1], [cordXPiece, cordYPiece + 2]];
  //     possibleKillPos = [[cordXPiece + 1, cordYPiece + 1], [cordXPiece - 1, cordYPiece + 1]];
  //   }

  //   possibleMovePos = possibleMovePos.filter((cords) => console.log(this.columns[cords[0]]) && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);
  //   possibleKillPos = possibleKillPos.filter((cords) => this.columns[cords[0]] && this.rows[cords[1]]).map((cords) => this.columns[cords[0]] + this.rows[cords[1]]);

  //   const validatedMoves = [];
  //   for (let i = 0; i < possibleMovePos.length; i++) {
  //     if (!Object.keys(this.Board).includes(possibleMovePos[i])) {
  //       validatedMoves.push(possibleMovePos[i]);
  //     }
  //     else {
  //       //nao vai verificar os quadrados a seguir porque tem uma peça a frente logo nao permite ir mais longe
  //       break;
  //     }
  //   }
  //   for (let i = 0; i < possibleKillPos.length; i++) {
  //     if (Object.keys(this.Board).includes(possibleKillPos[i]) && this.checkPieceOwner(this.Board[possibleKillPos[i]]) !== playerColor) {
  //       validatedMoves.push(possibleKillPos[i]);
  //     }
  //   }
  //   return validatedMoves;
  // }

  // rookMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   let possibleMoveDirection;
  //   let possibleKillDirection;

  //   if (playerColor === "white") {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece]);
  //       right.push([cordXPiece + i, cordYPiece]);
  //       up.push([cordXPiece, cordYPiece - i]);
  //       down.push([cordXPiece, cordYPiece + i]);
  //     }

  //     possibleMoveDirection = [left, right, up, down];
  //     possibleKillDirection = [left, right, up, down];
  //   }
  //   else {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece]);
  //       right.push([cordXPiece + i, cordYPiece]);
  //       up.push([cordXPiece, cordYPiece - i]);
  //       down.push([cordXPiece, cordYPiece + i]);
  //     }
  //     possibleMoveDirection = [left, right, up, down];
  //     possibleKillDirection = [left, right, up, down];
  //   }
  //   const validatedMoves = [];

  //   for (let i = 0; i < 4; i++) {
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
  //   // console.log(validatedMoves);

  //   return validatedMoves;
  // }


  // bishopMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   let possibleMoveDirection;
  //   let possibleKillDirection;

  //   if (playerColor === "white") {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece - i]);
  //       right.push([cordXPiece + i, cordYPiece - i]);
  //       up.push([cordXPiece - i, cordYPiece + i]);
  //       down.push([cordXPiece + i, cordYPiece + i]);
  //     }

  //     possibleMoveDirection = [left, right, up, down];
  //     possibleKillDirection = [left, right, up, down];
  //   }
  //   else {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece - i]);
  //       right.push([cordXPiece + i, cordYPiece - i]);
  //       up.push([cordXPiece - i, cordYPiece + i]);
  //       down.push([cordXPiece + i, cordYPiece + i]);
  //     }
  //     possibleMoveDirection = [left, right, up, down];
  //     possibleKillDirection = [left, right, up, down];
  //   }
  //   const validatedMoves = [];

  //   for (let i = 0; i < 4; i++) {
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


  // queenMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   let possibleMoveDirection;
  //   let possibleKillDirection;

  //   if (playerColor === "white") {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     let diagonalRightUp = [];
  //     let diagonalLeftUp = [];
  //     let diagonalRightDown = [];
  //     let diagonalLeftDown = [];

  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece]);
  //       right.push([cordXPiece + i, cordYPiece]);
  //       up.push([cordXPiece, cordYPiece - i]);
  //       down.push([cordXPiece, cordYPiece + i]);
  //       diagonalLeftUp.push([cordXPiece - i, cordYPiece - i]);
  //       diagonalRightUp.push([cordXPiece + i, cordYPiece - i]);
  //       diagonalLeftDown.push([cordXPiece - i, cordYPiece + i]);
  //       diagonalRightDown.push([cordXPiece + i, cordYPiece + i]);

  //     }
  //     possibleMoveDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
  //     possibleKillDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
  //   }
  //   else {
  //     let left = [];
  //     let right = [];
  //     let down = [];
  //     let up = [];
  //     let diagonalRightUp = [];
  //     let diagonalLeftUp = [];
  //     let diagonalRightDown = [];
  //     let diagonalLeftDown = [];

  //     for (let i = 1; i < 8; i++) {
  //       left.push([cordXPiece - i, cordYPiece]);
  //       right.push([cordXPiece + i, cordYPiece]);
  //       up.push([cordXPiece, cordYPiece - i]);
  //       down.push([cordXPiece, cordYPiece + i]);
  //       diagonalLeftUp.push([cordXPiece - i, cordYPiece - i]);
  //       diagonalRightUp.push([cordXPiece + i, cordYPiece - i]);
  //       diagonalLeftDown.push([cordXPiece - i, cordYPiece + i]);
  //       diagonalRightDown.push([cordXPiece + i, cordYPiece + i]);
  //     }
  //     possibleMoveDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
  //     possibleKillDirection = [left, right, up, down, diagonalLeftDown, diagonalLeftUp, diagonalRightDown, diagonalRightUp];
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



  // knightMoves(position) {
  //   const cordXPiece = this.getPieceCoords(position).xCoord;
  //   const cordYPiece = this.getPieceCoords(position).yCoord;
  //   const playerColor = this.checkPieceOwner(this.Board[position]);
  //   let possibleMovePos;
  //   let possibleKillPos;
  //   let possibleMoveDirection;
  //   let possibleKillDirection;

  //   if (playerColor === "white") {
  //     let frontRight = [];
  //     let frontLeft = [];
  //     let sideRight = [];
  //     let sideLeft = [];
  //     let downRight = [];
  //     let downLeft = [];
  //     let anotherSideRight = [];
  //     let anotherSideLeft = [];

  //     frontRight.push([cordXPiece + 1, cordYPiece - 2]);
  //     frontLeft.push([cordXPiece - 1, cordYPiece - 2]);
  //     sideLeft.push([cordXPiece - 2, cordYPiece + 1]);
  //     sideRight.push([cordXPiece - 2, cordYPiece - 1]);
  //     anotherSideLeft.push([cordXPiece + 2, cordYPiece - 1]);
  //     anotherSideRight.push([cordXPiece + 2, cordYPiece + 1]);
  //     downLeft.push([cordXPiece + 1, cordYPiece + 2]);
  //     downRight.push([cordXPiece - 1, cordYPiece + 2]);

  //     possibleMoveDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];
  //     possibleKillDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];
  //   }
  //   else {
  //     let frontRight = [];
  //     let frontLeft = [];
  //     let sideRight = [];
  //     let sideLeft = [];
  //     let downRight = [];
  //     let downLeft = [];
  //     let anotherSideRight = [];
  //     let anotherSideLeft = [];

  //     frontRight.push([cordXPiece + 1, cordYPiece - 2]);
  //     frontLeft.push([cordXPiece - 1, cordYPiece - 2]);
  //     sideLeft.push([cordXPiece - 2, cordYPiece + 1]);
  //     sideRight.push([cordXPiece - 2, cordYPiece - 1]);
  //     anotherSideLeft.push([cordXPiece + 2, cordYPiece - 1]);
  //     anotherSideRight.push([cordXPiece + 2, cordYPiece + 1]);
  //     downLeft.push([cordXPiece + 1, cordYPiece + 2]);
  //     downRight.push([cordXPiece - 1, cordYPiece + 2]);

  //     possibleMoveDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];
  //     possibleKillDirection = [frontLeft, frontRight, sideLeft, sideRight, anotherSideLeft, anotherSideRight, downLeft, downRight];
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
  //   // console.log(validatedMoves);
  //   return validatedMoves;
  // }