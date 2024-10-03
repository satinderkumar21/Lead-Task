'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sectionfield extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sectionfield.belongsTo(models.section,{
        foreignKey:"secId"
      })

      sectionfield.hasMany(models.fieldoption,{
        foreignKey:"secfldId",
        onDelete:"CASCADE"
      })
    }
  }
  sectionfield.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    label:{
      type:DataTypes.STRING,
      allowNull:false
    },
    pholder:{//placeholder
      type:DataTypes.STRING,
      allowNull:false
    },
    ismndtry:{ // field mandatory or not
      type:DataTypes.BOOLEAN,
      allowNull:false
    },
    description:{
      type:DataTypes.STRING,
      allowNull:false
    },
    secId: {//section id
      type: DataTypes.UUID,
    }
  }, {
    sequelize,
    modelName: 'sectionfield',
  });
  return sectionfield;
};