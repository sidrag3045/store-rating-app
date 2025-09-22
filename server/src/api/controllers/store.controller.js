const storeService = require('../services/store.service');

const createStore = async (req, res, next) => {
  try {
    const newStore = await storeService.createStore(req.body);
    res.status(201).json({ message: 'Store created successfully', store: newStore });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllStores = async (req, res, next) => {
  try {
    const stores = await storeService.getAllStores(req.query, req.user);
    res.status(200).json({ stores });
  } catch (error) {
    res.status(400).json({ message: error.message });
    next(error);
  }
};

module.exports = {
  createStore,
  getAllStores,
};