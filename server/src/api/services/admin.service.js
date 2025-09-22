const { User, Store, Rating, sequelize } = require('../../database/models');
const {hashPassword} = require('../../utils/password.util');
const { Op } = require('sequelize');

const getDashboardStats = async () => {
  const totalUsers = await User.count();
  const totalStores = await Store.count();
  const totalRatings = await Rating.count();

  return {
    totalUsers,
    totalStores,
    totalRatings,
  };
};

const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  const newUser = await User.create({
    ...userData,
    password: hashedPassword,
    // The role is passed in directly from the validated request body
  });

  const userObject = newUser.toJSON();
  delete userObject.password;
  return userObject;
};

const getAllUsers = async (queryParams) => {
  const { name, email, role } = queryParams;
  const whereClause = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }
  if (email) {
    whereClause.email = { [Op.iLike]: `%${email}%` };
  }
  if (role) {
    whereClause.role = role;
  }

  const users = await User.findAll({
    where: whereClause,
    attributes: { exclude: ['password'] }, 
  });

  return users;
};

const getAllStores = async (queryParams) => {
  const { name, address } = queryParams;
  const whereClause = {};

  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` };
  }
  if (address) {
    whereClause.address = { [Op.iLike]: `%${address}%` };
  }

  const stores = await Store.findAll({
    where: whereClause,
    attributes: {
      include: [
        // Calculate the average rating
        [sequelize.fn('AVG', sequelize.col('Ratings.rating_value')), 'overallRating'],
      ],
    },
    include: [
      {
        model: Rating,
        attributes: [], // Only needed for the calculation
      },
      {
        model: User,
        as: 'owner',
        attributes: ['name', 'email'], // Include owner's name and email
      }
    ],
    group: ['Store.id', 'owner.id'],
  });

  return stores.map(store => {
      const storeJson = store.toJSON();
      storeJson.overallRating = parseFloat(storeJson.overallRating || 0).toFixed(2);
      return storeJson;
  });
};

module.exports = {
  getDashboardStats,
  createUser,
  getAllUsers,
  getAllStores
};