const { Store, Rating, User, sequelize } = require('../../database/models');
const { Op } = require('sequelize');


// Service to create a new store
const createStore = async (storeData) => {
  const { name, address, owner_id } = storeData;

  // 1. Verify that the owner_id belongs to a user with the 'owner' role
  const owner = await User.findOne({
    where: {
      id: owner_id,
      role: 'owner'
    }
  });

  if (!owner) {
    throw new Error('Invalid owner ID or the user is not a designated store owner.');
  }

  // 2. Create the new store
  const newStore = await Store.create({
    name,
    address,
    owner_id,
  });

  return newStore;
};


// Service to get all stores with average ratings and user's submitted rating
const getAllStores = async (queryParams, currentUser) => {
  // query parameters for filtering
  const { name, address } = queryParams;
  const whereClause = {};

  // Building the search query if parameters exist
  if (name) {
    whereClause.name = { [Op.iLike]: `%${name}%` }; // Case-insensitive search
  }
  if (address) {
    whereClause.address = { [Op.iLike]: `%${address}%` };
  }

  const stores = await Store.findAll({
    where: whereClause,
    attributes: {
      include: [
        // Calculate the average rating and cast it to a float
        [sequelize.fn('AVG', sequelize.col('Ratings.rating_value')), 'overallRating'],
      ],
    },
    include: [
      {
        model: Rating,
        attributes: ['rating_value', 'user_id'], // individual ratings
      },
      {
        model: User,
        as: 'owner',
        attributes: ['name', 'email'], // owner's name and email
      }
    ],
    group: ['Store.id', 'Ratings.id', 'owner.id'], // Grouping by store to get correct average
  });

  // Processing the results to find the current user's rating
  const processedStores = stores.map(store => {
    const storeJson = store.toJSON();
    const userRating = storeJson.Ratings.find(rating => rating.user_id === currentUser.id);

    storeJson.userSubmittedRating = userRating ? userRating.rating_value : null;

    storeJson.overallRating = storeJson.overallRating ? parseFloat(storeJson.overallRating).toFixed(2) : null;

    delete storeJson.Ratings; 

    return storeJson;
  });

  return processedStores;
};

module.exports = {
  createStore,
  getAllStores, 
};