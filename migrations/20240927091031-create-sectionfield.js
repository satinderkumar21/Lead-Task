'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sectionfields', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      label:{
        type:Sequelize.STRING,
        allowNull:false
      },
      pholder:{
        type:Sequelize.STRING,
        allowNull:false
      },
      ismndtry:{
        type:Sequelize.BOOLEAN,
        allowNull:false
      },
      description:{
        type:Sequelize.STRING,
        allowNull:false
      },
      secId: {
        type: Sequelize.UUID,
        references: {
          model: "sections",
          key: "id",
        },
        onDelete: "CASCADE",
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
    await queryInterface.dropTable('sectionfields');
  }
};