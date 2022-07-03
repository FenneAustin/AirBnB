"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          city: "rosemount",
          state: "iowa",
          country: "United States",
          lat: 400.24,
          lng: 130.22,
          name: "cabin",
          description: "cabin in the middle of the woods with pool and lake",
          price: 123.22,
        },
        {
          ownerId: 1,
          city: "Minnetonka",
          state: "Minnesota",
          country: "United States",
          lat: 100.23,
          lng: 244.22,
          name: "home away from home",
          description: "Lake home with various amnetities",
          price: 400.22,
        },
        {
          ownerId: 1,
          city: "Apple Valley",
          state: "Minnesota",
          country: "United States",
          lat: 321.24,
          lng: 634.22,
          name: "Pool time",
          description: "pool house very close to local bars",
          price: 123.22,
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

  },
};
