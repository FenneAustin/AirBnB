'use strict';


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
   options.tableName = "Bookings";
   return queryInterface.bulkInsert(
     options,
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
    options.tableName = "Bookings"; // define table name in options object
    return queryInterface.bulkDelete(options);
  }
};
