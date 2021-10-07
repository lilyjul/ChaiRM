'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Customers', [
      {
        firstName: 'Sergey',
        lastName: 'Sergeev',
        address: 'Address 1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Andrey',
        lastName: 'Andreev',
        address: 'Address 2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Nikolay',
        lastName: 'Nikolaev',
        address: 'Address 3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { restartIdentity: true, truncate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Customers', null, { restartIdentity: true, truncate: true });
  },
};
