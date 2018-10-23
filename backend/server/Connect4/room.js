const Room = require('colyseus').Room;
const Connect4Model = require('../models').Connect4Game;
const Connect4Board = require('./connect4');

class Connect4Room extends Room {
  onInit() {
    this.maxClients = 100;
    this.spectators = {};
    this.players = {};
    this.setState({
      board: [],
      turn: null,
      numSpectate: 0,
    });
  }

  requestJoin(options, isNew) {
    const numPlayers = Object.keys(this.players).length;
    if (options.spectate) {
      return options.spectate === this.roomId || isNew;
    }
    return numPlayers <= 1;
  }

  onJoin(client, options) {
    const id = client.sessionId;
    const numPlayers = Object.keys(this.players).length;
    if (options.spectate) {
      this.spectators[id] = true;
      this.state.numSpectate = Object.keys(this.spectators).length;
    }
    if (numPlayers < 2 && !this.spectators[id]) {
      if (numPlayers === 0) {
        this.players[id] = 1;
      } else {
        this.setupGame(id);
      }
      this.send(client, { symbol: this.players[id] });
    }
  }

  setupGame(id) {
    this.players[id] = 2;
    this.game = Connect4Board(6, 7);
    this.state.board = this.game.board;
    this.turn = [1, 2][Math.floor(Math.random() * 2)];
    this.state.turn = this.turn;
    this.broadcast({ start: true });
  }

  handlePlay(id, msg) {
    const symbol = this.players[id];
    if (this.turn === symbol && !this.win) {
      const valid = this.game.play(symbol, msg.col);
      if (valid !== null) {
        this.turn = this.turn - 1 || this.turn + 1;
        this.state.turn = this.turn;
        this.state.board = this.game.board;
        const win = this.game.checkWin(valid, msg.col, symbol);
        const draw = this.game.checkDraw();
        if (win) {
          this.broadcast({ draw: true });
          this.draw = true;
        } else if (draw) {
          this.broadcast({ win: symbol });
          this.win = symbol;
        }
      }
    }
  }

  onMessage(client, message) {
    const id = client.sessionId;
    if (message.command === 'play') {
      this.handlePlay(id, message);
    }
  }

  onLeave(client) {
    const id = client.sessionId;
    if (this.spectators[id]) {
      delete this.spectators[id];
      this.state.numSpectate = Object.keys(this.spectators).length;
    } else {
      this.broadcast({ ended: true });
      this.disconnect();
    }
  }

  onDispose() {
    if (this.game) {
      const flat = [];
      this.game.board.map(row => flat.push(...row));
      const players = Object.keys(this.players);
      const data = {
        board: flat,
        player_1: players[0] || '',
        player_2: players[1] || '',
        room_id: this.roomId,
        draw: this.draw || false,
        winner: this.win || null,
        height: 6,
        width: 7,
      };
      return Connect4Model.create(data);
    }
  }
}

module.exports = Connect4Room;
