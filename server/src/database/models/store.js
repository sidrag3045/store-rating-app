'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Store extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Each Store belongs to one User (the owner)
      Store.belongsTo(models.User, { as: 'owner', foreignKey: 'owner_id' });

      // A Store can have many Ratings from different users
      Store.hasMany(models.Rating, { foreignKey: 'store_id' });
    }
  }
  Store.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    owner_id: {
      type: DataTypes.UUID, 
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'Store',
  });
  return Store;
};