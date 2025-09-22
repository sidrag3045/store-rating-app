'use strict';
const { Op } = require('sequelize');
const { hashPassword } = require('../../utils/password.util');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Use a common, hashed password for all test users
    const hashedPassword = await hashPassword('Password@123');
    const userEmails = [
      'walter.white@example.com',
      'jesse.pinkman@example.com',
      'saul.goodman@example.com',
      'gus.fring@example.com'
    ];

    await queryInterface.bulkInsert('Users', [
      // --- Store Owners ---
      {
        name: 'Walter White',
        email: userEmails[0],
        password: hashedPassword,
        address: '308 Negra Arroyo Lane, Albuquerque',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Jesse Pinkman',
        email: userEmails[1],
        password: hashedPassword,
        address: '9809 Margo Street, Albuquerque',
        role: 'owner',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // --- Normal Users ---
      {
        name: 'Saul Goodman',
        email: userEmails[2],
        password: hashedPassword,
        address: '9800 Montgomery Blvd NE, Albuquerque',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gus Fring',
        email: userEmails[3],
        password: hashedPassword,
        address: '12000 – 12100 Coors Rd SW, Albuquerque',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', {
      email: {
        [Op.in]: [
          'walter.white@example.com',
          'jesse.pinkman@example.com',
          'saul.goodman@example.com',
          'gus.fring@example.com'
        ]
      }
    }, {});
  }
};