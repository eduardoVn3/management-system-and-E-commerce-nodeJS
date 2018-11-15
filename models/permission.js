'use strict';
module.exports = (sequelize, DataTypes) => {
  var Permission = sequelize.define('Permission', {
  	feature_system_id: DataTypes.INTEGER,
  	user_id: DataTypes.INTEGER,
  	code_c: DataTypes.STRING,
  	code_r: DataTypes.STRING,
  	code_u: DataTypes.STRING,
  	code_d: DataTypes.STRING
  }, {});
  Permission.associate = function(models) {
    // associations can be defined here
  };
  return Permission;
};