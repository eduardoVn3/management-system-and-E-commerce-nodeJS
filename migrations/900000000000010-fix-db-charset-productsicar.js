module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
        `ALTER TABLE ProductsSicars add dimension varchar(255);`
      )
  },
  down: (queryInterface, Sequelize) => { }
}
