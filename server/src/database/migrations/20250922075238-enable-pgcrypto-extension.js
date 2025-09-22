'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // This command enables the pgcrypto extension
    await queryInterface.sequelize.query('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query('DROP EXTENSION "pgcrypto";');
  }
};