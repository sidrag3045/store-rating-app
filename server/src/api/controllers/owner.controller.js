const ownerService = require('../services/owner.service');

const getDashboardData = async (req, res, next) => {
  try {
    // The currently logged-in user is passed from the 'protect' middleware
    const dashboardData = await ownerService.getDashboardData(req.user);
    res.status(200).json(dashboardData);
  } catch (error) {
    res.status(404).json({ message: error.message });
    next(error);
  }
};

module.exports = {
  getDashboardData
};