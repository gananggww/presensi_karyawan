'use strict';
module.exports = function(sequelize, DataTypes) {
  var Jabatan = sequelize.define('Jabatan', {
    nama_jabatan: DataTypes.STRING,
    gaji: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Jabatan;
};