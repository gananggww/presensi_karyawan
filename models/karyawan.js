'use strict';
module.exports = function(sequelize, DataTypes) {
  var Karyawan = sequelize.define('Karyawan', {
    nama: DataTypes.STRING,
    email: DataTypes.STRING,
    tlp: DataTypes.STRING,
    JabatanId: DataTypes.INTEGER
  });

  Karyawan.associate = models => {
    Karyawan.belongsTo(model.Jabatan)
  }

  return Karyawan;
};
