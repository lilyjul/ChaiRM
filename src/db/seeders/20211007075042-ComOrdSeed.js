'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('CommentOrders', [
      {
        commentId: 4,
        orderId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        commentId: 5,
        orderId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        commentId: 6,
        orderId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { restartIdentity: true, truncate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CommentOrders', null, { restartIdentity: true, truncate: true });
  },
};
