'use strict';
module.exports = (sequelize, DataTypes) => {
  var ProductsSicar = sequelize.define('ProductsSicar', {
  	clave:DataTypes.STRING,
    clave_alt:DataTypes.STRING,
    description:DataTypes.STRING,
    purchase_price:DataTypes.STRING,
    sale_price:DataTypes.STRING,
    stock:DataTypes.STRING,
    weight:DataTypes.STRING,
    characteristic:DataTypes.STRING,
    department:DataTypes.STRING,

    purchase_price_usd : DataTypes.STRING,
    purchase_price_new : DataTypes.STRING,
    stock_1 : DataTypes.STRING,
    stock_2 : DataTypes.STRING,
    stock_3 : DataTypes.STRING,
    stock_4 : DataTypes.STRING,
    stock_5 : DataTypes.STRING,
    percentage_purchase : DataTypes.FLOAT,
    score_sale : DataTypes.FLOAT,
    score_service : DataTypes.FLOAT,

    base_price : DataTypes.FLOAT,

    monetary_conversion:DataTypes.STRING,
    category_id:DataTypes.INTEGER,
    category_id:DataTypes.INTEGER,

    image : DataTypes.STRING,
    brand : DataTypes.STRING,
    model : DataTypes.STRING,
    color : DataTypes.STRING,
    dimension : DataTypes.STRING
  }, {
  	// freezeTableName:true
  });
  ProductsSicar.associate = function(models) {
    // associations can be defined here

  };
  return ProductsSicar;
};
