module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
        `ALTER TABLE ProductsSicars MODIFY purchase_price FLOAT;`
      )
  },
  down: (queryInterface, Sequelize) => { }
}