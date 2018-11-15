module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
        `ALTER TABLE ProductsSicars MODIFY sale_price FLOAT;`
      )
  },
  down: (queryInterface, Sequelize) => { }
}