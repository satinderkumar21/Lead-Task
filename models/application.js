'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      application.belongsTo(models.program,{
        foreignKey:"prgmId"
      })
      application.hasMany(models.section,{
        foreignKey:"appId",
        onDelete:"CASCADE"
      })
    }
  }
  application.init({
    
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    prgName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    appNumPrfix: {
      type: DataTypes.STRING,
      
    },
    currency: {
      type: DataTypes.STRING,
  
    },
    formStrtDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    deadlineDate: {
      type: DataTypes.DATEONLY,
      allowNull:false
    },
    appFee: { //application fees
      type: DataTypes.STRING,
    },
    appLateFee: { // appplication late fees
      type: DataTypes.BOOLEAN,
    },
    surcharge: {
      type: DataTypes.STRING,
    },
    surchargeAppDate: { //surcharge applicable date
      type: DataTypes.DATEONLY,
    },
    onlinePay: {
      type: DataTypes.STRING,
    },
    formLogo: {
      type: DataTypes.STRING,
    },
    formInstru: { //form instruction
      type: DataTypes.STRING,
    },
    formBanner: {
      type: DataTypes.STRING,
    },
    formStatus: {
      type: DataTypes.BOOLEAN,
    },
    prgmId:{//program id
      type:DataTypes.UUID,
      allowNull:false
    }
  }, {
    sequelize,
    modelName: 'application',
  });
  return application;
};