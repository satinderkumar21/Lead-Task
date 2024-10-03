"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class program extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      program.belongsTo(models.organization, {
        foreignKey: "orgId",
      });

      program.hasMany(models.application,{
        foreignKey:"prgmId"
      })
    }
  }
  program.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      programName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      programEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      promotionalEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      orgId:{
        type:DataTypes.UUID,
      }
     
    },
    {
      sequelize,
      modelName: "program",
    }
  );
  return program;
};
