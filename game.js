class Game {
  constructor(room) {
    this.room = room;
    this.board = new Board(this);
  }

  updateGameState(gameState) {
    console.log(gameState);
    this.newGameRequested = gameState.newGameRequested;
    this.playersReady = gameState.playersReady;
    this.name = gameState.name;
    this.opponentName = gameState.opponentName;
    this.loading = gameState.loading;
    this.draw = gameState.draw;
    this.movablePieces = gameState.movablePieces;
    this.lastMove = gameState.lastMove;
    this.pieces = gameState.pieces;
    this.turn = gameState.turn;
    this.check = gameState.check;
    this.checkMate = gameState.checkMate;
    this.moves = gameState.moves;
    this.castling = gameState.castling;
    this.enPassant = gameState.enPassant;
    this.halfMove = gameState.halfMove;
    this.fullMove = gameState.fullMove;
    this.isFinished = gameState.isFinished;
    this.board.drawGame();
  }

  takeTurn(sourcePosition, targetPosition) {
    this.room.send("move", { sourcePosition, targetPosition });
  }

  requestNewGame() {
    this.room.send("requestNewGame");
  }

  answerNewGameRequest(val) {
    this.room.send("answerNewGame", val);
  }
}
