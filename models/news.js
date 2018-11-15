'use strict';
module.exports = (sequelize, DataTypes) => {
  var News = sequelize.define('News', {
  	title:DataTypes.STRING,
  	description:DataTypes.STRING,
  	image:DataTypes.TEXT('length')
  }, {});
  News.associate = function(models) {
    // associations can be defined here
  };
  return News;
};