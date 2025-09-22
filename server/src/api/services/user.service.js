const { User } = require('../../database/models');
const { comparePasswords, hashPassword } = require('../../utils/password.util');

const updateUserPassword = async (userId, currentPassword, newPassword) => {
  // 1. Find the user by their ID
  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error('User not found.');
  }

  // 2. Verify their current password
  const isPasswordValid = await comparePasswords(currentPassword, user.password);
  if (!isPasswordValid) {
    throw new Error('Incorrect current password.');
  }

  // 3. Hash the new password
  const hashedNewPassword = await hashPassword(newPassword);

  // 4. Update the user's password and save
  user.password = hashedNewPassword;
  await user.save();

  return { message: 'Password updated successfully' };
};


module.exports = {
  updateUserPassword
};