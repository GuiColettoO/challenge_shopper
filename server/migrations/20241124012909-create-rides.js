'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable('rides', {
      ride_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      destination: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      distance: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      value: {
        type: DataTypes.DECIMAL,
        allowNull: true,
      },
      customer_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'customer_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      driver_id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'drivers',
          key: 'driver_id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('rides');
  },
};
