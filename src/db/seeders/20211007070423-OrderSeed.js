'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        orderNumber: 101,
        furnType: 'chair',
        furnPrice: 100,
        shippingPrice: 1,
        installPrice: 5,
        shippingCrew: 'crew 1',
        installCrew: 'crew 1',
        orderStatus: 'in process',
        customerId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderNumber: 102,
        furnType: 'chair',
        furnPrice: 200,
        shippingPrice: 2,
        installPrice: 10,
        shippingCrew: 'crew 2',
        installCrew: 'crew 2',
        orderStatus: 'in process',
        customerId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        orderNumber: 103,
        furnType: 'chair',
        furnPrice: 300,
        shippingPrice: 3,
        installPrice: 15,
        shippingCrew: 'crew 3',
        installCrew: 'crew 3',
        orderStatus: 'in process',
        customerId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], { restartIdentity: true, truncate: true });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Orders', null, { restartIdentity: true, truncate: true });
  },
};
