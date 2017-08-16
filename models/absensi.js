'use strict';
module.exports = function(sequelize, DataTypes) {
  var Absensi = sequelize.define('Absensi', {
    status: DataTypes.STRING,
    keterangan: DataTypes.TEXT,
    KaryawanId: DataTypes.INTEGER,
    RuleId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Absensi;
};