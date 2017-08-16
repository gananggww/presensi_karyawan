'use strict';
module.exports = function(sequelize, DataTypes) {
  var Karyawan = sequelize.define('Karyawan', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    tlp: DataTypes.STRING,
    JabatanId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Karyawan;
};