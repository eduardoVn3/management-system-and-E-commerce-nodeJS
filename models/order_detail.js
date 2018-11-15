'use strict';
module.exports = (sequelize, DataTypes) => {
  var order_detail = sequelize.define('order_detail', {
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    existent: DataTypes.INTEGER
  }, {});
  order_detail.associate = function(models) {
    // associations can be defined here
  };
  return order_detail;
};
