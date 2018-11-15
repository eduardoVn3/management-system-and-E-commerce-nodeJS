'use strict';

var fs        = require('fs');
var path      = require('path');
// var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
// var env       = process.env.NODE_ENV || 'development';
// var config    = require(__dirname + '/..\config\config.json')[env];
var ctrl        = {};

// if (config.use_env_variable) {
//   var sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   var sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var fileName = path.basename(file,'.js');
    ctrl[fileName] = require('./'+fileName);;
    console.log(ctrl);
  });

// Object.keys(ctrl).forEach(modelName => {
//   if (ctrl[modelName].associate) {
//     ctrl[modelName].associate(ctrl);
//   }
// });
//
// ctrl.sequelize = sequelize;
// ctrl.Sequelize = Sequelize;

module.exports = ctrl;
