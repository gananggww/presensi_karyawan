'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rule = sequelize.define('Rule', {
    waktu_masuk: DataTypes.DATE,
    waktu_pulang: DataTypes.DATE,
    checkin: DataTypes.DATE,
    checkout: DataTypes.DATE,
    pelanggaran: DataTypes.INTEGER,
    potongan: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Rule;
};