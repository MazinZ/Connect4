import React, { Component } from 'react';
import Connect4Piece from './Piece';
import './styles/Dropper.css';

class Connect4Dopper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
    };
  }

  movePiece = () => {
    const mouse = this.props.position.x;
    const offset = Math.min(mouse, 6 * 50);
    const x = Math.floor(offset / ((6 * 50) / 6)) * 50;
    this.setState({ x });
  }

  dropPiece = () => {
    const col = this.state.x / 50;
    this.props.action({ command: 'play', col });
  }

  render() {
    const { x, y } = { ...this.state };

    return (
      <div className="dropper" onMouseMove={this.movePiece} onClick={this.dropPiece}>
        { this.props.turn
          && <Connect4Piece x={x} y={y} color={this.props.pieceColor} />
        }
      </div>
    );
  }
}

export default Connect4Dopper;
