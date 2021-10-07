'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Ivan',
        lastName: 'Ivanov',
        email: 'ivan@mail.ru',
        password: '123456',
        position: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Alexey',
        lastName: 'Alexeev',
        email: 'alex@mail.ru',
        password: '123',
        position: 'manager',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { restartIdentity: true, truncate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, { restartIdentity: true, truncate: true });
  },
};
