const userService = require('../services/user.service');

const updatePassword = async (req, res, next) => {
  try {
    // The user's ID is available from the 'req.user' object,
    // which was attached by the 'protect' middleware.
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    await userService.updateUserPassword(userId, currentPassword, newPassword);

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    // Send a 401 Unauthorized status for incorrect password or other auth issues
    res.status(401).json({ message: error.message });
  }
};

module.exports = {
  updatePassword
};