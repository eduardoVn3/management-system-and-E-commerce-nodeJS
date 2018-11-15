'use strict';
module.exports = (sequelize, DataTypes) => {
  var Sale_detail = sequelize.define('Sale_detail', {
  	sale_id:DataTypes.INTEGER,
  	product_id:DataTypes.INTEGER,
  	type_service:DataTypes.STRING
  }, {});
  Sale_detail.associate = function(models) {
    // associations can be defined here
  };
  return Sale_detail;
};