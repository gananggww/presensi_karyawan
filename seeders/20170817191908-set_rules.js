'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Rules', [{
      id: 1,
      pelanggaran: 'bersih',
      denda: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      pelanggaran: 'terlambat',
      denda: 50000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      pelanggaran: 'kabur',
      denda: 50000,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      pelanggaran: 'alpa',
      denda: 100000,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: function (queryInterface, Sequelize) {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
