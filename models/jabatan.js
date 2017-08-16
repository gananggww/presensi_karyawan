'use strict';
module.exports = function(sequelize, DataTypes) {
  var Jabatan = sequelize.define('Jabatan', {
    nama_jabatan: DataTypes.STRING,
    gaji: DataTypes.INTEGER
  });

  Jabatan.associate = models => {
    Jabatan.hasMany(model.Karyawan)
  }

  return Jabatan;
};
