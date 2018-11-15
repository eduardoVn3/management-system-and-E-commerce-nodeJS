const env = require('./env.js');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(env.database, env.username, env.password, {
  logging:false,
  host: env.host,
  dialect: env.dialect,
  operatorsAliases: false,

  pool: {
    max: env.max,
    min: env.pool.min,
    acquire: env.pool.acquire,
    idle: env.pool.idle
  },
  dialectOptions: {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci'
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//Models/tables
db.Status = require('../models/status.js')(sequelize, Sequelize);
db.User = require('../models/user.js')(sequelize, Sequelize);
db.Channel = require('../models/channel.js')(sequelize, Sequelize);
db.Message = require('../models/message.js')(sequelize, Sequelize);
db.Suggestion = require('../models/suggestion.js')(sequelize, Sequelize);
db.Category = require('../models/category.js')(sequelize, Sequelize);
db.ProductsSicar = require('../models/productssicar.js')(sequelize, Sequelize);
db.Charge = require('../models/charge.js')(sequelize, Sequelize);
db.Contract = require('../models/contract.js')(sequelize, Sequelize);
db.Assistance = require('../models/assistance.js')(sequelize, Sequelize);
db.FeatureSystem = require('../models/featuresystem.js')(sequelize, Sequelize);
db.Permission = require('../models/permission.js')(sequelize, Sequelize);
db.EnchangeRate = require('../models/enchangerate.js')(sequelize, Sequelize);
db.Score = require('../models/score.js')(sequelize, Sequelize);
db.Client= require('../models/client.js')(sequelize, Sequelize);
db.Sale= require('../models/sale.js')(sequelize, Sequelize);
db.Sale_detail= require('../models/sale_detail.js')(sequelize, Sequelize);
db.News= require('../models/sale_detail.js')(sequelize, Sequelize);
db.Property = require('../models/property.js')(sequelize, Sequelize);
db.Order = require('../models/order.js')(sequelize, Sequelize);
db.OrderDetail = require('../models/order_detail.js')(sequelize, Sequelize);

db.User.belongsTo(db.Status,{ foreignKey: 'status_id'})
db.Message.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Message.belongsTo(db.Channel,{ foreignKey: 'channel_id'})
db.Suggestion.belongsTo(db.User,{ foreignKey: 'user_id'})
db.ProductsSicar.belongsTo(db.Category,{ foreignKey: 'category_id'})
db.Charge.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Charge.belongsTo(db.Status,{ foreignKey: 'status_id'})
db.Contract.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Assistance.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Assistance.belongsTo(db.Status,{ foreignKey: 'status_id'})
db.Permission.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Permission.belongsTo(db.FeatureSystem,{ foreignKey: 'feature_system_id'})
db.Score.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Score.belongsTo(db.ProductsSicar,{ foreignKey: 'product_id'})
db.Sale.belongsTo(db.Client,{ foreignKey: 'client_id'})
db.Sale.belongsTo(db.User,{ foreignKey: 'user_id'})
db.Sale_detail.belongsTo(db.Sale,{ foreignKey: 'sale_id'})
db.Sale_detail.belongsTo(db.ProductsSicar,{ foreignKey: 'product_id'})
db.Category.hasMany(db.ProductsSicar,{ foreignKey: 'category_id', as: 'ProductsSicar'})

db.OrderDetail.belongsTo(db.ProductsSicar,{ foreignKey: 'product_id'})
db.OrderDetail.belongsTo(db.Order,{ foreignKey: 'order_id'})
db.Order.belongsTo(db.Status,{ foreignKey: 'status_id'})

db.Order.hasMany(db.OrderDetail,{ foreignKey: 'order_id', as : 'OrderDetail'})
// db.ProductsSicar.hasOne(db.OrderDetail,{ foreignKey: 'product_id', as : 'ProductsSicar'})
// db.Order.hasOne(db.Status,{ foreignKey: 'status_id', as : 'Status'})

module.exports = db;
