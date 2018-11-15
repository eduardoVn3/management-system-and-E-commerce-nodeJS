'use strict';
module.exports = (sequelize, DataTypes) => {
  var order = sequelize.define('order', {
    code: DataTypes.STRING,
    order_date: DataTypes.DATE,
    arrival_date: DataTypes.DATE,
    status_id: DataTypes.INTEGER
  }, {});
  order.associate = function(models) {
    // associations can be defined here
  };
  return order;
};
