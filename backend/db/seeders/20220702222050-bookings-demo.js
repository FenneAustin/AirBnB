'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert(
     "Bookings",
     [
       {
         userId: 1,
         spotId: 2,
         startDate: new Date('2022-04-01'),
         endDate: new Date('2022-04-20'),
       },
       {
         userId: 2,
         spotId: 1,
         startDate: new Date('2022-04-01'),
         endDate: new Date('2022-04-20'),
       },
       {
         userId: 3,
         spotId: 1,
         startDate: new Date('2022-04-21'),
         endDate: new Date('2022-04-30'),
       },
     ],
     {}
   );
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
