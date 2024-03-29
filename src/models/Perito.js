const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Perito",
    {
      nombreYApellido: {
        type: DataTypes.STRING,
      },
      cargo: {
        type: DataTypes.STRING,
      },
      legajo: {
        type: DataTypes.BIGINT,
      },
      fecha: {
        type: DataTypes.STRING,
        defaultValue: new Date().toLocaleString(),
      },
    },
    {
      timestamps: false,
    }
  );
};
