"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Spots",
      [
        {
          ownerId: 1,
          address: "crossmoor",
          city: "rosemount",
          state: "iowa",
          country: "United States",
          lat: 400.24,
          lng: 130.22,
          name: "cabin",
          description: "cabin in the middle of the woods with pool and lake",
          price: 123.22,
          previewImage: "https://google.com/images/cabin.jpg"
        },
        {
          ownerId: 1,
          address: "Banyan lane",
          city: "Minnetonka",
          state: "Minnesota",
          country: "United States",
          lat: 100.23,
          lng: 244.22,
          name: "home away from home",
          description: "Lake home with various amnetities",
          price: 400.22,
          previewImage: "https://google.com/images/home.jpg"
        },
        {
          ownerId: 2,
          city: "Apple Valley",
          address: "dupont way",
          state: "Minnesota",
          country: "United States",
          lat: 321.24,
          lng: 634.22,
          name: "Pool time",
          description: "pool house very close to local bars",
          price: 123.22,
          previewImage: "https://google.com/images/pool.jpg"
        },
        {
          ownerId: 3,
          city: "Boulder",
          address: "123213 wayway st",
          state: "Colorado",
          country: "United States",
          lat: 343.24,
          lng: 214.22,
          name: "mountian house of the ages",
          description: "mountian house near boulder colorado with views",
          price: 90.21,
          previewImage: "https://google.com/images/boulder."
        },
        {
          ownerId: 4,
          city: "Vegas",
          address: "5432 the valley st",
          state: "Nevada",
          country: "United States",
          lat: 124.44,
          lng: 422.55,
          name: "The house",
          description: "House a few miles away from the strip",
          price: 122.50,
          previewImage: "https://google.com/images/vegas.jpg"
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
