'use strict';


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = "Reviews";
    return queryInterface.bulkInsert(options, [
      {
        userId: 1,
        spotId: 2,
        review: 'HELLO THIS PLACE SUCKS',
        stars: 5
      },
      {
        userId: 2,
        spotId: 1,
        review: "Great views",
        stars: 5
      },
      {
        userId: 3,
        spotId: 2,
        review: "the place was alright",
        stars: 5
      },
      {
        userId: 1,
        spotId: 1,
        review: "wonderful",
        stars: 1
      },
      {
        userId: 1,
        spotId: 3,
        review: "too pricey for what it is",
        stars: 3
      }
  ])
  },

  down: async (queryInterface, Sequelize) => {
      options.tableName = "Reviews"; // define table name in options object
      return queryInterface.bulkDelete(options);
  }
};
