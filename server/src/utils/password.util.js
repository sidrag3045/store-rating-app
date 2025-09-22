// bcrypt for hashing passwords
const bcrypt = require('bcryptjs');

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  return await bcrypt.hash(plainPassword, saltRounds);
};

const comparePasswords = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePasswords };
