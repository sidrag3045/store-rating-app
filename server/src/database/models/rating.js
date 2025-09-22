'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Rating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Each Rating is submitted by one User
      Rating.belongsTo(models.User, { foreignKey: 'user_id' });

      // Each Rating is for one Store
      Rating.belongsTo(models.Store, { foreignKey: 'store_id' });
    }
  }

  Rating.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4
    },
    rating_value: DataTypes.INTEGER,
    user_id: {
      type: DataTypes.UUID, 
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    store_id: {
      type: DataTypes.UUID, 
      references: {
        model: 'Stores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Rating',
  });
  return Rating;
};