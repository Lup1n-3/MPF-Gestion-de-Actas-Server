const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Sd",
    {
      marca: {
        type: DataTypes.STRING,
      },
      serialNumber: {
        type: DataTypes.STRING,
      },
      almacenamiento: {
        type: DataTypes.STRING,
      },
      tipoExtraccionSd: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
