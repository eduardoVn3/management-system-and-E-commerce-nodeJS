// const env = {
//   database: 'celmedic_redinterna',
//   username: 'celmedic_redint1',
//   password: 'Redintern@',
//   host: 'celmedic.com',
//   dialect: 'mysql',
//   pool: {
//     max: 5000,
//     min: 0,
//     acquire: 60000,
//     idle: 20000
//   }
// };
const env = {
  database: 'redinterna',
  username: 'root',
  password: '',
  host: 'localhost',
  dialect: 'mysql',
  pool: {
	  max: 100,
	  min: 0,
	  acquire: 30000,
	  idle: 10000
  }
};

module.exports = env;
