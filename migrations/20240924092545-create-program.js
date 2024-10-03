"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("programs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      programName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      programEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      promotionalEmail: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      orgId: {
        type: Sequelize.UUID,
        references: {
          model: "organizations",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("programs");
  },
};
