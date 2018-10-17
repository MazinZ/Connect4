'use strict';
module.exports = (sequelize, DataTypes) => {
  const Connect4Game = sequelize.define('Connect4Game', {
    room_id: DataTypes.STRING,
    board: DataTypes.ARRAY(DataTypes.INTEGER),
    player_1: DataTypes.STRING,
    player_2: DataTypes.STRING,
    width: DataTypes.INTEGER,
    height: DataTypes.INTEGER,
    winner: DataTypes.INTEGER,
    draw: DataTypes.BOOLEAN
  }, {});
  Connect4Game.associate = function(models) {
    // associations can be defined here
  };
  return Connect4Game;
};