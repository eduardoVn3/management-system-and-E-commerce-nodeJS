'use strict';
module.exports = (sequelize, DataTypes) => {
  var Suggestion = sequelize.define('Suggestion', {
    description:DataTypes.STRING,
    brand:DataTypes.STRING,
    color:DataTypes.STRING,
    image:DataTypes.TEXT,
    email_one:DataTypes.STRING,
    email_two:DataTypes.STRING,
    email_three:DataTypes.STRING,
    email_four:DataTypes.STRING,
    user_id:DataTypes.INTEGER,
    name_client:DataTypes.STRING,
    phone:DataTypes.STRING,
    status_id:DataTypes.INTEGER,
    shipping_status:DataTypes.STRING,
    score_sale : DataTypes.FLOAT,
    score_service : DataTypes.FLOAT
  }, {});
  Suggestion.associate = function(models) {
    // associations can be defined here
    // Suggestion.belongsTo(models.User);
  };
  return Suggestion;
};
