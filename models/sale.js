'use strict';
module.exports = (sequelize, DataTypes) => {
  var sale = sequelize.define('sale', {
  	client_id:DataTypes.INTEGER,
  	user_id:DataTypes.INTEGER
  }, {});
  sale.associate = function(models) {
    // associations can be defined here
    sale.hasMany(models.Client);
    sale.hasMany(models.User);
  };
  return sale;
};