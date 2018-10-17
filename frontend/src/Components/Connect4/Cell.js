import React from 'react';
import './styles/Cell.css';

const Connect4Cell = (props) => {
  const { color, i } = props;

  const style = {
    backgroundColor: color,
  };

  return (
    <div style={style} className={`cell ${i}`} />
  );
};

export default Connect4Cell;
