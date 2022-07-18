'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert("Images", [
     {
       imageableId: 2,
       imageableType: "spot",
       url: "https://www.google.com/",
     },
     {
       imageableId: 2,
       imageableType: "spot",
       url: "https://www.appacademy.com/",
     },
     {
       imageableId: 1,
       imageableType: "review",
       url: "https://www.appacademy.com/",
     },
     {
       imageableId: 1,
       imageableType: "review",
       url: "https://www.google.com/",
     },
     {
       imageableId: 1,
       imageableType: "review",
       url: "https://www.instagram.com/",
     },
     {
      imageableId: 2,
      imageableType: "review",
      url: "FACEBOOK.com"
     }
   ]);
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
