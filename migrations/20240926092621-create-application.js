"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("applications", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      prgName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      appNumPrfix: {
        type: Sequelize.STRING,
      },
      currency: {
        type: Sequelize.STRING,
      },
      formStrtDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      deadlineDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      appFee: {
        type: Sequelize.STRING,
      },
      appLateFee: {
        type: Sequelize.BOOLEAN,
      },
      surcharge: {
        type: Sequelize.STRING,
      },
      surchargeAppDate: {
        type: Sequelize.DATEONLY,
      },
      onlinePay: {
        type: Sequelize.STRING,
      },
      formLogo: {
        type: Sequelize.STRING,
      },
      formInstru: {
        type: Sequelize.STRING,
      },
      formBanner: {
        type: Sequelize.STRING,
      },
      formStatus: {
        type: Sequelize.BOOLEAN,
      },
      prgmId: {
        type: Sequelize.UUID,
        references: {
          model: "programs",
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
    await queryInterface.dropTable("applications");
  },
};
