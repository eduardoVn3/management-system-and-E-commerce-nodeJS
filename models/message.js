'use strict';
module.exports = (sequelize, DataTypes) => {
  var Message = sequelize.define('Message', {
  	details: DataTypes.TEXT('length'),
    num_users_read: DataTypes.STRING,
  	user_id: DataTypes.INTEGER,
  	channel_id: DataTypes.INTEGER
  }, {});
  Message.associate = function(models) {
    Message.hasMany(models.User);
    Message.hasMany(models.Channel);
  };
  return Message;
};
