'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('WordIndices', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
      },
      wordId: {
        type: Sequelize.UUID
      },
      paragraphId: {
        type: Sequelize.UUID
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('WordIndices');
  }
};
