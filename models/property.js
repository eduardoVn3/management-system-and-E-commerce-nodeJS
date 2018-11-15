'use strict';
module.exports = (sequelize, DataTypes) => {
  var Property = sequelize.define('Property', {
    code:DataTypes.STRING,
    section:DataTypes.STRING,
    label:DataTypes.STRING,
    value:DataTypes.STRING
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};
