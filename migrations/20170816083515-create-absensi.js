'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Absensis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tanggal: {
        type: Sequelize.STRING
      },
      bulan: {
        type: Sequelize.STRING
      },
      jam_datang: {
        type: Sequelize.INTEGER
      },
      jam_pulang: {
        type: Sequelize.INTEGER
      },
      KaryawanId: {
        type: Sequelize.INTEGER
      },
      RuleId: {
        type: Sequelize.INTEGER
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
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Absensis');
  }
};
