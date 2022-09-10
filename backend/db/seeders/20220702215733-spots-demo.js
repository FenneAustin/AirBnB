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
          state: "Iowa",
          country: "United States",
          lat: 400.24,
          lng: 130.22,
          name: "Beautiful Cozy Chalet on a Private Lake",
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
          name: "Cast Away - on Indian Lake - Maple Lake",
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
          description: "The Mid-Century Lake House - Sleeps 8",
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
          name: "Magic Tipi Retreat",
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
          name: "Studio w/ No Resort Fee/pool/gym",
          description: "House a few miles away from the strip",
          price: 122.5,
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-51624441/original/8c7b098d-5d9b-4689-a10a-027e28b5e188.jpeg?im_w=720",
        },
        {
          ownerId: 5,
          city: "Hayward",
          address: "4232 valley st",
          state: "Wisconsin",
          country: "United States",
          lat: 124.44,
          lng: 422.55,
          name: "Hayward Haus, Modern Design w/ Classic Experience",
          description:
            "Built as a winter or summer escape for a couple or small group, this beautiful four season cabin is a great way to experience the Northwoods of Wisconsin a modern, well-appointed.",
          price: 330,
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-51804926/original/1a849050-498a-4e74-861e-9c38f5d94d38.jpeg?im_w=720",
        },
        {
          ownerId: 6,
          city: "FairBanks",
          address: "54332 the bank street",
          state: "Alaska",
          country: "United States",
          lat: 124.44,
          lng: 422.55,
          name: "Aurora Villa Deluxed double bedroom",
          description:
            "This memorable stay is anything but ordinary. Cross your very own rope bridge to get to your cozy treehouse. A luxury bathhouse with hot tub. ",
          price: 299,
          previewImage:
            "https://a0.muscache.com/im/pictures/41558477-1dc1-4c63-b23d-b0f4ade79d62.jpg?im_w=720",
        },
        {
          ownerId: 6,
          city: "Indian River",
          address: "54332 repatop way",
          state: "Michigan",
          country: "United States",
          lat: 124.44,
          lng: 422.55,
          name: "Fernside Aframe: Private River Front, Hidden Gem",
          description:
            "Fernside is a lovingly constructed A-Frame, which rests on the banks of the Sturgeon River, in the charming town of Indian River, Michigan.",
          price: 545,
          previewImage:
            "https://a0.muscache.com/im/pictures/miso/Hosting-38105331/original/0140810d-c017-4083-b131-3c519dd1a8bf.jpeg?im_w=720",
        },
        {
          ownerId: 6,
          city: "Greak Land",
          address: "52321 Greek way",
          state: "California",
          country: "United States",
          lat: 124.44,
          lng: 422.55,
          name: "Subteerranean style & sweeping views `Cueva Balcon`",
          description:
            "Our lovely, quiet Balcony Cave is full of modern comforts and will be the highlight of your holiday. With a wide sunny terrace.",
          price: 67,
          previewImage:
            "https://a0.muscache.com/im/pictures/74308694/4717f934_original.jpg?im_w=720",
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
