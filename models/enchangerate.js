'use strict';
module.exports = (sequelize, DataTypes) => {
  var EnchangeRate = sequelize.define('EnchangeRate', {
  	site : DataTypes.STRING,
  	service : DataTypes.STRING,
  	buy : DataTypes.FLOAT, 
  	sale : DataTypes.FLOAT 
  }, {});
  EnchangeRate.associate = function(models) {
    // associations can be defined here
  };
  return EnchangeRate;
};