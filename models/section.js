'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class section extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      section.belongsTo(models.application,{
        foreignKey:"appId"
      })

      section.hasMany(models.sectionfield,{
        foreignKey:"secId",
        onDelete:"CASCADE"
      })
    }
  }
  section.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    //application id
    appId: {
      type: DataTypes.UUID,
    },
  }, {
    sequelize,
    modelName: 'section',
  });
  return section;
};