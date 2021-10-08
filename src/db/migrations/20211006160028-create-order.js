'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      orderNumber: {
        allowNull: false,
        type: Sequelize.INTEGER,
        unique: true,
      },
      furnType: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      furnPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      shippingPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      installPrice: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      shippingCrew: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      installCrew: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      orderStatus: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      customerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  },
};
