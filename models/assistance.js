'use strict';
module.exports = (sequelize, DataTypes) => {
  var Assistance = sequelize.define('Assistance', {
  	time_arrival: DataTypes.DATE,
  	time_departure: DataTypes.DATE,
  	lunchtime: DataTypes.DATE,
  	lunch_break: DataTypes.DATE,
  	status_id: DataTypes.INTEGER,
  	user_id: DataTypes.INTEGER
  }, {});
  Assistance.associate = function(models) {
    // associations can be defined here
  };
  return Assistance;
};