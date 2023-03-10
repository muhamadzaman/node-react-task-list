"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.bulkInsert(
    //   "user",
    //   [
    //     {
    //       Id: 1,
    //       name: "Zaman",
    //       email: "zaman@gmail.com",
    //       active: true,
    //       verify: true,
    //       password: "123456",
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "pages",
    //   [
    //     {
    //       Id: 1,
    //       name: "Default Page",
    //       userId: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );
    // await queryInterface.bulkInsert(
    //   "fields",
    //   [
    //     {
    //       Id: 1,
    //       name: "Default Field",
    //       pageId: 1,
    //       created_at: new Date(),
    //       updated_at: new Date(),
    //     },
    //   ],
    //   {}
    // );
  },

  async down(queryInterface, Sequelize) {
    //await queryInterface.bulkDelete("user_group", null, {});
  },
};
