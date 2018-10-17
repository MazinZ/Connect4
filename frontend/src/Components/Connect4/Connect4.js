import React, { Component } from 'react';
import ReactCursorPosition from 'react-cursor-position';
import * as Colyseus from 'colyseus.js';
import Connect4Board from './Board';
import Connect4Dropper from './Dropper';
import InfoPanel from './InfoPanel';
import { settings } from '../../settings';
import './styles/Connect4.css';

class Connect4 extends Component {
  constructor(props) {
    super(props);
    const spectate = this.props.match.params.id;
    this.colyseus = new Colyseus.Client('ws://localhost:8000');
    this.room = this.colyseus.join(spectate || 'connect4', { spectate: spectate || null });
    this.room.onStateChange.add(this.onStateChange);
    this.room.onMessage.add(this.onMessage);
    this.state = {
      board: [],
      win: null,
      draw: false,
      numSpectate: 0,
    };
  }

  onStateChange = (newState) => {
    this.setState(newState);
  }

  onMessage = (msg) => {
    this.setState(msg);
  }

  render() {
    if (!this.room) {
      return null;
    }
    const {
      symbol, numSpectate, draw, win, ended, start, turn,
    } = this.state;

    const { colors } = settings;
    const { color } = colors[symbol || 0];
    const active = !draw && !win;
    const isTurn = symbol === turn;
    const data = {
      spectator: !symbol,
      spectators: numSpectate,
      room: this.room.id,
      active,
      colors,
      isTurn,
      draw,
      win,
      ended,
      start,
    };

    return (
      <div className="connect4">
        <InfoPanel data={data} />
        <ReactCursorPosition>
          <Connect4Dropper
            turn={isTurn && active}
            pieceColor={color}
            action={this.room.send.bind(this.room)}
          />
        </ReactCursorPosition>
        <Connect4Board colors={colors} board={this.state.board} />
      </div>
    );
  }
}

export default Connect4;
