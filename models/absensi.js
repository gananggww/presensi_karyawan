'use strict';
module.exports = function(sequelize, DataTypes) {
  var Absensi = sequelize.define('Absensi', {
    tanggal: DataTypes.STRING,
    bulan: DataTypes.STRING,
    jam_datang: DataTypes.INTEGER,
    jam_pulang: DataTypes.INTEGER,
    KaryawanId: DataTypes.INTEGER,
    RuleId: DataTypes.INTEGER
  });

  Absensi.associate = model => {
    Absensi.belongsTo(model.Rule)
    Absensi.belongsTo(model.Karyawan)
  }

  return Absensi;
};
