'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Reviews', [
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return
  }
};
