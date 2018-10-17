import React from 'react';

const Connect4Piece = (props) => {
  const { color, x } = props;
  const style = {
    backgroundColor: color,
    borderRadius: '50%',
    height: '50px',
    width: '50px',
    position: 'absolute',
    left: x,
  };
  return (
    <div style={style} />
  );
};

export default Connect4Piece;
