'use strict';
module.exports = function(sequelize, DataTypes) {
  var Rule = sequelize.define('Rule', {
    pelanggaran: DataTypes.STRING,
    denda: DataTypes.INTEGER
  });

  Rule.associate = model => {
    Rule.belongsToMany(model.Karyawan, {
      through: model.Absensi
    })
  }

  return Rule;
};
