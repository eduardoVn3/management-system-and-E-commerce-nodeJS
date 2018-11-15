'use strict';
module.exports = (sequelize, DataTypes) => {
  var FeatureSystem = sequelize.define('FeatureSystem', {
  	name: DataTypes.STRING
  }, {});
  FeatureSystem.associate = function(models) {
    // associations can be defined here
  };
  return FeatureSystem;
};