'use strict';
module.exports = {
  up: async(queryInterface, Sequelize) =>{
    await queryInterface.createTable("Images", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      imageableId: {
        type: Sequelize.INTEGER,
      },
      imageableType: {
        type: Sequelize.ENUM,
        values: ["spot", "review"],
      },
      url: {
        type: Sequelize.STRING,
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
    });
  },
   down: async(queryInterface, Sequelize) => {
    await queryInterface.dropTable('Images');
  }
};
