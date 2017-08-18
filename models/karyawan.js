'use strict';
module.exports = function(sequelize, DataTypes) {
  var Karyawan = sequelize.define('Karyawan', {
    nama: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Format email salah'
        }
      },
      unique: {
        msg: 'Email sudah ada'
      }
    },
    tlp: DataTypes.STRING,
    JabatanId: DataTypes.INTEGER
  });

  Karyawan.associate = model => {
    Karyawan.belongsTo(model.Jabatan)
    Karyawan.hasOne(model.User)
    Karyawan.belongsToMany(model.Rule, {
      through: model.Absensi
    })
  }

  return Karyawan;
};
