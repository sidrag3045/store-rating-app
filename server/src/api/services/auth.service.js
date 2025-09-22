const { User } = require('../../database/models');
const { hashPassword, comparePasswords } = require('../../utils/password.util');
const { generateToken } = require('../../utils/jwt.util');

const registerUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    role: 'user',
  });
  const userObject = newUser.toJSON();
  delete userObject.password;
  return userObject;
};

const loginUser = async (credentials) => {
  const { email, password } = credentials;

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  const isPasswordValid = await comparePasswords(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }

  const token = generateToken(user);
  const userObject = user.toJSON();
  delete userObject.password;

  return { user: userObject, token };
};

module.exports = {
  registerUser,
  loginUser,
};