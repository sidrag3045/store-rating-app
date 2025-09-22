'use strict';
const { hashPassword } = require('../../utils/password.util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await hashPassword('AdminPassword@123'); 

    await queryInterface.bulkInsert('Users', [
      {
        name: 'Raghav Chanana',
        email: 'admin@example.com',
        password: hashedPassword,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
     }
  ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', { email: 'admin@example.com' }, {});
  }
};