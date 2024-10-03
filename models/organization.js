"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class organization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      organization.hasMany(models.program,{
        foreignKey:"orgId",
        onDelete:"CASCADE"
      })
    }
  }
  organization.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      logo: {
        type:DataTypes.STRING,
      
      },
      organizationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organizationEmail: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      adminName:{
        type:DataTypes.STRING,
        allowNull:false
      },
      adminEmail:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      adminMNo:{
       type:DataTypes.STRING,
       allowNull:false,
       unique:true
      }
    },
    {
      sequelize,
      modelName: "organization",
    }
  );
  return organization;
};
