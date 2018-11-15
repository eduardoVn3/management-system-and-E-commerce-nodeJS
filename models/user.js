'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    // It is possible to create foreign keys:
    status_id: DataTypes.INTEGER,

    email: DataTypes.STRING,
    dni: DataTypes.STRING,
    nickname: DataTypes.STRING,
    password: DataTypes.STRING,
    type_employee: DataTypes.STRING,
    // id_status:{
    //   type:Sequelize.INTEGER,
    //   foreignKey:true,
    //   references:{
    //     model:'status',
    //     key:'id'
    //   }
    // },
    description_status: DataTypes.STRING,
    avatar: DataTypes.TEXT('length'),
    start_time: DataTypes.STRING,
    end_time: DataTypes.STRING,

  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message);
    User.hasMany(models.Suggestion);
    User.hasOne(models.Charge);
    User.hasOne(models.Contract);
    User.hasMany(models.Assistance);
  };
  return User;
};
