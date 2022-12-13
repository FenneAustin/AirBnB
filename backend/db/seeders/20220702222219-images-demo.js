'use strict';



let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}




module.exports = {
  up: async (queryInterface, Sequelize) => {
   options.tableName = "Images";
   return queryInterface.bulkInsert(options, [
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
    options.tableName = "Images"; // define table name in options object
    return queryInterface.bulkDelete(options);
  }
};
