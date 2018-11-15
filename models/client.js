'use strict';
module.exports = (sequelize, DataTypes) => {
  var Client = sequelize.define('Client', {
  	name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    dni: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.TEXT('length'),
    phone_number:DataTypes.STRING
  }, {});
  Client.associate = function(models) {
    // associations can be defined here
  };
  return Client;
};