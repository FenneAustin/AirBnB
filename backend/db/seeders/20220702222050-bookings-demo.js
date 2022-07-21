'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert(
     "Bookings",
     [
       {
         userId: 1,
         spotId: 2,
         startDate: "2022-04-01T00:00:00Z",
         endDate: "2022-04-20T00:00:00Z",
       },
       {
         userId: 2,
         spotId: 1,
         startDate: "2022-04-01T00:00:00Z",
         endDate: "2022-04-20T00:00:00Z",
       },
       {
         userId: 3,
         spotId: 1,
         startDate: "2022-04-21T00:00:00Z",
         endDate: "2022-04-30T00:00:00Z",
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
