'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Bookings', [
    {
      userId: 1,
      spotId: 2,
      startDate: null,
      endDate: null,
    },

  ], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return
  }
};
