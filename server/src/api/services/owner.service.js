const { Store, Rating, User, sequelize } = require('../../database/models');

const getDashboardData = async (currentUser) => {
  // 1. Finding all stores associated with the currently logged-in owner
  const stores = await Store.findAll({
    where: { owner_id: currentUser.id },
    attributes: {
      include: [
        // Calculating the average rating for each store
        [sequelize.fn('AVG', sequelize.col('Ratings.rating_value')), 'averageRating'],
      ],
    },
    include: [
      {
        model: Rating,
        attributes: [], // We only need ratings for the AVG calculation, not to return
        include: [{
          model: User,
          attributes: ['name', 'email']
        }]
      },
    ],
    group: ['Store.id', 'Ratings->User.id'] // Grouping to get correct average per store
  });

  if (!stores || stores.length === 0) {
    throw new Error('No stores found for this owner.');
  }

  // The query above gives us the stores and their average ratings.
  // Now we just need to fetch the list of individual raters for each store.
  // We do this separately to keep the logic clean.
  const dashboardData = await Promise.all(stores.map(async (store) => {
    const ratings = await Rating.findAll({
      where: { store_id: store.id },
      include: [{ model: User, attributes: ['name', 'email'] }]
    });

    const storeJson = store.toJSON();
    storeJson.ratings = ratings;
    return storeJson;
  }));

  return dashboardData;
};

module.exports = {
  getDashboardData,
};