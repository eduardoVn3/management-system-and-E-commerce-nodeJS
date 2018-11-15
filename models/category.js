'use strict';
module.exports = (sequelize, DataTypes) => {
  var Category = sequelize.define('Category', {
  	name:DataTypes.STRING,
  	point_sale:DataTypes.FLOAT,
	  service_point:DataTypes.FLOAT,
    image_cover:DataTypes.STRING,
    icon:DataTypes.STRING
  }, {});
  Category.associate = function(models) {
    //
  };
  return Category;
};
