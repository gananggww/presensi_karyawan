'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    secret: DataTypes.STRING,
    role: DataTypes.STRING,
    KaryawanId: {
      type: DataTypes.INTEGER,
      unique: {
        msg: 'Karyawan yang dipilih sudah punya user'
      }
    }
  });

  User.associate = model => {
    User.belongsTo(model.Karyawan)
  }

  return User;
};
