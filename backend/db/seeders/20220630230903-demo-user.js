'use strict';
const bcrypt = require("bcryptjs");


let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}



module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName="Users";
    return queryInterface.bulkInsert(
      options,
      [
        {
          email: "demo@user.io",
          firstName: "austin",
          lastName: "fenne",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          firstName: "brian",
          lastName: "Thomas",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          firstName: "Tom",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "demo3@user.io",
          firstName: "Riley",
          lastName: "Treat",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@user.io",
          firstName: "Duane",
          lastName: "Row",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user5@user.io",
          firstName: "Tyler",
          lastName: "Rose",
          hashedPassword: bcrypt.hashSync("password3"),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    options.tableName = "Users";
    return queryInterface.bulkDelete(
      options,
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
