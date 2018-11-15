module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
        `ALTER TABLE Messages MODIFY details mediumtext
        CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
      )
  },
  down: (queryInterface, Sequelize) => { }
}