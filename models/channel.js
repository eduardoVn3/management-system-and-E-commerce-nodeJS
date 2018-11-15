'use strict';
module.exports = (sequelize, DataTypes) => {
  var Channel = sequelize.define('Channel', {
  	name: DataTypes.STRING
  }, {});
  Channel.associate = function(models) {
    Channel.hasMany(models.Message)
  };
  return Channel;
};
