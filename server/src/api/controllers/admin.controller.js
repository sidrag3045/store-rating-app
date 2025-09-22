const adminService = require('../services/admin.service');

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    res.status(200).json(stats);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  try {
    const newUser = await adminService.createUser(req.body);
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'Email is already in use.' });
    }
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await adminService.getAllUsers(req.query);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const getAllStores = async (req, res, next) => {
  try {
    const stores = await adminService.getAllStores(req.query);
    res.status(200).json(stores);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  createUser,
  getAllUsers,
  getAllStores,
};