'use strict';
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Users",
      [
        {
          email: "demo@user.io",
          username: "Demo-lition",
          firstName: "austin",
          lastName: "fenne",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user1@user.io",
          username: "FakeUser1",
          firstName: "brian",
          lastName: "Thomas",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user2@user.io",
          username: "FakeUser2324",
          firstName: "Tom",
          lastName: "Smith",
          hashedPassword: bcrypt.hashSync("password3"),
        },
        {
          email: "demo3@user.io",
          username: "Demo-litio43231",
          firstName: "Riley",
          lastName: "Treat",
          hashedPassword: bcrypt.hashSync("password"),
        },
        {
          email: "user4@user.io",
          username: "FakeUser2231",
          firstName: "Duane",
          lastName: "Row",
          hashedPassword: bcrypt.hashSync("password2"),
        },
        {
          email: "user5@user.io",
          username: "FakeUser2343",
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
    return queryInterface.bulkDelete(
      "Users",
      {
        username: { [Op.in]: ["Demo-lition", "FakeUser1", "FakeUser2"] },
      },
      {}
    );
  },
};
