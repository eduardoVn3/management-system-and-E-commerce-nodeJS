'use strict';
module.exports = (sequelize, DataTypes) => {
  var Contract = sequelize.define('Contract', {
  	name: DataTypes.STRING,
  	time_arrival: DataTypes.DATE,
  	time_departure: DataTypes.DATE,
  	num_days_week: DataTypes.INTEGER,
  	num_week: DataTypes.INTEGER,
  	amount_pay: DataTypes.DECIMAL(10, 2),
  	user_id: DataTypes.INTEGER
  }, {});
  Contract.associate = function(models) {
    // associations can be defined here
  };
  return Contract;
};