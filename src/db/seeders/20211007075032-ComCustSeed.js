'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CommentCustomers', [
      {
        commentId: 1,
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        commentId: 2,
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        commentId: 3,
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { restartIdentity: true, truncate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CommentCustomers', null, { restartIdentity: true, truncate: true });
  },
};
