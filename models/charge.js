'use strict';
module.exports = (sequelize, DataTypes) => {
  var Charge = sequelize.define('Charge', {
  	name: DataTypes.STRING,
  	user_id: DataTypes.INTEGER,
  	status_id: DataTypes.INTEGER
  }, {});
  Charge.associate = function(models) {
    // associations can be defined here
  };
  return Charge;
};