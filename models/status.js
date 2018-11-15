'use strict';
module.exports = (sequelize, DataTypes) => {
  var Status = sequelize.define('Status', {
    name: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    freezeTableName:true
  });
  Status.associate = function(models) {
    // associations can be defined here
    Status.hasOne(models.User)
  };
  return Status;
};
