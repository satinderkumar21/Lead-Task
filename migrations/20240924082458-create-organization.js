'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('organizations', {
      id: {
        allowNull: false,
        primaryKey: true,
        type:Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      logo: {
        type:Sequelize.STRING,
        
      },
      organizationName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      organizationEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      adminName:{
        type:Sequelize.STRING,
        allowNull:false
      },
      adminEmail:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      adminMNo:{
       type:Sequelize.STRING,
       allowNull:false,
       unique:true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('organizations');
  }
};