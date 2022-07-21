"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Spots", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ownerId: {
        type: Sequelize.INTEGER,
      },
      address: {
        type: Sequelize.STRING(30),
      },
      city: {
        type: Sequelize.STRING(30),
      },
      state: {
        type: Sequelize.STRING(40),
      },
      country: {
        type: Sequelize.STRING(40),
      },
      lat: {
        type: Sequelize.FLOAT,
      },
      lng: {
        type: Sequelize.FLOAT,
      },
      name: {
        type: Sequelize.STRING(40),
      },
      description: {
        type: Sequelize.STRING(250),
      },
      price: {
        type: Sequelize.FLOAT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      previewImage: {
        type: Sequelize.STRING,
      }
    });
  },


  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Spots");
  },
};
