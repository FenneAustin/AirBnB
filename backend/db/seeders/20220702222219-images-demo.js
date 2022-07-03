'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert("Images", [
     {
       imageableId: 2,
       imageableType: "spot",
       url: "https://www.google.com/search?q=beautiful+home&sxsrf=ALiCzsYNhiFRl2G_L0fL_IrIGI021AKmyA:1656800706378&source=lnms&tbm=isch&sa=X&ved=2ahUKEwizvsTMn9v4AhWik4kEHdOEAkQQ_AUoAXoECAIQAw&biw=1059&bih=709&dpr=1#imgrc=216S0EBM0dLZEM",
     },
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
