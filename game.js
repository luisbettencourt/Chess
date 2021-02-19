class Game {
  constructor(online, name, difficulty = 1) {
    this.online = online;
    this.name = name;
    this.difficulty = difficulty;
    this.board = new Board(this);
  }

  async joinGame() {
    try {
      if (this.online) {
        this.room = await client.joinOrCreate("room", {
          maxClients: 2,
          online: true,
          name: this.name,
        });
      } else {
        this.room = await client.create("room", {
          maxClients: 1,
          online: false,
          difficulty: difficulty,
          name: this.name,
        });
      }

      this.room.onMessage("gameState", (gameState) => {
        game.updateGameState(gameState);
      });
    } catch (e) {
      console.error("join error", e);
    }
  }

  updateGameState(gameState) {
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
