'use strict';
module.exports = (sequelize, DataTypes) => {
  var Score = sequelize.define('Score', {
  	user_id:DataTypes.INTEGER,
  	product_id:DataTypes.INTEGER,
  	date_made:DataTypes.STRING,
  	type_service:DataTypes.STRING
  }, {});
  Score.associate = function(models) {
    // associations can be defined here
    Score.hasMany(models.User);
    Score.hasMany(models.ProductsSicar);
  };
  return Score;
};