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
          previewImage:
            "https://a0.muscache.com/im/pictures/fd3538ae-22a9-4a2e-9d70-1f9e88374304.jpg?im_w=720",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/ca5a6ad5-f9a7-4436-ae4a-9294a16e5937.jpg?im_w=720",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-20321856/original/5abb759a-8747-44ec-8f3e-f3aef96c289b.jpeg?im_w=720",
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
          previewImage:
            "https://a0.muscache.com/im/pictures/f4569905-753b-424e-8409-8dd9e75790c4.jpg?im_w=720",
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
          price: 122.5,
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-51624441/original/8c7b098d-5d9b-4689-a10a-027e28b5e188.jpeg?im_w=720",
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
