import React from "react";
import Ships from './Ships';
import Square from './Square';

export default class Board extends React.Component {
  static propTypes = {
    rowLength: React.PropTypes.number.isRequired,
    board: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onClick: React.PropTypes.func,
    hover: React.PropTypes.bool.isRequired,
    hideShips: React.PropTypes.bool.isRequired,
    untouched: React.PropTypes.number.isRequired,
    placedShip: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    ships: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
  };

  hideShipId(ship) {
    return this.props.hideShips || ship == null
  }

  maskSquareStatus(square) {
    return this.props.hideShips && square.status == this.props.placedShip
  }

  endOfRow(cellIndex) {
   return cellIndex % this.props.rowLength == this.props.rowLength - 1;
  }

  createBoard() {
    let board = [];

    for (var i = 0; i < this.props.board.length; i++) {
      let square = this.props.board[i];

      board.push(
        <Square
          key={i}
          className={this.props.hover ? 'hover' : ''}
          onClick={this.props.onClick}
          shipId={this.hideShipId(square.ship) ? null : square.ship.id}
          boardIndex={square.index}
          squareStatus={this.maskSquareStatus(square) ? this.props.untouched : square.status}
        />
      );

      if (this.endOfRow(i)) board.push(<br key={100 + i}/>);
    }

    return board
  }

  render() {
    return (
      <div className="board-container">
        <div className="title">
          {this.props.title}
        </div>

        <div className="board">
          {this.createBoard()}
        </div>

        <Ships ships={this.props.ships} />
      </div>
    )
  }
}
