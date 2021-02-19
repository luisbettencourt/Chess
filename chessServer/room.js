const colyseus = require('colyseus');
const {Chess} = require("./chessLogic");

class MyRoom extends colyseus.Room {
    // When room is initialized
    constructor(){
        super()
        this.app = null;

    }

    sendGameState(){
        if(this.state.white){
            this.state.white.send('gameState', this.app.clientGameState());
        }
        if(this.state.black){
            this.state.black.send('gameState', this.app.mirrorClientGameState());
        }
    }

    onCreate (options) { 
        this.app = new Chess("", "", true);
        console.log(this.app.moves);
        this.setState({});

        this.onMessage("move", (client, move) => {
            console.log(move); 
            if(this.app.online){
                if(client === this.state.white){
                    this.app.takeTurnOnline(move, "white");
                }
                if(client === this.state.black){
                    console.log("mirror: ")
                    console.log(this.app.mirrorMove(move))
                    this.app.takeTurnOnline(this.app.mirrorMove(move), "black");
                }
            } 
            else{
                this.app.takeTurn(move.sourcePosition, move.targetPosition);
            }
            this.sendGameState();
            setTimeout(() => {
                this.sendGameState();
            }, 1000)
            
        });
    }

    // Authorize client based on provided options before WebSocket handshake is complete
    // onAuth (client, options, request) { }

    // When client successfully join the room
    onJoin (client, options, auth) { 
        this.broadcast("move", "i joined");
        if (!this.state.white) {
            this.setState({...this.state, white: client });
        }
        else if (!this.state.black) {
            this.setState({...this.state, black: client });
        }

        if (this.clients.length === 2) {
            this.lock();
            console.log("lock");
        }
        client.send("gameState", this.app.clientGameState());
        console.log(this.app.clientGameState());
    }
    // When a client leaves the room
    onLeave (client, consented) { 
        if (this.clients.length < 2) {
            this.unlock();
            console.log("unlock");
        }
    }

    // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
    onDispose () { }
}
exports.MyRoom = MyRoom;
